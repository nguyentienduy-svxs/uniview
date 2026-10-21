import { Link } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { ANNUAL_DEMO_MAJORS } from '../data/annualDemo'
import { getDirectionInsight, STATUS_LABELS } from '../domain/journeySelectors'
import { TASK_STATUS } from '../domain/accessPolicy'
import { majorRoadmapPath, majorValidationReportPath } from '../utils/roadmapRoutes'

const INITIAL_TASK_COUNT = 3

function RoadmapPage() {
  const { state, capabilities, openTaskCount, resetCompletedTasks } = useJourney()
  const majors = ANNUAL_DEMO_MAJORS.filter(({ id }) => state.selectedMajorIds.includes(id))
  const selectedMajors = majors.length ? majors : ANNUAL_DEMO_MAJORS.slice(0, 3)
  const completedTaskCount = Object.values(state.taskRecords).filter(({ status }) => status === TASK_STATUS.COMPLETED).length
  const handleResetCompletedTasks = () => {
    if (!completedTaskCount) return
    const confirmed = window.confirm(`Đặt lại ${completedTaskCount} task đã hoàn thành? Evidence, bản nháp và reflection của các task này sẽ bị xóa để bạn làm lại từ đầu.`)
    if (confirmed) resetCompletedTasks()
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] pb-16 pt-9">
      <JourneyToast />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="flex flex-col gap-5 rounded-3xl border border-[#e3eaf4] bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1d4ed8]">{capabilities.hasAnnualRoadmap ? 'Gói Năm' : 'Roadmap cá nhân'}</p>
            <h1 className="mt-2 font-['Epilogue'] text-3xl font-black text-[#172033] md:text-4xl">Hành trình khám phá ngành</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Theo dõi tiến trình kiểm chứng từng ngành. Mỗi Roadmap giữ riêng task, evidence và báo cáo của ngành đó.</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 md:min-w-52 md:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Đang thực hiện</p>
            <p className="mt-1 text-2xl font-black text-[#172033]">{openTaskCount}/{capabilities.taskPolicy.openTaskLimit} nhiệm vụ</p>
            <p className="mt-1 text-xs text-slate-500">Giới hạn task đồng thời</p>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Roadmap của bạn</p><h2 className="mt-1 text-2xl font-black text-[#172033]">Ngành đang khám phá</h2></div>
          <div className="flex flex-wrap gap-3">
            {completedTaskCount > 0 && <button type="button" onClick={handleResetCompletedTasks} className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900 hover:bg-amber-100">↻ Làm lại {completedTaskCount} task đã xong</button>}
            <Link to="/roadmap/setup/directions" className="rounded-xl bg-[#1d4ed8] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">+ Thêm ngành</Link>
          </div>
        </div>

        <section className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {selectedMajors.map((major) => {
            const insight = getDirectionInsight(major.id, state.taskRecords)
            const requiredTasks = major.tasks.slice(0, INITIAL_TASK_COUNT)
            const requiredRecords = requiredTasks.map((task) => state.taskRecords[task.id]).filter(Boolean)
            const completeCount = requiredRecords.filter((record) => record.status === TASK_STATUS.COMPLETED && record.reflection).length
            const reportReady = completeCount === INITIAL_TASK_COUNT
            const lowInterest = requiredRecords.some((record) => record.status === TASK_STATUS.COMPLETED && Number(record.reflection?.interest) <= 2)
            const lowMotivation = requiredRecords.filter((record) => record.status === TASK_STATUS.COMPLETED && record.reflection?.wantsRetry === false).length >= 2
            const positiveCount = requiredRecords.filter((record) => record.status === TASK_STATUS.COMPLETED && record.reflection && record.result?.outcome === 'POSITIVE_SIGNAL' && Number(record.reflection.interest) >= 4 && record.reflection.wantsRetry).length
            const validationSignal = lowInterest || (major.id === 'finance' && lowMotivation) ? 'Nên hạ ưu tiên khám phá' : positiveCount >= 2 ? 'Khả quan' : 'Cần kiểm chứng thêm'
            const statusLabel = reportReady
              ? 'Đã hoàn thành vòng kiểm chứng đầu tiên'
              : completeCount ? 'Cần kiểm chứng thêm' : STATUS_LABELS[insight.status]
            return (
              <article key={major.id} className="flex min-h-64 flex-col rounded-3xl border border-[#e3eaf4] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{major.groupName}</span><span className={`h-2.5 w-2.5 rounded-full ${reportReady ? 'bg-emerald-500' : 'bg-amber-400'}`} /></div>
                <h3 className="mt-5 text-xl font-black text-[#172033]">{major.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Hoàn thành vòng kiểm chứng đầu tiên: <strong className="text-slate-900">{completeCount}/{INITIAL_TASK_COUNT} nhiệm vụ</strong></p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1d4ed8] transition-all" style={{ width: `${Math.round((completeCount / INITIAL_TASK_COUNT) * 100)}%` }} /></div>
                <p className="mt-4 text-sm font-bold text-slate-800">{statusLabel}</p>
                {reportReady && <p className="mt-1 text-sm text-slate-600">Tín hiệu hiện tại: {validationSignal}</p>}
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link to={reportReady ? majorValidationReportPath(major.id) : majorRoadmapPath(major.id)} className="rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white">{reportReady ? 'Xem báo cáo kiểm chứng' : 'Tiếp tục nhiệm vụ'}</Link>
                  <Link to={majorRoadmapPath(major.id)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700">Mở Roadmap</Link>
                </div>
              </article>
            )
          })}
        </section>

        <p className="mt-6 text-sm text-slate-500">Hoàn thành vòng đầu không giới hạn việc khám phá ngành. Task đã hoàn thành được lưu, còn tối đa {capabilities.taskPolicy.openTaskLimit} task có thể ở trạng thái đang thực hiện cùng lúc.</p>
      </div>
    </main>
  )
}

export default RoadmapPage
