// Helper profile API calls
import api from './api'

export const helperService = {
  search:       (params) => api.get('/helpers', { params }),
  getById:      (id)     => api.get(`/helpers/${id}`),
  updateProfile:(data)   => api.put('/helpers/profile', data),
  uploadPhoto:  (file)   => { const fd = new FormData(); fd.append('photo', file); return api.post('/helpers/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } }) },
  getMyProfile: ()       => api.get('/helpers/me'),
  getFeatured:  ()       => api.get('/helpers/featured'),
}
