import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ADAPTIVE_DOMAIN_QUESTION_BANKS,
  DOMAIN_CODES,
} from '../data/adaptive-domain-questions.js'
import {
  calculateBaseEvidence,
  createDomainAssessmentState,
  finalizeDomainState,
  findNextIncompleteDomain,
  getAdaptiveQuestions,
  getStableQuestionOptions,
  normalizeExperience,
  selectAdaptiveBranch,
} from './experienceAssessment.js'

const completeBase = {
  recency: 'LAST_3_MONTHS',
  frequency: 'MONTHLY',
  voluntaryLevel: 'VOLUNTARY',
  role: 'CORE_MEMBER',
  outcome: 'EXPERT_FEEDBACK',
}

test('có đúng tám domain và mỗi domain có question bank 1 + 3 + 1', () => {
  assert.equal(DOMAIN_CODES.length, 8)
  for (const domain of DOMAIN_CODES) {
    const bank = ADAPTIVE_DOMAIN_QUESTION_BANKS[domain]
    assert.ok(bank)
    assert.equal(bank.lowExposureQuestions.length, 1)
    assert.equal(bank.realityCheckQuestions.length, 3)
    assert.equal(bank.deepDiveQuestions.length, 1)
  }
})

test('question ID không trùng và mọi câu thuộc đúng domain', () => {
  const questions = Object.entries(ADAPTIVE_DOMAIN_QUESTION_BANKS).flatMap(([domain, bank]) =>
    [...bank.lowExposureQuestions, ...bank.realityCheckQuestions, ...bank.deepDiveQuestions].map((question) => {
      assert.equal(question.domain, domain)
      return question
    }),
  )
  assert.equal(new Set(questions.map(({ id }) => id)).size, questions.length)
})

test('Technology, Visual Design và Music trả đúng prefix', () => {
  assert.ok(getAdaptiveQuestions('TECHNOLOGY', 'DEEP_DIVE').every(({ id }) => id.startsWith('TECH-')))
  assert.ok(getAdaptiveQuestions('VISUAL_DESIGN', 'DEEP_DIVE').every(({ id }) => id.startsWith('DESIGN-')))
  assert.ok(getAdaptiveQuestions('MUSIC_PERFORMANCE', 'DEEP_DIVE').every(({ id }) => id.startsWith('PERFORMANCE-')))
})

test('các nhánh tuân thủ ngưỡng 50 và 75', () => {
  assert.equal(selectAdaptiveBranch(49.99), 'LOW_EXPOSURE')
  assert.equal(selectAdaptiveBranch(50), 'REALITY_CHECK')
  assert.equal(selectAdaptiveBranch(74.99), 'REALITY_CHECK')
  assert.equal(selectAdaptiveBranch(75), 'DEEP_DIVE')
})

test('mỗi nhánh trả đúng số câu', () => {
  assert.equal(getAdaptiveQuestions('TECHNOLOGY', 'LOW_EXPOSURE').length, 2)
  assert.equal(getAdaptiveQuestions('TECHNOLOGY', 'REALITY_CHECK').length, 3)
  assert.equal(getAdaptiveQuestions('TECHNOLOGY', 'DEEP_DIVE').length, 4)
})

test('state của nhiều domain không ghi đè nhau', () => {
  const states = {
    TECHNOLOGY: { ...createDomainAssessmentState('TECHNOLOGY'), baseAnswers: { recency: 'LAST_YEAR' } },
    VISUAL_DESIGN: { ...createDomainAssessmentState('VISUAL_DESIGN'), baseAnswers: { recency: 'LAST_3_MONTHS' } },
  }
  const changed = {
    ...states,
    TECHNOLOGY: { ...states.TECHNOLOGY, baseAnswers: { ...states.TECHNOLOGY.baseAnswers, frequency: 'MONTHLY' } },
  }
  assert.equal(changed.VISUAL_DESIGN.baseAnswers.recency, 'LAST_3_MONTHS')
  assert.equal(changed.VISUAL_DESIGN.baseAnswers.frequency, undefined)
})

