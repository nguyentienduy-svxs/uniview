import { createContext, useContext, useEffect, useState } from 'react'

import { authApi } from '../api/authApi'
import { tokenStorage } from '../api/tokenStorage'
import { useDataMode } from './DataModeContext'
import {
  cloneSession,
  DEMO_ACCOUNTS,
  ENTITLEMENTS,
  getDemoAccount,
  GUEST_SESSION,
} from '../data/user'
import { getActivePlanIds, PLAN_IDS } from '../data/plans'
import { createPitchDemoSession, isPitchDemoAccount } from '../data/pitchDemo'
import { clearUserWorkspaceStorage } from '../utils/userWorkspaceStorage'

const AuthContext = createContext(null)

const SESSION_KEY = 'uniview-auth-session-v4'
const ACCOUNT_SESSIONS_KEY = 'uniview-demo-accounts-v4'
const REGISTERED_ACCOUNTS_KEY = 'uniview-registered-accounts-v1'
const HISTORY_KEY = 'uniview-report-history-v2'

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

function historyKey(userId) {
  return `${HISTORY_KEY}:${userId}`
}

function toDateOnly(date) {
  return date.toISOString().slice(0, 10)
}

async function hashPassword(password, salt) {
  const value = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', value)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function initialsFor(fullName) {
  return String(fullName ?? '').trim().split(/\s+/).filter(Boolean).slice(-2).map((part) => part[0]).join('').toUpperCase() || 'UV'
}

function createRegisteredSession({ email, fullName }) {
  const id = `student-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`
  const subscription = createSubscription(PLAN_IDS.ANNUAL)
  return {
    user: {
      id,
      username: email.toLowerCase(),
      email: email.toLowerCase(),
      fullName: fullName.trim(),
      initials: initialsFor(fullName),
      role: 'STUDENT',
      avatarUrl: null,
      grade: 'Chưa cập nhật lớp',
      school: 'Chưa cập nhật trường',
      targetAdmissionYear: '2027',
      preferredRegion: '',
      targetMajors: [],
      academicProfile: {
        gpa: { value: '', status: 'EXPECTED' },
        thptScore: { value: '', status: 'EXPECTED' },
        dgnlScore: { value: '', status: 'EXPECTED' },
        certificates: [],
      },
      isDemo: false,
      createdAt: new Date().toISOString(),
    },
    entitlements: [ENTITLEMENTS.PERSONAL_WORKSPACE, ENTITLEMENTS.ADMISSION_PASS],
    activePlans: [PLAN_IDS.ANNUAL],
    subscriptions: [subscription],
    admissionSeason: null,
  }
}

function createSubscription(planId, admissionSeason) {
  const startedAt = new Date()
  const endsAt = new Date(startedAt)

  if (planId === PLAN_IDS.MONTHLY) endsAt.setDate(endsAt.getDate() + 30)
  if (planId === PLAN_IDS.ANNUAL) endsAt.setFullYear(endsAt.getFullYear() + 1)
  if (planId === PLAN_IDS.ADMISSION_PASS) {
    return {
      planId,
      status: 'ACTIVE',
      startedAt: toDateOnly(startedAt),
      endsAt: `${admissionSeason}-09-30`,
      autoRenew: false,
      admissionSeason: String(admissionSeason),
    }
  }

  return {
    planId,
    status: 'ACTIVE',
    startedAt: toDateOnly(startedAt),
    endsAt: toDateOnly(endsAt),
    autoRenew: true,
  }
}

function serverSession(response, { mockMode = false } = {}) {
  const user = response?.user ?? response
  if (!user?.id) throw new Error('Phản hồi tài khoản không hợp lệ.')
  if (mockMode && isPitchDemoAccount(user)) {
    const saved = readJson(ACCOUNT_SESSIONS_KEY, {})[user.id]
    if (saved?.mockWorkspace) {
      return cloneSession({
        ...saved,
        authSource: 'api',
        mockWorkspace: true,
        user: {
          ...user,
          ...saved.user,
          id: user.id,
          email: user.email,
        },
      })
    }
    return createPitchDemoSession(user)
  }
  return {
    user,
    authSource: 'api',
    entitlements: response?.entitlements ?? [],
    activePlans: response?.activePlans ?? user?.activePlans ?? [],
    subscriptions: response?.subscriptions ?? [],
    admissionSeason: response?.admissionSeason ?? user?.targetAdmissionYear ?? null,
  }
}

