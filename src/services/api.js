import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT access token to every request
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('thh-session')
  if (raw) {
    try {
      const session = JSON.parse(raw)
      if (session?.token) config.headers.Authorization = `Bearer ${session.token}`
    } catch { /* ignore */ }
  }
  return config
})

// On 401 — only redirect if the user had an active session (token expired)
// Do NOT redirect on login/register failures (user was never authenticated)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const isAuthEndpoint = err.config?.url?.includes('/auth/login') ||
                             err.config?.url?.includes('/auth/register')
      if (!isAuthEndpoint) {
        localStorage.removeItem('thh-session')
        window.location.href = '/'
      }
    }
    return Promise.reject(err)
  }
)

export default api
