import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  assessmentApi,
  isAssessmentApiEnabled,
} from '../api/assessmentApi'
import { buildAssessmentPayload } from '../utils/assessmentPayload'
import { createLocalAssessmentReport } from '../utils/assessmentScoring'
import { normalizeExperience } from '../utils/experienceAssessment'
import { normalizeCertificates } from '../utils/certificates'
import { riasecAssessment } from '../data/assessment'
import { useAuth } from './AuthContext'

const STORAGE_PREFIX = 'uniview-assessment-v4'

const initialAssessment = {
  riasecAnswers: {},
  experience: normalizeExperience(),
  profile: {
    admissionYear: '2027',
    regions: [],
    tuition: '',
    scholarship: false,
    strengths: [],
    gpa: '',
    gpaStatus: 'EXPECTED',
    thptScore: '',
    thptScoreStatus: 'EXPECTED',
    dgnlScore: '',
    dgnlScoreStatus: 'EXPECTED',
    certificates: [],
    priorities: [],
    syncProfile: true,
  },
  report: null,
}

const AssessmentContext = createContext(null)

function validateBeforeSubmit(assessment) {
  const missing = []

  if (Object.keys(assessment.riasecAnswers).length !== 30) {
    missing.push('30 câu RIASEC')
  }
  if (
    !assessment.experience.noExperience &&
    !assessment.experience.selectedDomains.length
  ) {
    missing.push('phần trải nghiệm')
  }

  for (const domain of assessment.experience.selectedDomains) {
    const state = assessment.experience.domainStates[domain]
    if (!state || state.status !== 'COMPLETED') {
      missing.push(`khảo sát trải nghiệm ${domain}`)
    }
  }

  return [...new Set(missing)]
}

function academicProfileDefaults(academicProfile = {}) {
  const getValue = (field) => {
    const entry = academicProfile?.[field]
    return String(entry && typeof entry === 'object' ? entry.value ?? '' : entry ?? '')
  }
  const getStatus = (field) => {
    const entry = academicProfile?.[field]
    return entry && typeof entry === 'object' && entry.status === 'OFFICIAL'
      ? 'OFFICIAL'
      : 'EXPECTED'
  }

  return {
    gpa: getValue('gpa'),
    gpaStatus: getStatus('gpa'),
    thptScore: getValue('thptScore'),
    thptScoreStatus: getStatus('thptScore'),
    dgnlScore: getValue('dgnlScore'),
    dgnlScoreStatus: getStatus('dgnlScore'),
    certificates: normalizeCertificates(academicProfile?.certificates, 'PROFILE'),
  }
}

const assessmentStorageKey = (userId) => `${STORAGE_PREFIX}:${userId ?? 'guest'}`

function createMinhAnhAssessment(defaults) {
  const values = { R: 4, I: 5, A: 4, S: 3, E: 4, C: 4 }
  const riasecAnswers = Object.fromEntries(riasecAssessment.questions.map((question) => [question.id, values[question.domain]]))
  const experience = {
    selectedDomains: ['TECHNOLOGY', 'RESEARCH_DATA', 'VISUAL_DESIGN'],
    domainStates: Object.fromEntries([
      ['TECHNOLOGY', 88],
      ['RESEARCH_DATA', 84],
      ['VISUAL_DESIGN', 78],
    ].map(([domain, score]) => [domain, {
      domain,
      status: 'COMPLETED',
      baseAnswers: {},
      adaptiveAnswers: [],
      adaptiveBranch: 'DEEP_DIVE',
      baseEvidenceScore: score,
      realityAlignment: score,
      finalEvidenceScore: score,
      evidenceLevel: 'STRONG',
      artifactUrl: '',
      verificationStatus: 'SELF_REPORTED',
    }])),
    activeDomain: 'TECHNOLOGY',
    noExperience: false,
    attemptSeed: 'minh-anh-demo-2026',
  }
  const snapshot = {
    ...defaults,
    riasecAnswers,
    experience,
    profile: {
      ...defaults.profile,
      admissionYear: '2027',
      regions: ['TP.HCM & lân cận'],
      tuition: '25-45',
      scholarship: true,
      strengths: ['Toán', 'Tiếng Anh', 'Tin học'],
      priorities: ['Học phí hợp lý', 'Cơ hội việc làm & OJT', 'Cơ sở vật chất hiện đại'],
    },
  }
  const payload = buildAssessmentPayload(snapshot, 'demo-nguyen-minh-anh')
  return { ...snapshot, report: createLocalAssessmentReport(snapshot, payload) }
}

