import { useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { JourneyToast } from '../components/journey/JourneyUi'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { useDataMode } from '../context/DataModeContext'
import { useJourney } from '../context/JourneyContext'
import { RIASEC_DIMENSIONS } from '../data/careerReport'
import { buildAssessmentReportViewModel } from '../data/reportViewModel'
import { majorRoadmapPath } from '../utils/roadmapRoutes'

const TABS = [['overview', 'Tổng quan'], ['portrait', 'Chân dung cá nhân'], ['majors', 'Nhóm ngành & ngành'], ['academic', 'Học tập & tuyển sinh'], ['next', 'Bước tiếp theo']]
const RIASEC_CODES = ['R', 'I', 'A', 'S', 'E', 'C']

function RadarChart({ scores }) {
  const point = (index, radius) => {
    const angle = (-90 + index * 60) * Math.PI / 180
    return `${120 + Math.cos(angle) * radius},${120 + Math.sin(angle) * radius}`
  }
  const result = RIASEC_CODES.map((code, index) => point(index, 76 * Number(scores?.[code] ?? 0) / 100)).join(' ')
  return <svg viewBox="0 0 240 240" className="mx-auto h-64 w-64" role="img" aria-label="Biểu đồ RIASEC">
    {[25, 50, 75, 100].map((level) => <polygon key={level} points={RIASEC_CODES.map((_, index) => point(index, 76 * level / 100)).join(' ')} fill={level === 100 ? '#f8fafc' : 'none'} stroke="#dbe4f3" />)}
    {RIASEC_CODES.map((code, index) => { const [x, y] = point(index, 76).split(','); const [lx, ly] = point(index, 98).split(','); return <g key={code}><line x1="120" y1="120" x2={x} y2={y} stroke="#dbe4f3" /><text x={lx} y={Number(ly) + 4} textAnchor="middle" className="fill-slate-600 text-[11px] font-bold">{code}</text></g> })}
    <polygon points={result} fill="rgba(37,86,235,.18)" stroke="#2556eb" strokeWidth="3" />
  </svg>
}

function AnnualReportPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const { isMockMode } = useDataMode()
  const { state, toggleMajorShortlist, ensureMajorRoadmap } = useJourney()
  const report = useMemo(() => buildAssessmentReportViewModel({ user, assessment, journeyState: state, isMockMode }), [assessment, isMockMode, state, user])
  const requestedTab = searchParams.get('tab')
  const activeTab = TABS.some(([id]) => id === requestedTab) ? requestedTab : 'overview'
  const activeGroup = report.groups.find((group) => group.id === searchParams.get('group')) ?? report.groups[0]
  const setTab = (tab, group) => {
    const next = new URLSearchParams(searchParams)
    next.set('tab', tab)
    if (group) next.set('group', group)
    else next.delete('group')
    setSearchParams(next)
  }
  const openRoadmap = (majorId) => {
    if (ensureMajorRoadmap(majorId, report.assessmentResultId)) navigate(majorRoadmapPath(majorId))
  }

  if (!report.groups.length) return <main className="min-h-[70vh] bg-[#f6f8fc] px-4 py-16"><section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-[#172033] shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-[#2556eb]">Assessment report</p><h1 className="mt-3 text-3xl font-black">Chưa có dữ liệu báo cáo</h1><p className="mt-3 leading-7 text-slate-600">Real API chưa trả về kết quả Assessment cho tài khoản này. UniView sẽ không dùng dữ liệu Mock để lấp vào báo cáo.</p><Link to="/assessment" className="mt-6 inline-flex rounded-xl bg-[#2556eb] px-5 py-3 text-sm font-bold text-white">Làm Assessment →</Link></section></main>

  return <main className="min-h-screen bg-[#f6f8fc] pb-16 text-[#172033]">
    <JourneyToast />
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-4 py-7 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#2556eb]">Assessment report {isMockMode && '· Dữ liệu minh họa'}</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">Bản đồ định hướng của {report.snapshot.shortName}</h1><p className="mt-2 text-sm text-slate-600">3 nhóm ngành · 18 ngành để khám phá và kiểm chứng, không phải kết luận nghề nghiệp cố định.</p></div><Link to="/report/pdf" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#1d4ed8]">Xem bản PDF</Link></div>
      <nav className="flex gap-1 overflow-x-auto" aria-label="Các phần của báo cáo">{TABS.map(([id, label], index) => <button key={id} type="button" onClick={() => setTab(id)} className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold ${activeTab === id ? 'bg-[#2556eb] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{index + 1}. {label}</button>)}</nav>
    </div></header>

    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
      {activeTab === 'overview' && <section><div className="rounded-3xl bg-[#172033] p-7 text-white md:p-10"><p className="text-sm font-bold text-blue-200">Mã RIASEC hiện tại: {report.snapshot.top3}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">Bắt đầu từ ba hướng rộng, rồi dùng trải nghiệm thật để thu hẹp lựa chọn.</h2><button type="button" onClick={() => setTab('majors', report.groups[0]?.id)} className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-black text-[#172033]">Khám phá 18 ngành →</button></div><div className="mt-6 grid gap-5 md:grid-cols-3">{report.groups.map((group, index) => <article key={group.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-xs font-black text-[#2556eb]">NHÓM {index + 1} · ƯU TIÊN {group.priorityScore}/100</span><h3 className="mt-2 text-xl font-black">{group.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{group.personalizedReason}</p><button type="button" onClick={() => setTab('majors', group.id)} className="mt-5 text-sm font-bold text-[#2556eb]">Xem 6 ngành →</button></article>)}</div></section>}

      {activeTab === 'portrait' && <section className="grid gap-6 lg:grid-cols-[380px_1fr]"><article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-xl font-black">Tín hiệu RIASEC</h2><RadarChart scores={report.riasec.scores} /><p className="text-center text-sm text-slate-600">Mã nổi bật: <strong>{report.snapshot.top3}</strong></p></article><div className="grid gap-4 sm:grid-cols-2">{RIASEC_CODES.map((code) => <article key={code} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="font-black">{code} · {RIASEC_DIMENSIONS[code].label}</h3><strong className="text-[#2556eb]">{Math.round(report.riasec.scores?.[code] ?? 0)}</strong></div><p className="mt-2 text-sm leading-6 text-slate-600">{RIASEC_DIMENSIONS[code].description}</p></article>)}</div><div className="lg:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Điều còn cần kiểm chứng:</strong> điểm RIASEC mô tả hứng thú hiện tại. Roadmap sẽ giúp đối chiếu với cách bạn làm việc, phản ứng với feedback và sức bền khi làm nhiệm vụ thật.</div></section>}
      {activeTab === 'portrait' && Object.entries(assessment.experience?.domainStates ?? {}).some(([, value]) => value?.status === 'COMPLETED') && <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-black">Trải nghiệm thực tế đã ghi nhận</h2><div className="mt-3 flex flex-wrap gap-2">{Object.entries(assessment.experience.domainStates).filter(([, value]) => value?.status === 'COMPLETED').map(([domain, value]) => <span key={domain} className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">{domain.replaceAll('_', ' ')} · tín hiệu {Math.round(value.finalEvidenceScore ?? 0)}/100</span>)}</div></section>}

      {activeTab === 'majors' && <section><div className="flex gap-2 overflow-x-auto pb-4">{report.groups.map((group, index) => <button key={group.id} type="button" onClick={() => setTab('majors', group.id)} className={`shrink-0 rounded-xl border px-4 py-3 text-left text-sm font-bold ${activeGroup?.id === group.id ? 'border-[#2556eb] bg-blue-50 text-[#1d4ed8]' : 'border-slate-200 bg-white text-slate-600'}`}>Nhóm {index + 1} · {group.name}</button>)}</div><div className="mb-5 rounded-2xl border border-blue-100 bg-white p-5"><h2 className="text-2xl font-black">{activeGroup?.name}</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{activeGroup?.personalizedReason}</p></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{activeGroup?.majors.map((major, index) => <article key={major.id} className="flex min-h-[360px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-[#2556eb]">{String(index + 1).padStart(2, '0')} · {major.code}</span><span className="text-xs font-bold text-slate-500">Ưu tiên {major.matchScore}/100</span></div><h3 className="mt-4 text-xl font-black">{major.name}</h3><p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{major.personalizedReason}</p><div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-950"><strong>Cần kiểm chứng:</strong> {major.evidenceGap}</div><div className="mt-4 text-xs text-slate-500"><strong>Trường tham khảo:</strong> {major.schools.length ? major.schools.map((school) => school.name).join(' · ') : 'Chưa có dữ liệu phù hợp'}</div><div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-5"><Link to={`/report/major/${major.id}?returnTab=majors&group=${activeGroup.id}`} className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-bold">Chi tiết ngành</Link><button type="button" onClick={() => toggleMajorShortlist(major.id)} className={`rounded-lg border px-3 py-2 text-xs font-bold ${major.isSaved ? 'border-blue-200 bg-blue-50 text-[#2556eb]' : 'border-slate-200'}`}>{major.isSaved ? 'Đã lưu' : 'Lưu Shortlist'}</button><button type="button" onClick={() => openRoadmap(major.id)} className="col-span-2 rounded-lg bg-[#2556eb] px-3 py-2.5 text-xs font-bold text-white">{major.roadmap.status === 'NOT_STARTED' ? 'Bắt đầu Roadmap' : 'Tiếp tục Roadmap'} →</button></div></article>)}</div></section>}

      {activeTab === 'academic' && <section><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-black">Học tập & tuyển sinh</h2><p className="mt-2 text-slate-600">Thông tin thiếu được giữ là “chưa cập nhật”, không quy đổi thành 0.</p></div><Link to="/assessment/quick-profile" className="rounded-xl bg-[#2556eb] px-5 py-3 text-sm font-bold text-white">Cập nhật hồ sơ</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['GPA', report.profile.gpa], ['Điểm THPT', report.profile.thptScore], ['Điểm ĐGNL', report.profile.dgnlScore], ['Chứng chỉ', report.profile.certificates?.map((certificate) => typeof certificate === 'string' ? certificate : certificate.name ?? certificate.type ?? certificate.certificateType).filter(Boolean).join(', ')], ['Môn thế mạnh', report.profile.strengths?.join(', ')], ['Khu vực ưu tiên', report.profile.regions?.join(', ')], ['Ngân sách học phí', report.profile.tuition]].map(([label, value]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className={`mt-2 text-lg font-black ${value ? '' : 'text-slate-400'}`}>{value || 'Chưa cập nhật'}</p></article>)}</div><div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-slate-700">Dùng <Link to="/admission-checker" className="font-bold text-[#2556eb]">Admission Checker</Link> để đối chiếu điểm với trường cụ thể sau khi bổ sung dữ liệu.</div></section>}

      {activeTab === 'next' && <section><div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-10"><p className="text-xs font-black uppercase text-[#2556eb]">Từ gợi ý đến bằng chứng</p><h2 className="mt-2 text-3xl font-black">Chặng tiếp theo của bạn</h2><div className="mt-7 grid gap-3 md:grid-cols-5">{['Chọn ngành', 'Làm nhiệm vụ', 'Nộp evidence', 'Reflection', 'Đọc báo cáo kiểm chứng'].map((step, index) => <div key={step} className="rounded-xl bg-slate-50 p-4"><span className="text-xs font-black text-[#2556eb]">0{index + 1}</span><p className="mt-2 text-sm font-bold">{step}</p></div>)}</div>{state.majorShortlist?.length ? <div className="mt-7"><p className="text-sm font-bold">Ngành đã lưu: {state.majorShortlist.length}</p><div className="mt-3 flex flex-wrap gap-2">{report.majors.filter((major) => state.majorShortlist.includes(major.id)).map((major) => <button key={major.id} type="button" onClick={() => openRoadmap(major.id)} className="rounded-full border border-blue-200 px-4 py-2 text-sm font-bold text-[#2556eb]">{major.name} →</button>)}</div></div> : <p className="mt-7 text-sm text-slate-600">Bạn chưa lưu ngành nào. Hãy quay lại danh sách 18 ngành và chọn một hướng muốn thử trước.</p>}<button type="button" onClick={() => state.majorShortlist?.[0] ? openRoadmap(state.majorShortlist[0]) : setTab('majors', report.groups[0]?.id)} className="mt-8 rounded-xl bg-[#2556eb] px-6 py-3 text-sm font-black text-white">{state.majorShortlist?.length ? 'Bắt đầu Roadmap đầu tiên' : 'Chọn ngành để bắt đầu'} →</button></div></section>}
    </div>
  </main>
}

export default AnnualReportPage
