import { BadRequestException } from '@nestjs/common'
import { AssessmentService } from './assessment.service'
import { DEMO_PERSONAS } from './demo-personas'
import { EXPERIENCE_DOMAINS, MAJOR_PROFILES, MBTI_QUESTIONS, RIASEC_QUESTIONS } from './assessment.data'
import { calculateBaseEvidence, evaluateAssessment, needsRealityCheck, scoreExperience, scoreMbti, scoreRiasec, selectAdaptiveBranch } from './scoring'
import { AssessmentInput, MbtiPole } from './assessment.types'
import { ADAPTIVE_QUESTION_BANKS } from './adaptive-domain-questions'

const clone = <T>(value: T): T => structuredClone(value)

function validInput(): AssessmentInput {
  return {
    userId: 'test-user',
    paidAttempt: false,
    riasecAnswers: Object.fromEntries(RIASEC_QUESTIONS.map(({ id }) => [id, 3])),
    mbtiAnswers: Object.fromEntries(MBTI_QUESTIONS.map(({ id, options }) => [id, options[0].value])) as Record<string, MbtiPole>,
    experience: { noExperience: true, domains: [] },
    profile: { admissionYear: '2027', regions: ['TP.HCM & lân cận'], tuitionRange: '25-45', strengths: ['Toán'], gpa: 8, priorities: ['logic'] },
  }
}

