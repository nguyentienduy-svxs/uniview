import { Link } from 'react-router-dom'

import { StatusBadge } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { ANNUAL_DEMO_MAJORS } from '../data/annualDemo'
import { TASK_STATUS } from '../domain/accessPolicy'
import { getDirectionInsight } from '../domain/journeySelectors'

function evidenceForMajor(majorId, taskRecords) {
  return Object.values(taskRecords).filter((record) => record.status === TASK_STATUS.COMPLETED && record.taskId.startsWith(`${majorId}-task-`))
}

function DiscoverySummaryPage() {
  const { state, capabilities } = useJourney()
  const directions = ANNUAL_DEMO_MAJORS
    .filter(({ id }) => state.selectedMajorIds.includes(id))
    .map((major) => {
      const records = evidenceForMajor(major.id, state.taskRecords)
      const interests = records.map((record) => Number(record.reflection?.interest)).filter(Number.isFinite)
      const interest = interests.length ? (interests.reduce((sum, value) => sum + value, 0) / interests.length).toFixed(1) : null
      const achieved = records.filter((record) => record.evidence?.valid).length
      return { major, records, interest, achieved, insight: getDirectionInsight(major.id, state.taskRecords) }
    })

  return (
    <main className="min-h-screen bg-[#f5f7ff] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link to="/roadmap" className="text-sm font-bold text-blue-600">← Trở về Roadmap</Link>
        <section className="mt-5 rounded-[2rem] bg-slate-950 p-8 text-white">
          <p className="text-xs font-black uppercase tracking-[.16em] text-blue-300">Sau Roadmap · so sánh trước và sau trải nghiệm</p>
          <h1 className="mt-2 font-['Epilogue'] text-3xl font-black">BÁO CÁO KIỂM CHỨNG NGÀNH</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Báo cáo này không lặp lại danh sách trường. Nó đối chiếu giả thuyết từ Assessment với hiệu suất, hứng thú và evidence quan sát được khi làm task.</p>
        </section>

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
          <strong>Cách đọc:</strong> “Làm được” và “muốn tiếp tục” là hai tín hiệu riêng. Một task chưa đủ để loại hoặc chốt ngành; hệ thống chỉ nâng độ tin cậy khi có evidence hợp lệ từ nhiều loại công việc.
        </section>

        <div className="mt-6 space-y-5">
          {directions.map(({ major, records, interest, achieved, insight }) => (
            <article key={major.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase text-blue-600">{major.groupName}</p><h2 className="mt-1 text-xl font-black text-slate-950">{major.name}</h2></div><StatusBadge status={insight.status} /></div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <section className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-black uppercase text-slate-400">Trước Roadmap · giả thuyết</p><p className="mt-2 text-sm leading-6 text-slate-700">{major.fit}</p><p className="mt-3 text-xs leading-5 text-amber-700"><strong>Khoảng trống ban đầu:</strong> {major.evidenceGap}</p></section>
                <section className="rounded-2xl bg-blue-50 p-5"><p className="text-xs font-black uppercase text-blue-500">Sau Roadmap · evidence quan sát</p><p className="mt-2 text-sm leading-6 text-blue-950">{insight.summary}</p><p className="mt-3 text-xs leading-5 text-blue-700">{records.length ? `${achieved}/${records.length} task có evidence hợp lệ; ${insight.workTypeCount} loại công việc đã được kiểm chứng.` : 'Chưa có task hoàn thành nên chưa thay đổi giả thuyết ban đầu.'}</p></section>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase text-slate-400">Hiệu suất task</p><strong className="mt-1 block text-lg text-slate-950">{records.length ? `${achieved}/${records.length} đạt evidence` : 'Chưa có dữ liệu'}</strong></div>
                <div className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase text-slate-400">Hứng thú tự đánh giá</p><strong className="mt-1 block text-lg text-slate-950">{interest ? `${interest}/5` : 'Chưa có dữ liệu'}</strong></div>
                <div className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase text-slate-400">Độ phủ evidence</p><strong className="mt-1 block text-lg text-slate-950">{insight.workTypeCount >= 2 ? 'Đa dạng ban đầu' : 'Cần thêm loại task'}</strong></div>
              </div>

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Điều chưa chắc chắn:</strong> {records.length < 2 ? 'Cần ít nhất một task khác loại trước khi tăng độ tin cậy.' : 'Kết quả vẫn chịu ảnh hưởng của độ khó task, thời gian và chất lượng evidence; nên đối chiếu thêm với trải nghiệm dài hơn.'}</div>
              <div className="mt-5 flex flex-wrap gap-3"><Link to="/roadmap/setup/directions" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">Chọn task kiểm chứng tiếp</Link><Link to="/report#majors" className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-bold text-blue-700">Đối chiếu báo cáo ban đầu</Link></div>
            </article>
          ))}

          {!directions.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-black text-slate-950">Chưa có hướng ngành để kiểm chứng</h2><p className="mt-2 text-sm text-slate-600">Chọn ngành và hoàn thành task đầu tiên để tạo phần đối chiếu.</p><Link to="/roadmap/setup/directions" className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">Chọn hướng ngành</Link></div>}
        </div>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="font-black text-slate-950">Tiếp tục hành trình</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Shortlist và Decision Board là không gian ra quyết định riêng; báo cáo kiểm chứng không tự thay đổi hoặc xóa lựa chọn bạn đã lưu.</p>
          <div className="mt-4 flex flex-wrap gap-3"><Link to="/shortlist" className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-bold text-blue-700">Mở Shortlist</Link><Link to={capabilities.canUseDecisionBoard ? '/decision-board' : '/admission-pass'} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700">{capabilities.canUseDecisionBoard ? 'Mở Decision Board' : 'Decision Board · Admission Pass'}</Link><Link to="/roadmap" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">Về Roadmap</Link></div>
        </section>
      </div>
    </main>
  )
}

export default DiscoverySummaryPage
