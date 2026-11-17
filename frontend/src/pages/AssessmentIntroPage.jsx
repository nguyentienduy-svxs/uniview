import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'

const assessmentSteps = [
  {
    number: '01',
    duration: '~6 phút',
    title: 'Sở thích nghề nghiệp',
    description:
      '30 câu hỏi tình huống đo lường 6 xu hướng Holland RIASEC, giúp mở ra những cụm ngành phù hợp với thiên hướng tự nhiên của bạn.',
    meta: '30 câu hỏi',
    model: 'Holland RIASEC',
    dotClass: 'bg-blue-500',
    modelClass: 'text-primary',
  },
  {
    number: '02',
    duration: '~3 phút',
    title: 'Hoạt động & trải nghiệm',
    description:
      'Ghi nhận những lĩnh vực bạn đã thực sự thử, tần suất tham gia, vai trò và các minh chứng đã tạo ra.',
    meta: 'Bằng chứng thực tế',
    model: 'Portfolio Log',
    dotClass: 'bg-amber-500',
    modelClass: 'text-tertiary-container',
  },
  {
    number: '03',
    duration: '~3 phút',
    title: 'Hồ sơ & điều kiện thực tế',
    description:
      'Rà soát năm nhập học, khu vực, học phí và điểm số để kết quả định hướng bám sát điều kiện tuyển sinh thực tế.',
    meta: 'Rà soát nhanh',
    model: 'Hồ sơ tuyển sinh',
    dotClass: 'bg-emerald-500',
    modelClass: 'text-primary',
  },
]

