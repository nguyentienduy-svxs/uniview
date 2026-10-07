export const RIASEC_CODES = ['R', 'I', 'A', 'S', 'E', 'C'] as const
export const MBTI_AXES = ['EI', 'SN', 'TF', 'JP'] as const

export type RiasecCode = (typeof RIASEC_CODES)[number]
export type MbtiAxis = (typeof MBTI_AXES)[number]
export type MbtiPole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface RiasecQuestion {
  id: string
  domain: RiasecCode
  text: string
  example: string
}

export interface MbtiQuestion {
  id: string
  dimension: MbtiAxis
  prompt: string
  options: Array<{ label: string; value: MbtiPole }>
}

export interface ExperienceAnswer {
  domain?: string
  domainId: string
  recency: 'LAST_3_MONTHS' | 'LAST_YEAR' | 'OLDER_THAN_YEAR' | 'OLDER'
  frequency: 'TRIED_FEW_TIMES' | 'OCCASIONAL' | 'MONTHLY' | 'WEEKLY_OR_MORE' | 'FEW_TIMES' | 'SOMETIMES' | 'WEEKLY_PLUS'
  voluntaryLevel?: 'VOLUNTARY' | 'MIXED' | 'REQUIRED'
  motivation?: 'VOLUNTARY' | 'MIXED' | 'REQUIRED'
  role: 'OBSERVED_SUPPORTED' | 'CONTRIBUTOR' | 'CORE_MEMBER' | 'INITIATOR_LEAD' | 'OBSERVER' | 'MEMBER' | 'CORE' | 'LEAD'
  outcome: 'NONE' | 'PERSONAL_PRODUCT' | 'EXPERT_FEEDBACK' | 'PUBLIC_ACHIEVEMENT' | 'PRODUCT' | 'AWARD_PUBLIC'
  artifact?: string
  artifactUrl?: string
  adaptiveBranch?: 'LOW_EXPOSURE' | 'REALITY_CHECK' | 'DEEP_DIVE'
  adaptiveAnswers?: Array<{ questionId: string; optionId: string }>
  baseEvidenceScore?: number
  finalEvidenceScore?: number
  verificationStatus?: 'SELF_REPORTED' | 'ARTIFACT_PROVIDED_UNVERIFIED'
  realityAnswers?: Record<string, boolean>
}

export interface AssessmentInput {
  userId?: string
  paidAttempt?: boolean
  riasecAnswers: Record<string, number>
  mbtiAnswers: Record<string, MbtiPole>
  experience: {
    noExperience?: boolean
    domains?: ExperienceAnswer[]
  }
  profile?: {
    admissionYear?: string
    regions?: string[]
    tuitionRange?: string
    scholarship?: boolean
    strengths?: string[]
    gpa?: number | string
    gpaStatus?: 'OFFICIAL' | 'EXPECTED'
    thptScore?: number | string
    thptScoreStatus?: 'OFFICIAL' | 'EXPECTED'
    dgnlScore?: number | string
    dgnlScoreStatus?: 'OFFICIAL' | 'EXPECTED'
    certificates?: Array<string | {
      id?: string
      type?: string
      name: string
      score: string | number
      status: 'OFFICIAL' | 'EXPECTED'
      source?: 'PROFILE' | 'ASSESSMENT'
    }>
    priorities?: string[]
  }
  selectedMajorId?: string
}

export interface MajorProfile {
  id: string
  name: string
  riasec: Partial<Record<RiasecCode, number>>
  academicSubjects: string[]
  evidenceDomains: string[]
  mbtiLetters: MbtiPole[]
  environments: string[]
  tuitionBands: string[]
  tradeoffs: string[]
  nextActions: string[]
}

export interface ComponentScore {
  score: number | null
  weight: number
  effectiveWeight: number
  reason: string
}

export interface RankedMajor {
  majorId: string
  name: string
  fitScore: number
  confidenceScore: number
  confidenceLabel: 'HIGH' | 'MEDIUM' | 'LOW'
  components: Record<string, ComponentScore>
  reasons: string[]
  tradeoffs: string[]
  nextActions: string[]
}

export interface AssessmentReport {
  id: string
  assessmentVersion: string
  scoringModelVersion: string
  generatedAt: string
  inputSnapshot: AssessmentInput
  overview: unknown
  onePageProfile: unknown
  crossEvidence: unknown
  majors: RankedMajor[]
  selectedMajorDetail: RankedMajor
  schoolMatch: unknown
  nextSteps: unknown
  qualityFlags: string[]
  attempt: { consumed: boolean; remaining: number | null }
}
