import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoMajor, findDemoTask } from '../data/annualDemo'
import { TASK_STATUS } from '../domain/accessPolicy'
import { majorRoadmapPath, majorValidationReportPath } from '../utils/roadmapRoutes'

const outcomeCopy = {
  POSITIVE_SIGNAL: ['Có tín hiệu tích cực từ trải nghiệm này', 'Evidence đạt yêu cầu và bạn vẫn hứng thú với quá trình. Hãy thử một loại nhiệm vụ khác để xem tín hiệu có lặp lại không.'],
  LOW_INTEREST: ['Bạn làm được nhưng ít hứng thú với trải nghiệm này', 'Điều này chưa có nghĩa là bạn không phù hợp với toàn ngành. Hãy đối chiếu với một loại công việc khác.'],
  NEEDS_MORE_EVIDENCE: ['Cần kiểm chứng thêm', 'Evidence, nền tảng hoặc tín hiệu hứng thú chưa đủ đồng nhất. Hãy bổ sung hoặc thử một nhiệm vụ khác.'],
}

function TaskResultPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { state, completeTask } = useJourney()
  const task = findDemoTask(taskId)
  const record = state.taskRecords[taskId]
  if (!task || !record?.result) return <Navigate to={task && record ? `/tasks/${taskId}/reflection` : '/roadmap'} replace />
  const [title, body] = outcomeCopy[record.result.outcome] ?? outcomeCopy.NEEDS_MORE_EVIDENCE
  const major = findDemoMajor(task.majorId)
  const reportReadyAfterFinish = major.tasks.slice(0, 3).every((item) => {
    const itemRecord = state.taskRecords[item.id]
    return item.id === taskId ? Boolean(record.reflection) : itemRecord?.status === TASK_STATUS.COMPLETED && Boolean(itemRecord.reflection)
  })
  const reportPath = majorValidationReportPath(task.majorId)
  const finish = () => {
    if (record.status !== TASK_STATUS.COMPLETED) completeTask(taskId)
    navigate(reportReadyAfterFinish ? reportPath : majorRoadmapPath(task.majorId))
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] py-9"><JourneyToast /><div className="mx-auto max-w-4xl px-4 sm:px-6">
      <nav className="mb-5 text-sm"><Link to="/roadmap" className="font-semibold text-blue-700">Roadmap</Link><span className="px-2 text-slate-400">/</span><Link to={majorRoadmapPath(task.majorId)} className="font-semibold text-blue-700">{task.majorName}</Link><span className="px-2 text-slate-400">/</span><span className="text-slate-600">Kết quả task</span></nav>
      <section className="overflow-hidden rounded-3xl border border-[#e3eaf4] bg-white shadow-sm">
        <header className="border-b border-[#e3eaf4] bg-blue-50 p-7 text-center md:p-9"><p className="text-xs font-black uppercase tracking-[.15em] text-blue-700">Kết quả task · không phải kết luận ngành</p><h1 className="mt-2 text-3xl font-black text-[#172033]">{title}</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">{body}</p></header>
        <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-8">{[['Mức thực hiện task', record.result.taskPerformance], ['Hứng thú tự đánh giá', record.result.studentInterest], ['Độ đầy đủ evidence', record.result.evidenceCompleteness], ['Giới hạn nhận định', record.result.confidenceLevel]].map(([label, value]) => <article key={label} className="rounded-2xl border border-[#e3eaf4] p-5"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 font-extrabold leading-6 text-slate-900">{value}</p></article>)}</div>
        <div className="mx-6 mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 md:mx-8 md:mb-8"><h2 className="font-black text-blue-950">Evidence đóng góp cho {task.majorName}</h2><p className="mt-2 text-sm leading-6 text-blue-900">{task.verifies} Phản hồi task được ghép với bài nộp và reflection để cập nhật báo cáo kiểm chứng ngành.</p>{record.reflection?.likedMost && <p className="mt-3 text-sm leading-6 text-blue-950"><strong>Reflection của bạn:</strong> {record.reflection.likedMost}</p>}</div>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 md:px-8"><Link to={majorRoadmapPath(task.majorId)} className="text-sm font-bold text-blue-700">← Roadmap ngành</Link><button type="button" onClick={finish} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white">{record.status === TASK_STATUS.COMPLETED ? (reportReadyAfterFinish ? 'Xem báo cáo kiểm chứng ngành' : 'Quay lại Roadmap ngành') : (reportReadyAfterFinish ? 'Hoàn thành · mở báo cáo ngành' : 'Hoàn thành và quay lại Roadmap')} →</button></footer>
      </section>
    </div></main>
  )
}

export default TaskResultPage
