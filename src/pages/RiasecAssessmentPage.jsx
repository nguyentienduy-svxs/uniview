import {
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import AssessmentStepShell from '../components/assessment/AssessmentStepShell'
import { useAssessment } from '../context/AssessmentContext'
import { riasecAssessment } from '../data/assessment'

const ratingOptions = [
  { value: 1, label: 'Không hứng thú' },
  { value: 2, label: 'Hơi ít hứng thú' },
  { value: 3, label: 'Bình thường' },
  { value: 4, label: 'Khá hứng thú' },
  { value: 5, label: 'Rất hứng thú' },
]

const domainHints = {
  R: 'Hãy nghĩ đến mức độ bạn muốn trực tiếp thao tác, lắp ráp hoặc tạo ra một sản phẩm hữu hình.',
  I: 'Hãy nghĩ đến lúc bạn phân tích dữ liệu, tìm nguyên nhân hoặc giải một vấn đề cần suy luận.',
  A: 'Hãy nghĩ đến mức độ bạn muốn sáng tạo nội dung, hình ảnh hoặc cách thể hiện mới.',
  S: 'Hãy nghĩ đến mức độ bạn muốn hỗ trợ, hướng dẫn hoặc giúp người khác tiến bộ.',
  E: 'Hãy nghĩ đến lúc bạn thuyết phục, dẫn dắt hoặc đưa một ý tưởng thành hành động.',
  C: 'Hãy nghĩ đến mức độ bạn thích sắp xếp thông tin và làm việc theo quy trình rõ ràng.',
}

const moodByRating = {
  1: {
    title: 'Không hứng thú',
    message:
      'Hoạt động này có vẻ không thu hút bạn. Mình đã ghi nhận rồi nhé.',
  },
  2: {
    title: 'Hơi ít hứng thú',
    message:
      'Bạn có một chút quan tâm, nhưng hoạt động này chưa thực sự hấp dẫn.',
  },
  3: {
    title: 'Cảm nhận trung tính',
    message:
      'Bạn chưa nghiêng rõ về thích hay không thích hoạt động này.',
  },
  4: {
    title: 'Khá hứng thú',
    message:
      'Hoạt động này có vẻ khá hợp với sở thích của bạn.',
  },
  5: {
    title: 'Rất hứng thú!',
    message:
      'Bạn thể hiện mức hứng thú cao với hoạt động này.',
  },
}

function RiasecAssessmentPage() {
  const navigate = useNavigate()
  const {
    assessment,
    setRiasecAnswer,
  } = useAssessment()

  const questions = riasecAssessment.questions
  const answeredCount = Object.keys(
    assessment.riasecAnswers,
  ).length

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(
      Math.min(
        answeredCount,
        questions.length - 1,
      ),
    )

  const [validationMessage, setValidationMessage] =
    useState('')

  const currentQuestion =
    questions[currentQuestionIndex]

  const currentAnswer =
    assessment.riasecAnswers[
      currentQuestion.id
    ]

  const progress =
    ((currentQuestionIndex + 1) /
      questions.length) *
    100

  const selectedMood =
    moodByRating[currentAnswer]

  const selectRating = (value) => {
    setRiasecAnswer(
      currentQuestion.id,
      value,
    )
    setValidationMessage('')
  }

  const goNext = () => {
    if (!currentAnswer) {
      setValidationMessage(
        'Bạn hãy chọn một mức độ trước khi tiếp tục.',
      )
      return
    }

    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {
      navigate('/assessment/preferences')
      return
    }

    setCurrentQuestionIndex(
      (index) => index + 1,
    )
    setValidationMessage('')
  }

  const goPrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate('/assessment')
      return
    }

    setCurrentQuestionIndex(
      (index) => index - 1,
    )
    setValidationMessage('')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const rating = Number(event.key)

      if (rating >= 1 && rating <= 5) {
        selectRating(rating)
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  })

  return (
    <AssessmentStepShell
      step={1}
      eyebrow="Sở thích nghề nghiệp RIASEC"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-secondary-container/30 blur-3xl" />
        <div className="pointer-events-none absolute right-12 top-48 h-80 w-80 rounded-full bg-tertiary-fixed/25 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col gap-space-lg px-margin py-space-xl md:px-margin-md lg:px-gutter-lg">
          <section className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between gap-space-md">
              <span className="font-label-md text-label-md text-on-surface-variant">
                Tiến độ câu hỏi
              </span>
              <span className="font-label-md text-label-md text-secondary">
                <strong className="font-headline-sm text-headline-sm text-primary">
                  {String(
                    currentQuestionIndex + 1,
                  ).padStart(2, '0')}
                </strong>{' '}
                / {questions.length}
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-surface-container shadow-inner">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-base text-tertiary">
                  check_circle
                </span>
                Đã tự động lưu {answeredCount}/
                {questions.length} câu
              </span>
              <span>
                Có thể dùng phím 1–5 để trả lời nhanh
              </span>
            </div>
          </section>

          <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
            <section className="flex flex-col gap-space-lg lg:col-span-7">
              <div className="flex flex-col gap-space-lg rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm md:p-space-xl">
                <div className="flex flex-wrap items-center justify-between gap-space-xs">
                  <div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold uppercase tracking-wider text-primary">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high font-bold">
                      {currentQuestionIndex + 1}
                    </span>
                    Khảo sát xu hướng hoạt động
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    Nhóm {currentQuestion.domain}
                  </span>
                </div>

                <div className="flex flex-col gap-space-sm">
                  <h1 className="font-headline-md text-headline-md font-bold leading-tight text-on-surface md:text-headline-lg">
                    Bạn cảm thấy hứng thú ở mức nào với hoạt động sau?
                  </h1>

                  <div className="rounded-2xl bg-surface-container-low p-space-md shadow-sm md:p-space-lg">
                    <p className="font-headline-sm text-headline-sm font-semibold leading-relaxed text-on-surface">
                      “{currentQuestion.text}”
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm rounded-xl border border-blue-100 bg-primary-fixed/35 p-space-md">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                    <span className="material-symbols-outlined text-xl">
                      lightbulb
                    </span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md font-bold text-primary">
                      Gợi ý suy nghĩ
                    </span>
                    <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                      {
                        domainHints[
                          currentQuestion.domain
                        ]
                      }
                    </p>
                  </div>
                </div>

                <fieldset className="flex flex-col gap-space-sm">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <legend className="font-label-md text-label-md font-semibold uppercase tracking-wider text-on-surface">
                      Mức độ hứng thú của bạn
                    </legend>
                    <span
                      className={`font-label-sm text-label-sm font-semibold ${validationMessage ? 'text-error' : 'text-primary'}`}
                    >
                      {validationMessage ||
                        (currentAnswer
                          ? `Đã chọn mức ${currentAnswer}/5`
                          : 'Chưa chọn')}
                    </span>
                  </div>

                  <div
                    className="grid grid-cols-1 gap-space-xs sm:grid-cols-5"
                    role="radiogroup"
                    aria-label="Mức độ hứng thú"
                  >
                    {ratingOptions.map((option) => {
                      const selected =
                        currentAnswer ===
                        option.value

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() =>
                            selectRating(
                              option.value,
                            )
                          }
                          className={`group flex min-h-32 flex-col items-center justify-between gap-2 rounded-xl border p-space-sm py-4 text-center transition-all duration-200 ${
                            selected
                              ? 'border-primary bg-primary-fixed/55 text-primary shadow-md ring-2 ring-primary'
                              : 'border-transparent bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-headline-sm text-headline-sm ${
                              selected
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-container-highest text-secondary'
                            }`}
                          >
                            {option.value}
                          </span>
                          <span className="font-label-sm text-label-sm font-semibold leading-tight">
                            {option.label}
                          </span>
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full ${
                              selected
                                ? 'bg-primary text-on-primary'
                                : 'border border-outline-variant'
                            }`}
                          >
                            {selected && (
                              <span className="material-symbols-outlined text-xs">
                                check
                              </span>
                            )}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-outline">
                    verified
                  </span>
                  Không có câu trả lời đúng hay sai.
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-space-md sm:flex-row">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-surface-container-high px-7 py-3 font-label-lg text-label-lg text-on-surface transition-colors hover:bg-surface-container-highest sm:w-auto"
                >
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>
                  {currentQuestionIndex === 0
                    ? 'Về trang giới thiệu'
                    : 'Câu trước'}
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="group inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-primary px-8 py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary-container sm:w-auto"
                >
                  <span>
                    {currentQuestionIndex ===
                    questions.length - 1
                      ? 'Hoàn thành Bước 1'
                      : `Tiếp tục câu ${String(
                          currentQuestionIndex + 2,
                        ).padStart(2, '0')}`}
                  </span>
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </section>

            <aside className="flex flex-col gap-space-md lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
                <div className="relative z-10 flex items-center justify-between gap-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                    <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">
                      Bạn đồng hành UniView
                    </span>
                  </div>
                  <span className="rounded-full bg-primary-fixed/50 px-3 py-1 font-label-sm text-label-sm font-bold text-primary">
                    {selectedMood?.title ??
                      'Chờ phản hồi'}
                  </span>
                </div>

                <div className="mt-space-md flex flex-col items-center justify-center rounded-2xl bg-surface-container-low py-space-lg">
                  <MascotSprite
                    rating={currentAnswer ?? 0}
                  />
                  <div className="mt-space-sm max-w-[340px] rounded-xl border border-surface-container-high bg-white p-space-sm text-center shadow-sm">
                    <p className="font-body-sm text-body-sm font-medium leading-snug text-on-surface">
                      “
                      {selectedMood?.message ??
                        'Hãy chọn mức độ hứng thú thật nhất của bạn để mình ghi nhận nhé.'}
                      ”
                    </p>
                  </div>
                </div>

                <div className="mt-space-md flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
                    Mẹo trả lời
                  </span>
                  {[
                    'Chọn theo điều bạn thực sự muốn làm.',
                    'Đừng chọn theo điều người khác mong đợi.',
                    'Phản hồi đầu tiên thường gần với bạn nhất.',
                  ].map((tip) => (
                    <div
                      key={tip}
                      className="flex items-start gap-2 rounded-lg bg-surface-container-low p-2.5"
                    >
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-primary">
                        check_small
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface">
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AssessmentStepShell>
  )
}

function MascotSprite({ rating }) {
  const positions = {
    0: [0, 0],
    1: [1, 0],
    2: [3, 1],
    3: [2, 0],
    4: [3, 0],
    5: [0, 1],
  }

  const [column, row] =
    positions[rating] ?? positions[0]

  return (
    <div className="relative h-44 w-44 overflow-hidden rounded-2xl bg-white shadow-sm">
      <img
        src="/stitch-assets/uniview-mascot-rating-guide.jpg"
        alt="Linh vật UniView"
        className="pointer-events-none absolute w-[400%] max-w-none select-none transition-all duration-200"
        style={{
          left: `${column * -100}%`,
          top: `${row * -100}%`,
        }}
      />
    </div>
  )
}

export default RiasecAssessmentPage
