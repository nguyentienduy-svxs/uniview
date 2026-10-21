import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { DECISION_BOARD } from '../data/decisionBoard'

const milestoneTone = {
  rose: 'border-rose-200 bg-rose-50 text-rose-800',
  amber: 'border-amber-200 bg-amber-50 text-amber-900',
  blue: 'border-blue-200 bg-blue-50 text-blue-800',
}

const statusTone = {
  blue: 'bg-blue-50 text-blue-800 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
}

function Icon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>
}

function DecisionBoardPage() {
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(null)

  const choices = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('vi')
    if (!normalized) return DECISION_BOARD.choices
    return DECISION_BOARD.choices.filter((choice) => (
      `${choice.university} ${choice.major} ${choice.acronym}`
        .toLocaleLowerCase('vi')
        .includes(normalized)
    ))
  }, [query])

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f9f9ff] pb-24 pt-6 font-['Be_Vietnam_Pro'] text-[#121b2e]">
      <div className="mx-auto max-w-[1360px] space-y-7 px-4 md:px-6 lg:px-8">
        <section className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <Link className="hover:text-[#1D4ED8]" to="/">Trang chủ</Link>
              <span>/</span>
              <span>Công cụ tuyển sinh</span>
              <span>/</span>
              <span className="font-semibold text-slate-900">Kế hoạch xét tuyển</span>
            </div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1D4ED8]">Decision Board</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Kế hoạch xét tuyển</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Theo dõi lựa chọn, hồ sơ và các mốc quan trọng của mùa tuyển sinh trên cùng một bảng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm">
              <Icon className="text-[18px] text-[#1D4ED8]">calendar_month</Icon>
              <span>Năm tuyển sinh</span>
              <select className="border-0 bg-transparent p-0 pr-7 font-bold text-[#1D4ED8] focus:ring-0" defaultValue={DECISION_BOARD.season}>
                <option>{DECISION_BOARD.season}</option>
              </select>
            </label>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-50" onClick={() => setModal('history')} type="button">
              <Icon className="text-[18px]">history</Icon>
              Lịch sử cập nhật
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700" onClick={() => setModal('add')} type="button">
              <Icon className="text-[18px]">add</Icon>
              Thêm lựa chọn
            </button>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Mốc quan trọng sắp đến <span className="text-sm font-normal text-slate-500">(3 mốc gần nhất)</span></h2>
            <span className="hidden text-xs text-slate-500 sm:block">Đồng bộ {DECISION_BOARD.lastSyncedAt}</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {DECISION_BOARD.milestones.map((milestone) => (
              <Link className={`group rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${milestoneTone[milestone.tone]}`} key={milestone.id} to={`/decision-board/${milestone.choiceId}`}>
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
                    <strong className="text-2xl leading-none">{milestone.day}</strong>
                    <span className="mt-1 text-[9px] font-bold tracking-wider">{milestone.month}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-xs font-bold"><Icon className="text-[16px]">schedule</Icon>{milestone.time}</div>
                    <h3 className="mt-1 font-bold leading-snug text-[#121b2e] group-hover:text-[#1D4ED8]">{milestone.title}</h3>
                    <p className="mt-1 truncate text-xs font-medium opacity-80">{milestone.university}</p>
                    <p className="mt-2 text-[11px] font-bold">{milestone.note}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold">Danh sách đang theo dõi</h2>
              <p className="mt-1 text-xs text-slate-500">{DECISION_BOARD.choices.length} lựa chọn trong mùa tuyển sinh {DECISION_BOARD.season}</p>
            </div>
            <label className="relative w-full md:max-w-sm">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[19px] text-slate-400">search</Icon>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1D4ED8] focus:bg-white" onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trường hoặc ngành..." type="search" value={query} />
            </label>
          </div>

          <div className="space-y-4">
            {choices.map((choice) => (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md md:p-5" key={choice.id}>
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-blue-700 text-xs font-extrabold text-white shadow-sm">{choice.acronym}</div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">{choice.university}</span>
                        <span>•</span><span>{choice.location}</span><span>•</span><span>{choice.cohort}</span>
                      </div>
                      <Link className="mt-2 block text-lg font-extrabold leading-snug hover:text-[#1D4ED8]" to={`/decision-board/${choice.id}`}>
                        {choice.major} <span className="font-medium text-slate-500">({choice.program})</span>
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {choice.methods.map((method) => <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800" key={method}>{method}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className={`w-full shrink-0 rounded-xl border p-3 xl:w-80 ${milestoneTone[choice.nextMilestone.tone]}`}>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
                      <span>{choice.nextMilestone.label}</span>
                      <Icon className="text-[17px]">event</Icon>
                    </div>
                    <p className="mt-1 font-extrabold text-[#121b2e]">{choice.nextMilestone.date}</p>
                    <p className="mt-1 text-xs opacity-80">{choice.nextMilestone.note}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 xl:items-end">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusTone[choice.statusTone]}`}>
                      <Icon className="text-[15px]">flag</Icon>{choice.statusLabel}
                    </span>
                    <span className="text-xs text-slate-500">{choice.reminder}</span>
                    <Link className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold hover:border-[#1D4ED8] hover:bg-blue-50 hover:text-[#1D4ED8]" to={`/decision-board/${choice.id}`}>
                      Xem kế hoạch <Icon className="text-[17px]">arrow_forward</Icon>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {!choices.length && <p className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">Không tìm thấy lựa chọn phù hợp.</p>}
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-2xl bg-[#e1e8ff]/60 p-4 text-sm leading-6 text-slate-600">
          <Icon className="text-[#1D4ED8]">verified_user</Icon>
          <p><strong className="text-slate-900">Tính bảo mật và chuẩn xác:</strong> Các mốc tuyển sinh được chuẩn hóa từ đề án chính thức; mọi thay đổi đều kèm nguồn và thời điểm cập nhật.</p>
        </div>
      </div>

      {modal && <BoardModal mode={modal} onClose={() => setModal(null)} />}
    </main>
  )
}

function BoardModal({ mode, onClose }) {
  const historyMode = mode === 'history'
  return (
    <div aria-modal="true" className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()} role="dialog">
      <div className="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">Kế hoạch xét tuyển</p>
            <h2 className="mt-1 text-xl font-extrabold">{historyMode ? 'Lịch sử cập nhật đề án' : 'Thêm lựa chọn vào Kế hoạch'}</h2>
          </div>
          <button aria-label="Đóng" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={onClose} type="button"><Icon>close</Icon></button>
        </div>

        {historyMode ? (
          <div className="mt-5 space-y-3">
            {DECISION_BOARD.changes.map((change) => (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={change.date + change.title}>
                <p className="text-xs font-bold text-[#1D4ED8]">{change.date}</p>
                <h3 className="mt-1 font-bold">{change.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{change.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={(event) => { event.preventDefault(); onClose() }}>
            <label className="block text-sm font-bold">Trường đại học<input className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" placeholder="Tìm và chọn trường" /></label>
            <label className="block text-sm font-bold">Ngành / chương trình<input className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" placeholder="Nhập ngành muốn theo dõi" /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-bold">Cơ sở<input className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" placeholder="Ví dụ: Thủ Đức" /></label>
              <label className="block text-sm font-bold">Năm tuyển sinh<input className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" defaultValue={DECISION_BOARD.season} /></label>
            </div>
            <p className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-900">Bản demo chưa ghi dữ liệu lên máy chủ. Form này dùng để kiểm tra luồng giao diện.</p>
            <div className="flex justify-end gap-2 pt-2"><button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold" onClick={onClose} type="button">Hủy</button><button className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-bold text-white" type="submit">Thêm lựa chọn</button></div>
          </form>
        )}
      </div>
    </div>
  )
}

export default DecisionBoardPage
