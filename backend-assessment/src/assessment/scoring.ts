import { createHash } from 'node:crypto'
import {
  MAJOR_PROFILES,
  MBTI_QUESTIONS,
  RIASEC_QUESTIONS,
  UNIVERSITIES,
} from './assessment.data'
import {
  AssessmentInput,
  AssessmentReport,
  ComponentScore,
  ExperienceAnswer,
  MajorProfile,
  MBTI_AXES,
  MbtiPole,
  RIASEC_CODES,
  RiasecCode,
} from './assessment.types'
import { DOMAIN_METADATA, DomainCode, getAdaptiveQuestions } from './adaptive-domain-questions'

const FIT_WEIGHTS = {
  riasec: 0.3,
  academic: 0.2,
  evidence: 0.2,
  mbti: 0.15,
  environment: 0.1,
  practical: 0.05,
} as const

const VALUE_SCORES = {
  recency: { LAST_3_MONTHS: 100, LAST_YEAR: 70, OLDER_THAN_YEAR: 40 },
  frequency: { TRIED_FEW_TIMES: 25, OCCASIONAL: 50, MONTHLY: 75, WEEKLY_OR_MORE: 100 },
  voluntaryLevel: { VOLUNTARY: 100, MIXED: 65, REQUIRED: 30 },
  role: { OBSERVED_SUPPORTED: 25, CONTRIBUTOR: 50, CORE_MEMBER: 75, INITIATOR_LEAD: 100 },
  outcome: { NONE: 20, PERSONAL_PRODUCT: 50, EXPERT_FEEDBACK: 75, PUBLIC_ACHIEVEMENT: 100 },
} as const

const LEGACY_VALUES: Record<string, string> = {
  OLDER: 'OLDER_THAN_YEAR', FEW_TIMES: 'TRIED_FEW_TIMES', SOMETIMES: 'OCCASIONAL', WEEKLY_PLUS: 'WEEKLY_OR_MORE',
  OBSERVER: 'OBSERVED_SUPPORTED', MEMBER: 'CONTRIBUTOR', CORE: 'CORE_MEMBER', LEAD: 'INITIATOR_LEAD',
  PRODUCT: 'PERSONAL_PRODUCT', AWARD_PUBLIC: 'PUBLIC_ACHIEVEMENT',
}

const clamp = (value: number) => Math.max(0, Math.min(100, value))
const round = (value: number) => Math.round(value * 10) / 10
const mean = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
const stableStringify = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

export function scoreRiasec(answers: Record<string, number>) {
  const scores = Object.fromEntries(RIASEC_CODES.map((code) => [code, 0])) as Record<RiasecCode, number>

  for (const code of RIASEC_CODES) {
    const values = RIASEC_QUESTIONS
      .filter((question) => question.domain === code)
      .map((question) => Number(answers[question.id]))
      .filter((value) => value >= 1 && value <= 5)
    scores[code] = values.length === 5 ? round(((mean(values) - 1) / 4) * 100) : 0
  }

  const ranking = RIASEC_CODES
    .map((code) => ({ code, score: scores[code] }))
    .sort((a, b) => b.score - a.score || a.code.localeCompare(b.code))
  const flags = ranking[0].score - ranking[1].score < 5 ? ['RIASEC_CLOSE_RANGE'] : []

  return { scores, ranking, top3: ranking.slice(0, 3).map(({ code }) => code).join('-'), flags }
}

export function scoreMbti(answers: Record<string, MbtiPole>) {
  const result: Record<string, unknown> = {}
  const type: string[] = []
  const flags: string[] = []

  for (const axis of MBTI_AXES) {
    const [left, right] = axis.split('') as [MbtiPole, MbtiPole]
    const questions = MBTI_QUESTIONS.filter((question) => question.dimension === axis)
    const leftCount = questions.filter((question) => answers[question.id] === left).length
    const rightCount = questions.filter((question) => answers[question.id] === right).length
    const clarity = round((Math.abs(leftCount - rightCount) / 15) * 100)
    const winningPole = leftCount >= rightCount ? left : right
    const clarityLabel = clarity >= 40 ? 'CLEAR' : clarity >= 20 ? 'MODERATE' : 'BORDERLINE'
    if (clarityLabel === 'BORDERLINE') flags.push(`MBTI_BORDERLINE_${axis}`)
    type.push(winningPole)
    result[axis] = {
      counts: { [left]: leftCount, [right]: rightCount },
      percentages: { [left]: round(leftCount / 15 * 100), [right]: round(rightCount / 15 * 100) },
      clarity,
      clarityLabel,
      winningPole,
    }
  }

  return { type: type.join(''), axes: result, flags, disclaimer: 'Chỉ báo phong cách kiểu MBTI, không phải bài MBTI chính thức.' }
}

