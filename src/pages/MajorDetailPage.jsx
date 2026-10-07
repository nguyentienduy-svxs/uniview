import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import majorDetails from '../data/majorDetails.json'
import majors from '../data/majors.json'

const DEFAULT_MAJOR_ID = '7480103'

const accentStyles = [
  'bg-blue-100 text-[#1D4ED8]',
  'bg-indigo-100 text-indigo-700',
  'bg-rose-100 text-[#E11D48]',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-800',
]

const careerBadgeStyles = [
  'border border-blue-100 bg-blue-50 text-[#1D4ED8]',
  'border border-rose-100 bg-rose-50 text-[#E11D48]',
  'bg-slate-100 text-slate-700',
  'bg-slate-100 text-slate-700',
  'border border-amber-100 bg-amber-50 text-amber-800',
]

function MaterialIcon({ children, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  )
}

function SectionHeading({ eyebrow, title, description, accent = 'text-[#1D4ED8]' }) {
  return (
    <div className="mb-6 space-y-2">
      <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${accent}`}>
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-bold text-[#172033] sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-base leading-relaxed text-slate-600">{description}</p>
    </div>
  )
}

function MajorDetailPage() {
  const [searchParams] = useSearchParams()
  const [savedMajorIds, setSavedMajorIds] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quickCheckSteps, setQuickCheckSteps] = useState({})
  const [completedQuickChecks, setCompletedQuickChecks] = useState([])
  const [universityFilters, setUniversityFilters] = useState({})

  const requestedMajorId = searchParams.get('majorId') ?? DEFAULT_MAJOR_ID

  const detail = useMemo(
    () => majorDetails.find((item) => item.id === requestedMajorId)
      ?? majorDetails.find((item) => item.id === DEFAULT_MAJOR_ID),
    [requestedMajorId],
  )

  const major = useMemo(() => {
    const summary = majors.find((item) => item.id === detail.id)
    return { ...summary, ...detail }
  }, [detail])

  useEffect(() => {
    document.title = `${major.name} | UniView`
  }, [major.name])

  const isSaved = savedMajorIds.includes(major.id)
  const quickCheckQuestions = major.quickCheck.questions
  const currentQuestionIndex = Math.min(
    quickCheckSteps[major.id] ?? 0,
    quickCheckQuestions.length - 1,
  )
  const currentQuestion = quickCheckQuestions[currentQuestionIndex]
  const majorAnswers = selectedAnswers[major.id] ?? {}
  const getAnswerId = (question) =>
    Object.prototype.hasOwnProperty.call(majorAnswers, question.id)
      ? majorAnswers[question.id]
      : question.selectedOptionId
  const selectedOptionId = getAnswerId(currentQuestion)
  const isQuickCheckComplete = completedQuickChecks.includes(major.id)
  const quickCheckScore = quickCheckQuestions.reduce((total, question) => {
    const answerId = getAnswerId(question)
    const selectedOption = question.options.find((option) => option.id === answerId)
    return total + (selectedOption?.score ?? 0)
  }, 0)
  const maxQuickCheckScore = quickCheckQuestions.length * 3
  const quickCheckPercentage = Math.round(
    (quickCheckScore / maxQuickCheckScore) * 100,
  )
  const quickCheckResult = quickCheckPercentage >= 80
    ? {
        title: 'Mức độ hứng thú cao',
        description: `Các lựa chọn của bạn cho thấy nhiều điểm tương thích tự nhiên với ngành ${major.name}. Hãy tiếp tục đối chiếu chương trình học và trường đào tạo.`,
      }
    : quickCheckPercentage >= 55
      ? {
          title: 'Có tiềm năng phù hợp',
          description: `Bạn có một số điểm hứng thú với ngành ${major.name}. Trải nghiệm thêm hoạt động thực tế sẽ giúp bạn đưa ra kết luận rõ hơn.`,
        }
      : {
          title: 'Nên khám phá thêm',
          description: `Mức độ hứng thú hiện tại chưa cao. Bạn có thể xem các ngành gần với ${major.name} để tìm lựa chọn phù hợp hơn.`,
        }
  const defaultUniversityFilter = major.universities.items.some(
    (university) => university.regionId === 'ho-chi-minh-city',
  )
    ? 'ho-chi-minh-city'
    : 'all'
  const activeUniversityFilter = universityFilters[major.id] ?? defaultUniversityFilter
  const visibleUniversities = major.universities.items.filter((university) =>
    activeUniversityFilter === 'all'
      || university.regionId === activeUniversityFilter
      || university.ownershipId === activeUniversityFilter,
  )

  const toggleSaved = () => {
    setSavedMajorIds((currentIds) => currentIds.includes(major.id)
      ? currentIds.filter((id) => id !== major.id)
      : [...currentIds, major.id])
  }

  const selectQuickCheckAnswer = (optionId) => {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [major.id]: {
        ...(currentAnswers[major.id] ?? {}),
        [currentQuestion.id]: optionId,
      },
    }))
  }

  const handlePreviousQuestion = () => {
    setQuickCheckSteps((currentSteps) => ({
      ...currentSteps,
      [major.id]: Math.max(0, currentQuestionIndex - 1),
    }))
  }

  const handleNextQuestion = () => {
    if (!selectedOptionId) return

    if (currentQuestionIndex < quickCheckQuestions.length - 1) {
      setQuickCheckSteps((currentSteps) => ({
        ...currentSteps,
        [major.id]: currentQuestionIndex + 1,
      }))
      return
    }

    setCompletedQuickChecks((currentIds) =>
      currentIds.includes(major.id) ? currentIds : [...currentIds, major.id],
    )
  }

  const restartQuickCheck = () => {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [major.id]: Object.fromEntries(
        quickCheckQuestions.map((question) => [question.id, null]),
      ),
    }))
    setQuickCheckSteps((currentSteps) => ({
      ...currentSteps,
      [major.id]: 0,
    }))
    setCompletedQuickChecks((currentIds) =>
      currentIds.filter((id) => id !== major.id),
    )
  }

  return (
    <main className="w-full flex-1 bg-[#FFFDFB]" data-major-id={major.id}>
      <div className="sticky top-[74px] z-40 h-1 w-full bg-slate-200/80">
        <div className="h-full w-1/6 bg-[#1D4ED8] transition-all duration-300" />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-2 text-[13px] font-medium text-slate-500">
          <a className="flex items-center gap-1.5 transition-colors hover:text-[#1D4ED8]" data-path="landing-page" href="#">
            <MaterialIcon className="text-[16px]">home</MaterialIcon>
            <span>Trang chủ</span>
          </a>
          <span className="text-slate-300">/</span>
          <a className="transition-colors hover:text-[#1D4ED8]" data-path="kham-pha-nganh" href="#">Khám phá ngành</a>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600">{major.category.name}</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-[#1D4ED8]">{major.name}</span>
        </nav>

        <section className="mt-4 pb-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-[#1D4ED8] shadow-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#1D4ED8]" />
                <span>MÃ NGÀNH: {major.code} · NHÓM {major.category.name.toUpperCase()}</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-5xl lg:text-[52px]">
                  {major.name}
                </h1>
                {major.englishName && (
                  <p className="text-xl font-normal text-slate-500 sm:text-2xl">{major.englishName}</p>
                )}
              </div>

              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{major.summary}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1e40af] hover:shadow-md" href="#section-universities">
                  <span>Xem trường đào tạo</span>
                  <MaterialIcon className="text-[18px]">arrow_downward</MaterialIcon>
                </a>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#FFE4E6] px-5 py-2.5 text-sm font-semibold text-[#E11D48] transition-all hover:bg-[#FB7185] hover:text-white" onClick={(event) => { event.stopPropagation(); toggleSaved() }} type="button">
                  <MaterialIcon className="text-[18px]">{isSaved ? 'favorite' : 'favorite_border'}</MaterialIcon>
                  <span>{isSaved ? 'Đã lưu ngành' : 'Lưu ngành'}</span>
                </button>
                <a className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-[#172033] transition-colors hover:bg-slate-200" href="#section-quick-check">
                  <MaterialIcon className="text-[18px] text-amber-500">bolt</MaterialIcon>
                  <span>Làm Quick Self Check ({major.quickCheck.durationMinutes} phút)</span>
                </a>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 p-6 shadow-sm">
                <div className="relative space-y-3 rounded-xl border border-slate-700/50 bg-[#172033] p-5 font-mono text-[13px] leading-relaxed text-slate-100 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] tracking-wider text-slate-400">{major.heroPreview.fileName}</span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-rose-400">interface</span> <span className="font-semibold text-amber-300">{major.heroPreview.interfaceName}</span> {'{'}</p>
                    {major.heroPreview.properties.map((property) => (
                      <p className="pl-4" key={property.name}>
                        {property.name}: <span className="text-blue-300">{typeof property.value === 'string' ? `'${property.value}'` : String(property.value)}</span>;
                      </p>
                    ))}
                    <p>{'}'}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3 text-[#172033] shadow-sm">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#1D4ED8]">
                        <MaterialIcon className="text-[18px]">sync_alt</MaterialIcon>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#172033]">{major.heroPreview.command}</p>
                        <p className="truncate text-[11px] text-slate-500">{major.heroPreview.status}</p>
                      </div>
                    </div>
                    <MaterialIcon className="text-[20px] text-emerald-500">check_circle</MaterialIcon>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-3.5 py-1.5 text-[#172033] shadow-md backdrop-blur-sm">
                  <span className="h-2 w-2 shrink-0 animate-ping rounded-full bg-emerald-500" />
                  <span className="truncate text-xs font-semibold text-slate-700">{major.market.demandGrowthLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 shadow-xs">
            <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
              {[
                ['Nhóm ngành', major.category.name, 'text-[#172033]'],
                ['Thời gian đào tạo', major.market.trainingDuration, 'text-[#172033]'],
                ['Bằng cấp tốt nghiệp', major.market.degree, 'text-[#172033]'],
                ['Trường có dữ liệu', `${major.market.universityCount} đại học VN`, 'text-[#1D4ED8]'],
                ['Điểm sàn tham chiếu', major.market.referenceScore.label, 'text-[#E11D48]'],
              ].map(([label, value, color], index) => (
                <div className={`space-y-0.5 ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`} key={label}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
                  <p className={`text-base font-bold leading-snug sm:text-lg ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="sticky top-[78px] z-30 mb-8 rounded-xl border-y border-slate-200/60 bg-[#FFFDFB]/95 py-2.5 shadow-xs backdrop-blur-md">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-2 text-sm font-medium text-slate-600">
            {[
              ['section-overview', '1. Tổng quan'],
              ['section-curriculum', '2. Bạn sẽ học gì'],
              ['section-activities', '3. Hoạt động thực tế'],
              ['section-careers', '4. Bản đồ nghề nghiệp'],
              ['section-quick-check', '5. Quick Self Check'],
              ['section-related', '6. Ngành gần'],
              ['section-universities', `7. Trường đào tạo (${major.market.universityCount})`],
            ].map(([id, label], index) => (
              <a className={`whitespace-nowrap rounded-full px-4 py-1.5 transition-colors ${index === 0 ? 'bg-blue-50 font-semibold text-[#1D4ED8]' : 'hover:bg-slate-100 hover:text-[#172033]'}`} href={`#${id}`} key={id}>{label}</a>
            ))}
          </div>
        </nav>

        <section className="mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-rose-50/40 p-5 shadow-xs sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-amber-500 shadow-xs">
                <MaterialIcon className="text-[22px]">star</MaterialIcon>
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">{major.personalization.eyebrow}</span>
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500">{major.personalization.badge}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{major.personalization.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-overview">
          <SectionHeading {...major.overview} />
          <div className={`grid grid-cols-1 gap-4 ${major.overview.steps.length >= 5 ? 'md:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {major.overview.steps.map((step, index) => (
              <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors hover:border-blue-200" key={step.id}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${accentStyles[index % accentStyles.length]}`}>{step.order}</div>
                <h3 className="text-base font-bold text-[#172033]">{step.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-curriculum">
          <SectionHeading {...major.curriculum} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {major.curriculum.topics.map((topic, index) => (
              <div className={`space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-blue-200 hover:shadow-md ${major.curriculum.topics.length % 3 === 2 && index === major.curriculum.topics.length - 1 ? 'lg:col-span-2' : ''}`} key={topic.id}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentStyles[index % accentStyles.length]}`}>
                  <MaterialIcon className="text-[24px]">{topic.icon}</MaterialIcon>
                </div>
                <h3 className="text-lg font-bold text-[#172033]">{topic.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{topic.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {topic.tags.filter(Boolean).map((tag, tagIndex) => (
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700" key={`${topic.id}-${tag}-${tagIndex}`}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-activities">
          <SectionHeading {...major.activities} accent="text-[#E11D48]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {major.activities.items.map((activity, index) => (
              <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md" key={activity.id}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[index % accentStyles.length]}`}>
                  <MaterialIcon className="text-[22px]">{activity.icon}</MaterialIcon>
                </div>
                <h3 className="text-base font-bold text-[#172033]">{activity.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 sm:p-8">
            <SectionHeading {...major.selfObservation} />
            <div className="flex flex-wrap gap-2.5">
              {major.selfObservation.signals.map((signal, index) => (
                <div className="flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#172033] shadow-xs transition-all hover:border-blue-300 hover:bg-blue-50/50" key={signal}>
                  <MaterialIcon className={`text-[18px] ${index % 2 === 0 ? 'text-[#1D4ED8]' : 'text-[#E11D48]'}`}>{['visibility', 'extension', 'settings', 'task_alt', 'work', 'palette'][index % 6]}</MaterialIcon>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-careers">
          <SectionHeading {...major.careers} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {major.careers.items.map((career, index) => (
              <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md" key={career.id}>
                <div className="space-y-2">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${careerBadgeStyles[index % careerBadgeStyles.length]}`}>{career.badge}</span>
                  <h3 className="pt-1 text-lg font-bold text-[#172033]">{career.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{career.description}</p>
                </div>
                <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:underline" href="#">
                  <span>Tìm hiểu vai trò</span>
                  <MaterialIcon className="text-[18px]">arrow_forward</MaterialIcon>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-quick-check">
          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#1D4ED8]">
                  <MaterialIcon className="text-[16px]">bolt</MaterialIcon>
                  <span>ĐÁNH GIÁ NHANH ({major.quickCheck.durationMinutes} PHÚT)</span>
                </div>
                <h2 className="text-2xl font-bold text-[#172033] sm:text-3xl">{major.quickCheck.title}</h2>
                <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{major.quickCheck.description}</p>
              </div>
              <div className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-xs">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Tiến độ</span>
                <p className="text-lg font-bold text-[#1D4ED8]">
                  {isQuickCheckComplete
                    ? 'Đã hoàn thành'
                    : `Câu hỏi ${currentQuestionIndex + 1} / ${quickCheckQuestions.length}`}
                </p>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {isQuickCheckComplete ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <MaterialIcon className="text-[30px]">task_alt</MaterialIcon>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Kết quả tham khảo</span>
                    <h3 className="text-2xl font-bold text-[#172033]">{quickCheckResult.title}</h3>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{quickCheckResult.description}</p>
                  </div>
                  <div className="mx-auto max-w-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Mức độ hứng thú</span>
                      <span className="text-[#1D4ED8]">{quickCheckPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[#1D4ED8] transition-all" style={{ width: `${quickCheckPercentage}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                    <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100" onClick={restartQuickCheck} type="button">Làm lại</button>
                    <a className="rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#1e40af]" href="#section-related">Xem các ngành gần</a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Tình huống giả định:</span>
                    <p className="text-lg font-bold leading-snug text-[#172033] sm:text-xl">“{currentQuestion.prompt}”</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = option.id === selectedOptionId
                      return (
                        <button className={`space-y-2 rounded-2xl border-2 p-5 text-left shadow-xs transition-all ${isSelected ? 'border-[#1D4ED8] bg-blue-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`} key={option.id} onClick={() => selectQuickCheckAnswer(option.id)} type="button">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isSelected ? 'bg-[#1D4ED8] text-white' : 'bg-slate-100 text-slate-700'}`}>{option.label}</div>
                          <p className="text-sm font-semibold leading-relaxed text-[#172033]">{option.text}</p>
                          <span className={`inline-block text-xs ${isSelected ? 'font-bold text-[#1D4ED8]' : 'font-medium text-slate-400'}`}>{isSelected ? 'Đang chọn' : 'Nhấn để chọn'}</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
                    <p className="text-xs text-slate-500 sm:text-sm">{major.quickCheck.resultHint}</p>
                    <div className="flex items-center gap-3">
                      <button className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" disabled={currentQuestionIndex === 0} onClick={handlePreviousQuestion} type="button">Quay lại</button>
                      <button className="rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-40" disabled={!selectedOptionId} onClick={handleNextQuestion} type="button">
                        {currentQuestionIndex === quickCheckQuestions.length - 1 ? 'Xem kết quả' : 'Tiếp tục'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-related">
          <SectionHeading eyebrow="Tránh nhầm lẫn" title={`Các ngành gần với ${major.name}`} description={`Đối chiếu ${major.name} với các ngành cùng nhóm để nhìn rõ khác biệt về trọng tâm học tập và hướng nghề nghiệp.`} accent="text-slate-400" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {major.relatedMajors.map((related, index) => (
              <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md" key={related.id}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mã: {related.code}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentStyles[index % accentStyles.length]}`}>
                      <MaterialIcon className="text-[18px]">compare_arrows</MaterialIcon>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172033]">{related.name}</h3>
                    {related.englishName && <p className="text-xs font-medium text-slate-500">{related.englishName}</p>}
                  </div>
                  <div className="space-y-1 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <p className="text-xs font-bold text-[#1D4ED8]">Khác ở điểm nào?</p>
                    <p className="text-xs leading-relaxed text-slate-600">{related.difference}</p>
                  </div>
                </div>
                <a className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#1D4ED8] hover:underline" href={`/majors/software-engineering?majorId=${related.id}`}>
                  <span>Xem chi tiết ngành</span>
                  <MaterialIcon className="text-[18px]">arrow_forward</MaterialIcon>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-universities">
          <SectionHeading eyebrow="Dữ liệu trường học" title={major.universities.title} description={major.universities.description} />
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {major.universities.filters.map((filter) => (
              <button className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${filter.id === activeUniversityFilter ? 'bg-[#1D4ED8] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} key={filter.id} onClick={() => setUniversityFilters((current) => ({ ...current, [major.id]: filter.id }))} type="button">{filter.label}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleUniversities.map((university) => (
              <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md" key={university.id}>
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img alt={university.fullName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={university.image} />
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#172033] shadow-xs backdrop-blur-md">{university.badge}</div>
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="space-y-0.5">
                      <h3 className="line-clamp-1 text-base font-bold text-[#172033]">{university.name}</h3>
                      <p className="text-xs text-slate-500">{university.location}</p>
                    </div>
                    <div className="space-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs">
                      {university.details.map((item, index) => (
                        <div className="flex items-center justify-between gap-3" key={item.label}>
                          <span className="text-slate-500">{item.label}:</span>
                          <span className={`truncate text-right font-semibold ${index === 1 ? 'text-[#E11D48]' : index === 2 ? 'text-[#1D4ED8]' : 'text-slate-800'}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 p-5 pt-4">
                  <a className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:underline" href="#"><span>Chi tiết trường</span><MaterialIcon className="text-[16px]">arrow_forward</MaterialIcon></a>
                  <div className="flex items-center gap-1.5">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-rose-50 hover:text-[#E11D48]" title="Lưu trường" type="button"><MaterialIcon className="text-[18px]">favorite_border</MaterialIcon></button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-blue-50 hover:text-[#1D4ED8]" title="So sánh trường" type="button"><MaterialIcon className="text-[18px]">compare_arrows</MaterialIcon></button>
                  </div>
                </div>
              </div>
            ))}

            {visibleUniversities.length === 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs md:col-span-2 lg:col-span-3">
                <MaterialIcon className="text-[34px] text-slate-400">school</MaterialIcon>
                <p className="mt-2 font-semibold text-[#172033]">Chưa có dữ liệu chi tiết theo bộ lọc này</p>
                <p className="mt-1 text-sm text-slate-500">UniView hiện ghi nhận {major.market.universityCount} trường đào tạo ngành này.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-14">
          <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50/60 via-slate-50 to-rose-50/60 p-8 shadow-xs sm:p-10 md:flex-row">
            <div className="max-w-xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48]">{major.callToAction.eyebrow}</span>
              <h2 className="text-2xl font-bold text-[#172033] sm:text-3xl">{major.callToAction.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{major.callToAction.description}</p>
            </div>
            <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFE4E6] px-5 py-3 text-sm font-semibold text-[#E11D48] transition-all hover:bg-[#FB7185] hover:text-white sm:w-auto" onClick={(event) => { event.stopPropagation(); toggleSaved() }} type="button">
                <MaterialIcon className="text-[18px]">{isSaved ? 'favorite' : 'favorite_border'}</MaterialIcon>
                <span>{isSaved ? 'Đã lưu vào hồ sơ' : major.callToAction.secondaryLabel}</span>
              </button>
              <a className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1e40af] sm:w-auto" href="#section-universities">
                <span>{major.callToAction.primaryLabel}</span>
                <MaterialIcon className="text-[18px]">arrow_forward</MaterialIcon>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default MajorDetailPage
