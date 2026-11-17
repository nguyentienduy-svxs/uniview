import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import ReportWorkspaceChrome from '../components/report/ReportWorkspaceChrome'
import {
  CAREER_REPORT_GROUPS,
  getPersonalizedReportGroups,
  RIASEC_DIMENSIONS,
} from '../data/careerReport'
import majorDetails from '../data/majorDetails.json'
import { buildReportSnapshot } from '../utils/reportTemplatePersonalization'

const GROUP_MAJOR_IDS = {
  'technology-software': ['7480103', '7480109', '7480202', '7480101', '7480107', '7480104'],
  'marketing-business': ['7340101', '7340115', '7340120', '7340121', '7340122', '7340405'],
  'economics-finance': ['7340201', '7340301', '7340302', '7340101', '7340120', '7340405'],
  'digital-design': ['7210403', '7210404', '7210405', '7210402', '7210401', '7320104'],
  'analysis-management': ['7340405', '7480104', '7340101', '7340122', '7480109', '7340302'],
  'communications-people': ['7320101', '7320104', '7310206', '7220201', '7229030', '7310608'],
}

function ReportMajorGroupPage() {
  const { groupId } = useParams()
  const { assessment } = useAssessment()
  const { user } = useAuth()
  const snapshot = useMemo(() => buildReportSnapshot(user, assessment), [assessment, user])
  const group = CAREER_REPORT_GROUPS.find((item) => item.id === groupId) ?? CAREER_REPORT_GROUPS[0]
  const majors = (GROUP_MAJOR_IDS[group.id] ?? GROUP_MAJOR_IDS['technology-software'])
    .map((id) => majorDetails.find((major) => major.id === id))
    .filter(Boolean)
  const personalizedGroup = useMemo(() => {
    const riasec = assessment.report?.overview?.riasec ?? {
      scores: Object.fromEntries(Object.keys(RIASEC_DIMENSIONS).map((code) => [code, 0])),
      ranking: Object.keys(RIASEC_DIMENSIONS).map((code) => ({ code, score: 0 })),
    }
    return getPersonalizedReportGroups(riasec, assessment.profile, assessment.experience, 6)
      .find((item) => item.id === group.id)
  }, [assessment.experience, assessment.profile, assessment.report?.overview?.riasec, group.id])

  return (
    <ReportWorkspaceChrome activePath="top-3-categories" reportCode={snapshot.reportCode} snapshot={snapshot} title={`Nhóm ngành · ${group.name}`}>
      <main className="min-h-[calc(100vh-138px)] bg-[#f9f9ff] px-4 py-8 sm:px-6 lg:px-8" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9e2fc] pb-5">
          <div className="flex items-center gap-2 text-sm text-[#56657a]"><Link to="/report" className="font-semibold text-[#1d4ed8] hover:underline">Báo cáo Assessment</Link><span>›</span><span>Nhóm ngành</span><span>›</span><strong className="text-[#172033]">{group.name}</strong></div>
          <Link to="/report" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#172033] shadow-sm hover:bg-[#e9edff]"><span className="text-lg text-[#1d4ed8]" aria-hidden="true">←</span>Quay lại báo cáo</Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl"><p className="text-xs font-black uppercase text-[#1d4ed8]">6 ngành trong nhóm đề xuất</p><h1 className="mt-2 text-3xl font-black leading-tight text-[#121b2e] md:text-4xl">{group.name}</h1><p className="mt-4 text-base leading-7 text-[#56657a]">{personalizedGroup?.personalizedReason ?? group.reason} Mở từng ngành để xem phân tích chi tiết, điều cần cân nhắc và các trường phù hợp.</p></div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-[#eff6ff] px-5 py-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d4ed8] font-black text-white" aria-hidden="true">✓</span><div><strong className="block text-2xl text-[#1d4ed8]">{personalizedGroup?.matchScore ?? 60}/100</strong><span className="text-xs font-semibold text-[#56657a]">Mức ưu tiên khám phá</span></div></div>
          </div>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {majors.map((major, index) => {
            const recommended = personalizedGroup?.majors.find((item) => item.detailId === major.id)
            const score = recommended?.matchScore ?? Math.max(55, (personalizedGroup?.matchScore ?? 72) - index * 3)
            return <article key={major.id} className="flex min-h-[330px] flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e1e8ff]">
              <div className="flex items-start justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-sm font-black text-[#1d4ed8]">0{index + 1}</span><span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-black text-[#1d4ed8]">Khớp {score}%</span></div>
              <p className="mt-5 text-xs font-bold text-[#75839a]">Mã ngành: {major.code}</p><h2 className="mt-1 text-xl font-black leading-7 text-[#172033]">{major.name}</h2><p className="mt-1 text-sm font-semibold text-[#1d4ed8]">{major.englishName}</p><p className="mt-4 text-sm leading-6 text-[#56657a]">{major.summary ?? major.description}</p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e3eaf4] pt-5"><span className="text-xs font-semibold text-[#75839a]">{major.market?.trainingDuration ?? '4 năm'} · {major.market?.degree ?? 'Cử nhân'}</span><Link to={`/report/major/${major.id}?group=${group.id}`} className="inline-flex items-center gap-1 text-sm font-black text-[#1d4ed8] hover:underline">Chi tiết <span aria-hidden="true">→</span></Link></div>
            </article>
          })}
        </section>

        <section className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#e9edff] p-7 md:flex-row md:items-center md:p-9"><div><p className="text-xs font-black uppercase text-[#1d4ed8]">Sau khi đọc chi tiết</p><h2 className="mt-2 text-2xl font-black text-[#172033]">Chọn 2–3 ngành để kiểm chứng bằng Roadmap</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#56657a]">Danh sách này là giả thuyết ban đầu. Roadmap giúp bạn thử các nhiệm vụ gần với công việc thật trước khi giữ hoặc loại một lựa chọn.</p></div><Link to="/roadmap/setup/directions" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-3 text-sm font-black text-white">Bắt đầu Roadmap <span aria-hidden="true">→</span></Link></section>
      </div>
      </main>
    </ReportWorkspaceChrome>
  )
}

export default ReportMajorGroupPage
