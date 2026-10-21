import { CAREER_REPORT_GROUPS, getAllDemoUniversities } from './careerReport.js'
import { DEADLINE_APP_WORKSPACE_KEY, SCORE_DEBUG_WORKSPACE_KEY, SIGNUP_TEST_WORKSPACE_KEY } from './taskWorkspaces.js'

const DEFAULT_TASKS = {
  'data-science': ['Làm sạch dữ liệu khảo sát học sinh', 'Tìm insight từ dữ liệu tuyển sinh mẫu', 'Kể một câu chuyện bằng dữ liệu'],
  'information-security': ['Phân tích dấu hiệu của một email lừa đảo', 'Đọc log và tìm hành vi đăng nhập bất thường', 'Lập checklist bảo mật cho tài khoản học tập'],
  marketing: ['Viết creative brief cho chiến dịch sinh viên', 'Đọc chỉ số và chẩn đoán một chiến dịch', 'Lập kế hoạch ra mắt sản phẩm học tập'],
  'international-business': ['So sánh hai thị trường cho một sản phẩm Việt', 'Chuẩn bị phương án đàm phán với đối tác', 'Phân tích rủi ro một giao dịch quốc tế'],
  'e-commerce': ['Phân tích phễu mua hàng của một gian hàng', 'Thiết kế chương trình khuyến mãi có điều kiện', 'Xử lý tình huống đơn hàng tăng đột biến'],
  finance: ['So sánh hai phương án sử dụng ngân sách', 'Xác định rủi ro của một quyết định tài chính', 'Lập mô hình dòng tiền cho một dự án nhỏ'],
  banking: ['Đánh giá hồ sơ vay giả lập', 'So sánh ba sản phẩm tiết kiệm', 'Nhận diện giao dịch có dấu hiệu bất thường'],
  accounting: ['Phân loại giao dịch của một cửa hàng nhỏ', 'Đối soát và tìm chênh lệch sổ sách', 'Đọc báo cáo tài chính cơ bản'],
  'ui-ux': ['Phỏng vấn người dùng ứng dụng học tập', 'Thiết kế wireframe luồng đặt lịch', 'Kiểm thử prototype với ba người dùng'],
  'communication-design': ['Thiết kế poster theo brief', 'Chỉnh sửa thiết kế theo ba phản hồi', 'Xây bộ nhận diện cho một câu lạc bộ'],
  'digital-media': ['Lên storyboard cho video giới thiệu trường', 'Dựng video dọc 30 giây', 'Biên tập câu chuyện đa nền tảng'],
  'business-analysis': ['Tìm nguyên nhân doanh số giảm từ dashboard', 'Viết yêu cầu cho tính năng đặt hàng', 'Trình bày khuyến nghị từ dữ liệu bán hàng'],
  'management-information-systems': ['Mô hình hóa quy trình mượn thiết bị', 'Đề xuất hệ thống quản lý câu lạc bộ', 'Lập kế hoạch triển khai hệ thống mẫu'],
  'operations-management': ['Tìm điểm nghẽn trong quy trình giao hàng', 'Xếp lịch nguồn lực cho tuần cao điểm', 'Thiết kế bảng theo dõi chất lượng'],
  communications: ['Biến một chủ đề khó thành bài giải thích ngắn', 'Lập kế hoạch nội dung đa kênh', 'Đánh giá phản hồi của công chúng'],
  'public-relations': ['Viết thông cáo cho sự kiện sinh viên', 'Lập phương án phản hồi khủng hoảng', 'Xây bản đồ bên liên quan cho một dự án'],
  'human-resources': ['Viết mô tả vai trò cho dự án học sinh', 'Thiết kế câu hỏi phỏng vấn tình huống', 'Xử lý xung đột trong nhóm giả lập'],
}

