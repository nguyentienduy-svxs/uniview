import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { JourneyToast, TaskProgress } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoTask } from '../data/annualDemo'
import { majorRoadmapPath } from '../utils/roadmapRoutes'
import {
  createDeadlineAppDraft,
  createScoreDebugDraft,
  createSignupTestDraft,
  DEADLINE_APP_CHALLENGE,
  DEADLINE_APP_WORKSPACE_KEY,
  evaluateDeadlineAppDraft,
  evaluateScoreDebugDraft,
  evaluateSignupTestDraft,
  SCORE_DEBUG_CHALLENGE,
  SCORE_DEBUG_WORKSPACE_KEY,
  SIGNUP_TEST_CHALLENGE,
  SIGNUP_TEST_WORKSPACE_KEY,
} from '../data/taskWorkspaces'

function WorkspaceHeader({ task }) {
  const { saveDraft } = useJourney()
  const showDemoFill = import.meta.env.DEV || Boolean(import.meta.env.VITE_DEMO_SCENARIO)
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link to={majorRoadmapPath(task.majorId)} className="text-sm font-bold text-blue-600">← Trở về Roadmap · {task.majorName}</Link>
      <div className="flex items-center gap-4">
        {showDemoFill && task.demoAnswer && <button type="button" onClick={() => saveDraft(task.id, task.demoAnswer.draft)} className="text-sm font-bold text-blue-600 hover:text-blue-800">Điền bài mẫu (Demo)</button>}
        <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><span className="material-symbols-outlined text-base">cloud_done</span>Bài làm được lưu tự động</span>
      </div>
    </div>
  )
}

