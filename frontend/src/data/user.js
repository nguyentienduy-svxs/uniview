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

// Tài khoản pitching xác thực bằng API hiện có. Không lưu mật khẩu demo trong frontend.
export const DEMO_ACCOUNTS = []

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
  void identifier
  void password
  return null
}

export function getDefaultDemoSession(userId) {
  const account = DEMO_ACCOUNTS.find(({ session }) => session.user.id === userId)
  return account ? cloneSession(account.session) : null
}