const SOFTWARE_TASKS = [
  {
    title: 'Tìm lỗi trong chương trình tính điểm', workType: 'debugging', workspaceKey: SCORE_DEBUG_WORKSPACE_KEY,
    duration: '35–45 phút', evidence: 'Code đã sửa, một test case, giải thích lỗi và cách xử lý khi thiếu điểm',
    context: 'Một chương trình Python đang tính sai điểm trung bình và có thể xếp loại học sinh không chính xác.',
    instructions: ['Đọc đoạn code và xác định lỗi trong biểu thức tính điểm trung bình.', 'Sửa biểu thức, giữ nguyên quy tắc xếp loại và chạy kiểm tra an toàn.', 'Giải thích nguyên nhân, thêm một test case và nêu cách xử lý khi thiếu điểm.'],
    rubric: ['Biểu thức tính trung bình đúng cho cả ba môn.', 'Giải thích được ảnh hưởng của thứ tự thực hiện phép toán.', 'Không tự quy điểm bị thiếu thành 0.'],
  },
  {
    title: 'Thiết kế ứng dụng quản lý deadline', workType: 'product-analysis', workspaceKey: DEADLINE_APP_WORKSPACE_KEY,
    duration: '45–60 phút', evidence: 'Câu trả lời có cấu trúc, ba tính năng ưu tiên, user flow và trade-off',
    context: 'Deadline bài tập nằm rải rác ở nhóm chat và nhiều nền tảng khiến học sinh dễ quên việc.',
    instructions: ['Mô tả vấn đề người dùng chính.', 'Chọn đúng ba tính năng ưu tiên và trình bày user flow.', 'Chọn tính năng làm trước, giải thích và nêu một điểm yếu.'],
    rubric: ['Hiểu đúng vấn đề và nhu cầu người dùng.', 'Ưu tiên tính năng có lý do, luồng sử dụng logic.', 'Nhận diện được trade-off hoặc giới hạn của giải pháp.'],
  },
  {
    title: 'Kiểm thử chức năng đăng ký tài khoản', workType: 'test-design', workspaceKey: SIGNUP_TEST_WORKSPACE_KEY,
    duration: '60–75 phút', evidence: 'Bảng tối thiểu sáu test case gồm tình huống, kết quả mong đợi, lý do và loại biên',
    context: 'Chức năng đăng ký sắp phát hành cần được kiểm tra theo đặc tả và các trường hợp biên.',
    instructions: ['Đọc năm yêu cầu của chức năng đăng ký.', 'Tạo ít nhất sáu test case và có thể thêm dòng.', 'Bao phủ yêu cầu chính, ngoại lệ và giá trị biên.'],
    rubric: ['Có ít nhất sáu test case đầy đủ.', 'Bao phủ email, mật khẩu, tuổi và email trùng.', 'Có trường hợp biên cùng giải thích hợp lý.'],
  },
]

