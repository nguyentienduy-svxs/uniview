import { Link } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import {
  EvidenceNote,
  MajorRecommendationCard,
  MissingDataNotice,
  ReportSection,
  RiasecDimension,
  RiasecRadar,
  UniversityRecommendationCard,
} from '../components/report/ReportUi'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { useJourney } from '../context/JourneyContext'
import { ANNUAL_DEMO_GROUPS } from '../data/annualDemo'
import { getProfileCompleteness, getRecommendedUniversities, RIASEC_DIMENSIONS } from '../data/careerReport'
import { scoreRiasec } from '../utils/assessmentScoring'

const TOC = [
  ['overview', 'Tổng quan'],
  ['analysis', 'Nhận định chính'],
  ['riasec', 'Hồ sơ RIASEC'],
  ['profile', 'Điều kiện cá nhân'],
  ['majors', 'Nhóm ngành'],
  ['universities', 'Gợi ý trường'],
  ['next-steps', 'Bước tiếp theo'],
]

function ValueOrMissing({ value, suffix = '' }) {
  if (value === '' || value === null || value === undefined) {
    return <span className="font-semibold text-[#936000]">Chưa có dữ liệu</span>
  }
  return <span className="font-bold text-[#172033]">{value}{suffix}</span>
}

function ReportActions() {
  const { isAuthenticated } = useAuth()
  const { capabilities, state } = useJourney()
  if (!isAuthenticated) return <Link to="/login?next=%2Freport" className="uv-report-button-primary">Đăng nhập để lưu hành trình</Link>
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Link to={state.roadmapCreatedAt ? '/roadmap' : '/roadmap/setup/directions'} className="uv-report-button-primary">
          {state.roadmapCreatedAt ? 'Tiếp tục Roadmap' : 'Bắt đầu Roadmap'}
        </Link>
        <Link to="/roadmap/setup/directions" className="uv-report-button-secondary">Xem lại ngành đã chọn</Link>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link to="/shortlist" className="uv-report-link text-[#1D4ED8] hover:text-[#1E40AF]">Mở Shortlist</Link>
        <Link to={capabilities.canUseDecisionBoard ? '/decision-board' : '/admission-pass'} className="uv-report-link text-[#56657A] hover:text-[#1D4ED8]">{capabilities.canUseDecisionBoard ? 'Mở Decision Board' : 'Decision Board cần Admission Pass'}</Link>
      </div>
    </>
  )
}

function ProfileItem({ label, children, note }) {
  return <div className="border-b border-[#E3EAF4] py-4 md:px-4 md:first:pl-0 md:[&:nth-child(3n+1)]:pl-0 md:[&:nth-child(3n)]:pr-0"><dt className="text-xs font-semibold text-[#75839A]">{label}</dt><dd className="mt-1.5 text-[15px] leading-6 text-[#172033]">{children}</dd>{note && <p className="mt-1 text-xs leading-5 text-[#75839A]">{note}</p>}</div>
}

