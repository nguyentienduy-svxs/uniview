export const PREMIUM_FEATURES = {
  'decision-board': {
    title: 'My University Decision Board',
    shortTitle: 'Decision Board',
    eyebrow: 'BẢNG QUYẾT ĐỊNH CÁ NHÂN',
    description:
      'Tập hợp các ngành và trường bạn đang cân nhắc, rồi sắp xếp chúng thành một kế hoạch rõ ràng theo hồ sơ của riêng bạn.',
    benefits: [
      'Phân nhóm lựa chọn an toàn, mục tiêu và thử thách',
      'Ghi chú và theo dõi những điều còn cần tìm hiểu',
      'So sánh các lựa chọn theo học phí, điểm và mức độ phù hợp',
    ],
    to: '/decision-board',
  },
  'admission-route-mapping': {
    title: 'Admission Route Mapping',
    shortTitle: 'Route Mapping',
    eyebrow: 'BẢN ĐỒ CON ĐƯỜNG TUYỂN SINH',
    description:
      'Đối chiếu hồ sơ học tập của bạn với từng phương thức tuyển sinh để biết con đường nào đang phù hợp và cần bổ sung gì.',
    benefits: [
      'Xem các phương thức tuyển sinh phù hợp với hồ sơ',
      'Nhận diện dữ liệu còn thiếu cho từng route',
      'Theo dõi lộ trình chuẩn bị theo mùa tuyển sinh',
    ],
    to: '/admission-route-mapping',
  },
  'scenario-comparison': {
    title: 'Scenario Comparison',
    shortTitle: 'Scenario Comparison',
    eyebrow: 'SO SÁNH KỊCH BẢN MỤC TIÊU',
    description:
      'Thử các kịch bản điểm số, ngân sách và điều kiện khác nhau để thấy lựa chọn đại học thay đổi như thế nào.',
    benefits: [
      'Mô phỏng nhiều kịch bản điểm và điều kiện',
      'Đặt các phương án cạnh nhau để nhìn rõ đánh đổi',
      'Chọn chiến lược phù hợp với mục tiêu thực tế',
    ],
    to: '/scenario-comparison',
  },
}

export const PREMIUM_FEATURE_PATHS = Object.values(
  PREMIUM_FEATURES,
).map((feature) => feature.to)