function createDemoAnswer(majorId, title, index, evidence) {
  const financeAnswers = [
    `BÀI MẪU · SO SÁNH PHƯƠNG ÁN NGÂN SÁCH\n\nBối cảnh: Câu lạc bộ có 12 triệu đồng để tổ chức ngày hội hướng nghiệp, dự kiến 150 học sinh tham dự.\n\nPhương án A — thuê địa điểm và thiết bị bên ngoài: 10,8 triệu; sức chứa tốt, ít việc chuẩn bị nhưng gần như không còn khoản dự phòng.\nPhương án B — dùng hội trường trường, thuê thêm âm thanh và in ấn: 7,6 triệu; cần nhóm tự phụ trách hậu cần nhưng còn 4,4 triệu dự phòng.\n\nQuyết định: chọn B. Ưu tiên giữ quỹ dự phòng cho chi phí phát sinh và không phải đánh đổi sức chứa vì hội trường đáp ứng 150 người. Phân bổ 7,6 triệu gồm âm thanh 3,0; in ấn 1,2; nước uống 1,5; trang trí 0,9; vận chuyển 1,0 (triệu đồng).\n\nRủi ro và điều kiện: nếu báo giá âm thanh tăng trên 20% thì bỏ hạng mục trang trí trước; xác nhận số người tham dự trước khi đặt in. Chưa có báo giá cuối cùng nên đây là ước tính, không phải cam kết chi tiêu.`,
    `BÀI MẪU · NHẬN DIỆN RỦI RO TÀI CHÍNH\n\nTình huống: nhóm định chi 8 triệu để nhập vật phẩm cho hội chợ trường và kỳ vọng bán được 120 sản phẩm với giá 100.000 đồng/sản phẩm.\n\nCác rủi ro chính:\n1. Nhu cầu thấp: bán 70 sản phẩm thì doanh thu chỉ 7 triệu, chưa đủ bù vốn.\n2. Chi phí phát sinh: vận chuyển và bao bì có thể làm tổng chi vượt 8 triệu.\n3. Tồn kho: sản phẩm theo chủ đề sự kiện khó bán sau ngày hội.\n4. Dòng tiền: phải trả nhà cung cấp trước khi thu tiền bán hàng.\n\nCách kiểm soát: khảo sát và nhận đặt trước ít nhất 80 sản phẩm; chỉ nhập 90 sản phẩm ở đợt đầu; xin báo giá trọn gói và điều khoản đổi hàng; giữ lại 1 triệu dự phòng. Nếu lượng đặt trước dưới 60, giảm quy mô hoặc không nhập.\n\nGiả định còn thiếu: chưa tính công sức thành viên và phí gian hàng. Vì vậy chưa thể gọi 120 sản phẩm là điểm hòa vốn chính xác.`,
    `BÀI MẪU · MÔ HÌNH DÒNG TIỀN DỰ ÁN NHỎ\n\nDự án: tổ chức workshop kỹ năng học tập cho 40 người, vé 150.000 đồng.\n\nDòng tiền dự kiến (triệu đồng):\n- Trước sự kiện: đặt cọc địa điểm -1,5; truyền thông và vật tư -1,0.\n- Tuần tổ chức: thu vé +6,0; thanh toán phần còn lại địa điểm -1,5; diễn giả -1,2; nước uống -0,6; dự phòng -0,4.\n- Kết quả dự kiến: thu 6,0; chi 6,2; thiếu 0,2 triệu.\n\nNhận định: phương án hiện tại chưa khả thi về tiền mặt dù có 40 vé. Điểm hòa vốn theo chi phí 6,2 triệu là khoảng 42 vé (6,2 triệu / 150.000 đồng, làm tròn lên). Có thể tăng vé lên 170.000 đồng hoặc giảm chi phí địa điểm, nhưng cần kiểm tra mức giá người tham dự chấp nhận.\n\nQuyết định: chưa xác nhận tổ chức; chỉ chốt khi đạt ít nhất 35 vé đặt trước và có phương án bù phần còn thiếu. Đây là mô hình đơn giản, chưa tính thuế hay chi phí phát sinh ngoài dự phòng.`,
  ]
  const marketingAnswers = [
    `BÀI MẪU · CREATIVE BRIEF CHIẾN DỊCH SINH VIÊN\n\nMục tiêu: tăng lượt đăng ký tham dự buổi trải nghiệm ngành cho học sinh lớp 11–12 tại TP.HCM, mục tiêu 120 đăng ký trong 3 tuần.\nĐối tượng: học sinh đang phân vân chọn ngành; người ảnh hưởng là phụ huynh và anh chị khóa trên.\nInsight giả định: “Em muốn biết học ngành này thực sự làm gì, nhưng các bài giới thiệu thường chỉ nói toàn điều hấp dẫn.” Cần phỏng vấn nhanh 5 học sinh để kiểm tra giả định này.\nThông điệp: “Thử một nhiệm vụ thật, rồi tự quyết định ngành có hợp với bạn không.”\nÝ tưởng: chuỗi video ngắn “Một ngày – một việc thật”, dẫn tới trang đăng ký workshop. Kênh chính: TikTok/Instagram; kênh hỗ trợ: nhóm trường và email giáo viên. CTA: đăng ký một trong hai ca trải nghiệm.\nĐo lường: lượt xem đủ 3 giây, tỷ lệ vào trang, đăng ký hoàn tất và tỷ lệ đến tham dự. Không dùng lượt thích làm chỉ số thành công chính.\nTrade-off: video chân thực cần xin phép người tham gia và thời gian sản xuất; nếu thiếu nguồn lực, quay một nhiệm vụ mẫu thay vì dựng nhiều bối cảnh.`,
    `BÀI MẪU · ĐỌC CHỈ SỐ VÀ CHẨN ĐOÁN CHIẾN DỊCH\n\nDữ liệu giả lập trong 7 ngày: quảng cáo A có 20.000 lượt hiển thị, CTR 1,8%, 360 lượt vào trang và 54 đăng ký; quảng cáo B có 12.000 lượt hiển thị, CTR 2,5%, 300 lượt vào trang và 24 đăng ký.\n\nNhận xét: B thu hút nhấp tốt hơn nhưng tỷ lệ chuyển đổi trang thành đăng ký là 8% (24/300), thấp hơn A là 15% (54/360). Không nên kết luận B tốt hơn chỉ từ CTR. Khác biệt có thể đến từ thông điệp, đối tượng hoặc trải nghiệm trang; dữ liệu hiện tại chưa chứng minh nguyên nhân.\n\nĐề xuất: giữ A làm mốc; thử nghiệm B với cùng nhóm đối tượng và trang đích, chỉ đổi một yếu tố là thông điệp. Kiểm tra biểu mẫu trên điện thoại và hỏi người bỏ dở về điểm gây khó. Theo dõi chi phí/đăng ký và tỷ lệ đến sự kiện, không chỉ số đăng ký.\n\nGiới hạn: mẫu nhỏ, chưa có chi phí quảng cáo và chưa biết đăng ký trùng lặp; cần thêm dữ liệu trước khi tăng ngân sách.`,
    `BÀI MẪU · KẾ HOẠCH RA MẮT SẢN PHẨM HỌC TẬP\n\nSản phẩm: bộ thẻ ôn tập do học sinh làm thử cho môn tiếng Anh. Đối tượng thử nghiệm: học sinh lớp 10–11 đang chuẩn bị kiểm tra.\n\nGiai đoạn 1 – kiểm chứng (tuần 1): phỏng vấn 8 học sinh, cho 5 bạn dùng thử 20 thẻ; ghi nhận lỗi nội dung, mức dễ hiểu và cách các bạn đang ôn bài. Chỉ tiếp tục nếu đa số hiểu hướng dẫn mà không cần giải thích trực tiếp.\nGiai đoạn 2 – thử bán (tuần 2): làm 30 bộ, giới thiệu tại câu lạc bộ và một trang đăng ký; giá thử 49.000 đồng, không sản xuất thêm trước khi có đơn.\nGiai đoạn 3 – đánh giá (tuần 3): đo số người xem, đơn đặt, tỷ lệ hoàn tất thanh toán, phản hồi sau 7 ngày và tỷ lệ giới thiệu cho bạn.\n\nRủi ro: nội dung sai kiến thức, chi phí in cao, nhu cầu chỉ mang tính thời điểm. Giảm rủi ro bằng giáo viên rà soát nội dung, nhận đặt trước và chuẩn bị bản PDF thay thế.\nQuyết định: chỉ mở rộng nếu có ít nhất 20 đơn và phản hồi sử dụng tốt; nếu không, sửa bộ thẻ hoặc dừng, không xem lượt thích là bằng chứng đủ.`,
  ]

  const isFinance = majorId === 'finance'
  const answerByIndex = isFinance ? financeAnswers[index] : majorId === 'marketing' ? marketingAnswers[index] : null
  const draft = answerByIndex ?? `BÀI MẪU THAM KHẢO · ${title}\n\nMục tiêu: hoàn thành đầu ra “${evidence}”. Đây là tình huống giả lập để thực hành, không phải dữ liệu hay tư vấn chuyên môn.\n\nCách làm:\n1. Xác định người dùng/bối cảnh và thông tin đã biết; ghi rõ các giả định cần kiểm tra.\n2. Đề xuất phương án chính, nêu ít nhất hai lý do lựa chọn và một phương án thay thế.\n3. Kiểm tra rủi ro, giới hạn nguồn lực và tiêu chí để biết phương án có hiệu quả hay không.\n\nKết luận tạm thời: chọn phương án nhỏ có thể thử trước, thu phản hồi rồi mới mở rộng. Cần kiểm tra lại giả định bằng dữ liệu thực tế trước khi kết luận.\n\nĐiều còn chưa chắc chắn: ${title} cần thêm thông tin từ người liên quan và kết quả thử nghiệm. Nếu có thêm thời gian, tôi sẽ hỏi người dùng, ghi lại phản hồi và cập nhật đề xuất.`
  const lowInterest = isFinance

  return {
    draft,
    evidenceText: draft,
    evidenceExplanation: isFinance
      ? 'Bài mẫu dùng số liệu giả định để trình bày cách so sánh, nhận diện rủi ro và kiểm tra dòng tiền. Các con số chỉ phục vụ demo; kết luận thận trọng vì còn thiếu báo giá, chi phí và dữ liệu thực tế.'
      : 'Bài mẫu minh họa đầu ra, các quyết định và giới hạn của phương án. Đây là dữ liệu giả lập để demo quy trình, không phải kết luận đánh giá năng lực.' ,
    reflection: {
      interest: lowInterest ? 2 : majorId === 'marketing' ? 4 : 4,
      focus: lowInterest ? 4 : 4,
      likedMost: lowInterest ? 'Mình làm được phần tính toán và so sánh, nhưng không thấy hứng thú với việc theo dõi chi tiết dòng tiền và các giả định tài chính.' : 'Mình thích lúc biến thông tin ban đầu thành một phương án cụ thể và có tiêu chí kiểm tra.',
      drainedBy: lowInterest ? 'Việc phải kiểm tra nhiều con số, giả định và rủi ro chi phí khiến mình nhanh mất năng lượng.' : 'Mình mất thời gian khi dữ liệu đầu vào chưa rõ; muốn hỏi thêm người dùng để kiểm tra giả định.',
      wantsRetry: !lowInterest,
      shareWithParent: false,
    },
  }
}

