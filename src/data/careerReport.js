export const RIASEC_DIMENSIONS = {
  R: { name: 'Realistic', label: 'Thực tế', description: 'Ưa thao tác, công cụ và kết quả có thể quan sát.' },
  I: { name: 'Investigative', label: 'Nghiên cứu', description: 'Ưa phân tích, đặt câu hỏi và giải quyết vấn đề.' },
  A: { name: 'Artistic', label: 'Sáng tạo', description: 'Ưa tạo ý tưởng, biểu đạt và thử cách làm mới.' },
  S: { name: 'Social', label: 'Xã hội', description: 'Ưa hỗ trợ, lắng nghe và làm việc với con người.' },
  E: { name: 'Enterprising', label: 'Dẫn dắt', description: 'Ưa thuyết phục, tổ chức và tạo ảnh hưởng.' },
  C: { name: 'Conventional', label: 'Nghiệp vụ', description: 'Ưa cấu trúc, dữ liệu và quy trình rõ ràng.' },
}

export const CAREER_REPORT_GROUPS = [
  {
    id: 'technology-software', name: 'Công nghệ & Phần mềm', icon: 'terminal', tone: 'blue',
    reason: 'Tín hiệu từ tư duy phân tích, môn Toán/Tin và hứng thú giải quyết vấn đề bằng hệ thống.',
    unknown: 'Cần kiểm chứng bạn thích xây sản phẩm, làm việc với dữ liệu hay bảo vệ hệ thống hơn.',
    majors: [
      { id: 'information-technology', name: 'Kỹ thuật phần mềm', learn: 'Lập trình, kiểm thử, kiến trúc và quy trình phát triển sản phẩm số.', work: 'Phân tích yêu cầu, viết và sửa code, kiểm thử, phối hợp theo sprint.', fit: 'Phù hợp khi bạn thích biến vấn đề thành giải pháp logic và kiên trì sửa lỗi.', tradeoff: 'Thường phải học công nghệ mới và xử lý lỗi nhiều vòng.', evidenceGap: 'Chưa biết mức hứng thú khi debug lâu và nhận phản hồi kỹ thuật.' },
      { id: 'data-science', name: 'Khoa học dữ liệu', learn: 'Thống kê, lập trình, xử lý dữ liệu và mô hình dự báo.', work: 'Làm sạch dữ liệu, phân tích xu hướng, trực quan hóa và giải thích kết quả.', fit: 'Phù hợp với thế mạnh Toán và xu hướng ra quyết định dựa trên bằng chứng.', tradeoff: 'Dữ liệu thực tế thường thiếu, nhiễu và cần kiên nhẫn chuẩn hóa.', evidenceGap: 'Cần thử một bài phân tích dữ liệu từ đầu đến phần trình bày insight.' },
      { id: 'information-security', name: 'An toàn thông tin', learn: 'Mạng máy tính, hệ điều hành, mật mã và quản trị rủi ro bảo mật.', work: 'Tìm lỗ hổng, điều tra sự cố, xây quy tắc và giám sát hệ thống.', fit: 'Phù hợp khi bạn tò mò về cách hệ thống bị phá vỡ và thích suy luận chi tiết.', tradeoff: 'Đòi hỏi cập nhật liên tục và trách nhiệm cao khi có sự cố.', evidenceGap: 'Cần kiểm chứng hứng thú với mạng, log và tư duy phòng thủ.' },
    ],
  },
  {
    id: 'marketing-business', name: 'Marketing & Kinh doanh', icon: 'campaign', tone: 'rose',
    reason: 'Kết hợp tín hiệu sáng tạo, giao tiếp và mong muốn tạo ảnh hưởng đến quyết định của người khác.',
    unknown: 'Cần biết bạn thích nghiên cứu khách hàng, vận hành kinh doanh hay phát triển thị trường hơn.',
    majors: [
      { id: 'marketing', name: 'Marketing', learn: 'Hành vi khách hàng, thương hiệu, nội dung, kênh và đo lường chiến dịch.', work: 'Nghiên cứu insight, lên thông điệp, chạy chiến dịch và đọc hiệu quả.', fit: 'Phù hợp nếu bạn vừa thích ý tưởng vừa sẵn sàng dùng dữ liệu để kiểm tra ý tưởng.', tradeoff: 'Phản hồi thị trường nhanh, mục tiêu thay đổi và kết quả chịu nhiều yếu tố.', evidenceGap: 'Cần thử cả một task sáng tạo và một task đọc chỉ số chiến dịch.' },
      { id: 'international-business', name: 'Kinh doanh quốc tế', learn: 'Thị trường quốc tế, thương mại, chuỗi cung ứng, đàm phán và pháp lý cơ bản.', work: 'Phân tích thị trường, làm việc với đối tác và điều phối giao dịch xuyên biên giới.', fit: 'Phù hợp với Tiếng Anh tốt và hứng thú về thị trường, văn hóa, giao tiếp.', tradeoff: 'Cần chịu được thay đổi chính sách, múi giờ và khác biệt văn hóa.', evidenceGap: 'Cần kiểm chứng khả năng nghiên cứu thị trường và lập luận trong tình huống đàm phán.' },
      { id: 'e-commerce', name: 'Thương mại điện tử', learn: 'Vận hành sàn, hành trình khách hàng, thanh toán, tăng trưởng và dữ liệu bán hàng.', work: 'Tối ưu gian hàng, khuyến mãi, chuyển đổi và phối hợp vận hành đơn hàng.', fit: 'Phù hợp nếu bạn thích giao điểm giữa công nghệ, marketing và kinh doanh.', tradeoff: 'Nhịp vận hành nhanh, nhiều chỉ số và thường phải xử lý vấn đề tức thời.', evidenceGap: 'Cần thử phân tích một phễu bán hàng và đề xuất ưu tiên cải thiện.' },
    ],
  },
  {
    id: 'economics-finance', name: 'Kinh tế & Tài chính', icon: 'account_balance', tone: 'amber',
    reason: 'Tín hiệu Toán và tư duy phân tích phù hợp với quyết định dựa trên số liệu, chi phí và rủi ro.',
    unknown: 'Cần kiểm chứng mức hứng thú khi làm việc lâu với giả định, quy tắc và số liệu tài chính.',
    majors: [
      { id: 'finance', name: 'Tài chính', learn: 'Tài chính doanh nghiệp, đầu tư, định giá, dòng tiền và quản trị rủi ro.', work: 'Xây mô hình, so sánh phương án và giải thích tác động tài chính.', fit: 'Phù hợp khi bạn thích dùng con số để đánh giá lựa chọn và rủi ro.', tradeoff: 'Sai giả định có thể làm thay đổi kết luận; cần rất cẩn thận với dữ liệu.', evidenceGap: 'Cần thử lập một mô hình dòng tiền và bảo vệ các giả định.' },
      { id: 'banking', name: 'Ngân hàng', learn: 'Tín dụng, thanh toán, sản phẩm ngân hàng, pháp lý và quản trị rủi ro.', work: 'Phân tích hồ sơ, tư vấn sản phẩm, kiểm soát giao dịch và tuân thủ.', fit: 'Phù hợp nếu bạn thích nghiệp vụ có cấu trúc và làm việc với khách hàng/dữ liệu.', tradeoff: 'Quy trình chặt chẽ, trách nhiệm cao và chịu áp lực chỉ tiêu ở một số vai trò.', evidenceGap: 'Cần kiểm chứng sự thoải mái với quy trình và tình huống tư vấn tài chính.' },
      { id: 'accounting', name: 'Kế toán', learn: 'Nguyên lý kế toán, báo cáo tài chính, thuế, kiểm toán và kiểm soát nội bộ.', work: 'Ghi nhận, đối soát, kiểm tra chứng từ và lập báo cáo.', fit: 'Phù hợp với sự cẩn thận, tư duy hệ thống và khả năng theo quy tắc.', tradeoff: 'Có giai đoạn cao điểm và công việc đòi hỏi độ chính xác lặp lại.', evidenceGap: 'Cần thử đối soát một bộ giao dịch và phát hiện chênh lệch.' },
    ],
  },
  {
    id: 'digital-design', name: 'Thiết kế & Sản phẩm số', icon: 'palette', tone: 'violet',
    reason: 'Tín hiệu sáng tạo có thể phát triển theo hướng thiết kế trải nghiệm, hình ảnh hoặc nội dung số.',
    unknown: 'Cần kiểm chứng mức kiên nhẫn với phản hồi, nghiên cứu người dùng và nhiều vòng chỉnh sửa.',
    majors: [
      { id: 'ui-ux', name: 'UX/UI', learn: 'Nghiên cứu người dùng, kiến trúc thông tin, tương tác và thiết kế giao diện.', work: 'Phỏng vấn, dựng wireframe, prototype và kiểm thử khả dụng.', fit: 'Phù hợp khi bạn quan tâm cả con người, logic luồng và thẩm mỹ.', tradeoff: 'Thiết kế tốt cần chấp nhận sửa nhiều vòng dựa trên bằng chứng.', evidenceGap: 'Cần thử một vòng từ vấn đề người dùng đến prototype được kiểm thử.' },
      { id: 'communication-design', name: 'Thiết kế truyền thông', learn: 'Nguyên lý thị giác, thương hiệu, typography và sản xuất ấn phẩm.', work: 'Nhận brief, phát triển concept, thiết kế và bàn giao tài sản.', fit: 'Phù hợp nếu bạn thích kể chuyện bằng hình ảnh và chăm chút chi tiết.', tradeoff: 'Cần cân bằng gu cá nhân với brief và phản hồi của khách hàng.', evidenceGap: 'Cần thử làm một brief có giới hạn và chỉnh sửa theo phản hồi.' },
      { id: 'digital-media', name: 'Truyền thông số', learn: 'Nội dung đa nền tảng, video, âm thanh, phân phối và đo lường số.', work: 'Lên kịch bản, sản xuất nội dung và tối ưu theo phản hồi người xem.', fit: 'Phù hợp khi bạn thích kể chuyện và thử nhiều định dạng công nghệ.', tradeoff: 'Nhịp nội dung nhanh, cần học công cụ và theo dõi thay đổi nền tảng.', evidenceGap: 'Cần hoàn thành một sản phẩm số ngắn và tự đánh giá hiệu quả truyền tải.' },
    ],
  },
  {
    id: 'analysis-management', name: 'Phân tích & Quản trị', icon: 'monitoring', tone: 'cyan',
    reason: 'Tư duy cấu trúc và khả năng kết nối dữ liệu với quyết định mở ra nhóm ngành quản trị hệ thống.',
    unknown: 'Cần biết bạn thích đào sâu bài toán, thiết kế hệ thống hay tối ưu vận hành hơn.',
    majors: [
      { id: 'business-analysis', name: 'Phân tích kinh doanh', learn: 'Yêu cầu nghiệp vụ, dữ liệu, quy trình và ra quyết định.', work: 'Làm rõ vấn đề, phân tích chỉ số và chuyển nhu cầu thành giải pháp.', fit: 'Phù hợp nếu bạn thích đặt câu hỏi và kết nối người dùng với đội kỹ thuật.', tradeoff: 'Thông tin thường mơ hồ; cần giao tiếp nhiều để thống nhất phạm vi.', evidenceGap: 'Cần thử phân tích một vấn đề kinh doanh và viết yêu cầu rõ ràng.' },
      { id: 'management-information-systems', name: 'Hệ thống thông tin quản lý', learn: 'Nghiệp vụ doanh nghiệp, cơ sở dữ liệu, hệ thống và quản trị dự án CNTT.', work: 'Phân tích quy trình, cấu hình/triển khai hệ thống và làm cầu nối các bên.', fit: 'Phù hợp khi bạn thích cả công nghệ lẫn cách tổ chức vận hành.', tradeoff: 'Cần hiểu nhiều bên nhưng không phải lúc nào cũng đi sâu như kỹ sư phần mềm.', evidenceGap: 'Cần thử mô hình hóa quy trình và đề xuất một hệ thống hỗ trợ.' },
      { id: 'operations-management', name: 'Quản trị vận hành', learn: 'Quy trình, chất lượng, năng suất, chuỗi cung ứng và tối ưu nguồn lực.', work: 'Theo dõi chỉ số, xử lý điểm nghẽn và cải tiến quy trình.', fit: 'Phù hợp nếu bạn thích làm hệ thống chạy ổn định và hiệu quả hơn.', tradeoff: 'Nhiều ràng buộc thực tế, cần phản ứng nhanh khi có sự cố.', evidenceGap: 'Cần thử tìm nguyên nhân một điểm nghẽn và cân nhắc trade-off cải tiến.' },
    ],
  },
  {
    id: 'communications-people', name: 'Truyền thông & Con người', icon: 'diversity_3', tone: 'emerald',
    reason: 'Tín hiệu giao tiếp, thấu hiểu người khác và tổ chức thông điệp phù hợp với nhóm ngành làm việc cùng con người.',
    unknown: 'Cần kiểm chứng mức năng lượng khi tương tác liên tục, xử lý phản hồi và điều phối nhiều bên.',
    majors: [
      { id: 'communications', name: 'Truyền thông', learn: 'Lý thuyết truyền thông, nội dung, báo chí, nghiên cứu công chúng và đa nền tảng.', work: 'Lập kế hoạch thông điệp, sản xuất nội dung và đánh giá phản hồi.', fit: 'Phù hợp nếu bạn thích tổng hợp vấn đề và diễn đạt cho nhiều nhóm người.', tradeoff: 'Thông điệp dễ bị diễn giải khác nhau và chịu áp lực thời điểm.', evidenceGap: 'Cần thử biến một chủ đề phức tạp thành nội dung rõ ràng cho đúng công chúng.' },
      { id: 'public-relations', name: 'Quan hệ công chúng', learn: 'Quan hệ báo chí, sự kiện, danh tiếng, stakeholder và truyền thông khủng hoảng.', work: 'Xây quan hệ, viết thông cáo, tổ chức sự kiện và phản hồi tình huống.', fit: 'Phù hợp nếu bạn giao tiếp tốt, nhạy bối cảnh và thích điều phối.', tradeoff: 'Có tình huống áp lực cao, cần phản ứng nhanh và giữ tính nhất quán.', evidenceGap: 'Cần thử lập phương án phản hồi một tình huống có nhiều bên liên quan.' },
      { id: 'human-resources', name: 'Quản trị nhân lực', learn: 'Tuyển dụng, đào tạo, hiệu suất, quan hệ lao động và dữ liệu nhân sự.', work: 'Thiết kế vai trò, phỏng vấn, hỗ trợ phát triển và vận hành chính sách.', fit: 'Phù hợp nếu bạn thích hiểu con người nhưng vẫn làm việc theo hệ thống.', tradeoff: 'Phải cân bằng nhu cầu cá nhân với quy định và mục tiêu tổ chức.', evidenceGap: 'Cần thử phỏng vấn tình huống hoặc thiết kế một quy trình nhân sự nhỏ.' },
    ],
  },
]