export function AuthProvider({ children }) {
  const dataModeState = useDataMode()
  const isRealData = dataModeState.isRealMode

  const [session, setSession] = useState(() => (
    isRealData || tokenStorage.get() ? null : readLocalSession()
  ))
  const [loading, setLoading] = useState(Boolean(tokenStorage.get()))
  const [error, setError] = useState(null)
  const user = session?.user ?? null
  const storedEntitlements = session?.entitlements ?? []
  const admissionSeason = session?.admissionSeason ?? null
  const subscriptions = session?.subscriptions ?? []
  const activePlans = subscriptions.length
    ? getActivePlanIds(subscriptions)
    : session?.activePlans ?? []
  const hasPlanSnapshot = subscriptions.length > 0 || activePlans.length > 0
  const entitlements = hasPlanSnapshot
    ? [...new Set(activePlans.flatMap((planId) => (
      planId === PLAN_IDS.ADMISSION_PASS || planId === PLAN_IDS.ANNUAL
        ? [ENTITLEMENTS.PERSONAL_WORKSPACE, ENTITLEMENTS.ADMISSION_PASS]
        : [ENTITLEMENTS.PERSONAL_WORKSPACE]
    )))]
    : storedEntitlements
  const isAuthenticated = Boolean(user)
  const [reportHistory, setReportHistory] = useState(() => (
    user ? readJson(historyKey(user.id), []) : []
  ))

  useEffect(() => {
    if (!tokenStorage.get()) return
    let active = true

    authApi.getMe()
      .then((data) => {
        if (!active) return
        setSession(serverSession(data, { mockMode: !isRealData }))
        setReportHistory([])
      })
      .catch((requestError) => {
        if (!active) return
        setSession(null)
        tokenStorage.clear()
        setError(requestError)
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [isRealData])

  async function loadCurrentSession() {
    if (!isRealData && !tokenStorage.get()) {
      const localSession = readLocalSession()
      setSession(localSession)
      setReportHistory(localSession?.user ? readJson(historyKey(localSession.user.id), []) : [])
      setError(null)
      return localSession
    }

    try {
      setLoading(true)
      setError(null)
      const data = await authApi.getMe()
      setSession(serverSession(data, { mockMode: !isRealData }))
      setReportHistory([])
      return data
    } catch (requestError) {
      setSession(null)
      setError(requestError)
      throw requestError
    } finally {
      setLoading(false)
    }
  }

  const hasEntitlement = (entitlement) => {
    if (entitlement === ENTITLEMENTS.PERSONAL_WORKSPACE) {
      return [
        ENTITLEMENTS.PERSONAL_WORKSPACE,
        ENTITLEMENTS.ADMISSION_PASS,
      ].some((candidate) => entitlements.includes(candidate))
    }

    return entitlements.includes(entitlement)
  }

  const hasRole = (role) => user?.role === role

  const hasEntitlementHistory = (entitlement) => {
    if (!subscriptions.length) return hasEntitlement(entitlement)

    if (entitlement === ENTITLEMENTS.ADMISSION_PASS) {
      return subscriptions.some(({ planId }) => [PLAN_IDS.ADMISSION_PASS, PLAN_IDS.ANNUAL].includes(planId))
    }

    if (entitlement === ENTITLEMENTS.PERSONAL_WORKSPACE) {
      return subscriptions.some(({ planId }) => [
        PLAN_IDS.MONTHLY,
        PLAN_IDS.ANNUAL,
        PLAN_IDS.ADMISSION_PASS,
      ].includes(planId))
    }

    return false
  }

  const isEntitlementReadOnly = (entitlement) => (
    hasEntitlementHistory(entitlement) && !hasEntitlement(entitlement)
  )

  const persistLocalSession = (nextSession) => {
    setSession(nextSession)
    if (isRealData || (nextSession?.authSource === 'api' && !nextSession?.mockWorkspace)) return
    if (typeof window === 'undefined') return

    try {
      if (nextSession?.user) {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
        const savedAccounts = readJson(ACCOUNT_SESSIONS_KEY, {})
        window.localStorage.setItem(ACCOUNT_SESSIONS_KEY, JSON.stringify({
          ...savedAccounts,
          [nextSession.user.id]: nextSession,
        }))
      } else {
        window.localStorage.removeItem(SESSION_KEY)
      }
    } catch (storageError) {
      console.warn('Không thể lưu phiên đăng nhập vào localStorage:', storageError)
    }
  }

  const login = async (identifier, password) => {
    const loginWithApi = async () => {
      const response = await authApi.login(String(identifier ?? '').trim().toLowerCase(), password)
      const nextSession = serverSession(response, { mockMode: !isRealData })
      if (!nextSession.user?.id) throw new Error('Phản hồi tài khoản không hợp lệ.')
      if (nextSession.mockWorkspace) persistLocalSession(nextSession)
      else setSession(nextSession)
      setReportHistory([])
      setError(null)
      return nextSession
    }
    if (isRealData) return loginWithApi()

    const account = getDemoAccount(identifier, password)
    const normalizedIdentifier = String(identifier ?? '').trim().toLowerCase()
    const registeredAccounts = readJson(REGISTERED_ACCOUNTS_KEY, {})
    const registeredAccount = Object.values(registeredAccounts).find(({ email }) => email === normalizedIdentifier)

    const registeredValid = registeredAccount
      ? await hashPassword(password, registeredAccount.salt) === registeredAccount.passwordHash
      : false
    if (!account && !registeredValid) return loginWithApi()

    tokenStorage.clear()

    const savedAccounts = readJson(ACCOUNT_SESSIONS_KEY, {})
    const baseSession = account?.session ?? registeredAccount.session
    const savedSession = savedAccounts[baseSession.user.id]
    const nextSession = savedSession
      ? cloneSession(savedSession)
      : cloneSession(baseSession)

    persistLocalSession(nextSession)
    setReportHistory(readJson(historyKey(nextSession.user.id), []))
    setError(null)
    return nextSession
  }

  const register = async ({ email, fullName, password }) => {
    if (isRealData) {
      const response = await authApi.register({ email, fullName, password })
      const nextSession = serverSession(response, { mockMode: !isRealData })
      if (!nextSession.user?.id) throw new Error('Phản hồi tài khoản không hợp lệ.')
      if (nextSession.mockWorkspace) persistLocalSession(nextSession)
      else setSession(nextSession)
      setReportHistory([])
      setError(null)
      return nextSession
    }

    const normalizedEmail = String(email ?? '').trim().toLowerCase()
    const normalizedName = String(fullName ?? '').trim()
    if (!normalizedName || normalizedName.length < 2) throw new Error('Vui lòng nhập họ và tên.')
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) throw new Error('Email chưa đúng định dạng.')
    if (String(password ?? '').length < 8) throw new Error('Mật khẩu cần có ít nhất 8 ký tự.')
    const registeredAccounts = readJson(REGISTERED_ACCOUNTS_KEY, {})
    const duplicate = Object.values(registeredAccounts).some(({ email: candidate }) => candidate === normalizedEmail)
      || DEMO_ACCOUNTS.some(({ session: demoSession }) => demoSession.user.email.toLowerCase() === normalizedEmail)
    if (duplicate) throw new Error('Email này đã được đăng ký. Hãy đăng nhập để tiếp tục.')

    const salt = crypto.randomUUID()
    const sessionForUser = createRegisteredSession({ email: normalizedEmail, fullName: normalizedName })
    const passwordHash = await hashPassword(password, salt)
    window.localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify({
      ...registeredAccounts,
      [sessionForUser.user.id]: {
        email: normalizedEmail,
        passwordHash,
        salt,
        session: sessionForUser,
      },
    }))
    tokenStorage.clear()
    persistLocalSession(sessionForUser)
    setReportHistory([])
    setError(null)
    return sessionForUser
  }

  const purchaseCorePlan = (planId = PLAN_IDS.MONTHLY) => {
    if (isRealData) throw new Error('Tính năng này chưa hỗ trợ lưu dữ liệu trên máy chủ.')
    if (!user) throw new Error('Bạn cần đăng nhập trước khi chọn gói.')
    if (![PLAN_IDS.MONTHLY, PLAN_IDS.ANNUAL].includes(planId)) {
      throw new Error('Gói thuê bao không hợp lệ.')
    }

    const nextSession = {
      ...session,
      entitlements: [...new Set([
        ...entitlements,
        ENTITLEMENTS.PERSONAL_WORKSPACE,
      ])],
      activePlans: [
        ...activePlans.filter((activePlan) => ![PLAN_IDS.MONTHLY, PLAN_IDS.ANNUAL].includes(activePlan)),
        planId,
      ],
      subscriptions: [
        ...subscriptions.filter(({ planId: activePlanId }) => ![PLAN_IDS.MONTHLY, PLAN_IDS.ANNUAL].includes(activePlanId)),
        createSubscription(planId, admissionSeason),
      ],
      admissionSeason,
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const purchaseAdmissionPass = (season = '2027') => {
    if (isRealData) throw new Error('Tính năng này chưa hỗ trợ lưu dữ liệu trên máy chủ.')
    if (!user) throw new Error('Bạn cần đăng nhập trước khi mua Admission Pass.')
    const nextSession = {
      ...session,
      entitlements: [...new Set([
        ...entitlements,
        ENTITLEMENTS.PERSONAL_WORKSPACE,
        ENTITLEMENTS.ADMISSION_PASS,
      ])],
      activePlans: [...new Set([...activePlans, PLAN_IDS.ADMISSION_PASS])],
      subscriptions: [
        ...subscriptions.filter(({ planId }) => planId !== PLAN_IDS.ADMISSION_PASS),
        createSubscription(PLAN_IDS.ADMISSION_PASS, season),
      ],
      admissionSeason: String(season),
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const saveReportToHistory = (report) => {
    if (!user || !report) return null
    const reportId = report.id ?? `assessment-${Date.now()}`
    const entry = {
      id: reportId,
      title: 'Báo cáo định hướng cá nhân',
      createdAt: report.generatedAt ?? new Date().toISOString(),
      unlockedAt: new Date().toISOString(),
      status: 'UNLOCKED',
      report,
    }
    const nextHistory = [entry, ...reportHistory.filter(({ id }) => id !== reportId)]
    setReportHistory(nextHistory)
    window.localStorage.setItem(`${historyKey(user.id)}${isRealData ? ':real' : ''}`, JSON.stringify(nextHistory))
    return entry
  }

  const setSubscriptionAutoRenew = (planId, autoRenew) => {
    if (isRealData) throw new Error('Tính năng này chưa hỗ trợ lưu dữ liệu trên máy chủ.')
    if (!user) return null
    const nextSession = {
      ...session,
      subscriptions: subscriptions.map((subscription) => (
        subscription.planId === planId && subscription.planId !== PLAN_IDS.ADMISSION_PASS
          ? { ...subscription, autoRenew: Boolean(autoRenew) }
          : subscription
      )),
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const updateUserProfile = (updates) => {
    if (isRealData) throw new Error('Tính năng này chưa hỗ trợ lưu dữ liệu trên máy chủ.')
    if (!session?.user) return null
    const nextSession = {
      ...session,
      user: {
        ...session.user,
        ...updates,
        initials: updates.fullName ? initialsFor(updates.fullName) : session.user.initials,
      },
    }
    persistLocalSession(nextSession)
    return nextSession
  }

  const resetMockDemoData = () => {
    if (isRealData || !session?.mockWorkspace || !isPitchDemoAccount(user)) return false
    const nextSession = createPitchDemoSession({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      initials: user.initials,
      role: user.role,
    })
    clearUserWorkspaceStorage()
    window.localStorage.removeItem(`uniview-assessment-v4:${user.id}:mock`)
    window.localStorage.removeItem(`uniview-assessment-v4:${user.id}`)
    window.localStorage.removeItem(`uniview-journey-v1:${user.id}`)
    window.localStorage.removeItem(historyKey(user.id))
    persistLocalSession(nextSession)
    setReportHistory([])
    return true
  }

  const logout = async () => {
    if (isRealData || session?.authSource === 'api' || tokenStorage.get()) {
      try {
        await authApi.logout()
      } catch (requestError) {
        console.warn('Không thể đăng xuất khỏi máy chủ:', requestError)
      }
    }
    clearUserWorkspaceStorage()
    window.localStorage.removeItem(SESSION_KEY)
    persistLocalSession(GUEST_SESSION)
    setReportHistory([])
  }

  const demoAccounts = (isRealData ? [] : DEMO_ACCOUNTS).map((account) => ({
    id: account.id,
    username: account.username,
    password: account.password,
    fullName: account.session.user.fullName,
    role: account.session.user.role,
    planDescription: account.planDescription,
  }))

  return (
    <AuthContext.Provider value={{
      session,
      user,
      entitlements,
      admissionSeason,
      activePlans,
      subscriptions,
      isAuthenticated,
      loading,
      error,
      authMode: isRealData || session?.authSource === 'api' ? 'api' : 'mock',
      hasEntitlement,
      hasEntitlementHistory,
      isEntitlementReadOnly,
      hasRole,
      login,
      register,
      logout,
      updateUserProfile,
      purchaseCorePlan,
      purchaseAdmissionPass,
      setSubscriptionAutoRenew,
      reportHistory,
      saveReportToHistory,
      resetMockDemoData,
      isPitchDemo: Boolean(session?.mockWorkspace && isPitchDemoAccount(user)),
      demoAccounts,
      refreshSession: loadCurrentSession,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
