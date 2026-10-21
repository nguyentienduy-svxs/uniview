import { Link } from 'react-router-dom'

import { formatPrice, hasConfiguredPrice, SOLD_PLANS } from '../data/plans'

const accentClasses = {
  blue: {
    border: 'border-blue-200',
    badge: 'bg-blue-50 text-blue-700',
    icon: 'bg-blue-100 text-blue-700',
    button: 'bg-[#1D4ED8] hover:bg-blue-700 text-white',
  },
  rose: {
    border: 'border-rose-300 ring-2 ring-rose-100',
    badge: 'bg-rose-50 text-rose-700',
    icon: 'bg-rose-100 text-rose-700',
    button: 'bg-[#A93349] hover:bg-rose-800 text-white',
  },
  amber: {
    border: 'border-amber-200',
    badge: 'bg-amber-50 text-amber-800',
    icon: 'bg-amber-100 text-amber-800',
    button: 'bg-[#765700] hover:bg-amber-800 text-white',
  },
}

const comparisonRows = [
  ['Mục tiêu chính', 'Khám phá ngắn hạn', 'Khám phá liên tục', 'Tuyển sinh theo mùa'],
  ['Workspace cá nhân', 'Có', 'Có', 'Có'],
  ['Assessment RIASEC và câu hỏi bối cảnh', 'Có', 'Có', 'Có'],
  ['Task, evidence, rubric và reflection', 'Có', 'Có', 'Có'],
  ['Roadmap thích ứng', 'Có', 'Có', 'Có'],
  ['Nguồn tuyển sinh và ngày cập nhật', '—', 'Đã bao gồm', 'Có'],
  ['Phương thức, điều kiện, hồ sơ và deadline', '—', 'Đã bao gồm', 'Có'],
  ['Kịch bản điểm, nguyện vọng và kết quả', '—', 'Đã bao gồm', 'Có'],
  ['Tự động gia hạn', 'Có thể tắt', 'Có thể tắt', 'Không'],
  ['Khi hết hạn', 'Xem dữ liệu cũ', 'Xem dữ liệu cũ', 'Xem lịch sử mùa cũ'],
]

function PlanCard({ plan }) {
  const accent = accentClasses[plan.accent]

  return (
    <article className={`relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${accent.border}`}>
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#A93349] px-3 py-1 text-xs font-bold text-white shadow-sm">
          Phù hợp để đồng hành dài hạn
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${accent.badge}`}>
            Một trong 3 gói UniView
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-[#172033]">{plan.name}</h2>
          <p className="mt-2 min-h-12 text-sm leading-6 text-[#667085]">{plan.description}</p>
        </div>
        <span className={`material-symbols-outlined rounded-2xl p-3 text-2xl ${accent.icon}`}>
          {plan.id === 'MONTHLY' ? 'calendar_month' : plan.id === 'ANNUAL' ? 'date_range' : 'school'}
        </span>
      </div>

      <div className="mt-6 border-y border-slate-100 py-5">
        <div className="flex flex-wrap items-baseline gap-2">
          <strong className="font-display text-4xl font-extrabold text-[#172033]">{formatPrice(plan.price)}</strong>
          {hasConfiguredPrice(plan) && <span className="text-sm text-[#667085]">{plan.priceSuffix}</span>}
        </div>
        {!hasConfiguredPrice(plan) && <p className="mt-2 text-xs text-[#667085]">Giá được quản trị tập trung và phải được xác nhận rõ trước khi thanh toán.</p>}
        <p className="mt-2 text-xs font-semibold text-[#434655]">{plan.billingLabel}</p>
      </div>

      <div className="mt-5 rounded-2xl bg-[#f8f9ff] p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#667085]">Phù hợp với</p>
        <p className="mt-1 text-sm leading-6 text-[#172033]">{plan.audience}</p>
      </div>

      <ul className="mt-5 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-[#434655]">
            <span className="material-symbols-outlined mt-0.5 text-[18px] text-emerald-600">check_circle</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={plan.checkoutPath}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold shadow-sm transition ${accent.button}`}
      >
        Chọn {plan.name}
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </Link>
      <p className="mt-3 text-center text-xs text-[#747686]">{plan.durationLabel}</p>
    </article>
  )
}

function PricingPage() {
  return (
    <main className="min-h-[calc(100vh-20rem)] w-full bg-[#f9f9ff] pb-20 pt-10 text-[#172033]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e9edff] via-white to-[#fff4e1] px-6 py-12 text-center shadow-sm sm:px-10 lg:py-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] shadow-sm">
              <span className="material-symbols-outlined text-base">verified</span>
              Đúng 3 gói · Minh bạch thời hạn và cách gia hạn
            </span>
            <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Chọn gói theo mục tiêu hiện tại của bạn
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#667085] sm:text-lg">
              Gói Tháng dành cho nhu cầu ngắn hạn. Gói Năm đồng hành trọn 12 tháng và đã bao gồm Admission Pass. Admission Pass cũng được bán riêng cho một mùa tuyển sinh.
            </p>
            <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-left text-sm text-[#434655]">
              <span className="material-symbols-outlined text-[#1D4ED8]">visibility</span>
              <p>
                Guest có thể làm assessment và nhận kết quả tổng quan mà không cần đăng nhập. Đây là quyền dùng thử, <strong>không phải gói Free hay gói thứ tư</strong>.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Ba gói UniView" className="grid grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {SOLD_PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">So sánh quyền lợi</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">Khác nhau ở thời hạn và mục tiêu sử dụng</h2>
            <p className="mt-2 text-sm text-[#667085]">Gói Tháng mở hành trình khám phá; Gói Năm mở toàn bộ hành trình và Admission Mode; Admission Pass dành cho người chỉ cần hỗ trợ mùa tuyển sinh.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#f1f3ff] text-[#172033]">
                <tr>
                  <th className="px-6 py-4 font-bold">Quyền lợi</th>
                  <th className="px-5 py-4 font-bold">Gói Tháng</th>
                  <th className="px-5 py-4 font-bold">Gói Năm</th>
                  <th className="px-5 py-4 font-bold">Admission Pass</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, monthly, annual, admission]) => (
                  <tr key={label} className="border-t border-slate-100">
                    <th className="px-6 py-4 font-semibold text-[#172033]">{label}</th>
                    {[monthly, annual, admission].map((value, index) => (
                      <td key={`${label}-${index}`} className="px-5 py-4 text-[#667085]">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['Không mất dữ liệu', 'Khi gói hết hạn, bạn vẫn xem được hồ sơ, task, báo cáo và lịch sử đã tạo.'],
            ['Gói Năm đã gồm Admission Pass', 'Học sinh dùng Gói Năm không phải trả thêm tiền cho Admission Pass trong thời gian gói còn hiệu lực.'],
            ['Không hứa trúng tuyển', 'Reach, Match và Safe là nhãn so sánh kịch bản, luôn đi cùng căn cứ và dữ liệu còn thiếu.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl bg-[#f1f3ff] p-5">
              <span className="material-symbols-outlined text-[#1D4ED8]">shield</span>
              <h3 className="mt-3 font-bold text-[#172033]">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#667085]">{description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-[#172033] px-6 py-8 text-white sm:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold">Phụ huynh không cần mua một gói riêng</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Khi một trong ba gói hoạt động, học sinh có thể mời phụ huynh vào workspace bằng tài khoản riêng và tự chọn nhóm dữ liệu được chia sẻ.</p>
            </div>
            <Link to="/register" className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#172033] transition hover:bg-slate-100">
              Tạo tài khoản để bắt đầu
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PricingPage
