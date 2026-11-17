/**
 * authApi — Kết nối Spring Boot backend (/api/v1/auth/*)
 * Dùng JWT Bearer token thay vì cookie session.
 */

import { apiRequest } from './apiClient'
import { tokenStorage } from './tokenStorage'

export const authApi = {
  getMe() {
    return apiRequest('/auth/me')
  },

  logout() {
    tokenStorage.clear()
    return apiRequest('/auth/logout', { method: 'POST' }).catch(() => null)
  },

  async login(identifier, password) {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    })
    if (result?.token) tokenStorage.set(result.token)
    return result
  },

  async register(form) {
    const result = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    if (result?.token) tokenStorage.set(result.token)
    return result
  },
}
