import { createContext, useContext, useEffect, useState } from 'react'

import { authApi } from '../api/authApi'
import {
  cloneSession,
  DEMO_ACCOUNTS,
  ENTITLEMENTS,
  getDemoAccount,
  GUEST_SESSION,
} from '../data/user'
import { getActivePlanIds, PLAN_IDS } from '../data/plans'

const AuthContext = createContext(null)

const AUTH_MODE = import.meta.env.VITE_AUTH_MODE?.toLowerCase() ?? 'local'
const USE_MOCK_AUTH = AUTH_MODE === 'mock'
const USE_API_AUTH = AUTH_MODE === 'api'
const SESSION_KEY = 'uniview-auth-session-v4'
const ACCOUNT_SESSIONS_KEY = 'uniview-demo-accounts-v4'
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

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => (
    USE_API_AUTH ? null : readLocalSession()
  ))
  const [loading, setLoading] = useState(USE_API_AUTH)
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
    if (!USE_API_AUTH) return

    authApi.getMe()
      .then((data) => {
        setSession(data)
        setReportHistory(data?.user ? readJson(historyKey(data.user.id), []) : [])
      })
      .catch((requestError) => {
        console.error('Failed to load session:', requestError)
        setSession(null)
        setError(requestError)
      })
      .finally(() => setLoading(false))
  }, [])

  async function loadCurrentSession() {
    if (!USE_API_AUTH) {
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
      setSession(data)
      setReportHistory(data?.user ? readJson(historyKey(data.user.id), []) : [])
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
    const account = getDemoAccount(identifier, password)
    if (!account) throw new Error('Username/email hoặc mật khẩu chưa đúng.')

    const savedAccounts = readJson(ACCOUNT_SESSIONS_KEY, {})
    const savedSession = savedAccounts[account.session.user.id]
    const nextSession = savedSession
      ? cloneSession(savedSession)
      : cloneSession(account.session)

    persistLocalSession(nextSession)
    setReportHistory(readJson(historyKey(nextSession.user.id), []))
    setError(null)
    return nextSession
  }

  const purchaseCorePlan = (planId = PLAN_IDS.MONTHLY) => {
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
    window.localStorage.setItem(historyKey(user.id), JSON.stringify(nextHistory))
    return entry
  }

  const setSubscriptionAutoRenew = (planId, autoRenew) => {
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

  const logout = async () => {
    if (USE_API_AUTH) {
      try {
        await authApi.logout()
      } catch (requestError) {
        console.warn('Không thể đăng xuất khỏi máy chủ:', requestError)
      }
    }
    persistLocalSession(GUEST_SESSION)
    setReportHistory([])
  }

  const demoAccounts = DEMO_ACCOUNTS.map((account) => ({
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
      authMode: USE_MOCK_AUTH ? 'mock' : USE_API_AUTH ? 'api' : 'local',
      hasEntitlement,
      hasEntitlementHistory,
      isEntitlementReadOnly,
      hasRole,
      login,
      logout,
      purchaseCorePlan,
      purchaseAdmissionPass,
      setSubscriptionAutoRenew,
      reportHistory,
      saveReportToHistory,
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
