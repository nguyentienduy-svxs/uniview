import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { formatPlanDate, formatPrice, getPlan, hasConfiguredPrice, PLAN_IDS } from '../data/plans'
import { ENTITLEMENTS } from '../data/user'

function ActivePlanCard({ plan, admissionSeason, subscription, onToggleRenewal }) {
  const isAdmissionPass = plan.id === PLAN_IDS.ADMISSION_PASS
  const autoRenew = Boolean(subscription?.autoRenew)

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-extrabold text-[#172033]">
              {plan.name}{isAdmissionPass && admissionSeason ? ` ${admissionSeason}` : ''}
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Đang hoạt động
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">{plan.description}</p>
        </div>
        <div className="sm:text-right">
          <strong className="font-display text-2xl text-[#1D4ED8]">{formatPrice(plan.price)}</strong>
          {hasConfiguredPrice(plan) && <p className="mt-1 text-xs text-[#667085]">{plan.priceSuffix.replace('/ ', '')}</p>}
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl bg-[#f1f3ff] p-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#667085]">Thời hạn</p>
          <p className="mt-1 text-sm font-semibold text-[#172033]">
            {subscription?.startedAt && subscription?.endsAt
              ? `${formatPlanDate(subscription.startedAt)} – ${formatPlanDate(subscription.endsAt)}`
              : isAdmissionPass && admissionSeason
                ? `01/09/${Number(admissionSeason) - 1} – 30/09/${admissionSeason}`
                : plan.durationLabel}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#667085]">Gia hạn</p>
          <p className="mt-1 text-sm font-semibold text-[#172033]">
            {isAdmissionPass ? 'Không tự động gia hạn' : autoRenew ? 'Đang bật tự động gia hạn' : 'Đã tắt tự động gia hạn'}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#667085]">Dữ liệu khi hết hạn</p>
          <p className="mt-1 text-sm font-semibold text-[#172033]">Vẫn xem được lịch sử đã tạo</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
        <p className="text-sm text-[#667085]">
          {isAdmissionPass
            ? 'Pass gắn đúng một năm tuyển sinh, không chuyển nhượng và không đổi sang năm khác.'
            : plan.id === PLAN_IDS.ANNUAL
              ? 'Gói Năm đã bao gồm Admission Pass; tắt gia hạn không xóa hồ sơ hoặc dữ liệu cũ.'
            : 'Tắt gia hạn không làm mất quyền trong thời gian còn lại và không xóa hồ sơ.'}
        </p>
        {!isAdmissionPass && (
          <button
            type="button"
            onClick={onToggleRenewal}
            className="shrink-0 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-[#172033] transition hover:bg-slate-50"
          >
            {autoRenew ? 'Tắt tự động gia hạn' : 'Bật tự động gia hạn'}
          </button>
        )}
      </div>
    </article>
  )
}

function AccountPlanPage() {
  const {
    activePlans,
    admissionSeason,
    hasEntitlement,
    setSubscriptionAutoRenew,
    subscriptions,
    user,
  } = useAuth()

  const fallbackPlans = []
  if (hasEntitlement(ENTITLEMENTS.ADMISSION_PASS)) fallbackPlans.push(PLAN_IDS.ADMISSION_PASS)
  else if (hasEntitlement(ENTITLEMENTS.PERSONAL_WORKSPACE)) fallbackPlans.push(PLAN_IDS.MONTHLY)

  const resolvedPlanIds = activePlans.length ? activePlans : fallbackPlans
  const plans = resolvedPlanIds.map(getPlan).filter(Boolean)

  return (
    <main className="min-h-[calc(100vh-20rem)] bg-[#f9f9ff] pb-20 pt-10 text-[#172033]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-5 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <span className="material-symbols-outlined text-base">verified_user</span>
              Tài khoản {user?.fullName ?? 'UniView'}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Gói của tôi</h1>
            <p className="mt-2 text-[#667085]">Theo dõi gói đang hoạt động, thời hạn và chính sách gia hạn tại một nơi.</p>
          </div>
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
            Xem cả 3 gói
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </header>

        {plans.length ? (
          <section className="space-y-5" aria-label="Các gói đang hoạt động">
            {plans.map((plan) => (
              <ActivePlanCard
                key={plan.id}
                plan={plan}
                admissionSeason={admissionSeason}
                subscription={subscriptions.find(({ planId }) => planId === plan.id)}
                onToggleRenewal={() => {
                  const subscription = subscriptions.find(({ planId }) => planId === plan.id)
                  setSubscriptionAutoRenew(plan.id, !subscription?.autoRenew)
                }}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
            <span className="material-symbols-outlined text-5xl text-[#1D4ED8]">visibility</span>
            <h2 className="mt-4 font-display text-2xl font-bold">Bạn đang ở trạng thái preview</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#667085]">Bạn vẫn xem được nội dung công khai và bản xem trước. Đây không phải một gói dịch vụ riêng.</p>
            <Link to="/pricing" className="mt-6 inline-flex rounded-full bg-[#1D4ED8] px-6 py-3 text-sm font-bold text-white">Chọn gói phù hợp</Link>
          </section>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['Dữ liệu được bảo toàn', 'Hết hạn chỉ dừng tạo hành động mới; hồ sơ và lịch sử cũ vẫn xem được.'],
            ['Gói Năm đã gồm Pass', 'Không thu thêm Admission Pass khi Gói Năm vẫn còn hiệu lực. Gói Tháng có thể mua Pass riêng.'],
            ['Phụ huynh dùng tài khoản riêng', 'Học sinh kiểm soát dữ liệu nào được chia sẻ trong workspace.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl bg-[#f1f3ff] p-5">
              <span className="material-symbols-outlined text-[#1D4ED8]">check_circle</span>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#667085]">{description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default AccountPlanPage
