import { MBTI_QUESTIONS, RIASEC_QUESTIONS } from './assessment.data'
import { AssessmentInput, MbtiPole, RiasecCode } from './assessment.types'

function riasecAnswers(high: RiasecCode[], medium: RiasecCode[] = []): Record<string, number> {
  return Object.fromEntries(RIASEC_QUESTIONS.map((question, index) => [
    question.id,
    high.includes(question.domain) ? (index % 2 ? 5 : 4) : medium.includes(question.domain) ? 3 : (index % 3 ? 2 : 1),
  ]))
}

function mbtiAnswers(type: string): Record<string, MbtiPole> {
  return Object.fromEntries(MBTI_QUESTIONS.map((question) => {
    const selected = question.options.find(({ value }) => type.includes(value)) ?? question.options[0]
    return [question.id, selected.value]
  }))
}

const detailed = (domainId: string, strong = true) => ({
  domainId,
  recency: 'LAST_3_MONTHS' as const,
  frequency: strong ? 'WEEKLY_PLUS' as const : 'SOMETIMES' as const,
  motivation: 'VOLUNTARY' as const,
  role: strong ? 'LEAD' as const : 'MEMBER' as const,
  outcome: strong ? 'EXPERT_FEEDBACK' as const : 'PRODUCT' as const,
  artifact: `Mô tả dự án ${domainId} của persona demo`,
  realityAnswers: strong ? { [`${domainId}-rc1`]: true, [`${domainId}-rc2`]: true } : undefined,
})

export const DEMO_PERSONAS: Array<{ id: string; name: string; description: string; input: AssessmentInput }> = [
  {
    id: 'duy-tech', name: 'Nguyễn Tiến Duy', description: 'Hồ sơ thiên công nghệ, nghiên cứu và dự án lập trình.',
    input: {
      userId: 'demo-duy', paidAttempt: false,
      riasecAnswers: riasecAnswers(['I', 'R'], ['C']), mbtiAnswers: mbtiAnswers('INTJ'),
      experience: { domains: [detailed('technology'), detailed('research', false)] },
      profile: { admissionYear: '2027', regions: ['TP.HCM & lân cận'], tuitionRange: '25-45', strengths: ['Toán', 'Tin học', 'Tiếng Anh'], gpa: 8.8, priorities: ['logic', 'autonomy', 'research'] },
    },
  },
  {
    id: 'linh-creative', name: 'Trần Gia Linh', description: 'Hồ sơ thiên sáng tạo, thiết kế và trải nghiệm người dùng.',
    input: {
      userId: 'demo-linh', paidAttempt: false,
      riasecAnswers: riasecAnswers(['A'], ['I', 'S']), mbtiAnswers: mbtiAnswers('INFP'),
      experience: { domains: [detailed('design'), detailed('technology', false)] },
      profile: { admissionYear: '2027', regions: ['TP.HCM & lân cận'], tuitionRange: '25-45', strengths: ['Ngữ văn', 'Tin học'], gpa: 8.4, priorities: ['creative', 'human-centered'] },
    },
  },
  {
    id: 'mai-social', name: 'Lê Thanh Mai', description: 'Hồ sơ thiên hỗ trợ, giáo dục và làm việc với con người.',
    input: {
      userId: 'demo-mai', paidAttempt: false,
      riasecAnswers: riasecAnswers(['S'], ['E', 'I']), mbtiAnswers: mbtiAnswers('ESFJ'),
      experience: { domains: [detailed('support'), detailed('leadership', false)] },
      profile: { admissionYear: '2027', regions: ['TP.HCM & lân cận'], tuitionRange: '25-45', strengths: ['Ngữ văn', 'Tiếng Anh', 'Sinh học'], gpa: 8.6, priorities: ['human-centered', 'structure'] },
    },
  },
  {
    id: 'nam-low-exposure', name: 'Phạm Hoàng Nam', description: 'Hồ sơ ít cơ hội trải nghiệm, dùng để kiểm tra độ tin cậy thấp.',
    input: {
      userId: 'demo-nam', paidAttempt: false,
      riasecAnswers: riasecAnswers(['C'], ['R', 'I']), mbtiAnswers: mbtiAnswers('ISTJ'),
      experience: { noExperience: true, domains: [] },
      profile: { admissionYear: '2027', regions: [], strengths: ['Toán'], priorities: [] },
    },
  },
]
