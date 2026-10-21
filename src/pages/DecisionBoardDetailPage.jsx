import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getDecisionChoice } from '../data/decisionBoard'

const statusOptions = [
  ['considering', 'Đang cân nhắc'],
  ['preparing', 'Đang chuẩn bị'],
  ['submitted', 'Đã nộp hồ sơ'],
  ['pending', 'Chờ kết quả'],
  ['resulted', 'Đã có kết quả'],
  ['paused', 'Dừng theo dõi'],
]

const timelineStyle = {
  complete: { dot: 'bg-emerald-600 text-white', badge: 'bg-emerald-50 text-emerald-700', card: '' },
  active: { dot: 'bg-rose-500 text-white ring-rose-100', badge: 'bg-rose-600 text-white', card: 'rounded-2xl border border-rose-200 bg-rose-50 p-4' },
  upcoming: { dot: 'bg-slate-300 text-white', badge: 'bg-slate-100 text-slate-600', card: '' },
}

function Icon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>
}

function DecisionBoardDetailPage() {
  const { choiceId } = useParams()
  const choice = getDecisionChoice(choiceId)
  const [status, setStatus] = useState(choice?.status ?? 'considering')
  const [round, setRound] = useState(0)
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [checkedItems, setCheckedItems] = useState(() => (
    Object.fromEntries((choice?.checklist ?? []).map((item) => [item.id, item.done]))
  ))
  const [toast, setToast] = useState('')

  const progress = useMemo(() => {
    if (!choice?.checklist.length) return 0
    const completed = choice.checklist.filter((item) => checkedItems[item.id]).length
    return Math.round((completed / choice.checklist.length) * 100)
  }, [checkedItems, choice])

  if (!choice) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f9f9ff] px-4 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <Icon className="text-4xl text-slate-400">search_off</Icon>
          <h1 className="mt-3 text-2xl font-extrabold">Không tìm thấy kế hoạch</h1>
          <Link className="mt-5 inline-flex rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-bold text-white" to="/decision-board">Quay lại Decision Board</Link>
        </div>
      </main>
    )
  }

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f9f9ff] pb-24 pt-6 font-['Be_Vietnam_Pro'] text-[#121b2e]">
      <div className="mx-auto max-w-[1360px] px-4 md:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link className="group inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold shadow-sm hover:bg-[#e9edff] hover:text-[#1D4ED8]" to="/decision-board">
              <Icon className="text-[18px] transition group-hover:-translate-x-0.5">arrow_back</Icon>
              Quay lại Kế hoạch xét tuyển
            </Link>
            <span className="hidden text-sm text-slate-500 md:block">/ {choice.acronym} — {choice.major}</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Đang kích hoạt đồng bộ</span>
        </div>

        <section className="relative mb-6 overflow-hidden rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-blue-700 p-3 text-lg font-extrabold text-white shadow-md">
                {choice.acronym}
                <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 shadow-sm"><Icon className="block text-[16px] text-[#1D4ED8]">verified</Icon></span>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                  <span className="rounded-full bg-[#dce1ff] px-2.5 py-1 text-[#001551]">Mã ngành: {choice.majorCode}</span>
                  <span className="rounded-full bg-[#e9edff] px-2.5 py-1 text-slate-600">{choice.cohort}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{choice.location}</span>
                </div>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{choice.major} <span className="text-lg font-medium text-[#1D4ED8]">({choice.program})</span></h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600"><Icon className="text-[18px] text-[#1D4ED8]">school</Icon><strong className="text-slate-900">{choice.university}</strong><span>•</span><span>Theo dõi {choice.methods.length} phương thức</span></div>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#f1f3ff] px-4 py-2.5 text-sm font-bold hover:bg-[#e1e8ff]" onClick={() => notify('Đã chuẩn bị bản PDF của kế hoạch')} type="button"><Icon className="text-[19px] text-[#1D4ED8]">picture_as_pdf</Icon>Xuất PDF</button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#f1f3ff] px-4 py-2.5 text-sm font-bold hover:bg-[#e1e8ff]" onClick={() => notify('Đã sao chép liên kết chia sẻ')} type="button"><Icon className="text-[19px]">share</Icon>Chia sẻ</button>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-white p-4 shadow-sm md:p-5">
          <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="flex items-center gap-2"><Icon className="text-[20px] text-[#1D4ED8]">flag</Icon><span className="text-sm font-extrabold uppercase tracking-wide">Trạng thái chuẩn bị cá nhân</span></div>
            <span className="text-xs text-slate-500">Lần cập nhật cuối: Hôm nay lúc 14:15</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {statusOptions.map(([value, label]) => (
              <button className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${status === value ? 'bg-[#1D4ED8] text-white shadow-sm' : value === 'paused' ? 'bg-slate-50 text-rose-600 hover:bg-rose-50' : 'bg-[#f1f3ff] text-slate-600 hover:bg-[#e1e8ff]'}`} key={value} onClick={() => { setStatus(value); notify(`Đã chuyển trạng thái: ${label}`) }} type="button">{label}{status === value ? ' ✓' : ''}</button>
            ))}
          </div>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500"><Icon className="mt-0.5 text-[15px]">info</Icon>Tiến độ do bạn chủ động cập nhật để tổ chức kế hoạch cá nhân, không can thiệp vào hệ thống xét tuyển chính thức.</p>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-8">
            <div className="flex gap-2 rounded-2xl bg-[#f1f3ff] p-1.5">
              {choice.rounds.map((item, index) => (
                <button className={`flex-1 rounded-xl px-3 py-3 text-sm font-bold transition ${round === index ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`} key={item} onClick={() => setRound(index)} type="button">{item}{round === index ? ' · Đang xem' : ''}</button>
              ))}
            </div>

            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700"><Icon>notification_important</Icon></div><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-rose-700 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Đang diễn ra</span><span className="text-xs font-bold text-rose-700">{choice.nextMilestone.date}</span></div><p className="mt-2 text-sm font-semibold leading-6">{choice.alert}</p></div></div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-[#f1f3ff]/70 px-4 py-3"><div className="flex items-center gap-2"><Icon className="text-[#1D4ED8]">timeline</Icon><h2 className="text-lg font-extrabold">Lộ trình & các mốc thời gian</h2></div><span className="hidden text-xs font-semibold text-slate-500 sm:block">{choice.rounds[round]}</span></div>
              <div className="relative space-y-7 pl-8 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-0.5 before:bg-slate-200">
                {choice.timeline.map((item) => {
                  const style = timelineStyle[item.state]
                  return (
                    <div className={`relative ${style.card}`} key={item.id}>
                      <span className={`absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${style.dot}`}>{item.state === 'complete' ? <Icon className="text-[14px]">check</Icon> : ''}</span>
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div><div className="flex flex-wrap items-center gap-2"><span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${style.badge}`}>{item.label}</span><span className="text-xs font-bold text-slate-500">{item.date}</span></div><h3 className="mt-2 font-extrabold">{item.title}</h3><p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">{item.description}</p></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex items-end justify-between gap-4"><div><div className="flex items-center gap-2"><Icon className="text-[#1D4ED8]">checklist</Icon><h2 className="text-lg font-extrabold">Checklist hồ sơ & minh chứng</h2></div><p className="mt-1 text-xs text-slate-500">Đánh dấu theo tiến độ chuẩn bị thực tế của bạn.</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-extrabold text-[#1D4ED8]">{progress}%</span></div>
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1D4ED8] transition-all" style={{ width: `${progress}%` }} /></div>
              <div className="space-y-2">
                {choice.checklist.map((item) => (
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-3 hover:border-slate-200 hover:bg-slate-50" key={item.id}>
                    <input checked={Boolean(checkedItems[item.id])} className="mt-0.5 h-4 w-4 rounded text-[#1D4ED8]" onChange={(event) => setCheckedItems((current) => ({ ...current, [item.id]: event.target.checked }))} type="checkbox" />
                    <span className="flex-1 text-sm"><span className={checkedItems[item.id] ? 'text-slate-400 line-through' : 'font-semibold'}>{item.title}</span><span className={`ml-2 rounded px-1.5 py-0.5 text-[9px] font-bold ${item.required ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{item.required ? 'Bắt buộc' : 'Cá nhân tự thêm'}</span></span>
                  </label>
                ))}
              </div>
              <button className="mt-3 w-full rounded-xl border border-dashed border-slate-300 py-2.5 text-xs font-bold text-slate-500 hover:border-[#1D4ED8] hover:text-[#1D4ED8]" onClick={() => notify('Đã mở thao tác thêm giấy tờ')} type="button">+ Thêm giấy tờ cần chuẩn bị</button>
            </div>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Icon className="text-[#1D4ED8]">notifications_active</Icon><div><h2 className="font-extrabold">Cài đặt nhắc lịch</h2><p className="text-xs text-slate-500">Cảnh báo các mốc quan trọng</p></div></div><button aria-pressed={remindersEnabled} className={`relative h-6 w-11 rounded-full transition ${remindersEnabled ? 'bg-[#1D4ED8]' : 'bg-slate-300'}`} onClick={() => setRemindersEnabled((value) => !value)} type="button"><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${remindersEnabled ? 'left-[22px]' : 'left-0.5'}`} /></button></div>
              <div className={`mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm ${remindersEnabled ? '' : 'pointer-events-none opacity-45'}`}>
                {['Email', 'Thông báo trên UniView', 'SMS cho mốc khẩn cấp'].map((channel, index) => <label className="flex items-center gap-2" key={channel}><input defaultChecked={index < 2} className="rounded text-[#1D4ED8]" type="checkbox" />{channel}</label>)}
                <label className="block text-xs font-bold text-slate-500">Nhắc trước<select className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"><option>7 ngày và 1 ngày</option><option>3 ngày và 1 ngày</option><option>Chỉ 1 ngày</option></select></label>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2"><Icon className="text-[#1D4ED8]">verified</Icon><h2 className="font-extrabold">Nguồn dữ liệu tuyển sinh</h2></div>
              <div className="mt-4 rounded-2xl bg-[#f1f3ff] p-4"><p className="text-sm font-bold">{choice.source.title}</p><p className="mt-1 text-xs leading-5 text-slate-600">{choice.source.code}</p><p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">Cập nhật {choice.source.updatedAt}</p></div>
              <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold hover:bg-slate-50" onClick={() => notify('Đang mở nguồn đề án chính thức')} type="button">Xem đề án gốc <Icon className="text-[17px]">open_in_new</Icon></button>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2"><Icon className="text-[#1D4ED8]">support_agent</Icon><h2 className="font-extrabold">Hỗ trợ xét tuyển {choice.acronym}</h2></div>
              <div className="mt-4 space-y-3 text-sm"><p className="flex items-center gap-2"><Icon className="text-[18px] text-slate-400">call</Icon><strong>{choice.contact.phone}</strong></p><p className="flex items-center gap-2"><Icon className="text-[18px] text-slate-400">mail</Icon><span>{choice.contact.email}</span></p></div>
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">Khi liên hệ trường, hãy ghi lại mã hồ sơ và nội dung trao đổi để dễ đối chiếu về sau.</p>
            </section>
          </aside>
        </div>
      </div>

      {toast && <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
    </main>
  )
}

export default DecisionBoardDetailPage
