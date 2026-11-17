import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { findBrowser, startStaticServer, waitHttp, CdpClient } from './smokeBrowserTest.js'

const { server, port } = await startStaticServer()
const debugPort = 10000 + Math.floor(Math.random() * 2000)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'uniview-data-mode-'))
const browser = spawn(findBrowser(), ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore', windowsHide: true })
let client
try {
  await waitHttp(`http://127.0.0.1:${debugPort}/json/version`, 40, 150)
  const targets = await waitHttp(`http://127.0.0.1:${debugPort}/json/list`)
  client = new CdpClient(targets.find((item) => item.type === 'page').webSocketDebuggerUrl)
  await client.connect()
  await client.send('Page.enable')
  await client.send('Runtime.enable')
  const errors = []
  client.on('Runtime.exceptionThrown', (event) => errors.push(event.exceptionDetails.text))
  await client.send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__apiRows = [];
    window.__apiError = false;
    window.__calls = [];
    const nativeFetch = window.fetch.bind(window);
    window.fetch = async (url, options) => {
      if (String(url).includes('/api/v1/')) {
        window.__calls.push(String(url));
        if (window.__apiError) throw new TypeError('API offline');
        if (String(url).endsWith('/auth/me')) return new Response(JSON.stringify({id:'api-student',fullName:'API student',role:'STUDENT',activePlans:['ANNUAL']}), {status:200,headers:{'Content-Type':'application/json'}});
        return new Response(JSON.stringify(String(url).endsWith('/status') ? {counts:{}} : window.__apiRows), {status:200, headers:{'Content-Type':'application/json'}});
      }
      return nativeFetch(url, options);
    };
  ` })
  const evaluate = async (expression) => {
    const result = await client.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw Error(result.exceptionDetails.text)
    return result.result.value
  }
  const until = async (expression) => {
    for (let i = 0; i < 80; i++) {
      if (await evaluate(expression)) return
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    throw Error(`Timed out: ${expression}\n${await evaluate('document.body.innerText')}`)
  }
  const open = async (route, mode = 'real') => {
    await client.send('Page.navigate', { url: `http://127.0.0.1:${port}${route}` })
    await until('document.readyState === "complete" && !!document.querySelector("main")')
    await evaluate(`localStorage.setItem('uniview-data-mode-v1', '${mode}'); location.reload()`)
    await until(`localStorage.getItem('uniview-data-mode-v1') === '${mode}' && !!document.querySelector('main')`)
  }
  await open('/universities')
  await until('document.body.innerText.includes("Chưa có dữ liệu trường đại học")')
  assert.equal(await evaluate('document.querySelectorAll("article").length'), 0)
  await evaluate('window.toggleUniViewDevTools()')
  await until('!!Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Mock"))')
  await evaluate('Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Mock")).click()')
  await until('document.body.innerText.includes("42 trường phù hợp")')
  await evaluate('Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Real API")).click()')
  await until('document.body.innerText.includes("Chưa có dữ liệu trường đại học")')
  assert.equal(await evaluate('document.body.innerText.includes("42 trường phù hợp")'), false)
  console.log('PASS universities: empty API, mock 42 rows, switch back clears mock')
  await open('/majors')
  await until('document.body.innerText.includes("Chưa có dữ liệu ngành học")')
  await evaluate('window.__apiError = true; history.pushState({}, "", "/universities"); window.dispatchEvent(new PopStateEvent("popstate"))')
  await until('document.body.innerText.includes("Không thể tải danh sách trường")')
  await evaluate('window.__apiError = false; window.__apiRows = [{id:"real-school",name:"Trường từ API",city:"Huế"}]; Array.from(document.querySelectorAll("button")).find(b => b.textContent === "Thử lại").click()')
  await until('document.body.innerText.includes("Trường từ API")')
  assert.equal(await evaluate('document.body.innerText.includes("Đại học Quốc gia")'), false)
  console.log('PASS catalog: error is visible; retry renders API record without mock enrichment')
  await open('/universities/uit?universityId=uit')
  await until('document.body.innerText.includes("Chưa có dữ liệu trường đại học")')
  await open('/majors/software-engineering')
  await until('document.body.innerText.includes("Chưa có dữ liệu ngành học")')
  await open('/admission-checker')
  await until('document.body.innerText.includes("Hiện tại chưa có dữ liệu để đối chiếu") && !!document.querySelector("input[type=number]")')
  assert.equal(await evaluate('document.body.innerText.includes("NaN")'), false)
  assert.equal(await evaluate('Array.from(document.querySelectorAll("input[type=number]")).some(input => input.value === "25.50")'), false)
  await open('/compare')
  await until('document.body.innerText.includes("Nhập hồ sơ và tiêu chí của bạn") && !!document.querySelector("input[type=number]")')
  await evaluate(`
    const scoreInput = document.querySelector('input[type=number]');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(scoreInput, '26');
    scoreInput.dispatchEvent(new Event('input', {bubbles:true}));
  `)
  await until('document.querySelector("input[type=number]").value === "26"')
  assert.equal(await evaluate('document.body.innerText.includes("Hiện tại chưa có dữ liệu để đối chiếu")'), true)
  assert.equal(await evaluate('document.querySelectorAll("select option").length > 0'), true)
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.textContent.includes("Thêm trường thứ")).click()')
  await until('!!document.querySelector("[role=dialog]")')
  assert.equal(await evaluate('document.querySelector("[role=dialog]").innerText.includes("Đại học Quốc gia")'), false)
  console.log('PASS compare and admission checker retain editable score inputs with inline empty results')
  await evaluate('localStorage.setItem("uniview-jwt-token-v1", "test-only-token")')
  for (const route of ['/scenario-comparison', '/admission-roadmap']) {
    await open(route)
    await until('document.body.innerText.includes("Hiện tại chưa có dữ liệu để đối chiếu") && !!document.querySelector("input[type=number]")')
    assert.equal(await evaluate('document.body.innerText.includes("(+7 chương trình)")'), false)
    assert.equal(await evaluate('document.body.innerText.includes("Trường Đại học Công nghệ Thông tin (UIT)")'), false)
  }
  await evaluate('localStorage.removeItem("uniview-jwt-token-v1")')
  console.log('PASS scenario and admission roadmap keep forms without demo comparison records')
  await open('/login')
  await until('!!document.querySelector("#emailInput")')
  await evaluate(`
    window.__apiError = true;
    const setInput = (id, value) => {
      const input = document.getElementById(id);
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new Event('input', {bubbles:true}));
    };
    setInput('emailInput', 'minhanh'); setInput('passwordInput', 'MinhAnh@2026');
  `)
  await evaluate('document.querySelector("#loginSubmitBtn").click()')
  await until('window.__calls.some(url => url.endsWith("/auth/login")) && document.body.innerText.includes("API offline")')
  assert.equal(await evaluate('location.pathname'), '/login')
  assert.equal(await evaluate('localStorage.getItem("uniview-auth-session-v4")'), null)
  console.log('PASS API login failure cannot fall back to a valid demo account')
  await evaluate('document.querySelector("aside img").parentElement.click()')
  await until('!!document.querySelector("textarea")')
  await evaluate(`
    const textarea = document.querySelector('textarea');
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(textarea, 'Kiểm tra góp ý API');
    textarea.dispatchEvent(new Event('input', {bubbles:true}));
  `)
  await evaluate('document.querySelector("textarea").closest("form").dispatchEvent(new Event("submit", {bubbles:true,cancelable:true}))')
  await until('document.body.innerText.includes("Chưa gửi được góp ý")')
  assert.equal(await evaluate('localStorage.getItem("uniview_feedback_sent_v1:real")'), null)
  assert.equal(await evaluate('localStorage.getItem("uniview-feedback-submissions-v1")'), null)
  console.log('PASS failed API feedback neither reports success nor saves mock feedback')
  await open('/', 'real')
  await until('document.body.innerText.includes("Hiểu mình hơn")')
  assert.equal(await evaluate('document.body.innerText.includes("250+ trường đại học")'), false)
  console.log('PASS landing page hides sample catalog records and counts in API mode')
  assert.deepEqual(errors, [])
} finally {
  client?.close()
  browser.kill()
  await new Promise((resolve) => browser.once('exit', resolve))
  server.close()
  const resolved = path.resolve(profile)
  if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('uniview-data-mode-')) fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
}
