import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { JourneyToast, StatusBadge } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoTask } from '../data/annualDemo'
import { majorRoadmapPath } from '../utils/roadmapRoutes'

function TaskDetailPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { state, startTask } = useJourney()
  const task = findDemoTask(taskId)
  const record = state.taskRecords[taskId]
  if (!task || !record) return <Navigate to="/roadmap" replace />
  const begin = () => {
    const result = startTask(taskId)
    if (result.allowed) navigate(`/tasks/${taskId}/work`)
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] py-9">
      <JourneyToast />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="mb-5 text-sm"><Link to="/roadmap" className="font-semibold text-blue-700">Roadmap</Link><span className="px-2 text-slate-400">/</span><Link to={majorRoadmapPath(task.majorId)} className="font-semibold text-blue-700">{task.majorName}</Link><span className="px-2 text-slate-400">/</span><span className="text-slate-600">{task.title}</span></nav>
        <section className="overflow-hidden rounded-3xl border border-[#e3eaf4] bg-white shadow-sm">
          <header className="border-b border-[#e3eaf4] bg-[#1d4ed8] px-6 py-7 text-white md:px-9">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-blue-100">{task.majorName} · Task trải nghiệm</p><h1 className="mt-2 text-3xl font-black md:text-4xl">{task.title}</h1></div><StatusBadge status={record.status} /></div>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-blue-50"><span>◷ {task.duration}</span><span>Lưu nháp tự động</span><span>Không có đếm ngược</span></div>
          </header>
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-9">
            <div className="space-y-7">
              <section><h2 className="text-xl font-black text-[#172033]">Bối cảnh</h2><p className="mt-3 leading-7 text-slate-600">{task.context}</p></section>
              <section><h2 className="text-xl font-black text-[#172033]">Việc cần làm</h2><ol className="mt-4 space-y-3">{task.instructions.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 font-black text-blue-700">{index + 1}</span>{item}</li>)}</ol></section>
              <section><h2 className="text-xl font-black text-[#172033]">Rubric evidence</h2><ul className="mt-4 space-y-3">{task.rubric.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="material-symbols-outlined text-emerald-600">check_circle</span>{item}</li>)}</ul></section>
            </div>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-xs font-black uppercase text-blue-700">Evidence cần nộp</p><p className="mt-2 text-sm leading-6 text-blue-950">{task.evidence}</p></div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5"><p className="text-xs font-black uppercase text-amber-700">Task giúp kiểm chứng</p><p className="mt-2 text-sm leading-6 text-amber-950">{task.verifies}</p></div>
              <div className="rounded-2xl border border-slate-200 p-5"><p className="font-extrabold text-slate-900">Gợi ý kiến thức nền</p><p className="mt-2 text-sm leading-6 text-slate-600">Ưu tiên giải thích cách bạn nghĩ. Có thể tham khảo tài liệu nhưng hãy ghi lại nguồn và quyết định của mình.</p></div>
            </aside>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 md:px-9"><p className="text-sm text-slate-600">Bắt đầu sẽ chuyển task sang trạng thái đang thực hiện và giữ một slot.</p>{record.status === 'COMPLETED' ? <Link to={`/tasks/${taskId}/result`} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white">Xem lại kết quả →</Link> : <button type="button" onClick={begin} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white">{record.startedAt ? 'Tiếp tục làm task' : 'Bắt đầu task'} →</button>}</footer>
        </section>
      </div>
    </main>
  )
}

export default TaskDetailPage
