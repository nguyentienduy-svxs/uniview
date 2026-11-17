export default function DataUnavailable({ loading = false, error = null, retry }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600" role={error ? 'alert' : 'status'}>
    <p>{loading ? 'Đang tải dữ liệu...' : error ? 'Không thể tải dữ liệu. Vui lòng thử lại.' : 'Hiện tại chưa có dữ liệu để đối chiếu.'}</p>
    {error && retry && <button type="button" className="mt-3 text-blue-700 underline" onClick={retry}>Thử lại</button>}
  </div>
}