function mapped(value: string | undefined) {
  return value ? (LEGACY_VALUES[value] ?? value) : ''
}

export function calculateBaseEvidence(answer: ExperienceAnswer) {
  const recency = mapped(answer.recency) as keyof typeof VALUE_SCORES.recency
  const frequency = mapped(answer.frequency) as keyof typeof VALUE_SCORES.frequency
  const voluntaryLevel = mapped(answer.voluntaryLevel ?? answer.motivation) as keyof typeof VALUE_SCORES.voluntaryLevel
  const role = mapped(answer.role) as keyof typeof VALUE_SCORES.role
  const outcome = mapped(answer.outcome) as keyof typeof VALUE_SCORES.outcome
  return round(VALUE_SCORES.recency[recency] * 0.2
    + VALUE_SCORES.frequency[frequency] * 0.25
    + VALUE_SCORES.voluntaryLevel[voluntaryLevel] * 0.2
    + VALUE_SCORES.role[role] * 0.2
    + VALUE_SCORES.outcome[outcome] * 0.15)
}

export function selectAdaptiveBranch(baseEvidence: number) {
  if (baseEvidence < 50) return 'LOW_EXPOSURE' as const
  if (baseEvidence < 75) return 'REALITY_CHECK' as const
  return 'DEEP_DIVE' as const
}

export function getEvidenceLabel(score: number) {
  if (score >= 75) return 'STRONG' as const
  if (score >= 50) return 'EMERGING' as const
  return 'LIMITED' as const
}

export function needsRealityCheck(answer: ExperienceAnswer) {
  return selectAdaptiveBranch(calculateBaseEvidence(answer)) === 'DEEP_DIVE'
}

function normalizeDomain(value: string): DomainCode | null {
  const found = DOMAIN_METADATA.find(({ domain, legacyId }) => domain === value || legacyId === value)
  return found?.domain ?? null
}

export function scoreExperience(answer: ExperienceAnswer) {
  const base = calculateBaseEvidence(answer)
  const domain = normalizeDomain(answer.domain ?? answer.domainId)
  const branch = answer.adaptiveBranch ?? selectAdaptiveBranch(base)
  const questions = domain ? getAdaptiveQuestions(domain, branch) : []
  const adaptiveValues = (answer.adaptiveAnswers ?? []).flatMap(({ questionId, optionId }) => {
    const selected = questions.find(({ id }) => id === questionId)?.options.find(({ id }) => id === optionId)
    return selected ? [selected.realityAlignment] : []
  })
  const legacyRealityValues = Object.values(answer.realityAnswers ?? {}).filter((value): value is boolean => typeof value === 'boolean').map((value) => value ? 100 : 0)
  const values = adaptiveValues.length ? adaptiveValues : legacyRealityValues
  const reality = values.length ? round(mean(values)) : null
  const finalScore = reality === null ? base : round(base * 0.85 + reality * 0.15)

  return {
    domainId: domain ?? answer.domainId,
    baseScore: base,
    adaptiveBranch: branch,
    realityCheckTriggered: branch !== 'LOW_EXPOSURE',
    realityScore: reality,
    evidenceStrength: finalScore,
    evidenceLevel: branch === 'LOW_EXPOSURE' ? 'LOW' : getEvidenceLabel(finalScore),
    artifact: (answer.artifactUrl ?? answer.artifact)
      ? { value: answer.artifactUrl ?? answer.artifact, status: 'ARTIFACT_PROVIDED_UNVERIFIED' }
      : null,
    verificationStatus: (answer.artifactUrl ?? answer.artifact) ? 'ARTIFACT_PROVIDED_UNVERIFIED' : 'SELF_REPORTED',
  }
}

function riasecFit(user: Record<RiasecCode, number>, major: MajorProfile) {
  const targets = Object.entries(major.riasec) as Array<[RiasecCode, number]>
  return round(clamp(100 - mean(targets.map(([code, target]) => Math.abs(user[code] - target)))))
}

