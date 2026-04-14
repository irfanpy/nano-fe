// Formatting utilities

export const formatCurrency = (amount, currency = 'AED') =>
  new Intl.NumberFormat('en-AE', { style: 'currency', currency }).format(amount)

export const formatDate = (date, options = {}) =>
  new Intl.DateTimeFormat('en-AE', { dateStyle: 'medium', ...options }).format(new Date(date))

export const formatRelative = (date) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return formatDate(date)
}

export const truncate = (str, len = 100) =>
  str?.length > len ? `${str.slice(0, len)}…` : str

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const slugify = (str) =>
  str?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
