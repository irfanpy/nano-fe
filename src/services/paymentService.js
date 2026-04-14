// Payment API calls
import api from './api'

export const paymentService = {
  createIntent:    (data)  => api.post('/payments/intent', data),
  confirm:         (id)    => api.post(`/payments/${id}/confirm`),
  getHistory:      ()      => api.get('/payments/history'),
  getInvoice:      (id)    => api.get(`/payments/${id}/invoice`),
  requestRefund:   (id)    => api.post(`/payments/${id}/refund`),
}
