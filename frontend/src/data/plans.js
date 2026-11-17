export const PLAN_IDS = {
  MONTHLY: 'MONTHLY',
  ANNUAL: 'ANNUAL',
  ADMISSION_PASS: 'ADMISSION_PASS',
}

function readConfiguredPrice(value) {
  const normalized = String(value ?? '').trim()
  if (!normalized) return null
  const price = Number(normalized)
  return Number.isFinite(price) && price > 0 ? price : null
}

const PLAN_ENV = import.meta.env ?? {}

const CONFIGURED_PRICES = {
  [PLAN_IDS.MONTHLY]: readConfiguredPrice(PLAN_ENV.VITE_MONTHLY_PLAN_PRICE),
  [PLAN_IDS.ANNUAL]: readConfiguredPrice(PLAN_ENV.VITE_ANNUAL_PLAN_PRICE),
  [PLAN_IDS.ADMISSION_PASS]: readConfiguredPrice(PLAN_ENV.VITE_ADMISSION_PASS_PRICE),
}

export const PLAN_CATALOG = {
  [PLAN_IDS.MONTHLY]: {
    id: PLAN_IDS.MONTHLY,
    name: 'Gói Tháng',
    price: CONFIGURED_PRICES[PLAN_IDS.MONTHLY],
    priceSuffix: '/ 30 ngày',
    durationLabel: '30 ngày từ khi thanh toán thành công',
    billingLabel: 'Thuê bao theo tháng · Có thể tắt tự động gia hạn',
    audience: 'Muốn thử UniView hoặc chỉ cần sử dụng trong thời gian ngắn.',
    description: 'Hành trình khám phá và kiểm chứng ngành trong 30 ngày.',
    features: [
      'Personal Workspace và hồ sơ cá nhân',
      'Assessment RIASEC và câu hỏi bối cảnh do UniView xây dựng',
      'Task trải nghiệm, evidence, rubric và reflection tách riêng',
      'Roadmap thích ứng gồm 1–3 việc ưu tiên',
      'Theo dõi tiến độ và so sánh ngành, trường ở mức cơ bản',
    ],
    checkoutPath: '/checkout/personal-direction?plan=monthly',
    accent: 'blue',
  },
  [PLAN_IDS.ANNUAL]: {
    id: PLAN_IDS.ANNUAL,
    name: 'Gói Năm',
    price: CONFIGURED_PRICES[PLAN_IDS.ANNUAL],
    priceSuffix: '/ 12 tháng',
    durationLabel: '12 tháng từ khi thanh toán thành công',
    billingLabel: 'Thuê bao theo năm · Có thể tắt tự động gia hạn',
    audience: 'Học sinh lớp 12 hoặc người muốn được đồng hành liên tục trong cả năm.',
    description: 'Hành trình khám phá và kiểm chứng ngành trong 12 tháng, kèm Admission Pass cho một mùa tuyển sinh.',
    features: [
      'Toàn bộ quyền lợi của Gói Tháng',
      'Theo dõi nhiều vòng task, evidence và reflection',
      'Giữ mạch roadmap xuyên suốt 12 tháng',
      'Theo dõi sự thay đổi của các giả thuyết ngành',
      'Tối đa 5 task đang mở cùng lúc; hoàn thành hoặc dừng task sẽ giải phóng slot',
      'Bao gồm Admission Pass cho một mùa tuyển sinh trong thời hạn Gói Năm',
    ],
    checkoutPath: '/checkout/personal-direction?plan=annual',
    accent: 'rose',
    featured: true,
  },
  [PLAN_IDS.ADMISSION_PASS]: {
    id: PLAN_IDS.ADMISSION_PASS,
    name: 'Admission Pass',
    price: CONFIGURED_PRICES[PLAN_IDS.ADMISSION_PASS],
    priceSuffix: '/ mùa tuyển sinh',
    durationLabel: 'Theo một năm tuyển sinh cụ thể',
    billingLabel: 'Thanh toán một lần · Không tự động gia hạn',
    audience: 'Biết UniView muộn hoặc chỉ cần hỗ trợ gần kỳ thi và xét tuyển.',
    description: 'Bộ công cụ xử lý một mùa tuyển sinh cụ thể, thanh toán một lần.',
    features: [
      'Personal Workspace và dùng lại toàn bộ hồ sơ, bằng chứng đã có',
      'Shortlist ngành, trường kèm nguồn chính thức và ngày cập nhật',
      'Bản đồ phương thức, tổ hợp, điều kiện và hồ sơ cần nộp',
      'Theo dõi deadline, người phụ trách và trạng thái hồ sơ',
      'Kịch bản điểm, nguyện vọng, kết quả và checklist nhập học',
    ],
    checkoutPath: '/admission-pass',
    accent: 'amber',
  },
}

export const SOLD_PLANS = [
  PLAN_CATALOG[PLAN_IDS.MONTHLY],
  PLAN_CATALOG[PLAN_IDS.ANNUAL],
  PLAN_CATALOG[PLAN_IDS.ADMISSION_PASS],
]

export function formatPrice(price) {
  if (!Number.isFinite(price) || price <= 0) return 'Giá theo bảng giá hiện hành'
  return `${new Intl.NumberFormat('vi-VN').format(price)}đ`
}

export function hasConfiguredPrice(planOrPrice) {
  const price = typeof planOrPrice === 'number' ? planOrPrice : planOrPrice?.price
  return Number.isFinite(price) && price > 0
}

export function getPlan(planId) {
  return PLAN_CATALOG[planId] ?? null
}

export function getPlanDisplayName(planId, admissionSeason, { compact = false } = {}) {
  const plan = getPlan(planId)
  if (!plan) return planId

  if (planId === PLAN_IDS.ADMISSION_PASS && admissionSeason) {
    return compact ? `Pass ${admissionSeason}` : `${plan.name} ${admissionSeason}`
  }

  return plan.name
}

export function getActivePlanSummary(activePlans = [], admissionSeason, options) {
  if (!activePlans.length) return 'Chưa kích hoạt gói'
  return activePlans
    .map((planId) => getPlanDisplayName(planId, admissionSeason, options))
    .join(' + ')
}

export function formatPlanDate(value) {
  if (!value) return 'Chưa xác định'
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export function isSubscriptionActive(subscription, today = new Date()) {
  if (!subscription || subscription.status !== 'ACTIVE') return false
  if (!subscription.endsAt) return true
  return subscription.endsAt >= today.toISOString().slice(0, 10)
}

export function getActivePlanIds(subscriptions = [], today) {
  return subscriptions
    .filter((subscription) => isSubscriptionActive(subscription, today))
    .map(({ planId }) => planId)
}

