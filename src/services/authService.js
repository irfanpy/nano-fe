// Auth API calls — trailing slashes required by Django
import api from './api'

export const authService = {
  login:          (data)  => api.post('/auth/login/', data),
  register:       (data)  => api.post('/auth/register/', data),
  logout:         (data)  => api.post('/auth/logout/', data),
  forgotPassword: (email) => api.post('/auth/forgot-password/', { email }),
  resetPassword:  (data)  => api.post('/auth/reset-password/', data),
  me:             ()      => api.get('/auth/me/'),
}