function readStoredAssessment(user, keepStoredReport = false) {
  const academicProfile = user?.academicProfile ?? {}
  const defaults = {
    ...initialAssessment,
    profile: {
      ...initialAssessment.profile,
      ...academicProfileDefaults(academicProfile),
    },
  }

  if (typeof window === 'undefined') {
    return defaults
  }

  try {
    const stored = window.localStorage.getItem(assessmentStorageKey(user?.id))

    if (!stored) return user?.isDemo ? createMinhAnhAssessment(defaults) : defaults

    const parsed = JSON.parse(stored)

    return {
      ...defaults,
      ...parsed,
      report: keepStoredReport ? parsed.report ?? null : null,
      experience: {
        ...normalizeExperience(parsed.experience),
      },
      profile: {
        ...defaults.profile,
        ...parsed.profile,
        certificates: normalizeCertificates(
          parsed.profile?.certificates ?? defaults.profile.certificates,
          'PROFILE',
        ),
      },
    }
  } catch {
    return defaults
  }
}

export function AssessmentProvider({ children }) {
  const { user } = useAuth()
  const [assessment, setAssessment] =
    useState(() => readStoredAssessment(user, Boolean(user)))
  const loadedUserIdRef = useRef(user?.id ?? null)
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: null,
  })

  useEffect(() => {
    const nextUserId = user?.id ?? null
    if (loadedUserIdRef.current === nextUserId) return
    loadedUserIdRef.current = nextUserId
    setAssessment(readStoredAssessment(user, Boolean(user)))
    setSubmitState({ loading: false, error: null })
  }, [user])

  useEffect(() => {
    try {
      const assessmentToStore = user
        ? assessment
        : { ...assessment, report: null }
      window.localStorage.setItem(
        assessmentStorageKey(user?.id),
        JSON.stringify(assessmentToStore),
      )
    } catch {
      // Assessment vẫn hoạt động trong memory nếu storage bị chặn.
    }
  }, [assessment, user])

  const setRiasecAnswer = (
    questionId,
    value,
  ) => {
    setAssessment((current) => ({
      ...current,
      riasecAnswers: {
        ...current.riasecAnswers,
        [questionId]: value,
      },
    }))
  }

  const updateExperience = (nextValue) => {
    setAssessment((current) => ({
      ...current,
      experience: {
        ...current.experience,
        ...nextValue,
      },
    }))
  }

  const updateProfile = (nextValue) => {
    setAssessment((current) => ({
      ...current,
      profile: {
        ...current.profile,
        ...nextValue,
      },
    }))
  }

  const submitAssessment = async ({
    userId,
  } = {}) => {
    const missing = validateBeforeSubmit(assessment)

    if (missing.length) {
      const error = new Error(
        `Chưa hoàn tất: ${missing.join(', ')}.`,
      )
      error.code = 'INCOMPLETE_ASSESSMENT'
      setSubmitState({ loading: false, error })
      throw error
    }

    setSubmitState({ loading: true, error: null })
    const snapshot = structuredClone(assessment)
    const payload = buildAssessmentPayload(
      snapshot,
      userId,
    )

    try {
      const serverReport = isAssessmentApiEnabled
        ? await assessmentApi.evaluate(payload)
        : createLocalAssessmentReport(snapshot, payload)
      const report = {
        ...serverReport,
        clientInputSnapshot: snapshot,
      }

      setAssessment((current) => ({
        ...current,
        report,
      }))
      setSubmitState({ loading: false, error: null })
      return report
    } catch (error) {
      setSubmitState({ loading: false, error })
      throw error
    }
  }

  const resetAssessment = () => {
    setAssessment({
      ...structuredClone(initialAssessment),
      profile: {
        ...structuredClone(initialAssessment.profile),
        ...academicProfileDefaults(user?.academicProfile),
      },
    })
    setSubmitState({ loading: false, error: null })
  }

  return (
    <AssessmentContext.Provider
      value={{
        assessment,
        submitState,
        setRiasecAnswer,
        updateExperience,
        updateProfile,
        submitAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)

  if (!context) {
    throw new Error(
      'useAssessment must be used inside AssessmentProvider',
    )
  }

  return context
}
