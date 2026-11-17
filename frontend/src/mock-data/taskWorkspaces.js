export const SCORE_DEBUG_WORKSPACE_KEY = 'score-program-debugging'
export const DEADLINE_APP_WORKSPACE_KEY = 'deadline-app-design'
export const SIGNUP_TEST_WORKSPACE_KEY = 'signup-test-design'

export const DEADLINE_APP_CHALLENGE = {
  ticket: 'SE-01',
  scenario: 'Bài tập và deadline đang nằm rải rác trong nhóm chat, email và nhiều nền tảng học tập khiến học sinh dễ quên việc.',
  features: [
    ['quick-create', 'Tạo deadline nhanh'],
    ['reminders', 'Nhắc hạn thông minh'],
    ['subject-tags', 'Phân loại theo môn'],
    ['team-sharing', 'Chia sẻ với nhóm học'],
    ['calendar-sync', 'Đồng bộ lịch'],
    ['progress-chart', 'Biểu đồ tiến độ'],
  ],
  demoAnswer: {
    problem: 'Học sinh phải tự tổng hợp deadline từ nhiều nguồn nên dễ bỏ sót, nhập trùng hoặc không biết việc nào cần ưu tiên trước.',
    features: ['quick-create', 'reminders', 'subject-tags'],
    flow: 'Mở ứng dụng → chọn Tạo deadline → nhập tên bài và hạn nộp → chọn môn học → bật nhắc hạn → lưu và thấy deadline trên danh sách ưu tiên.',
    firstFeature: 'quick-create',
    justification: 'Nên làm tính năng tạo deadline nhanh trước vì nếu nhập liệu quá nhiều bước, học sinh có thể bỏ ứng dụng ngay từ lần dùng đầu tiên.',
    weakness: 'Giải pháp vẫn phụ thuộc vào việc người dùng tự nhập đúng hạn nộp và có thể tạo quá nhiều thông báo gây mất tập trung.',
  },
}

export const SIGNUP_TEST_CHALLENGE = {
  ticket: 'SE-03',
  scenario: 'Nhóm phát triển chuẩn bị phát hành chức năng đăng ký tài khoản và cần một bộ test case kiểm tra yêu cầu lẫn trường hợp biên.',
  requirements: [
    'Email là bắt buộc.',
    'Mật khẩu có ít nhất 8 ký tự.',
    'Mật khẩu chứa ít nhất một chữ số.',
    'Tuổi phải từ 13 trở lên.',
    'Email đã tồn tại phải bị từ chối.',
  ],
  demoRows: [
    ['Bỏ trống email', 'Từ chối và báo email bắt buộc', 'Kiểm tra trường bắt buộc', 'Ngoại lệ'],
    ['Mật khẩu 7 ký tự', 'Từ chối mật khẩu', 'Nhỏ hơn độ dài tối thiểu', 'Biên dưới'],
    ['Mật khẩu không có số', 'Từ chối mật khẩu', 'Thiếu điều kiện chữ số', 'Ngoại lệ'],
    ['Tuổi 12', 'Từ chối đăng ký', 'Ngay dưới tuổi tối thiểu', 'Biên dưới'],
    ['Tuổi 13', 'Cho phép nếu dữ liệu khác hợp lệ', 'Đúng tại ngưỡng tối thiểu', 'Giá trị biên'],
    ['Email đã tồn tại', 'Từ chối và báo trùng email', 'Bảo đảm tính duy nhất', 'Ngoại lệ'],
    ['Tuổi âm', 'Từ chối dữ liệu', 'Giá trị không hợp lệ', 'Ngoại lệ'],
    ['Tuổi không phải số', 'Từ chối dữ liệu', 'Sai kiểu dữ liệu', 'Ngoại lệ'],
    ['Email có khoảng trắng', 'Chuẩn hóa hoặc báo lỗi rõ ràng', 'Kiểm tra dữ liệu bẩn', 'Ngoại lệ'],
    ['Mật khẩu đúng 8 ký tự và có số', 'Chấp nhận', 'Đúng tại ngưỡng độ dài', 'Giá trị biên'],
    ['Email khác chữ hoa/thường', 'Nhận diện trùng sau chuẩn hóa', 'Kiểm tra quy tắc so sánh email', 'Ngoại lệ'],
  ].map(([scenario, expected, reason, type]) => ({ scenario, expected, reason, type })),
}

