import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDataMode } from '../../context/DataModeContext'
import { SOLD_PLANS, formatPrice, hasConfiguredPrice, formatPlanDate, PLAN_IDS } from '../../data/plans'

export default function PlanManagementPanel({ catalog = SOLD_PLANS }) {
  const { activePlans, subscriptions, admissionSeason, setSubscriptionAutoRenew } = useAuth()
  const { isRealMode } = useDataMode()
  const [params] = useSearchParams()
  const selected = catalog.find((plan) => plan.id === params.get('plan'))
  const href = (planId) => {
    const next = new URLSearchParams(params)
    next.set('tab', 'plans')
    if (planId) next.set('plan', planId)
    else next.delete('plan')
    return `/profile?${next}`
  }
  const renderPrice = (plan) => <><strong className="text-2xl font-extrabold tracking-tight text-[#172033]">{formatPrice(plan.price)}</strong>{hasConfiguredPrice(plan) && <span className="ml-1 text-xs text-slate-500">{plan.priceSuffix}</span>}</>

  if (selected) {
    const subscription = subscriptions.find((item) => item.planId === selected.id)
    const isActive = activePlans.includes(selected.id)
    const included = selected.id === PLAN_IDS.ADMISSION_PASS && activePlans.includes(PLAN_IDS.ANNUAL)
    return <section className="space-y-6" aria-labelledby="plan-detail-title">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline" to={href()}>← Tất cả gói</Link>
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Chi tiết gói</span>
        <h2 id="plan-detail-title" className="mt-2 text-2xl font-extrabold text-[#172033]">{selected.name}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{selected.description}</p>
        <div className="mt-5">{renderPrice(selected)}</div>
        {(isActive || included) && <p className="mt-3 text-sm font-bold text-emerald-700">{included ? 'Đã bao gồm trong Gói Năm của bạn' : 'Gói đang hoạt động'}</p>}
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4"><dt className="font-bold text-slate-800">Phù hợp với ai?</dt><dd className="mt-2 leading-6 text-slate-600">{selected.audience}</dd></div>
        <div className="rounded-xl border border-slate-200 p-4"><dt className="font-bold text-slate-800">Thời hạn sử dụng</dt><dd className="mt-2 leading-6 text-slate-600">{subscription?.endsAt ? `Đến ${formatPlanDate(subscription.endsAt)}` : selected.durationLabel}{selected.id === PLAN_IDS.ADMISSION_PASS && admissionSeason ? ` · Mùa ${admissionSeason}` : ''}</dd></div>
      </dl>
      <div><h3 className="font-bold text-slate-900">Quyền lợi của gói</h3><ul className="mt-3 space-y-3">{selected.features.map((feature) => <li className="flex gap-3 text-sm leading-6 text-slate-600" key={feature}><span className="font-bold text-blue-600" aria-hidden="true">✓</span>{feature}</li>)}</ul></div>
      <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><p className="font-semibold text-slate-800">{selected.billingLabel}</p><p className="mt-2">Hết hạn vẫn xem được hồ sơ và lịch sử đã tạo. Gói chỉ được kích hoạt sau khi thanh toán thành công.</p></div>
      {isActive && subscription && selected.id !== PLAN_IDS.ADMISSION_PASS && <div className="space-y-3 rounded-xl border border-slate-200 p-4"><p className="text-sm font-semibold text-slate-800">Tự động gia hạn: {subscription.autoRenew ? 'Đang bật' : 'Đã tắt'}</p>{!isRealMode && <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50" onClick={() => setSubscriptionAutoRenew(selected.id, !subscription.autoRenew)}>{subscription.autoRenew ? 'Tắt tự động gia hạn' : 'Bật tự động gia hạn'}</button>}</div>}
      {!isActive && !included && <Link className="inline-flex items-center justify-center rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700" to={selected.checkoutPath}>Chọn {selected.name} →</Link>}
    </section>
  }

  return <section className="space-y-6" aria-labelledby="profile-plans-title">
    <div><span className="text-xs font-bold uppercase tracking-wider text-blue-700">Danh mục hồ sơ</span><h2 id="profile-plans-title" className="mt-2 text-2xl font-extrabold text-[#172033]">Quản lý gói</h2><p className="mt-2 text-sm leading-6 text-slate-600">{activePlans.length ? 'Xem quyền lợi gói đang dùng hoặc tìm hiểu thêm các lựa chọn bên dưới.' : 'Bạn chưa kích hoạt gói. Tìm hiểu các lựa chọn dưới đây để chọn gói phù hợp với nhu cầu của mình.'}</p></div>
    {params.has('plan') && <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Không tìm thấy gói này. Hãy chọn một trong các gói bên dưới.</p>}
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3" aria-label="Các gói UniView">{catalog.map((plan) => {
      const active = activePlans.includes(plan.id)
      const included = plan.id === PLAN_IDS.ADMISSION_PASS && activePlans.includes(PLAN_IDS.ANNUAL)
      return <article className={`flex flex-col rounded-2xl border p-5 ${active ? 'border-blue-400 bg-blue-50/40' : 'border-slate-200 bg-white'}`} key={plan.id}>
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-extrabold text-[#172033]">{plan.name}</h3>{(active || included) && <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{active ? 'Đang sử dụng' : 'Đã bao gồm'}</span>}</div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
        <div className="my-4 border-y border-slate-100 py-4">{renderPrice(plan)}<p className="mt-2 text-xs font-medium text-slate-500">{plan.durationLabel}</p></div>
        <p className="text-xs font-bold text-slate-800">Dành cho bạn nếu...</p><p className="mt-2 text-sm leading-6 text-slate-600">{plan.audience}</p>
        <ul className="mt-4 flex-1 space-y-2">{plan.features.slice(0, 3).map((feature) => <li className="flex gap-2 text-xs leading-5 text-slate-600" key={feature}><span className="text-blue-600" aria-hidden="true">✓</span>{feature}</li>)}</ul>
        <Link className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-100" to={href(plan.id)} aria-label={`Xem chi tiết ${plan.name}`}>Xem chi tiết <span aria-hidden="true">→</span></Link>
      </article>
    })}</div>
  </section>
}
