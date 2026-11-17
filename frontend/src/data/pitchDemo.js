import { PLAN_IDS } from './plans.js'

export const PITCH_DEMO_EMAIL = 'lamhuynhhueman@gmail.com'

export const PITCH_DEMO_PROFILE = Object.freeze({
  targetAdmissionYear: '2027',
  preferredRegion: 'TP.HCM & lân cận',
  preferredRegions: ['TP.HCM & lân cận'],
  tuitionBand: '25-45',
  tuitionBudgetMaxMillion: 35,
  scholarship: true,
  priorities: ['Học phí hợp lý', 'Cơ hội việc làm & OJT', 'Cơ sở vật chất hiện đại'],
  strengths: ['Toán', 'Tiếng Anh', 'Tin học'],
  targetMajorIds: ['7480103', '7480107'],
  targetMajors: ['Kỹ thuật Phần mềm', 'Trí tuệ Nhân tạo'],
  academicProfile: {
    gpa: { value: '8.84', status: 'OFFICIAL' },
    thptScore: { value: '25.50', status: 'EXPECTED' },
    dgnlScore: { value: '875', status: 'OFFICIAL' },
    certificates: [
      {
        id: 'profile-ielts-65',
        type: 'IELTS_ACADEMIC',
        name: 'IELTS Academic',
        score: '6.5',
        status: 'OFFICIAL',
        source: 'PROFILE',
      },
    ],
  },
})

export function isPitchDemoAccount(userOrEmail) {
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email
  return String(email ?? '').trim().toLowerCase() === PITCH_DEMO_EMAIL
}

export function createPitchDemoSession(apiUser = {}) {
  return {
    authSource: 'api',
    mockWorkspace: true,
    user: {
      ...apiUser,
      id: apiUser.id ?? 'pitch-demo-student',
      email: PITCH_DEMO_EMAIL,
      username: apiUser.username ?? PITCH_DEMO_EMAIL,
      fullName: apiUser.fullName || 'Mẫn Huệ',
      initials: apiUser.initials || 'MH',
      role: apiUser.role ?? 'STUDENT',
      avatarUrl: apiUser.avatarUrl ?? null,
      grade: apiUser.grade || 'Lớp 12',
      school: apiUser.school || 'Chưa cập nhật trường THPT',
      isDemo: true,
      ...structuredClone(PITCH_DEMO_PROFILE),
    },
    entitlements: ['PERSONAL_WORKSPACE', 'ADMISSION_PASS'],
    activePlans: [PLAN_IDS.ANNUAL],
    subscriptions: [
      {
        planId: PLAN_IDS.ANNUAL,
        status: 'ACTIVE',
        startedAt: '2026-11-01',
        endsAt: '2027-10-31',
        autoRenew: false,
      },
    ],
    admissionSeason: PITCH_DEMO_PROFILE.targetAdmissionYear,
  }
}

function fieldValue(entry, fallback = '') {
  const value = entry && typeof entry === 'object' ? entry.value : entry
  return String(value ?? fallback)
}

function fieldStatus(entry, fallback = 'EXPECTED') {
  return entry && typeof entry === 'object' ? entry.status ?? fallback : fallback
}

export function getUnifiedStudentProfile(user) {
  const base = user ?? {}
  const academic = base.academicProfile ?? {}
  const certificates = academic.certificates ?? []
  const ielts = certificates.find(({ type, name }) => (
    type === 'IELTS_ACADEMIC' || /ielts/i.test(name ?? '')
  ))
  const thptScore = fieldValue(academic.thptScore)
  const dgnlScore = fieldValue(academic.dgnlScore)
  const regions = base.preferredRegions?.length
    ? base.preferredRegions
    : [base.preferredRegion].filter(Boolean)

  return {
    userId: base.id ?? null,
    fullName: base.fullName ?? '',
    email: base.email ?? '',
    targetAdmissionYear: String(base.targetAdmissionYear ?? ''),
    preferredRegion: base.preferredRegion ?? regions[0] ?? '',
    preferredRegions: regions,
    tuitionBand: base.tuitionBand ?? '',
    tuitionBudgetMaxMillion: Number(base.tuitionBudgetMaxMillion ?? 0),
    scholarship: Boolean(base.scholarship),
    priorities: [...(base.priorities ?? [])],
    strengths: [...(base.strengths ?? [])],
    targetMajorIds: [...(base.targetMajorIds ?? [])],
    targetMajors: [...(base.targetMajors ?? [])],
    gpa: fieldValue(academic.gpa),
    gpaStatus: fieldStatus(academic.gpa),
    thptScore,
    thptScoreNumber: Number(thptScore || 0),
    thptScoreStatus: fieldStatus(academic.thptScore),
    dgnlScore,
    dgnlScoreNumber: Number(dgnlScore || 0),
    dgnlScoreStatus: fieldStatus(academic.dgnlScore),
    ieltsScore: fieldValue(ielts?.score),
    certificates: structuredClone(certificates),
  }
}

export function getAssessmentProfileFromUser(user) {
  const profile = getUnifiedStudentProfile(user)
  return {
    admissionYear: profile.targetAdmissionYear,
    regions: profile.preferredRegions,
    tuition: profile.tuitionBand,
    scholarship: profile.scholarship,
    strengths: profile.strengths,
    priorities: profile.priorities,
    gpa: profile.gpa,
    gpaStatus: profile.gpaStatus,
    thptScore: profile.thptScore,
    thptScoreStatus: profile.thptScoreStatus,
    dgnlScore: profile.dgnlScore,
    dgnlScoreStatus: profile.dgnlScoreStatus,
    certificates: profile.certificates,
    syncProfile: true,
  }
}
