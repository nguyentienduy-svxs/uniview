import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DEMO_PERSONAS } from './demo-personas'
import { EXPERIENCE_DOMAINS, MAJOR_PROFILES, MBTI_QUESTIONS, RIASEC_QUESTIONS } from './assessment.data'
import { calculateBaseEvidence, evaluateAssessment, getEvidenceLabel, selectAdaptiveBranch } from './scoring'
import { ADAPTIVE_QUESTION_BANKS, BASE_EVIDENCE_QUESTIONS, DOMAIN_METADATA, DomainCode, getAdaptiveQuestions } from './adaptive-domain-questions'
import { AssessmentInput, AssessmentReport, ExperienceAnswer } from './assessment.types'

type NarrativeGenerator = (report: AssessmentReport) => Promise<Record<string, unknown>>

@Injectable()
export class AssessmentService {
  private readonly reports = new Map<string, AssessmentReport>()
  private readonly remainingAttempts = new Map<string, number>()

  definition() {
    return {
      id: 'direction-snapshot-59k',
      title: 'Direction Snapshot 59K',
      assessmentVersion: '2026.1',
      scoringModelVersion: 'direction-snapshot-1.0.0',
      sequence: ['RIASEC', 'MBTI_STYLE', 'ADAPTIVE_EXPERIENCE', 'PRACTICAL_PROFILE'],
      counts: { riasec: 30, mbti: 60, experienceDomains: 8, adaptiveQuestionsPerDomain: 5 },
      disclaimers: [
        'Kết quả hỗ trợ khám phá và đối chiếu tín hiệu, không khẳng định một “ngành hoàn hảo”.',
        'Chỉ báo phong cách kiểu MBTI, không phải bài MBTI chính thức.',
        'Liên kết hoặc mô tả minh chứng do người dùng cung cấp luôn có trạng thái UNVERIFIED.',
      ],
    }
  }

  riasec() {
    return { scale: { min: 1, max: 5 }, questions: RIASEC_QUESTIONS.map(({ domain: _domain, ...publicQuestion }) => publicQuestion) }
  }

  mbti() {
    return { disclaimer: 'Chỉ báo phong cách kiểu MBTI, không phải bài MBTI chính thức.', questions: MBTI_QUESTIONS }
  }

  experienceDomains() {
    return EXPERIENCE_DOMAINS
  }

  experienceDomain(domainId: string) {
    const code = this.resolveDomain(domainId)
    const domain = EXPERIENCE_DOMAINS.find(({ domain: item }) => item === code)
    if (!domain) throw new NotFoundException({ code: 'EXPERIENCE_DOMAIN_NOT_FOUND', domainId })
    return domain
  }

  evaluateExperienceBase(domainId: string, body: { baseAnswers?: Record<string, string> }) {
    const domain = this.resolveDomain(domainId)
    const baseAnswers = body?.baseAnswers ?? {}
    this.validateBaseAnswers(baseAnswers)
    const answer = this.toExperienceAnswer(domain, baseAnswers)
    const baseEvidenceScore = calculateBaseEvidence(answer)
    const nextBranch = selectAdaptiveBranch(baseEvidenceScore)
    return {
      domain,
      baseEvidenceScore,
      evidenceLevel: getEvidenceLabel(baseEvidenceScore),
      nextBranch,
      nextQuestions: getAdaptiveQuestions(domain, nextBranch),
    }
  }

  evaluateExperienceAdaptive(domainId: string, body: { baseAnswers?: Record<string, string>; baseEvidenceScore?: number; adaptiveAnswers?: Array<{ questionId: string; optionId: string }>; artifactUrl?: string }) {
    const domain = this.resolveDomain(domainId)
    let baseEvidenceScore: number
    if (Number.isFinite(body?.baseEvidenceScore) && Number(body.baseEvidenceScore) >= 0 && Number(body.baseEvidenceScore) <= 100) {
      baseEvidenceScore = Number(body.baseEvidenceScore)
    } else {
      const baseAnswers = body?.baseAnswers ?? {}
      this.validateBaseAnswers(baseAnswers)
      baseEvidenceScore = calculateBaseEvidence(this.toExperienceAnswer(domain, baseAnswers))
    }
    const branch = selectAdaptiveBranch(baseEvidenceScore)
    const questions = getAdaptiveQuestions(domain, branch)
    const answers = body?.adaptiveAnswers ?? []
    const values = questions.map((question) => {
      const answer = answers.find(({ questionId }) => questionId === question.id)
      return question.options.find(({ id }) => id === answer?.optionId)?.realityAlignment
    })
    if (values.some((value) => value === undefined)) {
      throw new BadRequestException({ code: 'ADAPTIVE_ANSWERS_INCOMPLETE', expectedQuestionIds: questions.map(({ id }) => id) })
    }
    const realityAlignment = Math.round((values.reduce<number>((sum, value) => sum + (value ?? 0), 0) / values.length) * 100) / 100
    const finalEvidenceScore = Math.round((baseEvidenceScore * 0.85 + realityAlignment * 0.15) * 100) / 100
    return {
      domain,
      adaptiveBranch: branch,
      realityAlignment,
      finalEvidenceScore,
      evidenceLevel: branch === 'LOW_EXPOSURE' ? 'LOW' : getEvidenceLabel(finalEvidenceScore),
      verificationStatus: body?.artifactUrl?.trim() ? 'ARTIFACT_PROVIDED_UNVERIFIED' : 'SELF_REPORTED',
    }
  }

