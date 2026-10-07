import { Link } from 'react-router-dom'

import { ENTITLEMENTS } from '../data/user'
import { useAuth } from '../context/AuthContext'

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
    duration: '~8 phút',
    title: 'Cách học & điều bạn ưu tiên',
    description:
      'Nhận diện phong cách học tập, môi trường làm việc và những tiêu chí bạn coi trọng mà không gán nhãn cứng nhắc.',
    meta: 'Ưu tiên cá nhân',
    model: 'Phong cách học tập',
    dotClass: 'bg-rose-500',
    modelClass: 'text-secondary',
  },
  {
    number: '03',
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
    number: '04',
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
  const {
    user,
    admissionSeason,
    isAuthenticated,
    hasEntitlement,
  } = useAuth()

  const hasAdmissionPass = hasEntitlement(
    ENTITLEMENTS.ADMISSION_PASS,
  )

  const hasDirectionSnapshot =
    hasAdmissionPass ||
    hasEntitlement(
      ENTITLEMENTS.DIRECTION_SNAPSHOT,
    )

  let planLabel = 'Gói Free'

  if (hasDirectionSnapshot) {
    planLabel = 'Direction Snapshot'
  }

  if (hasAdmissionPass) {
    planLabel = admissionSeason
      ? `Admission Pass ${admissionSeason}`
      : 'Admission Pass'
  }

  if (!isAuthenticated) {
    planLabel = 'Chưa đăng nhập'
  }

  return (
    <main className="w-full flex-1 bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-space-xl px-margin py-space-xl md:px-margin-md lg:px-margin-lg">
        

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
                  style={{
                    fontVariationSettings:
                      "'FILL' 1",
                  }}
                >
                  verified
                </span>
                <span>
                  Direction Snapshot 59K · Đánh giá định hướng
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg-mobile font-bold tracking-tight text-on-surface sm:text-headline-lg">
                Cùng xây dựng hồ sơ định hướng của bạn
              </h1>

              <p className="max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                Bài đánh giá kết hợp sở thích nghề nghiệp,
                cách bạn học và làm việc cùng điều kiện học
                tập hiện tại để mang lại lộ trình đại học
                vừa vặn hơn với chính bạn.
              </p>

              <div className="flex flex-wrap items-center gap-x-space-lg gap-y-2 pt-space-xs font-label-md text-label-md text-on-surface">
                <AssessmentFact
                  icon="schedule"
                  label="Tổng thời gian"
                  value="15–20 phút"
                />
                <AssessmentFact
                  icon="cloud_done"
                  label="Tự động lưu tiến độ"
                />
                <AssessmentFact
                  icon="psychology"
                  label="4 phần phân tích"
                />
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
                      style={{
                        fontVariationSettings:
                          "'FILL' 1",
                      }}
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

        <section
          aria-labelledby="assessment-roadmap-title"
          className="flex flex-col gap-space-md"
        >
          <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
            <div>
              <p className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                Cấu trúc bài khảo sát
              </p>
              <h2
                id="assessment-roadmap-title"
                className="font-headline-md text-headline-md text-on-surface"
              >
                Bản đồ 4 bước đánh giá đa chiều
              </h2>
            </div>

            <p className="max-w-sm font-body-sm text-body-sm text-on-surface-variant">
              Hoàn thành tuần tự để UniView đối chiếu
              giữa sở thích, ưu tiên và điều kiện thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-4">
            {assessmentSteps.map((step, index) => (
              <article
                key={step.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-label-md text-label-md font-bold ${
                        index === 0
                          ? 'bg-primary-container text-on-primary'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {step.number}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-space-sm py-0.5 font-label-sm text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">
                        timer
                      </span>
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>

                  <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                    {step.description}
                  </p>
                </div>

                <div className="mt-space-lg flex items-center justify-between border-t border-surface-container pt-space-md font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span
                      className={`h-2 w-2 rounded-full ${step.dotClass}`}
                    />
                    {step.meta}
                  </span>

                  <span
                    className={`font-semibold ${step.modelClass}`}
                  >
                    {step.model}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="assessment-methodology"
          className="flex w-full flex-col items-start gap-space-md rounded-2xl bg-surface-container-low p-space-lg sm:flex-row"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary">
            <span className="material-symbols-outlined text-xl">
              lightbulb
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-space-xs">
            <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
              Nguyên tắc làm bài hiệu quả nhất
            </h2>
            <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
              Không có câu trả lời đúng hoặc sai. Hãy chọn
              phương án gần với bạn nhất trong phần lớn tình
              huống hằng ngày, thay vì phương án bạn cho rằng
              mình “nên chọn”, để kết quả phản ánh chân thực
              nhất.
            </p>
          </div>
        </section>

        <div className="flex items-start gap-space-sm rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant sm:items-center">
          <span className="material-symbols-outlined shrink-0 text-lg text-emerald-600">
            verified_user
          </span>
          <p className="leading-normal">
            <strong>Bảo mật thông tin:</strong> Câu trả lời
            chỉ được sử dụng để tạo kết quả định hướng cá
            nhân của bạn và không được chia sẻ cho bên thứ ba.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-md pt-space-xs sm:flex-row">
          <Link
            to={isAuthenticated ? '/assessment/riasec' : '/login?next=/assessment/riasec'}
            className="group inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-primary-container px-space-xl py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg active:scale-[0.98] sm:w-auto"
          >
            <span>{isAuthenticated ? 'Bắt đầu assessment (Bước 1)' : 'Đăng nhập để bắt đầu'}</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>

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

function AssessmentFact({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-space-xs">
      <span className="material-symbols-outlined text-primary-container">
        {icon}
      </span>
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
