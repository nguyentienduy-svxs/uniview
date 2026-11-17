import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { findDemoMajor } from '../data/annualDemo'
import { TASK_STATUS } from '../domain/accessPolicy'
import { majorValidationReportPath } from '../utils/roadmapRoutes'

const INITIAL_TASK_COUNT = 3

function taskAction(record) {
  if (!record) return ['Bắt đầu', 'add']
  if (record.status === TASK_STATUS.COMPLETED) return ['Xem lại bài làm', 'review']
  if (record.status === TASK_STATUS.UNDER_REVIEW || record.status === TASK_STATUS.SUBMITTED) return ['Viết reflection', 'reflection']
  if (record.status === TASK_STATUS.NEEDS_SUPPLEMENT) return ['Bổ sung bài làm', 'work']
  if (record.status === TASK_STATUS.IN_PROGRESS) return ['Tiếp tục', 'work']
  return ['Mở nhiệm vụ', 'detail']
}

function MajorRoadmapDetailPage() {
  const { majorId } = useParams()
  const navigate = useNavigate()
  const major = findDemoMajor(majorId)
  const { state, addTaskToRoadmap, availableSlots } = useJourney()
  if (!major) return <Navigate to="/roadmap" replace />
  const initialTasks = major.tasks.slice(0, INITIAL_TASK_COUNT)
  const followUps = major.tasks.slice(INITIAL_TASK_COUNT)
  const initialRecords = initialTasks.map((task) => state.taskRecords[task.id]).filter((record) => record?.status === TASK_STATUS.COMPLETED && record?.reflection)
  const completedCount = initialRecords.length
  const reportReady = completedCount === INITIAL_TASK_COUNT
  const lowInterest = initialRecords.some((record) => Number(record.reflection.interest) <= 2)
  const lowMotivation = initialRecords.filter((record) => record.reflection?.wantsRetry === false).length >= 2
  const positiveCount = initialRecords.filter((record) => record.result?.outcome === 'POSITIVE_SIGNAL' && Number(record.reflection.interest) >= 4 && record.reflection.wantsRetry).length
  const validationSignal = lowInterest || (major.id === 'finance' && lowMotivation) ? 'Nên hạ ưu tiên khám phá' : positiveCount >= 2 ? 'Khả quan' : 'Cần kiểm chứng thêm'
  const startAvailable = (taskId) => {
    if (!addTaskToRoadmap(taskId)) return
    navigate(`/tasks/${taskId}`)
  }

  const renderTask = (task, index, isInitial) => {
    const record = state.taskRecords[task.id]
    const [label, action] = taskAction(record)
    const href = action === 'review' ? `/tasks/${task.id}/result` : action === 'reflection' ? `/tasks/${task.id}/reflection` : action === 'work' ? `/tasks/${task.id}/work` : `/tasks/${task.id}`
    return (
      <article key={task.id} className="relative grid gap-4 border-b border-[#e3eaf4] py-5 last:border-b-0 md:grid-cols-[54px_minmax(0,1fr)_auto] md:items-center">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-black ${record?.status === TASK_STATUS.COMPLETED ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{record?.status === TASK_STATUS.COMPLETED ? <span className="material-symbols-outlined">check</span> : String(index + 1).padStart(2, '0')}</div>
        <div>
          <div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold text-[#172033]">{task.title}</h3>{!isInitial && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">Khám phá tiếp</span>}</div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{task.verifies}</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">{task.duration} <span className="px-1 text-slate-300">·</span> Đầu ra: {task.evidence}</p>
          {record?.activity && <p className="mt-1 text-xs text-slate-500">{record.activity}</p>}
        </div>
        {record ? <Link to={href} className={`rounded-xl px-4 py-2.5 text-center text-sm font-bold ${record.status === TASK_STATUS.COMPLETED ? 'border border-emerald-200 text-emerald-800' : 'bg-[#1d4ed8] text-white'}`}>{label}</Link> : <button type="button" disabled={!availableSlots} onClick={() => startAvailable(task.id)} className="rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">{availableSlots ? label : 'Hết slot đang mở'}</button>}
      </article>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] pb-16 pt-8">
      <JourneyToast />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500"><Link to="/roadmap" className="font-semibold text-[#1d4ed8]">Roadmap</Link><span>/</span><span className="font-semibold text-slate-800">{major.name}</span></nav>
        <header className="rounded-3xl border border-[#e3eaf4] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1d4ed8]">{major.groupName}</p>
          <h1 className="mt-2 font-['Epilogue'] text-3xl font-black text-[#172033] md:text-4xl">{major.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{major.learn} Trải nghiệm ngắn giúp bạn kiểm chứng giả thuyết ban đầu bằng sản phẩm và phản tư thực tế.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-100 pt-5 text-sm"><span><strong>{completedCount}/{INITIAL_TASK_COUNT}</strong> nhiệm vụ vòng kiểm chứng đầu tiên</span><span className="text-slate-500">{reportReady ? `Tín hiệu hiện tại: ${validationSignal}` : 'Đang thu thập bằng chứng'}</span></div>
        </header>

        {reportReady && <section className="mt-5 flex flex-col gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-blue-700">Báo cáo kiểm chứng đã sẵn sàng</p><h2 className="mt-1 text-xl font-black text-[#172033]">Ba nhiệm vụ đã tạo thành bộ evidence ban đầu</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">Báo cáo phân tích cách bạn tiếp cận nhiệm vụ, kết quả tự đánh giá và những điều vẫn cần kiểm chứng.</p></div><Link to={majorValidationReportPath(major.id)} className="shrink-0 rounded-xl bg-[#1d4ed8] px-5 py-3 text-center text-sm font-bold text-white">Xem báo cáo chuyên sâu</Link></section>}

        <section className="mt-7 rounded-3xl border border-[#e3eaf4] bg-white px-5 shadow-sm md:px-7">
          <div className="border-b border-[#e3eaf4] py-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Giai đoạn 1</p><h2 className="mt-1 text-xl font-black text-[#172033]">Vòng kiểm chứng đầu tiên</h2><p className="mt-1 text-sm text-slate-600">Hoàn thành đủ ba nhiệm vụ, nộp evidence và reflection để mở báo cáo ngành.</p></div>
          {initialTasks.map((task, index) => renderTask(task, index, true))}
          {reportReady && <div className="border-t border-slate-100 py-4 text-sm text-emerald-800">Đã hoàn thành vòng kiểm chứng đầu tiên: <strong>3/3 nhiệm vụ</strong>. Bạn vẫn có thể tiếp tục khám phá sâu hơn.</div>}
        </section>

        {followUps.length > 0 && <section className="mt-7 rounded-3xl border border-[#e3eaf4] bg-white px-5 shadow-sm md:px-7"><div className="border-b border-[#e3eaf4] py-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Giai đoạn tiếp theo</p><h2 className="mt-1 text-xl font-black text-[#172033]">Nhiệm vụ khám phá sâu</h2><p className="mt-1 text-sm text-slate-600">Các nhiệm vụ này cung cấp bằng chứng mới và không làm mất báo cáo vòng đầu.</p></div>{followUps.map((task, index) => renderTask(task, index + INITIAL_TASK_COUNT, false))}</section>}

        <div className="mt-6 flex flex-wrap justify-between gap-3"><Link to="/roadmap" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700">← Về Roadmap tổng quan</Link><Link to="/roadmap/setup/directions" className="px-4 py-2.5 text-sm font-bold text-[#1d4ed8]">Thêm ngành khác</Link></div>
      </div>
    </main>
  )
}

export default MajorRoadmapDetailPage
