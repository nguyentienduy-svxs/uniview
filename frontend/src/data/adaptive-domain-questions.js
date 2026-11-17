export const DOMAIN_CODES = [
  'TECHNOLOGY',
  'RESEARCH_DATA',
  'VISUAL_DESIGN',
  'MUSIC_PERFORMANCE',
  'COMMUNICATION_LEADERSHIP',
  'CARE_TEACHING',
  'BUSINESS_ORGANIZATION',
  'HANDS_ON_ENGINEERING',
]

export const EXPERIENCE_DOMAINS = [
  { code: 'TECHNOLOGY', title: 'Công nghệ & Lập trình', icon: 'code', prefix: 'TECH' },
  { code: 'RESEARCH_DATA', title: 'Nghiên cứu & Dữ liệu', icon: 'query_stats', prefix: 'DATA' },
  { code: 'VISUAL_DESIGN', title: 'Hội họa & Thiết kế', icon: 'palette', prefix: 'DESIGN' },
  { code: 'MUSIC_PERFORMANCE', title: 'Âm nhạc & Biểu diễn', icon: 'music_note', prefix: 'PERFORMANCE' },
  { code: 'COMMUNICATION_LEADERSHIP', title: 'Giao tiếp & Dẫn dắt', icon: 'campaign', prefix: 'COMMUNICATION' },
  { code: 'CARE_TEACHING', title: 'Hỗ trợ & Giảng dạy', icon: 'volunteer_activism', prefix: 'CARE' },
  { code: 'BUSINESS_ORGANIZATION', title: 'Kinh doanh & Tổ chức', icon: 'storefront', prefix: 'BUSINESS' },
  { code: 'HANDS_ON_ENGINEERING', title: 'Kỹ thuật & Thực hành', icon: 'handyman', prefix: 'HANDS_ON' },
]

export const BASE_EVIDENCE_QUESTIONS = [
  {
    key: 'recency',
    prompt: 'Bạn thực hiện hoạt động này gần đây nhất khi nào?',
    options: [
      { id: 'LAST_3_MONTHS', label: 'Trong 3 tháng gần đây', score: 100 },
      { id: 'LAST_YEAR', label: 'Trong 1 năm gần đây', score: 70 },
      { id: 'OLDER_THAN_YEAR', label: 'Hơn 1 năm trước', score: 40 },
    ],
  },
  {
    key: 'frequency',
    prompt: 'Bạn thực hiện với tần suất nào?',
    options: [
      { id: 'TRIED_FEW_TIMES', label: 'Chỉ thử một vài lần', score: 25 },
      { id: 'OCCASIONAL', label: 'Thỉnh thoảng, vài tháng/lần', score: 50 },
      { id: 'MONTHLY', label: 'Hàng tháng', score: 75 },
      { id: 'WEEKLY_OR_MORE', label: 'Hàng tuần hoặc thường xuyên hơn', score: 100 },
    ],
  },
  {
    key: 'voluntaryLevel',
    prompt: 'Bạn tham gia vì lý do nào?',
    options: [
      { id: 'VOLUNTARY', label: 'Hoàn toàn tự nguyện do yêu thích', score: 100 },
      { id: 'MIXED', label: 'Vừa tự nguyện vừa do yêu cầu bài học', score: 65 },
      { id: 'REQUIRED', label: 'Chủ yếu do trường lớp hoặc người khác yêu cầu', score: 30 },
    ],
  },
  {
    key: 'role',
    prompt: 'Vai trò chủ yếu của bạn trong hoạt động này là gì?',
    options: [
      { id: 'OBSERVED_SUPPORTED', label: 'Quan sát hoặc hỗ trợ người khác', score: 25 },
      { id: 'CONTRIBUTOR', label: 'Trực tiếp thực hiện một phần', score: 50 },
      { id: 'CORE_MEMBER', label: 'Phụ trách phần chính', score: 75 },
      { id: 'INITIATOR_LEAD', label: 'Tự khởi xướng hoặc dẫn dắt', score: 100 },
    ],
  },
  {
    key: 'outcome',
    prompt: 'Bạn đã từng nhận được kết quả hoặc phản hồi nào chưa?',
    options: [
      { id: 'NONE', label: 'Chưa có sản phẩm hoặc phản hồi cụ thể', score: 20 },
      { id: 'PERSONAL_PRODUCT', label: 'Đã hoàn thành sản phẩm cá nhân', score: 50 },
      { id: 'EXPERT_FEEDBACK', label: 'Có phản hồi từ giáo viên hoặc người có kinh nghiệm', score: 75 },
      { id: 'PUBLIC_ACHIEVEMENT', label: 'Có giải thưởng, chứng nhận hoặc sản phẩm công khai', score: 100 },
    ],
  },
]

