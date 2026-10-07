import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import {
  personalityTypeAssessment,
  riasecAssessment,
} from '../data/assessment'
import {
  scorePersonalityType,
  scoreRiasec,
} from '../utils/assessmentScoring'

const riasecMeta = {
  R: {
    label: 'Realistic',
    vietnamese: 'Kỹ thuật',
    color: 'bg-sky-600',
  },
  I: {
    label: 'Investigative',
    vietnamese: 'Nghiên cứu',
    color: 'bg-primary',
  },
  A: {
    label: 'Artistic',
    vietnamese: 'Sáng tạo',
    color: 'bg-amber-500',
  },
  S: {
    label: 'Social',
    vietnamese: 'Xã hội',
    color: 'bg-emerald-500',
  },
  E: {
    label: 'Enterprising',
    vietnamese: 'Dẫn dắt',
    color: 'bg-rose-500',
  },
  C: {
    label: 'Conventional',
    vietnamese: 'Quy chuẩn',
    color: 'bg-indigo-500',
  },
}

const activityLabels = {
  TECHNOLOGY: 'Công nghệ & Lập trình',
  RESEARCH_DATA: 'Nghiên cứu & Dữ liệu',
  VISUAL_DESIGN: 'Hội họa & Thiết kế',
  MUSIC_PERFORMANCE: 'Âm nhạc & Biểu diễn',
  COMMUNICATION_LEADERSHIP: 'Giao tiếp & Dẫn dắt',
  CARE_TEACHING: 'Hỗ trợ & Giảng dạy',
  BUSINESS_ORGANIZATION: 'Kinh doanh & Tổ chức',
  HANDS_ON_ENGINEERING: 'Kỹ thuật & Thực hành',
}

const majorSuggestions = [
  {
    title: 'Kỹ thuật Phần mềm',
    group: 'Máy tính & Công nghệ',
    description:
      'Phân tích yêu cầu, thiết kế kiến trúc và xây dựng các hệ thống phần mềm phục vụ doanh nghiệp và cộng đồng.',
    match: 'Rất cao',
    fit: 86,
    confidence: 'Cao',
    reason: 'Tư duy phân tích, hứng thú công nghệ và xu hướng làm việc theo quy trình cùng xuất hiện rõ.',
    tradeoff: 'Cần kiên trì với debugging, đọc mã nguồn cũ và cập nhật công nghệ liên tục.',
    tags: ['Tư duy logic', 'Công nghệ', 'Giải quyết vấn đề'],
  },
  {
    title: 'Khoa học Dữ liệu & Trí tuệ Nhân tạo',
    group: 'Toán & Dữ liệu',
    description:
      'Tìm quy luật từ dữ liệu, xây dựng mô hình dự báo và hỗ trợ ra quyết định bằng thuật toán.',
    match: 'Rất cao',
    fit: 82,
    confidence: 'Khá cao',
    reason: 'Năng lực tìm quy luật và sự quan tâm đến dữ liệu tạo nền tảng khám phá tốt.',
    tradeoff: 'Cần kiểm chứng thêm mức hứng thú với xác suất, thống kê và làm sạch dữ liệu.',
    tags: ['Phân tích', 'Dữ liệu', 'Nghiên cứu'],
  },
  {
    title: 'Hệ thống Thông tin Quản lý',
    group: 'Công nghệ & Quản trị',
    description:
      'Kết nối hệ thống dữ liệu với quy trình vận hành và chiến lược của tổ chức.',
    match: 'Cao',
    fit: 78,
    confidence: 'Trung bình',
    reason: 'Điểm giao giữa tư duy hệ thống, quy trình tổ chức và giải pháp phần mềm.',
    tradeoff: 'Công việc yêu cầu giao tiếp liên phòng ban và phân tích nhu cầu con người.',
    tags: ['Quy trình', 'Kinh doanh', 'Hệ thống'],
  },
  {
    title: 'Thiết kế Trải nghiệm số',
    group: 'Sáng tạo & Công nghệ',
    description:
      'Nghiên cứu người dùng và thiết kế sản phẩm số trực quan, hữu ích và dễ tiếp cận.',
    match: 'Khá cao',
    fit: 69,
    confidence: 'Cần kiểm chứng',
    reason: 'Xu hướng sáng tạo có thể phát huy trong một framework sản phẩm rõ ràng.',
    tradeoff: 'Cần quan sát người dùng thường xuyên và bảo vệ quyết định thiết kế bằng dữ liệu.',
    tags: ['Sáng tạo', 'Người dùng', 'Thiết kế'],
  },
  {
    title: 'An toàn Thông tin',
    group: 'Hạ tầng & An ninh',
    description:
      'Bảo vệ hệ thống, kiểm thử bảo mật và xử lý rủi ro trong môi trường số.',
    match: 'Cao',
    fit: 75,
    confidence: 'Trung bình',
    reason: 'Tư duy giải quyết vấn đề hệ thống phù hợp với môi trường có quy chuẩn chặt chẽ.',
    tradeoff: 'Áp lực cập nhật lỗ hổng, xử lý sự cố và trách nhiệm bảo mật khá cao.',
    tags: ['Logic', 'Hệ thống', 'Bảo mật'],
  },
  {
    title: 'Công nghệ Tài chính',
    group: 'Kinh tế số',
    description:
      'Ứng dụng dữ liệu và công nghệ vào thanh toán, quản trị rủi ro và dịch vụ tài chính.',
    match: 'Khá cao',
    fit: 73,
    confidence: 'Trung bình',
    reason: 'Giao thoa giữa dữ liệu định lượng, bài toán kinh tế và sản phẩm số.',
    tradeoff: 'Cần bổ sung kiến thức tài chính, pháp lý và khả năng đánh giá rủi ro.',
    tags: ['Dữ liệu', 'Tài chính', 'Sản phẩm'],
  },
]

