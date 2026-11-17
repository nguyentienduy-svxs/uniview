import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { findBrowser, startStaticServer, waitHttp, CdpClient } from './smokeBrowserTest.js'

const { server, port } = await startStaticServer()
const debugPort = 10000 + Math.floor(Math.random() * 2000)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'uniview-data-mode-'))
const browser = spawn(findBrowser(), ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore', windowsHide: true })
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
        const apiUser = {id:'api-student',email:'lamhuynhhueman@gmail.com',fullName:'API student',role:'STUDENT',activePlans:JSON.parse(sessionStorage.getItem('test-api-plans') ?? '["ANNUAL"]')};
        if (String(url).endsWith('/auth/me')) return new Response(JSON.stringify(apiUser), {status:200,headers:{'Content-Type':'application/json'}});
        if (String(url).endsWith('/auth/login')) {
          const credentials = JSON.parse(options.body);
          const valid = credentials.identifier === apiUser.email && credentials.password === 'test-password';
          return new Response(JSON.stringify(valid ? {user:apiUser,token:'verified-api-session'} : {message:'Sai tài khoản hoặc mật khẩu'}), {status:valid ? 200 : 401,headers:{'Content-Type':'application/json'}});
        }
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
  await open('/login', 'mock')
  await until('!!document.querySelector("#emailInput")')
  const enterCredentials = async (password) => {
    await evaluate(`(() => {
      const setInput = (id, value) => {
        const input = document.getElementById(id);
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value);
        input.dispatchEvent(new Event('input', {bubbles:true}));
      };
      setInput('emailInput', 'lamhuynhhueman@gmail.com');
      setInput('passwordInput', ${JSON.stringify(password)});
    })()`)
    await evaluate('document.querySelector("#loginSubmitBtn").click()')
  }
  await enterCredentials('wrong-password')
  await until('document.body.innerText.includes("Sai tài khoản hoặc mật khẩu")')
  assert.equal(await evaluate('localStorage.getItem("uniview-jwt-token-v1")'), null)
  await enterCredentials('test-password')
  await until('localStorage.getItem("uniview-jwt-token-v1") === "verified-api-session" && location.pathname !== "/login"')
  await open('/profile', 'mock')
  await until('document.body.innerText.includes("API student")')
  await until('!!document.querySelector("[data-testid=edit-academic-profile]")')
  await evaluate('document.querySelector("[data-testid=edit-academic-profile]").click()')
  await until('!!document.querySelector("[data-testid=academic-thpt]")')
  await evaluate(`
    const input = document.querySelector('[data-testid=academic-thpt]');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, '26.25');
    input.dispatchEvent(new Event('input', {bubbles:true}));
    document.querySelector('[data-testid=save-academic-profile]').click();
  `)
  await until('!document.querySelector("[data-testid=academic-thpt]")')
  await open('/admission-checker', 'mock')
  await until('document.querySelector("[data-testid=checker-thpt-score]")?.value === "26.25"')
  await open('/admission-roadmap', 'mock')
  await until('document.body.innerText.includes("26.25") && document.body.innerText.includes("875")')
  await open('/scenario-comparison', 'mock')
  await until('document.body.innerText.includes("THPT 26.25") && document.body.innerText.includes("ĐGNL 875")')
  console.log('PASS profile edit persists and synchronizes Checker, Route Mapping and Scenario A')
  await open('/profile', 'mock')
  await until('document.body.innerText.includes("API student")')
  await evaluate('if (!Array.from(document.querySelectorAll("button")).some(b => b.textContent.includes("Real API"))) window.toggleUniViewDevTools()')
  await until('!!Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Real API"))')
  await evaluate('Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Real API")).click()')
  await until('localStorage.getItem("uniview-data-mode-v1") === "real" && document.body.innerText.includes("API student")')
  await evaluate('Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Mock")).click()')
  await until('localStorage.getItem("uniview-data-mode-v1") === "mock" && document.body.innerText.includes("API student")')
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("uniview-auth-session-v4")).mockWorkspace'), true)
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("uniview-auth-session-v4")).user.academicProfile.thptScore.value'), '26.25')
  await open('/profile', 'mock')
  await until('document.body.innerText.includes("API student")')
  await evaluate('if (!document.querySelector("[data-testid=reset-pitch-demo]")) window.toggleUniViewDevTools()')
  await until('!!document.querySelector("[data-testid=reset-pitch-demo]")')
  await evaluate('document.querySelector("[data-testid=reset-pitch-demo]").click()')
  await until('document.readyState === "complete" && !!document.querySelector("main")')
  await open('/admission-checker', 'mock')
  await until('document.querySelector("[data-testid=checker-thpt-score]")?.value === "25.50"')
  console.log('PASS database account logs in from Mock, survives mode switches/reload, and reset restores canonical demo data')
  await open('/report?tab=overview', 'mock')
  await until('document.body.innerText.includes("Bản đồ định hướng") && document.body.innerText.includes("3 nhóm ngành · 18 ngành")')
  for (const tab of ['Tổng quan', 'Chân dung cá nhân', 'Nhóm ngành & ngành', 'Học tập & tuyển sinh', 'Bước tiếp theo']) {
    await evaluate(`Array.from(document.querySelectorAll('nav button')).find(button => button.textContent.includes(${JSON.stringify(tab)})).click()`)
    await until(`new URLSearchParams(location.search).get('tab') === ${JSON.stringify(tab === 'Tổng quan' ? 'overview' : tab === 'Chân dung cá nhân' ? 'portrait' : tab === 'Nhóm ngành & ngành' ? 'majors' : tab === 'Học tập & tuyển sinh' ? 'academic' : 'next')}`)
  }
  await open('/report?tab=majors', 'mock')
  await until('document.querySelectorAll("article").length >= 6 && document.body.innerText.includes("Lưu Shortlist")')
  assert.equal(await evaluate('Array.from(document.querySelectorAll("article")).filter(article => article.querySelector("a[href^=\'/report/major/\']")).length'), 6)
  const selectedMajorId = await evaluate('document.querySelector("a[href^=\'/report/major/\']").getAttribute("href").split("/")[3].split("?")[0]')
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.textContent.includes("Lưu Shortlist")).click()')
  await until('document.body.innerText.includes("Đã lưu")')
  assert.equal(await evaluate(`JSON.parse(localStorage.getItem('uniview-journey-v1:api-student')).majorShortlist.includes(${JSON.stringify(selectedMajorId)})`), true)
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.textContent.includes("Bắt đầu Roadmap")).click()')
  await until(`location.pathname === '/roadmap/major/' + ${JSON.stringify(selectedMajorId)}`)
  assert.equal(await evaluate(`Boolean(JSON.parse(localStorage.getItem('uniview-journey-v1:api-student')).majorRoadmaps[${JSON.stringify(selectedMajorId)}])`), true)
  await open('/report?tab=majors', 'mock')
  await until('document.body.innerText.includes("Tiếp tục Roadmap")')
  await open('/report/pdf', 'mock')
  await until('document.querySelectorAll(".pdf-a4-page").length === 7')
  assert.equal(await evaluate('document.querySelectorAll(".pdf-major-six article").length'), 18)
  assert.equal(await evaluate('document.body.innerText.toLowerCase().includes("localhost")'), false)
  const printedPdf = await client.send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true })
  const pdfArtifactDir = path.resolve('artifacts')
  fs.mkdirSync(pdfArtifactDir, { recursive: true })
  const pdfArtifactPath = path.join(pdfArtifactDir, 'UniView_Assessment_Mock_Sample.pdf')
  fs.writeFileSync(pdfArtifactPath, Buffer.from(printedPdf.data, 'base64'))
  assert.equal(fs.statSync(pdfArtifactPath).size > 10000, true)
  console.log('PASS Assessment Report tabs, 3x6 majors, Shortlist/Roadmap persistence and synchronized 7-page PDF')
  await open('/decision-board', 'mock')
  await until('document.body.innerText.includes("Decision Board")')
  await until('!!Array.from(document.querySelectorAll("button")).find(button => button.querySelector(".material-symbols-outlined")?.textContent === "add")')
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.querySelector(".material-symbols-outlined")?.textContent === "add").click()')
  await until('!!document.querySelector("[role=dialog] input[name=university]")')
  await evaluate(`
    const setNamedInput = (name, value) => {
      const input = document.querySelector('[role=dialog] input[name=' + name + ']');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new Event('input', {bubbles:true}));
    };
    setNamedInput('university', 'Trường kiểm thử pitching');
    setNamedInput('major', 'Kỹ thuật phần mềm');
    setNamedInput('campus', 'TP.HCM');
    document.querySelector('[role=dialog] form').dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}));
  `)
  await until('document.body.innerText.includes("Trường kiểm thử pitching") && !document.querySelector("[role=dialog]")')
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("uniview-journey-v1:api-student")).decisionChoices.length'), 1)
  await open('/decision-board', 'mock')
  await until('document.body.innerText.includes("Trường kiểm thử pitching")')
  console.log('PASS Decision Board selection uses shared Mock state and survives refresh')
  await evaluate('sessionStorage.setItem("test-api-plans", "[]")')
  await open('/profile', 'real')
  await until('!!document.querySelector("#profile-nav") && document.body.innerText.includes("API student")')
  assert.equal(await evaluate('document.body.innerText.includes("Gói đang hoạt động")'), false)
  await evaluate(`document.querySelector('#profile-nav a[href="/profile?tab=plans"]').click()`)
  await until('!!document.querySelector("#profile-plans-title")')
  assert.equal(await evaluate(`document.querySelectorAll('[aria-label="Các gói UniView"] article').length`), 3)
  assert.equal(await evaluate('document.querySelector("#section-personal").hidden'), true)
  assert.equal(await evaluate('document.body.innerText.includes("Bạn chưa kích hoạt gói")'), true)
  const planLinks = await evaluate(`Array.from(document.querySelectorAll('[aria-label="Các gói UniView"] article a')).map(a=>({href:a.getAttribute('href'),label:a.getAttribute('aria-label')}))`)
  for (const plan of planLinks) {
    await evaluate(`Array.from(document.querySelectorAll('a')).find(a=>a.getAttribute('aria-label')===${JSON.stringify(plan.label)}).click()`)
    await until('!!document.querySelector("#plan-detail-title")')
    assert.equal(await evaluate('document.body.innerText.includes("Quyền lợi của gói") && document.body.innerText.includes("Phù hợp với ai?") && document.body.innerText.includes("Thời hạn sử dụng")'), true)
    await evaluate('history.back()')
    await until('!!document.querySelector("#profile-plans-title")')
  }
  await open('/account/plan', 'real')
  await until('location.pathname === "/profile" && !!document.querySelector("#profile-plans-title")')
  console.log('PASS profile plan navigation: three plans for an unsubscribed account, working details/back, legacy URL redirects')
  await evaluate('sessionStorage.setItem("test-api-plans", \'["ANNUAL"]\')')
  await open('/profile?tab=plans&plan=ADMISSION_PASS', 'real')
  await until('document.body.innerText.includes("Đã bao gồm trong Gói Năm của bạn")')
  assert.equal(await evaluate(`document.querySelector('[aria-labelledby="plan-detail-title"] a[href="/admission-pass"]') === null`), true)
  await client.send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:false})
  await open('/profile?tab=plans', 'real')
  await until('!!document.querySelector("#profile-plans-title")')
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true)
  console.log('PASS annual plan includes Admission Pass without a duplicate purchase; plan management fits mobile')
  assert.deepEqual(errors, [])
} finally {
  client?.close()
  if (browser.exitCode === null) {
    browser.kill()
    await new Promise((resolve) => browser.once('exit', resolve))
  }
  server.close()
  const resolved = path.resolve(profile)
  if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('uniview-data-mode-')) fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
}
