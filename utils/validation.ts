/**
 * Shared validation utilities — single source of truth.
 * Used by AuthContext, AuthModals, ContactSection, FoodForms.
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Belgian / international format
  const phoneRegex = /^[+\d][\d\s\-().]{6,20}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Returns an error message string if password is invalid, null if valid.
 * Rules: 8+ chars, 1 uppercase, 1 lowercase, 1 digit.
 */
export const validatePassword = (password: string): string | null => {
  if (password.length < 8)       return 'Le mot de passe doit contenir au moins 8 caractères';
  if (!/[A-Z]/.test(password))   return 'Le mot de passe doit contenir au moins une majuscule';
  if (!/[a-z]/.test(password))   return 'Le mot de passe doit contenir au moins une minuscule';
  if (!/[0-9]/.test(password))   return 'Le mot de passe doit contenir au moins un chiffre';
  return null;
};

/**
 * Returns true if the password meets registration requirements (no error).
 */
export const isValidPassword = (password: string): boolean =>
  validatePassword(password) === null;
