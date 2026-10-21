import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import majorDetails from '../data/majorDetails.json'
import majors from '../data/majors.json'
import universitiesData from '../data/universities.json'
import FloatingMascot from '../components/FloatingMascot'

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

const universityVisuals = {
  uit: { code: 'QSC', shortName: 'UIT', gradient: 'from-blue-600 via-blue-700 to-indigo-900', accent: 'blue' },
  hcmut: { code: 'QSB', shortName: 'HCMUT', gradient: 'from-cyan-700 via-blue-800 to-slate-900', accent: 'cyan' },
  'fpt-hcm': { code: 'FPT', shortName: 'FPT', gradient: 'from-amber-600 via-orange-600 to-rose-700', accent: 'orange' },
  hust: { code: 'BKA', shortName: 'HUST', gradient: 'from-red-700 via-rose-800 to-slate-900', accent: 'red' },
}

const universityCatalogIds = {
  uit: 'uit-vnuhcm',
  hcmut: 'hcmut-vnuhcm',
  'fpt-hcm': 'fpt-university-hcm',
  hust: 'hust',
}

const sectionTabs = [
  ['section-overview', 'Tổng quan'],
  ['section-curriculum', 'Bạn sẽ học gì'],
  ['section-activities', 'Hoạt động thực tế'],
  ['section-self-reflect', 'Tự quan sát'],
  ['section-careers', 'Bản đồ nghề nghiệp'],
  ['section-challenges', 'Thách thức thực tế'],
  ['section-quick-check', 'Quick Self Check'],
  ['section-related', 'Ngành gần'],
  ['section-universities', 'Trường đào tạo'],
]

