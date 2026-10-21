import { PLAN_IDS } from './plans'

export const ROLES = {
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
}

export const ROLE_LABELS = {
  [ROLES.STUDENT]: 'Học sinh',
  [ROLES.PARENT]: 'Phụ huynh',
}

export const ENTITLEMENTS = {
  PERSONAL_WORKSPACE: 'PERSONAL_WORKSPACE',
  ADMISSION_PASS: 'ADMISSION_PASS',
}

const baseAcademicProfile = {
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
}

function createStudent(overrides) {
  return {
    role: ROLES.STUDENT,
    avatarUrl: null,
    grade: 'Lớp 12',
    school: 'THPT Nguyễn Thị Minh Khai',
    targetAdmissionYear: '2027',
    preferredRegion: 'TP. Hồ Chí Minh',
    targetMajors: ['Kỹ thuật Phần mềm', 'Trí tuệ Nhân tạo'],
    academicProfile: baseAcademicProfile,
    ...overrides,
  }
}

export const DEMO_ACCOUNTS = [
  {
    id: 'nguyen-minh-anh',
    username: 'minhanh',
    password: 'MinhAnh@2026',
    planDescription: 'Gói Năm · Demo Roadmap',
    session: {
      user: createStudent({
        id: 'demo-nguyen-minh-anh',
        username: 'minhanh',
        fullName: 'Nguyễn Minh Anh',
        email: 'minhanh@uniview.vn',
        initials: 'MA',
        grade: 'Lớp 11',
        school: 'THPT Nguyễn Thị Minh Khai',
        preferredRegion: 'TP. Hồ Chí Minh',
        targetMajors: ['Thiết kế mỹ thuật số', 'Marketing', 'Công nghệ thông tin'],
        academicProfile: {
          ...baseAcademicProfile,
          gpa: { value: '8.6', status: 'OFFICIAL' },
        },
      }),
      entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE],
      activePlans: [PLAN_IDS.ANNUAL],
      subscriptions: [
        {
          planId: PLAN_IDS.ANNUAL,
          status: 'ACTIVE',
          startedAt: '2026-10-01',
          endsAt: '2027-09-30',
          autoRenew: false,
        },
      ],
      admissionSeason: null,
    },
  },
  {
    id: 'chi-duy',
    username: 'chiduy',
    password: 'ChiDuy@2026',
    planDescription: 'Gói Tháng',
    session: {
      user: createStudent({
        id: 'demo-chi-duy',
        username: 'chiduy',
        fullName: 'Chí Duy',
        email: 'chiduy@uniview.vn',
        initials: 'CD',
      }),
      entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE],
      activePlans: [PLAN_IDS.MONTHLY],
      subscriptions: [
        {
          planId: PLAN_IDS.MONTHLY,
          status: 'ACTIVE',
          startedAt: '2026-10-01',
          endsAt: '2026-10-31',
          autoRenew: true,
        },
      ],
      admissionSeason: null,
    },
  },
  {
    id: 'chi-man',
    username: 'chiman',
    password: 'ChiMan@2026',
    planDescription: 'Gói Năm',
    session: {
      user: createStudent({
        id: 'demo-chi-man',
        username: 'chiman',
        fullName: 'Chí Mẫn',
        email: 'chiman@uniview.vn',
        initials: 'CM',
      }),
      entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE],
      activePlans: [PLAN_IDS.ANNUAL],
      subscriptions: [
        {
          planId: PLAN_IDS.ANNUAL,
          status: 'ACTIVE',
          startedAt: '2026-09-01',
          endsAt: '2027-08-31',
          autoRenew: true,
        },
      ],
      admissionSeason: null,
    },
  },
  {
    id: 'chi-an',
    username: 'chian',
    password: 'ChiAn@2026',
    planDescription: 'Admission Pass mùa 2027',
    session: {
      user: createStudent({
        id: 'demo-chi-an',
        username: 'chian',
        fullName: 'Chí An',
        email: 'chian@uniview.vn',
        initials: 'CA',
      }),
      entitlements: [
        ENTITLEMENTS.PERSONAL_WORKSPACE,
        ENTITLEMENTS.ADMISSION_PASS,
      ],
      activePlans: [PLAN_IDS.ADMISSION_PASS],
      subscriptions: [
        {
          planId: PLAN_IDS.ADMISSION_PASS,
          status: 'ACTIVE',
          startedAt: '2026-09-01',
          endsAt: '2027-09-30',
          autoRenew: false,
          admissionSeason: '2027',
        },
      ],
      admissionSeason: '2027',
    },
  },
]

export const GUEST_SESSION = {
  user: null,
  entitlements: [],
  activePlans: [],
  subscriptions: [],
  admissionSeason: null,
}

export function cloneSession(session) {
  return {
    ...session,
    user: session.user ? { ...session.user } : null,
    entitlements: [...(session.entitlements ?? [])],
    activePlans: [...(session.activePlans ?? [])],
    subscriptions: (session.subscriptions ?? []).map((subscription) => ({ ...subscription })),
  }
}

export function getDemoAccount(identifier, password) {
  const normalizedIdentifier = String(identifier ?? '').trim().toLowerCase()

  return DEMO_ACCOUNTS.find((account) => {
    const identifiers = [account.username, account.session.user.email]
      .map((value) => value.toLowerCase())
    return identifiers.includes(normalizedIdentifier) && account.password === password
  }) ?? null
}

export function getDefaultDemoSession(userId) {
  const account = DEMO_ACCOUNTS.find(({ session }) => session.user.id === userId)
  return account ? cloneSession(account.session) : null
}
