import { Link } from 'react-router-dom'

import { RIASEC_DIMENSIONS } from '../../data/careerReport'

const GROUP_ICON_PATHS = {
  terminal: 'M8 9l3 3-3 3m5 0h3M5 5h14v14H5z',
  campaign: 'M5 13V9l10-4v12L5 13zm0 0l2 5h3l-2-4',
  account_balance: 'M4 10h16M6 10v7m4-7v7m4-7v7m4-7v7M3 19h18M12 4l9 4H3l9-4z',
  palette: 'M12 4a8 8 0 100 16h1.2a1.8 1.8 0 001.2-3.1 1.8 1.8 0 011.2-3.1H20A8 8 0 0012 4zm-4 7h.01M11 8h.01M15 9h.01',
  monitoring: 'M5 18V9m5 9V5m5 13v-6m4 6V8',
  diversity_3: 'M8 11a3 3 0 110-6 3 3 0 010 6zm8 0a3 3 0 110-6 3 3 0 010 6zM3 19c.4-4 2-6 5-6s4.6 2 5 6m-2 0c.4-4 2-6 5-6s4.6 2 5 6',
}

function GroupIcon({ name }) {
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={GROUP_ICON_PATHS[name] ?? GROUP_ICON_PATHS.monitoring} /></svg>
}

function ChevronIcon() {
  return <svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 7.5l5 5 5-5" /></svg>
}

