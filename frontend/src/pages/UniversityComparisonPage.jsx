import { useDataMode } from '../context/DataModeContext'
import { useCatalog } from '../hooks/useCatalog'
import DataUnavailable from '../components/DataUnavailable'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import mascotImage from '../assets/UniView_DUNG_MEO_TRONG_ANH_chop_mat_cuoi.webp'
import { useAuth } from '../context/AuthContext'
import majorDetails from '../data/majorDetails.json'
import majors from '../data/majors.json'
import universitiesData from '../data/universities.json'

const DEFAULT_PROFILE = {
  budget: 35,
  regionId: 'ho-chi-minh-city',
  major: 'Kỹ thuật Phần mềm',
  thptScore: 25.5,
  competencyScore: 875,
}

const DEFAULT_MAJOR_IDS = {
  'uit-vnuhcm': '7480103',
  'hcmut-vnuhcm': '7480101',
  'fpt-university-hcm': '7480103',
}

const CHOICE_STYLES = [
  { border: 'border-t-blue-500', badge: 'border-blue-100 bg-blue-50 text-blue-700' },
  { border: 'border-t-teal-500', badge: 'border-teal-100 bg-teal-50 text-teal-700' },
  { border: 'border-t-amber-500', badge: 'border-amber-100 bg-amber-50 text-amber-800' },
  { border: 'border-t-rose-500', badge: 'border-rose-100 bg-rose-50 text-rose-700' },
]

const COMPARISON_BACKGROUND_STYLE = {
  backgroundAttachment: 'fixed',
  backgroundColor: '#eef6ff',
  backgroundImage: "url('/anhnganh/backgroundTong.png')",
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const comparisonTabs = [
  ['section-overview', 'dashboard', 'Tổng quan'],
  ['section-budget', 'payments', 'Học phí'],
  ['section-location', 'location_on', 'Vị trí'],
  ['section-major', 'code', 'Ngành học'],
  ['section-admission', 'how_to_reg', 'Tuyển sinh'],
  ['section-scholarships', 'workspace_premium', 'Học bổng'],
  ['section-fit', 'tune', 'Điểm đối chiếu'],
  ['section-tradeoffs', 'balance', 'Đánh đổi'],
  ['section-missing-info', 'fact_check', 'Nguồn dữ liệu'],
  ['section-notes', 'edit_note', 'Ghi chú'],
]

const readStoredJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback
  } catch {
    return fallback
  }
}

const normalizeText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .toLowerCase()
  .trim()

const findMajorsForUniversity = (university) => {
  const featuredNames = university.featuredMajors ?? []
  return featuredNames.map((featuredName) => majors.find(
    (major) => normalizeText(major.name) === normalizeText(featuredName),
  ) ?? {
    id: `${university.id}:${normalizeText(featuredName).replace(/\s+/g, '-')}`,
    name: featuredName,
    code: 'Đang cập nhật',
    category: { id: 'other', name: 'Ngành nổi bật của trường' },
    description: `Chương trình ${featuredName} được trường liệt kê trong nhóm ngành nổi bật.`,
    skills: [],
    careerPaths: [],
  })
}

const getTuitionAverage = (university) => university.tuition
  ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2
  : null

const isSpecificSource = (sourceUrl, officialWebsite) => {
  if (!sourceUrl) return false
  try {
    const source = new URL(sourceUrl)
    const official = new URL(officialWebsite ?? sourceUrl)
    const sourceHost = source.hostname.replace(/^www\./, '')
    const officialHost = official.hostname.replace(/^www\./, '')
    const sameOfficialDomain = sourceHost === officialHost
      || sourceHost.endsWith(`.${officialHost}`)
      || officialHost.endsWith(`.${sourceHost}`)
    return sameOfficialDomain && (
      sourceHost !== officialHost
      || source.pathname.replace(/\/+$/, '') !== official.pathname.replace(/\/+$/, '')
    )
  } catch {
    return false
  }
}

const formatVerifiedDate = (value) => {
  if (!value) return 'Chưa ghi nhận'
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

const getFitBreakdown = ({ university, major }, profile) => {
  const recordedTuitionAverage = getTuitionAverage(university)
  const tuitionAverage = recordedTuitionAverage ?? profile.budget * 1.25
  const budgetScore = tuitionAverage <= profile.budget
    ? 30
    : Math.max(0, 30 - ((tuitionAverage - profile.budget) / Math.max(profile.budget, 1)) * 30)
  const locationScore = university.regionId === profile.regionId ? 20 : 6
  const targetMajor = majors.find((item) => normalizeText(item.name) === normalizeText(profile.major))
  const majorScore = major?.id === targetMajor?.id
    ? 25
    : major?.category?.id === targetMajor?.category?.id ? 16 : 7
  const scoreRange = university.admission?.scoreRange
  const admissionScore = !scoreRange?.max
    ? 12
    : profile.thptScore >= scoreRange.max ? 25
      : profile.thptScore >= scoreRange.max - 2 ? 19
        : profile.thptScore >= scoreRange.min ? 13 : 6

  return {
    total: Math.round((budgetScore + locationScore + majorScore + admissionScore)) / 10,
    metrics: [
      {
        label: 'Ngành học',
        value: Math.round((majorScore / 25) * 100),
        points: majorScore,
        maxPoints: 25,
        description: majorScore === 25 ? 'Trùng ngành mục tiêu' : majorScore === 16 ? 'Cùng nhóm với ngành mục tiêu' : 'Khác nhóm ngành mục tiêu',
        color: '#1D4ED8',
      },
      {
        label: 'Ngân sách',
        value: Math.round((budgetScore / 30) * 100),
        points: budgetScore,
        maxPoints: 30,
        description: recordedTuitionAverage === null
          ? 'Chưa có học phí; dùng mức ước tính bằng 125% ngân sách'
          : tuitionAverage <= profile.budget ? 'Học phí không vượt ngân sách' : `Học phí trung bình vượt ${Math.round(tuitionAverage - profile.budget)} triệu/năm`,
        color: '#059669',
      },
      {
        label: 'Khu vực',
        value: Math.round((locationScore / 20) * 100),
        points: locationScore,
        maxPoints: 20,
        description: locationScore === 20 ? 'Đúng khu vực ưu tiên' : 'Khác khu vực ưu tiên',
        color: '#D97706',
      },
      {
        label: 'Tuyển sinh',
        value: Math.round((admissionScore / 25) * 100),
        points: admissionScore,
        maxPoints: 25,
        description: !scoreRange?.max
          ? 'Chưa có khoảng điểm cấu trúc'
          : admissionScore === 25 ? 'Điểm hồ sơ từ mức trên của khoảng trở lên'
            : admissionScore === 19 ? 'Thấp hơn mức trên không quá 2 điểm'
              : admissionScore === 13 ? 'Nằm trong khoảng điểm tham chiếu' : 'Thấp hơn khoảng điểm tham chiếu',
        color: '#A93349',
      },
    ],
  }
}

function DonutChart({ value, label, color = '#1D4ED8' }) {
  const percentage = Math.max(0, Math.min(100, value * 10))
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percentage / 100)

  return (
    <div className="relative size-28 shrink-0" role="img" aria-label={`${label}: ${value} trên 10`}>
      <svg className="size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <strong className="text-xl font-black text-slate-900">{value}</strong>
        <span className="text-[10px] font-semibold text-slate-500">/ 10</span>
      </div>
    </div>
  )
}

function MetricProgress({ label, value, color, points, maxPoints, description }) {
  const formattedPoints = Number.isInteger(points) ? points : points.toFixed(1)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-black text-slate-900">{formattedPoints}/{maxPoints} điểm</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={`${label}: ${formattedPoints} trên ${maxPoints} điểm`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={value}
      >
        <div className="h-full rounded-full transition-[width] duration-500" style={{ backgroundColor: color, width: `${value}%` }} />
      </div>
      <p className="text-[10px] leading-4 text-slate-500">{description}</p>
    </div>
  )
}