  demoPersonas() {
    return DEMO_PERSONAS.map(({ input: _input, ...persona }) => persona)
  }

  async evaluateDemo(personaId: string) {
    const persona = DEMO_PERSONAS.find(({ id }) => id === personaId)
    if (!persona) throw new NotFoundException({ code: 'DEMO_PERSONA_NOT_FOUND', personaId })
    return this.evaluate(persona.input)
  }

  async evaluate(input: AssessmentInput, narrativeGenerator?: NarrativeGenerator) {
    this.validate(input)
    const userId = input.userId ?? 'anonymous'
    const paid = input.paidAttempt === true
    const before = this.remainingAttempts.get(userId) ?? 1
    if (paid && before <= 0) throw new BadRequestException({ code: 'NO_PAID_ATTEMPTS', message: 'Không còn lượt Direction Snapshot đã thanh toán.' })

    // Nothing is persisted or consumed before all deterministic work succeeds.
    const report = evaluateAssessment(input)
    if (narrativeGenerator) {
      try {
        const narrative = await narrativeGenerator(structuredClone(report))
        report.crossEvidence = { ...(report.crossEvidence as object), optionalNarrative: narrative }
      } catch {
        report.crossEvidence = { ...(report.crossEvidence as object), narrativeFallback: true }
      }
    }

    if (paid) {
      this.remainingAttempts.set(userId, before - 1)
      report.attempt = { consumed: true, remaining: before - 1 }
    }
    this.reports.set(report.id, structuredClone(report))
    return report
  }

  getReport(id: string) {
    const report = this.reports.get(id)
    return report ? structuredClone(report) : null
  }

