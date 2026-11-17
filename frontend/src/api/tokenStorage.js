/**
 * tokenStorage — Lưu trữ JWT token trong localStorage
 * Tách riêng để tránh circular dependency giữa apiClient và authApi
 */

const TOKEN_KEY = 'uniview-jwt-token-v1'

export const tokenStorage = {
  get() {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(TOKEN_KEY)
  },
  set(token) {
    if (typeof window === 'undefined') return
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
    else window.localStorage.removeItem(TOKEN_KEY)
  },
  clear() {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(TOKEN_KEY)
  },
}