describe('Direction Snapshot model', () => {
  it('01 has exactly 30 RIASEC questions', () => expect(RIASEC_QUESTIONS).toHaveLength(30))
  it('02 has exactly five RIASEC questions per domain', () => {
    for (const code of ['R', 'I', 'A', 'S', 'E', 'C']) expect(RIASEC_QUESTIONS.filter(({ domain }) => domain === code)).toHaveLength(5)
  })
  it('03 exposes an example for every RIASEC question', () => expect(RIASEC_QUESTIONS.every(({ example }) => example.length > 10)).toBe(true))
  it('04 has exactly 60 MBTI-style questions', () => expect(MBTI_QUESTIONS).toHaveLength(60))
  it('05 has exactly 15 questions per MBTI axis', () => {
    for (const axis of ['EI', 'SN', 'TF', 'JP']) expect(MBTI_QUESTIONS.filter(({ dimension }) => dimension === axis)).toHaveLength(15)
  })
  it('06 gives every MBTI-style question two alternatives', () => expect(MBTI_QUESTIONS.every(({ options }) => options.length === 2)).toBe(true))
  it('07 has eight experience domains', () => expect(EXPERIENCE_DOMAINS).toHaveLength(8))
  it('08 has a distinct 1 + 3 + 1 adaptive bank per domain', () => expect(EXPERIENCE_DOMAINS.every(({ adaptiveQuestionBank }) => adaptiveQuestionBank.lowExposureQuestions.length === 1 && adaptiveQuestionBank.realityCheckQuestions.length === 3 && adaptiveQuestionBank.deepDiveQuestions.length === 1)).toBe(true))
  it('08b has globally unique adaptive question IDs', () => {
    const ids = Object.values(ADAPTIVE_QUESTION_BANKS).flatMap((bank) => [...bank.lowExposureQuestions, ...bank.realityCheckQuestions, ...bank.deepDiveQuestions]).map(({ id }) => id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('08c returns only the requested domain question prefix', () => {
    expect(new AssessmentService().experienceDomain('TECHNOLOGY').adaptiveQuestionBank.realityCheckQuestions.every(({ id }) => id.startsWith('TECH-'))).toBe(true)
    expect(new AssessmentService().experienceDomain('VISUAL_DESIGN').adaptiveQuestionBank.realityCheckQuestions.every(({ id }) => id.startsWith('DESIGN-'))).toBe(true)
    expect(new AssessmentService().experienceDomain('MUSIC_PERFORMANCE').adaptiveQuestionBank.realityCheckQuestions.every(({ id }) => id.startsWith('PERFORMANCE-'))).toBe(true)
  })
  it('09 has at least twelve MajorProfiles', () => expect(MAJOR_PROFILES.length).toBeGreaterThanOrEqual(12))
})

describe('RIASEC scoring', () => {
  it('10 normalizes all answers of 1 to zero', () => {
    const answers = Object.fromEntries(RIASEC_QUESTIONS.map(({ id }) => [id, 1]))
    expect(Object.values(scoreRiasec(answers).scores).every((score) => score === 0)).toBe(true)
  })
  it('11 normalizes all answers of 5 to one hundred', () => {
    const answers = Object.fromEntries(RIASEC_QUESTIONS.map(({ id }) => [id, 5]))
    expect(Object.values(scoreRiasec(answers).scores).every((score) => score === 100)).toBe(true)
  })
  it('12 applies ((average - 1) / 4) * 100', () => {
    const answers = Object.fromEntries(RIASEC_QUESTIONS.map(({ id }) => [id, 3]))
    expect(scoreRiasec(answers).scores.R).toBe(50)
  })
  it('13 emits CLOSE_RANGE when the top-two gap is under five', () => {
    const answers = Object.fromEntries(RIASEC_QUESTIONS.map(({ id }) => [id, 3]))
    expect(scoreRiasec(answers).flags).toContain('RIASEC_CLOSE_RANGE')
  })
})

describe('MBTI-style scoring', () => {
  it('14 calculates percentages from 15 answers per axis', () => {
    const answers = validInput().mbtiAnswers
    const result = scoreMbti(answers)
    expect((result.axes.EI as { percentages: { E: number } }).percentages.E).toBe(100)
  })
  it('15 labels clarity of 40 or more CLEAR', () => {
    const result = scoreMbti(validInput().mbtiAnswers)
    expect((result.axes.EI as { clarityLabel: string }).clarityLabel).toBe('CLEAR')
  })
  it('16 labels a near-even axis BORDERLINE', () => {
    const input = validInput()
    MBTI_QUESTIONS.filter(({ dimension }) => dimension === 'EI').slice(0, 7).forEach(({ id }) => { input.mbtiAnswers[id] = 'I' })
    expect((scoreMbti(input.mbtiAnswers).axes.EI as { clarityLabel: string }).clarityLabel).toBe('BORDERLINE')
  })
})

describe('experience scoring', () => {
  const base = {
    domainId: 'technology', recency: 'LAST_3_MONTHS', frequency: 'SOMETIMES', motivation: 'VOLUNTARY', role: 'MEMBER', outcome: 'PRODUCT',
  } as const

  it('17 follows the configured base-evidence formula', () => expect(scoreExperience(base).baseScore).toBe(70))
  it('18 does not trigger reality check for a moderate claim', () => expect(needsRealityCheck(base)).toBe(false))
  it('19 triggers reality check only at all three thresholds', () => expect(needsRealityCheck({ ...base, frequency: 'MONTHLY', role: 'CORE', outcome: 'EXPERT_FEEDBACK' })).toBe(true))
  it('20 applies Final = 0.85 base + 0.15 reality', () => {
    const answer = { ...base, frequency: 'MONTHLY' as const, role: 'CORE' as const, outcome: 'EXPERT_FEEDBACK' as const, realityAnswers: { 'technology-rc1': true, 'technology-rc2': true } }
    const result = scoreExperience(answer)
    expect(result.evidenceStrength).toBe(Math.round((result.baseScore * 0.85 + 15) * 10) / 10)
  })
  it('21 always marks user-provided artifacts unverified', () => expect(scoreExperience({ ...base, artifact: 'https://example.test' }).artifact?.status).toBe('ARTIFACT_PROVIDED_UNVERIFIED'))
  it('21b selects adaptive branches at the exact thresholds', () => {
    expect(selectAdaptiveBranch(49.99)).toBe('LOW_EXPOSURE')
    expect(selectAdaptiveBranch(50)).toBe('REALITY_CHECK')
    expect(selectAdaptiveBranch(74.99)).toBe('REALITY_CHECK')
    expect(selectAdaptiveBranch(75)).toBe('DEEP_DIVE')
  })
  it('21c returns a deterministic base score', () => expect(calculateBaseEvidence(base)).toBe(calculateBaseEvidence(clone(base))))
  it('21d gives official certificate evidence more academic weight than expected scores', () => {
    const official = validInput()
    const expected = validInput()
    official.profile!.certificates = [{ name: 'IELTS Academic', score: '6.5', status: 'OFFICIAL' }]
    expected.profile!.certificates = [{ name: 'IELTS Academic', score: '7.0', status: 'EXPECTED' }]
    expect(evaluateAssessment(official).majors[0].components.academic.score)
      .toBeGreaterThan(evaluateAssessment(expected).majors[0].components.academic.score as number)
  })
  it('21e gives official academic scores more weight than identical expected scores', () => {
    const official = validInput()
    const expected = validInput()
    Object.assign(official.profile!, { gpa: 8.5, gpaStatus: 'OFFICIAL', thptScore: 25, thptScoreStatus: 'OFFICIAL', dgnlScore: 900, dgnlScoreStatus: 'OFFICIAL' })
    Object.assign(expected.profile!, { gpa: 8.5, gpaStatus: 'EXPECTED', thptScore: 25, thptScoreStatus: 'EXPECTED', dgnlScore: 900, dgnlScoreStatus: 'EXPECTED' })
    expect(evaluateAssessment(official).majors[0].components.academic.score as number)
      .toBeGreaterThan(evaluateAssessment(expected).majors[0].components.academic.score as number)
  })
})

describe('report generation', () => {
  it('22 returns exactly six ranked majors', () => expect(evaluateAssessment(validInput()).majors).toHaveLength(6))
  it('23 keeps every fit score in the 0-100 range', () => expect(evaluateAssessment(validInput()).majors.every(({ fitScore }) => fitScore >= 0 && fitScore <= 100)).toBe(true))
  it('24 renormalizes available component weights to one', () => {
    const components = evaluateAssessment(validInput()).majors[0].components
    expect(Object.values(components).reduce((sum, item) => sum + item.effectiveWeight, 0)).toBeCloseTo(1, 1)
  })
  it('25 returns null and zero effective weight for a missing component', () => {
    const input = validInput(); input.experience = { noExperience: true, domains: [] }
    const evidence = evaluateAssessment(input).majors[0].components.evidence
    expect(evidence.score).toBeNull(); expect(evidence.effectiveWeight).toBe(0)
  })
  it('26 maps confidence labels using the published thresholds', () => {
    for (const major of evaluateAssessment(validInput()).majors) {
      expect(major.confidenceLabel).toBe(major.confidenceScore >= 75 ? 'HIGH' : major.confidenceScore >= 50 ? 'MEDIUM' : 'LOW')
    }
  })
  it('27 flags limited experience', () => expect(evaluateAssessment(validInput()).qualityFlags).toContain('LIMITED_EXPERIENCE'))
  it('28 is deterministic for ranking and scores', () => {
    const first = evaluateAssessment(validInput(), '2026-01-01T00:00:00.000Z')
    const second = evaluateAssessment(validInput(), '2026-01-01T00:00:00.000Z')
    expect(second).toEqual(first)
  })
  it('29 freezes inputSnapshot independently of later input mutations', () => {
    const input = validInput(); const report = evaluateAssessment(input); input.profile!.gpa = 1
    expect(report.inputSnapshot.profile?.gpa).toBe(8)
  })
  it('30 marks school data as DEMO', () => {
    const schools = evaluateAssessment(DEMO_PERSONAS[0].input).schoolMatch as Array<{ dataStatus: string }>
    expect(schools.every((school) => school.dataStatus === 'DEMO')).toBe(true)
  })
  it('31 ranks software engineering first for tech Duy', () => expect(evaluateAssessment(DEMO_PERSONAS[0].input).majors[0].majorId).toBe('software-engineering'))
  it('32 ranks UX/UI first for creative Linh', () => expect(evaluateAssessment(DEMO_PERSONAS[1].input).majors[0].majorId).toBe('ux-ui'))
  it('33 ranks a social major first for social Mai', () => expect(['psychology', 'education']).toContain(evaluateAssessment(DEMO_PERSONAS[2].input).majors[0].majorId))
  it('34 lowers certainty for low-exposure Nam', () => expect(evaluateAssessment(DEMO_PERSONAS[3].input).qualityFlags).toContain('LIMITED_EXPERIENCE'))
})

describe('service validation and attempt lifecycle', () => {
  it('35 rejects incomplete RIASEC answers', async () => {
    const input = validInput(); delete input.riasecAnswers.R01
    await expect(new AssessmentService().evaluate(input)).rejects.toBeInstanceOf(BadRequestException)
  })
  it('36 rejects an out-of-range RIASEC value', async () => {
    const input = validInput(); input.riasecAnswers.R01 = 6
    await expect(new AssessmentService().evaluate(input)).rejects.toBeInstanceOf(BadRequestException)
  })
  it('37 rejects incomplete reality checks for a strong claim', async () => {
    const input = validInput(); input.experience = { domains: [{ domainId: 'TECHNOLOGY', recency: 'LAST_3_MONTHS', frequency: 'MONTHLY', voluntaryLevel: 'VOLUNTARY', role: 'CORE_MEMBER', outcome: 'EXPERT_FEEDBACK', adaptiveAnswers: [{ questionId: 'TECH-R01', optionId: 'TRACE' }] }] }
    await expect(new AssessmentService().evaluate(input)).rejects.toBeInstanceOf(BadRequestException)
  })
  it('38 does not fail report creation when an optional AI narrative fails', async () => {
    const report = await new AssessmentService().evaluate(validInput(), async () => { throw new Error('AI offline') })
    expect((report.crossEvidence as { narrativeFallback: boolean }).narrativeFallback).toBe(true)
  })
  it('39 consumes a paid attempt only after successful report creation', async () => {
    const service = new AssessmentService(); const invalid = validInput(); invalid.paidAttempt = true; delete invalid.mbtiAnswers.EI01
    await expect(service.evaluate(invalid)).rejects.toBeInstanceOf(BadRequestException)
    const valid = validInput(); valid.paidAttempt = true
    await expect(service.evaluate(valid)).resolves.toMatchObject({ attempt: { consumed: true, remaining: 0 } })
  })
})
