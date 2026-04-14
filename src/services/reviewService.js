// Reviews API calls
import api from './api'

export const reviewService = {
  create:       (data)  => api.post('/reviews', data),
  getByHelper:  (id)    => api.get(`/reviews/helper/${id}`),
  getByFamily:  (id)    => api.get(`/reviews/family/${id}`),
  respond:      (id, text) => api.post(`/reviews/${id}/response`, { text }),
  report:       (id)    => api.post(`/reviews/${id}/report`),
}
