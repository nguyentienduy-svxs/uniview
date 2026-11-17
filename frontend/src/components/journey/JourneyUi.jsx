import { Link } from 'react-router-dom'
import { useJourney } from '../../context/JourneyContext'
import { STATUS_LABELS } from '../../domain/journeySelectors'

export function JourneyToast() {
  const { toast } = useJourney()
  if (!toast) return null
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border bg-white px-5 py-4 text-sm font-semibold shadow-2xl ${toast.type === 'warning' ? 'border-amber-200 text-amber-900' : 'border-emerald-200 text-emerald-800'}`}>
      <span className="material-symbols-outlined">{toast.type === 'warning' ? 'warning' : 'check_circle'}</span>
      {toast.message}
    </div>
  )
}

export function SetupStepper({ step }) {
  const items = [
    ['1', 'Chọn hướng ngành'],
    ['2', 'Chọn task'],
    ['3', 'Xác nhận Roadmap'],
  ]
  return (
    <div className="mb-8 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {items.map(([number, label], index) => (
        <div key={number} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold ${step === index + 1 ? 'bg-blue-600 text-white' : step > index + 1 ? 'bg-blue-50 text-blue-700' : 'text-slate-400'}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">{step > index + 1 ? '✓' : number}</span>
          <span className="hidden sm:inline">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function StatusBadge({ status }) {
  const tones = {
    COMPLETED: 'bg-emerald-50 text-emerald-700',
    PRIORITY_DIRECTION: 'bg-emerald-50 text-emerald-700',
    IN_PROGRESS: 'bg-blue-50 text-blue-700',
    PROMISING: 'bg-blue-50 text-blue-700',
    NEEDS_SUPPLEMENT: 'bg-amber-50 text-amber-700',
    NEEDS_MORE_EVIDENCE: 'bg-amber-50 text-amber-700',
    STOPPED: 'bg-slate-100 text-slate-600',
    DEPRIORITIZED: 'bg-slate-100 text-slate-600',
  }
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tones[status] ?? 'bg-violet-50 text-violet-700'}`}>{STATUS_LABELS[status] ?? status}</span>
}

export function TaskProgress({ value = 0 }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export function EmptyState({ title, description, to, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <span className="material-symbols-outlined text-5xl text-blue-500">route</span>
      <h3 className="mt-3 text-xl font-extrabold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{description}</p>
      {to && <Link to={to} className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">{action}</Link>}
    </div>
  )
}
