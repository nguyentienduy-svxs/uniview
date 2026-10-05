export const MOCK_SESSIONS = {
  guest: {
    user: null,
    entitlements: [],
    admissionSeason: null,
  },

  free: {
    user: {
      id: 1,
      fullName: 'Chí Duy',
      email: 'chiduy@gmail.com',
      initials: 'CD',
      avatarUrl: null,
    },
    entitlements: [],
    admissionSeason: null,
  },

  both: {
    user: {
      id: 1,
      fullName: 'Chí Duy',
      email: 'chiduy@gmail.com',
      initials: 'CD',
      avatarUrl: null,
    },
    entitlements: [
      'DIRECTION_SNAPSHOT',
      'ADMISSION_PASS',
    ],
    admissionSeason: '2027',
  }, 
}

// Chỉ đổi dòng này để test navbar
export const mockSession =
  MOCK_SESSIONS.free