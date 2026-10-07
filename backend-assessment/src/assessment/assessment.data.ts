import {
  MajorProfile,
  MbtiAxis,
  MbtiPole,
  MbtiQuestion,
  RiasecCode,
  RiasecQuestion,
} from './assessment.types'

export { EXPERIENCE_DOMAINS } from './adaptive-domain-questions'

type PairSeed = [prompt: string, left: string, right: string]

const riasecSeeds: Record<RiasecCode, Array<[string, string]>> = {
  R: [
    ['Lắp ráp hoặc sửa một vật dụng bằng tay.', 'Ví dụ: lắp kệ, sửa xe đạp hoặc thay linh kiện.'],
    ['Làm việc với máy móc, dụng cụ hoặc thiết bị.', 'Ví dụ: dùng bộ dụng cụ kỹ thuật trong phòng thực hành.'],
    ['Tạo ra một sản phẩm hữu hình từ vật liệu có sẵn.', 'Ví dụ: làm mô hình, mạch điện hoặc sản phẩm thủ công.'],
    ['Thực hiện công việc ngoài trời cần vận động.', 'Ví dụ: khảo sát hiện trường hoặc chăm sóc cây trồng.'],
    ['Thử nghiệm trực tiếp để biết một thiết bị hoạt động ra sao.', 'Ví dụ: tháo lắp và chạy thử một mô hình máy.'],
  ],
  I: [
    ['Tìm nguyên nhân của một vấn đề bằng cách phân tích thông tin.', 'Ví dụ: so sánh dữ liệu để tìm lỗi của một hệ thống.'],
    ['Giải một bài toán hoặc câu đố cần suy luận nhiều bước.', 'Ví dụ: lập giả thuyết rồi kiểm tra từng khả năng.'],
    ['Đọc sâu về một chủ đề khoa học hoặc công nghệ.', 'Ví dụ: tìm hiểu vì sao trí tuệ nhân tạo nhận diện hình ảnh.'],
    ['Thiết kế một thí nghiệm để kiểm tra giả thuyết.', 'Ví dụ: thay đổi từng biến và ghi lại kết quả.'],
    ['Làm việc với số liệu để phát hiện quy luật.', 'Ví dụ: phân tích bảng dữ liệu học tập.'],
  ],
  A: [
    ['Sáng tạo một hình ảnh, câu chuyện hoặc sản phẩm truyền thông.', 'Ví dụ: thiết kế poster hoặc viết kịch bản video.'],
    ['Thử nhiều cách thể hiện mới cho cùng một ý tưởng.', 'Ví dụ: phối màu và bố cục theo nhiều phong cách.'],
    ['Biểu diễn âm nhạc, sân khấu hoặc nội dung sáng tạo.', 'Ví dụ: tham gia ban nhạc hoặc dựng một tiết mục.'],
    ['Làm một dự án cho phép tự do tưởng tượng.', 'Ví dụ: xây dựng thế giới cho truyện hoặc trò chơi.'],
    ['Đưa cảm xúc và dấu ấn cá nhân vào sản phẩm.', 'Ví dụ: chụp một bộ ảnh theo chủ đề riêng.'],
  ],
  S: [
    ['Hướng dẫn một người hiểu bài hoặc làm được kỹ năng mới.', 'Ví dụ: kèm bạn học hoặc hướng dẫn em nhỏ.'],
    ['Lắng nghe và hỗ trợ khi người khác gặp khó khăn.', 'Ví dụ: giúp một người bình tĩnh và xác định bước tiếp theo.'],
    ['Tổ chức hoạt động giúp một nhóm cùng tiến bộ.', 'Ví dụ: điều phối buổi học nhóm.'],
    ['Tham gia hoạt động cộng đồng hoặc tình nguyện.', 'Ví dụ: hỗ trợ chương trình cho trẻ em.'],
    ['Làm công việc cần thấu hiểu nhu cầu con người.', 'Ví dụ: phỏng vấn người dùng trước khi thiết kế giải pháp.'],
  ],
  E: [
    ['Thuyết phục người khác ủng hộ một ý tưởng.', 'Ví dụ: trình bày đề xuất trước câu lạc bộ.'],
    ['Dẫn dắt nhóm để đạt một mục tiêu rõ ràng.', 'Ví dụ: phân công và theo dõi tiến độ dự án.'],
    ['Khởi xướng một hoạt động hoặc dự án mới.', 'Ví dụ: tổ chức sự kiện gây quỹ.'],
    ['Đàm phán để các bên đi đến quyết định.', 'Ví dụ: thống nhất nguồn lực và lịch thực hiện.'],
    ['Chịu trách nhiệm cho kết quả của một nhóm.', 'Ví dụ: làm trưởng nhóm cuộc thi.'],
  ],
  C: [
    ['Sắp xếp dữ liệu hoặc tài liệu theo hệ thống rõ ràng.', 'Ví dụ: chuẩn hóa bảng tính và quy tắc đặt tên tệp.'],
    ['Lập kế hoạch chi tiết và theo dõi từng đầu việc.', 'Ví dụ: quản lý checklist cho một sự kiện.'],
    ['Kiểm tra độ chính xác của số liệu hoặc hồ sơ.', 'Ví dụ: đối chiếu dữ liệu trước khi nộp báo cáo.'],
    ['Làm việc theo quy trình có tiêu chuẩn cụ thể.', 'Ví dụ: thực hiện từng bước trong quy trình kiểm thử.'],
    ['Quản lý lịch, ngân sách hoặc nguồn lực.', 'Ví dụ: theo dõi chi tiêu của một dự án.'],
  ],
}

