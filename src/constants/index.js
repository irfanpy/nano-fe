// App-wide constants for Trusted Home Helpers Dubai

export const APP_NAME = 'Trusted Home Helpers'
export const APP_TAGLINE = 'Verified Domestic Staff for Dubai & UAE'
export const CONTACT_EMAIL = 'support@trustedhomehelpersduabi.com'
export const CONTACT_PHONE = '+971 4 000 0000'

// Helper Categories
export const HELPER_CATEGORIES = [
  { id: 'housemaid',  label: 'Housemaid',         icon: 'MdCleaningServices' },
  { id: 'nanny',      label: 'Nanny / Babysitter', icon: 'MdChildCare' },
  { id: 'driver',     label: 'Private Driver',     icon: 'MdDirectionsCar' },
  { id: 'caregiver',  label: 'Elderly Caregiver',  icon: 'MdFavorite' },
  { id: 'chef',       label: 'Personal Chef',      icon: 'MdRestaurant' },
]

// Nationality options (common in UAE market)
export const NATIONALITIES = [
  'Filipino', 'Indian', 'Sri Lankan', 'Indonesian', 'Ethiopian',
  'Kenyan', 'Nepali', 'Bangladeshi', 'Pakistani', 'Other',
]

// Booking status labels
export const BOOKING_STATUS = {
  PENDING:   'pending',
  CONFIRMED: 'confirmed',
  ACTIVE:    'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED:  'disputed',
}

// User roles
export const ROLES = {
  FAMILY: 'family',
  HELPER: 'helper',
  ADMIN:  'admin',
}

// Visa status
export const VISA_STATUS = {
  NOT_STARTED:  'not_started',
  IN_PROGRESS:  'in_progress',
  APPROVED:     'approved',
  REJECTED:     'rejected',
}

// Plan / Subscription tiers
export const SUBSCRIPTION_PLANS = [
  { id: 'basic',      label: 'Basic',      price: 99,  currency: 'AED' },
  { id: 'standard',   label: 'Standard',   price: 199, currency: 'AED' },
  { id: 'premium',    label: 'Premium',    price: 349, currency: 'AED' },
]

// Pagination default
export const DEFAULT_PAGE_SIZE = 12

// Rating scale
export const MAX_RATING = 5