export const CAREER_REPORT_MAJORS = CAREER_REPORT_GROUPS.flatMap((group) => (
  group.majors.map((major) => ({ ...major, groupId: group.id, groupName: group.name }))
))

const UNIVERSITY_CATALOG = [
  { id: 'uit', name: 'Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM', region: 'TP.HCM', environment: 'Môi trường chuyên sâu công nghệ; cần tự đối chiếu chương trình cụ thể.', tuition: 'Chưa đối chiếu bảng phí tuyển sinh 2027', majors: ['information-technology', 'data-science', 'information-security'], programs: ['Kỹ thuật phần mềm', 'Khoa học dữ liệu', 'An toàn thông tin'], path: '/universities/uit' },
  { id: 'hcmut', name: 'Trường Đại học Bách khoa – ĐHQG TP.HCM', region: 'TP.HCM', environment: 'Môi trường kỹ thuật và nền tảng khoa học; cần kiểm tra đề án từng chương trình.', tuition: 'Chưa đối chiếu bảng phí tuyển sinh 2027', majors: ['information-technology', 'data-science', 'management-information-systems'], programs: ['Nhóm ngành Máy tính và Công nghệ thông tin'], path: '/universities' },
  { id: 'fpt', name: 'Trường Đại học FPT TP.HCM', region: 'TP.HCM', environment: 'Thiên về dự án và thực hành; cần xác nhận cơ sở, học bổng và tổng chi phí.', tuition: 'Cần xác nhận theo học kỳ và chính sách 2027', majors: ['information-technology', 'digital-media', 'communication-design', 'marketing', 'ui-ux', 'e-commerce', 'international-business'], programs: ['Kỹ thuật phần mềm', 'Truyền thông đa phương tiện', 'Thiết kế mỹ thuật số', 'Digital Marketing', 'Thiết kế trải nghiệm số (cần đối chiếu tên ngành)', 'Kinh doanh số (cần đối chiếu tên ngành)', 'Kinh doanh quốc tế'], path: '/universities' },
  { id: 'ueh', name: 'Đại học Kinh tế TP.HCM', region: 'TP.HCM', environment: 'Nhiều hướng kinh doanh, tài chính và phân tích; cần đối chiếu chương trình đào tạo.', tuition: 'Chưa đối chiếu bảng phí tuyển sinh 2027', majors: ['marketing', 'finance', 'banking', 'accounting', 'business-analysis', 'e-commerce', 'international-business', 'management-information-systems', 'operations-management', 'human-resources'], programs: ['Marketing', 'Tài chính', 'Ngân hàng', 'Kế toán', 'Phân tích kinh doanh', 'Thương mại điện tử', 'Kinh doanh quốc tế', 'Hệ thống thông tin quản lý', 'Quản trị vận hành (cần đối chiếu tên ngành)', 'Quản trị nhân lực'], path: '/universities' },
  { id: 'ftu2', name: 'Trường Đại học Ngoại thương – Cơ sở II', region: 'TP.HCM', environment: 'Thế mạnh kinh tế và kinh doanh; cần kiểm tra ngành/chỉ tiêu tại cơ sở II.', tuition: 'Chưa đối chiếu bảng phí tuyển sinh 2027', majors: ['marketing', 'international-business', 'finance'], programs: ['Kinh doanh quốc tế', 'Marketing', 'Tài chính quốc tế'], path: '/universities' },
  { id: 'rmit', name: 'RMIT Việt Nam – Cơ sở Nam Sài Gòn', region: 'TP.HCM', environment: 'Môi trường quốc tế và học bằng tiếng Anh; cần kiểm tra yêu cầu đầu vào.', tuition: 'Có khả năng vượt khoảng 25–45 triệu/năm; cần kiểm tra tổng học phí', majors: ['marketing', 'international-business', 'communications', 'digital-media', 'ui-ux', 'communication-design', 'public-relations'], programs: ['Digital Marketing', 'International Business', 'Professional Communication', 'Digital Media', 'Thiết kế số (cần đối chiếu tên ngành)', 'Thiết kế truyền thông (cần đối chiếu tên ngành)', 'Truyền thông chuyên nghiệp/PR (cần đối chiếu)'], path: '/universities' },
]

