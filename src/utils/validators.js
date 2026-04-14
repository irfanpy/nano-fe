// Validation helpers (used with react-hook-form)

export const required  = { required: 'This field is required' }

export const emailRule = {
  required: 'Email is required',
  pattern:  { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
}

export const passwordRule = {
  required:  'Password is required',
  minLength: { value: 8, message: 'At least 8 characters' },
}

export const phoneRule = {
  required: 'Phone number is required',
  pattern:  { value: /^\+?[\d\s\-()]{8,15}$/, message: 'Enter a valid phone number' },
}

export const emiratesIdRule = {
  required: 'Emirates ID is required',
  pattern:  { value: /^\d{3}-\d{4}-\d{7}-\d{1}$/, message: 'Format: 784-1234-1234567-1' },
}