function academicFit(input: AssessmentInput, major: MajorProfile): number | null {
  const strengths = input.profile?.strengths ?? []
  const certificates = input.profile?.certificates ?? []
  const scoreSignals = [
    normalizedAcademicScore(input.profile?.gpa, 10, input.profile?.gpaStatus),
    normalizedAcademicScore(input.profile?.thptScore, 30, input.profile?.thptScoreStatus),
    normalizedAcademicScore(input.profile?.dgnlScore, 1200, input.profile?.dgnlScoreStatus),
  ].filter((score): score is number => score !== null)
  const certificateScore = certificates.some((certificate) => typeof certificate === 'object' && certificate.status === 'OFFICIAL')
    ? 90
    : certificates.length ? 60 : null
  const parts: Array<{ score: number; weight: number }> = []
  if (strengths.length) {
    const subjectMatch = major.academicSubjects.length
      ? major.academicSubjects.filter((subject) => strengths.includes(subject)).length / major.academicSubjects.length * 100
      : 50
    parts.push({ score: subjectMatch, weight: 0.5 })
  }
  if (scoreSignals.length) parts.push({ score: mean(scoreSignals), weight: 0.35 })
  if (certificateScore !== null) parts.push({ score: certificateScore, weight: 0.15 })
  if (!parts.length) return null
  const totalWeight = parts.reduce((sum, part) => sum + part.weight, 0)
  return round(parts.reduce((sum, part) => sum + part.score * (part.weight / totalWeight), 0))
}

function normalizedAcademicScore(value: number | string | undefined, maximum: number, status: 'OFFICIAL' | 'EXPECTED' | undefined) {
  if (value === undefined || value === null || value === '') return null
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return null
  const confidenceFactor = status === 'EXPECTED' ? 0.9 : 1
  return round(clamp((numeric / maximum) * 100) * confidenceFactor)
}

function evidenceFit(scores: ReturnType<typeof scoreExperience>[], major: MajorProfile): number | null {
  const matches = scores.filter(({ domainId }) => {
    const legacyId = DOMAIN_METADATA.find(({ domain }) => domain === domainId)?.legacyId ?? domainId
    return major.evidenceDomains.includes(legacyId)
  })
  return matches.length ? round(mean(matches.map(({ evidenceStrength }) => evidenceStrength))) : null
}

function mbtiFit(type: string, major: MajorProfile): number | null {
  if (type.length !== 4) return null
  return round(major.mbtiLetters.filter((letter) => type.includes(letter)).length / major.mbtiLetters.length * 100)
}

function environmentFit(input: AssessmentInput, major: MajorProfile): number | null {
  const priorities = input.profile?.priorities ?? []
  if (!priorities.length) return null
  const normalized = priorities.join(' ').toLowerCase()
  const matches = major.environments.filter((tag) => normalized.includes(tag.toLowerCase())).length
  return round(clamp(55 + matches * 22.5))
}

function practicalFit(input: AssessmentInput, major: MajorProfile): number | null {
  const tuition = input.profile?.tuitionRange
  if (!tuition) return null
  return major.tuitionBands.includes(tuition) ? 90 : 45
}

function buildComponents(input: AssessmentInput, major: MajorProfile, riasec: ReturnType<typeof scoreRiasec>, mbti: ReturnType<typeof scoreMbti>, experience: ReturnType<typeof scoreExperience>[]) {
  const raw: Record<keyof typeof FIT_WEIGHTS, number | null> = {
    riasec: riasecFit(riasec.scores, major),
    academic: academicFit(input, major),
    evidence: evidenceFit(experience, major),
    mbti: mbtiFit(mbti.type, major),
    environment: environmentFit(input, major),
    practical: practicalFit(input, major),
  }
  const activeWeight = Object.entries(raw).reduce((sum, [key, score]) => sum + (score === null ? 0 : FIT_WEIGHTS[key as keyof typeof FIT_WEIGHTS]), 0)
  const components = {} as Record<string, ComponentScore>

  for (const [key, score] of Object.entries(raw)) {
    const weight = FIT_WEIGHTS[key as keyof typeof FIT_WEIGHTS]
    components[key] = {
      score,
      weight,
      effectiveWeight: score === null ? 0 : Math.round((weight / activeWeight) * 10000) / 10000,
      reason: score === null ? 'Không đủ dữ liệu; trọng số được phân bổ lại cho các thành phần còn lại.' : 'Được tính từ snapshot đầu vào theo mô hình cố định.',
    }
  }

  return components
}

function confidenceScore(components: Record<string, ComponentScore>, flags: string[], experience: ReturnType<typeof scoreExperience>[]) {
  const available = Object.values(components).filter(({ score }) => score !== null)
  const completeness = round(available.length / Object.keys(FIT_WEIGHTS).length * 100)
  const quality = clamp(100 - flags.length * 12)
  const numeric = available.map(({ score }) => score as number)
  const agreement = numeric.length > 1 ? clamp(100 - Math.sqrt(mean(numeric.map((score) => (score - mean(numeric)) ** 2)))) : 45
  const evidence = experience.length ? mean(experience.map(({ evidenceStrength }) => evidenceStrength)) : 20
  const score = round(completeness * 0.3 + quality * 0.25 + agreement * 0.25 + evidence * 0.2)
  return {
    score,
    label: score >= 75 ? 'HIGH' as const : score >= 50 ? 'MEDIUM' as const : 'LOW' as const,
    factors: { completeness: round(completeness), quality: round(quality), agreement: round(agreement), evidence: round(evidence) },
  }
}

