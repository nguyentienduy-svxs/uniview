import {
  createContext,
  useContext,
  useEffect,
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
import { useAuth } from './AuthContext'

const STORAGE_KEY = 'uniview-assessment-v3'

const initialAssessment = {
  riasecAnswers: {},
  personalityAnswers: {},
  personalityScaleAnswers: {},
  experience: normalizeExperience(),
  profile: {
    admissionYear: '2027',
    regions: ['TP.HCM & lân cận'],
    tuition: '25-45',
    scholarship: true,
    strengths: ['Toán', 'Tiếng Anh', 'Tin học'],
    gpa: '',
    gpaStatus: 'EXPECTED',
    thptScore: '',
    thptScoreStatus: 'EXPECTED',
    dgnlScore: '',
    dgnlScoreStatus: 'EXPECTED',
    certificates: [],
    priorities: [
      'Học phí hợp lý',
      'Cơ hội việc làm & OJT',
      'Cơ sở vật chất hiện đại',
    ],
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
  if (Object.keys(assessment.personalityAnswers).length !== 60) {
    missing.push('60 câu phong cách')
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

function readStoredAssessment(academicProfile = {}) {
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
    const stored = window.localStorage.getItem(
      STORAGE_KEY,
    )

    if (!stored) return defaults

    const parsed = JSON.parse(stored)

    return {
      ...defaults,
      ...parsed,
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
    useState(() => readStoredAssessment(user?.academicProfile))
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!user?.academicProfile) return
    const defaults = academicProfileDefaults(user.academicProfile)
    setAssessment((current) => ({
      ...current,
      profile: {
        ...current.profile,
        gpa: current.profile.gpa || defaults.gpa,
        gpaStatus: current.profile.gpa ? current.profile.gpaStatus : defaults.gpaStatus,
        thptScore: current.profile.thptScore || defaults.thptScore,
        thptScoreStatus: current.profile.thptScore ? current.profile.thptScoreStatus : defaults.thptScoreStatus,
        dgnlScore: current.profile.dgnlScore || defaults.dgnlScore,
        dgnlScoreStatus: current.profile.dgnlScore ? current.profile.dgnlScoreStatus : defaults.dgnlScoreStatus,
        certificates: current.profile.certificates.length
          ? current.profile.certificates
          : defaults.certificates,
      },
    }))
  }, [user?.id])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(assessment),
      )
    } catch {
      // Assessment vẫn hoạt động trong memory nếu storage bị chặn.
    }
  }, [assessment])

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

  const setPersonalityAnswer = (
    questionId,
    value,
    scale,
  ) => {
    setAssessment((current) => ({
      ...current,
      personalityAnswers: {
        ...current.personalityAnswers,
        [questionId]: value,
      },
      personalityScaleAnswers: {
        ...current.personalityScaleAnswers,
        [questionId]: scale,
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
    paidAttempt = false,
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
      paidAttempt,
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
        setPersonalityAnswer,
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
