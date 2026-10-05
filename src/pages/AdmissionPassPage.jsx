// src/pages/AdmissionPassPage.jsx
// Route: /admission-pass
// Landing/purchase page for Personalized Admission Pass
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ENTITLEMENTS } from '../components/header/headerConfig'

export default function AdmissionPassPage() {
  const { isAuthenticated, hasEntitlement } = useAuth()
  const hasAdmissionPass = hasEntitlement(ENTITLEMENTS.ADMISSION_PASS)

  if (hasAdmissionPass) {
    return (
      <main className="w-full pt-10 pb-16 bg-[#FFFDFB] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro']">
        <div className="max-w-[640px] mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700">
            <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Bạn đã kích hoạt Admission Pass
          </div>
          <h1 className="text-2xl font-extrabold text-[#172033]">Admission Pass của bạn đang hoạt động</h1>
          <p className="text-[#667085] text-sm leading-relaxed">
            Tất cả tính năng Decision Board, Route Mapping và Scenario Comparison đã được mở khóa cho mùa tuyển sinh của bạn.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to="/decision-board" className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all hover:-translate-y-0.5">
              Mở Decision Board
            </Link>
            <Link to="/admission-route-mapping" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#172033] shadow-sm hover:bg-slate-50 transition-colors">
              Route Mapping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full pt-8 pb-20 bg-[#FFFDFB] min-h-[calc(100vh-80px)] font-['Be_Vietnam_Pro'] text-[#172033]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── HERO ── */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-white to-[#FFF1F2] border border-blue-100 shadow-md p-8 sm:p-12 text-center">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#1D4ED8]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-[#FB7185]/10 blur-3xl" />
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd" />
              </svg>
              PERSONALIZED ADMISSION PASS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Mở khóa toàn bộ công cụ tuyển sinh<br className="hidden sm:inline" />
              <span className="text-[#1D4ED8]"> cá nhân hóa</span>
            </h1>
            <p className="text-base text-[#667085] leading-relaxed">
              Một gói duy nhất mở khóa Decision Board, Admission Route Mapping và Scenario Comparison — tất cả đều dựa trên hồ sơ học tập thực tế của bạn.
            </p>
            <div className="flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-4xl font-extrabold text-[#172033]">89.000đ</span>
              <span className="text-[#667085] text-base">/ mùa tuyển sinh</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                to="/checkout/admission-pass"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >
                Mua Admission Pass — 89.000đ
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#172033] shadow-sm hover:bg-slate-50 transition-colors"
                >
                  Đăng nhập để tiếp tục
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="space-y-4">
          <h2 className="text-center text-xl font-extrabold text-[#172033]">Tính năng được mở khóa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Decision Board',
                icon: '📋',
                desc: 'Tổ chức các lựa chọn đại học, thêm ghi chú cá nhân, so sánh đa chiều và theo dõi tiến trình quyết định.',
                to: '/decision-board',
                cta: 'Xem trước',
              },
              {
                title: 'Admission Route Mapping',
                icon: '🗺️',
                desc: 'Đối chiếu hồ sơ học tập với từng phương thức tuyển sinh để biết route nào đã đủ dữ liệu.',
                to: '/admission-route-mapping',
                cta: 'Xem trước',
              },
              {
                title: 'Scenario Comparison',
                icon: '⚡',
                desc: 'Thử các kịch bản giả định — thay đổi điểm, ngân sách, khu vực — để thấy lựa chọn thay đổi ra sao.',
                to: '/scenario-comparison',
                cta: 'Xem trước',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="text-base font-bold text-[#172033]">{f.title}</h3>
                <p className="text-sm text-[#667085] leading-relaxed">{f.desc}</p>
                <Link to={f.to} className="text-xs font-semibold text-[#1D4ED8] hover:underline">
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <section className="rounded-xl bg-[#EFF6FF] border border-blue-100 px-5 py-4 text-sm text-[#1e40af] leading-relaxed">
          <strong className="font-semibold">Lưu ý:</strong> Admission Pass là công cụ hỗ trợ quyết định dựa trên dữ liệu tuyển sinh lịch sử và thông tin bạn cung cấp. Kết quả không phải là dự báo hay cam kết tuyển sinh. Quyết định nộp hồ sơ luôn thuộc về bạn.
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#172033]">Câu hỏi thường gặp</h2>
          {[
            {
              q: 'Admission Pass bao gồm những gì?',
              a: 'Decision Board đầy đủ, Admission Route Mapping cá nhân hóa, và Scenario Comparison — tất cả trong một mùa tuyển sinh.',
            },
            {
              q: 'Gói này có khác với Direction Snapshot 39k không?',
              a: 'Có. Direction Snapshot (39k) cung cấp Báo cáo định hướng cá nhân. Admission Pass (89k) mở khóa các công cụ hỗ trợ quyết định tuyển sinh thực tế.',
            },
            {
              q: 'Dữ liệu của tôi có được bảo mật không?',
              a: 'UniView chỉ sử dụng thông tin bạn nhập để tính toán đối chiếu. Chúng tôi không chia sẻ dữ liệu cá nhân với bên thứ ba.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="font-semibold text-sm text-[#172033] mb-1.5">{q}</p>
              <p className="text-sm text-[#667085] leading-relaxed">{a}</p>
            </div>
          ))}
        </section>

        {/* ── BOTTOM CTA ── */}
        <div className="text-center space-y-3 pt-4">
          <Link
            to="/checkout/admission-pass"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
          >
            Mua Admission Pass — 89.000đ
          </Link>
          <p className="text-xs text-[#667085]">Thanh toán an toàn • Không tự động gia hạn</p>
        </div>

      </div>
    </main>
  )
}