const universities = [
  {
    shortName: 'UIT',
    name: 'ĐH Công nghệ Thông tin – ĐHQG-HCM',
    note: 'Thế mạnh công nghệ, phần mềm, dữ liệu và an toàn thông tin.',
    tuition: 'Khoảng 35–55 triệu/năm',
    admission: 'THPT, ĐGNL ĐHQG-HCM và phương thức kết hợp',
    fit: 'Rất phù hợp với nhóm ngành ưu tiên',
  },
  {
    shortName: 'HCMUS',
    name: 'ĐH Khoa học Tự nhiên – ĐHQG-HCM',
    note: 'Nền tảng khoa học, toán và nghiên cứu dữ liệu vững chắc.',
    tuition: 'Khoảng 30–45 triệu/năm',
    admission: 'THPT, ĐGNL và tuyển thẳng theo đề án',
    fit: 'Phù hợp nếu ưu tiên nền tảng Toán – Dữ liệu',
  },
  {
    shortName: 'HCMUT',
    name: 'ĐH Bách khoa – ĐHQG-HCM',
    note: 'Môi trường kỹ thuật đa ngành và kết nối doanh nghiệp tốt.',
    tuition: 'Khoảng 30–60 triệu/năm tùy chương trình',
    admission: 'THPT, ĐGNL và phương thức tổng hợp',
    fit: 'Đáng cân nhắc cho môi trường kỹ thuật rộng',
  },
]

const checklistItems = [
  'Đọc đề cương chi tiết của 2 ngành đầu tiên',
  'Thử một dự án nhỏ trong 2–4 tuần',
  'So sánh học phí và phương thức tuyển sinh',
  'Trao đổi kết quả với phụ huynh hoặc giáo viên',
]