function AssessmentIntroPage() {
  const navigate = useNavigate()
  const { user, reportHistory } = useAuth()
  const { assessment, resetAssessment } = useAssessment()
  const [showConfirmRetake, setShowConfirmRetake] = useState(false)

  const currentReport = assessment?.report
  const hasCompletedAssessment = Boolean(currentReport) || (reportHistory && reportHistory.length > 0)
  const riasecTop3 = currentReport?.overview?.riasec?.top3 || 'RIASEC'
  const confidenceScore = currentReport?.overview?.confidence?.score ?? 88

  // History list from reportHistory or currentReport
  const historyEntries = (reportHistory && reportHistory.length > 0)
    ? reportHistory
    : (currentReport ? [{
        id: currentReport.id || 'assessment-latest',
        title: 'Báo cáo định hướng cá nhân',
        createdAt: currentReport.generatedAt || new Date().toISOString(),
        report: currentReport,
      }] : [])

  const handleRetakeConfirm = () => {
    resetAssessment()
    setShowConfirmRetake(false)
    navigate('/assessment/riasec')
  }

  return (
    <main className="w-full flex-1 bg-surface font-['Be_Vietnam_Pro']">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-space-xl px-margin py-space-xl md:px-margin-md lg:px-margin-lg">
        {/* Khối hiển thị khi ĐÃ TỪNG LÀM BÀI KHẢO SÁT */}
        {hasCompletedAssessment && (
          <section className="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-[#eff6ff] via-white to-[#fff8eb] p-6 shadow-md md:p-8 space-y-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Bạn đã hoàn thành khảo sát và có kết quả định hướng</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#172033] sm:text-3xl">
                  Hồ sơ định hướng: Nhóm xu hướng {riasecTop3}
                </h2>
                <p className="max-w-2xl text-xs sm:text-sm text-[#56657a] leading-relaxed">
                  Hệ thống đã phân tích dựa trên câu trả lời sở thích Holland RIASEC, minh chứng hoạt động thực tế và điều kiện tuyển sinh của bạn (Độ tin cậy: {confidenceScore}%).
                </p>
                {currentReport?.generatedAt && (
                  <p className="text-[11px] font-semibold text-slate-500">
                    🕒 Lần đánh giá gần nhất: {new Date(currentReport.generatedAt).toLocaleString('vi-VN')}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/report"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#1d4ed8] px-5 py-3 text-xs sm:text-sm font-black text-white shadow-md hover:bg-[#1e40af] transition"
                >
                  <span className="material-symbols-outlined text-base">analytics</span>
                  <span>Xem báo cáo chi tiết →</span>
                </Link>

                <Link
                  to="/report/pdf"
                  className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#1d4ed8] shadow-xs hover:bg-blue-50 transition"
                >
                  <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                  <span>Bản xuất PDF</span>
                </Link>

                <button
                  onClick={() => setShowConfirmRetake(true)}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <span className="material-symbols-outlined text-base">replay</span>
                  <span>Làm lại khảo sát</span>
                </button>
              </div>
            </div>

            {/* Modal xác nhận làm lại bài khảo sát */}
            {showConfirmRetake && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/95 p-5 text-xs sm:text-sm text-rose-900 animate-in fade-in duration-150 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-base text-rose-700">
                  <span className="material-symbols-outlined text-xl">warning</span>
                  <span>Xác nhận làm lại bài khảo sát từ đầu?</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-rose-800">
                  Câu trả lời 30 câu Holland RIASEC và danh mục trải nghiệm hiện tại sẽ được khởi tạo lại để bạn bắt đầu lượt khảo sát mới. Báo cáo định hướng mới sẽ được tính toán lại theo câu trả lời mới của bạn.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleRetakeConfirm}
                    type="button"
                    className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-700 transition shadow-sm"
                  >
                    Đồng ý, làm lại từ đầu
                  </button>
                  <button
                    onClick={() => setShowConfirmRetake(false)}
                    type="button"
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Hủy bỏ, giữ kết quả hiện tại
                  </button>
                </div>
              </div>
            )}

            {/* Bảng Lịch sử các lần làm khảo sát */}
            {historyEntries.length > 0 && (
              <div className="pt-4 border-t border-blue-200/60">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1d4ed8] text-base">history</span>
                    <h3 className="text-sm font-bold text-[#172033]">Lịch sử làm khảo sát của bạn</h3>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {historyEntries.length} lần đánh giá
                  </span>
                </div>

                <div className="grid gap-2.5">
                  {historyEntries.map((entry, idx) => {
                    const top3 = entry.report?.overview?.riasec?.top3 || riasecTop3
                    const dateStr = entry.createdAt ? new Date(entry.createdAt).toLocaleString('vi-VN') : 'Gần đây'
                    return (
                      <div
                        key={entry.id || idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-blue-100 bg-white hover:border-blue-300 transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center font-black text-xs shrink-0">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {entry.title || 'Đánh giá định hướng Holland RIASEC & Năng lực'}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Thời gian: {dateStr} · Nhóm nổi bật: <strong className="text-[#1d4ed8]">{top3}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <Link
                            to="/report"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#1d4ed8] hover:underline px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                          >
                            <span>Xem lại kết quả</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Hero Section giới thiệu bài khảo sát */}
        <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high p-space-lg shadow-sm md:p-space-xl lg:p-space-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-fixed-dim/40 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-secondary-fixed/40 blur-[90px]"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-8">
              <div className="inline-flex items-center gap-space-xs self-start rounded-full bg-primary-container px-space-md py-1 font-label-sm text-label-sm uppercase tracking-wider text-on-primary shadow-sm">
                <span
                  className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>Personal Workspace · Đánh giá định hướng</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg-mobile font-bold tracking-tight text-on-surface sm:text-headline-lg">
                Cùng xây dựng hồ sơ định hướng của bạn
              </h1>

              <p className="max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                Bài đánh giá kết hợp sở thích nghề nghiệp, cách bạn học và làm việc cùng điều kiện học tập hiện tại để mang lại lộ trình đại học vừa vặn hơn với chính bạn.
              </p>

              <div className="flex flex-wrap items-center gap-x-space-lg gap-y-2 pt-space-xs font-label-md text-label-md text-on-surface">
                <AssessmentFact icon="schedule" label="Tổng thời gian" value="15–20 phút" />
                <AssessmentFact icon="cloud_done" label="Tự động lưu tiến độ" />
                <AssessmentFact icon="psychology" label="3 phần dữ liệu" />
              </div>
            </div>

            <div className="flex justify-center lg:col-span-4 lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 scale-95 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-105" />

                <div className="relative h-48 w-48 -rotate-1 overflow-hidden rounded-3xl bg-surface-container-lowest p-space-sm shadow-md transition-transform duration-300 group-hover:rotate-0 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface-container-low">
                    <img
                      src="/stitch-assets/uniview-mascot-rating-guide.jpg"
                      alt="Linh vật UniView đang đọc sách"
                      className="absolute left-0 top-0 w-[400%] max-w-none select-none"
                    />
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-surface-container px-space-sm py-1 font-label-sm text-label-sm text-on-surface shadow-sm">
                    <span
                      className="material-symbols-outlined text-xs text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      stars
                    </span>
                    <span>UniView Copilot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessment-roadmap-title" className="flex flex-col gap-space-md">
          <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
            <div>
              <p className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                Cấu trúc bài khảo sát
              </p>
              <h2 id="assessment-roadmap-title" className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">
                Bản đồ 3 bước đánh giá đa chiều
              </h2>
            </div>
            <p className="max-w-md font-body-sm text-body-sm text-on-surface-variant">
              Hoàn thành tuần tự để UniView đối chiếu giữa sở thích, ưu tiên và điều kiện thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {assessmentSteps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-lg shadow-sm"
              >
                <div>
                  <div className="mb-space-sm flex items-center justify-between">
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      {step.number}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ⏱ {step.duration}
                    </span>
                  </div>
                  <h3 className="mb-space-xs font-title-md text-title-md font-bold text-on-surface">
                    {step.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
                <div className="mt-space-md flex items-center justify-between border-t border-surface-container-high pt-space-sm text-xs font-semibold text-slate-500">
                  <span>{step.meta}</span>
                  <span className={step.modelClass}>{step.model}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-space-sm rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant sm:items-center">
          <span className="material-symbols-outlined shrink-0 text-lg text-emerald-600">
            verified_user
          </span>
          <p className="leading-normal">
            <strong>Bảo mật thông tin:</strong> Câu trả lời chỉ được sử dụng để tạo kết quả định hướng cá nhân của bạn và không được chia sẻ cho bên thứ ba.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-md pt-space-xs sm:flex-row">
          {hasCompletedAssessment ? (
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/report"
                className="group inline-flex items-center justify-center gap-space-xs rounded-full bg-primary-container px-space-xl py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg active:scale-[0.98]"
              >
                <span>Xem kết quả báo cáo của bạn</span>
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setShowConfirmRetake(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition"
              >
                <span className="material-symbols-outlined text-base">replay</span>
                <span>Làm lại khảo sát từ đầu</span>
              </button>
            </div>
          ) : (
            <Link
              to="/assessment/riasec"
              className="group inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-primary-container px-space-xl py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg active:scale-[0.98] sm:w-auto"
            >
              <span>Bắt đầu assessment (Bước 1)</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          )}

          <p className="text-center font-label-sm text-label-sm text-on-surface-variant sm:text-left">
            Tài khoản đã đăng nhập · Dữ liệu được bảo lưu an toàn trên thiết bị
          </p>

          <a
            href="#assessment-methodology"
            className="group flex items-center gap-1 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-base text-outline group-hover:text-primary">
              menu_book
            </span>
            <span className="underline underline-offset-4">
              Xem phương pháp làm bài
            </span>
          </a>
        </div>
      </div>
    </main>
  )
}

function AssessmentFact({ icon, label, value }) {
  return (
    <div className="flex items-center gap-space-xs">
      <span className="material-symbols-outlined text-primary-container">{icon}</span>
      <span>
        {label}
        {value && (
          <>
            : <strong>{value}</strong>
          </>
        )}
      </span>
    </div>
  )
}

export default AssessmentIntroPage
