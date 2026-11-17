import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { JourneyToast, SetupStepper } from '../components/journey/JourneyUi'
import { useJourney } from '../context/JourneyContext'
import { ANNUAL_DEMO_GROUPS } from '../data/annualDemo'

function RoadmapDirectionSetupPage() {
  const navigate = useNavigate()
  const { state, selectMajors } = useJourney()
  const [query, setQuery] = useState('')
  const selected = state.selectedMajorIds
  const toggle = (id) => selectMajors(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id])

  return (
    <main className="min-h-screen bg-[#f5f7ff] py-10">
      <JourneyToast />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SetupStepper step={1} />
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">Thiết lập Roadmap · Gói Năm</p>
            <h1 className="mt-1 font-['Epilogue'] text-3xl font-black text-slate-950">Bạn muốn kiểm chứng hướng ngành nào?</h1>
            <p className="mt-2 text-slate-600">Chọn theo sự tò mò của bạn. Đây không phải quyết định cuối cùng.</p>
          </div>
          <label className="flex min-w-72 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-0 bg-transparent text-sm outline-none" placeholder="Tìm ngành khác…" />
          </label>
        </div>

        <div className="space-y-6">
          {ANNUAL_DEMO_GROUPS.map((group) => {
            const majors = group.majors.filter((major) => major.name.toLowerCase().includes(query.toLowerCase()))
            if (!majors.length) return null
            return (
              <section key={group.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[270px_1fr]">
                  <div>
                    <span className="material-symbols-outlined text-3xl text-blue-600">{group.icon}</span>
                    <h2 className="mt-2 text-xl font-black text-slate-950">{group.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{group.reason}</p>
                    <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800"><strong>Chưa biết:</strong> {group.unknown}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {majors.map((major) => {
                      const active = selected.includes(major.id)
                      return (
                        <button key={major.id} type="button" onClick={() => toggle(major.id)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-extrabold text-slate-900">{major.name}</h3>
                            <span className={`material-symbols-outlined text-xl ${active ? 'text-blue-600' : 'text-slate-300'}`}>{active ? 'check_circle' : 'radio_button_unchecked'}</span>
                          </div>
                          <p className="mt-3 text-xs font-semibold text-slate-500">3 nhiệm vụ vòng đầu · có thể khám phá thêm</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        <div className="sticky bottom-4 mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
          <p className="text-sm font-bold text-slate-700">Đã chọn <span className="text-blue-600">{selected.length}</span> ngành</p>
          <div className="flex gap-3">
            <Link to="/report" className="rounded-xl px-4 py-3 text-sm font-bold text-slate-600">Quay lại report</Link>
            <button type="button" disabled={!selected.length} onClick={() => navigate('/roadmap')} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Mở Roadmap ngành →</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RoadmapDirectionSetupPage