const readComparisonIds = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('uniview:comparison:universities') ?? '[]')
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string').slice(0, 4) : []
  } catch {
    return []
  }
}

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
  const [readProgress, setReadProgress] = useState(16.667)
  const [activeSection, setActiveSection] = useState('section-overview')
  const [comparisonIds, setComparisonIds] = useState(readComparisonIds)
  const [comparisonMessage, setComparisonMessage] = useState('')
  const tabsScrollerRef = useRef(null)
  const sectionNavRef = useRef(null)

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

  useEffect(() => {
    const updateReadProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0
      setReadProgress(Math.max(16.667, Math.min(100, percentage)))
    }

    updateReadProgress()
    window.addEventListener('scroll', updateReadProgress, { passive: true })
    window.addEventListener('resize', updateReadProgress)
    return () => {
      window.removeEventListener('scroll', updateReadProgress)
      window.removeEventListener('resize', updateReadProgress)
    }
  }, [])

  useEffect(() => {
    const sections = sectionTabs
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-130px 0px -58% 0px', threshold: [0.1, 0.35, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTabs = (direction) => {
    tabsScrollerRef.current?.scrollBy({
      left: direction * 260,
      behavior: 'smooth',
    })
  }

  const handleSectionTabClick = (event, id) => {
    event.preventDefault()
    setActiveSection(id)

    const target = document.getElementById(id)
    if (!target) return

    const header = document.querySelector('body > #root header')
    const headerHeight = header?.getBoundingClientRect().height ?? 74
    const tabHeight = sectionNavRef.current?.getBoundingClientRect().height ?? 52
    // Leave a little more breathing room below the sticky tab so the section
    // starts slightly higher instead of feeling like it overshoots.
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - tabHeight - 32

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
  }

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
  // Show the full set first, matching the Stitch reference; pills can narrow it.
  const defaultUniversityFilter = 'all'
  const activeUniversityFilter = universityFilters[major.id] ?? defaultUniversityFilter
  const usesGeneralUniversityCatalog = !(major.universities.items?.length > 0)
  const universityItems = useMemo(() => {
    const catalogItems = universitiesData.universities.filter((university) =>
      university.featuredMajors?.some((featuredMajor) => featuredMajor.toLowerCase() === major.name.toLowerCase()),
    )
    const fallbackItems = catalogItems.length > 0
      ? catalogItems
      : universitiesData.universities.slice(0, 6)
    const curatedItems = major.universities.items ?? []
    const sourceItems = curatedItems.length > 0
      ? curatedItems
      : fallbackItems.map((university) => {
          const location = university.location?.campus
            ? `${university.location.campus}, ${university.location.city}`
            : university.location?.city ?? university.city
          const tuition = university.tuition
          const scoreRange = university.admission?.scoreRange
          const tuitionLabel = tuition
            ? `${tuition.minMillionVnd} – ${tuition.maxMillionVnd} ${tuition.unit}`
            : 'Đang cập nhật'
          const methodLabel = university.admission?.methods?.slice(0, 2).map((method) => method.label).join(', ')

          return {
            id: university.id,
            catalogId: university.id,
            name: university.shortName ?? university.name,
            fullName: university.name,
            shortName: university.shortName,
            code: university.code,
            location,
            regionId: university.regionId,
            ownershipId: university.ownership,
            ownershipLabel: university.ownershipLabel,
            badge: [university.parentSystem, university.ownershipLabel].filter(Boolean).join(' · '),
            website: university.website,
            featuredMajors: university.featuredMajors ?? [],
            tuition: university.tuition,
            admission: university.admission,
            details: [
              { label: 'Học phí tham chiếu', value: tuitionLabel },
              { label: 'Điểm tham chiếu', value: scoreRange?.label ?? 'Đang cập nhật' },
              { label: 'Phương thức', value: methodLabel || 'Xem đề án tuyển sinh' },
            ],
          }
        })

    return sourceItems.map((item) => {
      const catalogUniversity = universitiesData.universities.find((university) =>
        university.id === universityCatalogIds[item.id]
        || university.id === item.catalogId
        || university.code === item.code
        || university.shortName === item.shortName
        || university.name === item.fullName,
      )

      const merged = {
        ...catalogUniversity,
        ...item,
      }
      const location = typeof merged.location === 'object'
        ? (merged.location?.campus
            ? `${merged.location.campus}, ${merged.location.city}`
            : merged.location?.city ?? merged.city)
        : merged.location
      const tuition = merged.tuition
      const scoreRange = merged.admission?.scoreRange

      return {
        ...merged,
        catalogId: catalogUniversity?.id ?? item.catalogId ?? item.id,
        name: merged.name ?? merged.shortName,
        fullName: merged.fullName ?? merged.name,
        shortName: merged.shortName,
        code: merged.code,
        location,
        regionId: merged.regionId ?? merged.location?.regionId,
        ownershipId: merged.ownershipId ?? merged.ownership,
        badge: merged.badge ?? [merged.parentSystem, merged.ownershipLabel].filter(Boolean).join(' · '),
        website: merged.website,
        featuredMajors: merged.featuredMajors ?? [],
        tuition,
        admission: merged.admission,
        details: merged.details ?? [
          {
            label: 'Học phí tham chiếu',
            value: tuition
              ? `${tuition.minMillionVnd} – ${tuition.maxMillionVnd} ${tuition.unit}`
              : 'Đang cập nhật',
          },
          { label: 'Điểm tham chiếu', value: scoreRange?.label ?? 'Đang cập nhật' },
          {
            label: 'Phương thức',
            value: merged.admission?.methods?.slice(0, 2).map((method) => method.label).join(', ') || 'Xem đề án tuyển sinh',
          },
        ],
      }
    })
  }, [major])
  const visibleUniversities = universityItems.filter((university) =>
    activeUniversityFilter === 'all'
      || university.regionId === activeUniversityFilter
      || university.ownershipId === activeUniversityFilter,
  )
  const comparisonUniversities = comparisonIds
    .map((id) => universitiesData.universities.find((university) => university.id === id))
    .filter(Boolean)

  const toggleUniversityComparison = (event, university) => {
    event.stopPropagation()
    const universityId = university.catalogId
    const alreadySelected = comparisonIds.includes(universityId)

    if (!alreadySelected && comparisonIds.length >= 4) {
      setComparisonMessage('Bạn chỉ có thể so sánh tối đa 4 trường')
      window.setTimeout(() => setComparisonMessage(''), 2400)
      return
    }

    const next = alreadySelected
      ? comparisonIds.filter((id) => id !== universityId)
      : [...comparisonIds, universityId]
    setComparisonIds(next)
    localStorage.setItem('uniview:comparison:universities', JSON.stringify(next))

    try {
      const selectedMajors = JSON.parse(localStorage.getItem('uniview:comparison:majors') ?? '{}')
      if (alreadySelected) delete selectedMajors[universityId]
      else selectedMajors[universityId] = major.id
      localStorage.setItem('uniview:comparison:majors', JSON.stringify(selectedMajors))
    } catch {
      localStorage.setItem('uniview:comparison:majors', JSON.stringify({ [universityId]: major.id }))
    }

    setComparisonMessage(alreadySelected ? 'Đã bỏ trường khỏi bảng so sánh' : `Đã thêm trường cùng ngành ${major.name}`)
    window.setTimeout(() => setComparisonMessage(''), 1800)
  }

  const clearUniversityComparison = () => {
    setComparisonIds([])
    localStorage.removeItem('uniview:comparison:universities')
    localStorage.removeItem('uniview:comparison:majors')
  }

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
    <>
      <FloatingMascot />
      <main className="w-full flex-1 bg-[#FFFDFB]" data-major-id={major.id}>
      <div className="sticky top-[74px] z-40 h-1 w-full bg-slate-200/80">
        <div className="h-full bg-[#1D4ED8] transition-all duration-300" style={{ width: `${readProgress}%` }} />
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
                    <p><span className="text-rose-400">{major.heroPreview.syntax === 'pipeline' ? 'const' : 'interface'}</span> <span className="font-semibold text-amber-300">{major.heroPreview.interfaceName}</span> {major.heroPreview.syntax === 'pipeline' ? '= [' : '{'}</p>
                    {major.heroPreview.properties.map((property) => (
                      <p className="pl-4 font-sans text-xs" key={property.name}>
                        <span className="font-mono text-blue-300">{property.name}</span>: <span className="text-slate-300">{typeof property.value === 'string' ? (major.heroPreview.syntax === 'pipeline' ? property.value : `'${property.value}'`) : String(property.value)}</span>
                      </p>
                    ))}
                    <p>{major.heroPreview.syntax === 'pipeline' ? '];' : '}'}</p>
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
                  <span className="truncate text-xs font-semibold text-slate-700">{major.heroPreview.badgeLabel ?? major.market.demandGrowthLabel}</span>
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

        <nav ref={sectionNavRef} className="sticky top-[78px] z-30 mb-8 rounded-2xl border border-slate-200/80 bg-[#FFFDFB]/95 p-1.5 shadow-sm backdrop-blur-md">
          <button
            aria-label="Cuộn tab sang trái"
            className="absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-500 shadow-sm transition hover:border-blue-200 hover:text-[#1D4ED8] md:flex"
            onClick={() => scrollTabs(-1)}
            type="button"
          >
            <MaterialIcon className="text-[18px]">chevron_left</MaterialIcon>
          </button>
          <div className="pointer-events-none absolute inset-y-1.5 left-0 z-[1] hidden w-12 rounded-l-2xl bg-gradient-to-r from-[#FFFDFB] to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-1.5 right-0 z-[1] hidden w-12 rounded-r-2xl bg-gradient-to-l from-[#FFFDFB] to-transparent md:block" />
          <div ref={tabsScrollerRef} className="hide-scrollbar flex snap-x items-center gap-1 overflow-x-auto scroll-smooth px-1 text-sm font-medium text-slate-600 md:px-10">
            {sectionTabs.map(([id, label]) => (
              <a
                className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 transition-all ${activeSection === id ? 'bg-[#EFF6FF] font-semibold text-[#1D4ED8] shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-[#172033]'}`}
                href={`#${id}`}
                key={id}
                onClick={(event) => handleSectionTabClick(event, id)}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            aria-label="Cuộn tab sang phải"
            className="absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-500 shadow-sm transition hover:border-blue-200 hover:text-[#1D4ED8] md:flex"
            onClick={() => scrollTabs(1)}
            type="button"
          >
            <MaterialIcon className="text-[18px]">chevron_right</MaterialIcon>
          </button>
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
            {major.curriculum.topics.slice(0, 4).map((topic, index) => (
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm text-amber-900">
            <MaterialIcon className="mt-0.5 text-[20px] text-amber-600">lightbulb</MaterialIcon>
            <p><strong>Thực hành đồ án từ năm thứ 2:</strong> Hãy ưu tiên các môn có sản phẩm đầu ra, làm việc nhóm và cơ hội triển khai thật để biến kiến thức thành portfolio.</p>
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-activities">
          <SectionHeading {...major.activities} accent="text-[#E11D48]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {major.activities.items.slice(0, 4).map((activity, index) => (
              <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md" key={activity.id}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[index % accentStyles.length]}`}>
                  <MaterialIcon className="text-[22px]">{activity.icon}</MaterialIcon>
                </div>
                <h3 className="text-base font-bold text-[#172033]">{activity.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
            <MaterialIcon className="mt-0.5 text-[20px] text-[#1D4ED8]">groups</MaterialIcon>
            <p><strong className="text-[#172033]">Cộng tác đa chức năng trong thực tế:</strong> Kỹ sư phần mềm thường xuyên phối hợp cùng Product, UX/UI, QA và vận hành để đưa một tính năng từ ý tưởng đến người dùng.</p>
          </div>
        </section>

        <section className="mb-14 scroll-mt-24" id="section-self-reflect">
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

        {major.challenges && (
          <section className="mb-14 scroll-mt-24" id="section-challenges">
            <SectionHeading {...major.challenges} accent="text-[#E11D48]" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {major.challenges.items.map((challenge, index) => (
                <article className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-rose-200 hover:shadow-md" key={challenge.id}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentStyles[(index + 2) % accentStyles.length]}`}>
                    <MaterialIcon className="text-[24px]">{challenge.icon}</MaterialIcon>
                  </div>
                  <h3 className="text-lg font-bold text-[#172033]">{challenge.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{challenge.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

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
            {major.relatedMajors.map((related) => (
              <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md" key={related.id}>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mã: {related.code}</span>
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
          {usesGeneralUniversityCatalog && (
            <p className="-mt-3 mb-5 text-xs text-slate-500">
              Danh sách đang dùng dữ liệu trường chung của UniView; thông tin theo từng ngành sẽ được bổ sung dần.
            </p>
          )}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {major.universities.filters.map((filter) => (
              <button className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${filter.id === activeUniversityFilter ? 'bg-[#1D4ED8] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} key={filter.id} onClick={() => setUniversityFilters((current) => ({ ...current, [major.id]: filter.id }))} type="button">{filter.label}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleUniversities.map((university) => (
              <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md" key={university.id}>
                <div>
                  {(() => {
                    const visual = universityVisuals[university.id]
                      ?? Object.values(universityVisuals).find((item) => item.code === university.code || item.shortName === university.shortName)
                      ?? {
                        code: university.code ?? '—',
                        shortName: university.shortName ?? university.code ?? 'UNI',
                        gradient: 'from-slate-600 via-slate-700 to-slate-900',
                      }
                    return (
                      <div className={`relative flex h-44 w-full flex-col justify-between overflow-hidden bg-gradient-to-br ${visual.gradient} p-5 text-white`}>
                        <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                        <div className="z-10 flex items-center justify-between gap-2">
                          <span className="rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">{university.badge}</span>
                          <span className="rounded bg-white/15 px-2 py-0.5 font-mono text-xs text-white/80">Mã: {visual.code}</span>
                        </div>
                        <div className="z-10">
                          <span className="block text-3xl font-extrabold tracking-tight text-white">{visual.shortName}</span>
                          <span className="text-xs font-medium text-white/75">{university.fullName}</span>
                        </div>
                      </div>
                    )
                  })()}
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
                    {university.featuredMajors?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {university.featuredMajors.slice(0, 3).map((featuredMajor) => (
                          <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium text-[#1D4ED8]" key={featuredMajor}>
                            {featuredMajor}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 p-5 pt-4">
                  <a className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:underline" href={`/universities/uit?universityId=${university.catalogId}`}><span>Chi tiết trường</span><MaterialIcon className="text-[16px]">arrow_forward</MaterialIcon></a>
                  <div className="flex items-center gap-1.5">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-rose-50 hover:text-[#E11D48]" title="Lưu trường" type="button"><MaterialIcon className="text-[18px]">favorite_border</MaterialIcon></button>
                    <button
                      aria-label={comparisonIds.includes(university.catalogId) ? 'Bỏ khỏi danh sách so sánh' : 'Thêm vào danh sách so sánh'}
                      aria-pressed={comparisonIds.includes(university.catalogId)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${comparisonIds.includes(university.catalogId) ? 'bg-blue-100 text-[#1D4ED8] ring-2 ring-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-[#1D4ED8]'}`}
                      onClick={(event) => toggleUniversityComparison(event, university)}
                      title={comparisonIds.includes(university.catalogId) ? 'Bỏ khỏi danh sách so sánh' : 'Thêm vào danh sách so sánh'}
                      type="button"
                    >
                      <MaterialIcon className="text-[18px]">compare_arrows</MaterialIcon>
                    </button>
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
      {comparisonIds.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-50 flex w-[min(920px,calc(100%-2rem))] -translate-x-1/2 flex-col gap-3 rounded-2xl border border-blue-200 bg-white/95 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D4ED8]"><MaterialIcon>compare_arrows</MaterialIcon></div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#172033]">Đang chọn {comparisonIds.length}/4 trường</p>
                <button aria-label="Xóa danh sách so sánh" className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-[#E11D48]" onClick={clearUniversityComparison} title="Xóa toàn bộ danh sách so sánh" type="button"><MaterialIcon className="text-[16px]">delete_sweep</MaterialIcon></button>
              </div>
              <p className="truncate text-xs text-slate-500">{comparisonUniversities.map((university) => university.shortName ?? university.name).join(' · ')}</p>
            </div>
          </div>
          {comparisonIds.length >= 2 ? (
            <Link className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1e40af]" to="/compare">So sánh ngay<MaterialIcon className="text-[18px]">arrow_forward</MaterialIcon></Link>
          ) : (
            <span className="shrink-0 text-center text-xs font-semibold text-slate-400">Chọn thêm ít nhất 1 trường</span>
          )}
        </div>
      )}
      {comparisonMessage && <div className="fixed bottom-28 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#172033] px-4 py-2 text-xs font-semibold text-white shadow-lg">{comparisonMessage}</div>}
      </main>
    </>
  )
}

export default MajorDetailPage