function TuitionBarChart({ choices, budget }) {
  const values = choices.map(({ university }) => getTuitionAverage(university))
  const maxValue = Math.max(budget, ...values.filter((value) => value !== null), 1) * 1.18
  const budgetBottom = Math.min(100, (budget / maxValue) * 100)

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 text-xs">
        <span className="font-bold text-slate-800">Học phí trung bình tham chiếu</span>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1.5 text-slate-600"><span className="size-2.5 rounded-sm bg-blue-600" />Trong ngân sách</span>
          <span className="inline-flex items-center gap-1.5 text-slate-600"><span className="size-2.5 rounded-sm bg-amber-600" />Vượt ngân sách</span>
          <span className="inline-flex items-center gap-1.5 text-rose-700"><span className="h-0.5 w-5 bg-rose-500" />Ngân sách {budget} triệu/năm</span>
        </div>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[520px] px-2 pt-5">
          <div className="mb-2 grid gap-4" style={{ gridTemplateColumns: `repeat(${choices.length}, minmax(100px, 1fr))` }}>
            {choices.map(({ university }, index) => {
              const value = values[index]
              const withinBudget = value !== null && value <= budget
              return <div className="text-center" key={university.id}>
                <p className={`text-xs font-black ${withinBudget ? 'text-blue-700' : 'text-amber-800'}`}>{value === null ? 'N/A' : `${Math.round(value)}tr`}</p>
                <p className="mt-1 text-[10px] font-semibold text-slate-500">{university.tuition ? `${university.tuition.minMillionVnd}–${university.tuition.maxMillionVnd}tr` : 'Chưa có khoảng'}</p>
              </div>
            })}
          </div>
          <div className="relative h-44">
            <div className="absolute inset-x-0 z-10 border-t-2 border-dashed border-rose-400" style={{ bottom: `${budgetBottom}%` }}>
              <span className="absolute -top-5 right-0 rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">{budget}tr</span>
            </div>
            <div className="grid h-full items-end gap-4" style={{ gridTemplateColumns: `repeat(${choices.length}, minmax(100px, 1fr))` }}>
              {choices.map(({ university }, index) => {
                const value = values[index]
                const height = value === null ? 0 : Math.max(5, (value / maxValue) * 100)
                const withinBudget = value !== null && value <= budget
                return <div className="flex h-full items-end justify-center" key={university.id}>
                  <div
                    className="w-12 rounded-t-lg shadow-sm transition-[height] duration-500 sm:w-16"
                    style={{ backgroundColor: withinBudget ? '#2563EB' : '#D97706', height: `${height}%` }}
                    title={`${university.name}: ${value ?? 'chưa có dữ liệu'} triệu đồng/năm`}
                  />
                </div>
              })}
            </div>
          </div>
          <div className="mt-2 grid gap-4" style={{ gridTemplateColumns: `repeat(${choices.length}, minmax(100px, 1fr))` }}>
            {choices.map(({ university }) => <div className="flex min-w-0 justify-center" key={university.id}>
              <UniversityLabel university={university}>
                <span className="block max-w-24 truncate text-center text-[11px] font-bold text-slate-700">{university.shortName ?? university.code}</span>
              </UniversityLabel>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdmissionRangeTrack({ university, score }) {
  const range = university.admission?.scoreRange
  if (!range?.max || !range?.scale) {
    return <div className="rounded-lg bg-slate-100 px-3 py-4 text-center text-[11px] font-semibold text-slate-500">Chưa có khoảng điểm có cấu trúc</div>
  }

  const minPosition = Math.max(0, Math.min(100, (range.min / range.scale) * 100))
  const maxPosition = Math.max(minPosition, Math.min(100, (range.max / range.scale) * 100))
  const scorePosition = Math.max(0, Math.min(100, (score / range.scale) * 100))

  return (
    <div className="space-y-2" role="img" aria-label={`${university.shortName ?? university.name}: khoảng tham chiếu ${range.min} đến ${range.max}, điểm hồ sơ ${score}`}>
      <div className="relative pt-6">
        <div className="h-2 rounded-full bg-slate-200">
          <div className="absolute top-6 h-2 rounded-full bg-blue-200" style={{ left: `${minPosition}%`, width: `${maxPosition - minPosition}%` }} />
        </div>
        <span className="absolute top-4 h-6 w-0.5 -translate-x-1/2 bg-[#1D4ED8]" style={{ left: `${scorePosition}%` }} />
        <span className="absolute top-0 -translate-x-1/2 rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-black text-white" style={{ left: `${scorePosition}%` }}>{score}</span>
      </div>
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
        <span>{range.min}đ</span>
        <span>Khoảng tham chiếu</span>
        <span>{range.max}đ</span>
      </div>
    </div>
  )
}

function Tooltip({ label, children }) {
  return (
    <span className="group/tooltip relative inline-flex min-w-0 max-w-full">
      {children}
      <span
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-[70] w-max max-w-56 -translate-x-1/2 rounded-lg bg-[#172033] px-2.5 py-1.5 text-center text-[11px] font-medium leading-4 text-white opacity-0 shadow-lg transition-all duration-150 group-hover/tooltip:-translate-y-0.5 group-hover/tooltip:opacity-100 group-focus-within/tooltip:-translate-y-0.5 group-focus-within/tooltip:opacity-100"
        role="tooltip"
      >
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#172033]" />
      </span>
    </span>
  )
}

function UniversityLabel({ university, children }) {
  return (
    <Tooltip label={university.name}>
      <span tabIndex="0">{children ?? university.shortName ?? university.name}</span>
    </Tooltip>
  )
}

function SectionHeader({ number, icon, title, description, aside }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <span className="material-symbols-outlined text-[19px]">{icon}</span>
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase text-blue-700">Tiêu chí {number}</p>
          <h2 className="mt-0.5 text-lg font-bold text-slate-950 md:text-xl">{title}</h2>
          {description && <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500 md:text-sm">{description}</p>}
        </div>
      </div>
      {aside && <div className="shrink-0 text-xs text-slate-600">{aside}</div>}
    </div>
  )
}

const regionLabel = (regionId) => ({
  'ho-chi-minh-city': 'TP. Hồ Chí Minh',
  'ha-noi': 'Hà Nội',
  central: 'Miền Trung',
  south: 'Miền Nam',
}[regionId] ?? 'Chưa chọn')

function UniversityComparisonPage() {
  const { isRealMode } = useDataMode()
  const catalog = useCatalog('universities')
  const majorCatalog = useCatalog('majors')
  const allUniversities = isRealMode ? catalog.rows : universitiesData.universities
  const allMajors = isRealMode ? majorCatalog.rows : majors
  const storageKey = (key) => key + (isRealMode ? ':real' : '')
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [selectedIds, setSelectedIds] = useState(() => {
    if (!isAuthenticated) return []
    const saved = readStoredJson(storageKey('uniview:comparison:universities'), [])
    return Array.isArray(saved) ? saved.slice(0, 4) : []
  })
  const [profile, setProfile] = useState(() => {
    const saved = isAuthenticated ? readStoredJson(storageKey('uniview:comparison:profile'), {}) : {}
    return { ...(isRealMode ? { budget: '', regionId: '', major: '', thptScore: '', competencyScore: '' } : DEFAULT_PROFILE), ...saved }
  })
  const [profileDraft, setProfileDraft] = useState(profile)
  const [pickerSlot, setPickerSlot] = useState(null)
  const [majorPickerUniversityId, setMajorPickerUniversityId] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [activeTab, setActiveTab] = useState('section-overview')
  const tabsRef = useRef(null)
  const pendingTabRef = useRef(null)
  const pendingTabTimerRef = useRef(0)
  const scrollFrameRef = useRef(0)
  const initialHashHandledRef = useRef(false)
  const [notes, setNotes] = useState(() => {
    return isAuthenticated ? readStoredJson(storageKey('uniview:comparison:notes'), {}) : {}
  })
  const [selectedMajorIds, setSelectedMajorIds] = useState(() => {
    const saved = isAuthenticated ? readStoredJson(storageKey('uniview:comparison:majors'), {}) : {}
    return { ...(isRealMode ? {} : DEFAULT_MAJOR_IDS), ...saved }
  })

  const selectedUniversities = useMemo(() => selectedIds
    .map((id) => allUniversities.find((university) => university.id === id))
    .filter(Boolean), [selectedIds, allUniversities])
  const selectedChoices = useMemo(() => isRealMode ? [] : selectedUniversities.map((university) => {
    const availableMajors = findMajorsForUniversity(university)
    const major = availableMajors.find((item) => item.id === selectedMajorIds[university.id])
      ?? availableMajors[0]
    const detail = majorDetails.find((item) => item.id === major?.id)

    const fitBreakdown = getFitBreakdown({ university, major }, profile)

    return {
      university,
      major,
      detail,
      availableMajors,
      fitScore: fitBreakdown.total,
      fitBreakdown,
    }
  }), [profile, selectedMajorIds, selectedUniversities, isRealMode])

  useEffect(() => {
    const sections = comparisonTabs
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const requestedSectionId = window.location.hash.slice(1)
    const requestedSection = sections.find((section) => section.id === requestedSectionId)
    let previousRootScrollBehavior
    let initialHashTimer = 0
    if (requestedSection && !initialHashHandledRef.current) {
      initialHashHandledRef.current = true
      setActiveTab(requestedSectionId)
      const scrollToRequestedSection = () => {
        const root = document.documentElement
        if (previousRootScrollBehavior === undefined) previousRootScrollBehavior = root.style.scrollBehavior
        const headerHeight = document.querySelector('body > #root header')?.getBoundingClientRect().height ?? 74
        const tabsHeight = tabsRef.current?.parentElement?.getBoundingClientRect().height ?? 52
        const top = requestedSection.getBoundingClientRect().top + window.scrollY - headerHeight - tabsHeight - 20
        root.style.scrollBehavior = 'auto'
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
      }
      window.requestAnimationFrame(scrollToRequestedSection)
      initialHashTimer = window.setTimeout(scrollToRequestedSection, 160)
    }

    const updateActiveTab = () => {
      scrollFrameRef.current = 0
      const headerHeight = document.querySelector('body > #root header')?.getBoundingClientRect().height ?? 74
      const tabsHeight = tabsRef.current?.parentElement?.getBoundingClientRect().height ?? 52
      const activationY = window.scrollY + headerHeight + tabsHeight + 28
      const pendingId = pendingTabRef.current

      if (pendingId) {
        setActiveTab(pendingId)
        return
      }

      let nextId = sections[0].id
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        if (sectionTop <= activationY) nextId = section.id
      })
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        nextId = sections[sections.length - 1].id
      }
      setActiveTab((current) => current === nextId ? current : nextId)
    }

    const handleScroll = () => {
      if (!scrollFrameRef.current) {
        scrollFrameRef.current = window.requestAnimationFrame(updateActiveTab)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
      if (pendingTabTimerRef.current) window.clearTimeout(pendingTabTimerRef.current)
      if (initialHashTimer) window.clearTimeout(initialHashTimer)
      if (previousRootScrollBehavior !== undefined) document.documentElement.style.scrollBehavior = previousRootScrollBehavior
    }
  }, [])

  useEffect(() => {
    const scroller = tabsRef.current
    const activeElement = scroller?.querySelector(`[data-comparison-tab="${activeTab}"]`)
    if (!scroller || !activeElement) return

    const left = activeElement.offsetLeft
      - ((scroller.clientWidth - activeElement.clientWidth) / 2)
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [activeTab])

  const handleTabClick = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    const target = document.getElementById(id)
    if (!target) return

    pendingTabRef.current = id
    if (pendingTabTimerRef.current) window.clearTimeout(pendingTabTimerRef.current)
    pendingTabTimerRef.current = window.setTimeout(() => {
      pendingTabRef.current = null
      window.dispatchEvent(new Event('scroll'))
    }, 900)
    setActiveTab(id)
    const headerHeight = document.querySelector('body > #root header')?.getBoundingClientRect().height ?? 74
    const tabsHeight = tabsRef.current?.parentElement?.getBoundingClientRect().height ?? 52
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - tabsHeight - 20
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const saveComparison = () => {
    if (!isAuthenticated) return
    localStorage.setItem(storageKey('uniview:comparison:universities'), JSON.stringify(selectedIds))
    localStorage.setItem(storageKey('uniview:comparison:profile'), JSON.stringify(profile))
    localStorage.setItem(storageKey('uniview:comparison:majors'), JSON.stringify(selectedMajorIds))
    localStorage.setItem(storageKey('uniview:comparison:notes'), JSON.stringify(notes))
    showToast('Đã lưu bảng so sánh trên thiết bị này')
  }

  const chooseUniversity = (universityId) => {
    const university = allUniversities.find((item) => item.id === universityId)
    const firstMajor = !isRealMode && university ? findMajorsForUniversity(university)[0] : null
    setSelectedIds((current) => {
      if (pickerSlot === current.length) return [...current, universityId].slice(0, 4)
      return current.map((id, index) => index === pickerSlot ? universityId : id)
    })
    if (firstMajor) {
      setSelectedMajorIds((current) => ({ ...current, [universityId]: firstMajor.id }))
    }
    setPickerSlot(null)
  }

  const saveProfile = () => {
    setProfile(profileDraft)
    if (isAuthenticated) localStorage.setItem(storageKey('uniview:comparison:profile'), JSON.stringify(profileDraft))
    setProfileOpen(false)
    showToast('Đã cập nhật tiêu chí cá nhân')
  }

  const addToDecisionBoard = () => {
    if (!isAuthenticated) return
    localStorage.setItem(storageKey('uniview:decision-board:universities'), JSON.stringify(selectedChoices.map(({ university, major }) => ({ universityId: university.id, majorId: major?.id }))))
    localStorage.setItem(storageKey('uniview:comparison:notes'), JSON.stringify(notes))
    navigate('/decision-board')
  }

  const removeUniversity = (universityId) => {
    setSelectedIds((current) => {
      if (current.length <= 2) {
        showToast('Cần ít nhất 2 trường để so sánh')
        return current
      }
      return current.filter((id) => id !== universityId)
    })
  }

  const chooseMajor = (majorId) => {
    if (!majorPickerUniversityId) return
    setSelectedMajorIds((current) => ({ ...current, [majorPickerUniversityId]: majorId }))
    setMajorPickerUniversityId(null)
  }

  const shareComparison = async () => {
    const shareData = {
      title: 'So sánh đại học UniView',
      text: `Mình đang đối chiếu ${selectedUniversities.map((university) => university.shortName ?? university.name).join(', ')} trên UniView.`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        showToast('Đã sao chép đường dẫn bảng so sánh')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Chưa thể chia sẻ bảng so sánh')
    }
  }

  if (authLoading) {
    return <main className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-[#F8FAFC] px-4"><p className="text-sm font-semibold text-slate-500">Đang kiểm tra phiên đăng nhập...</p></main>
  }

  if (!isAuthenticated && !isRealMode) {
    return <main className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-9">
        <span className="material-symbols-outlined text-[40px] text-blue-600">lock_person</span>
        <h1 className="mt-3 text-2xl font-black text-slate-900">Đăng nhập để so sánh trường</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Phiên khách không lưu trường, ngành, tiêu chí hay ghi chú so sánh.</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link className="rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700" to="/login">Đăng nhập</Link>
          <Link className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50" to="/universities">Xem danh sách trường</Link>
        </div>
      </section>
    </main>
  }

  if (selectedUniversities.length < 2 && !isRealMode) {
    return <main className="flex min-h-[calc(100vh-74px)] items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-9">
        <span className="material-symbols-outlined text-[40px] text-blue-600">compare_arrows</span>
        <h1 className="mt-3 text-2xl font-black text-slate-900">Chưa đủ trường để so sánh</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Chọn ít nhất hai trường từ danh sách để tạo bảng so sánh của riêng bạn.</p>
        <Link className="mt-6 inline-flex rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700" to="/universities">Chọn trường</Link>
      </section>
    </main>
  }

  return (
<main className="min-h-[calc(100vh-80px)] w-full pb-20 text-slate-800 [&_a]:cursor-pointer [&_button:not(:disabled)]:cursor-pointer [&_select]:cursor-pointer" style={COMPARISON_BACKGROUND_STYLE}><div className="mx-auto max-w-[1320px] space-y-6 px-4 pt-6 md:px-6 lg:px-8">

<header className="relative -mx-4 overflow-hidden border-y border-blue-100 bg-[#EEF4FF]/70 px-4 py-6 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
  <img alt="Linh vật UniView" className="pointer-events-none absolute bottom-2 right-5 hidden h-32 w-32 object-contain drop-shadow-lg xl:block" src={mascotImage} />
  <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between xl:pr-36">
    <div className="max-w-3xl">
      <Link className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-700" to="/universities"><span className="material-symbols-outlined text-[16px]">arrow_back</span>Danh sách trường</Link>
      <p className="mt-4 text-xs font-bold uppercase text-blue-700">Công cụ ra quyết định</p>
      <h1 className="mt-1 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">So sánh trường theo ngành học</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">Đặt các lựa chọn cạnh nhau để nhìn nhanh chi phí, ngành đào tạo, khả năng tuyển sinh và những điểm cần xác minh.</p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <button aria-label="Chia sẻ bảng so sánh" className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700" onClick={shareComparison} type="button"><span className="material-symbols-outlined text-[19px]">share</span></button>
      <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700" onClick={saveComparison} type="button"><span className="material-symbols-outlined text-[18px]">bookmark_add</span>Lưu so sánh</button>
      <button className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 text-xs font-bold text-white transition hover:bg-blue-700" onClick={() => { setProfileDraft(profile); setProfileOpen(true) }} type="button"><span className="material-symbols-outlined text-[18px]">tune</span>Chỉnh tiêu chí</button>
    </div>
  </div>
  <div className="relative mt-5 grid overflow-hidden rounded-lg border border-blue-100 bg-white/90 shadow-sm sm:grid-cols-2 lg:grid-cols-5 xl:mr-36">
    <div className="border-b border-blue-100 bg-blue-50/70 px-4 py-3 sm:border-r lg:border-b-0"><p className="text-[10px] font-bold uppercase text-blue-500">Đang so sánh</p><p className="mt-1 text-sm font-bold text-slate-900">{selectedUniversities.length} trường</p></div>
    <div className="border-b border-rose-100 bg-rose-50/60 px-4 py-3 lg:border-b-0 lg:border-r"><p className="text-[10px] font-bold uppercase text-rose-500">Ngành mục tiêu</p><p className="mt-1 truncate text-sm font-bold text-slate-900">{profile.major || 'Chưa chọn'}</p></div>
    <div className="border-b border-emerald-100 bg-emerald-50/70 px-4 py-3 sm:border-r lg:border-b-0"><p className="text-[10px] font-bold uppercase text-emerald-600">Ngân sách tối đa</p><p className="mt-1 text-sm font-bold text-slate-900">{profile.budget || '—'} triệu/năm</p></div>
    <div className="border-b border-amber-100 bg-amber-50/70 px-4 py-3 lg:border-b-0 lg:border-r"><p className="text-[10px] font-bold uppercase text-amber-600">Khu vực ưu tiên</p><p className="mt-1 text-sm font-bold text-slate-900">{regionLabel(profile.regionId)}</p></div>
    <div className="bg-slate-50 px-4 py-3 sm:col-span-2 lg:col-span-1"><p className="text-[10px] font-bold uppercase text-slate-500">Điểm hồ sơ</p><p className="mt-1 text-sm font-bold text-slate-900">THPT {profile.thptScore || '—'} · ĐGNL {profile.competencyScore || '—'}</p></div>
  </div>
</header>

{isRealMode && <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4" aria-label="Hồ sơ đối chiếu">
  <h2 className="text-lg font-bold">Nhập hồ sơ và tiêu chí của bạn</h2>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[['thptScore', 'Điểm THPT', 30], ['competencyScore', 'Điểm ĐGNL', 1200], ['budget', 'Ngân sách (triệu/năm)', undefined]].map(([field, label, max]) => <label className="text-sm font-semibold" key={field}>{label}<input className="mt-2 w-full rounded-xl border p-3" type="number" min="0" max={max} step="any" value={profile[field]} onChange={(event) => setProfile((current) => ({...current, [field]: event.target.value}))} /></label>)}
    <label className="text-sm font-semibold">Khu vực mong muốn<select className="mt-2 w-full rounded-xl border p-3" value={profile.regionId} onChange={(event) => setProfile((current) => ({...current, regionId: event.target.value}))}><option value="">Chọn khu vực</option><option value="ho-chi-minh-city">TP. Hồ Chí Minh</option><option value="ha-noi">Hà Nội</option><option value="central">Miền Trung</option><option value="south">Miền Nam</option></select></label>
    <label className="text-sm font-semibold">Ngành mong muốn<select className="mt-2 w-full rounded-xl border p-3" value={profile.major} onChange={(event) => setProfile((current) => ({...current, major: event.target.value}))}><option value="">{allMajors.length ? 'Chọn ngành' : 'Hiện tại chưa có dữ liệu ngành'}</option>{allMajors.map((major) => <option key={major.id} value={major.name}>{major.name}</option>)}</select></label>
  </div>
  <div className="flex flex-wrap gap-2">{selectedUniversities.map((university) => <span className="rounded-xl bg-blue-50 p-3" key={university.id}>{university.name}<button type="button" aria-label={'Bỏ ' + university.name} className="ml-3" onClick={() => removeUniversity(university.id)}>×</button></span>)}</div>
  <DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} />
  <label className="block text-sm font-semibold">Ghi chú của bạn<textarea className="mt-2 w-full rounded-xl border p-3" value={notes.general ?? ''} onChange={(event) => setNotes((current) => ({...current, general: event.target.value}))} /></label>
</section>}
<section aria-labelledby="selected-schools-heading">
<div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase text-blue-700">Lựa chọn hiện tại</p><h2 className="mt-0.5 text-lg font-bold text-slate-950" id="selected-schools-heading">Các trường đang đối chiếu</h2></div><p className="hidden text-xs text-slate-500 sm:block">Có thể đổi trường hoặc ngành ngay trên từng lựa chọn</p></div>
<div className={`grid grid-cols-1 items-stretch gap-4 ${selectedUniversities.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, fitScore }, index) => {
  const choiceStyle = CHOICE_STYLES[index % CHOICE_STYLES.length]
  const tuitionAverage = university.tuition ? Math.round((university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2) : null
  const withinBudget = tuitionAverage !== null && tuitionAverage <= profile.budget
  const initials = university.shortName === 'FPTU' ? 'FPT' : university.shortName ?? university.code
  const locationLabel = university.location?.campus
    ? `${university.location.campus}, ${university.location.city}`
    : university.location?.city ?? university.city
  return (
    <article className={`relative flex flex-col justify-between gap-4 rounded-lg border border-slate-200 border-t-4 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${choiceStyle.border}`} key={university.id}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`flex size-11 shrink-0 items-center justify-center rounded-lg border text-sm font-black ${choiceStyle.badge}`}>{initials}</div>
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase text-slate-400">Lựa chọn {index + 1}</p><Tooltip label={university.name}><span tabIndex="0" className="block text-sm font-black leading-snug text-slate-950">{university.shortName ?? university.code}</span></Tooltip><p className="line-clamp-2 text-[11px] font-medium leading-4 text-slate-500">{university.name}</p></div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Tooltip label="Đổi trường trong lựa chọn này">
              <button aria-label="Đổi trường" className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setPickerSlot(index)} type="button"><span className="material-symbols-outlined text-[18px]">sync</span></button>
            </Tooltip>
            <Tooltip label="Xóa trường khỏi bảng so sánh">
              <button aria-label="Xóa trường" className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" onClick={() => removeUniversity(university.id)} type="button"><span className="material-symbols-outlined text-[18px]">close</span></button>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-y border-slate-100 py-2.5">
          <div className="min-w-0"><p className="text-[10px] font-bold uppercase text-slate-400">Ngành đối chiếu</p><p className="truncate text-xs font-bold text-slate-900">{major?.name ?? profile.major}</p></div>
          <button className="shrink-0 text-[11px] font-bold text-blue-700 hover:underline" onClick={(event) => { event.stopPropagation(); setMajorPickerUniversityId(university.id) }} type="button">Đổi ngành</button>
        </div>
        <div className="text-xs text-slate-600 space-y-1.5 pt-1">
          <p className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-[15px] text-slate-400">location_on</span><span>{university.ownershipLabel} · {locationLabel}</span></p>
          <p className={`flex items-center gap-2 font-medium ${withinBudget ? 'text-slate-700' : 'text-amber-900'}`}><span className={`w-2 h-2 rounded-full ${withinBudget ? 'bg-emerald-500' : 'bg-rose-500'}`} />Học phí: ~{tuitionAverage ?? '—'} triệu / năm <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${withinBudget ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200'}`}>{withinBudget ? 'Trong ngân sách' : `Vượt +${Math.max(0, tuitionAverage - profile.budget)}tr`}</span></p>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <Tooltip label="Điểm đối chiếu từ ngành mục tiêu, ngân sách, khu vực và dữ liệu tuyển sinh">
          <span tabIndex="0" className={`font-bold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1 ${fitScore >= 8 ? 'text-blue-700 bg-blue-50 border-blue-200/80' : fitScore >= 6.5 ? 'text-slate-700 bg-slate-100 border-slate-200' : 'text-amber-900 bg-amber-50 border-amber-200/80'}`}><span className="material-symbols-outlined text-[15px]">calculate</span>Đối chiếu {fitScore}/10</span>
        </Tooltip>
        <span className="text-slate-400 text-[11px] text-right">{university.admission?.scoreRange?.label ?? 'Xem đề án tuyển sinh'}</span>
      </div>
    </article>
  )
})}