// Interleave domains so the public questionnaire never reveals or groups its scoring key.
export const RIASEC_QUESTIONS: RiasecQuestion[] = Array.from({ length: 5 }, (_, index) =>
  (Object.keys(riasecSeeds) as RiasecCode[]).map((domain) => ({
    id: `${domain}${String(index + 1).padStart(2, '0')}`,
    domain,
    text: riasecSeeds[domain][index][0],
    example: riasecSeeds[domain][index][1],
  })),
).flat()

const mbtiSeeds: Record<MbtiAxis, PairSeed[]> = {
  EI: [
    ['Khi vào một nhóm mới, bạn thường…', 'Chủ động bắt chuyện với vài người trước', 'Quan sát một lúc rồi mới bắt đầu trò chuyện'],
    ['Sau một tuần khá căng thẳng, bạn muốn…', 'Gặp gỡ hoặc trò chuyện để lấy lại năng lượng', 'Có khoảng thời gian riêng yên tĩnh để hồi phục'],
    ['Khi đang hình thành một ý tưởng, bạn thường…', 'Nói ra để vừa trao đổi vừa làm rõ', 'Suy nghĩ tương đối rõ rồi mới chia sẻ'],
    ['Sau một sự kiện đông người kéo dài, bạn…', 'Vẫn khá hứng khởi vì có nhiều tương tác', 'Cần thời gian yên tĩnh để nạp lại năng lượng'],
    ['Trong một môi trường hoàn toàn mới, bạn…', 'Tìm người để hỏi và tương tác ngay', 'Quan sát cách mọi thứ vận hành trước'],
    ['Khi có ý tưởng chưa hoàn thiện, bạn…', 'Chia sẻ sớm để nhận phản hồi', 'Phát triển thêm rồi mới đưa ra'],
    ['Trong bài tập nhóm, bạn thích…', 'Trao đổi thường xuyên trong suốt quá trình', 'Tập trung phần riêng rồi mới ghép lại'],
    ['Trong giờ nghỉ, bạn thường muốn…', 'Trò chuyện với người xung quanh', 'Có một khoảng yên tĩnh cho riêng mình'],
    ['Ở một sự kiện kết nối, bạn thích…', 'Nói chuyện ngắn với nhiều người', 'Nói chuyện lâu với một vài người hợp'],
    ['Khi gặp vấn đề khó, cách tự nhiên hơn là…', 'Trao đổi để nghĩ thành lời', 'Tự suy nghĩ trước rồi mới trao đổi'],
    ['Một cuối tuần lý tưởng thường thiên về…', 'Hoạt động cùng bạn bè', 'Thời gian riêng hoặc rất ít người'],
    ['Trong lớp hoặc cuộc họp, bạn thường…', 'Dễ phát biểu ngay khi có ý nghĩ', 'Cân nhắc kỹ rồi mới phát biểu'],
    ['Khi cần trao đổi việc chưa rõ, bạn thích…', 'Gọi hoặc nói trực tiếp', 'Nhắn hoặc viết trước'],
    ['Khi đến nơi mới, bạn hiểu môi trường bằng cách…', 'Tương tác trực tiếp với nhiều người', 'Quan sát và tự tìm hiểu trước'],
    ['Khi cần lấy lại năng lượng, bạn tìm đến…', 'Hoạt động có người khác tham gia', 'Không gian riêng và ít kích thích'],
  ],
  SN: [
    ['Khi học kỹ năng mới, bạn bắt đầu từ…', 'Hướng dẫn cụ thể và ví dụ rõ ràng', 'Bức tranh tổng thể và nguyên lý'],
    ['Khi nghe chủ đề mới, bạn chú ý hơn đến…', 'Thông tin cụ thể có thể kiểm chứng', 'Ý nghĩa, mô hình và khả năng suy ra'],
    ['Bạn thường nhớ tốt hơn…', 'Chi tiết của điều đã xảy ra', 'Ấn tượng chung và ý nghĩa'],
    ['Khi làm dự án, bạn tin tưởng hơn vào…', 'Cách làm đã được kiểm chứng', 'Cách làm mới có tiềm năng'],
    ['Khi xem dữ liệu, bạn chú ý trước đến…', 'Những con số đang hiện hữu', 'Mối liên hệ hoặc xu hướng ẩn'],
    ['Khi giải thích ý tưởng, bạn dùng…', 'Ví dụ thực tế và mô tả cụ thể', 'Ẩn dụ, liên tưởng hoặc khái niệm rộng'],
    ['Khi nghĩ về tương lai, bạn tập trung vào…', 'Các bước thực tế có thể làm', 'Nhiều khả năng và hướng đi'],
    ['Khi đọc tài liệu, bạn quan tâm hơn đến…', 'Dữ kiện và chi tiết quan trọng', 'Thông điệp và ý tưởng lớn'],
    ['Khi xử lý vấn đề quen thuộc, bạn…', 'Áp dụng phương pháp từng hiệu quả', 'Thử cách tiếp cận mới'],
    ['Khi lập kế hoạch, bạn thích…', 'Mốc thời gian và đầu việc cụ thể', 'Định hướng chung để linh hoạt'],
    ['Bạn học nhanh hơn khi…', 'Xem ví dụ hoặc thực hành', 'Hiểu lý thuyết và mối liên hệ'],
    ['Bạn thường dễ nhận ra…', 'Điều đang xảy ra ở hiện tại', 'Điều có thể xảy ra tiếp theo'],
    ['Khi viết báo cáo, bạn ưu tiên…', 'Rõ ràng, chính xác, đủ chi tiết', 'Góc nhìn mới và tính khái quát'],
    ['Khi chọn giải pháp, bạn nghiêng về…', 'Thực tế và dễ triển khai', 'Mới lạ và mở ra khả năng khác'],
    ['Trong trò chuyện, bạn hứng thú hơn với…', 'Chuyện và trải nghiệm thực tế', 'Ý tưởng, giả thuyết và khả năng'],
  ],
  TF: [
    ['Khi đưa ra quyết định khó, bạn ưu tiên…', 'Tiêu chí logic và tính nhất quán', 'Ảnh hưởng tới những người liên quan'],
    ['Khi hai người tranh luận, bạn chú ý trước đến…', 'Lập luận hợp lý và có bằng chứng', 'Cách để hai bên được lắng nghe'],
    ['Khi góp ý, bạn thường…', 'Nói thẳng điểm cần cải thiện', 'Chọn cách diễn đạt dễ tiếp nhận'],
    ['Một quyết định công bằng với bạn là…', 'Dùng cùng tiêu chí cho trường hợp tương tự', 'Cân nhắc hoàn cảnh riêng'],
    ['Khi thuyết phục, bạn dựa nhiều hơn vào…', 'Dữ liệu, nguyên nhân và hệ quả', 'Giá trị, nhu cầu của người nghe'],
    ['Khi chọn người cho nhiệm vụ, bạn ưu tiên…', 'Năng lực phù hợp yêu cầu', 'Sự hòa hợp và động lực nhóm'],
    ['Khi có một đánh đổi khó, bạn muốn…', 'So sánh bằng tiêu chí khách quan', 'Xem ai bị ảnh hưởng và ra sao'],
    ['Khi ai đó kể vấn đề cá nhân, bạn…', 'Phân tích và đề xuất giải pháp', 'Thấu hiểu trước khi bàn giải pháp'],
    ['Trong tranh luận, bạn coi trọng hơn…', 'Tính chính xác của lập luận', 'Trao đổi tôn trọng và xây dựng'],
    ['Khi quy tắc gây bất tiện, bạn…', 'Giữ nếu hợp lý và nhất quán', 'Điều chỉnh theo hoàn cảnh'],
    ['Khi đánh giá ý tưởng, bạn hỏi trước…', 'Nó có hợp lý và hoạt động không?', 'Nó có phù hợp với con người không?'],
    ['Khi nhóm có xung đột, bạn…', 'Tập trung vào vấn đề và tiêu chí', 'Tập trung vào nhu cầu từng người'],
    ['Một lời góp ý hữu ích khi nó…', 'Cụ thể và đi thẳng vấn đề', 'Rõ ràng và quan tâm cảm xúc'],
    ['Khi hai phương án tương đương, bạn xét thêm…', 'Hiệu quả và tính hợp lý dài hạn', 'Con người và giá trị cá nhân'],
    ['Khi bạn bè nhờ lời khuyên, bạn bắt đầu bằng…', 'Phân tích nguyên nhân và lựa chọn', 'Hiểu cảm xúc và mong muốn'],
  ],
  JP: [
    ['Khi có deadline quan trọng, bạn thích…', 'Lập kế hoạch sớm theo từng mốc', 'Giữ lịch linh hoạt rồi tăng tốc'],
    ['Khi đi du lịch, bạn thích…', 'Chuẩn bị trước lịch trình chính', 'Có khung cơ bản rồi tùy tình hình'],
    ['Khi có nhiều việc, bạn dễ chịu hơn khi…', 'Chốt ưu tiên và xử lý lần lượt', 'Giữ nhiều lựa chọn mở'],
    ['Với quyết định nhỏ, bạn thường…', 'Chốt sớm để chuyển việc khác', 'Để mở phòng khi có lựa chọn mới'],
    ['Bạn quản lý công việc bằng…', 'Lịch, checklist hoặc kế hoạch', 'Ghi nhớ và điều chỉnh linh hoạt'],
    ['Khi kế hoạch đổi đột ngột, bạn…', 'Khó chịu vì nhịp bị phá vỡ', 'Dễ thích nghi với lựa chọn mới'],
    ['Bạn thích bắt đầu dự án khi…', 'Mục tiêu và phạm vi đã rõ', 'Có thể điều chỉnh dần khi làm'],
    ['Khi làm bài dài ngày, bạn…', 'Chia đều việc qua nhiều ngày', 'Làm theo cảm hứng hoặc độ gấp'],
    ['Không gian làm việc dễ tập trung khi…', 'Mọi thứ có vị trí và trật tự', 'Đồ được để theo tiện ích hiện tại'],
    ['Khi có nhiều phương án tốt, bạn…', 'Chọn một phương án để tiến hành', 'Giữ phương án mở lâu hơn'],
    ['Với lịch học cá nhân, bạn thích…', 'Giờ học khá ổn định', 'Chọn theo năng lượng hôm đó'],
    ['Khi nhóm làm dự án, bạn muốn…', 'Phân vai và deadline rõ từ đầu', 'Điều chỉnh vai trò theo quá trình'],
    ['Nếu có một ngày rảnh, bạn thích…', 'Biết trước các việc chính', 'Để ngày đó mở rồi quyết định'],
    ['Khi xử lý việc vặt, bạn…', 'Hoàn thành trước khi nghỉ', 'Để lại và quay lại khi thuận tiện'],
    ['Khi gần hoàn thành một việc, bạn…', 'Đóng lại rõ rồi mới chuyển việc', 'Chuyển việc dù vài chi tiết còn mở'],
  ],
}

