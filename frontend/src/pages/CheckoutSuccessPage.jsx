import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { formatPlanDate, formatPrice, hasConfiguredPrice, PLAN_CATALOG, PLAN_IDS } from '../data/plans'

function CheckoutSuccessPage() {
  const { admissionSeason, subscriptions, user } = useAuth()
  const plan = PLAN_CATALOG[PLAN_IDS.ADMISSION_PASS]
  const season = admissionSeason ?? user?.targetAdmissionYear ?? '2027'
  const subscription = subscriptions.find(({ planId }) => planId === PLAN_IDS.ADMISSION_PASS)
  const price = formatPrice(plan.price)
  return (
<main className="w-full min-h-screen bg-surface flex items-center justify-center p-gutter"><div className="flex flex-col w-full">
<div className="relative w-full max-w-[1240px] mx-auto py-space-xl px-gutter flex flex-col items-center">
<div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-1/3 left-1/4 w-[420px] h-[280px] bg-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="w-full max-w-[880px] bg-surface-container-lowest rounded-xl shadow-sm p-space-xl md:p-space-2xl flex flex-col items-center text-center relative overflow-hidden">
<div className="w-16 h-16 rounded-full bg-sage-subtle flex items-center justify-center mb-space-lg text-tertiary shadow-sm">
<span className="material-symbols-outlined text-[34px]" style={{ "fontVariationSettings": "'FILL' 1" }}>check_circle</span>
</div>
<div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm mb-space-sm uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
        Giao dịch hoàn tất thành công
      </div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm max-w-[620px]">
        Admission Pass {season} đã được mở khóa.
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-[540px] mb-space-xl">
        Bạn có thể sử dụng ngay các công cụ hỗ trợ tuyển sinh nâng cao trên nền tảng Uniview cho lộ trình đại học của mình.
      </p>
<div className="w-full bg-surface-container-low rounded-xl p-space-lg text-left mb-space-xl">
<div className="flex flex-wrap items-center justify-between gap-y-2 pb-space-md text-secondary text-label-md font-label-md">
<div className="flex items-center gap-1.5">
<span className="text-on-surface-variant font-label-lg text-label-lg">Mã giao dịch:</span>
<span className="text-primary font-medium">#UV-PAY-{season}-9481</span>
</div>
<div className="flex items-center gap-space-md">
<span>Thời gian: <strong className="text-on-surface font-medium">Vừa xong</strong></span>
<span>•</span>
<span>Tài khoản: <strong className="text-on-surface font-medium">{user?.fullName ?? 'Học sinh UniView'} (Khóa {season})</strong></span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-md">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">verified</span>
<span className="font-body-sm text-body-sm text-on-surface">{hasConfiguredPrice(plan) ? <>Thanh toán thành công: <strong className="text-primary">{price}</strong></> : <><strong className="text-primary">Giao dịch demo đã được xác nhận</strong></>} <span className="text-on-surface-variant">(Admission Pass {season})</span></span>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">bolt</span>
<span className="font-body-sm text-body-sm text-on-surface">Kích hoạt ngay lập tức vào hồ sơ cá nhân</span>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">event_available</span>
<span className="font-body-sm text-body-sm text-on-surface">Hiệu lực sử dụng: <strong className="text-on-surface">Hôm nay — {subscription?.endsAt ? formatPlanDate(subscription.endsAt) : `30/09/${season}`}</strong></span>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">lock_clock</span>
<span className="font-body-sm text-body-sm text-on-surface">Thanh toán một lần · <strong className="text-on-surface-variant">Không tự động gia hạn</strong></span>
</div>
</div>
</div>
<div className="w-full text-left mb-space-xl">
<div className="flex items-center justify-between mb-space-md">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Đặc quyền đã kích hoạt cho bạn</h2>
<span className="font-label-md text-label-md text-secondary">Admission Mode theo mùa</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="bg-lavender-subtle p-space-md rounded-xl flex items-start gap-space-md transition-all hover:bg-surface-container">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-primary">
<span className="material-symbols-outlined text-[24px]">alt_route</span>
</div>
<div>
<h3 className="font-label-lg text-label-lg text-on-surface mb-0.5">Admission Routes</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lập bản đồ phương thức, tổ hợp, điều kiện và hồ sơ cần nộp cho từng lựa chọn.</p>
</div>
</div>
<div className="bg-sky-subtle p-space-md rounded-xl flex items-start gap-space-md transition-all hover:bg-surface-container">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-primary">
<span className="material-symbols-outlined text-[24px]">query_stats</span>
</div>
<div>
<h3 className="font-label-lg text-label-lg text-on-surface mb-0.5">Scenario Comparison</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">So sánh kịch bản điểm và phương án dự phòng dựa trên dữ liệu hiện có, không cam kết trúng tuyển.</p>
</div>
</div>
<div className="bg-sage-subtle p-space-md rounded-xl flex items-start gap-space-md transition-all hover:bg-surface-container">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-tertiary">
<span className="material-symbols-outlined text-[24px]">compare_arrows</span>
</div>
<div>
<h3 className="font-label-lg text-label-lg text-on-surface mb-0.5">Personalized Compare</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đối chiếu ngành và trường theo học phí, địa điểm, điều kiện và các ưu tiên trong hồ sơ.</p>
</div>
</div>
<div className="bg-sand-subtle p-space-md rounded-xl flex items-start gap-space-md transition-all hover:bg-surface-container">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[24px]">view_kanban</span>
</div>
<div>
<h3 className="font-label-lg text-label-lg text-on-surface mb-0.5">Advanced Decision Board</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Theo dõi shortlist, deadline, hồ sơ, nguyện vọng, kết quả và checklist xác nhận nhập học.</p>
</div>
</div>
</div>
</div>
<div className="w-full bg-surface-container-low/70 rounded-xl p-space-md flex items-center gap-space-md text-left mb-space-xl">
<span className="material-symbols-outlined text-secondary text-[24px] shrink-0">mark_email_read</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Biên lai điện tử và thông tin xác nhận kích hoạt đã được gửi tới email <strong className="text-on-surface">{user?.email ?? 'email tài khoản'}</strong>. Hồ sơ và lịch sử cũ vẫn được bảo toàn sau khi gói hết hiệu lực.
        </p>
</div>
<div className="w-full flex flex-col sm:flex-row items-center justify-center gap-space-md">
<Link className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg inline-flex items-center justify-center gap-2 shadow-sm transition-all group" to="/admission-route-mapping">
<span>Xem Admission Routes ngay</span>
<span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
</Link>
<Link className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg inline-flex items-center justify-center transition-all" to="/decision-board">
          Quay lại Decision Board
        </Link>
</div>
<Link className="mt-space-lg text-primary hover:text-on-primary-fixed-variant font-label-lg text-label-lg inline-flex items-center gap-1 transition-colors" to="/account/plan">
<span>Xem chi tiết quyền lợi tại trang Gói của tôi</span>
<span className="material-symbols-outlined text-[16px]">east</span>
</Link>
</div>
<div className="mt-space-lg flex items-center gap-2 text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>Uniview Admissions System · Bảo mật giao dịch chuẩn PCI-DSS · Hỗ trợ 24/7</span>
</div>
</div>
</div></main>
  )
}

export default CheckoutSuccessPage
