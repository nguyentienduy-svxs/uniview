import { apiRequest } from './apiClient'

export const authApi = {
  getMe() {
    return apiRequest('/auth/me')
  },

  logout() {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },
}
