import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AssessmentStepShell from '../components/assessment/AssessmentStepShell'
import { useAssessment } from '../context/AssessmentContext'
import { personalityTypeAssessment } from '../data/assessment'

function AssessmentPreferencesPage() {
  const navigate = useNavigate()
  const {
    assessment,
    setPersonalityAnswer,
  } = useAssessment()

  const questions =
    personalityTypeAssessment.questions

  const answeredCount = Object.values(
    assessment.personalityAnswers,
  ).filter(Boolean).length

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
    assessment.personalityAnswers[
      currentQuestion.id
    ]

  const progress =
    ((currentQuestionIndex + 1) /
      questions.length) *
    100

  const selectOption = (value, optionIndex) => {
    setPersonalityAnswer(
      currentQuestion.id,
      value,
      optionIndex + 1,
    )

    setValidationMessage('')
  }

  const goNext = () => {
    if (!currentAnswer) {
      setValidationMessage(
        'Bạn hãy chọn phương án A hoặc B trước khi tiếp tục.',
      )
      return
    }

    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {
      navigate('/assessment/experience')
      return
    }

    setCurrentQuestionIndex(
      (index) => index + 1,
    )
    setValidationMessage('')
  }

  const goPrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate('/assessment/riasec')
      return
    }

    setCurrentQuestionIndex(
      (index) => index - 1,
    )
    setValidationMessage('')
  }

  return (
    <AssessmentStepShell
      step={2}
      eyebrow="Phong cách tư duy & làm việc"
    >
      <div className="overflow-hidden">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-space-lg px-margin py-space-xl md:px-margin-md">
          <section className="flex flex-col gap-space-sm">
            <div className="flex flex-wrap items-center justify-between gap-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">
                Câu {currentQuestionIndex + 1} /
                {questions.length}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Đã tự động lưu {answeredCount} câu
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-surface-container-high bg-surface-container-lowest p-space-lg shadow-sm md:p-space-xl lg:p-space-2xl">
            <div className="mx-auto flex max-w-4xl flex-col gap-space-xl">
              <div className="flex flex-col gap-space-sm text-center">
                <div className="mx-auto inline-flex items-center gap-space-xs rounded-full bg-surface-container px-space-md py-1 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-base">
                    tune
                  </span>
                  Trục {currentQuestion.dimension}
                </div>

                <h1 className="font-headline-md text-headline-md font-bold leading-tight text-on-surface md:text-headline-lg">
                  {currentQuestion.prompt}
                </h1>

                <p className="font-body-md text-body-md text-on-surface-variant">
                  Chọn một trong hai phương án gần với cách bạn thường phản ứng nhất.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                {currentQuestion.options.map(
                  (option, index) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        selectOption(
                          option.value,
                          index,
                        )
                      }
                      aria-pressed={
                        currentAnswer === option.value
                      }
                      className={`rounded-2xl border p-space-lg transition-shadow ${
                        currentAnswer === option.value
                          ? 'border-primary bg-primary-fixed/30 shadow-md'
                          : 'border-surface-container-high bg-surface-container-low hover:border-primary'
                      }`}
                    >
                      <div className="mb-space-sm flex items-center gap-space-xs">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${
                            index === 0
                              ? 'bg-primary-fixed text-primary'
                              : 'bg-secondary-fixed text-secondary'
                          }`}
                        >
                          {index === 0 ? 'A' : 'B'}
                        </span>
                        <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
                          {index === 0
                            ? 'Thiên về cách 1'
                            : 'Thiên về cách 2'}
                        </span>
                      </div>
                      <p className="font-headline-sm text-headline-sm font-semibold leading-relaxed text-on-surface">
                        {option.label}
                      </p>
                    </button>
                  ),
                )}
              </div>

              <div
                aria-live="polite"
                className={`rounded-xl p-space-md ${
                  validationMessage
                    ? 'border border-error/20 bg-error-container text-on-error-container'
                    : 'bg-primary-fixed/35 text-on-surface'
                }`}
              >
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined mt-0.5 text-lg text-primary">
                    insights
                  </span>
                  <div>
                    <span className="font-label-md text-label-md font-bold">
                      {validationMessage
                        ? 'Chưa có lựa chọn'
                        : 'Phản hồi của UniView'}
                    </span>
                    <p className="mt-0.5 font-body-sm text-body-sm leading-relaxed">
                      {validationMessage ||
                        (currentAnswer
                          ? 'Lựa chọn đã được tự động lưu.'
                          : 'Chọn phương án A hoặc B gần với bạn hơn.')}
                    </p>
                  </div>
                </div>
              </div>

              <p className="rounded-xl bg-[#FFFBEB] p-space-md text-center font-body-sm text-body-sm text-[#594100]">
                Đây là chỉ báo phong cách kiểu MBTI do UniView xây dựng, không phải bài MBTI chính thức.
              </p>
            </div>
          </section>

          <div className="flex flex-col items-center justify-between gap-space-md sm:flex-row">
            <button
              type="button"
              onClick={goPrevious}
              className="inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-surface-container-high px-space-lg py-3 font-label-lg text-label-lg font-semibold text-on-surface transition-colors hover:bg-surface-container-highest sm:w-auto"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              {currentQuestionIndex === 0
                ? 'Quay lại Bước 1'
                : 'Câu trước'}
            </button>

            <button
              type="button"
              onClick={goNext}
              className="group inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-primary-container px-space-xl py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary sm:w-auto"
            >
              <span>
                {currentQuestionIndex ===
                questions.length - 1
                  ? 'Tiếp tục Bước 3'
                  : `Tiếp tục câu ${currentQuestionIndex + 2}`}
              </span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </AssessmentStepShell>
  )
}

export default AssessmentPreferencesPage
