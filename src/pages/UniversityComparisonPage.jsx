import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import majorDetails from '../data/majorDetails.json'
import majors from '../data/majors.json'
import universitiesData from '../data/universities.json'

const DEFAULT_UNIVERSITY_IDS = ['uit-vnuhcm', 'hcmut-vnuhcm', 'fpt-university-hcm']

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

const comparisonTabs = [
  ['section-overview', 'dashboard', '1. Tổng quan'],
  ['section-budget', 'payments', '2. Học phí & Ngân sách'],
  ['section-location', 'location_on', '3. Vị trí & Cơ sở'],
  ['section-major', 'code', '4. Ngành học & Đào tạo'],
  ['section-admission', 'how_to_reg', '5. Tuyển sinh & Điểm'],
  ['section-scholarships', 'workspace_premium', '6. Học bổng'],
  ['section-fit', 'tune', '7. Độ tương thích'],
  ['section-tradeoffs', 'balance', '8. Trade-offs'],
  ['section-missing-info', 'fact_check', '9. Checklist'],
  ['section-notes', 'edit_note', '10. Ghi chú'],
]

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

const calculateFitScore = ({ university, major }, profile) => {
  const tuitionAverage = getTuitionAverage(university) ?? profile.budget * 1.25
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

  return Math.round((budgetScore + locationScore + majorScore + admissionScore)) / 10
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

function UniversityComparisonPage() {
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = localStorage.getItem('uniview:comparison:universities')
    return saved ? JSON.parse(saved) : DEFAULT_UNIVERSITY_IDS
  })
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('uniview:comparison:profile')
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE
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
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('uniview:comparison:notes')
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedMajorIds, setSelectedMajorIds] = useState(() => {
    const saved = localStorage.getItem('uniview:comparison:majors')
    return saved ? { ...DEFAULT_MAJOR_IDS, ...JSON.parse(saved) } : DEFAULT_MAJOR_IDS
  })

  const selectedUniversities = useMemo(() => selectedIds
    .map((id) => universitiesData.universities.find((university) => university.id === id))
    .filter(Boolean), [selectedIds])
  const selectedChoices = useMemo(() => selectedUniversities.map((university) => {
    const availableMajors = findMajorsForUniversity(university)
    const major = availableMajors.find((item) => item.id === selectedMajorIds[university.id])
      ?? availableMajors[0]
    const detail = majorDetails.find((item) => item.id === major?.id)

    return {
      university,
      major,
      detail,
      availableMajors,
      fitScore: calculateFitScore({ university, major }, profile),
    }
  }), [profile, selectedMajorIds, selectedUniversities])

  useEffect(() => {
    const sections = comparisonTabs
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

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
    localStorage.setItem('uniview:comparison:universities', JSON.stringify(selectedIds))
    localStorage.setItem('uniview:comparison:profile', JSON.stringify(profile))
    localStorage.setItem('uniview:comparison:majors', JSON.stringify(selectedMajorIds))
    localStorage.setItem('uniview:comparison:notes', JSON.stringify(notes))
    showToast('Đã lưu bảng so sánh trên thiết bị này')
  }

  const chooseUniversity = (universityId) => {
    const university = universitiesData.universities.find((item) => item.id === universityId)
    const firstMajor = university ? findMajorsForUniversity(university)[0] : null
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
    localStorage.setItem('uniview:comparison:profile', JSON.stringify(profileDraft))
    setProfileOpen(false)
    showToast('Đã cập nhật tiêu chí cá nhân')
  }

  const addToDecisionBoard = () => {
    localStorage.setItem('uniview:decision-board:universities', JSON.stringify(selectedChoices.map(({ university, major }) => ({ universityId: university.id, majorId: major?.id }))))
    localStorage.setItem('uniview:comparison:notes', JSON.stringify(notes))
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
  return (
<main className="w-full bg-[#F8FAFC] min-h-[calc(100vh-80px)] pb-20 font-['Be_Vietnam_Pro'] text-slate-800"><div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 pt-5 space-y-6">

<div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-sm space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm text-slate-500">
<div className="flex items-center flex-wrap gap-2">
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Trang chủ</a>
<span className="text-slate-300">/</span>
<a className="hover:text-[#1D4ED8] transition-colors" href="#">Công cụ tuyển sinh</a>
<span className="text-slate-300">/</span>
<span className="text-slate-900 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-md">So sánh đa chiều</span>
</div>
<div className="flex items-center gap-2 self-start sm:self-auto">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 font-bold text-xs tracking-wider">
<span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
<span>DỰA TRÊN HỒ SƠ CỦA BẠN</span>
</span>
<span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-medium">Personalized Compare ({selectedUniversities.length} trường đang chọn)</span>
</div>
</div>
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pt-1 border-t border-slate-100">
<div className="space-y-2.5 max-w-3xl">
<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">So sánh các lựa chọn của bạn</h1>
<p className="text-slate-600 text-sm md:text-base leading-relaxed">Đối chiếu các trường đại học dựa trên hồ sơ học tập, ngành học, ngân sách và định hướng tương lai.</p>
<p className="flex items-center gap-2 pt-1 text-xs text-amber-900 bg-amber-50/90 border border-amber-200/80 rounded-xl px-3.5 py-2 font-medium"><span className="text-base shrink-0">💡</span><span><strong>Nguyên tắc khách quan:</strong> UniView không chọn “trường thắng”. Bạn là người hiểu rõ mục tiêu và đưa ra quyết định cuối cùng.</span></p>
</div>
<div className="flex flex-wrap items-center gap-2.5 shrink-0">
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm" onClick={() => { setProfileDraft(profile); setProfileOpen(true) }} type="button">
<svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span>Chỉnh sửa hồ sơ tiêu chí</span>
</button>
<button className="bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs md:text-sm border border-slate-200 rounded-xl px-3 py-2.5 transition-all inline-flex items-center gap-1.5 shadow-xs hover:border-slate-300" onClick={shareComparison} type="button"><span className="material-symbols-outlined text-[18px] text-slate-500">share</span><span className="hidden sm:inline">Chia sẻ</span></button>
<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 rounded-xl px-4 py-2.5 transition-colors inline-flex items-center gap-2 shadow-sm" onClick={saveComparison} type="button">
<svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
<span>Lưu bảng so sánh</span>
</button>
</div>
</div>
</div>

<div className={`grid grid-cols-1 gap-5 items-stretch ${selectedUniversities.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, fitScore }, index) => {
  const tuitionAverage = university.tuition ? Math.round((university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2) : null
  const withinBudget = tuitionAverage !== null && tuitionAverage <= profile.budget
  const initials = university.shortName === 'FPTU' ? 'FPT' : university.shortName ?? university.code
  const locationLabel = university.location?.campus
    ? `${university.location.campus}, ${university.location.city}`
    : university.location?.city ?? university.city
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between relative transition-all ${index === 0 ? 'border-2 border-[#1D4ED8] ring-4 ring-blue-50/70' : index === 2 ? 'border border-amber-200/90' : 'border border-slate-200/90 hover:border-slate-300'}`} key={university.id}>
      <div className={`absolute -top-3 left-4 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wide flex items-center gap-1 ${index === 0 ? 'bg-[#1D4ED8]' : index === 2 ? 'bg-amber-600' : 'bg-slate-700'}`}><span className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-white' : 'bg-emerald-400'}`} />Lựa chọn {index + 1}</div>
      <div className="space-y-3 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-11 h-11 shrink-0 rounded-xl border flex items-center justify-center font-bold text-base shadow-xs ${index === 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : index === 2 ? 'bg-amber-50 border-amber-200 text-orange-600' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>{initials}</div>
            <div className="min-w-0"><Tooltip label={university.name}><span tabIndex="0" className="block truncate text-base font-bold leading-snug text-slate-900">{university.name}</span></Tooltip><p className="text-xs text-slate-500 font-medium truncate">{university.parentSystem ?? university.ownershipLabel} • Mã: {university.code}</p></div>
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
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${index === 2 ? 'bg-amber-50/50 border-amber-100' : index === 0 ? 'bg-blue-50/40 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
          <div><p className={`text-[10px] uppercase font-bold tracking-wider ${index === 2 ? 'text-amber-700' : index === 0 ? 'text-blue-600' : 'text-slate-500'}`}>Chương trình xét</p><p className="text-xs font-bold text-slate-900">{major?.name ?? profile.major}</p></div>
          <button className="text-[11px] text-blue-600 font-bold hover:underline" onClick={(event) => { event.stopPropagation(); setMajorPickerUniversityId(university.id) }} type="button">Đổi ngành</button>
        </div>
        <div className="text-xs text-slate-600 space-y-1.5 pt-1">
          <p className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${index === 2 ? 'bg-amber-500' : 'bg-blue-500'}`} />{university.ownershipLabel} • {locationLabel}</p>
          <p className={`flex items-center gap-2 font-medium ${withinBudget ? 'text-slate-700' : 'text-amber-900'}`}><span className={`w-2 h-2 rounded-full ${withinBudget ? 'bg-emerald-500' : 'bg-rose-500'}`} />Học phí: ~{tuitionAverage ?? '—'} triệu / năm <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${withinBudget ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200'}`}>{withinBudget ? 'Trong ngân sách' : `Vượt +${Math.max(0, tuitionAverage - profile.budget)}tr`}</span></p>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <Tooltip label="Điểm tổng hợp từ ngành mục tiêu, ngân sách, khu vực và dữ liệu tuyển sinh">
          <span tabIndex="0" className={`font-bold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1 ${fitScore >= 8 ? 'text-blue-700 bg-blue-50 border-blue-200/80' : fitScore >= 6.5 ? 'text-slate-700 bg-slate-100 border-slate-200' : 'text-amber-900 bg-amber-50 border-amber-200/80'}`}><span className="material-symbols-outlined text-[15px]">{fitScore >= 6.5 ? 'verified' : 'warning'}</span>Phù hợp {fitScore}/10</span>
        </Tooltip>
        <span className="text-slate-400 text-[11px] text-right">{university.admission?.scoreRange?.label ?? 'Xem đề án tuyển sinh'}</span>
      </div>
    </div>
  )
})}

