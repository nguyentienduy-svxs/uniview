import { MajorProfile, RiasecCode, RiasecQuestion } from './assessment.types'

export { EXPERIENCE_DOMAINS } from './adaptive-domain-questions'

const riasecSeeds: Record<RiasecCode, Array<[string, string]>> = {
  R: [
    ['Lắp ráp hoặc sửa một vật dụng bằng tay.', 'Ví dụ: lắp kệ, sửa xe đạp hoặc thay linh kiện.'],
    ['Sử dụng dụng cụ để tạo ra sản phẩm cụ thể.', 'Ví dụ: làm mô hình hoặc mạch điện đơn giản.'],
    ['Làm việc với mô hình, linh kiện hoặc vật liệu.', 'Ví dụ: tháo lắp và chạy thử một thiết bị.'],
    ['Thực hiện hoạt động ngoài trời cần thao tác.', 'Ví dụ: khảo sát hiện trường hoặc chăm sóc cây.'],
    ['Dựng và thử nghiệm một mô hình hoạt động.', 'Ví dụ: điều chỉnh đến khi mô hình chạy ổn định.'],
  ],
  I: [
    ['Tìm nguyên nhân của vấn đề bằng phân tích.', 'Ví dụ: đối chiếu dữ liệu để tìm lỗi hệ thống.'],
    ['Giải câu hỏi logic cần nhiều bước.', 'Ví dụ: lập giả thuyết rồi loại trừ từng khả năng.'],
    ['Thiết kế thử nghiệm để kiểm tra giả thuyết.', 'Ví dụ: thay từng biến và ghi lại kết quả.'],
    ['Tìm hiểu sâu chủ đề khoa học hoặc công nghệ.', 'Ví dụ: đọc nhiều nguồn để hiểu một cơ chế.'],
    ['Tìm quy luật trong một tập dữ liệu.', 'Ví dụ: phát hiện xu hướng hoặc điểm bất thường.'],
  ],
  A: [
    ['Thiết kế một sản phẩm trực quan sáng tạo.', 'Ví dụ: poster, hình minh họa hoặc giao diện.'],
    ['Viết nội dung theo phong cách riêng.', 'Ví dụ: truyện ngắn, kịch bản hoặc lời giới thiệu.'],
    ['Tạo sản phẩm truyền thông mới.', 'Ví dụ: video, âm thanh hoặc bộ ảnh theo chủ đề.'],
    ['Thử nhiều cách thể hiện cùng ý tưởng.', 'Ví dụ: thay bố cục, giọng kể hoặc chất liệu.'],
    ['Đưa dấu ấn cá nhân vào sản phẩm.', 'Ví dụ: xây một phong cách hình ảnh nhất quán.'],
  ],
  S: [
    ['Hướng dẫn người khác học kỹ năng mới.', 'Ví dụ: kèm bạn học hoặc hướng dẫn em nhỏ.'],
    ['Lắng nghe và hỗ trợ khi người khác khó khăn.', 'Ví dụ: cùng xác định bước tiếp theo phù hợp.'],
    ['Tổ chức hoạt động giúp nhóm tiến bộ.', 'Ví dụ: điều phối một buổi học nhóm.'],
    ['Giải thích kiến thức cho người chưa hiểu.', 'Ví dụ: dùng ví dụ khác để làm rõ khái niệm.'],
    ['Tham gia hoạt động hỗ trợ cộng đồng.', 'Ví dụ: tình nguyện hoặc cố vấn học tập.'],
  ],
  E: [
    ['Thuyết phục người khác ủng hộ ý tưởng.', 'Ví dụ: trình bày đề xuất trước câu lạc bộ.'],
    ['Kêu gọi mọi người tham gia dự án.', 'Ví dụ: giới thiệu mục tiêu và phân công vai trò.'],
    ['Dẫn dắt nhóm đưa ra quyết định.', 'Ví dụ: tổng hợp ý kiến và chốt phương án.'],
    ['Thương lượng để đạt thỏa thuận.', 'Ví dụ: thống nhất nguồn lực và lịch thực hiện.'],
    ['Giới thiệu sản phẩm thật thuyết phục.', 'Ví dụ: điều chỉnh thông điệp theo người nghe.'],
  ],
  C: [
    ['Sắp xếp dữ liệu theo hệ thống rõ ràng.', 'Ví dụ: chuẩn hóa bảng tính và tên tệp.'],
    ['Lập checklist và theo dõi đầu việc.', 'Ví dụ: quản lý tiến độ cho một sự kiện.'],
    ['Kiểm tra độ chính xác của số liệu.', 'Ví dụ: đối chiếu dữ liệu trước khi báo cáo.'],
    ['Quản lý lịch và hồ sơ đúng hạn.', 'Ví dụ: theo dõi deadline và tài liệu cần nộp.'],
    ['Duy trì thông tin theo quy tắc.', 'Ví dụ: phân loại và cập nhật dữ liệu nhất quán.'],
  ],
}