  private validate(input: AssessmentInput) {
    if (!input || typeof input !== 'object') throw new BadRequestException({ code: 'INVALID_PAYLOAD' })
    const errors: Array<{ field: string; message: string }> = []
    const riasecIds = new Set(RIASEC_QUESTIONS.map(({ id }) => id))
    const mbtiById = new Map(MBTI_QUESTIONS.map((question) => [question.id, question]))
    const riasecAnswers = input.riasecAnswers ?? {}
    const mbtiAnswers = input.mbtiAnswers ?? {}

    if (Object.keys(riasecAnswers).length !== 30) errors.push({ field: 'riasecAnswers', message: 'Cần trả lời đủ đúng 30 câu RIASEC.' })
    for (const [id, value] of Object.entries(riasecAnswers)) {
      if (!riasecIds.has(id) || !Number.isInteger(value) || value < 1 || value > 5) errors.push({ field: `riasecAnswers.${id}`, message: 'ID hoặc giá trị RIASEC không hợp lệ (1–5).' })
    }
    if (Object.keys(mbtiAnswers).length !== 60) errors.push({ field: 'mbtiAnswers', message: 'Cần trả lời đủ đúng 60 câu phong cách.' })
    for (const [id, value] of Object.entries(mbtiAnswers)) {
      const question = mbtiById.get(id)
      if (!question || !question.options.some((option) => option.value === value)) errors.push({ field: `mbtiAnswers.${id}`, message: 'ID hoặc lựa chọn phong cách không hợp lệ.' })
    }

    const domains = input.experience?.domains ?? []
    if (!input.experience || (!input.experience.noExperience && domains.length === 0)) errors.push({ field: 'experience', message: 'Chọn ít nhất một lĩnh vực hoặc xác nhận chưa có cơ hội trải nghiệm.' })
    const knownDomains = new Set(DOMAIN_METADATA.flatMap(({ domain, legacyId }) => [domain, legacyId]))
    if (new Set(domains.map(({ domainId }) => domainId)).size !== domains.length) errors.push({ field: 'experience.domains', message: 'Lĩnh vực trải nghiệm bị trùng.' })
    for (const domain of domains) {
      if (!knownDomains.has(domain.domainId)) errors.push({ field: `experience.${domain.domainId}`, message: 'Lĩnh vực không tồn tại.' })
      if (!['LAST_3_MONTHS', 'LAST_YEAR', 'OLDER_THAN_YEAR', 'OLDER'].includes(domain.recency)) errors.push({ field: `experience.${domain.domainId}.recency`, message: 'Giá trị không hợp lệ.' })
      if (!['TRIED_FEW_TIMES', 'OCCASIONAL', 'MONTHLY', 'WEEKLY_OR_MORE', 'FEW_TIMES', 'SOMETIMES', 'WEEKLY_PLUS'].includes(domain.frequency)) errors.push({ field: `experience.${domain.domainId}.frequency`, message: 'Giá trị không hợp lệ.' })
      if (!['VOLUNTARY', 'MIXED', 'REQUIRED'].includes(domain.voluntaryLevel ?? domain.motivation ?? '')) errors.push({ field: `experience.${domain.domainId}.voluntaryLevel`, message: 'Giá trị không hợp lệ.' })
      if (!['OBSERVED_SUPPORTED', 'CONTRIBUTOR', 'CORE_MEMBER', 'INITIATOR_LEAD', 'OBSERVER', 'MEMBER', 'CORE', 'LEAD'].includes(domain.role)) errors.push({ field: `experience.${domain.domainId}.role`, message: 'Giá trị không hợp lệ.' })
      if (!['NONE', 'PERSONAL_PRODUCT', 'EXPERT_FEEDBACK', 'PUBLIC_ACHIEVEMENT', 'PRODUCT', 'AWARD_PUBLIC'].includes(domain.outcome)) errors.push({ field: `experience.${domain.domainId}.outcome`, message: 'Giá trị không hợp lệ.' })
      if (DOMAIN_METADATA.some(({ domain: code }) => code === domain.domainId)) {
        const code = domain.domainId as DomainCode
        const branch = selectAdaptiveBranch(calculateBaseEvidence(domain))
        const expected = getAdaptiveQuestions(code, branch)
        if (!expected.every(({ id }) => domain.adaptiveAnswers?.some(({ questionId, optionId }) => questionId === id && ADAPTIVE_QUESTION_BANKS[code].lowExposureQuestions.concat(ADAPTIVE_QUESTION_BANKS[code].realityCheckQuestions, ADAPTIVE_QUESTION_BANKS[code].deepDiveQuestions).find(({ id: questionId }) => questionId === id)?.options.some(({ id: candidate }) => candidate === optionId)))) {
          errors.push({ field: `experience.${domain.domainId}.adaptiveAnswers`, message: 'Cần trả lời đủ câu hỏi thích ứng của đúng lĩnh vực.' })
        }
      }
    }
    for (const field of ['gpaStatus', 'thptScoreStatus', 'dgnlScoreStatus'] as const) {
      const status = input.profile?.[field]
      if (status !== undefined && !['OFFICIAL', 'EXPECTED'].includes(status)) {
        errors.push({ field: `profile.${field}`, message: 'Trạng thái điểm phải là OFFICIAL hoặc EXPECTED.' })
      }
    }
    if (MAJOR_PROFILES.length < 12) errors.push({ field: 'system.majorProfiles', message: 'Thiếu dữ liệu MajorProfile.' })
    if (errors.length) throw new BadRequestException({ code: 'ASSESSMENT_VALIDATION_FAILED', errors })
  }

  private resolveDomain(value: string): DomainCode {
    const metadata = DOMAIN_METADATA.find(({ domain, legacyId }) => domain === value || legacyId === value)
    if (!metadata) throw new NotFoundException({ code: 'EXPERIENCE_DOMAIN_NOT_FOUND', domainId: value })
    return metadata.domain
  }

  private toExperienceAnswer(domain: DomainCode, baseAnswers: Record<string, string>): ExperienceAnswer {
    return {
      domainId: domain,
      recency: baseAnswers.recency as ExperienceAnswer['recency'],
      frequency: baseAnswers.frequency as ExperienceAnswer['frequency'],
      voluntaryLevel: baseAnswers.voluntaryLevel as ExperienceAnswer['voluntaryLevel'],
      role: baseAnswers.role as ExperienceAnswer['role'],
      outcome: baseAnswers.outcome as ExperienceAnswer['outcome'],
    }
  }

  private validateBaseAnswers(baseAnswers: Record<string, string>) {
    const invalid = BASE_EVIDENCE_QUESTIONS.filter(({ key, options }) => !options.some(({ id }) => id === baseAnswers[key]))
    if (invalid.length) {
      throw new BadRequestException({
        code: 'BASE_ANSWERS_INVALID',
        fields: invalid.map(({ key }) => key),
      })
    }
  }
}