function qualityFlags(input: AssessmentInput, riasec: ReturnType<typeof scoreRiasec>, mbti: ReturnType<typeof scoreMbti>, experience: ReturnType<typeof scoreExperience>[]) {
  const flags = [...riasec.flags, ...mbti.flags]
  if (input.experience.noExperience || !experience.length) flags.push('LIMITED_EXPERIENCE')
  if (!input.profile?.gpa && !(input.profile?.strengths?.length)) flags.push('MISSING_ACADEMIC_DATA')
  if (!input.profile?.tuitionRange || !(input.profile?.regions?.length)) flags.push('MISSING_PRACTICAL_CONSTRAINTS')
  if (experience.some(({ realityCheckTriggered, realityScore }) => realityCheckTriggered && realityScore === null)) flags.push('REALITY_CHECK_INCOMPLETE')
  return [...new Set(flags)]
}

export function evaluateAssessment(input: AssessmentInput, generatedAt = new Date().toISOString()): AssessmentReport {
  const snapshot = structuredClone(input)
  const riasec = scoreRiasec(snapshot.riasecAnswers)
  const mbti = scoreMbti(snapshot.mbtiAnswers)
  const experience = (snapshot.experience.domains ?? []).map(scoreExperience)
  const flags = qualityFlags(snapshot, riasec, mbti, experience)

  const majors = MAJOR_PROFILES.map((major) => {
    const components = buildComponents(snapshot, major, riasec, mbti, experience)
    const fitScore = round(Object.values(components).reduce((sum, item) => sum + (item.score ?? 0) * item.effectiveWeight, 0))
    const confidence = confidenceScore(components, flags, experience)
    const topComponents = Object.entries(components)
      .filter((entry): entry is [string, ComponentScore & { score: number }] => entry[1].score !== null)
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 2)
      .map(([name, value]) => `${name}: ${value.score}/100`)
    return {
      majorId: major.id,
      name: major.name,
      fitScore,
      confidenceScore: confidence.score,
      confidenceLabel: confidence.label,
      confidenceFactors: confidence.factors,
      components,
      reasons: topComponents,
      tradeoffs: major.tradeoffs,
      nextActions: major.nextActions,
    }
  }).sort((a, b) => b.fitScore - a.fitScore || b.confidenceScore - a.confidenceScore || a.majorId.localeCompare(b.majorId)).slice(0, 6)

  const selected = majors.find(({ majorId }) => majorId === snapshot.selectedMajorId) ?? majors[0]
  const regions = snapshot.profile?.regions ?? []
  const schoolMatch = UNIVERSITIES
    .filter(({ majorIds }) => majorIds.includes(selected.majorId))
    .filter(({ region }) => !regions.length || regions.includes(region))
    .map((school) => ({ ...school, dataStatus: 'DEMO', note: 'Dữ liệu minh họa; cần đối chiếu đề án tuyển sinh chính thức.' }))
  const canonical = stableStringify(snapshot)
  const reportId = `uv-${createHash('sha256').update(canonical).digest('hex').slice(0, 12)}`

  return {
    id: reportId,
    assessmentVersion: '2026.1',
    scoringModelVersion: 'direction-snapshot-1.0.0',
    generatedAt,
    inputSnapshot: snapshot,
    overview: { riasec, mbti, confidence: { score: majors[0].confidenceScore, label: majors[0].confidenceLabel }, disclaimer: 'Kết quả hỗ trợ khám phá, không khẳng định một “ngành hoàn hảo”.' },
    onePageProfile: {
      strongestSignals: [riasec.ranking[0], riasec.ranking[1], { mbtiStyle: mbti.type }],
      currentEvidence: experience,
      practicalConstraints: snapshot.profile ?? null,
      unknowns: flags,
    },
    crossEvidence: {
      agreements: majors[0].reasons,
      contradictions: flags,
      note: 'Mâu thuẫn được giữ lại để người dùng kiểm chứng, không bị che bởi nội dung sinh tự động.',
    },
    majors,
    selectedMajorDetail: selected,
    schoolMatch,
    nextSteps: selected.nextActions,
    qualityFlags: flags,
    attempt: { consumed: false, remaining: null },
  }
}
