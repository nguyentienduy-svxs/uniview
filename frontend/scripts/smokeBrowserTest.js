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
  process.env.CHROME_BIN,
  process.env.BROWSER_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean)

function findBrowser() {
  for (const candidate of BROWSER_PATHS) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error(`Không tìm thấy Google Chrome hoặc Microsoft Edge trên máy: đã duyệt qua ${BROWSER_PATHS.join(', ')}`)
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
  '.ico': 'image/x-icon',
}

function startStaticServer() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Thư mục ${DIST_DIR} chưa tồn tại. Hãy chạy 'npm run build' trước.`)
  }

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    let filePath = path.join(DIST_DIR, decodeURIComponent(url.pathname))

    let isFile = false
    try {
      const stat = fs.statSync(filePath)
      if (stat.isFile()) isFile = true
    } catch {
      isFile = false
    }

    if (!isFile) {
      filePath = path.join(DIST_DIR, 'index.html')
    }

    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Server error')
        return
      }
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      resolve({ server, port })
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
  throw new Error(`Không thể kết nối đến ${url} sau ${retries} lần thử`)
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
      const message = JSON.parse(event.data)
      if (message.id !== undefined) {
        const handler = this.pending.get(message.id)
        if (handler) {
          this.pending.delete(message.id)
          if (message.error) {
            handler.reject(new Error(`CDP Error ${message.error.code}: ${message.error.message}`))
          } else {
            handler.resolve(message.result)
          }
        }
      } else if (message.method) {
        const listeners = this.events.get(message.method) || []
        for (const fn of listeners) fn(message.params)
      }
    }
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  on(eventName, fn) {
    if (!this.events.has(eventName)) this.events.set(eventName, [])
    this.events.get(eventName).push(fn)
  }

  close() {
    try {
      this.ws.close()
    } catch {}
  }
}

async function runSmokeTest() {
  console.log('🚀 Bắt đầu smoke test trình duyệt thật cho luồng Đăng ký -> Assessment…')
  const browserPath = findBrowser()
  console.log(`✓ Tìm thấy trình duyệt: ${browserPath}`)

  const { server, port: serverPort } = await startStaticServer()
  console.log(`✓ Máy chủ static test chạy tại: http://127.0.0.1:${serverPort}`)

  const debugPort = 9333 + Math.floor(Math.random() * 500)
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uniview-smoke-profile-'))

  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${tempUserDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], { stdio: 'ignore' })

  let client = null

  try {
    const versionInfo = await waitHttp(`http://127.0.0.1:${debugPort}/json/version`, 40, 150)
    console.log(`✓ Chrome DevTools Protocol sẵn sàng (v${versionInfo['Browser']})`)

    let targets = await waitHttp(`http://127.0.0.1:${debugPort}/json/list`, 20, 100)
    let pageTarget = targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
    if (!pageTarget) {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })
      pageTarget = await res.json()
    }
    client = new CdpClient(pageTarget.webSocketDebuggerUrl)
    await client.connect()
    console.log('✓ Kết nối CDP WebSocket thành công')

    await client.send('Page.enable')
    await client.send('Runtime.enable')

    const registerUrl = `http://127.0.0.1:${serverPort}/register`
    console.log(`\n[Bước 1] Mở trang đăng ký: ${registerUrl}`)

    let loaded = false
    client.on('Page.loadEventFired', () => { loaded = true })
    await client.send('Page.navigate', { url: registerUrl })

    for (let i = 0; i < 40 && !loaded; i++) {
      await new Promise((r) => setTimeout(r, 100))
    }

    await new Promise((r) => setTimeout(r, 600))

    const registerPageCheck = await client.send('Runtime.evaluate', {
      expression: `(() => {
        return {
          pathname: window.location.pathname,
          title: document.title,
          heading: document.querySelector('h2')?.textContent || '',
          hasForm: Boolean(document.querySelector('form')),
          inputCount: document.querySelectorAll('input').length
        }
      })()`,
      returnByValue: true,
    })

    const pageInfo = registerPageCheck.result.value
    console.log(`✓ Trang /register đã nạp: tiêu đề="${pageInfo.title}", tiêu đề con="${pageInfo.heading}", ${pageInfo.inputCount} ô nhập liệu`)

    if (!pageInfo.hasForm || pageInfo.inputCount < 3) {
      throw new Error(`Trang /register không hiển thị đúng form đăng ký: ${JSON.stringify(pageInfo)}`)
    }

    const testFullName = 'Nguyễn Đăng Trải Nghiệm'
    const testEmail = `test_real_${Date.now()}@uniview.edu.vn`
    const testPassword = 'Password2027!Real'

    console.log(`\n[Bước 2] Tạo tài khoản mới:`)
    console.log(`  - Họ tên: ${testFullName}`)
    console.log(`  - Email:  ${testEmail}`)

    const fillAndSubmitResult = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const nameInput = inputs.find(i => i.placeholder?.includes('Minh Anh') || i.autocomplete === 'name') || inputs[0];
        const emailInput = inputs.find(i => i.type === 'email' || i.placeholder?.includes('@')) || inputs[1];
        const passInput = inputs.find(i => i.type === 'password') || inputs[2];
        const submitBtn = document.querySelector('button[type="submit"]');

        if (!nameInput || !emailInput || !passInput || !submitBtn) {
          return { error: 'Không tìm thấy đủ element của form đăng ký' };
        }

        function setReactInput(input, value) {
          const proto = Object.getPrototypeOf(input);
          const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
          if (setter) {
            setter.call(input, value);
          } else {
            input.value = value;
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }

        setReactInput(nameInput, ${JSON.stringify(testFullName)});
        setReactInput(emailInput, ${JSON.stringify(testEmail)});
        setReactInput(passInput, ${JSON.stringify(testPassword)});

        submitBtn.click();
        return { success: true };
      })()`,
      returnByValue: true,
    })

    if (fillAndSubmitResult.result.value?.error) {
      throw new Error(fillAndSubmitResult.result.value.error)
    }

    console.log('✓ Đã điền form và bấm "Tạo tài khoản và làm assessment →"')

    console.log('\n[Bước 3] Chờ xác nhận chuyển hướng vào /assessment…')
    let currentPath = ''
    let attempts = 0
    while (attempts < 50) {
      await new Promise((r) => setTimeout(r, 200))
      const pathCheck = await client.send('Runtime.evaluate', {
        expression: `window.location.pathname`,
        returnByValue: true,
      })
      currentPath = pathCheck.result.value
      if (currentPath === '/assessment') break
      attempts++
    }

    console.log(`✓ Xác nhận trình duyệt đã chuyển đến URL: ${currentPath}`)
    if (currentPath !== '/assessment') {
      throw new Error(`Kỳ vọng chuyển đến /assessment nhưng hiện tại đang ở: ${currentPath}`)
    }

    await new Promise((r) => setTimeout(r, 500))

    console.log('\n[Bước 4] Kiểm tra local session là tài khoản mới…')
    const sessionEval = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const raw = window.localStorage.getItem('uniview-auth-session-v4');
        return raw ? JSON.parse(raw) : null;
      })()`,
      returnByValue: true,
    })

    const session = sessionEval.result.value
    if (!session || !session.user) {
      throw new Error('Không tìm thấy session trong localStorage sau khi đăng ký!')
    }

    console.log(`✓ ID người dùng:      ${session.user.id}`)
    console.log(`✓ Email session:       ${session.user.email}`)
    console.log(`✓ Họ và tên session:   ${session.user.fullName}`)
    console.log(`✓ Đánh dấu demo:       ${session.user.isDemo}`)

    if (session.user.email !== testEmail.toLowerCase()) {
      throw new Error(`Email session (${session.user.email}) không khớp email đã đăng ký (${testEmail})`)
    }
    if (session.user.fullName !== testFullName) {
      throw new Error(`Tên session (${session.user.fullName}) không khớp tên đã đăng ký (${testFullName})`)
    }
    if (session.user.isDemo !== false) {
      throw new Error(`Tài khoản mới phải có isDemo === false, nhưng nhận được: ${session.user.isDemo}`)
    }
    if (!session.user.id.startsWith('student-')) {
      throw new Error(`User ID phải có prefix 'student-', nhận được: ${session.user.id}`)
    }
    console.log('✓ Local session xác nhận chuẩn xác: tài khoản mới độc lập, không phải tài khoản demo!')

    console.log('\n[Bước 5] Kiểm tra assessment storage không chứa dữ liệu demo Minh Anh…')
    const assessmentStorageKey = `uniview-assessment-v4:${session.user.id}`
    const assessmentEval = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const raw = window.localStorage.getItem(${JSON.stringify(assessmentStorageKey)});
        return raw ? JSON.parse(raw) : null;
      })()`,
      returnByValue: true,
    })

    const storedAssessment = assessmentEval.result.value
    if (!storedAssessment) {
      throw new Error(`Không tìm thấy assessment storage tại key: ${assessmentStorageKey}`)
    }

    const riasecCount = Object.keys(storedAssessment.riasecAnswers || {}).length
    const expAttemptSeed = storedAssessment.experience?.attemptSeed
    const expDomainStatesCount = Object.keys(storedAssessment.experience?.domainStates || {}).length
    const reportPresent = storedAssessment.report !== null
    const strengthsCount = (storedAssessment.profile?.strengths || []).length
    const prioritiesCount = (storedAssessment.profile?.priorities || []).length

    console.log(`✓ Storage key:                  ${assessmentStorageKey}`)
    console.log(`✓ Số câu RIASEC đã trả lời:     ${riasecCount} (kỳ vọng: 0 câu, Minh Anh có 30 câu)`)
    console.log(`✓ Attempt seed của trải nghiệm: ${expAttemptSeed} (kỳ vọng: không phải 'minh-anh-demo-2026')`)
    console.log(`✓ Số domain state có sẵn:       ${expDomainStatesCount} (kỳ vọng: 0 domain, Minh Anh có 3 domain với điểm 88, 84, 78)`)
    console.log(`✓ Báo cáo định hướng có sẵn:    ${reportPresent} (kỳ vọng: false/null, Minh Anh có report sẵn)`)
    console.log(`✓ Số ưu tiên/thế mạnh có sẵn:   ${strengthsCount} thế mạnh, ${prioritiesCount} ưu tiên (kỳ vọng: 0)`)

    if (riasecCount !== 0) {
      throw new Error(`Assessment storage chứa câu trả lời RIASEC mặc định (${riasecCount} câu), không phải tài khoản mới!`)
    }
    if (expAttemptSeed === 'minh-anh-demo-2026') {
      throw new Error(`Assessment storage chứa attemptSeed của Minh Anh demo!`)
    }
    if (expDomainStatesCount !== 0) {
      throw new Error(`Assessment storage chứa điểm trải nghiệm của Minh Anh (${expDomainStatesCount} domain)!`)
    }
    if (reportPresent) {
      throw new Error(`Assessment storage chứa report định hướng có sẵn của Minh Anh!`)
    }
    if (strengthsCount !== 0 || prioritiesCount !== 0) {
      throw new Error(`Assessment storage chứa thế mạnh/ưu tiên mặc định của Minh Anh!`)
    }

    console.log('✓ Assessment storage hoàn toàn trống và sạch: sẵn sàng cho người dùng làm assessment cá nhân hóa!')

    console.log('\n[Bước 6] Chụp ảnh màn hình giao diện /assessment để lưu minh chứng trực quan…')
    const screenshot = await client.send('Page.captureScreenshot', { format: 'png' })
    const screenshotPath = path.resolve(ROOT_DIR, 'docs', 'smoke-assessment-real-browser.png')
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true })
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'))
    console.log(`✓ Đã lưu ảnh chụp màn hình tại: ${screenshotPath}`)

    console.log('\n🎉 ========================================================')
    console.log('   TẤT CẢ CÁC BƯỚC SMOKE TEST TRÌNH DUYỆT THẬT ĐỀU THÀNH CÔNG!')
    console.log('   - /register mở và render hoàn hảo')
    console.log('   - Form đăng ký hoạt động với tài khoản mới')
    console.log('   - Tự động chuyển hướng chính xác vào /assessment')
    console.log('   - Local session lưu đúng tài khoản mới (isDemo: false)')
    console.log('   - Assessment storage tách biệt, không dính dữ liệu Minh Anh')
    console.log('========================================================\n')
  } finally {
    if (client) client.close()
    try { browserProc.kill('SIGKILL') } catch {}
    try { server.close() } catch {}
    try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }) } catch {}
  }
}

runSmokeTest().catch((err) => {
  console.error('\n❌ SMOKE TEST THẤT BẠI:', err)
  process.exit(1)
})
