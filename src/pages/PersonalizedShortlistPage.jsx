import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import majors from '../data/majors.json'
import universitiesData from '../data/universities.json'

const GROUPS = [
  { id: 'match', label: 'Đáp ứng nhiều tiêu chí', tone: 'blue', title: 'NHÓM 1: Đáp ứng nhiều tiêu chí hiện tại', description: 'Các trường đang phù hợp tốt với ngành, khu vực, tài chính và hồ sơ học tập của bạn.' },
  { id: 'explore', label: 'Đáng khám phá', tone: 'slate', title: 'NHÓM 2: Đáng để khám phá', description: 'Những lựa chọn có nhiều điểm tương đồng với hồ sơ và có thể mở rộng phương án dự phòng.' },
  { id: 'tradeoff', label: 'Có trade-off', tone: 'amber', title: 'NHÓM 3: Có trade-off quan trọng', description: 'Chất lượng đào tạo phù hợp nhưng có yếu tố cần cân nhắc kỹ như học phí hoặc loại hình trường.' },
  { id: 'outside', label: 'Ngoài điều kiện', tone: 'slate', title: 'NHÓM 4: Ngoài một số điều kiện hiện tại', description: 'Các trường ngoài khu vực hoặc chênh lệch lớn về ngân sách, được giữ lại để bạn tham chiếu.' },
]

const DEFAULT_CRITERIA = {
  major: 'Kỹ thuật Phần mềm',
  regionId: 'ho-chi-minh-city',
  budget: 35,
  ownership: 'public',
  thptScore: 25.5,
  competencyScore: 875,
}

const normalizeText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .toLowerCase()

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const getTuitionAverage = (university) => university.tuition
  ? (university.tuition.minMillionVnd + university.tuition.maxMillionVnd) / 2
  : null

const isTechnologyMajor = (name) => [
  'cong nghe thong tin',
  'ky thuat phan mem',
  'khoa hoc may tinh',
  'tri tue nhan tao',
  'khoa hoc du lieu',
  'an toan thong tin',
].some((keyword) => normalizeText(name).includes(keyword))

function evaluateUniversity(university, criteria) {
  const exactMajor = university.featuredMajors.find((major) => normalizeText(major) === normalizeText(criteria.major))
  const relatedMajor = university.featuredMajors.find(isTechnologyMajor)
  const matchedMajor = exactMajor ?? relatedMajor ?? university.featuredMajors[0]
  const majorScore = exactMajor ? 30 : relatedMajor ? 20 : 6
  const regionScore = university.regionId === criteria.regionId ? 20 : 0
  const tuitionAverage = getTuitionAverage(university)
  const tuitionMin = university.tuition?.minMillionVnd
  const budgetScore = tuitionMin == null ? 8 : tuitionMin <= criteria.budget ? 20 : tuitionMin <= criteria.budget * 1.5 ? 10 : 0
  const ownershipScore = criteria.ownership === 'all' || university.ownership === criteria.ownership ? 10 : 2
  const scoreRange = university.admission?.scoreRange
  const admissionScore = !scoreRange?.max ? 10 : criteria.thptScore >= scoreRange.max ? 20 : criteria.thptScore >= scoreRange.max - 2 ? 14 : 7
  const score = Math.min(100, majorScore + regionScore + budgetScore + ownershipScore + admissionScore)

  let group = score >= 70 ? 'match' : 'explore'
  if (university.regionId !== criteria.regionId || (tuitionMin != null && tuitionMin > criteria.budget * 3)) group = 'outside'
  else if ((tuitionMin != null && tuitionMin > criteria.budget * 1.25) || (criteria.ownership !== 'all' && university.ownership !== criteria.ownership)) group = 'tradeoff'

  const reasons = [
    exactMajor ? `Có đúng ngành ${criteria.major}` : relatedMajor ? `Có ngành gần: ${relatedMajor}` : `Có ngành nổi bật: ${matchedMajor}`,
    university.regionId === criteria.regionId ? 'Đúng khu vực ưu tiên' : `Khác khu vực ưu tiên: ${university.city}`,
    tuitionMin != null && tuitionMin <= criteria.budget ? 'Mức học phí tối thiểu trong ngân sách' : 'Cần đối chiếu phương án tài chính',
    scoreRange?.max && criteria.thptScore >= scoreRange.max - 2 ? 'Điểm dự kiến nằm trong vùng có thể cạnh tranh' : 'Nên chuẩn bị thêm phương thức xét tuyển',
  ]

  const tradeoff = group === 'outside'
    ? university.regionId !== criteria.regionId ? 'Khoảng cách địa lý khác khu vực ưu tiên hiện tại.' : 'Mức học phí chênh lệch lớn so với ngân sách.'
    : group === 'tradeoff' ? `Học phí tham chiếu ${university.tuition?.minMillionVnd}–${university.tuition?.maxMillionVnd} triệu/năm hoặc loại hình trường khác ưu tiên.`
      : scoreRange?.max ? `Điểm chuẩn tham chiếu cao nhất khoảng ${scoreRange.max}/30; kết quả thực tế thay đổi theo năm.` : 'Cần xác minh đề án và chỉ tiêu riêng của ngành.'

  return { university, matchedMajor, score, group, reasons, tradeoff, tuitionAverage }
}

function PersonalizedShortlistPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [criteria, setCriteria] = useState(() => ({
    ...DEFAULT_CRITERIA,
    major: user?.targetMajors?.[0] ?? DEFAULT_CRITERIA.major,
    regionId: user?.preferredRegion === 'Hà Nội' ? 'ha-noi' : DEFAULT_CRITERIA.regionId,
    thptScore: Number(user?.academicProfile?.thptScore?.value ?? DEFAULT_CRITERIA.thptScore),
    competencyScore: Number(user?.academicProfile?.dgnlScore?.value ?? DEFAULT_CRITERIA.competencyScore),
    ...readJson('uniview:shortlist:criteria', {}),
  }))
  const [criteriaDraft, setCriteriaDraft] = useState(criteria)
  const [criteriaOpen, setCriteriaOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState('all')
  const [savedIds, setSavedIds] = useState(() => {
    const saved = readJson('uniview:saved:universities', [])
    return Array.isArray(saved) ? saved : []
  })
  const [comparisonIds, setComparisonIds] = useState(() => {
    const saved = readJson('uniview:comparison:universities', [])
    return Array.isArray(saved) ? saved.slice(0, 4) : []
  })
  const [outsideOpen, setOutsideOpen] = useState(false)
  const [toast, setToast] = useState('')

  const shortlist = useMemo(() => savedIds
    .map((id) => universitiesData.universities.find((university) => university.id === id))
    .filter(Boolean)
    .map((university) => evaluateUniversity(university, criteria))
    .sort((first, second) => second.score - first.score), [criteria, savedIds])

  const groupCounts = Object.fromEntries(GROUPS.map(({ id }) => [id, shortlist.filter((item) => item.group === id).length]))
  const visibleGroups = GROUPS.filter(({ id }) => activeGroup === 'all' || activeGroup === id)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const saveCriteria = () => {
    setCriteria(criteriaDraft)
    localStorage.setItem('uniview:shortlist:criteria', JSON.stringify(criteriaDraft))
    setCriteriaOpen(false)
    showToast('Đã cập nhật shortlist theo tiêu chí mới')
  }

  const toggleSaved = (event, universityId) => {
    event.stopPropagation()
    const next = savedIds.includes(universityId) ? savedIds.filter((id) => id !== universityId) : [...savedIds, universityId]
    setSavedIds(next)
    localStorage.setItem('uniview:saved:universities', JSON.stringify(next))
  }

  const toggleComparison = (event, item) => {
    event.stopPropagation()
    const selected = comparisonIds.includes(item.university.id)
    if (!selected && comparisonIds.length >= 4) {
      showToast('Bạn chỉ có thể so sánh tối đa 4 trường')
      return
    }
    const next = selected ? comparisonIds.filter((id) => id !== item.university.id) : [...comparisonIds, item.university.id]
    setComparisonIds(next)
    localStorage.setItem('uniview:comparison:universities', JSON.stringify(next))
    const majorMap = readJson('uniview:comparison:majors', {})
    if (selected) delete majorMap[item.university.id]
    else {
      const matchingMajor = majors.find((major) => normalizeText(major.name) === normalizeText(item.matchedMajor))
      if (matchingMajor) majorMap[item.university.id] = matchingMajor.id
    }
    localStorage.setItem('uniview:comparison:majors', JSON.stringify(majorMap))
  }

  const openDecisionBoard = () => {
    const preferredIds = comparisonIds.length
      ? comparisonIds
      : savedIds.length ? savedIds : shortlist.slice(0, 3).map(({ university }) => university.id)
    const selected = shortlist.filter(({ university }) => preferredIds.includes(university.id))
    localStorage.setItem('uniview:decision-board:universities', JSON.stringify(selected.map(({ university, matchedMajor }) => ({ universityId: university.id, majorName: matchedMajor }))))
    navigate('/decision-board')
  }

  return (
    <main className="min-h-screen bg-[#F7F8FF] pb-28 text-[#172033]">
      <div className="mx-auto max-w-[1240px] space-y-8 px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 text-sm text-slate-500 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2"><Link className="hover:text-[#1D4ED8]" to="/">Trang chủ</Link><span>/</span><span>Định hướng cá nhân</span><span>/</span><strong className="text-[#172033]">Shortlist trường cá nhân hóa</strong></div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-bold text-[#1D4ED8]">★ ✨ DỰA TRÊN HỒ SƠ CỦA BẠN</span>
        </div>

        <section className="flex flex-col justify-between gap-6 py-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-3"><span className="inline-flex rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-extrabold tracking-wider text-[#1D4ED8]">SHORTLIST CÁ NHÂN HÓA</span><h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">Những trường đáng để bạn khám phá tiếp</h1><p className="text-base leading-relaxed text-slate-600 sm:text-lg">Dựa trên ngành bạn đang quan tâm và các điều kiện hiện tại, UniView đã nhóm các lựa chọn để bạn dễ xem xét hơn.</p></div>
          <div className="flex flex-wrap gap-3"><button className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700" onClick={(event) => { event.stopPropagation(); setCriteriaDraft(criteria); setCriteriaOpen(true) }} type="button"><span className="material-symbols-outlined text-[18px]">tune</span>Chỉnh tiêu chí</button><Link className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50" to="/profile"><span className="material-symbols-outlined text-[18px]">person</span>Xem hồ sơ của tôi</Link></div>
        </section>

        <CriteriaSummary criteria={criteria} onEdit={() => { setCriteriaDraft(criteria); setCriteriaOpen(true) }} />

        {shortlist.length > 0 && <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto">
          <GroupButton active={activeGroup === 'all'} label={`Tất cả nhóm (${shortlist.length})`} onClick={() => setActiveGroup('all')} />
          {GROUPS.map((group) => <GroupButton active={activeGroup === group.id} key={group.id} label={`${group.label} (${groupCounts[group.id]})`} onClick={() => setActiveGroup(group.id)} />)}
        </div>}

        {shortlist.length === 0 && <section className="rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-16 text-center shadow-sm"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4ED8]"><span className="material-symbols-outlined text-3xl">favorite_border</span></div><h2 className="mt-4 text-xl font-bold">Bạn chưa lưu trường yêu thích nào</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">Hãy mở trang khám phá trường hoặc chi tiết trường, sau đó bấm biểu tượng trái tim. Chỉ những trường đã lưu mới xuất hiện trong shortlist này.</p><Link className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700" to="/universities">Khám phá trường đại học<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link></section>}

        {shortlist.length > 0 && visibleGroups.map((group) => {
          const items = shortlist.filter((item) => item.group === group.id)
          if (!items.length) return null
          if (group.id === 'outside' && activeGroup === 'all') {
            return <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm" key={group.id} onClick={() => setOutsideOpen((current) => !current)} type="button"><span><span className="text-xs font-bold text-slate-500">NHÓM 4</span><strong className="ml-2 text-xl">Ngoài một số điều kiện hiện tại ({items.length} trường tham chiếu)</strong><span className="mt-1 block text-sm font-normal text-slate-500">{group.description}</span></span><span className={`material-symbols-outlined transition-transform ${outsideOpen ? 'rotate-180' : ''}`}>expand_more</span></button>
          }
          if (group.id === 'outside' && !outsideOpen && activeGroup === 'all') return null
          return <ShortlistGroup group={group} items={items} savedIds={savedIds} comparisonIds={comparisonIds} onSave={toggleSaved} onCompare={toggleComparison} key={group.id} />
        })}
        {shortlist.length > 0 && outsideOpen && activeGroup === 'all' && <ShortlistGroup group={GROUPS[3]} items={shortlist.filter((item) => item.group === 'outside')} savedIds={savedIds} comparisonIds={comparisonIds} onSave={toggleSaved} onCompare={toggleComparison} />}

        {shortlist.length > 0 && <section className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-7 md:flex-row"><div><span className="text-xs font-bold text-[#1D4ED8]">KỊCH BẢN MÔ PHỎNG (WHAT IF?)</span><h2 className="mt-2 text-2xl font-bold">Nếu tiêu chí của bạn thay đổi thì sao?</h2><p className="mt-1 text-sm text-slate-600">Mở rộng ngân sách lên <strong>50 triệu/năm</strong> để xem shortlist được phân nhóm lại ngay.</p></div><button className="shrink-0 rounded-xl bg-[#1D4ED8] px-6 py-3 font-bold text-white hover:bg-blue-700" onClick={() => { const next = { ...criteria, budget: 50 }; setCriteria(next); setCriteriaDraft(next); localStorage.setItem('uniview:shortlist:criteria', JSON.stringify(next)); showToast('Đã mô phỏng ngân sách 50 triệu/năm') }} type="button">Thử mô phỏng kịch bản →</button></section>}

        {shortlist.length > 0 && <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><h2 className="text-2xl font-bold">Bạn đã có vài lựa chọn để cân nhắc</h2><p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">Lưu các trường bạn quan tâm hoặc đưa chúng vào Decision Board để đối chiếu đa chiều điểm chuẩn, học phí và lộ trình hồ sơ.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button className="rounded-xl bg-[#1D4ED8] px-6 py-3 font-bold text-white" onClick={openDecisionBoard} type="button">Mở Decision Board →</button><button className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700" onClick={() => window.print()} type="button">Xuất shortlist PDF</button></div></section>}
      </div>

      {comparisonIds.length > 0 && <ComparisonTray ids={comparisonIds} universities={universitiesData.universities} onRemove={(id) => { const next = comparisonIds.filter((item) => item !== id); setComparisonIds(next); localStorage.setItem('uniview:comparison:universities', JSON.stringify(next)) }} />}
      {criteriaOpen && <CriteriaModal draft={criteriaDraft} setDraft={setCriteriaDraft} onClose={() => setCriteriaOpen(false)} onSave={saveCriteria} />}
      {toast && <div className="fixed bottom-28 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-[#172033] px-5 py-2.5 text-sm font-semibold text-white shadow-xl">{toast}</div>}
    </main>
  )
}

function CriteriaSummary({ criteria, onEdit }) {
  const fields = [
    ['Ngành quan tâm', criteria.major],
    ['Khu vực ưu tiên', criteria.regionId === 'ho-chi-minh-city' ? 'TP. Hồ Chí Minh' : 'Hà Nội'],
    ['Ngân sách học phí', `≤ ${criteria.budget} triệu / năm`],
    ['Loại hình trường', criteria.ownership === 'public' ? 'ĐH Công lập / Tự chủ' : criteria.ownership === 'all' ? 'Không giới hạn' : 'ĐH Tư thục'],
    ['Điểm THPT dự kiến', `${criteria.thptScore} điểm`],
    ['Điểm ĐGNL ĐHQG', `${criteria.competencyScore} điểm`],
  ]
  return <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h2 className="font-bold">● BỐI CẢNH HIỆN TẠI UNIVIEW ĐANG DỰA TRÊN</h2><button className="text-sm font-bold text-[#1D4ED8] hover:underline" onClick={onEdit} type="button">Chỉnh sửa tiêu chí</button></div><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{fields.map(([label, value]) => <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}><span className="text-xs font-semibold text-slate-500">{label}</span><p className="mt-2 text-sm font-bold text-[#172033]">{value}</p></div>)}</div><p className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-slate-600">ⓘ Shortlist không phải bảng xếp hạng hay khẳng định đậu/rớt. Các trường được phân nhóm theo tiêu chí bạn đã cung cấp.</p></section>
}

function GroupButton({ active, label, onClick }) {
  return <button className={`shrink-0 rounded-xl border px-5 py-2.5 text-sm font-bold transition ${active ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[#1D4ED8]'}`} onClick={onClick} type="button">{label}</button>
}

function ShortlistGroup({ group, items, savedIds, comparisonIds, onSave, onCompare }) {
  const borderColor = group.tone === 'amber' ? 'border-amber-300' : group.tone === 'blue' ? 'border-blue-200' : 'border-slate-200'
  return <section className="space-y-5"><div className={`border-l-4 pl-4 ${group.tone === 'amber' ? 'border-amber-500' : group.tone === 'blue' ? 'border-[#1D4ED8]' : 'border-slate-400'}`}><h2 className="text-xl font-extrabold">{group.title} <span className="ml-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{items.length} trường</span></h2><p className="mt-1 text-sm text-slate-600">{group.description}</p></div><div className={`grid grid-cols-1 gap-5 ${items.length >= 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>{items.map((item) => <ShortlistCard item={item} saved={savedIds.includes(item.university.id)} compared={comparisonIds.includes(item.university.id)} onSave={onSave} onCompare={onCompare} borderColor={borderColor} key={item.university.id} />)}</div></section>
}

function ShortlistCard({ item, saved, compared, onSave, onCompare, borderColor }) {
  const { university, matchedMajor, score, reasons, tradeoff } = item
  const tuition = university.tuition ? `${university.tuition.minMillionVnd} – ${university.tuition.maxMillionVnd} tr/năm` : 'Đang cập nhật'
  return <article className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${borderColor}`}><div><div className="flex items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-2 text-xs"><span className="rounded bg-slate-100 px-2 py-1 font-bold text-slate-600">{university.ownershipLabel}</span><span className="text-slate-500">• {university.city}</span><span className="font-bold text-[#1D4ED8]">• {matchedMajor}</span></div>{score >= 80 && <span className="shrink-0 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">Sát hồ sơ {score}%</span>}</div><h3 className="mt-3 text-lg font-extrabold leading-snug">{university.name}</h3><div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"><div className="flex justify-between gap-3"><span className="text-slate-500">Học phí tham chiếu:</span><strong className="text-[#1D4ED8]">{tuition}</strong></div><div className="mt-2 flex justify-between gap-3"><span className="text-slate-500">Điểm chuẩn THPT:</span><strong>{university.admission?.scoreRange?.label ?? 'Điều kiện riêng'}</strong></div></div><div className="mt-4"><strong className="text-sm">● Vì sao xuất hiện:</strong><ul className="mt-2 space-y-1.5 text-sm text-slate-600">{reasons.map((reason) => <li className="flex gap-2" key={reason}><span className="text-emerald-600">✓</span>{reason}</li>)}</ul></div><div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><strong>⚠ Điều đáng cân nhắc:</strong><p className="mt-1">{tradeoff}</p></div></div><div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4"><button aria-pressed={compared} className={`rounded-lg border px-3 py-2 text-xs font-bold ${compared ? 'border-blue-300 bg-blue-50 text-[#1D4ED8]' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`} onClick={(event) => onCompare(event, item)} type="button">{compared ? '✓ So sánh' : '+ So sánh'}</button><button className={`text-xs font-bold ${saved ? 'text-rose-500' : 'text-slate-500'}`} onClick={(event) => onSave(event, university.id)} type="button">{saved ? '♥ Đã lưu' : '♡ Lưu'}</button><Link className="rounded-lg bg-[#1D4ED8] px-3 py-2 text-xs font-bold text-white hover:bg-blue-700" to={`/universities/uit?universityId=${university.id}`}>Xem trường →</Link></div></article>
}

function ComparisonTray({ ids, universities, onRemove }) {
  return <div className="fixed bottom-5 left-1/2 z-50 flex w-[min(980px,calc(100%-2rem))] -translate-x-1/2 flex-col gap-3 rounded-2xl bg-[#172033] p-3 text-white shadow-2xl sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-3"><span className="font-bold text-blue-300">▥ SO SÁNH:</span><div className="hide-scrollbar flex gap-2 overflow-x-auto">{ids.map((id) => { const university = universities.find((item) => item.id === id); return <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-600 px-3 py-1 text-sm" key={id}>{university?.shortName ?? university?.name}<button className="text-slate-400 hover:text-white" onClick={(event) => { event.stopPropagation(); onRemove(id) }} type="button">×</button></span> })}</div></div>{ids.length >= 2 ? <Link className="shrink-0 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-bold text-white" to="/compare">So sánh {ids.length} trường đã chọn →</Link> : <span className="text-xs text-slate-300">Chọn thêm ít nhất 1 trường</span>}</div>
}

function CriteriaModal({ draft, setDraft, onClose, onSave }) {
  return <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">Chỉnh tiêu chí shortlist</h2><p className="mt-1 text-sm text-slate-500">Thay đổi tiêu chí sẽ phân nhóm lại các trường ngay.</p></div><button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100" onClick={onClose} type="button">×</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="space-y-1 text-sm font-semibold">Ngành quan tâm<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" value={draft.major} onChange={(event) => setDraft((current) => ({ ...current, major: event.target.value }))} /></label><label className="space-y-1 text-sm font-semibold">Khu vực<select className="w-full rounded-xl border border-slate-200 px-3 py-2.5" value={draft.regionId} onChange={(event) => setDraft((current) => ({ ...current, regionId: event.target.value }))}><option value="ho-chi-minh-city">TP. Hồ Chí Minh</option><option value="ha-noi">Hà Nội</option></select></label><label className="space-y-1 text-sm font-semibold">Ngân sách tối đa (triệu/năm)<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" min="0" type="number" value={draft.budget} onChange={(event) => setDraft((current) => ({ ...current, budget: Number(event.target.value) }))} /></label><label className="space-y-1 text-sm font-semibold">Loại hình<select className="w-full rounded-xl border border-slate-200 px-3 py-2.5" value={draft.ownership} onChange={(event) => setDraft((current) => ({ ...current, ownership: event.target.value }))}><option value="public">Công lập / Tự chủ</option><option value="private">Tư thục</option><option value="all">Không giới hạn</option></select></label><label className="space-y-1 text-sm font-semibold">Điểm THPT<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" max="30" min="0" step="0.1" type="number" value={draft.thptScore} onChange={(event) => setDraft((current) => ({ ...current, thptScore: Number(event.target.value) }))} /></label><label className="space-y-1 text-sm font-semibold">Điểm ĐGNL<input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" max="1200" min="0" type="number" value={draft.competencyScore} onChange={(event) => setDraft((current) => ({ ...current, competencyScore: Number(event.target.value) }))} /></label></div><div className="mt-6 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100" onClick={onClose} type="button">Hủy</button><button className="rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-bold text-white" onClick={onSave} type="button">Áp dụng tiêu chí</button></div></div></div>
}

export default PersonalizedShortlistPage
