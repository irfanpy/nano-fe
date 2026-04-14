// Auth API calls
import api from './api'

export const authService = {
  login:          (data)  => api.post('/auth/login', data),
  register:       (data)  => api.post('/auth/register', data),
  logout:         ()      => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword:  (data)  => api.post('/auth/reset-password', data),
  verifyEmail:    (token) => api.get(`/auth/verify-email/${token}`),
  me:             ()      => api.get('/auth/me'),
}
