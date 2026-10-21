const questionSeeds = {
  R: [
    'Lắp ráp hoặc sửa một vật dụng bằng tay.',
    'Sử dụng dụng cụ để tạo ra một sản phẩm cụ thể.',
    'Làm việc với mô hình, linh kiện hoặc vật liệu thực tế.',
    'Thực hiện hoạt động ngoài trời cần thao tác trực tiếp.',
    'Tự tay dựng và thử nghiệm một mô hình hoạt động được.',
  ],
  I: [
    'Tìm nguyên nhân của một vấn đề bằng cách phân tích thông tin.',
    'Giải câu hỏi logic cần suy luận nhiều bước.',
    'Thực hiện thí nghiệm nhỏ để kiểm tra một giả thuyết.',
    'Tìm hiểu sâu một chủ đề khoa học hoặc công nghệ.',
    'Tìm quy luật hoặc điểm bất thường trong một tập dữ liệu.',
  ],
  A: [
    'Thiết kế poster, hình ảnh hoặc sản phẩm sáng tạo.',
    'Viết nội dung hoặc kịch bản theo phong cách riêng.',
    'Tạo video, âm thanh hoặc một sản phẩm truyền thông mới.',
    'Nghĩ ra nhiều cách khác nhau để thể hiện cùng một ý tưởng.',
    'Phối màu và bố cục để làm sản phẩm khác biệt hơn.',
  ],
  S: [
    'Hướng dẫn một người khác hiểu cách làm một việc.',
    'Lắng nghe và hỗ trợ người đang gặp khó khăn.',
    'Tổ chức hoạt động giúp một nhóm làm việc hiệu quả hơn.',
    'Giải thích kiến thức cho bạn bè khi họ chưa hiểu.',
    'Tham gia hoạt động tình nguyện hoặc hỗ trợ cộng đồng.',
  ],
  E: [
    'Thuyết phục người khác ủng hộ một ý tưởng.',
    'Trình bày ý tưởng trước nhóm và kêu gọi mọi người tham gia.',
    'Dẫn dắt khi một nhóm cần đưa ra quyết định.',
    'Thương lượng để các bên đi đến thỏa thuận.',
    'Giới thiệu dự án sao cho người nghe thấy thuyết phục.',
  ],
  C: [
    'Sắp xếp dữ liệu hoặc tài liệu theo một hệ thống rõ ràng.',
    'Lập checklist và theo dõi từng bước của công việc.',
    'Kiểm tra số liệu hoặc biểu mẫu để bảo đảm chính xác.',
    'Quản lý lịch, deadline hoặc hồ sơ đúng thời hạn.',
    'Phân loại và duy trì thông tin theo quy tắc nhất quán.',
  ],
}

export const riasecAssessment = {
  id: 'riasec-30-v1',
  title: 'RIASEC Interest Profile',
  type: 'RIASEC',
  responseScale: [
    { value: 1, label: 'Rất không thích' },
    { value: 2, label: 'Không thích' },
    { value: 3, label: 'Phân vân / Không rõ' },
    { value: 4, label: 'Thích' },
    { value: 5, label: 'Rất thích' },
  ],
  questions: Array.from({ length: 5 }, (_, index) => (
    Object.entries(questionSeeds).map(([domain, questions]) => ({
      id: `${domain}${String(index + 1).padStart(2, '0')}`,
      domain,
      text: questions[index],
    }))
  )).flat(),
}

export default { riasecAssessment }
