export const ENTITLEMENTS = {
  PERSONAL_WORKSPACE: 'PERSONAL_WORKSPACE',
  // Kept as a compatibility key for locally persisted demo sessions.
  DIRECTION_SNAPSHOT: 'DIRECTION_SNAPSHOT',
  ADMISSION_PASS: 'ADMISSION_PASS',
}

export const DEMO_CREDENTIALS = {
  username: 'chiduy',
  password: 'ChiDuy@2026',
}

export const DEMO_USER = {
  id: 'demo-chi-duy',
  username: DEMO_CREDENTIALS.username,
  fullName: 'Chí Duy',
  email: 'chiduy@uniview.vn',
  initials: 'CD',
  avatarUrl: null,
  plan: 'ADMISSION_PASS',
  grade: 'Lớp 12',
  school: 'THPT Nguyễn Thị Minh Khai',
  targetAdmissionYear: '2027',
  preferredRegion: 'TP. Hồ Chí Minh',
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
}

const MOCK_USER = DEMO_USER

export const MOCK_SESSIONS = {
  guest: {
    user: null,
    entitlements: [],
    admissionSeason: null,
  },

  preview: {
    user: MOCK_USER,
    entitlements: [],
    admissionSeason: null,
  },

  monthly: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.PERSONAL_WORKSPACE,
    ],
    admissionSeason: null,
    activePlans: ['MONTHLY'],
  },

  annual: {
    user: MOCK_USER,
    entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE],
    admissionSeason: null,
    activePlans: ['ANNUAL'],
  },

  admission: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.PERSONAL_WORKSPACE,
      ENTITLEMENTS.ADMISSION_PASS,
    ],
    admissionSeason: '2027',
    activePlans: ['ADMISSION_PASS'],
  },

  annual_admission: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.PERSONAL_WORKSPACE,
      ENTITLEMENTS.ADMISSION_PASS,
    ],
    admissionSeason: '2027',
    activePlans: ['ANNUAL', 'ADMISSION_PASS'],
  },
}

export const DEFAULT_MOCK_SESSION = 'admission'

export function getMockSession(sessionName) {
  const normalizedName = String(
    sessionName ?? DEFAULT_MOCK_SESSION,
  )
    .trim()
    .toLowerCase()

  return (
    MOCK_SESSIONS[normalizedName] ??
    MOCK_SESSIONS[DEFAULT_MOCK_SESSION]
  )
}

// Set VITE_MOCK_SESSION to guest, preview, monthly, annual, admission,
// or annual_admission.
export const mockSession = getMockSession(
  import.meta.env.VITE_MOCK_SESSION,
)
