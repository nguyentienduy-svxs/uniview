import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f9f9ff] px-6 py-20 text-center">
      <div>
        <p className="font-['Epilogue'] text-7xl font-extrabold text-[#dce1ff]">404</p>
        <h1 className="mt-3 font-['Epilogue'] text-3xl font-bold text-[#172033]">Trang này chưa có trong bản đồ UniView</h1>
        <p className="mt-3 text-[#667085]">Quay về trang chủ hoặc xem toàn bộ 31 giao diện đã triển khai.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link className="rounded-full bg-[#1d4ed8] px-6 py-3 font-semibold text-white" to="/">Về trang chủ</Link>
          <Link className="rounded-full border border-[#1d4ed8]/20 bg-white px-6 py-3 font-semibold text-[#1d4ed8]" to="/screens">Xem tất cả trang</Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