{selectedUniversities.length < 4 && <button className="border-2 border-dashed border-slate-300 rounded-2xl p-5 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]" onClick={(event) => { event.stopPropagation(); setPickerSlot(selectedUniversities.length) }} type="button">
<div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-3 group-hover:text-[#1D4ED8]">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<p className="text-sm font-bold text-slate-800">+ Thêm trường thứ {selectedUniversities.length + 1}</p>
<p className="text-xs text-slate-500 mt-1 max-w-[180px]">Tối đa 4 trường để đảm bảo góc nhìn so sánh tập trung nhất</p>
</button>}
</div>

<section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-2xl border border-blue-200/70 p-5 md:p-6 shadow-sm space-y-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">psychology</span></div>
      <div><h2 className="text-base md:text-lg font-bold text-slate-900">Tổng quan mức độ phù hợp với hồ sơ của bạn</h2><p className="text-xs text-slate-500">Đối chiếu tự động giữa mục tiêu học sinh và dữ liệu {selectedUniversities.length} trường</p></div>
    </div>
    <button className="text-xs font-semibold text-[#1D4ED8] hover:text-blue-700 flex items-center gap-1 hover:underline" onClick={() => { setProfileDraft(profile); setProfileOpen(true) }} type="button"><span>Cập nhật thông tin hồ sơ</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 pt-1 text-xs">
    <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
      <span className="font-bold text-slate-700 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-emerald-600">payments</span>Ngân sách (≤ {profile.budget} tr/năm)</span>
      <div className="space-y-1.5 pt-1">{selectedChoices.map(({ university }) => { const average = getTuitionAverage(university); const within = average !== null && average <= profile.budget; return <div className="flex items-center justify-between gap-2 text-[11px]" key={university.id}><span className="font-semibold text-slate-600"><UniversityLabel university={university} />:</span><span className={`font-bold px-2 py-0.5 rounded ${within ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>{within ? 'Thỏa mãn' : average === null ? 'Chưa có dữ liệu' : 'Vượt trần'}</span></div> })}</div>
    </div>
    <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
      <span className="font-bold text-slate-700 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-blue-600">award_star</span>Tuyển sinh (ĐGNL {profile.competencyScore}, THPT {profile.thptScore})</span>
      <div className="space-y-1.5 pt-1">{selectedChoices.map(({ university }) => <div className="flex items-center justify-between gap-2 text-[11px]" key={university.id}><span className="font-semibold text-slate-600"><UniversityLabel university={university} />:</span><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">{university.admission?.scoreRange?.max && profile.thptScore >= university.admission.scoreRange.max - 2 ? 'Có lợi thế' : 'Cần đối chiếu'}</span></div>)}</div>
    </div>
    <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
      <span className="font-bold text-slate-700 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-indigo-600">school</span>Định hướng đào tạo</span>
      <div className="space-y-1.5 pt-1">{selectedChoices.map(({ university, major }) => <div className="text-[11px] text-slate-700" key={university.id}><strong className="text-slate-900"><UniversityLabel university={university} />:</strong> {major?.name ?? 'Chưa chọn ngành'}</div>)}</div>
    </div>
    <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
      <span className="font-bold text-slate-700 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-amber-600">lightbulb</span>Lưu tâm & Hành động</span>
      <div className="space-y-1 pt-1 text-[11px] text-slate-600 leading-snug"><p>• Ưu tiên trường cân bằng tốt giữa đúng ngành, khả năng trúng tuyển và tài chính.</p><p>• Với lựa chọn vượt ngân sách, hãy xác minh học bổng trước khi xếp nguyện vọng.</p></div>
    </div>
  </div>
</section>

<div className="sticky top-[74px] z-30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-2 bg-white/[0.96] backdrop-blur-md border-y border-slate-200/80 shadow-sm space-y-2">
<div ref={tabsRef} className="max-w-[1360px] mx-auto flex items-center gap-2 overflow-x-auto hide-scrollbar text-xs font-semibold py-0.5">
{comparisonTabs.map(([id, icon, label]) => <a className={`px-3 py-1.5 rounded-lg shrink-0 transition-all duration-200 flex items-center gap-1 ${activeTab === id ? 'bg-[#1D4ED8] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'}`} data-comparison-tab={id} href={`#${id}`} key={id} onClick={(event) => handleTabClick(event, id)}><span className="material-symbols-outlined text-[15px]">{icon}</span><span>{label}</span></a>)}
{selectedUniversities.length < 4 && <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-700 shrink-0 transition-colors flex items-center gap-1" onClick={(event) => { event.stopPropagation(); setPickerSlot(selectedUniversities.length) }} type="button"><span className="material-symbols-outlined text-[15px]">add</span>Thêm trường thứ {selectedUniversities.length + 1}</button>}
</div>
</div>

<div className="space-y-6">

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-overview">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
<div><h2 className="text-base md:text-lg font-bold text-slate-900">Tổng quan nhanh</h2><p className="text-xs text-slate-500">Đối chiếu danh tính cơ bản và trạng thái đào tạo của từng trường</p></div>
</div>
<span className="text-xs text-slate-500 font-medium hidden sm:inline bg-slate-100 px-2.5 py-1 rounded-full">Cập nhật dữ liệu tuyển sinh 2025</span>
</div>
<div className="overflow-x-auto">
<table className="min-w-[880px] w-full text-left text-xs md:text-sm border-collapse">
<thead>
<tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 text-xs">
<th className="py-3 px-4 min-w-48 font-semibold uppercase tracking-wider text-[11px]">Thuộc tính đối chiếu</th>
{selectedChoices.map(({ university }, index) => <th className={`py-3 px-4 min-w-48 font-bold ${index === 0 ? 'text-[#1D4ED8] bg-blue-50/30' : index === 2 ? 'text-amber-950 bg-amber-50/20' : 'text-slate-900'}`} key={university.id}><Tooltip label={university.name}><span tabIndex="0">{university.shortName ?? university.name} (Lựa chọn {index + 1})</span></Tooltip></th>)}
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
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3.5 px-4 font-semibold text-slate-700">Học phí tham chiếu 2025</td>
{selectedChoices.map(({ university }) => { const average = getTuitionAverage(university); return <td className={`py-3.5 px-4 font-bold ${average !== null && average <= profile.budget ? 'text-emerald-700' : 'text-rose-700'}`} key={university.id}>{university.tuition ? `${university.tuition.minMillionVnd} – ${university.tuition.maxMillionVnd} triệu/năm` : 'Đang cập nhật'}</td> })}
</tr>
<tr className="hover:bg-slate-50/60 transition-colors">
<td className="py-3.5 px-4 font-semibold text-slate-700">Tuyển sinh tham chiếu</td>
{selectedChoices.map(({ university }) => <td className="py-3.5 px-4 text-slate-800" key={university.id}>{university.admission?.scoreRange?.label ?? university.admission?.methods?.[0]?.label ?? 'Xem đề án chính thức'}</td>)}
</tr>
</tbody>
</table>
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5" id="section-budget">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">2</span>
<div><h2 className="text-base md:text-lg font-bold text-slate-900">Học phí &amp; Ngân sách gia đình</h2><p className="text-xs text-slate-500">Đối chiếu định lượng trực tiếp với trần ngân sách thiết lập của bạn</p></div>
</div>
<Tooltip label="Ngưỡng tối đa bạn thiết lập trong Hồ sơ tiêu chí">
  <span tabIndex="0" className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Trần ngân sách: ≤ {profile.budget}.000.000 đ / năm</span>
</Tooltip>
</div>
<div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold text-slate-700 gap-1"><span>So sánh mức học phí năm thứ nhất (ước tính):</span><span className="text-rose-600 font-bold">Vạch đỏ: ngưỡng {profile.budget} triệu/năm</span></div>
  <div className="space-y-4">
    {selectedChoices.map(({ university, major }, index) => {
      const tuition = university.tuition ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2 : 0
      const within = tuition <= profile.budget
      return (
        <div className="space-y-1.5" key={university.id}>
          <div className="flex flex-col gap-1 text-xs sm:flex-row sm:justify-between"><span className="font-bold text-slate-900">{index + 1}. {university.shortName ?? university.name} — {major?.name}</span><span className={within ? 'font-extrabold text-emerald-700' : 'font-extrabold text-rose-700'}>{tuition || '—'} triệu/năm · {within ? 'Trong ngân sách' : `Vượt ${Math.max(0, Math.round(tuition - profile.budget))}tr`}</span></div>
          <div className="w-full bg-slate-200 h-5 rounded-full overflow-hidden relative shadow-xs">
            <div className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10" style={{ left: `${Math.min(profile.budget, 100)}%` }} />
            <div className={`h-full rounded-full transition-all duration-500 ${index === 0 ? 'bg-blue-600' : index === 2 ? 'bg-amber-500' : 'bg-slate-700'}`} style={{ width: `${Math.min(tuition, 100)}%` }} />
          </div>
        </div>
      )
    })}
  </div>
</div>
<div className={`grid grid-cols-1 gap-4 ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => {
  const average = university.tuition ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2 : null
  const within = average !== null && average <= profile.budget
  return <div className={`p-4 rounded-2xl border space-y-3 ${within ? 'bg-blue-50/40 border-blue-200/80' : 'bg-amber-50/60 border-amber-200'}`} key={university.id}><div className="flex items-center justify-between gap-2"><h3 className="font-bold text-slate-900 text-sm">{university.shortName ?? university.name}</h3><span className={`text-xs font-extrabold ${within ? 'text-[#1D4ED8]' : 'text-amber-900'}`}>{university.tuition ? `${university.tuition.minMillionVnd} – ${university.tuition.maxMillionVnd} tr/năm` : 'Đang cập nhật'}</span></div><p className="text-xs text-slate-600 leading-relaxed">{university.tuition?.note ?? 'Mức học phí thực tế phụ thuộc chương trình và năm học.'}</p><div className={`p-2 rounded-lg text-[11px] font-semibold border ${within ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>{within ? 'Nằm trong phạm vi ngân sách hiện tại.' : average === null ? 'Cần xác minh mức học phí.' : `Cần phương án tài chính cho phần vượt khoảng ${Math.round(average - profile.budget)} triệu/năm.`}</div></div>
})}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-location">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-blue-500"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">3. Vị trí và Cơ sở vật chất</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Khu vực mong muốn: {profile.regionId === 'ho-chi-minh-city' ? 'TP.HCM' : profile.regionId === 'ha-noi' ? 'Hà Nội' : profile.regionId === 'central' ? 'Miền Trung' : 'Miền Nam'}</span>
</div>
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => {
  const location = university.location?.campus
    ? `${university.location.campus}, ${university.location.city}`
    : university.location?.city ?? university.city
  const preferred = university.regionId === profile.regionId
  return <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100" key={university.id}><p className="font-bold text-slate-900">{university.shortName ?? university.name}</p><p className="text-slate-600 leading-relaxed"><strong>Vị trí:</strong> {location}. {university.parentSystem ? `Thuộc ${university.parentSystem}.` : ''}</p><span className={`inline-block text-[11px] font-semibold border rounded px-2 py-0.5 mt-2 ${preferred ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-800 bg-amber-50 border-amber-200'}`}>{preferred ? '✓ Nằm trong khu vực ưu tiên' : 'Cần cân nhắc khoảng cách di chuyển'}</span></div>
})}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-major">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">4. Ngành học và Định hướng đào tạo</h2>
</div>
<span className="text-xs text-slate-500 font-medium">So sánh triết lý môn học</span>
</div>
<div className={`grid grid-cols-1 gap-4 ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, detail }, index) => <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs md:text-sm" key={university.id}><div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${index === 2 ? 'bg-amber-600' : 'bg-[#1D4ED8]'}`} /><h3 className="font-bold text-slate-900">{university.shortName ?? university.code}: {major?.name}</h3></div><span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">{major?.code}</span></div><p className="text-slate-600 leading-relaxed text-xs">{detail?.summary ?? major?.description}</p><div className="flex flex-wrap gap-1.5">{major?.skills?.slice(0, 3).map((skill) => <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600" key={skill}>{skill}</span>)}</div><p className="text-[11px] text-blue-700 font-semibold bg-blue-50 p-2 rounded-lg border border-blue-100">Hướng nghề: {major?.careerPaths?.slice(0, 2).join(' · ') || detail?.careers?.items?.slice(0, 2).map((career) => career.title).join(' · ')}</p></div>)}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-admission">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-[#1D4ED8]"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">5. Tuyển sinh &amp; Điểm chuẩn tham khảo</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Hồ sơ: THPT {profile.thptScore} | ĐGNL {profile.competencyScore}</span>
</div>
<p className="text-xs text-slate-500 italic">* Dữ liệu tuyển sinh tham khảo 2024–2025. Điểm các năm trước chỉ dùng để tham khảo và không bảo đảm kết quả trúng tuyển năm hiện tại.</p>
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major }) => {
  const range = university.admission?.scoreRange
  const aboveMax = range?.max ? profile.thptScore - range.max : null
  const assessment = aboveMax === null ? 'Cần xem điều kiện từng phương thức' : aboveMax >= 0 ? 'Hồ sơ đang cao hơn mức tham chiếu' : aboveMax >= -2 ? 'Nằm trong vùng cần cạnh tranh' : 'Nên chuẩn bị thêm phương thức dự phòng'
  return <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2.5" key={university.id}><div className="flex items-start justify-between gap-2"><h3 className="font-bold text-slate-900 text-sm">{university.shortName ?? university.name}</h3><span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">{major?.name}</span></div><div className="space-y-1 text-xs text-slate-600"><p><span className="font-semibold">Điểm tham chiếu:</span> {range?.label ?? 'Đang cập nhật'}</p><p><span className="font-semibold">Phương thức:</span> {university.admission?.methods?.slice(0, 2).map((method) => method.label).join(' · ') || 'Xem đề án chính thức'}</p></div><div className="p-2.5 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1"><span className="font-bold text-[#1D4ED8] block">Dựa trên hồ sơ của bạn:</span><p className="text-[11px] leading-relaxed">{assessment}. Điểm THPT hiện tại: {profile.thptScore}; ĐGNL: {profile.competencyScore}.</p></div></div>
})}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-scholarships">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-amber-500"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">6. Học bổng và Hỗ trợ tài chính</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Cơ hội giảm nhẹ học phí</span>
</div>
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university }) => <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2" key={university.id}><div className="flex items-center justify-between gap-2"><h3 className="font-bold text-slate-900">{university.shortName ?? university.name}</h3><Tooltip label="UniView chưa có dữ liệu học bổng có cấu trúc; hãy kiểm tra nguồn chính thức"><span tabIndex="0" className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">Cần xác minh</span></Tooltip></div><p className="text-slate-600 leading-relaxed text-xs">Danh mục hiện chưa có dữ liệu học bổng có cấu trúc cho trường này. Hãy kiểm tra chính sách theo ngành và năm tuyển sinh trên nguồn chính thức.</p><a className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8] hover:underline" href={university.website} target="_blank" rel="noreferrer">Xem website trường<span className="material-symbols-outlined text-[14px]">open_in_new</span></a></div>)}
</div>
</section>

