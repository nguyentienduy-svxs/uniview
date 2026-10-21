import {
  ADAPTIVE_DOMAIN_QUESTION_BANKS,
  BASE_EVIDENCE_QUESTIONS,
  DOMAIN_CODES,
} from '../data/adaptive-domain-questions.js'

const LEGACY_DOMAIN_CODES = {
  technology: 'TECHNOLOGY',
  research: 'RESEARCH_DATA',
  design: 'VISUAL_DESIGN',
  music: 'MUSIC_PERFORMANCE',
  leadership: 'COMMUNICATION_LEADERSHIP',
  support: 'CARE_TEACHING',
  business: 'BUSINESS_ORGANIZATION',
  engineering: 'HANDS_ON_ENGINEERING',
}

const LEGACY_ANSWERS = {
  recency: { recent: 'LAST_3_MONTHS', year: 'LAST_YEAR', older: 'OLDER_THAN_YEAR' },
  frequency: { few: 'TRIED_FEW_TIMES', sometimes: 'OCCASIONAL', monthly: 'MONTHLY', weekly: 'WEEKLY_OR_MORE' },
  voluntaryLevel: { voluntary: 'VOLUNTARY', mixed: 'MIXED', required: 'REQUIRED' },
  role: { observe: 'OBSERVED_SUPPORTED', member: 'CONTRIBUTOR', core: 'CORE_MEMBER', lead: 'INITIATOR_LEAD' },
  outcome: { none: 'NONE', product: 'PERSONAL_PRODUCT', feedback: 'EXPERT_FEEDBACK', award: 'PUBLIC_ACHIEVEMENT' },
}

export function createDomainAssessmentState(domain) {
  return {
    domain,
    status: 'SELECTED',
    baseAnswers: {},
    adaptiveAnswers: [],
    artifactUrl: '',
    verificationStatus: 'SELF_REPORTED',
  }
}

export function calculateBaseEvidence(baseAnswers) {
  const weights = {
    recency: 0.2,
    frequency: 0.25,
    voluntaryLevel: 0.2,
    role: 0.2,
    outcome: 0.15,
  }

  return round(BASE_EVIDENCE_QUESTIONS.reduce((total, item) => {
    const selected = item.options.find(({ id }) => id === baseAnswers[item.key])
    return total + (selected?.score ?? 0) * weights[item.key]
  }, 0))
}

export function selectAdaptiveBranch(baseEvidence) {
  if (baseEvidence < 50) return 'LOW_EXPOSURE'
  if (baseEvidence < 75) return 'REALITY_CHECK'
  return 'DEEP_DIVE'
}

export function getEvidenceLabel(score) {
  if (score >= 75) return 'STRONG'
  if (score >= 50) return 'EMERGING'
  return 'LIMITED'
}

export function getAdaptiveQuestions(domain, branch) {
  const bank = ADAPTIVE_DOMAIN_QUESTION_BANKS[domain]
  if (!bank) return []
  if (branch === 'LOW_EXPOSURE') {
    return [bank.lowExposureQuestions[0], bank.realityCheckQuestions[0]]
  }
  if (branch === 'REALITY_CHECK') return bank.realityCheckQuestions
  if (branch === 'DEEP_DIVE') {
    return [...bank.realityCheckQuestions, ...bank.deepDiveQuestions]
  }
  return []
}

export function getStableQuestionOptions(question, attemptSeed = 'default') {
  return [...question.options].sort((left, right) => {
    const leftHash = stableHash(`${attemptSeed}:${question.id}:${left.id}`)
    const rightHash = stableHash(`${attemptSeed}:${question.id}:${right.id}`)
    return leftHash - rightHash || left.id.localeCompare(right.id)
  })
}

export function calculateRealityAlignment(domain, branch, adaptiveAnswers) {
  const questions = getAdaptiveQuestions(domain, branch)
  const values = adaptiveAnswers.flatMap((answer) => {
    const question = questions.find(({ id }) => id === answer.questionId)
    const selected = question?.options.find(({ id }) => id === answer.optionId)
    return selected ? [selected.realityAlignment] : []
  })
  return values.length ? round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
}