function TaskSidebar({ task, record }) {
  return (
    <aside className="h-fit space-y-4 lg:sticky lg:top-24">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-300">{task.majorName}</p>
        <h1 className="mt-2 text-xl font-black leading-7">{task.title}</h1>
        <div className="mt-5"><TaskProgress value={record.progress} /></div>
        <p className="mt-2 text-xs text-slate-300">{record.progress}% tiến độ</p>
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs font-bold uppercase text-slate-400">Evidence cần nộp</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{task.evidence}</p>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">Rubric</p>
        <ul className="mt-3 space-y-3">
          {task.rubric.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-slate-600"><span className="material-symbols-outlined text-base text-emerald-600">check_circle</span><span>{item}</span></li>)}
        </ul>
      </section>
    </aside>
  )
}

function ResultItem({ done, children }) {
  return (
    <li className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ${done ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
      <span className="material-symbols-outlined text-base">{done ? 'check_circle' : 'cancel'}</span>
      <span>{children}</span>
    </li>
  )
}

function ScoreDebugWorkspace({ task, record, saveDraft, setToast }) {
  const [answer, setAnswer] = useState(() => createScoreDebugDraft(record.draft))
  const [evaluation, setEvaluation] = useState(null)
  const showDemoFill = import.meta.env.DEV || Boolean(import.meta.env.VITE_DEMO_SCENARIO)

  const persist = (nextAnswer) => {
    setAnswer(nextAnswer)
    setEvaluation(null)
    saveDraft(task.id, JSON.stringify(nextAnswer))
  }

  const setField = (field, value) => persist({ ...answer, [field]: value })
  const setTestScore = (field, value) => persist({
    ...answer,
    testCase: { ...answer.testCase, [field]: value },
  })

  const fillDemo = () => {
    const nextAnswer = structuredClone(SCORE_DEBUG_CHALLENGE.demoAnswer)
    persist(nextAnswer)
    setToast({ type: 'success', message: 'Đã điền bài mẫu. Cậu vẫn có thể chỉnh sửa trước khi chạy kiểm tra.' })
  }

  const runChecks = () => {
    const nextEvaluation = evaluateScoreDebugDraft(answer)
    setEvaluation(nextEvaluation)
    saveDraft(task.id, JSON.stringify(answer))
    setToast({
      type: nextEvaluation.passed ? 'success' : 'warning',
      message: nextEvaluation.passed
        ? 'Bài làm đạt 5/5 tiêu chí và đã sẵn sàng để review.'
        : 'Bài làm còn tiêu chí chưa đạt. Xem kết quả kiểm tra ở cuối trang.',
    })
  }

  return (
    <main className="min-h-screen bg-[#eef2ff] py-8">
      <JourneyToast />
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6">
        <WorkspaceHeader task={task} />
        <div className="mt-5 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <TaskSidebar task={task} record={record} />
          <div className="min-w-0 space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-blue-600">Nhiệm vụ {SCORE_DEBUG_CHALLENGE.ticket}</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">Tìm và sửa lỗi tính điểm trung bình</h2>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Python · Debugging cơ bản</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{SCORE_DEBUG_CHALLENGE.scenario}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['1', 'Sửa công thức', 'Tìm lỗi và sửa trực tiếp trong editor.'],
                  ['2', 'Kiểm chứng', 'Nhập một bộ điểm để chạy test case.'],
                  ['3', 'Giải thích', 'Nêu nguyên nhân và cách xử lý dữ liệu thiếu.'],
                ].map(([number, title, body]) => <div key={number} className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black text-blue-600">BƯỚC {number}</span><p className="mt-1 text-sm font-extrabold text-slate-900">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{body}</p></div>)}
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div><p className="text-xs font-black uppercase tracking-wider text-blue-600">score.py</p><h3 className="mt-1 font-black text-slate-950">Mã nguồn cần sửa</h3></div>
                <span className="text-xs font-semibold text-slate-500">Không thực thi Python tùy ý</span>
              </div>
              <textarea aria-label="Mã Python cần sửa" value={answer.source} onChange={(event) => setField('source', event.target.value)} spellCheck="false" className="min-h-[330px] w-full resize-y bg-slate-950 p-6 font-mono text-[14px] leading-7 text-slate-100 outline-none" />
              <div className="border-t border-slate-800 bg-slate-900 px-6 py-3 font-mono text-xs text-slate-400">Mục tiêu mẫu: điểm 8, 7, 9 phải cho average = 8.0 và in “Excellent”.</div>
            </section>

            <section className="grid gap-5 lg:grid-cols-2">
              <label className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">Giải thích nguyên nhân</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">Vì sao biểu thức cũ cho kết quả sai? Hãy nhắc tới thứ tự thực hiện phép toán.</span>
                <textarea value={answer.explanation} onChange={(event) => setField('explanation', event.target.value)} className="mt-4 min-h-36 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-400" placeholder="Theo mình, lỗi xảy ra vì…" />
              </label>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-blue-600">Test case của bạn</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Nhập một bộ điểm hợp lệ từ 0 đến 10.</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[['math', 'Toán'], ['english', 'Anh'], ['informatics', 'Tin']].map(([field, label]) => <label key={field} className="text-xs font-bold text-slate-600">{label}<input type="number" min="0" max="10" step="0.1" value={answer.testCase[field]} onChange={(event) => setTestScore(field, event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-blue-400" /></label>)}
                </div>
                {evaluation?.validTestCase && <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">Kết quả: average = {evaluation.customAverage.toFixed(2)} → {evaluation.customLabel}</div>}
              </div>
            </section>

            <label className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">Trường hợp thiếu dữ liệu</span>
              <span className="mt-2 block text-sm leading-6 text-slate-600">Nếu một môn chưa có điểm, chương trình nên xử lý thế nào? Không được mặc định coi điểm trống là 0.</span>
              <textarea value={answer.missingHandling} onChange={(event) => setField('missingHandling', event.target.value)} className="mt-4 min-h-28 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-400" placeholder="Trước khi tính trung bình, chương trình cần…" />
            </label>

            {evaluation && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-slate-950">Kết quả kiểm tra</h3><span className={`rounded-full px-3 py-1 text-xs font-black ${evaluation.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{evaluation.passed ? '5/5 tiêu chí đạt' : 'Cần chỉnh sửa'}</span></div><ul className="mt-4 grid gap-2 sm:grid-cols-2"><ResultItem done={evaluation.formulaCorrect}>Công thức tính trung bình đúng</ResultItem><ResultItem done={evaluation.keepsClassification}>Giữ quy tắc xếp loại average ≥ 8</ResultItem><ResultItem done={evaluation.explainsPrecedence}>Giải thích đúng nguyên nhân lỗi</ResultItem><ResultItem done={evaluation.validTestCase}>Test case có điểm từ 0 đến 10</ResultItem><ResultItem done={evaluation.handlesMissing}>Có phương án xử lý điểm bị thiếu</ResultItem></ul></section>}

            <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div>{showDemoFill && <button type="button" onClick={fillDemo} className="text-sm font-bold text-blue-600 hover:text-blue-800">Điền bài mẫu (Demo)</button>}</div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={runChecks} className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-700">▶ Chạy kiểm tra</button>
                {evaluation?.passed ? <Link to={`/tasks/${task.id}/review`} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white">Review và nộp bài →</Link> : <span className="cursor-not-allowed rounded-xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-500">Hoàn thành kiểm tra để tiếp tục</span>}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

function DeadlineAppWorkspace({ task, record, saveDraft, setToast }) {
  const [answer, setAnswer] = useState(() => createDeadlineAppDraft(record.draft))
  const [evaluation, setEvaluation] = useState(null)
  const showDemoFill = import.meta.env.DEV || Boolean(import.meta.env.VITE_DEMO_SCENARIO)
  const persist = (next) => { setAnswer(next); setEvaluation(null); saveDraft(task.id, JSON.stringify(next)) }
  const setField = (field, value) => persist({ ...answer, [field]: value })
  const toggleFeature = (featureId) => {
    const selected = answer.features.includes(featureId)
      ? answer.features.filter((id) => id !== featureId)
      : answer.features.length < 3 ? [...answer.features, featureId] : answer.features
    persist({ ...answer, features: selected, firstFeature: selected.includes(answer.firstFeature) ? answer.firstFeature : '' })
  }
  const runChecks = () => {
    const result = evaluateDeadlineAppDraft(answer)
    setEvaluation(result)
    setToast({ type: result.passed ? 'success' : 'warning', message: result.passed ? 'Bài thiết kế đạt đủ 5 tiêu chí.' : 'Bài làm còn thiếu nội dung. Xem checklist để bổ sung.' })
  }
  const fillDemo = () => persist(structuredClone(DEADLINE_APP_CHALLENGE.demoAnswer))

  return (
    <main className="min-h-screen bg-[#eef2ff] py-8"><JourneyToast /><div className="mx-auto max-w-[1380px] px-4 sm:px-6"><WorkspaceHeader task={task} /><div className="mt-5 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]"><TaskSidebar task={task} record={record} /><div className="min-w-0 space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><p className="text-xs font-black uppercase tracking-wider text-blue-600">Nhiệm vụ {DEADLINE_APP_CHALLENGE.ticket}</p><h2 className="mt-1 text-2xl font-black text-slate-950">Thiết kế ứng dụng quản lý deadline</h2><p className="mt-4 text-sm leading-7 text-slate-600">{DEADLINE_APP_CHALLENGE.scenario}</p></section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><label className="block"><span className="text-sm font-extrabold text-slate-900">1. Vấn đề chính của người dùng là gì?</span><textarea value={answer.problem} onChange={(event) => setField('problem', event.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-400" placeholder="Mô tả người dùng, khó khăn và hậu quả…" /></label></section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-extrabold text-slate-900">2. Chọn đúng ba tính năng ưu tiên</h3><span className={`text-xs font-black ${answer.features.length === 3 ? 'text-emerald-700' : 'text-blue-700'}`}>{answer.features.length}/3 đã chọn</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{DEADLINE_APP_CHALLENGE.features.map(([id, label]) => { const active = answer.features.includes(id); return <button key={id} type="button" onClick={() => toggleFeature(id)} className={`rounded-xl border p-4 text-left text-sm font-bold transition ${active ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-100' : 'border-slate-200 text-slate-700 hover:border-blue-300'}`}><span className="material-symbols-outlined mr-2 align-middle text-lg">{active ? 'check_circle' : 'add_circle'}</span>{label}</button> })}</div></section>
      <section className="grid gap-5 lg:grid-cols-2"><label className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-sm font-extrabold text-slate-900">3. Luồng tạo một deadline</span><textarea value={answer.flow} onChange={(event) => setField('flow', event.target.value)} className="mt-3 min-h-36 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-400" placeholder="Mở ứng dụng → … → Lưu deadline" /></label><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><label className="block text-sm font-extrabold text-slate-900">4. Tính năng nào cần làm trước?<select value={answer.firstFeature} onChange={(event) => setField('firstFeature', event.target.value)} className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400"><option value="">Chọn trong ba tính năng đã ưu tiên</option>{DEADLINE_APP_CHALLENGE.features.filter(([id]) => answer.features.includes(id)).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label className="mt-4 block text-sm font-extrabold text-slate-900">Vì sao?<textarea value={answer.justification} onChange={(event) => setField('justification', event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-blue-400" /></label></div></section>
      <label className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-sm font-extrabold text-slate-900">5. Một điểm yếu hoặc trade-off của giải pháp</span><textarea value={answer.weakness} onChange={(event) => setField('weakness', event.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-400" placeholder="Giải pháp có thể chưa xử lý tốt…" /></label>
      {evaluation && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-black text-slate-950">Checklist đánh giá</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2"><ResultItem done={evaluation.understandsProblem}>Mô tả rõ vấn đề người dùng</ResultItem><ResultItem done={evaluation.selectedThree}>Chọn đúng ba tính năng</ResultItem><ResultItem done={evaluation.logicalFlow}>User flow đủ bước và logic</ResultItem><ResultItem done={evaluation.prioritizesFeature}>Ưu tiên tính năng có lý do</ResultItem><ResultItem done={evaluation.recognizesTradeoff}>Nhận diện được trade-off</ResultItem></ul></section>}
      <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div>{showDemoFill && <button type="button" onClick={fillDemo} className="text-sm font-bold text-blue-600">Điền bài mẫu (Demo)</button>}</div><div className="flex gap-3"><button type="button" onClick={runChecks} className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-700">Kiểm tra bài làm</button>{evaluation?.passed ? <Link to={`/tasks/${task.id}/review`} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white">Review và nộp bài →</Link> : <span className="cursor-not-allowed rounded-xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-500">Hoàn thành để tiếp tục</span>}</div></footer>
    </div></div></div></main>
  )
}

function SignupTestWorkspace({ task, record, saveDraft, setToast }) {
  const [answer, setAnswer] = useState(() => createSignupTestDraft(record.draft))
  const [evaluation, setEvaluation] = useState(null)
  const showDemoFill = import.meta.env.DEV || Boolean(import.meta.env.VITE_DEMO_SCENARIO)
  const persist = (next) => { setAnswer(next); setEvaluation(null); saveDraft(task.id, JSON.stringify(next)) }
  const updateRow = (index, field, value) => persist({ ...answer, rows: answer.rows.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row) })
  const addRow = () => persist({ ...answer, rows: [...answer.rows, { scenario: '', expected: '', reason: '', type: '' }] })
  const removeRow = (index) => { if (answer.rows.length > 6) persist({ ...answer, rows: answer.rows.filter((_, rowIndex) => rowIndex !== index) }) }
  const fillDemo = () => persist({ rows: structuredClone(SIGNUP_TEST_CHALLENGE.demoRows) })
  const runChecks = () => {
    const result = evaluateSignupTestDraft(answer)
    setEvaluation(result)
    setToast({ type: result.passed ? 'success' : 'warning', message: result.passed ? `Bộ ${result.completedCount} test case đã bao phủ yêu cầu và biên.` : 'Bộ test còn thiếu độ bao phủ hoặc giải thích.' })
  }
  return (
    <main className="min-h-screen bg-[#eef2ff] py-8"><JourneyToast /><div className="mx-auto max-w-[1500px] px-4 sm:px-6"><WorkspaceHeader task={task} /><div className="mt-5 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]"><TaskSidebar task={task} record={record} /><div className="min-w-0 space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><p className="text-xs font-black uppercase tracking-wider text-blue-600">Nhiệm vụ {SIGNUP_TEST_CHALLENGE.ticket}</p><h2 className="mt-1 text-2xl font-black text-slate-950">Lập bảng kiểm thử đăng ký tài khoản</h2><p className="mt-4 text-sm leading-7 text-slate-600">{SIGNUP_TEST_CHALLENGE.scenario}</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{SIGNUP_TEST_CHALLENGE.requirements.map((item) => <div key={item} className="flex gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700"><span className="material-symbols-outlined text-base text-blue-600">rule</span>{item}</div>)}</div></section>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h3 className="font-black text-slate-950">Bảng test case</h3><p className="mt-1 text-xs text-slate-500">Tối thiểu 6 dòng đầy đủ; khuyến khích thêm trường hợp biên.</p></div><button type="button" onClick={addRow} className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">+ Thêm test case</button></div><div className="overflow-x-auto"><table className="min-w-[980px] w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="w-12 px-3 py-3">#</th><th className="px-3 py-3">Tình huống / đầu vào</th><th className="px-3 py-3">Kết quả mong đợi</th><th className="px-3 py-3">Lý do</th><th className="w-40 px-3 py-3">Loại</th><th className="w-12"></th></tr></thead><tbody className="divide-y divide-slate-100">{answer.rows.map((row, index) => <tr key={index} className="align-top"><td className="px-3 py-3 font-black text-blue-600">{index + 1}</td>{['scenario', 'expected', 'reason'].map((field) => <td key={field} className="px-2 py-2"><textarea value={row[field]} onChange={(event) => updateRow(index, field, event.target.value)} rows="2" className="w-full resize-none rounded-lg border border-slate-200 p-2.5 leading-5 outline-none focus:border-blue-400" /></td>)}<td className="px-2 py-2"><select value={row.type} onChange={(event) => updateRow(index, 'type', event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none"><option value="">Chọn loại</option><option>Luồng đúng</option><option>Ngoại lệ</option><option>Biên dưới</option><option>Giá trị biên</option><option>Biên trên</option></select></td><td className="px-2 py-3"><button type="button" disabled={answer.rows.length <= 6} onClick={() => removeRow(index)} className="text-slate-400 hover:text-rose-600 disabled:opacity-20"><span className="material-symbols-outlined">delete</span></button></td></tr>)}</tbody></table></div></section>
      {evaluation && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex justify-between gap-3"><h3 className="font-black text-slate-950">Độ bao phủ</h3><span className="text-xs font-black text-blue-700">{evaluation.completedCount} test case đầy đủ</span></div><ul className="mt-4 grid gap-2 sm:grid-cols-2"><ResultItem done={evaluation.enoughCases}>Có ít nhất 6 test case</ResultItem><ResultItem done={evaluation.coversRequirements}>Bao phủ email, mật khẩu, tuổi và trùng email</ResultItem><ResultItem done={evaluation.coversBoundaries}>Có giá trị biên</ResultItem><ResultItem done={evaluation.explainsCases}>Mỗi case có giải thích đủ rõ</ResultItem></ul></section>}
      <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div>{showDemoFill && <button type="button" onClick={fillDemo} className="text-sm font-bold text-blue-600">Điền 11 test case mẫu (Demo)</button>}</div><div className="flex gap-3"><button type="button" onClick={runChecks} className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-700">Kiểm tra độ bao phủ</button>{evaluation?.passed ? <Link to={`/tasks/${task.id}/review`} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white">Review và nộp bài →</Link> : <span className="cursor-not-allowed rounded-xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-500">Hoàn thành để tiếp tục</span>}</div></footer>
    </div></div></div></main>
  )
}

function StructuredWorkspace({ task, record, saveDraft }) {
  const draft = record.draft ?? ''
  const updateDraft = (value) => saveDraft(task.id, value)
  return (
    <main className="min-h-screen bg-[#eef2ff] py-8"><JourneyToast /><div className="mx-auto max-w-7xl px-4 sm:px-6"><WorkspaceHeader task={task} /><div className="mt-5 grid gap-6 lg:grid-cols-[300px_1fr]"><TaskSidebar task={task} record={record} /><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><p className="text-xs font-black uppercase tracking-wider text-blue-600">Bài làm của bạn</p><h2 className="mt-1 text-2xl font-black text-slate-950">Thực hiện theo brief</h2><div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-sm font-extrabold text-blue-950">Đầu ra cần bàn giao</p><p className="mt-2 text-sm leading-6 text-blue-900">{task.evidence}</p></div><label className="mt-6 block"><span className="text-sm font-extrabold text-slate-900">Bản làm, quyết định và điều còn chưa chắc chắn</span><textarea value={draft} onChange={(event) => updateDraft(event.target.value)} className="mt-2 min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 outline-none focus:border-blue-400 focus:bg-white" placeholder="Trình bày cách bạn hiểu brief, quá trình thực hiện, các quyết định và điều muốn xin thêm phản hồi…" /></label><div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5"><p className="text-xs text-slate-500">Bản làm được lưu tự động và chưa bị chấm khi chưa nộp.</p><Link to={`/tasks/${task.id}/review`} className={`rounded-xl px-6 py-3 text-sm font-black ${draft.trim().length >= 80 ? 'bg-blue-600 text-white' : 'pointer-events-none bg-slate-200 text-slate-500'}`}>Chuẩn bị nộp evidence →</Link></div></section></div></div></main>
  )
}

function TaskWorkspacePage() {
  const { taskId } = useParams()
  const { state, saveDraft, setToast } = useJourney()
  const task = findDemoTask(taskId)
  const record = state.taskRecords[taskId]
  if (!task || !record?.startedAt) return <Navigate to={task && record ? `/tasks/${taskId}` : '/roadmap'} replace />
  if (task.workspaceKey === SCORE_DEBUG_WORKSPACE_KEY) return <ScoreDebugWorkspace task={task} record={record} saveDraft={saveDraft} setToast={setToast} />
  if (task.workspaceKey === DEADLINE_APP_WORKSPACE_KEY) return <DeadlineAppWorkspace task={task} record={record} saveDraft={saveDraft} setToast={setToast} />
  if (task.workspaceKey === SIGNUP_TEST_WORKSPACE_KEY) return <SignupTestWorkspace task={task} record={record} saveDraft={saveDraft} setToast={setToast} />
  return <StructuredWorkspace task={task} record={record} saveDraft={saveDraft} />
}

export default TaskWorkspacePage