{selectedUniversities.length < 4 && <button className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-5 text-center transition-all hover:border-blue-400 hover:bg-blue-50/30" onClick={(event) => { event.stopPropagation(); setPickerSlot(selectedUniversities.length) }} type="button">
<span className="material-symbols-outlined mb-3 flex size-12 items-center justify-center rounded-lg bg-slate-100 text-[24px] text-slate-500">add</span>
<p className="text-sm font-bold text-slate-800">+ Thêm trường thứ {selectedUniversities.length + 1}</p>
<p className="text-xs text-slate-500 mt-1 max-w-[180px]">Tối đa 4 trường để đảm bảo góc nhìn so sánh tập trung nhất</p>
</button>}
</div>
</section>

{!isRealMode && (<section className="space-y-4 border-y border-blue-100 bg-[#EFF6FF]/75 px-4 py-6 sm:px-5">
  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><span className="material-symbols-outlined text-[20px]">donut_large</span></div>
      <div><h2 className="text-base font-bold text-slate-950 md:text-lg">Điểm đối chiếu tổng hợp</h2><p className="text-xs text-slate-500">Tổng tối đa 100 điểm, quy đổi về thang 10</p></div>
    </div>
    <p className="max-w-md text-xs leading-5 text-slate-500">Điểm số dùng để nhận diện điểm mạnh và đánh đổi, không phải thứ hạng trường.</p>
  </div>
  <div className={`grid overflow-hidden rounded-lg border border-slate-200 bg-white ${selectedChoices.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
    {selectedChoices.map(({ university, major, fitScore }, index) => {
      const colors = ['#1D4ED8', '#0F766E', '#D97706', '#A93349']
      return <div className="flex items-center gap-3 border-b border-slate-200 p-4 last:border-b-0 sm:flex-col sm:justify-center sm:border-b-0 sm:border-r sm:text-center sm:last:border-r-0" key={university.id}>
        <DonutChart value={fitScore} label={`Điểm phù hợp ${university.shortName ?? university.name}`} color={colors[index]} />
        <div className="min-w-0 space-y-1">
          <UniversityLabel university={university}><strong className="block truncate text-sm text-slate-900">{university.shortName ?? university.code}</strong></UniversityLabel>
          <p className="truncate text-[11px] font-medium text-slate-500">{major?.name ?? 'Chưa chọn ngành'}</p>
        </div>
      </div>
    })}
  </div>
</section>)}

<div className="sticky top-[72px] z-30 -mx-4 border-y border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-md md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
<div ref={tabsRef} className="mx-auto flex max-w-[1320px] items-center gap-1 overflow-x-auto py-0.5 text-xs font-semibold hide-scrollbar">
{comparisonTabs.map(([id, icon, label]) => <a className={`flex min-h-9 shrink-0 items-center gap-1.5 rounded-md px-3 transition-colors ${activeTab === id ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`} data-comparison-tab={id} href={`#${id}`} key={id} onClick={(event) => handleTabClick(event, id)}><span className="material-symbols-outlined text-[16px]">{icon}</span><span>{label}</span></a>)}
{selectedUniversities.length < 4 && <button aria-label={`Thêm trường thứ ${selectedUniversities.length + 1}`} className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-md border border-dashed border-slate-300 text-slate-500 transition hover:border-blue-400 hover:text-blue-700" onClick={(event) => { event.stopPropagation(); setPickerSlot(selectedUniversities.length) }} type="button"><span className="material-symbols-outlined text-[17px]">add</span></button>}
</div>
</div>

<div className="divide-y divide-slate-200 border-b border-slate-200 bg-white/55 px-4 sm:px-6">

<section className="-mx-4 scroll-mt-36 space-y-5 bg-blue-50/35 px-4 py-8 sm:-mx-6 sm:px-6" id="section-overview">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">Tổng quan nhanh</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="01" icon="dashboard" title="Tổng quan nhanh" description="Đối chiếu danh tính, mô hình tổ chức và ngành đang chọn tại từng trường." aside={<span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold">Dữ liệu tuyển sinh 2025</span>} />
<div className="overflow-x-auto">
<table className="min-w-[880px] w-full text-left text-xs md:text-sm border-collapse">
<thead>
<tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 text-xs">
<th className="py-3 px-4 min-w-48 font-semibold uppercase tracking-wider text-[11px]">Thuộc tính đối chiếu</th>
{selectedChoices.map(({ university }, index) => <th className="min-w-48 px-4 py-3 font-bold text-slate-950" key={university.id}><Tooltip label={university.name}><span tabIndex="0">{university.shortName ?? university.name} · {index + 1}</span></Tooltip></th>)}
</tr>
</thead>
<tbody className="divide-y divide-slate-100">
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3.5 px-4 font-semibold text-slate-700">Mã trường &amp; Trực thuộc</td>
{selectedChoices.map(({ university }) => <td className="py-3.5 px-4 font-bold text-slate-900" key={university.id}>{university.code} • {university.parentSystem ?? university.ownershipLabel}</td>)}
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3.5 px-4 font-semibold text-slate-700">Mô hình tổ chức</td>
{selectedChoices.map(({ university }) => <td className="py-3.5 px-4" key={university.id}><span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">{university.ownershipLabel}</span></td>)}
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3.5 px-4 font-semibold text-slate-700">Ngành đang đối chiếu</td>
{selectedChoices.map(({ university, major }) => <td className="py-3.5 px-4 text-slate-900 font-bold" key={university.id}>{major?.name ?? profile.major} {major?.code ? `(${major.code})` : ''}</td>)}
</tr>
</tbody>
</table>
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-emerald-50/40 px-4 py-8 sm:-mx-6 sm:px-6" id="section-budget">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">Học phí &amp; Ngân sách gia đình</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="02" icon="payments" title="Học phí và ngân sách" description="So sánh mức học phí trung bình với giới hạn gia đình đã thiết lập." aside={<Tooltip label="Ngưỡng tối đa trong hồ sơ tiêu chí"><span tabIndex="0" className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-800">Tối đa {profile.budget} triệu/năm</span></Tooltip>} />
<TuitionBarChart choices={selectedChoices} budget={profile.budget} />
<div className={`grid grid-cols-1 gap-2 ${selectedChoices.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => {
  const average = getTuitionAverage(university)
  const within = average !== null && average <= profile.budget
  return <div className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs ${within ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`} key={university.id}><UniversityLabel university={university}><strong>{university.shortName ?? university.code}</strong></UniversityLabel><span className="font-bold">{average === null ? 'Cần xác minh' : within ? `Còn ${Math.round(profile.budget - average)}tr` : `Vượt ${Math.round(average - profile.budget)}tr`}</span></div>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-amber-50/40 px-4 py-8 sm:-mx-6 sm:px-6" id="section-location">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">3. Vị trí và Cơ sở vật chất</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="03" icon="location_on" title="Vị trí và cơ sở" description="Kiểm tra mức thuận tiện so với khu vực học tập bạn ưu tiên." aside={<span className="font-semibold">Ưu tiên: {regionLabel(profile.regionId)}</span>} />
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => {
  const location = university.location?.campus
    ? `${university.location.campus}, ${university.location.city}`
    : university.location?.city ?? university.city
  const preferred = university.regionId === profile.regionId
  return <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100" key={university.id}><p className="font-bold text-slate-900">{university.shortName ?? university.name}</p><p className="text-slate-600 leading-relaxed"><strong>Vị trí:</strong> {location}. {university.parentSystem ? `Thuộc ${university.parentSystem}.` : ''}</p><span className={`inline-block text-[11px] font-semibold border rounded px-2 py-0.5 mt-2 ${preferred ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-800 bg-amber-50 border-amber-200'}`}>{preferred ? '✓ Nằm trong khu vực ưu tiên' : 'Cần cân nhắc khoảng cách di chuyển'}</span></div>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-[#F3F6FF] px-4 py-8 sm:-mx-6 sm:px-6" id="section-major">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">4. Ngành học và Định hướng đào tạo</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="04" icon="code" title="Ngành học và định hướng đào tạo" description="Xem nội dung ngành, kỹ năng chính và hướng nghề nghiệp tại từng trường." />
<div className={`grid grid-cols-1 gap-4 ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, detail }, index) => <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs md:text-sm" key={university.id}><div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${index === 2 ? 'bg-amber-600' : 'bg-[#1D4ED8]'}`} /><h3 className="font-bold text-slate-900">{university.shortName ?? university.code}: {major?.name}</h3></div><span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">{major?.code}</span></div><p className="text-slate-600 leading-relaxed text-xs">{detail?.summary ?? major?.description}</p><div className="flex flex-wrap gap-1.5">{major?.skills?.slice(0, 3).map((skill) => <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600" key={skill}>{skill}</span>)}</div><p className="text-[11px] text-blue-700 font-semibold bg-blue-50 p-2 rounded-lg border border-blue-100">Hướng nghề: {major?.careerPaths?.slice(0, 2).join(' · ') || detail?.careers?.items?.slice(0, 2).map((career) => career.title).join(' · ')}</p></div>)}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-rose-50/30 px-4 py-8 sm:-mx-6 sm:px-6" id="section-admission">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">5. Tuyển sinh &amp; Điểm chuẩn tham khảo</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="05" icon="how_to_reg" title="Tuyển sinh và điểm tham chiếu" description="Đặt điểm hồ sơ cạnh khoảng điểm gần nhất có cấu trúc của từng trường." aside={<span className="font-semibold">THPT {profile.thptScore} · ĐGNL {profile.competencyScore}</span>} />
<p className="text-xs text-slate-500 italic">* Dữ liệu tuyển sinh tham khảo 2024–2025. Điểm các năm trước chỉ dùng để tham khảo và không bảo đảm kết quả trúng tuyển năm hiện tại.</p>
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major }) => {
  const range = university.admission?.scoreRange
  const aboveMax = range?.max ? profile.thptScore - range.max : null
  const assessment = aboveMax === null ? 'Cần xem điều kiện từng phương thức' : aboveMax >= 0 ? 'Hồ sơ đang cao hơn mức tham chiếu' : aboveMax >= -2 ? 'Nằm trong vùng cần cạnh tranh' : 'Nên chuẩn bị thêm phương thức dự phòng'
  return <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4" key={university.id}>
    <div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-slate-900 text-sm">{university.shortName ?? university.name}</h3><p className="mt-1 text-[11px] font-semibold text-slate-500">THPT {university.admission?.academicYear ?? universitiesData.metadata.admissionReferenceYear}</p></div><span className="max-w-28 truncate rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">{major?.name}</span></div>
    <div className="mt-3 rounded-xl border border-blue-100 bg-white p-3"><AdmissionRangeTrack university={university} score={profile.thptScore} /></div>
    <div className={`mt-3 rounded-lg px-2.5 py-2 text-[11px] font-bold ${aboveMax !== null && aboveMax >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-900'}`}>{assessment}</div>
  </div>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-amber-50/30 px-4 py-8 sm:-mx-6 sm:px-6" id="section-scholarships">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">6. Học bổng và Hỗ trợ tài chính</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="06" icon="workspace_premium" title="Học bổng và hỗ trợ tài chính" description="Mở nguồn chính thức của từng trường để kiểm tra điều kiện và thời hạn mới nhất." />
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3" key={university.id}><div className="min-w-0"><UniversityLabel university={university}><h3 className="truncate font-bold text-slate-900">{university.shortName ?? university.name}</h3></UniversityLabel><Tooltip label="UniView chưa có dữ liệu học bổng có cấu trúc; hãy kiểm tra nguồn chính thức"><span tabIndex="0" className="mt-1 inline-flex rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">Cần xác minh</span></Tooltip></div><a aria-label={`Xem học bổng tại ${university.name}`} className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1D4ED8] shadow-xs hover:bg-blue-50" href={university.website} target="_blank" rel="noreferrer"><span className="material-symbols-outlined text-[18px]">open_in_new</span></a></div>)}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-blue-50/45 px-4 py-8 sm:-mx-6 sm:px-6" id="section-fit">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">7. Cách tính điểm đối chiếu</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="07" icon="tune" title="Cách tính điểm đối chiếu" description="Điểm này hỗ trợ so sánh theo hồ sơ đã nhập, không phải xác suất trúng tuyển hay kết luận trường phù hợp tuyệt đối." aside={<button className="font-bold text-blue-700 hover:underline" onClick={() => { setProfileDraft(profile); setProfileOpen(true) }} type="button">Chỉnh tiêu chí</button>} />
<div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
  <div className="flex flex-col gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
    <div><h3 className="text-sm font-bold text-slate-950">Công thức: (Ngành + Ngân sách + Khu vực + Tuyển sinh) / 10</h3><p className="mt-1 text-[11px] leading-4 text-slate-500">Tổng tối đa 100 điểm. Ví dụ 88 điểm được hiển thị thành 8,8/10.</p></div>
    <span className="shrink-0 text-xs font-bold text-blue-700">25 + 30 + 20 + 25 = 100 điểm</span>
  </div>
  <div className="grid gap-px bg-slate-200 text-xs md:grid-cols-2 xl:grid-cols-4">
    <div className="bg-blue-50 p-4"><div className="flex items-center justify-between"><strong className="inline-flex items-center gap-1.5 text-slate-950"><span className="material-symbols-outlined text-[17px] text-blue-600">school</span>Ngành học</strong><span className="font-black text-blue-700">25 điểm</span></div><ul className="mt-2 space-y-1.5 leading-5 text-slate-600"><li>Đúng ngành mục tiêu: <strong>25</strong></li><li>Cùng nhóm ngành: <strong>16</strong></li><li>Khác nhóm ngành: <strong>7</strong></li></ul></div>
    <div className="bg-emerald-50 p-4"><div className="flex items-center justify-between"><strong className="inline-flex items-center gap-1.5 text-slate-950"><span className="material-symbols-outlined text-[17px] text-emerald-600">payments</span>Ngân sách</strong><span className="font-black text-emerald-700">30 điểm</span></div><ul className="mt-2 space-y-1.5 leading-5 text-slate-600"><li>Không vượt ngân sách: <strong>30</strong></li><li>Vượt: <strong>30 × (1 - số tiền vượt/ngân sách)</strong>, tối thiểu 0</li><li>Thiếu học phí: tạm tính <strong>22,5</strong></li></ul></div>
    <div className="bg-amber-50 p-4"><div className="flex items-center justify-between"><strong className="inline-flex items-center gap-1.5 text-slate-950"><span className="material-symbols-outlined text-[17px] text-amber-600">location_on</span>Khu vực</strong><span className="font-black text-amber-700">20 điểm</span></div><ul className="mt-2 space-y-1.5 leading-5 text-slate-600"><li>Đúng khu vực ưu tiên: <strong>20</strong></li><li>Khác khu vực ưu tiên: <strong>6</strong></li></ul></div>
    <div className="bg-rose-50 p-4"><div className="flex items-center justify-between"><strong className="inline-flex items-center gap-1.5 text-slate-950"><span className="material-symbols-outlined text-[17px] text-rose-600">how_to_reg</span>Tuyển sinh</strong><span className="font-black text-rose-700">25 điểm</span></div><ul className="mt-2 space-y-1.5 leading-5 text-slate-600"><li>Từ mức trên trở lên: <strong>25</strong></li><li>Cách mức trên không quá 2 điểm: <strong>19</strong></li><li>Trong khoảng tham chiếu: <strong>13</strong></li><li>Dưới khoảng: <strong>6</strong> · Thiếu dữ liệu: <strong>12</strong></li></ul></div>
  </div>
</div>
<p className="flex items-start gap-2 text-[11px] leading-5 text-slate-500"><span className="material-symbols-outlined mt-0.5 text-[15px] text-amber-600">info</span><span>Điểm tuyển sinh đang dùng khoảng tham chiếu có cấu trúc của trường. Cần mở đề án chính thức để xác minh điểm riêng của ngành và chương trình đã chọn.</span></p>
<div className={`grid grid-cols-1 gap-4 ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, fitScore, fitBreakdown }) => {
  return <div className={`rounded-2xl bg-white p-4 shadow-sm ${fitScore >= 8 ? 'border border-blue-200' : fitScore >= 6.5 ? 'border border-slate-200' : 'border border-amber-200'}`} key={university.id}>
    <div className="mb-4 flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
      <div className="min-w-0"><UniversityLabel university={university}><h3 className="truncate text-sm font-bold text-slate-900">{university.shortName ?? university.name}</h3></UniversityLabel><p className="mt-0.5 truncate text-[11px] text-slate-500">{major?.name}</p></div>
      <Tooltip label="Tổng điểm bốn tiêu chí, chia 10"><span tabIndex="0" className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">{fitScore}/10</span></Tooltip>
    </div>
    <div className="space-y-3">
      {fitBreakdown.metrics.map((metric) => <MetricProgress key={metric.label} {...metric} />)}
    </div>
  </div>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-orange-50/35 px-4 py-8 sm:-mx-6 sm:px-6" id="section-tradeoffs">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">8. Trade-offs cốt lõi bạn cần cân nhắc</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="08" icon="balance" title="Lợi thế và điểm đánh đổi" description="Mỗi lựa chọn đều có điểm được và chi phí cơ hội cần cân nhắc trước khi xếp nguyện vọng." />
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, fitScore }) => {
  const tuitionAverage = university.tuition ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2 : null
  const advantage = fitScore >= 8 ? 'Cân bằng tốt giữa mục tiêu ngành, khu vực, tài chính và khả năng tuyển sinh.' : `Có thế mạnh đào tạo trong nhóm ${major?.category?.name ?? 'ngành đã chọn'}.`
  const tradeoff = tuitionAverage !== null && tuitionAverage > profile.budget
    ? `Học phí trung bình khoảng ${tuitionAverage} triệu/năm, vượt ngân sách dự kiến.`
    : university.regionId !== profile.regionId
      ? `Khác khu vực ưu tiên; cần tính chi phí sinh hoạt và di chuyển.`
      : normalizeText(major?.name) !== normalizeText(profile.major)
        ? `Ngành ${major?.name} chưa trùng hoàn toàn mục tiêu ${profile.major}.`
        : 'Mức cạnh tranh tuyển sinh cần được theo dõi theo đề án năm hiện tại.'
  return <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3" key={university.id}><div className="flex items-center justify-between gap-2"><h3 className="font-bold text-slate-900">{university.shortName ?? university.name} ({major?.name})</h3><span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">{fitScore}/10</span></div><div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-2.5 text-xs text-emerald-900"><strong>Điểm được:</strong> {advantage}</div><div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-2.5 text-xs text-amber-950"><strong>Đánh đổi:</strong> {tradeoff}</div></div>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-slate-50 px-4 py-8 sm:-mx-6 sm:px-6" id="section-missing-info">{isRealMode ? <><h2 className="text-base md:text-lg font-bold text-slate-900">9. Nguồn &amp; mức bằng chứng</h2><DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} /></> : <>
<SectionHeader number="09" icon="fact_check" title="Nguồn dữ liệu và việc cần kiểm chứng" description="Biết thông tin nào đã có nguồn chi tiết và thông tin nào cần mở đề án chính thức để xác nhận." aside={<span className="font-semibold">Cập nhật {formatVerifiedDate(universitiesData.metadata.verifiedAt)}</span>} />
<div className="flex flex-col gap-3 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-xs text-amber-950 sm:flex-row sm:items-center sm:justify-between">
  <p className="max-w-4xl leading-5"><strong>Phạm vi dữ liệu:</strong> {universitiesData.metadata.annualDataPolicy}</p>
  <div className="flex shrink-0 flex-wrap gap-3 font-bold"><span>Học phí {universitiesData.metadata.tuitionAcademicYear}</span><span>Tuyển sinh {universitiesData.metadata.admissionReferenceYear}</span></div>
</div>
<div className={`grid grid-cols-1 gap-4 text-xs ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major }) => {
  const tuitionSpecific = isSpecificSource(university.tuition?.sourceUrl, university.source?.officialWebsite)
  const admissionSpecific = isSpecificSource(university.admission?.sourceUrl, university.source?.officialWebsite)
  const detailedSources = Number(tuitionSpecific) + Number(admissionSpecific)
  return <article className="overflow-hidden rounded-lg border border-slate-200 bg-white" key={university.id}>
    <div className="flex items-start justify-between gap-2 bg-slate-50 px-4 py-3">
      <div className="min-w-0"><UniversityLabel university={university}><h3 className="truncate text-sm font-bold text-slate-950">{university.shortName ?? university.code}</h3></UniversityLabel><p className="mt-0.5 text-[10px] text-slate-500">Danh tính xác minh {formatVerifiedDate(university.source?.identityVerifiedAt)}</p></div>
      <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black ${detailedSources === 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}><span className="material-symbols-outlined text-[13px]">{detailedSources === 2 ? 'verified' : 'pending'}</span>{detailedSources}/2 nguồn chi tiết</span>
    </div>
    <div className="divide-y divide-slate-100 px-4">
      <div className="py-3"><div className="flex items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 font-bold text-slate-700"><span className={`material-symbols-outlined text-[16px] ${tuitionSpecific ? 'text-emerald-600' : 'text-amber-600'}`}>{tuitionSpecific ? 'check_circle' : 'error'}</span>Học phí</span><a aria-label={`Mở nguồn học phí ${university.name}`} className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline" href={university.tuition?.sourceUrl ?? university.website} target="_blank" rel="noreferrer">Mở nguồn<span className="material-symbols-outlined text-[14px]">open_in_new</span></a></div><p className="mt-1 font-black text-slate-950">{university.tuition ? `${university.tuition.minMillionVnd}–${university.tuition.maxMillionVnd} triệu/năm` : 'Chưa có dữ liệu'}</p><p className="mt-1 text-[10px] text-slate-500">{university.tuition?.academicYear} · {tuitionSpecific ? 'Trang dữ liệu chi tiết' : 'Website chính thức tổng quát'}</p></div>
      <div className="py-3"><div className="flex items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 font-bold text-slate-700"><span className={`material-symbols-outlined text-[16px] ${admissionSpecific ? 'text-emerald-600' : 'text-amber-600'}`}>{admissionSpecific ? 'check_circle' : 'error'}</span>Tuyển sinh</span><a aria-label={`Mở nguồn tuyển sinh ${university.name}`} className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline" href={university.admission?.sourceUrl ?? university.website} target="_blank" rel="noreferrer">Mở nguồn<span className="material-symbols-outlined text-[14px]">open_in_new</span></a></div><p className="mt-1 font-black text-slate-950">{university.admission?.scoreRange?.label ?? 'Chưa có khoảng điểm'}</p><p className="mt-1 text-[10px] text-slate-500">{university.admission?.academicYear} · {admissionSpecific ? 'Trang dữ liệu chi tiết' : 'Website chính thức tổng quát'}</p></div>
    </div>
    <div className="border-t border-amber-200 bg-amber-50 px-4 py-3 text-[10px] font-semibold leading-4 text-amber-950"><strong>Còn thiếu:</strong> chỉ tiêu và điểm riêng ngành {major?.name}; học bổng; học phí đúng chương trình.</div>
  </article>
})}
</div>
</>}</section>

