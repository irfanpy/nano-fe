import api from './api'

export const helperService = {
  search:        (params) => api.get('/helpers/', { params }),
  getById:       (id)     => api.get(`/helpers/${id}/`),
  getMyProfile:  ()       => api.get('/helpers/me/'),
  updateProfile: (data)   => api.patch('/helpers/me/', data),
  getFeatured:   ()       => api.get('/helpers/featured/'),
  uploadPhoto:   (file)   => {
    const fd = new FormData()
    fd.append('avatar', file)
    return api.post('/helpers/me/avatar/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  uploadDocument: (docType, file) => {
    const fd = new FormData()
    fd.append('doc_type', docType)
    fd.append('file', file)
    return api.post('/helpers/me/documents/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}