<section className="scroll-mt-36 bg-blue-50/50 rounded-2xl border border-blue-200/80 p-5 md:p-6 shadow-sm space-y-5" id="section-fit">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">🎯</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">7. Đặt trong hoàn cảnh của bạn</h2>
</div>
<div className="flex flex-wrap items-center gap-2 text-xs">
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Ngành: {profile.major}</span>
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Ngân sách: ≤ {profile.budget}tr/năm</span>
<span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">Khu vực: {profile.regionId === 'ho-chi-minh-city' ? 'TP.HCM' : profile.regionId === 'ha-noi' ? 'Hà Nội' : profile.regionId === 'central' ? 'Miền Trung' : 'Miền Nam'}</span>
<span className="px-2 py-0.5 rounded-full bg-white text-blue-700 border border-blue-200 font-bold">ĐGNL: {profile.competencyScore} | THPT: {profile.thptScore}</span>
</div>
</div>
<div className={`grid grid-cols-1 gap-4 ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, fitScore }) => {
  const tuitionAverage = university.tuition ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2 : null
  const budgetFit = tuitionAverage !== null && tuitionAverage <= profile.budget
  const locationFit = university.regionId === profile.regionId
  const majorFit = normalizeText(major?.name) === normalizeText(profile.major)
  const range = university.admission?.scoreRange
  const admissionFit = range?.max ? profile.thptScore >= range.max - 2 : null
  return <div className={`bg-white rounded-2xl p-4 shadow-sm space-y-3 text-xs ${fitScore >= 8 ? 'border border-blue-200' : fitScore >= 6.5 ? 'border border-slate-200' : 'border border-amber-200'}`} key={university.id}><div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100"><h3 className="font-bold text-slate-900 text-sm">{university.shortName ?? university.name} ({major?.name})</h3><Tooltip label="Điểm phù hợp được tính lại mỗi khi bạn đổi trường, ngành hoặc hồ sơ"><span tabIndex="0" className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${fitScore >= 8 ? 'text-blue-700 bg-blue-50' : fitScore >= 6.5 ? 'text-slate-700 bg-slate-100' : 'text-amber-800 bg-amber-50'}`}>Phù hợp {fitScore}/10</span></Tooltip></div><ul className="space-y-2 text-slate-600"><li className="flex items-start gap-2"><span className={majorFit ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{majorFit ? '✓' : '~'}</span><span><strong>Mục tiêu ngành:</strong> {majorFit ? 'Khớp đúng ngành mục tiêu.' : `Đang đối chiếu ${major?.name}.`}</span></li><li className="flex items-start gap-2"><span className={budgetFit ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{budgetFit ? '✓' : '✕'}</span><span><strong>Tài chính:</strong> {tuitionAverage === null ? 'Chưa đủ dữ liệu.' : budgetFit ? `Khoảng ${tuitionAverage}tr/năm nằm trong ngân sách.` : `Khoảng ${tuitionAverage}tr/năm vượt trần ${profile.budget}tr.`}</span></li><li className="flex items-start gap-2"><span className={locationFit ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{locationFit ? '✓' : '~'}</span><span><strong>Vị trí:</strong> {locationFit ? 'Đúng khu vực ưu tiên.' : `Trường ở ${university.city}, khác khu vực ưu tiên.`}</span></li><li className="flex items-start gap-2"><span className={admissionFit ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{admissionFit ? '✓' : '~'}</span><span><strong>Tuyển sinh:</strong> {admissionFit === null ? 'Cần xem đề án chính thức.' : admissionFit ? 'Điểm hiện tại nằm trong vùng có lợi thế.' : 'Cần thêm phương thức dự phòng.'}</span></li></ul></div>
})}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-tradeoffs">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">⚖️</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">8. Trade-offs cốt lõi bạn cần cân nhắc</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Không có lựa chọn hoàn hảo, chỉ có lựa chọn phù hợp nhất</span>
</div>
<div className={`grid grid-cols-1 gap-4 text-xs md:text-sm ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major, detail, fitScore }) => {
  const tuitionAverage = university.tuition ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2 : null
  const advantage = fitScore >= 8 ? 'Cân bằng tốt giữa mục tiêu ngành, khu vực, tài chính và khả năng tuyển sinh.' : `Có thế mạnh đào tạo trong nhóm ${major?.category?.name ?? 'ngành đã chọn'}.`
  const tradeoff = tuitionAverage !== null && tuitionAverage > profile.budget
    ? `Học phí trung bình khoảng ${tuitionAverage} triệu/năm, vượt ngân sách dự kiến.`
    : university.regionId !== profile.regionId
      ? `Khác khu vực ưu tiên; cần tính chi phí sinh hoạt và di chuyển.`
      : normalizeText(major?.name) !== normalizeText(profile.major)
        ? `Ngành ${major?.name} chưa trùng hoàn toàn mục tiêu ${profile.major}.`
        : 'Mức cạnh tranh tuyển sinh cần được theo dõi theo đề án năm hiện tại.'
  return <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3" key={university.id}><div className="flex items-center justify-between gap-2"><h3 className="font-bold text-slate-900">{university.shortName ?? university.name} ({major?.name})</h3><span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">{fitScore}/10</span></div><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-900"><strong>Điểm được:</strong> {advantage}</div><div className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-950"><strong>Điểm đánh đổi:</strong> {tradeoff}</div>{detail?.summary && <p className="text-[11px] leading-relaxed text-slate-500">{detail.summary}</p>}</div>
})}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4" id="section-missing-info">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-slate-400"></span>
<h2 className="text-base md:text-lg font-bold text-slate-900">9. Điều gì bạn vẫn cần tìm hiểu thêm?</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Checklist xác minh trước ngày đăng ký</span>
</div>
<div className={`grid grid-cols-1 gap-4 text-xs ${selectedChoices.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedChoices.map(({ university, major }) => <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2" key={university.id}><p className="font-bold text-slate-900 text-xs">{university.shortName ?? university.code} Checklist</p><div className="space-y-1.5"><p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Học phí tham chiếu {university.tuition?.academicYear ?? 'hiện tại'}</span></p><p className="text-emerald-700 flex items-center gap-1.5"><span>✓</span><span>Phương thức tuyển sinh đã ghi nhận</span></p><p className="text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50 p-1.5 rounded"><span>?</span><span>Xác minh chỉ tiêu và điểm riêng ngành {major?.name}</span></p><p className="text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50 p-1.5 rounded"><span>?</span><span>Xác minh học bổng trên website trường</span></p></div></div>)}
</div>
</section>

<section className="scroll-mt-36 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5" id="section-notes">
<div className="flex items-center justify-between border-b border-slate-100 pb-3">
<div className="flex items-center gap-2.5">
<span className="text-base">📝</span>
<h2 className="text-base md:text-lg font-bold text-slate-900">10. Ghi chú cá nhân cho từng trường</h2>
</div>
<span className="text-xs text-slate-500 font-medium">Tự động đồng bộ với Decision Board</span>
</div>
<div className={`grid grid-cols-1 gap-4 ${selectedUniversities.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
{selectedUniversities.map((university) => (
  <div className="space-y-2 text-xs" key={university.id}>
    <div className="flex items-center justify-between"><p className="font-bold text-slate-900">Ghi chú về {university.shortName ?? university.code}:</p><span className="text-[11px] text-slate-400">Tự động lưu khi bấm Lưu</span></div>
    <textarea className="min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-3 leading-relaxed text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={notes[university.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [university.id]: event.target.value }))} placeholder={`Nhập ghi chú về ${university.shortName ?? university.name}...`} />
  </div>
))}
</div>
</section>

<div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="space-y-1 text-center sm:text-left"><h3 className="font-bold text-slate-900 text-sm md:text-base">Bạn đã sẵn sàng đưa ra thứ tự nguyện vọng?</h3><p className="text-xs text-slate-500">Chuyển trực tiếp {selectedUniversities.length} trường đối chiếu này vào Decision Board để sắp xếp ưu tiên và lộ trình nộp hồ sơ.</p></div>
<div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
<button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs md:text-sm transition-colors shadow-sm inline-flex items-center gap-1.5" onClick={() => window.print()} type="button"><span className="material-symbols-outlined text-[18px] text-slate-500">download</span>Lưu kết quả so sánh (PDF)</button>
<button className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-xs md:text-sm transition-all shadow-sm hover:shadow hover:-translate-y-0.5 inline-flex items-center gap-2" onClick={addToDecisionBoard} type="button">
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
        {universitiesData.universities
          .filter((university) => !selectedIds.includes(university.id) || selectedIds[pickerSlot] === university.id)
          .map((university) => (
            <button className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50" key={university.id} onClick={(event) => { event.stopPropagation(); chooseUniversity(university.id) }} type="button">
              <div className="flex items-start justify-between gap-3"><Tooltip label={university.name}><span tabIndex="0" className="line-clamp-2 text-sm font-bold text-slate-900">{university.name}</span></Tooltip><span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">{university.code}</span></div>
              <p className="mt-1 text-xs text-slate-500">{university.city} · {university.ownershipLabel}</p>
              <p className="mt-2 line-clamp-1 text-xs font-medium text-[#1D4ED8]">{university.featuredMajors.join(' · ')}</p>
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
        <label className="space-y-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">Ngành mong muốn<select className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400" value={profileDraft.major} onChange={(event) => setProfileDraft((current) => ({ ...current, major: event.target.value }))}>{majors.map((major) => <option value={major.name} key={major.id}>{major.name} · {major.code}</option>)}</select></label>
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