function makeGenericTask(majorId, title, index) {
  const evidence = index === 0 ? 'Bản phân tích một trang có dẫn chứng' : index === 1 ? 'Bản nháp sản phẩm và ghi chú quyết định' : 'Bản đề xuất, trade-off và phần tự phản tư'
  return {
    id: `${majorId}-task-${index + 1}`,
    majorId,
    title,
    workType: ['analysis', 'creation', 'decision'][index],
    workspaceKey: null,
    duration: ['45–60 phút', '60–90 phút', '90–120 phút'][index],
    evidence,
    verifies: ['Mức hứng thú khi phân tích một tình huống điển hình.', 'Khả năng tạo sản phẩm và xử lý phản hồi.', 'Cách cân nhắc dữ liệu, ràng buộc và quyết định.'][index],
    context: 'Đây là trải nghiệm ngắn để thu thập bằng chứng về cách bạn làm việc, không phải bài thi hay kết luận tuyệt đối về ngành.',
    instructions: ['Đọc bối cảnh và xác định kết quả cần bàn giao.', 'Thực hiện bản nháp, ghi lại ít nhất hai quyết định quan trọng.', 'Kiểm tra theo rubric rồi nộp evidence và phần giải thích ngắn.'],
    rubric: ['Evidence mở được và trả lời đúng yêu cầu của brief.', 'Có giải thích cho ít nhất hai quyết định đã thực hiện.', 'Có ghi nhận điều còn chưa chắc chắn hoặc muốn thử thêm.'],
    demoAnswer: createDemoAnswer(majorId, title, index, evidence),
  }
}

