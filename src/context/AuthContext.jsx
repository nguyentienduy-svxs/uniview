import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { authApi } from '../api/authApi'
import {
  DEMO_CREDENTIALS,
  DEMO_USER,
  ENTITLEMENTS,
  getMockSession,
  mockSession,
} from '../data/user'

const AuthContext = createContext(null)

const AUTH_MODE =
  import.meta.env.VITE_AUTH_MODE?.toLowerCase() ??
  'local'

const USE_MOCK_AUTH = AUTH_MODE === 'mock'
const USE_API_AUTH = AUTH_MODE === 'api'
const SESSION_KEY = 'uniview-demo-session-v1'
const ACCOUNT_KEY = 'uniview-demo-account-v1'
const HISTORY_KEY = 'uniview-demo-report-history-v1'

function readJson(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function readLocalSession() {
  return readJson(SESSION_KEY, null)
}

export function AuthProvider({
  children,
}) {
  const [session, setSession] =
    useState(
      USE_MOCK_AUTH
        ? mockSession
        : USE_API_AUTH
          ? null
          : readLocalSession(),
    )

  const [loading, setLoading] =
    useState(USE_API_AUTH)

  const [error, setError] =
    useState(null)

  async function loadCurrentSession() {
    if (USE_MOCK_AUTH) {
      setSession(mockSession)
      setError(null)
      return mockSession
    }

    if (!USE_API_AUTH) {
      const localSession = readLocalSession()
      setSession(localSession)
      setError(null)
      return localSession
    }

    try {
      setLoading(true)
      setError(null)

      const data =
        await authApi.getMe()

      setSession(data)
    } catch (error) {
      console.error(
        'Failed to load session:',
        error,
      )

      setSession(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!USE_API_AUTH) return

    authApi
      .getMe()
      .then((data) => {
        setSession(data)
      })
      .catch((error) => {
        console.error(
          'Failed to load session:',
          error,
        )

        setSession(null)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const [reportHistory, setReportHistory] = useState(() =>
    readJson(HISTORY_KEY, []),
  )

  const user =
    session?.user ?? null

  const entitlements =
    session?.entitlements ?? []

  const admissionSeason =
    session?.admissionSeason ?? null

  const activePlans =
    session?.activePlans ?? []

  const isAuthenticated =
    Boolean(user)

  const hasEntitlement = (
    entitlement,
  ) => {
    if (
      entitlement === ENTITLEMENTS.PERSONAL_WORKSPACE ||
      entitlement === ENTITLEMENTS.DIRECTION_SNAPSHOT
    ) {
      return [
        ENTITLEMENTS.PERSONAL_WORKSPACE,
        ENTITLEMENTS.DIRECTION_SNAPSHOT,
        ENTITLEMENTS.ADMISSION_PASS,
      ].some((candidate) => entitlements.includes(candidate))
    }

    return entitlements.includes(
      entitlement,
    )
  }

  const persistLocalSession = (nextSession) => {
    setSession(nextSession)
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
      window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(nextSession))
    } catch (storageError) {
      console.warn('Không thể lưu phiên đăng nhập vào localStorage:', storageError)
    }
  }

  const login = async (identifier, password) => {
    const normalizedIdentifier = String(identifier ?? '').trim().toLowerCase()
    const validIdentifier = [
      DEMO_CREDENTIALS.username,
      DEMO_USER.email,
    ].includes(normalizedIdentifier)

    if (!validIdentifier || password !== DEMO_CREDENTIALS.password) {
      throw new Error('Username/email hoặc mật khẩu chưa đúng.')
    }

    const previous = readJson(ACCOUNT_KEY, null)
    const nextSession = {
      user: DEMO_USER,
      entitlements: previous?.user?.id === DEMO_USER.id
        ? [...new Set([
          ...(previous.entitlements ?? []),
          ENTITLEMENTS.PERSONAL_WORKSPACE,
          ENTITLEMENTS.ADMISSION_PASS,
        ])]
        : [ENTITLEMENTS.PERSONAL_WORKSPACE, ENTITLEMENTS.ADMISSION_PASS],
      activePlans: previous?.user?.id === DEMO_USER.id
        ? [...new Set([...(previous.activePlans ?? []), 'ADMISSION_PASS'])]
        : ['ADMISSION_PASS'],
      admissionSeason: '2027',
    }
    persistLocalSession(nextSession)
    setError(null)
    return nextSession
  }

  const purchaseCorePlan = (planId = 'MONTHLY') => {
    if (!user) throw new Error('Bạn cần đăng nhập trước khi chọn gói.')
    if (!['MONTHLY', 'ANNUAL'].includes(planId)) {
      throw new Error('Gói thuê bao không hợp lệ.')
    }
    const nextSession = {
      ...session,
      entitlements: [...new Set([
        ...entitlements,
        ENTITLEMENTS.PERSONAL_WORKSPACE,
      ])],
      activePlans: [
        ...activePlans.filter((activePlan) => !['MONTHLY', 'ANNUAL'].includes(activePlan)),
        planId,
      ],
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const purchaseDirectionSnapshot = () => purchaseCorePlan('MONTHLY')

  const purchaseAdmissionPass = (season = '2027') => {
    if (!user) throw new Error('Bạn cần đăng nhập trước khi mua Admission Pass.')
    const nextSession = {
      ...session,
      entitlements: [...new Set([
        ...entitlements,
        ENTITLEMENTS.PERSONAL_WORKSPACE,
        ENTITLEMENTS.ADMISSION_PASS,
      ])],
      activePlans: [...new Set([...activePlans, 'ADMISSION_PASS'])],
      admissionSeason: String(season),
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const saveReportToHistory = (report) => {
    if (!user || !report) return null
    const reportId = report.id ?? `direction-${Date.now()}`
    const entry = {
      id: reportId,
      title: 'Báo cáo định hướng cá nhân',
      createdAt: report.generatedAt ?? new Date().toISOString(),
      unlockedAt: new Date().toISOString(),
      status: 'UNLOCKED',
      report,
    }
    const nextHistory = [
      entry,
      ...reportHistory.filter(({ id }) => id !== reportId),
    ]
    setReportHistory(nextHistory)
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory))
    return entry
  }

  const resetDemoAccount = () => {
    const nextSession = {
      user: DEMO_USER,
      entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE, ENTITLEMENTS.ADMISSION_PASS],
      admissionSeason: '2027',
      activePlans: ['ADMISSION_PASS'],
    }
    persistLocalSession(nextSession)
    setReportHistory([])
    try {
      window.localStorage.removeItem(HISTORY_KEY)
    } catch (storageError) {
      console.warn('Không thể xóa lịch sử báo cáo demo:', storageError)
    }
    return nextSession
  }

  const logout = () => {
    if (!USE_MOCK_AUTH && !USE_API_AUTH) {
      window.localStorage.removeItem(SESSION_KEY)
    }
    setSession(USE_MOCK_AUTH ? getMockSession('guest') : null)
  }

  const selectMockSession = (
    sessionName,
  ) => {
    if (!USE_MOCK_AUTH) return

    setSession(
      getMockSession(sessionName),
    )
  }

  return (
    <AuthContext.Provider
      value={{
        session,

        user,
        entitlements,
        admissionSeason,
        activePlans,

        isAuthenticated,
        loading,
        error,
        authMode: USE_MOCK_AUTH ? 'mock' : USE_API_AUTH ? 'api' : 'local',

        hasEntitlement,
        login,
        logout,
        purchaseDirectionSnapshot,
        purchaseCorePlan,
        purchaseAdmissionPass,
        reportHistory,
        saveReportToHistory,
        resetDemoAccount,
        demoCredentials: DEMO_CREDENTIALS,
        selectMockSession,
        refreshSession:
          loadCurrentSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    )
  }

  return context
}
