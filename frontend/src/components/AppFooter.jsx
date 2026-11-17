import { Link } from 'react-router-dom'

const footerGroups = [
  {
    title: 'Khám phá',
    links: [
      ['Ngành học', '/majors'],
      ['Trường đại học', '/universities'],
      ['So sánh', '/compare'],
      ['Bản đồ định hướng', '/admission-roadmap'],
    ],
  },
  {
    title: 'Công cụ',
    links: [
      ['Assessment sở thích', '/assessment'],
      ['Admission Checker', '/admission-checker'],
      ['Decision Board', '/decision-board'],
      ['Dự toán học phí', '/scenario-comparison'],
    ],
  },
  {
    title: 'UniView',
    links: [
      ['Về UniView', '/#ve-uniview'],
      ['Phương pháp dữ liệu', '/#phuong-phap-du-lieu'],
      ['Tất cả giao diện', '/screens'],
      ['Chính sách bảo mật', '/#chinh-sach-bao-mat'],
      ['Điều khoản sử dụng', '/#dieu-khoan-su-dung'],
    ],
  },
]

function AppFooter() {
  return (
    <footer className="w-full bg-[#172033] text-[#edf0ff]">
      <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link className="flex items-center gap-3" to="/" aria-label="UniView — Trang chủ">
              <img
                alt="UniView"
                className="h-9 w-auto object-contain brightness-0 invert"
                src="/stitch-assets/uniview-logo.png"
              />
            </Link>
            <p className="max-w-sm text-base leading-6 text-[#c4c5d7]">
              Hiểu lựa chọn của bạn. Tự tin bước vào tương lai.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-[20px] text-[#ffce63]">verified</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c4c5d7]">
                Nền tảng định hướng đại học toàn diện
              </span>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div className="space-y-4" key={group.title}>
              <h2 className="font-['Epilogue'] text-base font-semibold text-white">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map(([label, to]) => (
                  <li key={to}>
                    <Link className="block text-sm leading-5 text-[#c4c5d7] transition-colors hover:text-white" to={to}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#c4c5d7]/20 pt-6 text-sm text-[#c4c5d7] sm:flex-row">
          <p>© 2026 UniView Vietnam. Thiết kế vì thế hệ học sinh tự chủ.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#fe7488]" />
            <span className="text-[11px] font-bold tracking-wider">VIETNAM EDTECH INITIATIVE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