export function finalizeDomainState(state) {
  const realityAlignment = calculateRealityAlignment(
    state.domain,
    state.adaptiveBranch,
    state.adaptiveAnswers,
  )
  const finalEvidenceScore = round(
    state.baseEvidenceScore * 0.85 + realityAlignment * 0.15,
  )

  return {
    ...state,
    status: 'COMPLETED',
    realityAlignment,
    finalEvidenceScore,
    evidenceLevel: state.adaptiveBranch === 'LOW_EXPOSURE'
      ? 'LOW'
      : getEvidenceLabel(finalEvidenceScore),
    verificationStatus: state.artifactUrl?.trim()
      ? 'ARTIFACT_PROVIDED_UNVERIFIED'
      : 'SELF_REPORTED',
  }
}

export function findNextIncompleteDomain(selectedDomains, domainStates, currentDomain) {
  if (!selectedDomains.length) return null
  const start = Math.max(0, selectedDomains.indexOf(currentDomain))
  const ordered = [
    ...selectedDomains.slice(start + 1),
    ...selectedDomains.slice(0, start + 1),
  ]
  return ordered.find((domain) => domainStates[domain]?.status !== 'COMPLETED') ?? null
}

export function isBaseComplete(baseAnswers = {}) {
  return BASE_EVIDENCE_QUESTIONS.every(({ key }) => Boolean(baseAnswers[key]))
}

export function normalizeExperience(experience = {}) {
  const selectedDomains = (experience.selectedDomains ?? experience.selectedActivities ?? [])
    .map((domain) => LEGACY_DOMAIN_CODES[domain] ?? domain)
    .filter((domain, index, values) => DOMAIN_CODES.includes(domain) && values.indexOf(domain) === index)
  const domainStates = {}

  for (const domain of selectedDomains) {
    const saved = experience.domainStates?.[domain]
    if (saved) {
      const restored = {
        ...createDomainAssessmentState(domain),
        ...saved,
        domain,
        baseAnswers: { ...saved.baseAnswers },
        adaptiveAnswers: [...(saved.adaptiveAnswers ?? [])],
      }
      if (restored.status === 'BASE_COMPLETED' && restored.adaptiveBranch) {
        restored.status = 'ADAPTIVE_IN_PROGRESS'
      }
      const expectedQuestions = getAdaptiveQuestions(domain, restored.adaptiveBranch)
      const hasAllAdaptiveAnswers = expectedQuestions.length > 0 && expectedQuestions.every(
        ({ id }) => restored.adaptiveAnswers.some(({ questionId }) => questionId === id),
      )
      domainStates[domain] = restored.status === 'ADAPTIVE_IN_PROGRESS'
        && Number.isFinite(restored.baseEvidenceScore)
        && hasAllAdaptiveAnswers
        ? finalizeDomainState(restored)
        : restored
      continue
    }

    const legacyKey = Object.keys(LEGACY_DOMAIN_CODES).find((key) => LEGACY_DOMAIN_CODES[key] === domain)
    const legacy = experience.details?.[legacyKey] ?? experience.details?.[domain]
    const state = createDomainAssessmentState(domain)
    if (legacy) {
      state.baseAnswers = {
        recency: LEGACY_ANSWERS.recency[legacy.recency] ?? legacy.recency,
        frequency: LEGACY_ANSWERS.frequency[legacy.frequency] ?? legacy.frequency,
        voluntaryLevel: LEGACY_ANSWERS.voluntaryLevel[legacy.motivation] ?? legacy.voluntaryLevel,
        role: LEGACY_ANSWERS.role[legacy.role] ?? legacy.role,
        outcome: LEGACY_ANSWERS.outcome[legacy.outcome] ?? legacy.outcome,
      }
      state.artifactUrl = legacy.evidence ?? legacy.artifact ?? ''
      state.status = isBaseComplete(state.baseAnswers) ? 'BASE_IN_PROGRESS' : 'SELECTED'
    }
    domainStates[domain] = state
  }

  const requestedActive = LEGACY_DOMAIN_CODES[experience.activeDomain] ?? experience.activeDomain
  const firstIncomplete = selectedDomains.find((domain) => domainStates[domain]?.status !== 'COMPLETED')
  const activeDomain = selectedDomains.includes(requestedActive)
    && domainStates[requestedActive]?.status !== 'COMPLETED'
    ? requestedActive
    : firstIncomplete ?? requestedActive ?? selectedDomains[0] ?? null

  return {
    selectedDomains,
    domainStates,
    activeDomain,
    noExperience: Boolean(experience.noExperience),
    attemptSeed: experience.attemptSeed ?? 'uniview-experience-v1',
  }
}

function round(value) {
  return Math.round(value * 100) / 100
}

function stableHash(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
