import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  ['overview', 'space_dashboard', 'Tổng quan báo cáo'],
  ['personality-profile', 'psychology', 'Chân dung cá nhân'],
  ['academic-performance', 'query_stats', 'Phân tích học tập'],
  ['top-3-categories', 'verified', 'Top 3 nhóm ngành'],
  ['advice', 'lightbulb', 'Lời khuyên định hướng'],
  ['roadmap', 'flag', 'Roadmap kiểm chứng'],
]

export default function ReportWorkspaceChrome({ activePath = 'top-3-categories', children, reportCode, snapshot, title }) {
  return (
    <div className="min-h-[calc(100vh-74px)] bg-[#f9f9ff]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="grid min-h-[calc(100vh-74px)] lg:grid-cols-[288px_minmax(0,1fr)]">
        <aside className="sticky top-[74px] hidden h-[calc(100vh-74px)] flex-col justify-between bg-[#f1f3ff] px-4 py-6 shadow-[1px_0_8px_rgba(0,0,0,0.03)] lg:flex">
          <div>
            <Link to="/report" className="flex items-center gap-3 px-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d4ed8] font-black text-white">U</span><span><strong className="block text-xl text-[#1d4ed8]">UniView</strong><small className="text-[11px] font-semibold text-[#56657a]">Career Guidance Suite</small></span></Link>
            <div className="mt-6 rounded-xl bg-white px-4 py-3 shadow-sm"><p className="text-[11px] font-bold uppercase text-[#75839a]">Mã hồ sơ học sinh</p><p className="mt-1 text-sm font-bold text-[#172033]">{reportCode}</p></div>
            <p className="mt-7 px-3 text-[11px] font-bold uppercase text-[#75839a]">Phân vùng báo cáo</p>
            <nav className="mt-3 space-y-1.5">{NAV_ITEMS.map(([path, icon, label]) => <Link key={path} to={`/report?section=${path}`} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${activePath === path ? 'bg-[#1d4ed8] text-white shadow-sm' : 'text-[#56657a] hover:bg-[#e1e8ff] hover:text-[#172033]'}`}><span className="material-symbols-outlined w-5 text-lg opacity-80">{icon}</span><span>{label}</span></Link>)}</nav>
          </div>
          <div className="rounded-2xl bg-white/70 p-3"><div className="flex justify-between text-xs font-semibold text-[#56657a]"><span>Độ hoàn thiện hồ sơ</span><strong className="text-[#1d4ed8]">{snapshot.completeness}%</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#d9e2fc]"><div className="h-full rounded-full bg-[#1d4ed8]" style={{ width: `${snapshot.completeness}%` }} /></div></div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-[74px] z-30 flex h-16 items-center justify-between gap-4 border-b border-[#e1e8ff] bg-[#f9f9ff]/95 px-4 shadow-sm backdrop-blur md:px-8"><div className="min-w-0"><p className="text-[11px] font-bold uppercase text-[#75839a]">Assessment <span className="px-1 text-[#c4c5d7]">›</span></p><h1 className="truncate text-sm font-bold text-[#172033]">{title}</h1></div><div className="flex items-center gap-3"><Link to="/report/pdf" className="hidden min-h-10 items-center rounded-full bg-white px-5 text-sm font-bold text-[#172033] shadow-sm hover:bg-[#e9edff] sm:inline-flex">Xuất báo cáo PDF</Link><div className="hidden text-right md:block"><strong className="block text-sm text-[#172033]">{snapshot.shortName}</strong><span className="text-xs text-[#75839a]">{snapshot.grade}</span></div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9edff] text-xs font-black text-[#1d4ed8]">{snapshot.fullName.split(/\s+/).slice(-2).map((part) => part[0]).join('').toUpperCase()}</span></div></header>
          {children}
        </div>
      </div>
    </div>
  )
}