const poles: Record<MbtiAxis, [MbtiPole, MbtiPole]> = {
  EI: ['E', 'I'], SN: ['S', 'N'], TF: ['T', 'F'], JP: ['J', 'P'],
}

export const MBTI_QUESTIONS: MbtiQuestion[] = Array.from({ length: 15 }, (_, index) =>
  (Object.keys(mbtiSeeds) as MbtiAxis[]).map((axis) => {
    const [prompt, left, right] = mbtiSeeds[axis][index]
    return {
      id: `${axis}${String(index + 1).padStart(2, '0')}`,
      dimension: axis,
      prompt,
      options: [
        { label: left, value: poles[axis][0] },
        { label: right, value: poles[axis][1] },
      ],
    }
  }),
).flat()

const profile = (
  id: string,
  name: string,
  riasec: MajorProfile['riasec'],
  subjects: string[],
  evidence: string[],
  letters: MbtiPole[],
  environments: string[],
  tuitionBands = ['25-45', '45-70', '70+'],
): MajorProfile => ({
  id, name, riasec, academicSubjects: subjects, evidenceDomains: evidence,
  mbtiLetters: letters, environments, tuitionBands,
  tradeoffs: ['Cần kiểm chứng bằng trải nghiệm học thử hoặc dự án nhỏ.', 'Mức phù hợp không thay thế yêu cầu tuyển sinh chính thức.'],
  nextActions: [`Học thử một nội dung nhập môn của ${name}.`, 'Trao đổi với sinh viên hoặc người đang làm nghề.', 'Hoàn thành một dự án nhỏ trong 2–4 tuần.'],
})