function tasksFor(majorId) {
  if (majorId === 'information-technology') {
    const initial = SOFTWARE_TASKS.map((task, index) => ({ id: `${majorId}-task-${index + 1}`, majorId, verifies: 'Kiểm chứng năng lực giải quyết vấn đề, độ kiên trì và hứng thú với công việc phần mềm.', ...task }))
    const verificationOrder = [DEADLINE_APP_WORKSPACE_KEY, SCORE_DEBUG_WORKSPACE_KEY, SIGNUP_TEST_WORKSPACE_KEY]
    return initial.sort((left, right) => verificationOrder.indexOf(left.workspaceKey) - verificationOrder.indexOf(right.workspaceKey))
  }
  return DEFAULT_TASKS[majorId].map((title, index) => makeGenericTask(majorId, title, index))
}

function withFollowUpTasks(major) {
  const definitions = major.id === 'information-technology'
    ? [
      ['Xây dựng ứng dụng nhỏ', 'creation', 'Một ứng dụng chạy được cùng hướng dẫn sử dụng và ghi chú lựa chọn kỹ thuật.', 'Tạo một sản phẩm nhỏ từ yêu cầu đến bản chạy thử.'],
      ['Thiết kế dữ liệu cho một ứng dụng', 'analysis', 'Sơ đồ dữ liệu, ví dụ bản ghi và giải thích quan hệ.', 'Chuyển yêu cầu sản phẩm thành cấu trúc dữ liệu.'],
      ['Tìm hiểu cách hệ thống giao tiếp qua API', 'technical-analysis', 'API contract mẫu cùng request, response và lỗi dự kiến.', 'Kiểm chứng cách các thành phần phần mềm trao đổi dữ liệu.'],
      ['Mô phỏng làm việc nhóm phát triển phần mềm', 'collaboration', 'Kế hoạch chia việc, quy ước phối hợp và phần tự phản tư.', 'Tìm hiểu phối hợp, review và xử lý phụ thuộc trong nhóm.'],
    ]
    : major.id === 'marketing'
      ? [
        ['Phỏng vấn người dùng và tổng hợp insight', 'research', 'Ghi chú phỏng vấn, insight được nhóm và một đề xuất truyền thông.', 'Kiểm chứng cách biến dữ liệu định tính thành hướng truyền thông.'],
        ['Đọc kết quả chiến dịch và đề xuất thử nghiệm', 'analysis', 'Bản đọc chỉ số, giả thuyết và đề xuất thử nghiệm có thể đo lường.', 'Kiểm chứng cách dùng dữ liệu để cải thiện chiến dịch.'],
      ]
      : []
  const followUps = definitions.map(([title, workType, evidence, context], index) => ({
    id: `${major.id}-task-${major.tasks.length + index + 1}`,
    majorId: major.id,
    title,
    workType,
    workspaceKey: null,
    duration: '60–90 phút',
    evidence,
    verifies: 'Bổ sung bằng chứng về khả năng áp dụng và động lực tiếp tục khám phá ngành.',
    context,
    instructions: ['Đọc yêu cầu và xác định đầu ra cần bàn giao.', 'Thực hiện phương án của bạn và ghi lại các quyết định quan trọng.', 'Tự rà soát theo rubric, nộp sản phẩm và ghi lại điều cần kiểm chứng thêm.'],
    rubric: ['Đầu ra giải quyết đúng yêu cầu chính.', 'Lựa chọn được giải thích bằng lý do và ràng buộc cụ thể.', 'Nêu được giới hạn hoặc câu hỏi còn mở.'],
    demoAnswer: createDemoAnswer(major.id, title, major.tasks.length + index, evidence),
  }))
  return { ...major, tasks: [...major.tasks, ...followUps] }
}

export const ANNUAL_DEMO_GROUPS = CAREER_REPORT_GROUPS.map((group) => ({
  ...group,
  majors: group.majors.map((major) => withFollowUpTasks({ ...major, tasks: tasksFor(major.id) })),
}))

export const ANNUAL_DEMO_MAJORS = ANNUAL_DEMO_GROUPS.flatMap((group) => (
  group.majors.map((major) => ({ ...major, groupId: group.id, groupName: group.name }))
))

export const ANNUAL_DEMO_TASKS = ANNUAL_DEMO_MAJORS.flatMap((major) => (
  major.tasks.map((task) => ({ ...task, majorName: major.name, groupName: major.groupName }))
))

export const findDemoMajor = (majorId) => ANNUAL_DEMO_MAJORS.find(({ id }) => id === majorId)
export const findDemoTask = (taskId) => ANNUAL_DEMO_TASKS.find(({ id }) => id === taskId)

// Giữ export cũ để các màn hình đang dùng không bị gãy; danh sách được cá nhân hóa ở helper mới.
export const DEMO_SCHOOLS = getAllDemoUniversities()
