export const ENTITLEMENTS = {
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
  plan: 'FREE',
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

  free: {
    user: MOCK_USER,
    entitlements: [],
    admissionSeason: null,
  },

  direction: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.DIRECTION_SNAPSHOT,
    ],
    admissionSeason: null,
  },

  admission: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.ADMISSION_PASS,
    ],
    admissionSeason: '2027',
  },

  both: {
    user: MOCK_USER,
    entitlements: [
      ENTITLEMENTS.DIRECTION_SNAPSHOT,
      ENTITLEMENTS.ADMISSION_PASS,
    ],
    admissionSeason: '2027',
  },
}

export const DEFAULT_MOCK_SESSION = 'free'

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

// Set VITE_MOCK_SESSION to guest, free, direction, admission, or both.
export const mockSession = getMockSession(
  import.meta.env.VITE_MOCK_SESSION,
)
