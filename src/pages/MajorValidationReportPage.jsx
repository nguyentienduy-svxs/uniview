import { Link, Navigate, useParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { EvidenceNote, ReportSection } from '../components/report/ReportUi'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { useJourney } from '../context/JourneyContext'
import { findDemoMajor } from '../data/annualDemo'
import { getRecommendedUniversities, RIASEC_DIMENSIONS } from '../data/careerReport'
import { TASK_STATUS } from '../domain/accessPolicy'
import { majorRoadmapPath } from '../utils/roadmapRoutes'
import { scoreRiasec } from '../utils/assessmentScoring'

const INITIAL_TASK_COUNT = 3
const followUpSuggestions = [
  ['information-technology', 'Xây dựng ứng dụng nhỏ', 'Tạo một sản phẩm chạy được từ yêu cầu đến bản thử nghiệm.', 'Ứng dụng nhỏ có hướng dẫn sử dụng', '90–120 phút'],
  ['information-technology', 'Thiết kế dữ liệu cho một ứng dụng', 'Chuyển yêu cầu sản phẩm thành cấu trúc dữ liệu rõ ràng.', 'Sơ đồ dữ liệu và giải thích quan hệ', '60–90 phút'],
  ['information-technology', 'Tìm hiểu cách hệ thống giao tiếp qua API', 'Kiểm chứng cách các thành phần gửi, nhận và xử lý lỗi.', 'API contract mẫu cùng request/response', '60–90 phút'],
  ['information-technology', 'Mô phỏng làm việc nhóm phát triển phần mềm', 'Tìm hiểu phối hợp, review và xử lý phụ thuộc.', 'Kế hoạch chia việc và phần phản tư', '90–120 phút'],
]

function MajorValidationReportPage() {
  const { majorId } = useParams()
  const major = findDemoMajor(majorId)
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const { state, toggleShortlist, setToast } = useJourney()
  if (!major) return <Navigate to="/roadmap" replace />
  const allTasks = major.tasks.map((task) => ({ task, record: state.taskRecords[task.id] }))
  const tasks = allTasks.slice(0, INITIAL_TASK_COUNT)
  const completed = tasks.filter(({ record }) => record?.status === TASK_STATUS.COMPLETED && record?.reflection)
  const additionalCompleted = allTasks.slice(INITIAL_TASK_COUNT).filter(({ record }) => record?.status === TASK_STATUS.COMPLETED && record?.reflection)
  if (completed.length < INITIAL_TASK_COUNT) return <Navigate to={majorRoadmapPath(major.id)} replace />
  const allCompleted = [...completed, ...additionalCompleted]
  const interested = allCompleted.filter(({ record }) => Number(record.reflection?.interest) >= 4 && record.reflection?.wantsRetry).length
  const lowInterest = allCompleted.some(({ record }) => Number(record.reflection?.interest) <= 2)
  const lowMotivation = allCompleted.filter(({ record }) => record.reflection?.wantsRetry === false).length >= 2
  const positivePerformance = allCompleted.filter(({ record }) => record.result?.outcome === 'POSITIVE_SIGNAL').length
  const reportLabel = lowInterest || (major.id === 'finance' && lowMotivation) ? 'Nên hạ ưu tiên khám phá' : positivePerformance >= 2 && interested >= 2 ? (additionalCompleted.length ? 'Khả quan sau kiểm chứng bổ sung' : 'Khả quan') : 'Cần kiểm chứng thêm'
  const reportMeta = state.validationReports?.[major.id]
  const riasec = assessment.report?.overview?.riasec ?? (Object.keys(assessment.riasecAnswers ?? {}).length === 30 ? scoreRiasec(assessment.riasecAnswers) : null)
  const riasecSummary = riasec?.ranking?.slice(0, 3).map(({ code }) => RIASEC_DIMENSIONS[code]?.label ?? code).join(', ')
  const universities = getRecommendedUniversities(major.id, assessment.profile).slice(0, 4)
  const hasScores = Boolean(assessment.profile.gpa || assessment.profile.thptScore || assessment.profile.dgnlScore)
  const updatedAt = reportMeta?.updatedAt ?? completed.reduce((latest, { record }) => record.completedAt > latest ? record.completedAt : latest, '')
  const updatedLabel = updatedAt ? new Date(updatedAt).toLocaleString('vi-VN', { dateStyle: 'medium' }) : 'Đang cập nhật'
  const isSoftware = major.id === 'information-technology'
  const saveSchool = (school) => {
    if (state.shortlist.includes(school.id)) {
      setToast({ type: 'success', message: 'Trường này đã có trong Shortlist.' })
      return
    }
    toggleShortlist(school.id)
    setToast({ type: 'success', message: `Đã lưu ${school.name} vào Shortlist.` })
  }

  return (
    <main className="uv-report-page min-h-screen py-6 md:py-9">
      <JourneyToast />
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <nav className="mb-5 text-sm text-slate-500"><Link to="/roadmap" className="font-semibold text-blue-700">Roadmap</Link><span className="px-2">/</span><Link to={majorRoadmapPath(major.id)} className="font-semibold text-blue-700">{major.name}</Link><span className="px-2">/</span><span>Báo cáo kiểm chứng</span></nav>
        <div className="grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="hidden lg:block"><nav className="sticky top-24 border-l border-[#E3EAF4] pl-4" aria-label="Mục lục báo cáo"><p className="text-xs font-bold text-[#75839A]">TRONG BÁO CÁO</p><div className="mt-3 space-y-1">{[['summary', 'Tổng kết'], ['comparison', 'Trước và sau'], ['task-analysis', 'Phân tích nhiệm vụ'], ['evidence', 'Độ tin cậy'], ['next', 'Bước tiếp theo'], ['universities', 'Gợi ý trường']].map(([id, label], index) => <a key={id} href={`#${id}`} className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700">{index + 1}. {label}</a>)}</div><Link to={majorRoadmapPath(major.id)} className="mt-5 inline-block border-t border-[#E3EAF4] pt-4 text-sm font-bold text-blue-700">← Roadmap ngành</Link></nav></aside>
          <div className="min-w-0 space-y-5">
            <header className="uv-report-surface p-6 md:p-8">
              <p className="uv-report-eyebrow">BÁO CÁO KIỂM CHỨNG NGÀNH</p>
              <h1 className="mt-2 font-['Epilogue'] text-3xl font-black text-[#172033] md:text-4xl">Báo cáo kiểm chứng ngành {major.name}</h1>
              <p className="uv-report-body mt-3">Phân tích trải nghiệm thực tế từ ba nhiệm vụ, kết hợp với Assessment và hồ sơ cá nhân.</p>
              <div className="mt-6 grid gap-4 border-t border-[#E3EAF4] pt-5 sm:grid-cols-2 lg:grid-cols-4">{[['Học sinh', user?.name ?? 'Học sinh UniView'], ['Ngành', major.name], ['Nhiệm vụ hoàn thành', `${completed.length}/${INITIAL_TASK_COUNT}`], ['Cập nhật', updatedLabel]].map(([label, value]) => <div key={label}><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-1 text-sm font-bold text-[#172033]">{value}</p></div>)}</div>
              <p className="mt-3 text-xs text-slate-500">Phiên bản báo cáo {reportMeta?.version ?? 1} · Evidence được lưu cùng lịch sử task</p>
              {(reportMeta?.revisions?.length ?? 0) > 1 && <details className="mt-3 border-t border-slate-100 pt-3"><summary className="cursor-pointer text-xs font-bold text-blue-700">Xem các phiên bản báo cáo trước ({reportMeta.revisions.length - 1})</summary><ul className="mt-2 space-y-1 text-xs text-slate-500">{reportMeta.revisions.slice(0, -1).map((revision) => <li key={revision.version}>Phiên bản {revision.version} · {new Date(revision.updatedAt).toLocaleDateString('vi-VN')} · {revision.taskIds.length} task có evidence</li>)}</ul></details>}
            </header>

            <ReportSection id="summary" eyebrow="01 · Tổng kết điều hành" title="Sau ba nhiệm vụ, UniView quan sát được điều gì?" intro={`Tín hiệu hiện tại: ${reportLabel}. Kết luận được tổng hợp từ kết quả task, bài nộp và reflection đã lưu; ${reportLabel === 'Khả quan' ? 'nhiều task cho thấy kết quả phù hợp và bạn có động lực tiếp tục.' : 'hiện chưa có đủ tín hiệu nhất quán để đưa ra nhận định tích cực mạnh.'}`}>
              <div className="mt-5 grid gap-3 md:grid-cols-3">{[['Điểm mạnh quan sát', positivePerformance ? `${positivePerformance} task có kết quả tích cực theo rubric lưu.` : 'Chưa có kết quả task được ghi nhận là tích cực theo rubric.'], ['Điều cần kiểm chứng', 'Khả năng duy trì hứng thú và làm việc trong dự án dài hơn.'], ['Bước nên thử', isSoftware ? 'Xây một ứng dụng nhỏ từ đầu đến cuối.' : 'Thử một nhiệm vụ khác biệt hơn trong cùng ngành.']].map(([title, body]) => <article key={title} className="rounded-2xl border border-[#E3EAF4] p-4"><h3 className="text-sm font-bold text-[#172033]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div>
              <EvidenceNote tone="warning" title="Cách đọc kết quả">Evidence hiện tại mang tính khuyến khích khám phá, không bảo đảm thành công học tập hay nghề nghiệp. Ba nhiệm vụ ngắn không thay thế trải nghiệm dài hạn.</EvidenceNote>
            </ReportSection>

            <ReportSection id="comparison" eyebrow="02 · Thay đổi giả thuyết" title="Nhận định ban đầu đã thay đổi như thế nào?" intro="Assessment tạo giả thuyết ban đầu; nhiệm vụ thực tế giúp kiểm chứng một phần giả thuyết đó. Hai nguồn bổ sung cho nhau, không thay thế nhau.">
              <div className="mt-5 grid gap-4 md:grid-cols-2"><article className="rounded-2xl bg-[#F7F9FC] p-5"><h3 className="font-bold text-[#172033]">Trước Roadmap · Assessment</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>• Sở thích RIASEC nổi bật: {riasecSummary || 'chưa có dữ liệu đủ để tổng hợp'}.</li><li>• Môn học thế mạnh: {assessment.profile.strengths?.join(', ') || 'chưa cập nhật'}; điểm học tập được giữ theo trạng thái dự kiến/chính thức.</li><li>• Lý do gợi ý ngành và câu hỏi ban đầu còn bỏ ngỏ trong Assessment.</li></ul><p className="mt-3 text-xs font-semibold text-blue-700">Nguồn: Assessment và hồ sơ cá nhân</p></article><article className="rounded-2xl bg-[#F7F9FC] p-5"><h3 className="font-bold text-[#172033]">Sau Roadmap · Nhiệm vụ thực tế</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>• Cách bạn phân tích, thiết kế, debug và kiểm thử theo bài đã nộp.</li><li>• Kết quả phản hồi và phần tự đánh giá sau từng task.</li><li>• Động lực muốn tiếp tục, dựa trên reflection của bạn.</li></ul><p className="mt-3 text-xs font-semibold text-blue-700">Nguồn: Bài nộp, rubric và reflection đã lưu</p></article></div>
            </ReportSection>

            <ReportSection id="task-analysis" eyebrow="03 · Phân tích theo nhiệm vụ" title="Bằng chứng cụ thể từ từng trải nghiệm" intro="Mỗi nhận định dưới đây gắn với bài nộp, kết quả và reflection đang được lưu trong Roadmap.">
              <div className="mt-5 space-y-4">{tasks.map(({ task, record }, index) => <article key={task.id} className="rounded-2xl border border-[#E3EAF4] p-5 md:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Nhiệm vụ 0{index + 1} · {task.duration}</p><h3 className="mt-1 text-lg font-bold text-[#172033]">{task.title}</h3></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">Đã hoàn thành</span></div><p className="mt-3 text-sm leading-6 text-slate-600">Mục tiêu của nhiệm vụ: {task.verifies} Kết quả ghi nhận: {record.result?.taskPerformance ?? 'chưa có nhận xét rubric'}.</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-slate-500">Bài nộp / evidence</p><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{record.evidence?.text || record.draft || 'Không có nội dung văn bản; xem tệp hoặc link đã nộp.'}</p>{record.evidence?.explanation && <p className="mt-2 text-sm leading-6 text-slate-600">Giải thích: {record.evidence.explanation}</p>}</div><div><p className="text-xs font-bold uppercase text-slate-500">Kết quả và reflection</p><p className="mt-1 text-sm leading-6 text-slate-700">{record.result?.taskPerformance ?? 'Chưa có nhận xét rubric.'} · Mức hứng thú {record.reflection?.interest ?? '—'}/5.</p><p className="mt-2 text-sm leading-6 text-slate-600">{record.reflection?.likedMost || 'Bạn chưa ghi phần yêu thích.'}{record.reflection?.drainedBy ? ` Phần tốn năng lượng: ${record.reflection.drainedBy}` : ''}</p><p className="mt-2 text-sm font-semibold text-slate-700">Bằng chứng đóng góp: {record.evidence?.explanation || task.verifies}</p></div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3"><p className="text-xs text-slate-500">Giới hạn: {index === 0 ? 'bài thiết kế ngắn chưa chứng minh kỹ năng lập trình dài hạn.' : index === 1 ? 'một ví dụ debug không chứng minh năng lực lập trình tổng quát.' : 'bài test chưa đánh giá công cụ tự động hoặc chất lượng hệ thống quy mô lớn.'}</p><Link to={`/tasks/${task.id}/result`} className="text-sm font-bold text-blue-700">Xem lại bài làm →</Link></div></article>)}
                {additionalCompleted.map(({ task, record }) => <article key={task.id} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Evidence bổ sung · {task.duration}</p><h3 className="mt-1 font-bold text-[#172033]">{task.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{record.evidence?.text || record.draft || task.evidence}</p><p className="mt-2 text-sm text-slate-700">Kết quả task: {record.result?.taskPerformance ?? 'chưa có rubric'} · Hứng thú tự đánh giá: {record.reflection?.interest ?? '—'}/5</p><Link to={`/tasks/${task.id}/result`} className="mt-3 inline-block text-sm font-bold text-blue-700">Xem lại bài làm →</Link></article>)}</div>
            </ReportSection>

            <ReportSection id="evidence" eyebrow="04 · Độ tin cậy và giới hạn" title="Mức độ bằng chứng hiện tại đã đủ đến đâu?" intro="Ba nhiệm vụ đã chạm tới phân tích yêu cầu, debug cơ bản và thiết kế kiểm thử nhập môn.">
              <div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><h3 className="font-bold text-emerald-950">Đã có evidence về</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900"><li>• Phân rã yêu cầu và ưu tiên tính năng.</li><li>• Kiểm tra logic và xử lý đầu vào thiếu.</li><li>• Tạo test case và cân nhắc trường hợp biên.</li></ul></div><div className="rounded-2xl border border-amber-100 bg-amber-50 p-5"><h3 className="font-bold text-amber-950">Chưa được kiểm chứng</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950"><li>• Lập trình dài hạn, cấu trúc dữ liệu và giải thuật.</li><li>• Phối hợp nhóm trong dự án kéo dài.</li><li>• Khối lượng học đại học và môi trường nghề nghiệp.</li></ul></div></div><EvidenceNote title="Kết luận giới hạn">Đủ bằng chứng cho nhận định sơ bộ tích cực nếu phản hồi task và reflection hiện tại hỗ trợ kết luận đó; chưa đủ để kết luận chắc chắn về mức độ phù hợp dài hạn.</EvidenceNote>
            </ReportSection>

            <ReportSection id="next" eyebrow="05 · Hướng kiểm chứng tiếp" title="Bạn nên tiếp tục kiểm chứng điều gì?" intro="Các nhiệm vụ sau là lựa chọn bổ sung. Hoàn thành vòng đầu vẫn được giữ nguyên và báo cáo sẽ lấy phiên bản evidence mới nhất.">
              <div className="mt-5 divide-y divide-[#E3EAF4]">{(isSoftware ? followUpSuggestions : major.id === 'marketing' ? [['marketing', 'Phỏng vấn người dùng và tổng hợp insight', 'Tìm hiểu nhu cầu trước khi đề xuất thông điệp.', 'Ghi chú phỏng vấn và insight được nhóm', '45–60 phút'], ['marketing', 'Đọc kết quả chiến dịch và đề xuất thử nghiệm', 'Dùng chỉ số để đưa ra giả thuyết cải thiện.', 'Phân tích chỉ số và kế hoạch thử nghiệm', '60–90 phút']] : []).map(([targetMajorId, title, objective, output, duration]) => <div key={title} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center"><div><h3 className="font-bold text-[#172033]">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{objective} Đầu ra: {output} · {duration}.</p></div><Link to={majorRoadmapPath(targetMajorId)} className="text-sm font-bold text-blue-700">Mở nhiệm vụ →</Link></div>)}</div>
              {major.id === 'finance' && <p className="mt-4 text-sm leading-6 text-slate-600">Kết quả thực hiện và mức hứng thú được trình bày tách biệt. Nếu bạn làm tốt nhưng ít muốn tiếp tục, hãy cân nhắc giảm ưu tiên khám phá và thử một ngành gần kề.</p>}
            </ReportSection>

            <ReportSection id="universities" eyebrow="06 · Gợi ý trường được cập nhật sau trải nghiệm" title="Tìm chương trình phù hợp để tìm hiểu tiếp" intro="Nhiệm vụ mới bổ sung tín hiệu về kiểu hoạt động bạn quan tâm. Trường vẫn được gợi ý theo chương trình trong dữ liệu, khu vực, học phí và hồ sơ học tập; kết quả task không dự đoán khả năng trúng tuyển.">
              <EvidenceNote tone="warning" title={hasScores ? 'Điểm cá nhân đã có dữ liệu' : 'Chưa đủ dữ liệu điểm để đối chiếu tuyển sinh'}>{hasScores ? 'Điểm trong hồ sơ chỉ dùng để đối chiếu nếu cùng phương thức và thang điểm. Không suy ra xác suất trúng tuyển.' : 'Bạn có thể bổ sung điểm dự kiến hoặc điểm chính thức khi có. UniView vẫn gợi ý trường để tìm hiểu, nhưng chưa đủ dữ liệu đối chiếu điều kiện điểm.'}</EvidenceNote>
              <div className="mt-5 grid gap-4 md:grid-cols-2">{universities.map((school) => { const saved = state.shortlist.includes(school.id); return <article key={school.id} className="rounded-2xl border border-[#E3EAF4] p-5"><p className="text-xs font-semibold text-slate-500">{school.region} · Cần xác minh tuyển sinh năm 2027</p><h3 className="mt-1 font-bold text-[#172033]">{school.name}</h3><p className="mt-1 text-sm font-semibold text-blue-700">{school.program}</p><dl className="mt-4 space-y-2 text-sm leading-6 text-slate-600"><div><dt className="font-semibold text-slate-800">Liên quan ngành</dt><dd>{school.criteria.major}; trải nghiệm hỗ trợ bạn tìm hiểu thêm về {isSoftware ? 'phân tích yêu cầu, phát triển và kiểm thử phần mềm' : major.name}.</dd></div><div><dt className="font-semibold text-slate-800">Khu vực và tài chính</dt><dd>{school.criteria.location}. {school.criteria.finance}.</dd></div><div><dt className="font-semibold text-slate-800">Môi trường học</dt><dd>{school.criteria.environment}</dd></div><div><dt className="font-semibold text-slate-800">Tuyển sinh</dt><dd>{school.criteria.admission} Cần xác minh phương thức và thông tin chính thức năm 2027.</dd></div></dl><div className="mt-4 flex flex-wrap gap-2"><Link to={school.path} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Xem chi tiết trường</Link><button type="button" onClick={() => saveSchool(school)} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">{saved ? 'Đã lưu Shortlist' : 'Lưu vào Shortlist'}</button></div></article>})}</div>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[#E3EAF4] pt-4"><Link to="/shortlist" className="text-sm font-bold text-blue-700">Mở Shortlist →</Link><Link to="/decision-board" className="text-sm font-bold text-blue-700">Xem kế hoạch Decision Board →</Link><Link to="/assessment/quick-profile" className="text-sm font-bold text-blue-700">Bổ sung điểm →</Link></div>
            </ReportSection>

            <footer className="flex flex-wrap justify-between gap-3 px-1"><Link to={majorRoadmapPath(major.id)} className="text-sm font-bold text-blue-700">← Quay lại Roadmap ngành</Link><Link to="/report" className="text-sm font-bold text-slate-600">Mở báo cáo Assessment ban đầu</Link></footer>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MajorValidationReportPage