function AssessmentResultPage() {
  const { assessment } = useAssessment()
  const { user, hasEntitlement, reportHistory } = useAuth()
  const [searchParams] = useSearchParams()
  const archivedReport = reportHistory.find(
    ({ id }) => id === searchParams.get('report'),
  )?.report
  const activeAssessment =
    archivedReport?.clientInputSnapshot ?? assessment

  const [selectedMajor, setSelectedMajor] =
    useState(0)
  const [checklist, setChecklist] = useState(
    [true, false, false, false],
  )

  const riasecResult = scoreRiasec(
    activeAssessment.riasecAnswers,
  )
  const personalityResult =
    scorePersonalityType(
      activeAssessment.personalityAnswers,
    )

  const riasecAnswered = Object.values(
    activeAssessment.riasecAnswers,
  ).filter(Boolean).length

  const personalityAnswered = Object.values(
    activeAssessment.personalityScaleAnswers,
  ).filter(Boolean).length

  const completion =
    riasecAnswered +
    personalityAnswered

  const totalQuestions =
    riasecAssessment.questions.length +
    personalityTypeAssessment.questions.length

  const confidence = Math.min(
    98,
    Math.round(
      20 +
        (completion / totalQuestions) * 65 +
        Math.min(
          activeAssessment.experience
            .selectedDomains.length * 4,
          12,
        ),
    ),
  )

  const completedChecklist =
    checklist.filter(Boolean).length

  const topThree = riasecAnswered
    ? riasecResult.ranking.slice(0, 3)
    : []

  const personalityType =
    personalityAnswered
      ? personalityResult.type
      : '—'

  const profile = activeAssessment.profile
  const activeReport = archivedReport ?? assessment.report
  const reportGeneratedDate = activeReport?.generatedAt
    ? new Date(activeReport.generatedAt).toLocaleDateString('vi-VN')
    : 'Chưa ghi nhận'
  const reportCode = activeReport?.id
    ? String(activeReport.id).toUpperCase().replace('UV-LOCAL-', 'UV-DS-')
    : `UV-DS-${String(riasecAnswered * 103 + personalityAnswered * 17 + 2026).padStart(5, '0')}`

  const axisPercent = (axis, code) =>
    personalityResult.axes[axis]?.percentages?.[code] ?? 0

  const workStyleMetrics = [
    {
      label: 'Phân tích',
      value: Math.round((axisPercent('TF', 'T') + axisPercent('EI', 'I')) / 2),
      note: 'Ưu tiên dữ liệu và suy luận trước khi hành động',
    },
    {
      label: 'Có cấu trúc',
      value: Math.round((axisPercent('JP', 'J') + (riasecResult.scores.C ?? 0)) / 2),
      note: 'Phát huy tốt khi có lộ trình và đầu ra rõ ràng',
    },
    {
      label: 'Làm việc độc lập',
      value: Math.round(axisPercent('EI', 'I')),
      note: 'Thoải mái với các khoảng tập trung sâu riêng',
    },
    {
      label: 'Tư duy trừu tượng',
      value: Math.round(axisPercent('SN', 'N')),
      note: 'Quan tâm mô hình, ý tưởng và khả năng trong tương lai',
    },
  ]

  const evidenceBreakdown = [
    ['Sở thích', Math.round(riasecResult.ranking[0]?.score ?? 0)],
    ['Học tập', profile.gpa ? Math.min(100, Math.round(Number(profile.gpa) * 10)) : 50],
    ['Hoạt động', Math.min(100, 40 + activeAssessment.experience.selectedDomains.length * 12)],
    ['Phong cách', Math.max(...workStyleMetrics.map(({ value }) => value), 0)],
    ['Điều kiện', profile.regions.length && profile.tuition ? 80 : 55],
  ]

  const selectedActivities =
    activeAssessment.experience.selectedDomains.map(
      (id) => activityLabels[id],
    )
  const certificateEvidence = (profile.certificates ?? []).map(
    ({ name, score, status }) =>
      `${name} ${score} · ${status === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến'}`,
  )
  const academicEvidence = [
    ...profile.strengths,
    profile.gpa && `GPA ${profile.gpa} · ${profile.gpaStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến'}`,
    profile.thptScore && `THPT ${profile.thptScore}/30 · ${profile.thptScoreStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến'}`,
    profile.dgnlScore && `ĐGNL ${profile.dgnlScore}/1200 · ${profile.dgnlScoreStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến'}`,
  ].filter(Boolean)

  const selectedMajorData =
    majorSuggestions[selectedMajor]

  const toggleChecklist = (index) => {
    setChecklist((current) =>
      current.map((checked, itemIndex) =>
        itemIndex === index
          ? !checked
          : checked,
      ),
    )
  }

  const hasFullReport =
    hasEntitlement('DIRECTION_SNAPSHOT') ||
    hasEntitlement('ADMISSION_PASS')

  if (!hasFullReport) {
    return (
      <FreeAssessmentPreview
        user={user}
        topThree={topThree}
        riasecResult={riasecResult}
        personalityType={personalityType}
        personalityResult={personalityResult}
        confidence={confidence}
        selectedActivities={selectedActivities}
      />
    )
  }

  return (
    <main className="min-h-screen bg-surface pb-space-2xl">
      <section className="border-b border-surface-container-high bg-gradient-to-br from-surface-container-low via-white to-primary-fixed/35">
        <div className="mx-auto max-w-[1180px] space-y-space-md px-margin py-space-xl md:px-margin-md lg:px-gutter-lg">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-tile-rose px-space-md py-1 text-xs font-bold uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
              Direction Snapshot · Gói 59K
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-surface-container px-space-sm py-1 text-xs font-semibold text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">verified</span>
              Bản chính thức
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-headline-lg text-headline-lg-mobile font-extrabold tracking-tight text-on-surface sm:text-headline-lg">
              Báo cáo định hướng cá nhân của {user?.fullName ?? 'bạn'}
            </h1>
            <p className="mt-space-sm font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              Báo cáo tổng hợp assessment, hồ sơ học tập, trải nghiệm và điều kiện thực tế để xây dựng danh sách ngành đáng khám phá — không đưa ra một kết luận nghề nghiệp duy nhất.
            </p>
          </div>

          <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md text-sm text-on-surface-variant">
            <span className="material-symbols-outlined mt-0.5 text-xl text-primary">info</span>
            <p>
              <strong className="text-primary">Ảnh chụp hồ sơ tại một thời điểm:</strong>{' '}
              báo cáo được tạo ngày {reportGeneratedDate}. Thay đổi hồ sơ sau ngày này không tự động sửa bản báo cáo đã lưu.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-space-sm rounded-xl bg-white p-space-md shadow-sm sm:grid-cols-4">
            {[
              ['Học sinh', user?.fullName ?? 'Chí Duy'],
              ['Mã báo cáo', reportCode],
              ['Phiên bản', '1.0 · Tiêu chuẩn'],
              ['Độ đầy đủ dữ liệu', `${confidence}%`],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">{label}</span>
                <span className="mt-1 block text-sm font-bold text-on-surface">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-space-sm pt-space-xs">
            <a href="#danh-sach-nganh" className="inline-flex items-center gap-2 rounded-full bg-primary-container px-space-lg py-2.5 font-semibold text-on-primary shadow-sm hover:bg-primary">
              Khám phá các ngành
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-white px-space-lg py-2.5 font-label-lg text-label-lg font-semibold text-on-surface shadow-sm transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-lg">
                print
              </span>
              Tải/In báo cáo PDF
            </button>

            <Link
              to="/assessment/riasec"
              className="inline-flex items-center gap-2 rounded-full bg-primary-container px-space-lg py-2.5 font-label-lg text-label-lg font-semibold text-on-primary shadow-sm transition hover:bg-primary"
            >
              <span className="material-symbols-outlined text-lg">
                edit
              </span>
              Chỉnh câu trả lời
            </Link>
          </div>
        </div>
      </section>

      <nav className="sticky top-[74px] z-30 overflow-x-auto border-y border-surface-container-high bg-surface/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex min-w-max max-w-[1280px] items-center gap-space-xs px-margin py-space-xs md:px-margin-md lg:px-gutter-lg">
          {[
            ['tong-quan', '1. Tổng quan'],
            ['ho-so-mot-trang', '2. Hồ sơ'],
            ['doi-chieu-du-lieu', '3. Đối chiếu'],
            ['danh-sach-nganh', '4. 6 ngành khám phá'],
            ['phan-tich-chuyen-sau', '5. Phân tích chi tiết'],
            ['truong-tham-khao', '6. Trường tham khảo'],
            ['buoc-tiep-theo', '7. Bước kế tiếp'],
          ].map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors md:text-sm ${
                index === 0
                  ? 'bg-primary-fixed/60 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-space-2xl px-margin pt-space-xl md:px-margin-md lg:px-gutter-lg">
        {completion < totalQuestions && (
          <div className="flex items-start gap-space-sm rounded-2xl border border-amber-200 bg-amber-50 p-space-md text-amber-900">
            <span className="material-symbols-outlined">
              info
            </span>
            <div>
              <strong className="text-sm">
                Báo cáo đang dùng dữ liệu hiện có.
              </strong>
              <p className="text-sm">
                Bạn đã trả lời {completion}/
                {totalQuestions} câu ở hai bước đầu.
                Hoàn thành thêm câu hỏi sẽ làm kết quả
                đáng tin cậy hơn.
              </p>
            </div>
          </div>
        )}

        <ReportSection
          id="tong-quan"
          eyebrow="Phần 1"
          title="Tổng quan định hướng của bạn"
          description="Những tín hiệu nổi bật nhất từ bài đánh giá."
        >
          <div className="grid grid-cols-1 gap-space-md lg:grid-cols-12">
            <article className="rounded-3xl border border-surface-container-high bg-white p-space-lg shadow-sm lg:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Xu hướng nghề nghiệp RIASEC
                </h3>
                <span className="rounded-full bg-primary-fixed/50 px-space-sm py-1 text-xs font-bold text-primary">
                  {riasecResult.top3 || 'Chưa đủ dữ liệu'}
                </span>
              </div>

              <div className="mt-space-md flex flex-col gap-space-sm">
                {riasecResult.ranking.map(
                  ({ code, score }) => {
                    const percent = Math.round(score)
                    const meta = riasecMeta[code]

                    return (
                      <div
                        key={code}
                        className="grid grid-cols-[minmax(125px,1fr)_3fr_42px] items-center gap-space-sm"
                      >
                        <span className="text-xs font-semibold text-on-surface">
                          {code} · {meta.vietnamese}
                        </span>
                        <div className="h-2.5 overflow-hidden rounded-full bg-surface-container">
                          <div
                            className={`h-full rounded-full ${meta.color}`}
                            style={{
                              width: `${percent}%`,
                            }}
                          />
                        </div>
                        <strong className="text-right text-xs text-on-surface-variant">
                          {percent}%
                        </strong>
                      </div>
                    )
                  },
                )}
              </div>
            </article>

            <article className="rounded-3xl border border-surface-container-high bg-white p-space-lg shadow-sm lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Phong cách tư duy & làm việc
              </span>
              <div className="mt-space-md space-y-space-sm">
                {workStyleMetrics.map(({ label, value, note }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-on-surface">{label}</span>
                      <strong className="text-primary">{value}/100</strong>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-container-high">
                      <div className="h-full rounded-full bg-primary-container" style={{ width: `${value}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-on-surface-variant">{note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-space-md rounded-xl bg-tile-amber p-space-sm text-xs italic text-on-tertiary-fixed-variant">
                Các trục mô tả xu hướng hiện tại, không phải nhãn tính cách cố định. Mã tham khảo: {personalityType}.
              </p>
            </article>

            <article className="flex flex-col rounded-3xl border border-surface-container-high bg-white p-space-lg shadow-sm lg:col-span-3">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Độ tin cậy kết quả</h3>
              <div className="mx-auto my-space-md flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-primary-fixed bg-white shadow-inner">
                <span className="text-2xl font-extrabold text-primary">{confidence}%</span>
              </div>
              <span className="text-center text-sm font-bold text-primary">{confidence >= 80 ? 'Tin cậy cao' : confidence >= 60 ? 'Khá tin cậy' : 'Cần bổ sung dữ liệu'}</span>
              <div className="mt-space-md space-y-2 text-xs text-on-surface-variant">
                <p>✓ Hoàn thành {completion}/{totalQuestions} câu hỏi cốt lõi.</p>
                <p>✓ Có {selectedActivities.length} nhóm trải nghiệm đối chiếu.</p>
                <p>○ Kết quả vẫn cần được kiểm chứng bằng trải nghiệm thật.</p>
              </div>
            </article>
          </div>
        </ReportSection>

        <ReportSection
          id="ho-so-mot-trang"
          eyebrow="Phần 2"
          title="Hồ sơ của bạn trong một trang"
          description="Tóm tắt các tín hiệu, bằng chứng và ràng buộc quan trọng."
        >
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <SummaryCard
              icon="signal_cellular_alt"
              title="Tín hiệu mạnh nhất"
              items={topThree.map(
                ({ code }) =>
                  `${riasecMeta[code].vietnamese} (${code})`,
              )}
            />
            <SummaryCard
              icon="workspace_premium"
              title="Bằng chứng đang có"
              items={
                selectedActivities.length || certificateEvidence.length
                  ? [...selectedActivities, ...certificateEvidence]
                  : [
                      activeAssessment.experience
                        .noExperience
                        ? 'Chưa có nhiều cơ hội trải nghiệm'
                        : 'Chưa bổ sung trải nghiệm',
                    ]
              }
            />
            <SummaryCard
              icon="school"
              title="Điểm mạnh học tập"
              items={
                academicEvidence.length
                  ? academicEvidence
                  : ['Chưa cập nhật']
              }
            />
            <SummaryCard
              icon="tune"
              title="Điều kiện thực tế"
              items={[
                profile.regions.join(', ') ||
                  'Chưa chọn khu vực',
                `Ngân sách: ${tuitionLabel(
                  profile.tuition,
                )}`,
                `GPA: ${profile.gpa || '—'}`,
              ]}
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-space-md">
            <h3 className="flex items-center gap-space-xs font-label-lg text-label-lg font-bold text-amber-900">
              <span className="material-symbols-outlined">
                pending
              </span>
              Điều UniView chưa thể kết luận
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              Bài đánh giá không khẳng định một nghề duy
              nhất phù hợp với bạn. Kết quả cần được kiểm
              chứng thêm qua môn học, dự án và trải nghiệm
              thực tế.
            </p>
          </div>
        </ReportSection>

        <ReportSection
          id="doi-chieu-du-lieu"
          eyebrow="Phần 3"
          title="Các nguồn dữ liệu đang nói gì?"
          description="Đối chiếu giữa sở thích, phong cách và bằng chứng thực tế."
        >
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-space-lg">
              <h3 className="flex items-center gap-space-xs font-headline-sm text-headline-sm font-bold text-emerald-900">
                <span className="material-symbols-outlined">
                  verified
                </span>
                Những điểm đồng thuận cao
              </h3>
              <ul className="mt-space-md space-y-space-sm text-sm leading-relaxed text-emerald-900">
                <li>
                  • Nhóm {riaseacTopLabel(topThree)}
                  đang xuất hiện nổi bật trong phản hồi.
                </li>
                <li>
                  • Phong cách {personalityType}
                  gợi ý cách tiếp cận vấn đề của bạn.
                </li>
                <li>
                  • {selectedActivities.length}{' '}
                  lĩnh vực đã có trải nghiệm để đối
                  chiếu.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-rose-200 bg-rose-50 p-space-lg">
              <h3 className="flex items-center gap-space-xs font-headline-sm text-headline-sm font-bold text-secondary">
                <span className="material-symbols-outlined">
                  science
                </span>
                Tín hiệu cần kiểm chứng
              </h3>
              <ul className="mt-space-md space-y-space-sm text-sm leading-relaxed text-on-secondary-container">
                <li>
                  • Mức hứng thú cao chưa đồng nghĩa với
                  năng lực đã được rèn luyện.
                </li>
                <li>
                  • Điểm số hiện tại cần đối chiếu với đề
                  án tuyển sinh của từng trường.
                </li>
                <li>
                  • Hãy thử dự án ngắn trước khi chốt
                  nguyện vọng dài hạn.
                </li>
              </ul>
            </article>
          </div>
        </ReportSection>

        <ReportSection
          id="danh-sach-nganh"
          eyebrow="Phần 4"
          title="6 ngành đáng để bạn khám phá"
          description="Danh sách gợi ý để mở rộng tìm hiểu, không phải thứ hạng bắt buộc."
        >
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
            {majorSuggestions.map(
              (major, index) => (
                <button
                  key={major.title}
                  type="button"
                  onClick={() =>
                    setSelectedMajor(index)
                  }
                  className={`flex flex-col justify-between rounded-2xl border p-space-lg text-left transition-all hover:-translate-y-1 hover:shadow-md ${
                    selectedMajor === index
                      ? 'border-primary bg-primary-fixed/25 shadow-md ring-1 ring-primary'
                      : 'border-surface-container-high bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-space-xs text-xs">
                      <span className="font-semibold text-on-surface-variant">
                        {String(index + 1).padStart(
                          2,
                          '0',
                        )}{' '}
                        / 06
                      </span>
                      <span className="rounded bg-surface-container px-2 py-0.5 font-semibold text-on-surface-variant">
                        {major.group}
                      </span>
                    </div>
                    <div className="mt-space-sm flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-on-surface-variant">Điểm tương thích</span>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary">{major.fit}/100 · {major.confidence}</span>
                    </div>
                    <h3 className="mt-space-sm font-headline-sm text-headline-sm font-bold text-on-surface">
                      {major.title}
                    </h3>
                    <p className="mt-space-xs text-sm leading-relaxed text-on-surface-variant">
                      {major.description}
                    </p>
                    <p className="mt-space-sm text-xs leading-relaxed text-on-surface">
                      <strong>Lý do xuất hiện:</strong> {major.reason}
                    </p>
                    <p className="mt-space-xs flex items-start gap-1.5 text-xs leading-relaxed text-secondary">
                      <span className="material-symbols-outlined mt-0.5 text-sm">balance</span>
                      <span><strong>Trade-off:</strong> {major.tradeoff}</span>
                    </p>
                  </div>

                  <div className="mt-space-md flex flex-wrap gap-1.5">
                    {major.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-surface-container-high bg-surface-container-low px-2 py-1 text-[11px] font-medium text-on-surface-variant"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ),
            )}
          </div>

          <article
            id="phan-tich-chuyen-sau"
            className="rounded-3xl bg-gradient-to-br from-surface-container-low to-primary-fixed/40 p-space-lg md:p-space-xl"
          >
            <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-start">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Phân hệ 05 · Phân tích ngành đang chọn
                </span>
                <h3 className="mt-1 font-headline-lg text-headline-lg-mobile font-extrabold text-on-surface sm:text-headline-lg">
                  {selectedMajorData.title}
                </h3>
                <p className="mt-space-sm font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {selectedMajorData.description}
                </p>
              </div>
              <span className="self-start rounded-full bg-white px-space-md py-1.5 text-xs font-bold text-primary shadow-sm">
                {selectedMajorData.fit}/100 · {selectedMajorData.match}
              </span>
            </div>

            <div className="mt-space-lg grid grid-cols-1 gap-space-md md:grid-cols-3">
              <InsightBox
                title="Vì sao xuất hiện?"
                text={selectedMajorData.reason}
              />
              <InsightBox
                title="Cần kiểm chứng gì?"
                text="Thử một dự án nhỏ và quan sát mức độ kiên trì khi gặp bài toán khó hoặc lặp lại."
              />
              <InsightBox
                title="Trade-off cần biết"
                text={selectedMajorData.tradeoff}
              />
            </div>

            <div className="mt-space-lg rounded-2xl bg-white/85 p-space-lg shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Bóc tách mức độ tương thích</h4>
                <span className="text-xs font-semibold text-on-surface-variant">Evidence breakdown · thang 0–100</span>
              </div>
              <div className="mt-space-md grid gap-space-md sm:grid-cols-2 lg:grid-cols-5">
                {evidenceBreakdown.map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">{label}</span>
                      <strong className="text-primary">{value}%</strong>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-container-high">
                      <div className="h-full rounded-full bg-primary-container" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-space-md flex items-start gap-space-md rounded-2xl bg-tile-amber p-space-lg">
              <span className="material-symbols-outlined text-2xl text-tertiary">lightbulb</span>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-tertiary">Reality check trước khi chọn</h4>
                <p className="mt-1 text-sm leading-relaxed text-on-tertiary-fixed-variant">
                  Điểm phù hợp cao không có nghĩa công việc hàng ngày luôn thú vị. Với {selectedMajorData.title}, bạn cần thử một nhiệm vụ thật đủ lâu để quan sát khả năng duy trì tập trung, xử lý phần việc lặp lại và phản ứng khi kết quả chưa đến ngay.
                </p>
              </div>
            </div>

            <div className="mt-space-md grid gap-space-md md:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-space-md">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Bằng chứng hiện còn thiếu</span>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Chưa có trải nghiệm dài hạn đủ để xác nhận bạn vẫn hứng thú khi phải xử lý một vấn đề khó trong nhiều ngày hoặc duy trì một sản phẩm qua nhiều vòng chỉnh sửa.
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 p-space-md">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Điều gì có thể làm thứ hạng thay đổi?</span>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Một dự án thực tế, kết quả môn nền tảng hoặc phản hồi từ người đang học/người đang làm nghề có thể làm ngành này tăng hoặc giảm thứ hạng so với các lựa chọn còn lại.
                </p>
              </div>
            </div>

            <div className="mt-space-md grid gap-space-sm md:grid-cols-3">
              <ActionCard number="01" title="Xem khung đào tạo" text={`Đọc chương trình 4 năm của ${selectedMajorData.title} tại ít nhất 2 trường.`} />
              <ActionCard number="02" title="Thử một nhiệm vụ thật" text="Làm một dự án nhỏ trong 3–7 ngày và ghi lại phần bạn thích, phần khiến bạn mất năng lượng." />
              <ActionCard number="03" title="Trò chuyện thực tế" text="Hỏi một sinh viên năm 3 hoặc người đang làm nghề về công việc hàng ngày và áp lực thật." />
            </div>
          </article>
        </ReportSection>

        <ReportSection
          id="truong-tham-khao"
          eyebrow="Phần 6"
          title="Một số trường đáng để tìm hiểu"
          description="Shortlist sơ bộ theo nhóm ngành và khu vực trong hồ sơ."
        >
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {universities.map((university) => (
              <article
                key={university.shortName}
                className="flex flex-col justify-between rounded-2xl border border-surface-container-high bg-white p-space-lg shadow-sm"
              >
                <div>
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-primary-container px-2 font-bold text-white">
                    {university.shortName}
                  </span>
                  <h3 className="mt-space-sm font-headline-sm text-headline-sm font-bold text-on-surface">
                    {university.name}
                  </h3>
                  <p className="mt-space-xs text-sm leading-relaxed text-on-surface-variant">
                    {university.note}
                  </p>
                  <dl className="mt-space-md space-y-2 rounded-xl bg-surface-container-low p-space-sm text-xs">
                    <div>
                      <dt className="font-bold text-on-surface-variant">Học phí tham khảo</dt>
                      <dd className="mt-0.5 font-semibold text-on-surface">{university.tuition}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-on-surface-variant">Phương thức cần theo dõi</dt>
                      <dd className="mt-0.5 text-on-surface">{university.admission}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-on-surface-variant">Lý do vào shortlist</dt>
                      <dd className="mt-0.5 font-semibold text-primary">{university.fit}</dd>
                    </div>
                  </dl>
                </div>
                <Link
                  to="/universities"
                  className="mt-space-md inline-flex items-center justify-center rounded-full bg-surface-container-low px-space-md py-2 text-xs font-semibold text-on-surface transition hover:bg-surface-container"
                >
                  Xem thông tin trường
                </Link>
              </article>
            ))}
          </div>
        </ReportSection>

        <ReportSection
          id="buoc-tiep-theo"
          eyebrow="Phần 7"
          title="Bước tiếp theo dành cho bạn"
          description="Biến báo cáo thành những hành động nhỏ có thể kiểm chứng."
        >
          <div className="grid grid-cols-1 gap-space-md lg:grid-cols-12">
            <div className="grid grid-cols-1 gap-space-sm md:grid-cols-3 lg:col-span-7">
              <ActionCard
                number="01"
                title="Tìm hiểu sâu 2 ngành đầu tiên"
                text="Đọc chương trình đào tạo và công việc sau tốt nghiệp."
              />
              <ActionCard
                number="02"
                title="Kiểm chứng bằng trải nghiệm"
                text="Thử một dự án ngắn hoặc tham gia hoạt động liên quan."
              />
              <ActionCard
                number="03"
                title="So sánh điều kiện trường"
                text="Đối chiếu điểm, học phí và phương thức xét tuyển."
              />
            </div>

            <article className="rounded-2xl border border-surface-container-high bg-white p-space-lg shadow-sm lg:col-span-5">
              <div className="flex items-center justify-between gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Checklist hành động
                </h3>
                <span className="text-xs font-semibold text-primary">
                  {completedChecklist} /{' '}
                  {checklistItems.length} việc
                </span>
              </div>

              <div className="mt-space-md flex flex-col gap-space-xs">
                {checklistItems.map(
                  (item, index) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-start gap-space-xs rounded-xl bg-surface-container-low p-space-sm"
                    >
                      <input
                        type="checkbox"
                        checked={checklist[index]}
                        onChange={() =>
                          toggleChecklist(index)
                        }
                        className="mt-0.5 h-5 w-5 accent-primary"
                      />
                      <span
                        className={`text-sm ${
                          checklist[index]
                            ? 'text-on-surface-variant line-through'
                            : 'text-on-surface'
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </article>
          </div>

          <div className="flex flex-col items-center justify-between gap-space-md rounded-3xl bg-primary-container p-space-lg text-on-primary md:flex-row md:p-space-xl">
            <div>
              <h3 className="font-headline-md text-headline-md font-extrabold">
                Muốn kiểm chứng lựa chọn sâu hơn?
              </h3>
              <p className="mt-1 text-sm text-on-primary-container">
                Dùng Admission Pass để so sánh kịch bản
                và lập kế hoạch nguyện vọng.
              </p>
            </div>
            <Link
              to="/admission-pass"
              className="inline-flex shrink-0 items-center gap-space-xs rounded-full bg-white px-space-xl py-3 font-label-lg text-label-lg font-bold text-primary shadow-md"
            >
              Khám phá Admission Pass
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </ReportSection>
      </div>
    </main>
  )
}

function FreeAssessmentPreview({
  user,
  topThree,
  riasecResult,
  personalityType,
  personalityResult,
  confidence,
  selectedActivities,
}) {
  return (
    <main className="min-h-screen bg-surface pb-space-2xl">
      <section className="border-b border-surface-container-high bg-gradient-to-br from-blue-50 via-white to-rose-50">
        <div className="mx-auto max-w-[1120px] px-margin py-space-xl md:px-margin-md">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            Đã hoàn thành · Gói Free
          </span>
          <h1 className="mt-space-sm font-headline-lg text-headline-lg-mobile font-extrabold text-on-surface sm:text-headline-lg">
            Kết quả tổng quan của {user?.fullName ?? 'bạn'}
          </h1>
          <p className="mt-space-xs max-w-3xl text-on-surface-variant">
            Đây là phần thông tin cơ bản miễn phí. Phân tích ngành, trường, điểm cần cân nhắc và kế hoạch hành động được giữ trong báo cáo chi tiết.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] space-y-space-lg px-margin py-space-xl md:px-margin-md">
        <section>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Phần miễn phí</span>
          <h2 className="mt-1 text-2xl font-extrabold text-on-surface">Tổng quan định hướng của bạn</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Biểu đồ kết quả và các tín hiệu nổi bật luôn được xem miễn phí.</p>

          <div className="mt-space-md grid gap-space-md lg:grid-cols-2">
            <article className="rounded-3xl border border-surface-container-high bg-white p-space-lg shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Xu hướng nghề nghiệp RIASEC</h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary">{riasecResult.top3 || '—'}</span>
              </div>
              <div className="mt-space-md space-y-3">
                {riasecResult.ranking.map(({ code, score }) => (
                  <div key={code} className="grid grid-cols-[112px_1fr_48px] items-center gap-3 text-xs sm:grid-cols-[150px_1fr_52px]">
                    <span className="font-semibold text-on-surface">{code} · {riasecMeta[code].vietnamese}</span>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${riasecMeta[code].color}`}
                        style={{ width: `${Math.max(0, Math.min(score, 100))}%` }}
                      />
                    </div>
                    <span className="text-right font-bold text-on-surface-variant">{score}%</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-surface-container-high bg-white p-space-lg shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Phong cách tư duy & làm việc</p>
              <div className="mt-2 flex items-center gap-space-md">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-xl font-extrabold text-white shadow-md">{personalityType}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-on-surface">Hồ sơ phong cách tham khảo</h3>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">Kết quả mô tả xu hướng phản ứng, không phải nhãn tính cách cố định.</p>
                </div>
              </div>
              <div className="mt-space-md space-y-2">
                {Object.entries(personalityResult.axes).map(([axis, data]) => {
                  const [left, right] = axis
                  return (
                    <div key={axis} className="grid grid-cols-[24px_1fr_24px] items-center gap-2 text-xs">
                      <span className="font-bold text-primary">{left}</span>
                      <div className="flex h-7 overflow-hidden rounded-lg border border-blue-100 bg-slate-50">
                        <div className="flex items-center justify-start bg-blue-100 px-2 font-semibold text-blue-800" style={{ width: `${data.percentages[left]}%` }}>
                          {data.counts[left]}
                        </div>
                        <div className="flex flex-1 items-center justify-end px-2 font-semibold text-slate-600">
                          {data.counts[right]}
                        </div>
                      </div>
                      <span className="text-right font-bold text-primary">{right}</span>
                    </div>
                  )
                })}
              </div>
            </article>
          </div>

          <div className="mt-space-md flex items-center gap-space-md rounded-2xl border border-blue-100 bg-blue-50 p-space-md">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold text-primary shadow-sm">{confidence}%</span>
            <div>
              <h3 className="font-bold text-on-surface">Độ tin cậy kết quả</h3>
              <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">Chỉ số dựa trên mức độ hoàn thành câu hỏi và bằng chứng trải nghiệm đã cung cấp; đây là công cụ định hướng, không phải kết luận năng lực.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-space-md md:grid-cols-3">
          <SummaryCard
            icon="interests"
            title="Xu hướng RIASEC nổi bật"
            items={topThree.length ? topThree.map(({ code }) => `${code} · ${riasecMeta[code].vietnamese}`) : ['Chưa đủ dữ liệu']}
          />
          <SummaryCard
            icon="psychology"
            title="Phong cách tư duy"
            items={[personalityType, `Độ tin cậy dữ liệu ${confidence}%`]}
          />
          <SummaryCard
            icon="workspace_premium"
            title="Trải nghiệm nổi bật"
            items={selectedActivities.length ? selectedActivities : ['Chưa ghi nhận trải nghiệm']}
          />
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-lg">
          <div className="pointer-events-none select-none space-y-space-md p-space-lg blur-[5px] opacity-55" aria-hidden="true">
            {['Các ngành phù hợp nhất với hồ sơ', 'Vì sao từng ngành xuất hiện', 'Trường phù hợp theo điểm và học phí', 'Checklist hành động trong 30 ngày'].map((title, index) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-space-md">
                <span className="text-xs font-bold text-primary">0{index + 1}</span>
                <h2 className="mt-1 text-xl font-bold text-on-surface">{title}</h2>
                <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
              </article>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/20 via-white/65 to-white/95 p-space-md">
            <div className="max-w-lg rounded-3xl border border-blue-200 bg-white/95 p-space-lg text-center shadow-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-4xl text-primary">lock</span>
              <h2 className="mt-space-xs text-2xl font-extrabold text-on-surface">Mở khóa báo cáo chi tiết</h2>
              <p className="mt-space-xs text-sm leading-relaxed text-on-surface-variant">
                Thanh toán một lần 59.000đ để xem toàn bộ phân tích và lưu báo cáo vĩnh viễn trong hồ sơ Chí Duy.
              </p>
              <Link
                to={user ? '/checkout/personal-direction' : '/login?next=/checkout/personal-direction'}
                className="mt-space-md inline-flex items-center gap-2 rounded-full bg-primary-container px-space-xl py-3 font-bold text-on-primary shadow-md hover:bg-primary"
              >
                Mở khóa với 59.000đ
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <p className="mt-2 text-xs text-slate-500">Demo MVP · xác nhận thanh toán thủ công · không trừ tiền thật</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function ReportSection({
  id,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32 flex flex-col gap-space-md"
    >
      <div>
        <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
          {title}
        </h2>
        <p className="mt-1 max-w-3xl font-body-sm text-body-sm text-on-surface-variant">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

function SummaryCard({
  icon,
  title,
  items,
}) {
  return (
    <article className="rounded-2xl border border-surface-container-high bg-white p-space-md shadow-sm">
      <div className="flex items-center gap-space-xs">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-container text-primary">
          <span className="material-symbols-outlined text-xl">
            {icon}
          </span>
        </span>
        <h3 className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
          {title}
        </h3>
      </div>
      <ul className="mt-space-sm space-y-space-xs">
        {items.slice(0, 4).map((item) => (
          <li
            key={item}
            className="flex items-start gap-space-xs text-sm font-medium text-on-surface"
          >
            <span className="material-symbols-outlined mt-0.5 text-sm text-primary">
              check_circle
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function InsightBox({ title, text }) {
  return (
    <div className="rounded-2xl bg-white/85 p-space-md shadow-sm">
      <h4 className="font-label-lg text-label-lg font-bold text-on-surface">
        {title}
      </h4>
      <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
        {text}
      </p>
    </div>
  )
}

function ActionCard({
  number,
  title,
  text,
}) {
  return (
    <article className="rounded-2xl bg-surface-container-low p-space-md">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
        {number}
      </span>
      <h3 className="mt-space-sm font-label-lg text-label-lg font-bold text-on-surface">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
        {text}
      </p>
    </article>
  )
}

function tuitionLabel(value) {
  return (
    {
      'under-25': 'Dưới 25 triệu/năm',
      '25-45': '25–45 triệu/năm',
      '45-70': '45–70 triệu/năm',
      'over-70': 'Trên 70 triệu/năm',
      undecided: 'Chưa xác định',
    }[value] ?? value
  )
}

function riaseacTopLabel(topThree) {
  if (!topThree.length) {
    return 'chưa đủ dữ liệu'
  }

  return topThree
    .map(
      ({ code }) =>
        riasecMeta[code].vietnamese,
    )
    .join(' – ')
}

export default AssessmentResultPage