test('hoàn thành domain tự tìm domain tiếp theo chưa hoàn thành', () => {
  const states = {
    TECHNOLOGY: { ...createDomainAssessmentState('TECHNOLOGY'), status: 'COMPLETED' },
    RESEARCH_DATA: createDomainAssessmentState('RESEARCH_DATA'),
  }
  assert.equal(findNextIncompleteDomain(['TECHNOLOGY', 'RESEARCH_DATA'], states, 'TECHNOLOGY'), 'RESEARCH_DATA')
})

test('artifact chỉ tạo trạng thái provided-unverified', () => {
  const state = {
    ...createDomainAssessmentState('TECHNOLOGY'),
    baseAnswers: completeBase,
    baseEvidenceScore: calculateBaseEvidence(completeBase),
    adaptiveBranch: 'DEEP_DIVE',
    artifactUrl: 'https://example.test/work',
    adaptiveAnswers: getAdaptiveQuestions('TECHNOLOGY', 'DEEP_DIVE').map((question) => ({ questionId: question.id, optionId: question.options[0].id })),
  }
  assert.equal(finalizeDomainState(state).verificationStatus, 'ARTIFACT_PROVIDED_UNVERIFIED')
})

test('nội dung không tạo claim về năng lực chuyên môn', () => {
  const text = JSON.stringify(ADAPTIVE_DOMAIN_QUESTION_BANKS).toLowerCase()
  for (const claim of ['bạn có năng lực cao', 'bạn có tố chất chuyên môn', 'bạn chắc chắn phù hợp']) {
    assert.equal(text.includes(claim), false)
  }
})

test('cùng input luôn cho cùng score và thứ tự option ổn định', () => {
  assert.equal(calculateBaseEvidence(completeBase), calculateBaseEvidence(structuredClone(completeBase)))
  const question = ADAPTIVE_DOMAIN_QUESTION_BANKS.TECHNOLOGY.realityCheckQuestions[0]
  assert.deepEqual(getStableQuestionOptions(question, 'attempt-1'), getStableQuestionOptions(question, 'attempt-1'))
})

test('refresh khôi phục đúng active domain và state đã lưu', () => {
  const stored = {
    selectedDomains: ['TECHNOLOGY', 'VISUAL_DESIGN'],
    activeDomain: 'VISUAL_DESIGN',
    domainStates: {
      TECHNOLOGY: { ...createDomainAssessmentState('TECHNOLOGY'), status: 'COMPLETED' },
      VISUAL_DESIGN: { ...createDomainAssessmentState('VISUAL_DESIGN'), status: 'ADAPTIVE_IN_PROGRESS', baseAnswers: completeBase },
    },
  }
  const restored = normalizeExperience(JSON.parse(JSON.stringify(stored)))
  assert.equal(restored.activeDomain, 'VISUAL_DESIGN')
  assert.equal(restored.domainStates.TECHNOLOGY.status, 'COMPLETED')
  assert.deepEqual(restored.domainStates.VISUAL_DESIGN.baseAnswers, completeBase)
})

test('refresh tự hoàn tất domain đã trả lời đủ nhưng từng bị kẹt', () => {
  const questions = getAdaptiveQuestions('TECHNOLOGY', 'DEEP_DIVE')
  const restored = normalizeExperience({
    selectedDomains: ['TECHNOLOGY'],
    activeDomain: 'TECHNOLOGY',
    domainStates: {
      TECHNOLOGY: {
        ...createDomainAssessmentState('TECHNOLOGY'),
        status: 'ADAPTIVE_IN_PROGRESS',
        baseAnswers: completeBase,
        baseEvidenceScore: calculateBaseEvidence(completeBase),
        adaptiveBranch: 'DEEP_DIVE',
        adaptiveAnswers: questions.map((question) => ({ questionId: question.id, optionId: question.options[0].id })),
      },
    },
  })
  assert.equal(restored.domainStates.TECHNOLOGY.status, 'COMPLETED')
  assert.equal(typeof restored.domainStates.TECHNOLOGY.finalEvidenceScore, 'number')
})
