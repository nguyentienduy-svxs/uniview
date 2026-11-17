import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoTask } from '../data/annualDemo'

function Scale({ label, value, onChange, low, high }) {
  return <div><div className="flex justify-between text-sm font-extrabold text-slate-900"><span>{label}</span><span className="text-blue-600">{value}/5</span></div><input type="range" min="1" max="5" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-blue-600" /><div className="mt-1 flex justify-between text-xs text-slate-400"><span>{low}</span><span>{high}</span></div></div>
}

function TaskReflectionPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { state, saveReflection } = useJourney()
  const task = findDemoTask(taskId)
  const record = state.taskRecords[taskId]
  const hasDemoAnswer = task?.demoAnswer && record?.draft === task.demoAnswer.draft
  const [form, setForm] = useState(record?.reflection ?? (hasDemoAnswer ? task.demoAnswer.reflection : { interest: 4, focus: 4, likedMost: '', drainedBy: '', wantsRetry: true, shareWithParent: false }))
  if (!task || !record?.evidence?.valid) return <Navigate to={task && record ? `/tasks/${taskId}/review` : '/roadmap'} replace />
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const submit = () => { saveReflection(taskId, form); navigate(`/tasks/${taskId}/result`) }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-[#f5f7ff] py-10"><JourneyToast /><div className="mx-auto max-w-3xl px-4 sm:px-6">
      <section className="rounded-[2rem] border border-violet-100 bg-white p-7 shadow-sm md:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><span className="material-symbols-outlined text-3xl">self_improvement</span></span>
        <p className="mt-5 text-xs font-black uppercase tracking-[.16em] text-violet-600">Phản tư sau trải nghiệm</p><h1 className="mt-2 font-['Epilogue'] text-3xl font-black text-slate-950">Task này khiến bạn cảm thấy thế nào?</h1><p className="mt-3 leading-7 text-slate-600">Reflection được lưu tách khỏi rubric. Không có câu trả lời đúng và mặc định không chia sẻ phần riêng tư cho phụ huynh.</p>{hasDemoAnswer && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">Đang dùng reflection mẫu để minh họa luồng demo. Bạn có thể sửa câu trả lời trước khi tiếp tục.</p>}
        <div className="mt-8 space-y-8"><Scale label="Mức hứng thú" value={form.interest} onChange={(value) => set('interest', value)} low="Không hứng thú" high="Rất hứng thú" /><Scale label="Mức tập trung" value={form.focus} onChange={(value) => set('focus', value)} low="Dễ mất tập trung" high="Tập trung tự nhiên" />
          <label className="block"><span className="text-sm font-extrabold text-slate-900">Phần bạn thích nhất</span><textarea value={form.likedMost} onChange={(event) => set('likedMost', event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-violet-400" /></label>
          <label className="block"><span className="text-sm font-extrabold text-slate-900">Phần làm bạn mất năng lượng</span><textarea value={form.drainedBy} onChange={(event) => set('drainedBy', event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-violet-400" /></label>
          <div><p className="text-sm font-extrabold text-slate-900">Bạn có muốn thử một task khác trong ngành này?</p><div className="mt-3 flex gap-3">{[[true, 'Có, mình muốn thử tiếp'], [false, 'Chưa, mình muốn đổi hướng']].map(([value, label]) => <button key={label} type="button" onClick={() => set('wantsRetry', value)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold ${form.wantsRetry === value ? 'border-violet-500 bg-violet-50 text-violet-800' : 'border-slate-200 text-slate-600'}`}>{label}</button>)}</div></div>
          <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700"><input type="checkbox" checked={form.shareWithParent} onChange={(event) => set('shareWithParent', event.target.checked)} className="mt-1 accent-violet-600" /><span><strong>Cho phép chia sẻ bản tóm tắt với phụ huynh.</strong><br /><span className="text-xs text-slate-500">Nội dung chi tiết vẫn được giữ riêng tư.</span></span></label>
        </div>
        <button type="button" disabled={!form.likedMost.trim() || !form.drainedBy.trim()} onClick={submit} className="mt-8 w-full rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-black text-white disabled:opacity-40">Xem tín hiệu từ trải nghiệm →</button>
      </section>
    </div></main>
  )
}

export default TaskReflectionPage