export const MAJOR_PROFILES: MajorProfile[] = [
  profile('software-engineering', 'Kỹ thuật Phần mềm', { I: 92, R: 72, C: 68 }, ['Toán', 'Tin học'], ['technology', 'engineering'], ['I', 'N', 'T', 'J'], ['logic', 'autonomy']),
  profile('data-ai', 'Khoa học Dữ liệu & Trí tuệ Nhân tạo', { I: 96, C: 70, R: 60 }, ['Toán', 'Tin học'], ['research', 'technology'], ['I', 'N', 'T', 'J'], ['research', 'logic']),
  profile('cyber-security', 'An toàn Thông tin', { I: 90, R: 78, C: 75 }, ['Toán', 'Tin học'], ['technology', 'research'], ['I', 'S', 'T', 'J'], ['logic', 'stability']),
  profile('information-systems', 'Hệ thống Thông tin Quản lý', { I: 76, E: 70, C: 80 }, ['Toán', 'Tin học'], ['technology', 'business'], ['E', 'S', 'T', 'J'], ['business', 'structure']),
  profile('ux-ui', 'Thiết kế Tương tác & UX/UI', { A: 94, I: 72, S: 66 }, ['Ngữ văn', 'Tin học'], ['design', 'technology'], ['I', 'N', 'F', 'P'], ['creative', 'human-centered']),
  profile('digital-media', 'Truyền thông Đa phương tiện', { A: 92, E: 72, S: 62 }, ['Ngữ văn', 'Tiếng Anh'], ['design', 'music'], ['E', 'N', 'F', 'P'], ['creative', 'dynamic']),
  profile('architecture', 'Kiến trúc', { A: 86, R: 78, I: 66 }, ['Toán', 'Mỹ thuật'], ['design', 'engineering'], ['I', 'N', 'T', 'P'], ['creative', 'project']),
  profile('psychology', 'Tâm lý học', { S: 94, I: 76, A: 55 }, ['Ngữ văn', 'Sinh học'], ['support', 'research'], ['I', 'N', 'F', 'P'], ['human-centered', 'research']),
  profile('education', 'Giáo dục học', { S: 96, E: 68, C: 58 }, ['Ngữ văn', 'Tiếng Anh'], ['support', 'leadership'], ['E', 'S', 'F', 'J'], ['human-centered', 'structure']),
  profile('marketing', 'Marketing', { E: 90, A: 76, S: 62 }, ['Ngữ văn', 'Tiếng Anh'], ['business', 'design'], ['E', 'N', 'F', 'P'], ['dynamic', 'creative']),
  profile('business', 'Quản trị Kinh doanh', { E: 92, C: 72, S: 58 }, ['Toán', 'Tiếng Anh'], ['business', 'leadership'], ['E', 'S', 'T', 'J'], ['business', 'dynamic']),
  profile('mechanical-engineering', 'Kỹ thuật Cơ khí', { R: 96, I: 78, C: 66 }, ['Toán', 'Vật lý'], ['engineering', 'technology'], ['I', 'S', 'T', 'J'], ['practical', 'structure']),
  profile('finance', 'Tài chính – Ngân hàng', { C: 90, E: 72, I: 68 }, ['Toán', 'Tiếng Anh'], ['business', 'research'], ['E', 'S', 'T', 'J'], ['business', 'structure']),
]

export const UNIVERSITIES = [
  { id: 'uit', name: 'ĐH Công nghệ Thông tin – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'data-ai', 'cyber-security', 'information-systems'] },
  { id: 'hcmus', name: 'ĐH Khoa học Tự nhiên – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'data-ai'] },
  { id: 'hcmut', name: 'ĐH Bách khoa – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['software-engineering', 'mechanical-engineering'] },
  { id: 'ussh', name: 'ĐH KHXH&NV – ĐHQG-HCM', region: 'TP.HCM & lân cận', tuitionBand: '25-45', majorIds: ['psychology', 'digital-media'] },
]
