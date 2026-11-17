import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoTask } from '../data/annualDemo'
import { buildStructuredTaskEvidence } from '../data/taskWorkspaces'

function initialEvidence(task, record) {
  const saved = record?.evidence
  if (saved?.valid) return saved
  if (task?.demoAnswer && record?.draft === task.demoAnswer.draft) {
    return {
      text: task.demoAnswer.evidenceText,
      link: '',
      files: [],
      explanation: task.demoAnswer.evidenceExplanation,
      valid: false,
    }
  }
  if (saved && (saved.text || saved.link || saved.files?.length || saved.explanation)) return saved
  if (task?.workspaceKey && record?.draft) {
    const submission = buildStructuredTaskEvidence(task.workspaceKey, record.draft)
    if (!submission) return { text: '', link: '', files: [], explanation: '', valid: false }
    return {
      text: submission.text,
      link: '',
      files: [],
      explanation: submission.explanation,
      valid: false,
    }
  }
  return { text: '', link: '', files: [], explanation: '', valid: false }
}

function TaskReviewPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { state, saveEvidence } = useJourney()
  const task = findDemoTask(taskId)
  const record = state.taskRecords[taskId]
  const [evidence, setEvidence] = useState(() => initialEvidence(task, record))
  if (!task || !record?.startedAt) return <Navigate to="/roadmap" replace />
  const set = (field, value) => setEvidence((current) => ({ ...current, [field]: value }))
  const submit = () => { if (saveEvidence(taskId, evidence)) navigate(`/tasks/${taskId}/reflection`) }
  const addFiles = (event) => set('files', [...event.target.files].map((file) => ({ name: file.name, size: file.size, type: file.type })))
  const checks = [
    ['Có evidence', Boolean(evidence.text.trim() || evidence.link.trim() || evidence.files.length)],
    ['Có thể nhận diện tệp hoặc link', evidence.files.every(({ name }) => Boolean(name)) && (!evidence.link || /^https?:\/\//.test(evidence.link))],
    ['Có giải thích quyết định', Boolean(evidence.explanation.trim())],
  ]

  return (
    <main className="min-h-screen bg-[#f5f7ff] py-10"><JourneyToast /><div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Link to={`/tasks/${taskId}/work`} className="text-sm font-bold text-blue-600">← Quay lại workspace</Link>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wider text-blue-600">Review evidence</p><h1 className="mt-2 font-['Epilogue'] text-3xl font-black text-slate-950">Kiểm tra bài trước khi nộp</h1><p className="mt-2 text-sm leading-6 text-slate-600">Nếu thiếu, task chuyển sang “Cần bổ sung”; UniView không cho 0 điểm.</p>
          <div className="mt-7 space-y-5">
            <label className="block"><span className="text-sm font-extrabold text-slate-900">Nội dung hoặc mô tả evidence</span><textarea value={evidence.text} onChange={(event) => set('text', event.target.value)} className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-400" placeholder="Dán nội dung chính hoặc mô tả sản phẩm đã làm…" /></label>
            <label className="block"><span className="text-sm font-extrabold text-slate-900">Link có quyền xem</span><input value={evidence.link} onChange={(event) => set('link', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400" placeholder="https://…" /></label>
            <label className="block rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-5"><span className="text-sm font-extrabold text-blue-950">Tệp, ảnh, audio, video hoặc code</span><input type="file" multiple onChange={addFiles} className="mt-3 block w-full text-sm text-blue-700" />{evidence.files.length > 0 && <p className="mt-2 text-xs font-semibold text-blue-700">{evidence.files.map(({ name }) => name).join(', ')}</p>}</label>
            <label className="block"><span className="text-sm font-extrabold text-slate-900">Giải thích quyết định <span className="text-red-500">*</span></span><textarea value={evidence.explanation} onChange={(event) => set('explanation', event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-400" placeholder="Bạn đã chọn phương án nào, vì sao và còn điều gì chưa chắc chắn?" /></label>
          </div>
          <button type="button" onClick={submit} className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white">Nộp evidence và viết reflection →</button>
        </section>
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24"><h2 className="font-black text-slate-950">Kiểm tra tự động</h2><div className="mt-4 space-y-3">{checks.map(([label, done]) => <div key={label} className={`flex items-center gap-3 rounded-xl p-3 text-sm font-semibold ${done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}><span className="material-symbols-outlined">{done ? 'check_circle' : 'error'}</span>{label}</div>)}</div><div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600"><strong>Yêu cầu của task:</strong><br />{task.evidence}</div></aside>
      </div>
    </div></main>
  )
}

export default TaskReviewPage
