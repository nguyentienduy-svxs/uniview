export const PLAN_IDS = {
  MONTHLY: 'MONTHLY',
  ANNUAL: 'ANNUAL',
  ADMISSION_PASS: 'ADMISSION_PASS',
}

export const PLAN_CATALOG = {
  [PLAN_IDS.MONTHLY]: {
    id: PLAN_IDS.MONTHLY,
    name: 'Gói Tháng',
    price: 59000,
    priceSuffix: '/ 30 ngày',
    durationLabel: '30 ngày từ khi thanh toán thành công',
    billingLabel: 'Thuê bao theo tháng · Có thể tắt tự động gia hạn',
    audience: 'Muốn trải nghiệm ngắn, vào hệ thống muộn hoặc chưa muốn cam kết dài.',
    description: 'Trọn bộ hành trình khám phá và kiểm chứng ngành trong 30 ngày.',
    features: [
      'Personal Workspace và hồ sơ cá nhân',
      'Assessment RIASEC và câu hỏi bối cảnh',
      'Task trải nghiệm, evidence và reflection',
      'Roadmap thích ứng và theo dõi tiến độ',
      'So sánh ngành, trường ở mức cơ bản',
    ],
    checkoutPath: '/checkout/personal-direction?plan=monthly',
    accent: 'blue',
  },
  [PLAN_IDS.ANNUAL]: {
    id: PLAN_IDS.ANNUAL,
    name: 'Gói Năm',
    price: 590000,
    priceSuffix: '/ 12 tháng',
    durationLabel: '12 tháng từ khi thanh toán thành công',
    billingLabel: 'Thuê bao theo năm · Có thể tắt tự động gia hạn',
    audience: 'Muốn được đồng hành liên tục qua nhiều vòng trải nghiệm trong năm học.',
    description: 'Cùng bộ chức năng cốt lõi như Gói Tháng, với thời gian theo dõi dài hơn.',
    features: [
      'Toàn bộ quyền lợi của Gói Tháng',
      'Theo dõi nhiều vòng task và reflection',
      'Giữ mạch roadmap xuyên suốt năm học',
      'Quan sát sự thay đổi của giả thuyết ngành',
      'Tiết kiệm tương đương 2 tháng sử dụng',
    ],
    checkoutPath: '/checkout/personal-direction?plan=annual',
    accent: 'rose',
    featured: true,
  },
  [PLAN_IDS.ADMISSION_PASS]: {
    id: PLAN_IDS.ADMISSION_PASS,
    name: 'Admission Pass',
    price: 89000,
    priceSuffix: '/ mùa tuyển sinh',
    durationLabel: 'Theo một năm tuyển sinh cụ thể',
    billingLabel: 'Thanh toán một lần · Không tự động gia hạn',
    audience: 'Đang chuẩn bị hồ sơ, điểm, nguyện vọng và xác nhận nhập học.',
    description: 'Workspace cá nhân cùng bộ công cụ xử lý một mùa tuyển sinh cụ thể.',
    features: [
      'Dùng lại toàn bộ hồ sơ và bằng chứng đã có',
      'Shortlist ngành, trường và nguồn chính thức',
      'Bản đồ phương thức và điều kiện xét tuyển',
      'Kịch bản điểm, deadline và nguyện vọng',
      'Theo dõi kết quả và checklist nhập học',
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
  return `${new Intl.NumberFormat('vi-VN').format(price)}đ`
}

export function getPlan(planId) {
  return PLAN_CATALOG[planId] ?? null
}