export const SCORE_DEBUG_CHALLENGE = {
  ticket: 'SE-02',
  title: 'Tìm lỗi trong chương trình tính điểm',
  scenario: 'Một chương trình Python đang tính sai điểm trung bình của học sinh và có thể đưa ra xếp loại không chính xác.',
  starterCode: `math = 8
english = 7
informatics = 9

average = math + english + informatics / 3

if average >= 8:
    print("Excellent")
else:
    print("Keep going")`,
  demoAnswer: {
    source: `math = 8
english = 7
informatics = 9

average = (math + english + informatics) / 3

if average >= 8:
    print("Excellent")
else:
    print("Keep going")`,
    explanation: 'Phép chia được thực hiện trước phép cộng nên chương trình cũ chỉ chia điểm Informatics cho 3. Cần đặt tổng ba môn trong ngoặc rồi mới chia cho 3.',
    testCase: { math: 6, english: 9, informatics: 9 },
    missingHandling: 'Kiểm tra cả ba điểm trước khi tính. Nếu một điểm là null hoặc chưa nhập thì thông báo môn còn thiếu và chưa tính trung bình, không tự quy đổi thành 0.',
  },
}

export function createScoreDebugDraft(savedDraft = '') {
  if (savedDraft) {
    try {
      const parsed = JSON.parse(savedDraft)
      if (parsed?.source) return { ...SCORE_DEBUG_CHALLENGE.demoAnswer, ...parsed }
    } catch {
      const legacySource = /(?:average|math|english|informatics)\s*=/.test(savedDraft)
        ? savedDraft
        : SCORE_DEBUG_CHALLENGE.starterCode
      return { ...SCORE_DEBUG_CHALLENGE.demoAnswer, source: legacySource, explanation: '', missingHandling: '' }
    }
  }

  return {
    source: SCORE_DEBUG_CHALLENGE.starterCode,
    explanation: '',
    testCase: { math: 8, english: 7, informatics: 9 },
    missingHandling: '',
  }
}

export function evaluateScoreDebugDraft(answer) {
  const compactSource = answer.source.replace(/\s+/g, '')
  const formulaCorrect = /average=\(math\+english\+informatics\)\/3/.test(compactSource)
  const keepsClassification = /ifaverage>=8:/.test(compactSource)
  const explanation = answer.explanation.toLocaleLowerCase('vi')
  const explainsPrecedence = answer.explanation.trim().length >= 35
    && /(thứ tự|ưu tiên|chia.*trước|ngoặc|precedence)/i.test(explanation)
  const scores = ['math', 'english', 'informatics'].map((key) => Number(answer.testCase[key]))
  const validTestCase = scores.every((score) => Number.isFinite(score) && score >= 0 && score <= 10)
  const customAverage = validTestCase ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null
  const missingText = answer.missingHandling.toLocaleLowerCase('vi')
  const handlesMissing = answer.missingHandling.trim().length >= 35
    && /(thiếu|null|none|chưa nhập|kiểm tra|validate)/i.test(missingText)

  return {
    formulaCorrect,
    keepsClassification,
    explainsPrecedence,
    validTestCase,
    handlesMissing,
    customAverage,
    customLabel: customAverage == null ? null : customAverage >= 8 ? 'Excellent' : 'Keep going',
    passed: formulaCorrect && keepsClassification && explainsPrecedence && validTestCase && handlesMissing,
  }
}

export function summarizeScoreDebugSubmission(answer, evaluation) {
  const test = answer.testCase
  return `Mã Python đã sửa:\n${answer.source}\n\nTest case: Math ${test.math}, English ${test.english}, Informatics ${test.informatics} → Trung bình ${evaluation.customAverage?.toFixed(2)} → ${evaluation.customLabel}.\n\nXử lý dữ liệu thiếu: ${answer.missingHandling}`
}

