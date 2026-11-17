/**
 * apiClient — Base HTTP client
 * - Tự động gắn Authorization header nếu có JWT token
 * - Dùng cho Spring Boot backend
 */

import { tokenStorage } from './tokenStorage'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export async function apiRequest(endpoint, options = {}) {
  const token = tokenStorage.get()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers,
  })

  if (!response.ok) {
    const details = await response.json().catch(() => null)
    const error = new Error(
      details?.message ?? `API error: ${response.status}`
    )
    error.status = response.status
    error.details = details
    throw error
  }

  if (response.status === 204) return null

  return response.json()
}
