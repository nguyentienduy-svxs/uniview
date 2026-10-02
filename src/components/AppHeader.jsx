import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Khám phá ngành', to: '/majors' },
  { label: 'Khám phá trường', to: '/universities' },
  { label: 'Công cụ tuyển sinh', to: '/admission-roadmap' },
  { label: 'So sánh', to: '/compare' },
  { label: 'Về UniView', to: '/#ve-uniview' },
]

function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full border-b border-slate-200/70 bg-[#FFFDFB]/[0.88] font-['Be_Vietnam_Pro'] backdrop-blur-[12px]">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link
          className="flex shrink-0 items-center gap-3 py-1"
          to="/"
          aria-label="UniView — Trang chủ"
          onClick={() => setIsOpen(false)}
        >
          <img
            alt="UniView"
            className="h-12 max-h-[50px] w-auto max-w-[145px] object-contain object-left"
            src="/stitch-assets/uniview-logo.png"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-[15px] font-medium lg:flex xl:gap-8" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.startsWith('/#')}
              className={({ isActive }) =>
                `relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:rounded-full after:bg-[#1D4ED8] after:transition-all ${
                  isActive
                    ? 'font-semibold text-[#1D4ED8] after:w-full'
                    : 'text-[#172033] after:w-0 hover:text-[#1D4ED8] hover:after:w-full'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <NavLink
            className="hidden items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-[14px] font-medium text-[#172033] transition-colors hover:bg-blue-50/60 sm:flex"
            to="/login"
          >
            Đăng nhập
          </NavLink>
          <NavLink
            className="group hidden items-center justify-center gap-1.5 rounded-[11px] bg-[#1D4ED8] px-5 py-[9px] text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e40af] hover:shadow-md md:inline-flex"
            to="/assessment"
          >
            <span>Bắt đầu khám phá</span>
            <span className="material-symbols-outlined text-[17px] transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </NavLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#172033] lg:hidden"
            aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-200/70 bg-[#FFFDFB] px-4 py-4 shadow-lg lg:hidden" aria-label="Điều hướng di động">
          <div className="mx-auto grid max-w-[1280px] gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? 'bg-blue-50 text-[#1D4ED8]' : 'text-[#172033] hover:bg-slate-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 sm:hidden">
              <NavLink className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold" to="/login" onClick={() => setIsOpen(false)}>
                Đăng nhập
              </NavLink>
              <NavLink className="rounded-xl bg-[#1D4ED8] px-4 py-3 text-center text-sm font-semibold text-white" to="/assessment" onClick={() => setIsOpen(false)}>
                Khám phá
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default AppHeader