export const RIASEC_QUESTIONS: RiasecQuestion[] = Array.from({ length: 5 }, (_, index) => (
  (Object.keys(riasecSeeds) as RiasecCode[]).map((domain) => ({
    id: `${domain}${String(index + 1).padStart(2, '0')}`,
    domain,
    text: riasecSeeds[domain][index][0],
    example: riasecSeeds[domain][index][1],
  }))
)).flat()

const profile = (
  id: string,
  name: string,
  riasec: MajorProfile['riasec'],
  academicSubjects: string[],
  evidenceDomains: string[],
  environments: string[],
  tuitionBands = ['25-45', '45-70', '70+'],
): MajorProfile => ({
  id, name, riasec, academicSubjects, evidenceDomains, environments, tuitionBands,
  tradeoffs: ['Cần kiểm chứng bằng trải nghiệm hoặc dự án nhỏ.', 'Tín hiệu định hướng không thay thế yêu cầu tuyển sinh chính thức.'],
  nextActions: [`Thử một task nhập môn của ${name}.`, 'Trao đổi với sinh viên hoặc người đang làm nghề.', 'Hoàn thành một dự án nhỏ và lưu evidence.'],
})

export const MAJOR_PROFILES: MajorProfile[] = [
  profile('software-engineering', 'Kỹ thuật Phần mềm', { I: 92, R: 72, C: 68 }, ['Toán', 'Tin học'], ['technology', 'engineering'], ['logic', 'autonomy']),
  profile('data-ai', 'Khoa học Dữ liệu & Trí tuệ Nhân tạo', { I: 96, C: 70, R: 60 }, ['Toán', 'Tin học'], ['research', 'technology'], ['research', 'logic']),
  profile('cyber-security', 'An toàn Thông tin', { I: 90, R: 78, C: 75 }, ['Toán', 'Tin học'], ['technology', 'research'], ['logic', 'stability']),
  profile('information-systems', 'Hệ thống Thông tin Quản lý', { I: 76, E: 70, C: 80 }, ['Toán', 'Tin học'], ['technology', 'business'], ['business', 'structure']),
  profile('ux-ui', 'Thiết kế Tương tác & UX/UI', { A: 94, I: 72, S: 66 }, ['Ngữ văn', 'Tin học'], ['design', 'technology'], ['creative', 'human-centered']),
  profile('digital-media', 'Truyền thông Đa phương tiện', { A: 92, E: 72, S: 62 }, ['Ngữ văn', 'Tiếng Anh'], ['design', 'music'], ['creative', 'dynamic']),
  profile('architecture', 'Kiến trúc', { A: 86, R: 78, I: 66 }, ['Toán', 'Mỹ thuật'], ['design', 'engineering'], ['creative', 'project']),
  profile('psychology', 'Tâm lý học', { S: 94, I: 76, A: 55 }, ['Ngữ văn', 'Sinh học'], ['support', 'research'], ['human-centered', 'research']),
  profile('education', 'Giáo dục học', { S: 96, E: 68, C: 58 }, ['Ngữ văn', 'Tiếng Anh'], ['support', 'leadership'], ['human-centered', 'structure']),
  profile('marketing', 'Marketing', { E: 90, A: 76, S: 62 }, ['Ngữ văn', 'Tiếng Anh'], ['business', 'design'], ['dynamic', 'creative']),
  profile('business', 'Quản trị Kinh doanh', { E: 92, C: 72, S: 58 }, ['Toán', 'Tiếng Anh'], ['business', 'leadership'], ['business', 'dynamic']),
  profile('mechanical-engineering', 'Kỹ thuật Cơ khí', { R: 96, I: 78, C: 66 }, ['Toán', 'Vật lý'], ['engineering', 'technology'], ['practical', 'structure']),
  profile('finance', 'Tài chính – Ngân hàng', { C: 90, E: 72, I: 68 }, ['Toán', 'Tiếng Anh'], ['business', 'research'], ['business', 'structure']),
]

export const UNIVERSITIES = [
  { id: 'uit', name: 'ĐH Công nghệ Thông tin – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'data-ai', 'cyber-security', 'information-systems'] },
  { id: 'hcmus', name: 'ĐH Khoa học Tự nhiên – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'data-ai'] },
  { id: 'hcmut', name: 'ĐH Bách khoa – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'mechanical-engineering'] },
  { id: 'ussh', name: 'ĐH KHXH&NV – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['psychology', 'digital-media'] },
]
