// Booking API calls
import api from './api'

export const bookingService = {
  create:          (data)  => api.post('/bookings', data),
  getAll:          (params)=> api.get('/bookings', { params }),
  getById:         (id)    => api.get(`/bookings/${id}`),
  updateStatus:    (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  cancel:          (id)    => api.delete(`/bookings/${id}`),
  signContract:    (id)    => api.post(`/bookings/${id}/contract/sign`),
  getContract:     (id)    => api.get(`/bookings/${id}/contract`),
}
