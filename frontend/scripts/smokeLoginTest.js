import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')

const BROWSER_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean)

function findBrowser() {
  for (const candidate of BROWSER_PATHS) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error('Không tìm thấy trình duyệt Chrome hoặc Edge.')
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    let filePath = path.join(DIST_DIR, decodeURIComponent(url.pathname))
    let isFile = false
    try {
      if (fs.statSync(filePath).isFile()) isFile = true
    } catch {}
    if (!isFile) filePath = path.join(DIST_DIR, 'index.html')
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('Error')
        return
      }
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port })
    })
  })
}

async function waitHttp(url, retries = 50, delay = 100) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
    } catch {}
    await new Promise((r) => setTimeout(r, delay))
  }
  throw new Error(`Timeout connect to ${url}`)
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.id = 0
    this.pending = new Map()
    this.events = new Map()
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl)
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve
      this.ws.onerror = reject
    })
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id !== undefined && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error(msg.error.message))
        else resolve(msg.result)
        return
      }
      if (msg.method && this.events.has(msg.method)) {
        for (const handler of this.events.get(msg.method)) handler(msg.params)
      }
    }
  }

  send(method, params = {}) {
    const id = ++this.id
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  on(method, handler) {
    if (!this.events.has(method)) this.events.set(method, new Set())
    this.events.get(method).add(handler)
  }

  close() {
    try { this.ws?.close() } catch {}
  }
}

async function runTest() {
  const browserPath = findBrowser()
  const { server, port } = await startStaticServer()
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uniview-login-test-'))
  const debugPort = 9888

  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${tempDir}`,
    'about:blank',
  ], { stdio: 'ignore' })

  let client
  try {
    await waitHttp(`http://127.0.0.1:${debugPort}/json/version`, 40, 150)
    let targets = await waitHttp(`http://127.0.0.1:${debugPort}/json/list`, 20, 100)
    let pageTarget = targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
    if (!pageTarget) {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })
      pageTarget = await res.json()
    }

    client = new CdpClient(pageTarget.webSocketDebuggerUrl)
    await client.connect()

    await client.send('Page.enable')
    await client.send('Runtime.enable')

    console.log('🚀 Mở trang đăng nhập: http://127.0.0.1:' + port + '/login')
    await client.send('Page.navigate', { url: `http://127.0.0.1:${port}/login` })
    await new Promise((r) => setTimeout(r, 1200))

    console.log('Điền email lamhuynhhueman.ptht@gmail.com và mật khẩu...')
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const emailInput = document.getElementById('emailInput');
        const passInput = document.getElementById('passwordInput');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(emailInput, 'lamhuynhhueman.ptht@gmail.com');
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        nativeInputValueSetter.call(passInput, '12345678');
        passInput.dispatchEvent(new Event('input', { bubbles: true }));
      })()`,
    })

    await new Promise((r) => setTimeout(r, 300))

    console.log('Bấm nút "Đăng nhập vào UniView →"...')
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('loginSubmitBtn');
        btn.click();
      })()`,
    })

    console.log('Chờ đăng nhập và chuyển hướng...')
    let currentUrl = ''
    for (let i = 0; i < 40; i++) {
      const evalRes = await client.send('Runtime.evaluate', {
        expression: 'window.location.pathname',
        returnByValue: true,
      })
      currentUrl = evalRes.result.value
      if (currentUrl !== '/login') break
      await new Promise((r) => setTimeout(r, 150))
    }

    console.log('✓ URL sau đăng nhập:', currentUrl)
    if (currentUrl === '/login') {
      const errorMsg = await client.send('Runtime.evaluate', {
        expression: 'document.querySelector(".text-rose-700")?.textContent',
        returnByValue: true,
      })
      throw new Error(`Đăng nhập thất bại, vẫn ở /login. Lỗi hiển thị: ${errorMsg.result.value}`)
    }

    const sessionEval = await client.send('Runtime.evaluate', {
      expression: 'JSON.parse(localStorage.getItem("uniview-auth-session-v4"))',
      returnByValue: true,
    })
    const session = sessionEval.result.value
    console.log('✓ Đăng nhập thành công! User session:')
    console.log('  - Email:    ', session?.user?.email)
    console.log('  - Họ và tên:', session?.user?.fullName)
    console.log('  - Role:     ', session?.user?.role)
    console.log('  - isDemo:   ', session?.user?.isDemo)

    console.log('\n🎉 TEST ĐĂNG NHẬP THẬT TRÊN CHROME THÀNH CÔNG 100%!')
  } finally {
    if (client) client.close()
    try { browserProc.kill('SIGKILL') } catch {}
    try { server.close() } catch {}
    try { fs.rmSync(tempDir, { recursive: true, force: true }) } catch {}
  }
}

runTest().catch((err) => {
  console.error('❌ Lỗi:', err)
  process.exit(1)
})
