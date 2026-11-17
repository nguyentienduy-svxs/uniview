import { useState } from 'react'
import { useCatalog } from '../hooks/useCatalog'
import DataUnavailable from './DataUnavailable'

export default function ComparisonInputs({ scenarios = false }) {
  const schools = useCatalog('universities')
  const majors = useCatalog('majors')
  const [values, setValues] = useState({})
  const field = (key, label, max) => <label className="block text-sm font-semibold text-slate-700" key={key}>{label}<input className="mt-2 w-full rounded-xl border border-slate-200 p-3" type="number" min="0" max={max} step="any" value={values[key] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} /></label>
  return <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
    <h2 className="text-xl font-bold">{scenarios ? 'Thiết lập kịch bản của bạn' : 'Hồ sơ học tập và mục tiêu'}</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Trường đại học<select className="mt-2 w-full rounded-xl border p-3" value={values.school ?? ''} onChange={(event) => setValues((current) => ({...current, school: event.target.value}))}><option value="">{schools.rows.length ? 'Chọn trường' : 'Hiện tại chưa có dữ liệu trường'}</option>{schools.rows.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}</select></label>
      <label className="text-sm font-semibold">Ngành học<select className="mt-2 w-full rounded-xl border p-3" value={values.major ?? ''} onChange={(event) => setValues((current) => ({...current, major: event.target.value}))}><option value="">{majors.rows.length ? 'Chọn ngành' : 'Hiện tại chưa có dữ liệu ngành'}</option>{majors.rows.map((major) => <option key={major.id} value={major.id}>{major.name}</option>)}</select></label>
      {field('thpt', 'Điểm THPT', 30)}{field('dgnl', 'Điểm ĐGNL ĐHQG-HCM', 1200)}
      {field('budget', 'Ngân sách (triệu/năm)')}
      <label className="text-sm font-semibold">Khu vực mong muốn<input className="mt-2 w-full rounded-xl border p-3" value={values.region ?? ''} onChange={(event) => setValues((current) => ({...current, region: event.target.value}))} /></label>
      {scenarios && <>{field('targetThpt', 'Điểm THPT mục tiêu', 30)}{field('targetDgnl', 'Điểm ĐGNL mục tiêu', 1200)}{field('targetBudget', 'Ngân sách kịch bản (triệu/năm)')}</>}
    </div>
    {(schools.loading || majors.loading || schools.error || majors.error) && <DataUnavailable loading={schools.loading || majors.loading} error={schools.error || majors.error} retry={() => {schools.retry(); majors.retry()}} />}
    <div className="space-y-2"><h3 className="font-bold">Kết quả đối chiếu</h3><DataUnavailable /></div>
    <label className="block text-sm font-semibold">Ghi chú của bạn<textarea className="mt-2 w-full rounded-xl border p-3" value={values.notes ?? ''} onChange={(event) => setValues((current) => ({...current, notes: event.target.value}))} /></label>
  </section>
}