export function getMajorProfile(majorId) {
  return CAREER_REPORT_MAJORS.find((major) => major.id === majorId)
}

export function getRecommendedUniversities(majorId, profile = {}) {
  const requestedRegions = profile.regions ?? []
  const hasAdmissionScore = Boolean(profile.gpa || profile.thptScore || profile.dgnlScore)
  return UNIVERSITY_CATALOG
    .filter((school) => school.majors.includes(majorId))
    .map((school) => ({
      ...school,
      program: school.programs[school.majors.indexOf(majorId)] ?? school.programs[0],
      criteria: {
        major: 'Có chương trình liên quan trong dữ liệu demo',
        location: requestedRegions.length ? `Cùng khu vực ưu tiên: ${school.region}` : `Khu vực: ${school.region}`,
        finance: school.tuition,
        admission: hasAdmissionScore ? 'Có dữ liệu học lực cá nhân để tiếp tục đối chiếu; chưa ước lượng xác suất trúng tuyển.' : 'Chưa có điểm đầu vào — không quy đổi thành 0 và chưa đánh giá khả năng xét tuyển.',
        environment: school.environment,
      },
      source: 'Dữ liệu mô phỏng cho luồng demo — phải đối chiếu website tuyển sinh chính thức',
      updatedAt: '21/10/2026',
    }))
}

export function getAllDemoUniversities() {
  return UNIVERSITY_CATALOG.map((school) => ({ ...school }))
}

export function getProfileCompleteness(profile = {}, answerCount = 0) {
  const checks = [
    { key: 'riasec', label: '30 câu RIASEC', complete: answerCount === 30 },
    { key: 'region', label: 'Khu vực ưu tiên', complete: Boolean(profile.regions?.length) },
    { key: 'tuition', label: 'Ngân sách học phí', complete: Boolean(profile.tuition) },
    { key: 'strengths', label: 'Môn học thế mạnh', complete: Boolean(profile.strengths?.length) },
    { key: 'score', label: 'Ít nhất một loại điểm', complete: Boolean(profile.gpa || profile.thptScore || profile.dgnlScore) },
  ]
  return {
    percent: Math.round((checks.filter(({ complete }) => complete).length / checks.length) * 100),
    missing: checks.filter(({ complete }) => !complete).map(({ label }) => label),
  }
}
