import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'
import {
  formatPlanDate,
  getActivePlanSummary,
  getPlan,
  PLAN_IDS,
} from '../data/plans'
import {
  ALL_REGIONS,
  ALL_SUBJECTS,
  TUITION_LABELS,
} from '../data/profileOptions'
import {
  CERTIFICATE_OPTIONS,
  CERTIFICATE_STATUS,
  certificateLabel,
  normalizeCertificates,
} from '../utils/certificates'

const planTone = {
  [PLAN_IDS.MONTHLY]: 'border-blue-200 bg-blue-50 text-blue-800',
  [PLAN_IDS.ANNUAL]: 'border-rose-200 bg-rose-50 text-rose-800',
  [PLAN_IDS.ADMISSION_PASS]: 'border-amber-200 bg-amber-50 text-amber-900',
}

const COMMON_MAJORS = [
  'Kỹ thuật Phần mềm',
  'Công nghệ Thông tin',
  'Khoa học Máy tính & AI',
  'Digital Marketing',
  'Kinh doanh Quốc tế',
  'Thiết kế Đồ họa / Mỹ thuật số',
  'Truyền thông Đa phương tiện',
  'Logistics & Chuỗi cung ứng',
]

function ProfilePage() {
  const {
    activePlans,
    admissionSeason,
    subscriptions,
    user,
    updateUserProfile,
  } = useAuth()
  const { assessment, updateProfile } = useAssessment()

  const activePlanSummary = getActivePlanSummary(activePlans, admissionSeason)
  const profile = assessment?.profile || {}

  // Current synchronized values
  const currentRegion = user?.preferredRegion || profile.regions?.[0] || 'TP. Hồ Chí Minh'
  const currentCertificates = normalizeCertificates(
    profile.certificates?.length ? profile.certificates : user?.academicProfile?.certificates,
    'PROFILE'
  )

  // Modal States
  const [activeModal, setActiveModal] = useState(null) // 'PERSONAL' | 'ACADEMIC' | 'PREFERENCES'
  const [toastMessage, setToastMessage] = useState('')

  // Draft States
  const [personalDraft, setPersonalDraft] = useState({
    fullName: user?.fullName || '',
    grade: user?.grade || 'Lớp 12',
    school: user?.school || '',
    preferredRegion: currentRegion,
    targetAdmissionYear: user?.targetAdmissionYear || '2027',
    targetMajors: (user?.targetMajors || []).join(', '),
  })

  const [academicDraft, setAcademicDraft] = useState({
    gpa: profile.gpa || user?.academicProfile?.gpa?.value || '',
    gpaStatus: profile.gpaStatus || user?.academicProfile?.gpa?.status || 'EXPECTED',
    thptScore: profile.thptScore || user?.academicProfile?.thptScore?.value || '',
    thptScoreStatus: profile.thptScoreStatus || user?.academicProfile?.thptScore?.status || 'EXPECTED',
    dgnlScore: profile.dgnlScore || user?.academicProfile?.dgnlScore?.value || '',
    dgnlScoreStatus: profile.dgnlScoreStatus || user?.academicProfile?.dgnlScore?.status || 'EXPECTED',
    strengths: profile.strengths?.length ? [...profile.strengths] : [],
    certificates: currentCertificates,
  })

  const [certificateDraft, setCertificateDraft] = useState({
    type: 'IELTS_ACADEMIC',
    customName: '',
    score: '',
    status: CERTIFICATE_STATUS.EXPECTED,
  })

  const [prefDraft, setPrefDraft] = useState({
    regions: profile.regions?.length ? [...profile.regions] : [currentRegion],
    tuition: profile.tuition || '25-45',
    scholarship: Boolean(profile.scholarship),
    priorities: profile.priorities || [],
  })

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Open Modals
  const openPersonalModal = () => {
    setPersonalDraft({
      fullName: user?.fullName || '',
      grade: user?.grade || 'Lớp 12',
      school: user?.school || '',
      preferredRegion: user?.preferredRegion || profile.regions?.[0] || 'TP. Hồ Chí Minh',
      targetAdmissionYear: user?.targetAdmissionYear || '2027',
      targetMajors: (user?.targetMajors || []).join(', '),
    })
    setActiveModal('PERSONAL')
  }

  const openAcademicModal = () => {
    setAcademicDraft({
      gpa: profile.gpa || user?.academicProfile?.gpa?.value || '',
      gpaStatus: profile.gpaStatus || user?.academicProfile?.gpa?.status || 'EXPECTED',
      thptScore: profile.thptScore || user?.academicProfile?.thptScore?.value || '',
      thptScoreStatus: profile.thptScoreStatus || user?.academicProfile?.thptScore?.status || 'EXPECTED',
      dgnlScore: profile.dgnlScore || user?.academicProfile?.dgnlScore?.value || '',
      dgnlScoreStatus: profile.dgnlScoreStatus || user?.academicProfile?.dgnlScore?.status || 'EXPECTED',
      strengths: profile.strengths?.length ? [...profile.strengths] : [],
      certificates: normalizeCertificates(
        profile.certificates?.length ? profile.certificates : user?.academicProfile?.certificates,
        'PROFILE'
      ),
    })
    setCertificateDraft({
      type: 'IELTS_ACADEMIC',
      customName: '',
      score: '',
      status: CERTIFICATE_STATUS.EXPECTED,
    })
    setActiveModal('ACADEMIC')
  }

  const openPrefModal = () => {
    setPrefDraft({
      regions: profile.regions?.length ? [...profile.regions] : [currentRegion],
      tuition: profile.tuition || '25-45',
      scholarship: Boolean(profile.scholarship),
      priorities: profile.priorities?.length ? [...profile.priorities] : [],
    })
    setActiveModal('PREFERENCES')
  }

  // Certificate Management Helpers (Khớp phần 3 của Assessment)
  const addCertificate = () => {
    const option = CERTIFICATE_OPTIONS.find(({ id }) => id === certificateDraft.type)
    const name = certificateDraft.type === 'OTHER'
      ? certificateDraft.customName.trim()
      : option?.label
    const score = certificateDraft.score.trim()
    if (!name || !score) return

    const newCert = {
      id: `cert-${Date.now()}-${score.replace(/[^a-zA-Z0-9]/g, '')}`,
      type: certificateDraft.type,
      name,
      score,
      status: certificateDraft.status,
      source: 'PROFILE',
    }

    setAcademicDraft((current) => ({
      ...current,
      certificates: [...current.certificates, newCert],
    }))

    setCertificateDraft({
      type: 'IELTS_ACADEMIC',
      customName: '',
      score: '',
      status: CERTIFICATE_STATUS.EXPECTED,
    })
  }

  const updateCertificateStatus = (certId, status) => {
    setAcademicDraft((current) => ({
      ...current,
      certificates: current.certificates.map((c) =>
        c.id === certId ? { ...c, status } : c
      ),
    }))
  }

  const removeCertificate = (certId) => {
    setAcademicDraft((current) => ({
      ...current,
      certificates: current.certificates.filter((c) => c.id !== certId),
    }))
  }

  const clearAllCertificates = () => {
    setAcademicDraft((current) => ({
      ...current,
      certificates: [],
    }))
  }

  // Save Handlers
  const savePersonal = (e) => {
    e.preventDefault()
    const targetMajors = personalDraft.targetMajors
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean)

    const selectedRegion = personalDraft.preferredRegion.trim() || 'TP. Hồ Chí Minh'

    updateUserProfile({
      fullName: personalDraft.fullName.trim(),
      grade: personalDraft.grade,
      school: personalDraft.school.trim(),
      preferredRegion: selectedRegion,
      targetAdmissionYear: personalDraft.targetAdmissionYear.trim(),
      targetMajors,
    })

    updateProfile({
      regions: [selectedRegion],
    })

    setActiveModal(null)
    showToast('✓ Đã cập nhật tỉnh/thành phố và thông tin cá nhân thành công!')
  }

  const saveAcademic = (e) => {
    e.preventDefault()
    const certificates = academicDraft.certificates || []

    const updates = {
      gpa: academicDraft.gpa.trim(),
      gpaStatus: academicDraft.gpaStatus,
      thptScore: academicDraft.thptScore.trim(),
      thptScoreStatus: academicDraft.thptScoreStatus,
      dgnlScore: academicDraft.dgnlScore.trim(),
      dgnlScoreStatus: academicDraft.dgnlScoreStatus,
      strengths: academicDraft.strengths,
      certificates,
    }

    updateProfile(updates)
    updateUserProfile({
      academicProfile: {
        gpa: { value: updates.gpa, status: updates.gpaStatus },
        thptScore: { value: updates.thptScore, status: updates.thptScoreStatus },
        dgnlScore: { value: updates.dgnlScore, status: updates.dgnlScoreStatus },
        certificates,
      },
    })

    setActiveModal(null)
    showToast('✓ Đã cập nhật điểm số & chứng chỉ thành công!')
  }

  const savePreferences = (e) => {
    e.preventDefault()
    const updates = {
      regions: prefDraft.regions,
      tuition: prefDraft.tuition,
      scholarship: prefDraft.scholarship,
      priorities: prefDraft.priorities,
    }

    updateProfile(updates)
    if (prefDraft.regions.length > 0) {
      updateUserProfile({ preferredRegion: prefDraft.regions[0] })
    }

    setActiveModal(null)
    showToast('✓ Đã lưu khu vực và điều kiện tuyển sinh thành công!')
  }

  const toggleStrength = (subject) => {
    setAcademicDraft((current) => ({
      ...current,
      strengths: current.strengths.includes(subject)
        ? current.strengths.filter((s) => s !== subject)
        : [...current.strengths, subject],
    }))
  }

  const toggleRegion = (region) => {
    setPrefDraft((current) => ({
      ...current,
      regions: current.regions.includes(region)
        ? current.regions.filter((r) => r !== region)
        : [...current.regions, region],
    }))
  }

  // Display values
  const currentThpt = profile.thptScore || user?.academicProfile?.thptScore?.value || ''
  const currentDgnl = profile.dgnlScore || user?.academicProfile?.dgnlScore?.value || ''
  const currentGpa = profile.gpa || user?.academicProfile?.gpa?.value || ''
  const currentStrengths = profile.strengths?.length ? profile.strengths : []
  const currentMajors = user?.targetMajors?.length ? user.targetMajors : []

  return (
    <main className="w-full pt-6 bg-[#FFFDFB] min-h-[calc(100vh-80px)] pb-24 font-['Be_Vietnam_Pro'] text-[#172033]">
      {/* Toast thông báo lưu thành công */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 rounded-2xl bg-emerald-700 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl animate-in fade-in slide-in-from-top-3">
          {toastMessage}
        </div>
      )}

      <div className="w-full max-w-[1260px] mx-auto px-4 md:px-6 lg:px-8 py-4 antialiased">
        {/* Hero Banner Hồ sơ */}
        <section className="rounded-[28px] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF1F2] border border-[#DBEAFE] p-6 sm:p-8 md:p-10 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-300/20 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-rose-200/30 blur-[80px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 text-[#1D4ED8] text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="material-symbols-outlined text-sm text-amber-500">stars</span>
                <span>Hồ sơ cá nhân hóa của bạn</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-[34px] leading-tight font-extrabold text-[#172033] tracking-tight">
                Thông tin giúp UniView hiểu hoàn cảnh của bạn hơn
              </h1>
              <p className="text-[#667085] text-sm sm:text-[15px] leading-relaxed max-w-xl">
                Cập nhật điểm số, chứng chỉ ngoại ngữ và điều kiện thực tế để các công cụ của UniView có thêm bối cảnh khi đối chiếu tuyển sinh, gợi ý trường và tối ưu cơ hội xét tuyển.
              </p>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-100/90 p-5 shadow-sm space-y-4 max-w-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-pulse" />
                    <span className="text-sm font-bold text-[#172033]">Trạng thái dữ liệu hồ sơ</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {currentThpt || currentDgnl || currentGpa || currentCertificates.length > 0 ? 'Đã cá nhân hóa' : 'Chờ bạn cập nhật'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                  <div className="bg-[#EFF6FF] border border-blue-100 text-[#1D4ED8] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5">
                    <span>✓</span> {currentRegion || 'TP. Hồ Chí Minh'}
                  </div>
                  <div className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                    currentThpt || currentDgnl || currentGpa
                      ? 'bg-[#EFF6FF] border-blue-100 text-[#1D4ED8]'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <span>{currentThpt || currentDgnl ? '✓' : '•'}</span> Điểm số
                  </div>
                  <div className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                    currentCertificates.length > 0
                      ? 'bg-[#EFF6FF] border-blue-100 text-[#1D4ED8]'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <span>{currentCertificates.length > 0 ? '✓' : '•'}</span> {currentCertificates.length > 0 ? `${currentCertificates.length} chứng chỉ` : 'Chứng chỉ'}
                  </div>
                  <div className="bg-[#EFF6FF] border border-blue-100 text-[#1D4ED8] text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5">
                    <span>✓</span> Tuyển sinh {user?.targetAdmissionYear || '2027'}
                  </div>
                </div>
              </div>
            </div>

            {/* Thẻ xem nhanh Hồ sơ thực tế */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-6 border border-blue-100 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-bold">
                      {user?.initials ?? 'UV'}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#172033]">{user?.fullName || 'Học sinh UniView'}</h3>
                      <p className="text-[11px] text-[#667085]">{user?.grade || 'Chưa cập nhật lớp'} · {user?.school || 'Chưa cập nhật trường'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full border border-blue-200">{activePlanSummary}</span>
                    <span className="text-[10px] font-semibold text-slate-500">Mùa {user?.targetAdmissionYear || '2027'}</span>
                  </div>
                </div>

                <div className="py-4 flex flex-col items-center justify-center">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      THPT: {currentThpt ? `${currentThpt}` : 'Chưa nhập'}
                    </span>
                    <span className="text-[11px] font-semibold bg-blue-50 text-[#1D4ED8] px-2.5 py-1 rounded-lg border border-blue-100">
                      ĐGNL: {currentDgnl ? `${currentDgnl}` : 'Chưa nhập'}
                    </span>
                    <span className="text-[11px] font-semibold bg-rose-50 text-[#FB7185] px-2.5 py-1 rounded-lg border border-rose-100">
                      GPA: {currentGpa ? `${currentGpa}` : 'Chưa nhập'}
                    </span>
                    {currentCertificates.map((cert) => (
                      <span key={cert.id} className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
                        {certificateLabel(cert)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-100 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Mục tiêu chính:</span>
                    <span className="font-bold text-[#172033] text-right truncate max-w-[190px]">
                      {currentMajors.length > 0 ? currentMajors.join(' / ') : 'Chưa chọn ngành'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Khu vực cư trú &amp; học tập:</span>
                    <span className="font-bold text-[#172033] text-right truncate max-w-[190px]">
                      {currentRegion}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Ngân sách năm:</span>
                    <span className="font-semibold text-slate-800">
                      {TUITION_LABELS[profile.tuition] ? TUITION_LABELS[profile.tuition].split('(')[0].trim() : (profile.tuition ? `${profile.tuition} triệu/năm` : 'Chưa xác định')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Môn thế mạnh:</span>
                    <span className="font-medium text-slate-700 text-right truncate max-w-[190px]">
                      {currentStrengths.length > 0 ? currentStrengths.slice(0, 3).join(', ') : 'Chưa cập nhật'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2 text-slate-500 text-[11px]">
                    <span>Gói đang dùng:</span>
                    <Link className="truncate font-bold text-[#1D4ED8] hover:underline" to="/account/plan">{activePlanSummary}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gói đang hoạt động */}
        <section className="mb-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1D4ED8]">Subscription &amp; quyền truy cập</span>
              <h2 className="mt-1 text-xl font-extrabold text-[#172033]">Gói đang hoạt động</h2>
              <p className="mt-1 text-sm text-[#667085]">Gói Tháng phục vụ nhu cầu ngắn hạn; Gói Năm mở Roadmap dài hạn và bao gồm Admission Pass cho một mùa tuyển sinh.</p>
            </div>
            <Link className="inline-flex shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-[#1D4ED8] hover:bg-blue-100" to="/account/plan">Quản lý gói</Link>
          </div>

          {activePlans.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {activePlans.map((planId) => {
                const plan = getPlan(planId)
                const subscription = subscriptions.find((item) => item.planId === planId)
                if (!plan) return null
                const isAdmissionPass = planId === PLAN_IDS.ADMISSION_PASS
                return (
                  <article className={`rounded-2xl border p-4 ${planTone[planId] ?? 'border-slate-200 bg-slate-50 text-slate-800'}`} key={planId}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold">{plan.name}{isAdmissionPass && admissionSeason ? ` ${admissionSeason}` : ''}</h3>
                        <p className="mt-1 text-xs leading-5 opacity-80">{isAdmissionPass ? 'Admission Mode, phương thức, deadline, kịch bản và checklist nhập học.' : planId === PLAN_IDS.ANNUAL ? 'Toàn bộ hành trình khám phá và Admission Pass trong thời gian gói còn hiệu lực.' : 'Personal Workspace, assessment, task, roadmap và so sánh cơ bản.'}</p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Đang hoạt động</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-current/10 pt-3 text-[11px] font-semibold">
                      <span>Đến {subscription?.endsAt ? formatPlanDate(subscription.endsAt) : plan.durationLabel}</span>
                      <span>{isAdmissionPass ? 'Không tự gia hạn' : subscription?.autoRenew ? 'Tự động gia hạn đang bật' : 'Tự động gia hạn đã tắt'}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">Tài khoản chưa kích hoạt gói. Bạn vẫn có thể làm assessment và xem kết quả tổng quan.</div>
          )}
        </section>

        {/* Nội dung chi tiết các phần hồ sơ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[24px] bg-white border border-slate-200/90 p-5 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">Danh mục hồ sơ</span>
                <nav className="space-y-1.5" id="profile-nav">
                  <a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-bold text-sm border-l-4 border-[#1D4ED8]" href="#section-personal">
                    <span>1. Thông tin cá nhân</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs flex items-center justify-center font-bold">✓</span>
                  </a>
                  <a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm" href="#section-academic">
                    <span>2. Hồ sơ học tập &amp; Điểm số</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs flex items-center justify-center font-bold">✓</span>
                  </a>
                  <a className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm" href="#section-preferences">
                    <span>3. Sở thích &amp; Điều kiện</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] text-xs flex items-center justify-center font-bold">✓</span>
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 md:p-10 shadow-sm space-y-12">
            {/* SECTION 1: THÔNG TIN CÁ NHÂN */}
            <section className="space-y-5 scroll-mt-28" id="section-personal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                    <h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">1. Thông tin cá nhân</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#667085] mt-1">Thông tin định danh để cá nhân hóa kết quả tuyển sinh của bạn.</p>
                </div>
                <button
                  onClick={openPersonalModal}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  <span>Chỉnh sửa thông tin</span>
                </button>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <span className="text-xs text-[#667085] font-medium block">Họ và tên</span>
                    <span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">{user?.fullName || 'Chưa cập nhật tên'}</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#667085] font-medium block">Khối lớp &amp; Năm tuyển sinh</span>
                    <span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">{user?.grade || 'Chưa cập nhật lớp'} (Mùa tuyển sinh {user?.targetAdmissionYear || '2027'})</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#667085] font-medium block">Tỉnh / Thành phố cư trú</span>
                    <span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">
                      {currentRegion}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-[#667085] font-medium block">Trường THPT hiện tại</span>
                    <span className="text-sm sm:text-base font-bold text-[#172033] mt-0.5 block">{user?.school || 'Chưa cập nhật trường THPT'}</span>
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-slate-200/60">
                    <span className="text-xs text-[#667085] font-medium block">Ngành học mục tiêu / quan tâm</span>
                    <span className="text-sm sm:text-base font-bold text-[#1D4ED8] mt-0.5 block">
                      {currentMajors.length > 0 ? currentMajors.join(' • ') : 'Chưa đặt ngành mục tiêu'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: HỒ SƠ HỌC TẬP & ĐIỂM SỐ */}
            <section className="space-y-6 scroll-mt-28" id="section-academic">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                    <h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">2. Hồ sơ học tập &amp; Điểm số</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#667085] mt-1">Dữ liệu thực tế của bạn để đối chiếu chuẩn trúng tuyển và kiểm tra điểm.</p>
                </div>
                <button
                  onClick={openAcademicModal}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  <span>Chỉnh sửa dữ liệu học tập</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Môn thế mạnh */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Môn học tự tin / Điểm mạnh của bạn:</span>
                    <span className="text-[11px] text-slate-400">Chọn trong phần Chỉnh sửa</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentStrengths.length > 0 ? (
                      currentStrengths.map((subject) => (
                        <span key={subject} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                          <span>✓</span> {subject}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Chưa chọn môn thế mạnh. Bấm nút Chỉnh sửa phía trên để chọn môn của bạn.</span>
                    )}
                  </div>
                </div>

                {/* Điểm số */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-4">
                    <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wide block">Điểm thi THPT</span>
                    <div className="mt-2 text-2xl font-black text-[#1D4ED8]">
                      {currentThpt ? currentThpt : '--'}
                    </div>
                    <p className="mt-1 text-[11px] text-blue-800">
                      Thang 30 · {currentThpt ? (profile.thptScoreStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến') : 'Chưa cập nhật'}
                    </p>
                  </div>

                  <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-4">
                    <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wide block">ĐGNL ĐHQG-HCM</span>
                    <div className="mt-2 text-2xl font-black text-[#1D4ED8]">
                      {currentDgnl ? currentDgnl : '--'}
                    </div>
                    <p className="mt-1 text-[11px] text-blue-800">
                      Thang 1200 · {currentDgnl ? (profile.dgnlScoreStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến') : 'Chưa cập nhật'}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block">Học bạ THPT (GPA)</span>
                    <div className="mt-2 text-2xl font-black text-slate-800">
                      {currentGpa ? currentGpa : '--'}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Thang 10 · {currentGpa ? (profile.gpaStatus === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến') : 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>

                {/* Danh sách Chứng chỉ ngoại ngữ & quốc tế (Dựa theo phần 3 của Assessment) */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Chứng chỉ Quốc tế &amp; Ngoại ngữ:
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border ${
                      currentCertificates.length > 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-500 bg-slate-50 border-slate-200'
                    }`}>
                      {currentCertificates.length > 0 ? `${currentCertificates.length} chứng chỉ đã lưu` : 'Chưa có chứng chỉ'}
                    </span>
                  </div>

                  {currentCertificates.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {currentCertificates.map((cert) => (
                        <div
                          key={cert.id}
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${
                            cert.status === 'OFFICIAL'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {cert.status === 'OFFICIAL' ? 'verified' : 'schedule'}
                          </span>
                          <span>{certificateLabel(cert)}</span>
                          <span className="text-[10px] font-semibold opacity-80 px-1.5 py-0.5 rounded bg-white/70">
                            {cert.status === 'OFFICIAL' ? 'Chính thức' : 'Dự kiến'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      Chưa có chứng chỉ ngoại ngữ nào. Bạn có thể bấm "Chỉnh sửa dữ liệu học tập" để thêm IELTS, TOEFL, TOEIC, SAT, ACT, VSTEP...
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 3: SỞ THÍCH & ĐIỀU KIỆN */}
            <section className="space-y-6 scroll-mt-28" id="section-preferences">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                    <h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">3. Sở thích &amp; Điều kiện thực tế</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#667085] mt-1">Khu vực bạn có thể học và ngân sách học phí gia đình.</p>
                </div>
                <button
                  onClick={openPrefModal}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  <span>Chỉnh sửa tiêu chí</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Khu vực ưu tiên học tập</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.regions?.length > 0 ? (
                      profile.regions.map((region) => (
                        <span key={region} className="px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-2xs">
                          {region} ✓
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-2xs">
                        {currentRegion} ✓
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 bg-[#F8FAFC] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ngân sách học phí dự kiến</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Đang áp dụng</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border-2 border-[#1D4ED8] text-xs">
                    <div className="font-extrabold text-[#1D4ED8] text-sm">
                      {TUITION_LABELS[profile.tuition] || (profile.tuition ? `${profile.tuition} triệu VNĐ / năm` : 'Chưa xác định')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {profile.scholarship ? '⭐ Có quan tâm đến học bổng & hỗ trợ tài chính' : 'Học phí phù hợp khả năng chi trả của gia đình'}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* MODAL 1: CHỈNH SỬA THÔNG TIN CÁ NHÂN */}
      {activeModal === 'PERSONAL' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#172033]">Cập nhật thông tin cá nhân</h3>
              <button onClick={() => setActiveModal(null)} className="text-xl text-slate-400 hover:text-slate-600">×</button>
            </div>
            <form onSubmit={savePersonal} className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-700">Họ và tên</span>
                <input
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                  value={personalDraft.fullName}
                  onChange={(e) => setPersonalDraft({ ...personalDraft, fullName: e.target.value })}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Khối lớp</span>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    value={personalDraft.grade}
                    onChange={(e) => setPersonalDraft({ ...personalDraft, grade: e.target.value })}
                  >
                    <option>Lớp 10</option>
                    <option>Lớp 11</option>
                    <option>Lớp 12</option>
                    <option>Đã tốt nghiệp THPT</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Năm tuyển sinh dự kiến</span>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    value={personalDraft.targetAdmissionYear}
                    onChange={(e) => setPersonalDraft({ ...personalDraft, targetAdmissionYear: e.target.value })}
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="Khác">Chưa xác định</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-700">Trường THPT hiện tại</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                  value={personalDraft.school}
                  placeholder="VD: THPT Nguyễn Thị Minh Khai, THPT Chuyên Lê Hồng Phong..."
                  onChange={(e) => setPersonalDraft({ ...personalDraft, school: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-700">Tỉnh / Thành phố cư trú</span>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 font-medium"
                  value={personalDraft.preferredRegion}
                  onChange={(e) => setPersonalDraft({ ...personalDraft, preferredRegion: e.target.value })}
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="TP. Hồ Chí Minh & miền Nam">TP. Hồ Chí Minh & miền Nam</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hà Nội & miền Bắc">Hà Nội & miền Bắc</option>
                  <option value="Đà Nẵng & miền Trung">Đà Nẵng & miền Trung</option>
                  <option value="Cần Thơ & ĐBSCL">Cần Thơ & ĐBSCL</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Tỉnh khác">Tỉnh khác</option>
                </select>
              </label>

              <div>
                <span className="mb-1 block text-xs font-bold text-slate-700">Ngành học mục tiêu / quan tâm</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                  value={personalDraft.targetMajors}
                  placeholder="VD: Kỹ thuật Phần mềm, Marketing, Trí tuệ nhân tạo..."
                  onChange={(e) => setPersonalDraft({ ...personalDraft, targetMajors: e.target.value })}
                />
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {COMMON_MAJORS.slice(0, 4).map((major) => (
                    <button
                      key={major}
                      type="button"
                      onClick={() => {
                        const current = personalDraft.targetMajors ? personalDraft.targetMajors.split(',').map((s) => s.trim()) : []
                        if (!current.includes(major)) {
                          setPersonalDraft({
                            ...personalDraft,
                            targetMajors: current.filter(Boolean).concat(major).join(', '),
                          })
                        }
                      }}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      + {major}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1d4ed8] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e40af]"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH SỬA ĐIỂM SỐ & CHỨNG CHỈ (KHỚP HOÀN TOÀN PHẦN 3 CỦA ASSESSMENT) */}
      {activeModal === 'ACADEMIC' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in duration-150 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#172033]">Cập nhật điểm số &amp; chứng chỉ</h3>
                <p className="text-xs text-slate-500">Đầy đủ các loại chứng chỉ quốc tế và môn thế mạnh như trong bài khảo sát.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-xl text-slate-400 hover:text-slate-600">×</button>
            </div>

            <form onSubmit={saveAcademic} className="mt-4 space-y-5">
              {/* Môn tự tin */}
              <div>
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Chọn các môn bạn tự tin / Điểm mạnh (Click để chọn/bỏ):</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ALL_SUBJECTS.map((subject) => {
                    const active = academicDraft.strengths.includes(subject)
                    return (
                      <button
                        type="button"
                        key={subject}
                        onClick={() => toggleStrength(subject)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          active
                            ? 'bg-[#1d4ed8] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {active ? `✓ ${subject}` : `+ ${subject}`}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Điểm THPT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Điểm thi THPT (Thang 30)</span>
                  <input
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="VD: 25.50"
                    value={academicDraft.thptScore}
                    onChange={(e) => setAcademicDraft({ ...academicDraft, thptScore: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Trạng thái điểm THPT</span>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium"
                    value={academicDraft.thptScoreStatus}
                    onChange={(e) => setAcademicDraft({ ...academicDraft, thptScoreStatus: e.target.value })}
                  >
                    <option value="EXPECTED">Điểm dự kiến</option>
                    <option value="OFFICIAL">Điểm chính thức</option>
                  </select>
                </label>
              </div>

              {/* Điểm ĐGNL & GPA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Điểm ĐGNL ĐHQG-HCM (Thang 1200)</span>
                  <input
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="VD: 875"
                    value={academicDraft.dgnlScore}
                    onChange={(e) => setAcademicDraft({ ...academicDraft, dgnlScore: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-700">Học bạ THPT trung bình (GPA)</span>
                  <input
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="VD: 8.70"
                    value={academicDraft.gpa}
                    onChange={(e) => setAcademicDraft({ ...academicDraft, gpa: e.target.value })}
                  />
                </label>
              </div>

              {/* PHẦN QUẢN LÝ CHỨNG CHỈ (GIỐNG HỆT BƯỚC 3 CỦA ASSESSMENT) */}
              <div className="space-y-3 pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Chứng chỉ Quốc tế &amp; Ngoại ngữ:</span>
                  {academicDraft.certificates.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllCertificates}
                      className="text-[11px] font-semibold text-rose-600 hover:underline"
                    >
                      Xóa toàn bộ chứng chỉ
                    </button>
                  )}
                </div>

                {/* Danh sách các chứng chỉ đã thêm */}
                {academicDraft.certificates.length > 0 ? (
                  <div className="space-y-2">
                    {academicDraft.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-blue-100 bg-blue-50/50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                          <span className="text-xs font-bold text-slate-900">{certificateLabel(cert)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={cert.status}
                            onChange={(e) => updateCertificateStatus(cert.id, e.target.value)}
                            className={`rounded-lg border px-2 py-1 text-[11px] font-bold outline-none ${
                              cert.status === CERTIFICATE_STATUS.OFFICIAL
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : 'border-amber-200 bg-amber-50 text-amber-800'
                            }`}
                          >
                            <option value={CERTIFICATE_STATUS.OFFICIAL}>Điểm chính thức</option>
                            <option value={CERTIFICATE_STATUS.EXPECTED}>Điểm dự kiến</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => removeCertificate(cert.id)}
                            className="text-slate-400 hover:text-rose-600 text-base font-bold px-1"
                            title="Xóa chứng chỉ này"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">Chưa có chứng chỉ nào trong hồ sơ.</p>
                )}

                {/* Khung thêm chứng chỉ mới */}
                <div className="p-3.5 rounded-2xl border border-dashed border-blue-300 bg-slate-50 space-y-2.5">
                  <span className="text-[11px] font-bold text-blue-900 block">+ Thêm chứng chỉ vào hồ sơ:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={certificateDraft.type}
                      onChange={(e) => setCertificateDraft((prev) => ({ ...prev, type: e.target.value }))}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold outline-none focus:border-blue-500"
                    >
                      {CERTIFICATE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>

                    {certificateDraft.type === 'OTHER' && (
                      <input
                        type="text"
                        placeholder="Tên chứng chỉ (VD: DSD, DELF...)"
                        value={certificateDraft.customName}
                        onChange={(e) => setCertificateDraft((prev) => ({ ...prev, customName: e.target.value }))}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                      />
                    )}

                    <input
                      type="text"
                      placeholder={CERTIFICATE_OPTIONS.find((o) => o.id === certificateDraft.type)?.placeholder || 'Ví dụ: 6.5'}
                      value={certificateDraft.score}
                      onChange={(e) => setCertificateDraft((prev) => ({ ...prev, score: e.target.value }))}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                    />

                    <select
                      value={certificateDraft.status}
                      onChange={(e) => setCertificateDraft((prev) => ({ ...prev, status: e.target.value }))}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold outline-none focus:border-blue-500"
                    >
                      <option value={CERTIFICATE_STATUS.EXPECTED}>Điểm dự kiến</option>
                      <option value={CERTIFICATE_STATUS.OFFICIAL}>Điểm chính thức</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={addCertificate}
                    disabled={!certificateDraft.score.trim() || (certificateDraft.type === 'OTHER' && !certificateDraft.customName.trim())}
                    className="w-full py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition shadow-sm"
                  >
                    + Thêm chứng chỉ này vào danh sách
                  </button>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1d4ed8] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e40af]"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CHỈNH SỬA KHU VỰC & HỌC PHÍ */}
      {activeModal === 'PREFERENCES' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#172033]">Cập nhật khu vực &amp; ngân sách học phí</h3>
              <button onClick={() => setActiveModal(null)} className="text-xl text-slate-400 hover:text-slate-600">×</button>
            </div>
            <form onSubmit={savePreferences} className="mt-4 space-y-4">
              <div>
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Khu vực bạn có thể theo học:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ALL_REGIONS.map((region) => {
                    const active = prefDraft.regions.includes(region)
                    return (
                      <button
                        type="button"
                        key={region}
                        onClick={() => toggleRegion(region)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          active
                            ? 'bg-[#1d4ed8] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {active ? `✓ ${region}` : `+ ${region}`}
                      </button>
                    )
                  })}
                </div>
              </div>

              <label className="block pt-2">
                <span className="mb-1 block text-xs font-bold text-slate-700">Ngân sách học phí tối đa mỗi năm</span>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  value={prefDraft.tuition}
                  onChange={(e) => setPrefDraft({ ...prefDraft, tuition: e.target.value })}
                >
                  <option value="under-25">Dưới 25 triệu / năm (Hệ chuẩn công lập)</option>
                  <option value="25-45">25 – 45 triệu / năm (Tự chủ chi thường xuyên)</option>
                  <option value="45-70">45 – 70 triệu / năm (Chất lượng cao / Tiên tiến)</option>
                  <option value="over-70">Trên 70 triệu / năm (Quốc tế / Tư thục chuẩn cao)</option>
                  <option value="undecided">Chưa xác định</option>
                </select>
              </label>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={prefDraft.scholarship}
                  onChange={(e) => setPrefDraft({ ...prefDraft, scholarship: e.target.checked })}
                  className="w-4 h-4 accent-[#1d4ed8]"
                />
                <span className="text-xs font-medium text-slate-700">Có mong muốn tìm hiểu học bổng &amp; hỗ trợ tài chính</span>
              </label>

              <div className="mt-5 flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1d4ed8] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e40af]"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProfilePage
