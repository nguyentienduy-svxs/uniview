const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const details = await response
      .json()
      .catch(() => null)
    const error = new Error(
      details?.message ??
        `API error: ${response.status}`,
    )
    error.status = response.status
    error.details = details
    throw error
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