const option = (id, label, realityAlignment, signalTag) => ({
  id,
  label,
  realityAlignment,
  signalTags: [signalTag ?? id],
})

const question = (id, domain, level, prompt, options, helpText) => ({
  id,
  domain,
  level,
  prompt,
  ...(helpText ? { helpText } : {}),
  options,
})

const bank = (domain, lowExposureQuestions, realityCheckQuestions, deepDiveQuestions) => ({
  domain,
  lowExposureQuestions,
  realityCheckQuestions,
  deepDiveQuestions,
})

export const ADAPTIVE_DOMAIN_QUESTION_BANKS = {
  TECHNOLOGY: bank(
    'TECHNOLOGY',
    [question('TECH-L01', 'TECHNOLOGY', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động công nghệ ngắn, hoạt động nào khiến bạn muốn bắt đầu nhất?', [
      option('BUILD_INTERFACE', 'Tạo một trang web hoặc giao diện nhỏ', 70, 'BUILD_INTEREST'),
      option('FIX_BUG', 'Tìm nguyên nhân khiến một chương trình chạy sai', 90, 'DEBUG_INTEREST'),
      option('AUTOMATE', 'Viết công cụ tự động hóa một việc đang làm thủ công', 85, 'AUTOMATION_INTEREST'),
      option('EXPLORE_ONLY', 'Xem người khác làm trước rồi mới quyết định', 45, 'NEEDS_EXPOSURE'),
    ])],
    [
      question('TECH-R01', 'TECHNOLOGY', 'REALITY_CHECK', 'Khi chương trình chạy sai mà chưa biết nguyên nhân, bạn thường muốn làm gì?', [
        option('STOP', 'Chuyển sang việc khác vì việc tìm lỗi làm tôi nhanh mất hứng', 20, 'LOW_DEBUG_TOLERANCE'),
        option('SEARCH_SOLUTION', 'Tìm ngay một lời giải có sẵn để làm tiếp', 55, 'SOLUTION_SEARCH'),
        option('TRACE', 'Đọc thông báo lỗi và kiểm tra từng phần để tìm nguyên nhân', 95, 'DEBUG_PROCESS'),
        option('EXPERIMENT', 'Đặt vài giả thuyết, thử từng giả thuyết và ghi lại kết quả', 100, 'SYSTEMATIC_EXPERIMENT'),
      ]),
      question('TECH-R02', 'TECHNOLOGY', 'REALITY_CHECK', 'Nếu phải bảo trì một sản phẩm cũ thay vì tạo tính năng mới, bạn cảm thấy thế nào?', [
        option('AVOID', 'Khá khó chịu vì tôi chỉ muốn tạo thứ mới', 25, 'NOVELTY_ONLY'),
        option('DEPENDS', 'Tùy dự án và mức độ lặp lại', 60, 'CONTEXT_DEPENDENT'),
        option('ACCEPT', 'Có thể chấp nhận nếu hiểu giá trị của việc sửa', 80, 'MAINTENANCE_ACCEPTANCE'),
        option('ENJOY', 'Thấy thú vị khi làm hệ thống ổn định và dễ dùng hơn', 100, 'MAINTENANCE_INTEREST'),
      ]),
      question('TECH-R03', 'TECHNOLOGY', 'REALITY_CHECK', 'Yêu cầu của dự án còn mơ hồ. Bạn thường muốn…', [
        option('WAIT', 'Chờ yêu cầu hoàn chỉnh rồi mới bắt đầu', 35),
        option('ASSUME', 'Tự chọn cách hiểu và làm luôn', 55),
        option('CLARIFY', 'Viết lại điều chưa rõ và xác nhận với người liên quan', 100),
        option('PROTOTYPE', 'Làm prototype nhỏ để kiểm tra cách hiểu', 95),
      ]),
    ],
    [question('TECH-D01', 'TECHNOLOGY', 'DEEP_DIVE', 'Sau nhiều giờ vẫn chưa giải quyết được lỗi, cách nào gần với bạn nhất?', [
      option('GIVE_UP', 'Bỏ việc đó vì có lẽ mình không hợp', 15),
      option('COPY', 'Thay toàn bộ bằng một đoạn code khác', 45),
      option('TAKE_BREAK', 'Nghỉ ngắn rồi quay lại với checklist mới', 90),
      option('DOCUMENT_ASK', 'Ghi lại điều đã thử rồi nhờ người khác review', 100),
    ])],
  ),
  RESEARCH_DATA: bank('RESEARCH_DATA', [question('DATA-L01', 'RESEARCH_DATA', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động dữ liệu ngắn, bạn muốn thử việc nào nhất?', [
    option('FIND_ANOMALY', 'Đọc một bảng dữ liệu và tìm điều bất thường', 90), option('RUN_SURVEY', 'Tạo khảo sát nhỏ và tổng hợp kết quả', 80), option('TEST_HYPOTHESIS', 'Kiểm tra một giả thuyết bằng thí nghiệm', 90), option('OBSERVE_ANALYSIS', 'Xem người khác phân tích trước', 45),
  ])], [
    question('DATA-R01', 'RESEARCH_DATA', 'REALITY_CHECK', 'Khi dữ liệu không ủng hộ giả thuyết ban đầu, bạn thường…', [option('DISCARD', 'Bỏ phần dữ liệu đó vì làm kết quả rối hơn', 10), option('RECHECK', 'Kiểm tra lại cách thu thập và xử lý dữ liệu', 95), option('ADJUST_CONCLUSION', 'Điều chỉnh kết luận theo bằng chứng hiện có', 100), option('ASK_EXPERT', 'Hỏi người có kinh nghiệm trước khi quyết định', 80)]),
    question('DATA-R02', 'RESEARCH_DATA', 'REALITY_CHECK', 'Một dự án phải làm sạch dữ liệu khá lâu trước khi phân tích. Bạn cảm thấy…', [option('LOSE_INTEREST', 'Khó duy trì hứng thú', 30), option('DO_IF_NEEDED', 'Không thích nhưng vẫn làm nếu cần', 65), option('UNDERSTAND_VALUE', 'Hợp lý vì dữ liệu đầu vào quyết định kết quả', 90), option('ENJOY_CLEANING', 'Thích tìm lỗi và chuẩn hóa dữ liệu', 100)]),
    question('DATA-R03', 'RESEARCH_DATA', 'REALITY_CHECK', 'Có hai nguồn dữ liệu đưa ra kết quả khác nhau. Bạn sẽ…', [option('CHOOSE_EXPECTED', 'Chọn nguồn cho kết quả mình mong đợi', 10), option('CHOOSE_LARGER', 'Dùng nguồn có số lượng mẫu lớn hơn ngay', 55), option('COMPARE_METHODS', 'So sánh cách thu thập, thời gian và phạm vi của hai nguồn', 100), option('KEEP_BOTH', 'Báo rằng chưa đủ cơ sở và giữ cả hai khả năng', 90)]),
  ], [question('DATA-D01', 'RESEARCH_DATA', 'DEEP_DIVE', 'Khi trình bày một kết quả còn nhiều bất định, bạn thường…', [option('MAIN_NUMBER', 'Chỉ trình bày con số chính để dễ hiểu', 40), option('EXPLAIN_LIMITS', 'Giải thích giới hạn, giả định và mức bất định', 100), option('AVOID_CONCLUSION', 'Tránh đưa ra kết luận', 55), option('SCENARIOS', 'Trình bày nhiều kịch bản có thể xảy ra', 90)])]),
  VISUAL_DESIGN: bank('VISUAL_DESIGN', [question('DESIGN-L01', 'VISUAL_DESIGN', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động thiết kế ngắn, bạn muốn thử…', [option('POSTER_HIERARCHY', 'Sửa hierarchy của một poster', 90), option('REDESIGN_SCREEN', 'Thiết kế lại một màn hình ứng dụng', 90), option('STORYBOARD', 'Làm storyboard cho video', 80), option('FREE_DRAW', 'Vẽ tự do không có brief', 60)])], [
    question('DESIGN-R01', 'VISUAL_DESIGN', 'REALITY_CHECK', 'Khi sản phẩm bạn thích bị yêu cầu sửa nhiều vòng theo brief, bạn thường…', [option('KEEP_STYLE', 'Muốn giữ nguyên vì đó là phong cách cá nhân', 25), option('FOLLOW_ALL', 'Sửa theo mọi yêu cầu dù chưa hiểu mục tiêu', 50), option('CLARIFY_BRIEF', 'Hỏi lại mục tiêu rồi thử phương án đáp ứng brief', 100), option('COMPARE_VERSIONS', 'Tạo vài phiên bản để so sánh và xin phản hồi', 95)]),
    question('DESIGN-R02', 'VISUAL_DESIGN', 'REALITY_CHECK', 'Khi không có cảm hứng nhưng deadline đang đến gần, bạn thường…', [option('WAIT_INSPIRATION', 'Chờ có cảm hứng rồi mới tiếp tục', 20), option('MINIMUM', 'Làm tối thiểu để kịp nộp', 45), option('USE_PROCESS', 'Quay lại brief, tìm reference và làm từng bước', 95), option('EARLY_DRAFT', 'Tạo bản nháp sớm rồi xin phản hồi', 90)]),
    question('DESIGN-R03', 'VISUAL_DESIGN', 'REALITY_CHECK', 'Khi người khác nói thiết kế “không đẹp” nhưng không giải thích, bạn sẽ…', [option('CHANGE_ALL', 'Đổi toàn bộ thiết kế theo sở thích của họ', 40), option('IGNORE', 'Bỏ qua vì đó chỉ là ý kiến cá nhân', 30), option('ASK_SPECIFIC', 'Hỏi mục tiêu và vấn đề cụ thể họ đang gặp', 100), option('USER_TEST', 'Thử kiểm tra thiết kế với thêm người dùng', 95)]),
  ], [question('DESIGN-D01', 'VISUAL_DESIGN', 'DEEP_DIVE', 'Khi phải giải thích lựa chọn màu sắc và bố cục, bạn thường…', [option('PERSONAL_TASTE', 'Nói rằng mình thấy đẹp và phù hợp', 35), option('PRINCIPLES', 'Dựa vào nguyên tắc, mục tiêu và đối tượng sử dụng', 100), option('FAMOUS_REFERENCE', 'Dùng reference của thiết kế nổi tiếng', 70), option('AB_COMPARE', 'Tạo hai phiên bản rồi so sánh phản ứng', 90)])]),
  MUSIC_PERFORMANCE: bank('MUSIC_PERFORMANCE', [question('PERFORMANCE-L01', 'MUSIC_PERFORMANCE', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động biểu diễn, bạn muốn thử…', [option('PLAY_MUSIC', 'Hát hoặc chơi một đoạn nhạc ngắn', 85), option('ACT_SCENE', 'Thử diễn một cảnh ngắn', 85), option('DANCE', 'Thử vũ đạo theo hướng dẫn', 80), option('OBSERVE_REHEARSAL', 'Quan sát buổi rehearsal trước', 45)])], [
    question('PERFORMANCE-R01', 'MUSIC_PERFORMANCE', 'REALITY_CHECK', 'Một đoạn ngắn vẫn chưa đạt dù đã luyện nhiều lần. Bạn thường…', [option('SKIP', 'Bỏ qua đoạn đó để tập phần thú vị hơn', 25), option('REPEAT_SAME', 'Lặp lại nhiều lần theo cùng một cách', 60), option('ISOLATE_ADAPT', 'Tách đoạn khó, nghe lại và đổi cách luyện', 100), option('ASK_FEEDBACK', 'Xin người có kinh nghiệm quan sát và góp ý', 90)]),
    question('PERFORMANCE-R02', 'MUSIC_PERFORMANCE', 'REALITY_CHECK', 'Nếu phải diễn lại một cảnh nhiều lần theo các direction khác nhau, bạn cảm thấy…', [option('KEEP_ORIGINAL', 'Khó chịu vì muốn giữ cách thể hiện ban đầu', 20), option('TIRED_COMPLETE', 'Mệt nhưng vẫn có thể hoàn thành', 55), option('CURIOUS_EFFECT', 'Tò mò xem mỗi thay đổi tạo hiệu quả gì', 95), option('ENJOY_DIRECTION', 'Thích nhận direction và tinh chỉnh chi tiết', 100)]),
    question('PERFORMANCE-R03', 'MUSIC_PERFORMANCE', 'REALITY_CHECK', 'Trước một buổi biểu diễn có người đánh giá, bạn thường…', [option('AVOID', 'Muốn tránh tham gia vì sợ sai', 25), option('PRACTICE_STRENGTH', 'Chỉ tập phần mình đã làm tốt', 50), option('PREPARE_ACCEPT', 'Chuẩn bị trước và chấp nhận khả năng mắc lỗi', 90), option('USE_EVALUATION', 'Xem đánh giá là dữ liệu để cải thiện lần sau', 100)]),
  ], [question('PERFORMANCE-D01', 'MUSIC_PERFORMANCE', 'DEEP_DIVE', 'Nếu không được chọn sau một buổi audition, bạn thường…', [option('NO_TALENT', 'Xem đó là bằng chứng mình không có năng khiếu', 15), option('AVOID_AUDITION', 'Tránh audition thêm trong thời gian dài', 25), option('REQUEST_FEEDBACK', 'Xin feedback và xác định phần cần luyện', 100), option('KEEP_OPTIONS', 'Tiếp tục luyện nhưng cân nhắc nhiều hướng biểu diễn khác', 90)])]),
  COMMUNICATION_LEADERSHIP: bank('COMMUNICATION_LEADERSHIP', [question('COMMUNICATION-L01', 'COMMUNICATION_LEADERSHIP', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động giao tiếp, bạn muốn…', [option('PITCH', 'Pitch một ý tưởng ngắn', 85), option('DEBATE', 'Tham gia tranh biện', 80), option('FACILITATE', 'Điều phối một nhóm nhỏ', 90), option('OBSERVE', 'Quan sát người khác trình bày trước', 45)])], [
    question('COMMUNICATION-R01', 'COMMUNICATION_LEADERSHIP', 'REALITY_CHECK', 'Khi người nghe không đồng ý với đề xuất của bạn, bạn thường…', [option('REPEAT_STRONGER', 'Lặp lại quan điểm mạnh hơn', 35), option('STOP', 'Dừng thuyết phục vì không muốn tranh luận', 30), option('ASK_ADAPT', 'Hỏi lý do phản đối rồi điều chỉnh cách trình bày', 100), option('ADD_EVIDENCE', 'Tìm dữ liệu hoặc ví dụ liên quan để trao đổi tiếp', 90)]),
    question('COMMUNICATION-R02', 'COMMUNICATION_LEADERSHIP', 'REALITY_CHECK', 'Nhóm mất động lực giữa dự án. Bạn thường…', [option('ASSIGN', 'Tự quyết định và giao việc cho nhanh', 50), option('DIAGNOSE_ALIGN', 'Tìm hiểu nguyên nhân rồi cùng nhóm thống nhất bước tiếp', 100), option('DO_MORE', 'Tự làm thêm phần việc để dự án không chậm', 60), option('WAIT', 'Chờ mọi người tự lấy lại động lực', 25)]),
    question('COMMUNICATION-R03', 'COMMUNICATION_LEADERSHIP', 'REALITY_CHECK', 'Khi phải trình bày cho nhóm người ít quan tâm đến chủ đề, bạn sẽ…', [option('KEEP_CONTENT', 'Giữ nguyên nội dung đã chuẩn bị', 45), option('SPEAK_FAST', 'Nói nhanh để hoàn thành', 25), option('LINK_NEEDS', 'Tìm điều liên quan đến nhu cầu của người nghe', 100), option('ADAPT_LIVE', 'Thay đổi ví dụ và cách trình bày theo phản ứng của họ', 95)]),
  ], [question('COMMUNICATION-D01', 'COMMUNICATION_LEADERSHIP', 'DEEP_DIVE', 'Khi quyết định của nhóm gây kết quả không tốt, bạn thường…', [option('SHARED_BLAME', 'Giải thích rằng mọi người đều đồng ý', 30), option('TAKE_ALL_BLAME', 'Nhận toàn bộ lỗi về mình', 50), option('REVIEW_PROCESS', 'Cùng nhóm xem lại dữ liệu và quá trình ra quyết định', 100), option('OWN_AND_FIX', 'Nhận trách nhiệm phần của mình và đề xuất cách sửa', 95)])]),
  CARE_TEACHING: bank('CARE_TEACHING', [question('CARE-L01', 'CARE_TEACHING', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động hỗ trợ, bạn muốn…', [option('TEACH', 'Hướng dẫn người khác một nội dung mình biết', 90), option('VOLUNTEER', 'Tham gia tình nguyện', 80), option('LISTEN', 'Lắng nghe một tình huống cần hỗ trợ', 85), option('OBSERVE', 'Quan sát người có kinh nghiệm làm trước', 45)])], [
    question('CARE-R01', 'CARE_TEACHING', 'REALITY_CHECK', 'Một người vẫn chưa hiểu sau khi bạn đã giải thích. Bạn thường…', [option('REPEAT', 'Lặp lại đúng cách giải thích ban đầu', 45), option('CHANGE_EXAMPLE', 'Đổi ví dụ và hỏi phần nào khiến họ vướng', 100), option('GIVE_ANSWER', 'Đưa đáp án để họ có thể tiếp tục', 35), option('REFER', 'Tìm tài liệu hoặc người phù hợp hơn để hỗ trợ', 85)]),
    question('CARE-R02', 'CARE_TEACHING', 'REALITY_CHECK', 'Khi hỗ trợ người khác trong thời gian dài, bạn nghĩ về giới hạn thế nào?', [option('ALWAYS_AVAILABLE', 'Luôn cố gắng có mặt kể cả khi kiệt sức', 40), option('DISTANCE', 'Giữ khoảng cách để không bị ảnh hưởng cảm xúc', 55), option('BOUNDARIES_RESOURCES', 'Thống nhất phạm vi hỗ trợ và tìm thêm nguồn lực khi cần', 100), option('DEPENDS', 'Tùy mối quan hệ và mức độ nghiêm trọng', 70)]),
    question('CARE-R03', 'CARE_TEACHING', 'REALITY_CHECK', 'Người được hỗ trợ chia sẻ vấn đề vượt quá khả năng của bạn. Bạn sẽ…', [option('SOLVE_ALONE', 'Tiếp tục tự giải quyết vì họ tin tưởng mình', 30), option('AVOID', 'Tránh trao đổi thêm vì sợ trách nhiệm', 25), option('STATE_LIMIT_REFER', 'Nói rõ giới hạn và giới thiệu nguồn hỗ trợ phù hợp', 100), option('CONSULT_SAFELY', 'Hỏi ý kiến người có chuyên môn nhưng bảo vệ thông tin cần thiết', 95)]),
  ], [question('CARE-D01', 'CARE_TEACHING', 'DEEP_DIVE', 'Người học tiến bộ chậm dù bạn đã dành nhiều thời gian. Bạn thường…', [option('BLAME_EFFORT', 'Cho rằng họ chưa đủ cố gắng', 20), option('DO_FOR_THEM', 'Tự làm thay phần khó cho họ', 40), option('REVIEW_PROGRESS', 'Xem lại mục tiêu, cách dạy và tiến bộ nhỏ đã có', 100), option('ASK_ADJUST', 'Hỏi họ đang gặp trở ngại gì và điều chỉnh kế hoạch', 95)])]),
  BUSINESS_ORGANIZATION: bank('BUSINESS_ORGANIZATION', [question('BUSINESS-L01', 'BUSINESS_ORGANIZATION', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động kinh doanh, bạn muốn…', [option('BUDGET', 'Lập ngân sách cho dự án nhỏ', 85), option('SELL_IDEA', 'Thử giới thiệu và bán một ý tưởng', 80), option('OPERATE_EVENT', 'Lên kế hoạch vận hành sự kiện', 90), option('COMPARE_RESOURCES', 'So sánh các phương án sử dụng nguồn lực', 90)])], [
    question('BUSINESS-R01', 'BUSINESS_ORGANIZATION', 'REALITY_CHECK', 'Chi phí thực tế cao hơn kế hoạch. Bạn thường…', [option('KEEP_PLAN', 'Giữ kế hoạch cũ và hy vọng phần khác bù lại', 20), option('CUT_LARGEST', 'Cắt ngay hạng mục có chi phí lớn nhất', 60), option('REVIEW_OPTIONS', 'Xem mục tiêu, tác động và lựa chọn trước khi điều chỉnh', 100), option('ESCALATE_OPTIONS', 'Báo người phụ trách và đề xuất vài phương án', 90)]),
    question('BUSINESS-R02', 'BUSINESS_ORGANIZATION', 'REALITY_CHECK', 'Kế hoạch được chuẩn bị kỹ nhưng số liệu cho thấy hiệu quả thấp. Bạn thường…', [option('CONTINUE', 'Tiếp tục vì đã đầu tư nhiều công sức', 20), option('CHANGE_ALL', 'Đổi toàn bộ kế hoạch ngay', 55), option('SMALL_TEST', 'Thử thay đổi nhỏ và theo dõi kết quả', 100), option('CHECK_MEASUREMENT', 'Kiểm tra lại cách đo trước khi kết luận', 90)]),
    question('BUSINESS-R03', 'BUSINESS_ORGANIZATION', 'REALITY_CHECK', 'Bạn phải chọn giữa nhanh hơn, rẻ hơn và chất lượng cao hơn. Bạn sẽ…', [option('CHEAPEST', 'Chọn phương án rẻ nhất', 45), option('FASTEST', 'Chọn phương án nhanh nhất', 40), option('PRIORITIZE', 'Xác định tiêu chí quan trọng nhất theo mục tiêu', 100), option('SHOW_TRADEOFFS', 'Trình bày vài phương án cùng trade-off để người liên quan chọn', 95)]),
  ], [question('BUSINESS-D01', 'BUSINESS_ORGANIZATION', 'DEEP_DIVE', 'Dự án đạt mục tiêu số lượng nhưng người dùng phản hồi không tốt. Bạn thường…', [option('KPI_SUCCESS', 'Xem dự án thành công vì đã đạt KPI', 35), option('TOTAL_FAILURE', 'Xem dự án thất bại hoàn toàn', 30), option('ANALYZE_BOTH', 'Phân tích cả KPI và phản hồi để hiểu trade-off', 100), option('NEXT_EXPERIMENT', 'Đề xuất thử nghiệm tiếp theo để kiểm tra nguyên nhân', 95)])]),
  HANDS_ON_ENGINEERING: bank('HANDS_ON_ENGINEERING', [question('HANDS_ON-L01', 'HANDS_ON_ENGINEERING', 'LOW_EXPOSURE', 'Nếu được thử một hoạt động thực hành, bạn muốn…', [option('ASSEMBLE', 'Lắp ráp một mô hình', 90), option('REPAIR', 'Sửa một thiết bị đơn giản', 90), option('CRAFT', 'Làm sản phẩm thủ công', 80), option('OBSERVE', 'Quan sát người có kinh nghiệm thao tác', 45)])], [
    question('HANDS_ON-R01', 'HANDS_ON_ENGINEERING', 'REALITY_CHECK', 'Thiết bị không hoạt động sau khi lắp. Bạn thường…', [option('CHANGE_MANY', 'Thay đổi nhiều chỗ cùng lúc để xem có chạy không', 35), option('CHECK_SEQUENCE', 'Kiểm tra nguồn, kết nối và từng bộ phận theo thứ tự', 100), option('REBUILD', 'Tháo ra và làm lại toàn bộ ngay', 60), option('ASK_HELP', 'Nhờ người có kinh nghiệm kiểm tra cùng', 80)]),
    question('HANDS_ON-R02', 'HANDS_ON_ENGINEERING', 'REALITY_CHECK', 'Khi thao tác có nguy cơ làm hỏng thiết bị hoặc gây mất an toàn, bạn thường…', [option('TRY_CAREFULLY', 'Thử cẩn thận dựa trên kinh nghiệm cá nhân', 35), option('READ_SAFETY', 'Đọc hướng dẫn và kiểm tra điều kiện an toàn trước', 100), option('OBSERVE_FIRST', 'Quan sát người khác thực hiện trước', 85), option('AVOID_ALL', 'Tránh hoàn toàn việc có rủi ro', 45)]),
    question('HANDS_ON-R03', 'HANDS_ON_ENGINEERING', 'REALITY_CHECK', 'Một chi tiết cần được đo và chỉnh nhiều lần mới đạt yêu cầu. Bạn cảm thấy…', [option('IMPATIENT', 'Nhanh mất kiên nhẫn', 25), option('REPEAT_REQUIRED', 'Chấp nhận làm lại nếu bắt buộc', 60), option('VALUE_PRECISION', 'Thấy hợp lý vì độ chính xác ảnh hưởng sản phẩm', 90), option('ENJOY_TUNING', 'Thích quá trình tinh chỉnh cho tới khi hoạt động tốt', 100)]),
  ], [question('HANDS_ON-D01', 'HANDS_ON_ENGINEERING', 'DEEP_DIVE', 'Sau khi hoàn thành sản phẩm, bước nào gần với bạn nhất?', [option('WORKS_ENOUGH', 'Xem sản phẩm hoạt động là đủ', 50), option('TEST_DOCUMENT', 'Thử trong nhiều điều kiện và ghi lại lỗi', 100), option('DECORATE_FIRST', 'Trang trí sản phẩm trước khi kiểm thử', 55), option('USER_TEST', 'Nhờ người khác sử dụng để tìm vấn đề mình bỏ sót', 90)])]),
}

export const DOMAIN_BY_CODE = Object.fromEntries(
  EXPERIENCE_DOMAINS.map((domain) => [domain.code, domain]),
)