export function createDeadlineAppDraft(savedDraft = '') {
  if (savedDraft) {
    try {
      const parsed = JSON.parse(savedDraft)
      if (parsed?.features) return { ...DEADLINE_APP_CHALLENGE.demoAnswer, ...parsed }
    } catch { /* legacy draft */ }
  }
  return { problem: '', features: [], flow: '', firstFeature: '', justification: '', weakness: '' }
}

export function evaluateDeadlineAppDraft(answer) {
  const selectedThree = answer.features.length === 3
  return {
    understandsProblem: answer.problem.trim().length >= 45,
    selectedThree,
    logicalFlow: answer.flow.trim().length >= 60 && /(tạo|nhập|lưu|deadline)/i.test(answer.flow),
    prioritizesFeature: Boolean(answer.firstFeature) && answer.features.includes(answer.firstFeature) && answer.justification.trim().length >= 45,
    recognizesTradeoff: answer.weakness.trim().length >= 35,
    passed: answer.problem.trim().length >= 45
      && selectedThree
      && answer.flow.trim().length >= 60
      && Boolean(answer.firstFeature)
      && answer.features.includes(answer.firstFeature)
      && answer.justification.trim().length >= 45
      && answer.weakness.trim().length >= 35,
  }
}

export function createSignupTestDraft(savedDraft = '') {
  if (savedDraft) {
    try {
      const parsed = JSON.parse(savedDraft)
      if (Array.isArray(parsed?.rows)) return parsed
    } catch { /* legacy draft */ }
  }
  return { rows: Array.from({ length: 6 }, () => ({ scenario: '', expected: '', reason: '', type: '' })) }
}

export function evaluateSignupTestDraft(answer) {
  const completedRows = answer.rows.filter((row) => Object.values(row).every((value) => String(value).trim()))
  const text = completedRows.map((row) => `${row.scenario} ${row.expected} ${row.reason} ${row.type}`).join(' ').toLocaleLowerCase('vi')
  const coversRequirements = ['email', 'mật khẩu', 'tuổi', 'trùng'].every((keyword) => text.includes(keyword))
  const coversBoundaries = /(12|13|8 ký tự|biên)/i.test(text)
  const explainsCases = completedRows.filter((row) => row.reason.trim().length >= 12).length >= 6
  return {
    enoughCases: completedRows.length >= 6,
    coversRequirements,
    coversBoundaries,
    explainsCases,
    completedCount: completedRows.length,
    passed: completedRows.length >= 6 && coversRequirements && coversBoundaries && explainsCases,
  }
}

export function buildStructuredTaskEvidence(workspaceKey, savedDraft) {
  if (workspaceKey === SCORE_DEBUG_WORKSPACE_KEY) {
    const answer = createScoreDebugDraft(savedDraft)
    return { text: summarizeScoreDebugSubmission(answer, evaluateScoreDebugDraft(answer)), explanation: answer.explanation }
  }
  if (workspaceKey === DEADLINE_APP_WORKSPACE_KEY) {
    const answer = createDeadlineAppDraft(savedDraft)
    const featureNames = answer.features.map((id) => DEADLINE_APP_CHALLENGE.features.find(([featureId]) => featureId === id)?.[1]).filter(Boolean)
    return {
      text: `Vấn đề người dùng: ${answer.problem}\n\nBa tính năng ưu tiên: ${featureNames.join(', ')}.\n\nLuồng tạo deadline: ${answer.flow}\n\nĐiểm yếu: ${answer.weakness}`,
      explanation: `Tính năng làm trước: ${DEADLINE_APP_CHALLENGE.features.find(([id]) => id === answer.firstFeature)?.[1] ?? answer.firstFeature}. ${answer.justification}`,
    }
  }
  if (workspaceKey === SIGNUP_TEST_WORKSPACE_KEY) {
    const answer = createSignupTestDraft(savedDraft)
    const rows = answer.rows.filter((row) => Object.values(row).some((value) => String(value).trim()))
    return {
      text: rows.map((row, index) => `${index + 1}. ${row.scenario} → ${row.expected} | ${row.type}`).join('\n'),
      explanation: `Đã thiết kế ${rows.length} test case, gồm yêu cầu chính, trường hợp ngoại lệ và giá trị biên. Mỗi case có lý do để đối chiếu với đặc tả đăng ký.`,
    }
  }
  return null
}
