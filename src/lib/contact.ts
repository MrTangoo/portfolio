/** Shared limits for the form and its API; reject overflow instead of truncating messages. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
  minMessage: 10,
} as const;

export const EMAIL_PATTERN = /^[^\s@<>,;"\\]+@[^\s@<>,;"\\]+\.[^\s@<>,;"\\]+$/;
