import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { formatPrice, getPlan, PLAN_IDS } from '../data/plans'

const PLAN_BY_QUERY = {
  monthly: PLAN_IDS.MONTHLY,
  annual: PLAN_IDS.ANNUAL,
}

function PersonalDirectionCheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, purchaseCorePlan } = useAuth()
  const [confirming, setConfirming] = useState(false)

  const planId = PLAN_BY_QUERY[searchParams.get('plan')] ?? PLAN_IDS.MONTHLY
  const plan = getPlan(planId)

  const confirmDemoPayment = () => {
    if (!isAuthenticated) {
      navigate(`/login?next=${encodeURIComponent(`/checkout/personal-direction?plan=${searchParams.get('plan') ?? 'monthly'}`)}`)
      return
    }

    setConfirming(true)
    purchaseCorePlan(plan.id)
    navigate('/account/plan?payment=success', { replace: true })
  }

  return (
    <main className="min-h-[calc(100vh-20rem)] bg-[#f9f9ff] pb-20 pt-10 text-[#172033]">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#667085]">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/pricing">Bảng giá</Link>
          <span>/</span>
          <strong className="text-[#172033]">Thanh toán {plan.name}</strong>
        </nav>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="material-symbols-outlined text-base">lock</span>
              CHECKOUT DEMO AN TOÀN
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold">Xác nhận {plan.name}</h1>
            <p className="mt-2 text-sm leading-6 text-[#667085]">{plan.description}</p>

            <div className="mt-7 rounded-2xl bg-[#f1f3ff] p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-bold">{plan.name}</span>
                <strong className="font-display text-2xl text-[#1D4ED8]">{formatPrice(plan.price)}</strong>
              </div>
              <p className="mt-2 text-xs text-[#667085]">{plan.durationLabel}</p>
              <p className="mt-1 text-xs font-semibold text-[#434655]">{plan.billingLabel}</p>
            </div>

            <h2 className="mt-7 font-bold">Quyền lợi được kích hoạt</h2>
            <ul className="mt-3 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-[#434655]">
                  <span className="material-symbols-outlined text-lg text-emerald-600">check_circle</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <aside className="rounded-3xl bg-[#172033] p-6 text-white shadow-lg sm:p-8 lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Tóm tắt thanh toán</p>
            <div className="mt-5 flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-sm text-slate-300">Tổng thanh toán</span>
              <strong className="font-display text-2xl">{formatPrice(plan.price)}</strong>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <p className="flex items-start gap-2"><span className="material-symbols-outlined text-lg text-blue-300">schedule</span>Kích hoạt ngay sau khi thanh toán thành công.</p>
              <p className="flex items-start gap-2"><span className="material-symbols-outlined text-lg text-blue-300">database</span>Tắt gia hạn không xóa hồ sơ hoặc dữ liệu cũ.</p>
              <p className="flex items-start gap-2"><span className="material-symbols-outlined text-lg text-blue-300">sync_alt</span>Đổi từ Gói Tháng sang Gói Năm không thu trùng hai kỳ.</p>
            </div>

            <button
              type="button"
              disabled={confirming}
              onClick={confirmDemoPayment}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-[#172033] transition hover:bg-blue-50 disabled:cursor-wait disabled:opacity-70"
            >
              {confirming ? 'Đang kích hoạt...' : `Xác nhận demo · ${formatPrice(plan.price)}`}
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">Bản demo MVP không thực hiện giao dịch thật.</p>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default PersonalDirectionCheckoutPage
