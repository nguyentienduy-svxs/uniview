import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { PLAN_IDS } from '../data/plans'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const performLogin = async () => {
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      const loggedInSession = await login(identifier, password)
      const params = new URLSearchParams(location.search)
      const defaultPath = loggedInSession.activePlans?.includes(PLAN_IDS.ANNUAL)
        ? '/report'
        : loggedInSession.activePlans?.includes(PLAN_IDS.ADMISSION_PASS)
          ? '/admission/overview'
          : '/assessment'
      navigate(params.get('next') || defaultPath, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    void performLogin()
  }

  return (
    <main className="w-full bg-[#FFFDFB] min-h-[calc(100vh-80px)] py-4 sm:py-6 flex items-center justify-center font-['Be_Vietnam_Pro']">
      <div className="relative w-full max-w-[1120px] mx-auto px-3 sm:px-6">
        <div className="absolute -top-12 left-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="w-full bg-white rounded-3xl shadow-[0_12px_40px_-15px_rgba(23,32,51,0.1)] p-3 sm:p-5 md:p-6 relative border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Cột trái: Giới thiệu & Định hướng */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#eff6ff] via-white to-[#fff1f2] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border border-blue-50">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 text-blue-800 text-xs font-bold uppercase mb-3 shadow-2xs">
                  <span>✨ Chào mừng trở lại</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight mb-2">
                  Tiếp tục hành trình khám phá của bạn
                </h1>
                <p className="text-xs text-[#56657a] leading-relaxed mb-4">
                  Quay lại những ngành, trường và lựa chọn bạn đang cân nhắc trên UniView với dữ liệu tuyển sinh đối chiếu minh bạch.
                </p>

                <div className="flex flex-col gap-2.5 mb-4 text-xs">
                  <div className="rounded-xl bg-white/90 p-3 flex items-center gap-3 shadow-2xs border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0 font-bold">
                      🧭
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-slate-900">Khám phá ngành &amp; trường</h2>
                      <p className="text-[11px] text-slate-500 truncate">Học phí, chuẩn đầu ra và đề án tuyển sinh mới nhất.</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/90 p-3 flex items-center gap-3 shadow-2xs border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold">
                      ❤️
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-slate-900">Wishlist trường &amp; ngành</h2>
                      <p className="text-[11px] text-slate-500 truncate">Truy cập danh sách trường và tổ hợp đã lưu.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-200/50 mt-auto">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#1D4ED8]">UniView Vietnam</span>
                  <span>Mùa tuyển sinh 2026</span>
                </div>
              </div>
            </div>

            {/* Cột phải: Form Đăng nhập trực tiếp (Gọn gàng, vừa vặn khung hình) */}
            <div className="lg:col-span-7 px-2 sm:px-4 md:px-6 py-2 flex flex-col justify-center">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-blue-700 tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded font-bold">
                    UniView Authentication
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#172033] tracking-tight">
                  Đăng nhập
                </h2>
                <p className="text-xs text-[#56657a] mt-0.5">
                  Đăng nhập bằng tài khoản email để truy cập hồ sơ và kết quả khảo sát của bạn.
                </p>
              </div>

              {/* Box đăng ký tài khoản nhanh cho người dùng mới */}
              <div className="mb-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 to-indigo-50/80 p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#172033] flex items-center gap-1.5">
                    <span>✨</span> Bạn chưa có tài khoản?
                  </p>
                  <p className="text-[11px] text-[#56657a] truncate sm:whitespace-normal">
                    Đăng ký miễn phí chỉ 30 giây để bắt đầu làm bài khảo sát ngay.
                  </p>
                </div>
                <Link
                  to={location.search ? `/register${location.search}` : '/register'}
                  className="shrink-0 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-white px-3.5 py-2 text-xs font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Đăng ký ngay</span>
                  <span>→</span>
                </Link>
              </div>

              <form className="space-y-3.5" id="loginForm" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="emailInput">
                    Username hoặc Email
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    id="emailInput"
                    placeholder="name@example.com hoặc username"
                    required
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        void performLogin()
                      }
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700" htmlFor="passwordInput">
                      Mật khẩu
                    </label>
                    <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                      Quên mật khẩu?
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                      id="passwordInput"
                      placeholder="Nhập mật khẩu của bạn"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          void performLogin()
                        }
                      }}
                    />
                    <button
                      aria-label="Ẩn hiện mật khẩu"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer text-xs"
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                  </div>
                </div>

                {error && <p className="rounded-xl bg-rose-50 p-2.5 text-xs font-semibold text-rose-700">{error}</p>}

                <button
                  id="loginSubmitBtn"
                  className="w-full py-2.5 px-5 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  disabled={submitting}
                  onClick={() => void performLogin()}
                  type="button"
                >
                  <span>{submitting ? 'Đang đăng nhập…' : 'Đăng nhập vào UniView →'}</span>
                </button>
              </form>

              <div className="text-center mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-600">
                  Chưa có tài khoản UniView?{' '}
                  <Link
                    className="font-bold text-[#1D4ED8] hover:underline"
                    to={location.search ? `/register${location.search}` : '/register'}
                  >
                    Đăng ký tài khoản miễn phí →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
