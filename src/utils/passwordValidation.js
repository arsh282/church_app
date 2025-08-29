/**
 * Password validation utility functions
 */

// Password strength requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_LOWERCASE: true,
  REQUIRE_UPPERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true
};

// Special characters allowed in passwords
export const SPECIAL_CHARS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with isValid, errors, and strength
 */
export const validatePassword = (password) => {
  const errors = [];
  let score = 0;

  // Check length
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters long`);
  } else if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    errors.push(`Password must be no more than ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters long`);
  } else {
    score += 1; // Length requirement met
  }

  // Check lowercase
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE) {
    score += 1;
  }

  // Check uppercase
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE) {
    score += 1;
  }

  // Check number
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER) {
    score += 1;
  }

  // Check special character
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL && !SPECIAL_CHARS.test(password)) {
    errors.push('Password must contain at least one special character');
  } else if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL) {
    score += 1;
  }

  // Determine strength
  let strength = '';
  let color = '#ccc';
  
  if (score <= 1) {
    strength = 'Very Weak';
    color = '#ff4444';
  } else if (score <= 2) {
    strength = 'Weak';
    color = '#ff8800';
  } else if (score <= 3) {
    strength = 'Fair';
    color = '#ffaa00';
  } else if (score <= 4) {
    strength = 'Good';
    color = '#00aa00';
  } else {
    strength = 'Strong';
    color = '#008800';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: {
      score,
      label: strength,
      color
    }
  };
};

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

/**
 * Checks if password meets all requirements
 * @param {string} password - The password to check
 * @returns {object} - Object with boolean flags for each requirement
 */
export const getPasswordRequirements = (password) => {
  return {
    length: password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH && password.length <= PASSWORD_REQUIREMENTS.MAX_LENGTH,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: SPECIAL_CHARS.test(password)
  };
};
