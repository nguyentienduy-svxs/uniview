import { Link, useLocation } from 'react-router-dom'
import { useCatalog } from '../hooks/useCatalog'

// These views have database endpoints. Rich demo-only fields must never be
// copied onto API records: missing information stays missing.
export function RealCatalogPage({ kind, detail = false }) {
  const location = useLocation()
  const state = useCatalog(kind)
  const label = kind === 'majors' ? 'ngành học' : 'trường đại học'
  const id = new URLSearchParams(location.search).get(kind === 'majors' ? 'majorId' : 'universityId')
    ?? location.pathname.split('/').at(-1)
  const rows = state.rows.filter((row) => row.id === id)
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">{detail ? 'Chi tiết' : 'Khám phá'} {label}</h1>
      {state.loading ? <p role="status">Đang tải dữ liệu...</p> : state.error ? (
        <div role="alert"><p>Không thể tải dữ liệu. Vui lòng thử lại.</p><button className="mt-3 underline" onClick={state.retry}>Thử lại</button></div>
      ) : rows.length === 0 ? <p role="status">{state.rows.length === 0 ? `Chưa có dữ liệu ${label}.` : detail ? 'Không tìm thấy dữ liệu này.' : 'Không có kết quả phù hợp.'}</p> : (
        <><p className="mb-4">{rows.length} {label}</p><div className="grid gap-5 md:grid-cols-2">{rows.map((row) => (
          <article key={row.id} className="rounded-2xl bg-white border p-6 space-y-3">
            <h2 className="text-xl font-bold">{row.name}</h2>
            {row.code && <p>Mã: {row.code}</p>}
            {row.city && <p>Địa điểm: {row.city}</p>}
            {row.category && <p>Nhóm ngành: {row.category}</p>}
            {row.description && <p>{row.description}</p>}
            <p>Học phí: {row.tuitionRange || 'Chưa có dữ liệu'}</p>
            {row.popularCombinations && <p>Tổ hợp: {row.popularCombinations}</p>}
            {!detail && <Link className="text-blue-700 underline" to={kind === 'majors' ? `/majors/software-engineering?majorId=${encodeURIComponent(row.id)}` : `/universities/uit?universityId=${encodeURIComponent(row.id)}`}>Xem chi tiết</Link>}
          </article>
        ))}</div></>
      )}
    </main>
  )
}

export function UnavailableRealDataPage() {
  return <main className="mx-auto max-w-4xl px-6 py-16 min-h-[60vh]"><h1 className="text-2xl font-bold mb-4">Chưa có dữ liệu</h1><p>Tính năng này chưa có dữ liệu thực để hiển thị.</p><Link className="inline-block mt-6 text-blue-700 underline" to="/">Về trang chủ</Link></main>
}