function AnnualReportPage() {
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const { state, toggleShortlist } = useJourney()
  const answerCount = Object.keys(assessment.riasecAnswers ?? {}).length
  const hasRiasec = Boolean(assessment.report?.overview?.riasec) || answerCount === 30
  const riasec = assessment.report?.overview?.riasec ?? (answerCount === 30 ? scoreRiasec(assessment.riasecAnswers) : {
    scores: Object.fromEntries(Object.keys(RIASEC_DIMENSIONS).map((code) => [code, 0])),
    ranking: Object.keys(RIASEC_DIMENSIONS).map((code) => ({ code, score: 0 })),
    top3: 'Chưa đủ dữ liệu', flags: [],
  })
  const profile = assessment.profile ?? {}
  const completeness = getProfileCompleteness(profile, answerCount)
  const selectedMajorIds = state.selectedMajorIds.filter((id) => ANNUAL_DEMO_GROUPS.some((group) => group.majors.some((major) => major.id === id)))
  const primaryMajorId = selectedMajorIds[0] ?? 'information-technology'
  const primaryMajor = ANNUAL_DEMO_GROUPS.flatMap(({ majors }) => majors).find(({ id }) => id === primaryMajorId)
  const universities = getRecommendedUniversities(primaryMajorId, profile).slice(0, 3)
  const generatedAt = assessment.report?.generatedAt ?? state.reportGeneratedAt
  const generatedLabel = generatedAt ? new Date(generatedAt).toLocaleDateString('vi-VN') : 'Chưa lưu'
  const topCodes = hasRiasec ? riasec.ranking.slice(0, 3).map(({ code }) => code) : []
  const missingScores = !profile.gpa && !profile.thptScore && !profile.dgnlScore

  return (
    <main className="uv-report-page py-6 md:py-9">
      <JourneyToast />
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <nav className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Điều hướng báo cáo">
          {TOC.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-[#E3EAF4] bg-white px-3.5 py-2 text-xs font-semibold text-[#56657A] hover:border-[#B9C9E7] hover:text-[#1D4ED8]">{label}</a>)}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav className="sticky top-24 border-l border-[#E3EAF4] pl-4" aria-label="Mục lục báo cáo">
              <p className="text-xs font-bold text-[#75839A]">TRONG BÁO CÁO</p>
              <div className="mt-3 space-y-1">
                {TOC.map(([id, label], index) => <a key={id} href={`#${id}`} className="uv-report-link flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-[#56657A] hover:bg-[#EAF1FF] hover:text-[#1D4ED8]"><span className="w-4 text-xs text-[#A4AFC0]">{index + 1}</span>{label}</a>)}
              </div>
              <div className="mt-5 border-t border-[#E3EAF4] pt-4">
                <div className="flex items-center justify-between text-xs"><span className="font-semibold text-[#56657A]">Hồ sơ hoàn thiện</span><strong className="text-[#1D4ED8]">{completeness.percent}%</strong></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDF1F7]"><div className="h-full rounded-full bg-[#1D4ED8]" style={{ width: `${completeness.percent}%` }} /></div>
                {completeness.missing.length > 0 && <p className="mt-2 text-xs leading-5 text-[#75839A]">Còn thiếu {completeness.missing.join(', ').toLowerCase()}.</p>}
              </div>
            </nav>
          </aside>

          <div className="min-w-0 space-y-10">
            <section id="overview" className="uv-report-surface scroll-mt-24 overflow-hidden">
              <div className="relative grid gap-8 px-6 py-9 md:grid-cols-[minmax(0,1fr)_260px] md:px-10 md:py-11">
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 overflow-hidden" aria-hidden="true"><span className="absolute -right-12 -top-12 h-36 w-36 rounded-full border-[24px] border-[#EAF1FF]" /><span className="absolute right-20 top-11 h-3 w-3 rounded-full bg-[#FB7185]" /></div>
                <div className="relative max-w-2xl">
                  <p className="uv-report-eyebrow">Báo cáo định hướng cá nhân</p>
                  <h1 className="uv-report-title mt-3">Hiểu bản thân để lựa chọn tốt hơn</h1>
                  <p className="mt-3 text-[17px] font-semibold leading-7 text-[#172033]">Báo cáo cá nhân hóa dành cho {user?.fullName ?? 'bạn'}</p>
                  <p className="uv-report-body mt-4">Kết hợp sở thích nghề nghiệp, hồ sơ học tập và điều kiện thực tế để đề xuất những hướng ngành đáng kiểm chứng.</p>
                </div>
                <dl className="relative grid grid-cols-2 gap-x-4 gap-y-4 self-end border-t border-[#E3EAF4] pt-5 md:block md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  {[['Học sinh', user?.grade ?? 'Chưa cập nhật'], ['Mùa tuyển sinh', profile.admissionYear ?? 'Chưa cập nhật'], ['Ngày tạo', generatedLabel], ['Phiên bản', '2026.2']].map(([label, value]) => <div key={label} className="md:mb-4 md:last:mb-0"><dt className="text-xs font-medium text-[#75839A]">{label}</dt><dd className="mt-1 text-sm font-semibold text-[#172033]">{value}</dd></div>)}
                </dl>
              </div>
              <div className="border-t border-[#E3EAF4] bg-[#F7F9FC] px-6 py-4 text-sm leading-6 text-[#56657A] md:px-10"><strong className="text-[#172033]">Phạm vi:</strong> Đây là bản đồ để khám phá và kiểm chứng, không phải kết luận cố định về một “ngành hoàn hảo”.</div>
            </section>

            <ReportSection id="analysis" eyebrow="Nhận định tổng hợp" title="Những tín hiệu đáng chú ý ở thời điểm hiện tại" intro={hasRiasec ? `Mã RIASEC ${riasec.top3} và thế mạnh ${profile.strengths?.join(', ') || 'chưa cập nhật'} cho thấy bạn có nhiều hơn một hướng phát triển hợp lý. Điều quan trọng tiếp theo là phân biệt điều bạn làm được với công việc bạn thực sự muốn theo đuổi.` : `Hồ sơ học tập hiện có cho thấy thế mạnh ${profile.strengths?.join(', ') || 'chưa cập nhật'}. Phần sở thích nghề nghiệp cần được hoàn thành trước khi UniView có thể tạo nhận định RIASEC.`}>
              <div className="mt-7 grid gap-7 md:grid-cols-2">
                <div>
                  <h3 className="text-[16px] font-bold text-[#172033]">Cơ sở đang ủng hộ</h3>
                  <ul className="mt-3 space-y-3 text-[14px] leading-6 text-[#56657A]">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />{hasRiasec ? `Sở thích nghề nghiệp nghiêng về các hoạt động thuộc nhóm ${topCodes.map((code) => RIASEC_DIMENSIONS[code].label.toLowerCase()).join(', ')}.` : 'Chưa đủ câu trả lời để xác định các chiều sở thích nghề nghiệp nổi bật.'}</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />Hồ sơ hiện có đủ thông tin khu vực và tài chính để bắt đầu lọc trường ở mức tham khảo.</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />Ba hướng được chọn ban đầu có thể đưa thẳng vào Roadmap để thu thập evidence.</li>
                  </ul>
                </div>
                <div>
                  <EvidenceNote tone="coral" title="Điểm cần kiểm chứng">Câu trả lời tự đánh giá chưa cho biết bạn duy trì năng lượng thế nào với deadline, phản hồi nhiều vòng và những phần việc lặp lại của nghề.</EvidenceNote>
                  <div className="mt-4"><EvidenceNote tone="warning" title="Giới hạn của báo cáo">Kết quả không thay thế trải nghiệm thực tế, tư vấn chuyên môn hay thông tin tuyển sinh chính thức của trường.</EvidenceNote></div>
                </div>
              </div>
            </ReportSection>

            <ReportSection id="riasec" eyebrow="Phân tích sở thích nghề nghiệp" title={hasRiasec ? `Hồ sơ RIASEC của bạn: ${riasec.top3}` : 'Hồ sơ RIASEC chưa hoàn tất'} intro="Sáu chiều thể hiện mức độ bạn hứng thú với từng kiểu hoạt động. Điểm số được giữ nguyên từ bài Assessment, không phải phần trăm phù hợp với ngành.">
              <div className="mt-7 grid items-center gap-8 border-b border-[#E3EAF4] pb-8 md:grid-cols-[minmax(280px,0.9fr)_1.1fr]">
                <div className="rounded-2xl bg-[#F7F9FC] p-4"><RiasecRadar scores={riasec.scores} /></div>
                {hasRiasec ? <div>
                  <p className="text-xs font-bold text-[#75839A]">BA CHIỀU NỔI BẬT</p>
                  <div className="mt-4 space-y-5">
                    {riasec.ranking.slice(0, 3).map(({ code, score }, index) => <div key={code} className="grid grid-cols-[44px_1fr] gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF1FF] text-base font-extrabold text-[#1D4ED8]">{code}</span><div><div className="flex items-baseline justify-between gap-3"><h3 className="font-bold text-[#172033]">{RIASEC_DIMENSIONS[code].label}</h3><strong className="text-sm text-[#1D4ED8]">{score}%</strong></div><p className="mt-1 text-sm leading-6 text-[#56657A]">{RIASEC_DIMENSIONS[code].description}</p>{index === 0 && <p className="mt-1 text-xs font-medium text-[#75839A]">Đây là tín hiệu nổi bật nhất, không phải nhãn tính cách cố định.</p>}</div></div>)}
                  </div>
                </div> : <div><p className="text-xs font-bold text-[#75839A]">CHƯA CÓ KẾT QUẢ</p><h3 className="mt-3 text-xl font-bold text-[#172033]">Hoàn thành 30 câu hỏi để mở phân tích</h3><p className="uv-report-body mt-3">UniView sẽ hiển thị ba chiều nổi bật, biểu đồ so sánh và phần giải thích sau khi bạn trả lời đủ bài Assessment.</p><Link to="/assessment/riasec" className="uv-report-button-primary mt-5">Tiếp tục Assessment</Link></div>}
              </div>
              {hasRiasec && <div className="mt-4 grid gap-x-8 md:grid-cols-2">{riasec.ranking.map(({ code, score }) => <RiasecDimension key={code} code={code} score={score} isTop={topCodes.includes(code)} />)}</div>}
              <div className="mt-6"><EvidenceNote title="Cách đọc kết quả">Các điểm gần nhau gợi ý nên khám phá theo tổ hợp. Một điểm thấp chỉ nói về mức hứng thú hiện tại, không khẳng định bạn không có khả năng học hay làm lĩnh vực đó.</EvidenceNote></div>
            </ReportSection>

            <ReportSection id="profile" eyebrow="Điều kiện cá nhân" title="Học lực, khu vực và khả năng tài chính" intro="Những dữ liệu này giúp thu hẹp lựa chọn trường. Điểm bỏ trống được giữ là chưa có dữ liệu và không bao giờ bị quy thành 0." action={<Link to="/assessment/quick-profile" className="uv-report-button-secondary">Cập nhật hồ sơ</Link>}>
              {missingScores && <div className="mt-6"><MissingDataNotice>Bạn chưa nhập điểm GPA, tổ hợp THPT hoặc ĐGNL. Gợi ý trường vẫn hiển thị theo ngành, khu vực và tài chính nhưng chưa đối chiếu điều kiện xét tuyển.</MissingDataNotice></div>}
              <dl className="mt-5 grid gap-x-6 md:grid-cols-3">
                <ProfileItem label="GPA" note={profile.gpa ? (profile.gpaStatus === 'OFFICIAL' ? 'Điểm chính thức' : 'Điểm dự kiến') : 'Có thể cập nhật sau'}><ValueOrMissing value={profile.gpa} suffix=" / 10" /></ProfileItem>
                <ProfileItem label="Tổ hợp THPT" note={profile.thptScore ? (profile.thptScoreStatus === 'OFFICIAL' ? 'Điểm chính thức' : 'Điểm dự kiến') : 'Có thể để trống nếu chưa thi'}><ValueOrMissing value={profile.thptScore} suffix=" / 30" /></ProfileItem>
                <ProfileItem label="ĐGNL" note={profile.dgnlScore ? (profile.dgnlScoreStatus === 'OFFICIAL' ? 'Điểm chính thức' : 'Điểm dự kiến') : 'Có thể để trống nếu chưa thi'}><ValueOrMissing value={profile.dgnlScore} suffix=" / 1200" /></ProfileItem>
                <ProfileItem label="Khu vực ưu tiên">{profile.regions?.join(', ') || 'Chưa cập nhật'}</ProfileItem>
                <ProfileItem label="Ngân sách dự kiến">{profile.tuition ? `${profile.tuition} triệu đồng/năm` : 'Chưa cập nhật'}</ProfileItem>
                <ProfileItem label="Ưu tiên lựa chọn">{profile.priorities?.join(' · ') || 'Chưa cập nhật'}</ProfileItem>
              </dl>
              <p className="mt-4 text-[13px] leading-5 text-[#75839A]">Cập nhật hồ sơ sẽ tính lại gợi ý trường; các lựa chọn đã lưu trong Shortlist vẫn được giữ nguyên.</p>
            </ReportSection>

            <section id="majors" className="scroll-mt-24">
              <header className="max-w-3xl"><p className="uv-report-eyebrow">Các hướng nên tìm hiểu</p><h2 className="uv-report-section-title mt-2">6 nhóm ngành và 18 giả thuyết ban đầu</h2><p className="uv-report-body mt-3">Mỗi nhóm kết nối kết quả RIASEC với hồ sơ hiện tại. Mở từng ngành để xem lý do đề xuất và điều cần kiểm chứng trước khi lựa chọn.</p></header>
              <div className="mt-7 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">{ANNUAL_DEMO_GROUPS.map((group, index) => <MajorRecommendationCard key={group.id} group={group} index={index} />)}</div>
            </section>

            <ReportSection id="universities" eyebrow="Gợi ý theo hồ sơ hiện tại" title={`Trường nên tìm hiểu cho ${primaryMajor?.name}`} intro="Các trường được trình bày để so sánh, không phải quảng cáo hoặc dự đoán xác suất trúng tuyển. Thông tin demo phải được đối chiếu lại với nguồn chính thức." action={<Link to={`/schools/recommendations?major=${primaryMajorId}`} className="uv-report-link text-sm font-bold text-[#1D4ED8] hover:text-[#1E40AF]">Xem đầy đủ →</Link>}>
              <div className="mt-7 grid items-stretch gap-5 xl:grid-cols-3">{universities.map((school) => <UniversityRecommendationCard key={school.id} school={school} saved={state.shortlist.includes(school.id)} onToggle={() => toggleShortlist(school.id, { source: 'report', sourceLabel: 'Đã lưu từ báo cáo', majorId: primaryMajorId, majorName: primaryMajor?.name, program: school.program, criteria: school.criteria })} />)}</div>
            </ReportSection>

            <section id="next-steps" className="uv-report-surface uv-report-section relative overflow-hidden border-l-4 border-l-[#1D4ED8]">
              <div className="max-w-3xl"><p className="uv-report-eyebrow">Từ hiểu mình đến trải nghiệm thật</p><h2 className="uv-report-section-title mt-2">Bạn đã có những hướng đi đầu tiên. Hãy thử kiểm chứng chúng.</h2><p className="uv-report-body mt-3">Những đề xuất phía trên dựa trên dữ liệu hiện tại. Roadmap giúp bạn trải nghiệm các hoạt động thực tế của ngành trước khi đưa ra lựa chọn quan trọng.</p><div className="mt-6"><ReportActions /></div></div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AnnualReportPage
