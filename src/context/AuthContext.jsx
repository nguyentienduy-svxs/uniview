import {
  createContext,
  useContext,
  useState,
} from 'react'

import { mockSession } from '../data/user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] =
    useState(mockSession)

  const user =
    session?.user ?? null

  const entitlements =
    session?.entitlements ?? []

  const admissionSeason =
    session?.admissionSeason ?? null

  const isAuthenticated =
    Boolean(user)

  const hasEntitlement = (code) => {
    return entitlements.includes(code)
  }

  const logout = () => {
    setSession({
      user: null,
      entitlements: [],
      admissionSeason: null,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        entitlements,
        admissionSeason,
        isAuthenticated,
        hasEntitlement,
        logout,
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

// test user