export function ReportSection({ id, eyebrow, title, intro, action, children, className = '' }) {
  return (
    <section id={id} className={`uv-report-surface uv-report-section ${className}`}>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          {eyebrow && <p className="uv-report-eyebrow">{eyebrow}</p>}
          <h2 className="uv-report-section-title mt-2">{title}</h2>
          {intro && <p className="uv-report-body mt-3">{intro}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

export function EvidenceNote({ tone = 'blue', title, children }) {
  const toneClass = tone === 'warning' ? 'uv-report-note-warning' : tone === 'coral' ? 'uv-report-note-coral' : ''
  return <div className={`uv-report-note ${toneClass}`}><strong className="block text-sm">{title}</strong><p className="mt-1 text-sm leading-6">{children}</p></div>
}

function polarPoint(index, radius, center = 130) {
  const angle = (-90 + index * 60) * (Math.PI / 180)
  return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`
}

export function RiasecRadar({ scores }) {
  const codes = ['R', 'I', 'A', 'S', 'E', 'C']
  const grid = [25, 50, 75, 100]
  const resultPoints = codes.map((code, index) => polarPoint(index, 92 * (Math.max(0, scores[code] ?? 0) / 100))).join(' ')
  return (
    <div className="mx-auto w-full max-w-[330px]" aria-label="Biểu đồ radar kết quả RIASEC">
      <svg viewBox="0 0 260 260" role="img" aria-labelledby="riasec-radar-title">
        <title id="riasec-radar-title">Biểu đồ sáu chiều RIASEC</title>
        {grid.map((level) => <polygon key={level} points={codes.map((_, index) => polarPoint(index, 92 * level / 100)).join(' ')} fill={level === 100 ? '#F7F9FC' : 'none'} stroke="#D7E0EE" strokeWidth="1" />)}
        {codes.map((code, index) => {
          const [x, y] = polarPoint(index, 92).split(',')
          const [labelX, labelY] = polarPoint(index, 112).split(',')
          return <g key={code}><line x1="130" y1="130" x2={x} y2={y} stroke="#D7E0EE" /><text x={labelX} y={Number(labelY) + 4} textAnchor="middle" fill="#56657A" fontSize="12" fontWeight="700">{code}</text></g>
        })}
        <polygon points={resultPoints} fill="rgba(29, 78, 216, 0.18)" stroke="#1D4ED8" strokeWidth="3" strokeLinejoin="round" />
        {codes.map((code, index) => {
          const [x, y] = polarPoint(index, 92 * (Math.max(0, scores[code] ?? 0) / 100)).split(',')
          return <circle key={code} cx={x} cy={y} r="4" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" />
        })}
      </svg>
    </div>
  )
}

export function RiasecDimension({ code, score, isTop }) {
  const dimension = RIASEC_DIMENSIONS[code]
  const safeScore = Math.max(0, Math.min(100, score ?? 0))
  return (
    <div className="border-b border-[#E3EAF4] py-4 last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <div><strong className="text-[15px] text-[#172033]">{code} · {dimension.label}</strong><span className="ml-2 text-[13px] text-[#75839A]">{dimension.name}</span></div>
        <strong className={isTop ? 'text-[#1D4ED8]' : 'text-[#56657A]'}>{safeScore}%</strong>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EDF1F7]"><div className={`h-full rounded-full ${isTop ? 'bg-[#1D4ED8]' : 'bg-[#9AA8BB]'}`} style={{ width: `${safeScore}%` }} /></div>
      <p className="mt-2 text-[13px] leading-5 text-[#56657A]">{dimension.description}</p>
    </div>
  )
}

export function MajorRecommendationCard({ group, index }) {
  return (
    <article className="uv-report-surface flex min-h-full flex-col p-6 shadow-none">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#1D4ED8]"><GroupIcon name={group.icon} /></span>
        <span className="text-xs font-semibold text-[#75839A]">0{index + 1}</span>
      </div>
      <h3 className="mt-4 text-[18px] font-bold leading-7 text-[#172033]">{group.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[#56657A]">{group.reason}</p>
      <div className="mt-5 border-t border-[#E3EAF4]">
        {group.majors.map((major) => (
          <details key={major.id} className="group/major border-b border-[#E3EAF4] last:border-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-[14px] font-semibold text-[#172033] hover:text-[#1D4ED8]">
              {major.name}<span className="text-[#75839A] transition group-open/major:rotate-180"><ChevronIcon /></span>
            </summary>
            <div className="pb-4 text-[13px] leading-6 text-[#56657A]">
              <p><strong className="text-[#172033]">Nội dung:</strong> {major.learn}</p>
              <p className="mt-2"><strong className="text-[#172033]">Tín hiệu:</strong> {major.fit}</p>
              <p className="mt-2"><strong className="text-[#172033]">Cần kiểm chứng:</strong> {major.evidenceGap}</p>
              <div className="mt-3 flex flex-wrap gap-2"><Link to={`/schools/recommendations?major=${major.id}`} className="uv-report-link font-bold text-[#1D4ED8] hover:text-[#1E40AF]">Xem trường</Link><span aria-hidden="true" className="text-[#BCC6D5]">·</span><Link to="/roadmap/setup/directions" className="uv-report-link font-bold text-[#1D4ED8] hover:text-[#1E40AF]">Kiểm chứng ngành</Link></div>
            </div>
          </details>
        ))}
      </div>
      <p className="mt-auto pt-4 text-[13px] leading-5 text-[#936000]"><strong>Điểm cần làm rõ:</strong> {group.unknown}</p>
    </article>
  )
}

function schoolInitials(name) {
  return name.replace(/Trường|Đại học|Cơ sở|Việt Nam|TP\.HCM/gi, '').split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase() || 'UV'
}

export function UniversityRecommendationCard({ school, saved, onToggle }) {
  const hasMissingAdmission = school.criteria.admission.includes('Chưa có')
  return (
    <article className="uv-report-surface flex min-h-full flex-col p-6 shadow-none">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D5E1F5] bg-[#EAF1FF] text-sm font-extrabold text-[#1D4ED8]" aria-hidden="true">{schoolInitials(school.name)}</div>
        <div className="min-w-0"><p className="text-xs font-semibold text-[#75839A]">{school.region} · Dữ liệu demo</p><h3 className="mt-1 text-[16px] font-bold leading-6 text-[#172033]">{school.name}</h3><p className="mt-1 text-sm font-semibold text-[#1D4ED8]">{school.program}</p></div>
      </div>
      <dl className="mt-5 space-y-3 border-t border-[#E3EAF4] pt-4 text-[13px] leading-5 text-[#56657A]">
        <div><dt className="font-semibold text-[#172033]">Phù hợp cá nhân</dt><dd>{school.criteria.major}; {school.criteria.location.toLowerCase()}.</dd></div>
        <div><dt className="font-semibold text-[#172033]">Học phí</dt><dd>{school.criteria.finance}</dd></div>
        <div><dt className="font-semibold text-[#172033]">Môi trường</dt><dd>{school.criteria.environment}</dd></div>
      </dl>
      {hasMissingAdmission && <div className="mt-4 rounded-xl bg-[#FFF5DB] px-3.5 py-3 text-[12px] leading-5 text-[#936000]"><strong>Thiếu dữ liệu xét tuyển:</strong> chưa có điểm đầu vào, UniView không quy đổi thành 0.</div>}
      <div className="mt-auto flex items-center gap-2 pt-5">
        <button type="button" onClick={onToggle} className={saved ? 'uv-report-button-secondary flex-1 border-[#F7C7D0] bg-[#FFF0F2] text-[#B54058]' : 'uv-report-button-secondary flex-1'}>{saved ? 'Đã lưu Shortlist' : 'Lưu Shortlist'}</button>
        <Link to={school.path} aria-label={`Xem ${school.name}`} className="uv-report-button-primary px-3.5"><span className="text-lg leading-none" aria-hidden="true">→</span></Link>
      </div>
    </article>
  )
}

export function MissingDataNotice({ children }) {
  return <div className="flex gap-3 rounded-xl border border-[#F2D99B] bg-[#FFF5DB] px-4 py-3 text-sm leading-6 text-[#936000]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold" aria-hidden="true">i</span><span>{children}</span></div>
}