<section className="-mx-4 scroll-mt-36 space-y-5 bg-emerald-50/25 px-4 py-8 sm:-mx-6 sm:px-6" id="section-notes">
<SectionHeader number="10" icon="edit_note" title="Ghi chú cá nhân" description="Ghi lại điều bạn muốn hỏi thêm hoặc lý do giữ từng trường trong danh sách." aside={<span className="font-semibold">Lưu cùng bảng so sánh</span>} />
<div className={`grid grid-cols-1 gap-4 ${selectedUniversities.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedUniversities.map((university) => (
  <div className="space-y-2 text-xs" key={university.id}>
    <label className="font-bold text-slate-900" htmlFor={`comparison-note-${university.id}`}>{university.shortName ?? university.code}</label>
    <textarea className="min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 leading-relaxed text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" id={`comparison-note-${university.id}`} value={notes[university.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [university.id]: event.target.value }))} placeholder="Điều cần hỏi thêm, cảm nhận hoặc ưu tiên của bạn..." />
  </div>
))}
</div>
</section>

<div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-6 sm:flex-row">
<div className="space-y-1 text-center sm:text-left"><h3 className="text-sm font-bold text-slate-950 md:text-base">Sẵn sàng xếp thứ tự nguyện vọng?</h3><p className="text-xs leading-5 text-slate-500">Đưa {selectedUniversities.length} lựa chọn vào Decision Board để tiếp tục sắp xếp và lập kế hoạch.</p></div>
<div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
<button className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300" onClick={() => window.print()} type="button"><span className="material-symbols-outlined text-[18px] text-slate-500">download</span>Xuất PDF</button>
<button className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 text-xs font-semibold text-white transition hover:bg-blue-700 md:text-sm" onClick={addToDecisionBoard} type="button">
<span>Đưa {selectedUniversities.length} lựa chọn này vào Decision Board</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>

{pickerSlot !== null && (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Chọn trường để so sánh">
    <div className="max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div><h2 className="text-lg font-bold text-slate-900">Chọn trường đại học</h2><p className="mt-1 text-xs text-slate-500">Thay lựa chọn {pickerSlot + 1} trong bảng so sánh</p></div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200" onClick={() => setPickerSlot(null)} type="button" aria-label="Đóng">×</button>
      </div>
      <div className="grid max-h-[64vh] gap-2 overflow-y-auto p-4 sm:grid-cols-2">
        {isRealMode && <DataUnavailable loading={catalog.loading} error={catalog.error} retry={catalog.retry} />}
        {allUniversities
          .filter((university) => !selectedIds.includes(university.id) || selectedIds[pickerSlot] === university.id)
          .map((university) => (
            <button className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50" key={university.id} onClick={(event) => { event.stopPropagation(); chooseUniversity(university.id) }} type="button">
              <div className="flex items-start justify-between gap-3"><Tooltip label={university.name}><span tabIndex="0" className="line-clamp-2 text-sm font-bold text-slate-900">{university.name}</span></Tooltip><span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">{university.code}</span></div>
              <p className="mt-1 text-xs text-slate-500">{university.city} · {university.ownershipLabel}</p>
              <p className="mt-2 line-clamp-1 text-xs font-medium text-[#1D4ED8]">{university.featuredMajors?.join(' · ')}</p>
            </button>
          ))}
      </div>
    </div>
  </div>
)}

{majorPickerUniversityId && (() => {
  const choice = selectedChoices.find(({ university }) => university.id === majorPickerUniversityId)
  if (!choice) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Chọn ngành để so sánh">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div><h2 className="text-lg font-bold text-slate-900">Chọn ngành tại {choice.university.shortName ?? choice.university.name}</h2><p className="mt-1 text-xs text-slate-500">Danh sách lấy từ các ngành nổi bật trong dữ liệu trường.</p></div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200" onClick={() => setMajorPickerUniversityId(null)} type="button" aria-label="Đóng">×</button>
        </div>
        <div className="grid max-h-[60vh] gap-2 overflow-y-auto p-4">
          {choice.availableMajors.map((major) => {
            const detail = majorDetails.find((item) => item.id === major.id)
            return (
              <button className={`rounded-2xl border p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50 ${choice.major?.id === major.id ? 'border-blue-300 bg-blue-50/60' : 'border-slate-200'}`} key={major.id} onClick={(event) => { event.stopPropagation(); chooseMajor(major.id) }} type="button">
                <div className="flex items-start justify-between gap-3"><div><span className="text-sm font-bold text-slate-900">{major.name}</span><p className="mt-1 text-xs text-slate-500">{major.category.name} · Mã ngành {major.code}</p></div>{choice.major?.id === major.id && <span className="material-symbols-outlined text-[20px] text-blue-600">check_circle</span>}</div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{detail?.summary ?? major.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
})()}

{profileOpen && (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Chỉnh sửa hồ sơ tiêu chí">
    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
      <div className="mb-5 flex items-start justify-between"><div><h2 className="text-xl font-bold text-slate-900">Hồ sơ tiêu chí</h2><p className="mt-1 text-sm text-slate-500">Kết quả phù hợp sẽ cập nhật theo các giá trị này.</p></div><button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100" onClick={() => setProfileOpen(false)} type="button">×</button></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-semibold text-slate-700">Ngân sách tối đa (triệu/năm)<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" min="0" type="number" value={profileDraft.budget} onChange={(event) => setProfileDraft((current) => ({ ...current, budget: Number(event.target.value) }))} /></label>
        <label className="space-y-1.5 text-sm font-semibold text-slate-700">Khu vực<select className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" value={profileDraft.regionId} onChange={(event) => setProfileDraft((current) => ({ ...current, regionId: event.target.value }))}><option value="ho-chi-minh-city">TP. Hồ Chí Minh</option><option value="ha-noi">Hà Nội</option><option value="central">Miền Trung</option><option value="south">Miền Nam</option></select></label>
        <label className="space-y-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">Ngành mong muốn<select className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" value={profileDraft.major} onChange={(event) => setProfileDraft((current) => ({ ...current, major: event.target.value }))}>{allMajors.map((major) => <option value={major.name} key={major.id}>{major.name} · {major.code}</option>)}</select></label>
        <label className="space-y-1.5 text-sm font-semibold text-slate-700">Điểm THPT<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" min="0" max="30" step="0.1" type="number" value={profileDraft.thptScore} onChange={(event) => setProfileDraft((current) => ({ ...current, thptScore: Number(event.target.value) }))} /></label>
        <label className="space-y-1.5 text-sm font-semibold text-slate-700">Điểm ĐGNL<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" min="0" max="1200" type="number" value={profileDraft.competencyScore} onChange={(event) => setProfileDraft((current) => ({ ...current, competencyScore: Number(event.target.value) }))} /></label>
      </div>
      <div className="mt-6 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100" onClick={() => setProfileOpen(false)} type="button">Hủy</button><button className="rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700" onClick={saveProfile} type="button">Áp dụng tiêu chí</button></div>
    </div>
  </div>
)}

{toast && <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-[#172033] px-5 py-3 text-sm font-semibold text-white shadow-xl">{toast}</div>}
</main>
  )
}

export default UniversityComparisonPage
