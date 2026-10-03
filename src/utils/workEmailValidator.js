// Comprehensive Corporate Work Email Validation Utility
// Enforces corporate domains, strictly rejects generic consumer freemail (Gmail, Yahoo, Outlook, etc.)

export const GENERIC_EMAIL_DOMAINS = new Set([
  // Google
  'gmail.com',
  'googlemail.com',

  // Microsoft
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'hotmail.es',
  'hotmail.it',
  'outlook.com',
  'live.com',
  'live.co.uk',
  'msn.com',
  'passport.com',

  // Yahoo
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.fr',
  'yahoo.de',
  'yahoo.es',
  'yahoo.it',
  'yahoo.ca',
  'yahoo.com.au',
  'ymail.com',
  'rocketmail.com',

  // Apple
  'icloud.com',
  'me.com',
  'mac.com',

  // Other consumer freemail & disposable providers
  'aol.com',
  'aim.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'gmx.com',
  'gmx.de',
  'gmx.net',
  'mail.com',
  'yandex.com',
  'yandex.ru',
  'tutanota.com',
  'fastmail.com',
  'inbox.com',
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com'
]);

export const isLocalhostEnvironment = () => {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname || '';
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h.includes('192.168.') ||
    h.endsWith('.local')
  );
};

export const isValidEmailFormat = (email = '') => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(String(email).trim());
};

export const getEmailDomain = (email = '') => {
  const parts = String(email).trim().toLowerCase().split('@');
  return parts.length === 2 ? parts[1] : '';
};

export const isGenericEmailDomain = (email = '') => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return GENERIC_EMAIL_DOMAINS.has(domain);
};

export const validateWorkEmail = (email = '', { allowEmpty = false } = {}) => {
  const trimmed = String(email || '').trim();

  // If blank
  if (!trimmed) {
    if (allowEmpty) {
      return { isValid: true, error: null };
    }
    return { 
      isValid: false, 
      error: 'Please enter your corporate work email to run the audit' 
    };
  }

  // Format validation
  if (!isValidEmailFormat(trimmed)) {
    return { 
      isValid: false, 
      error: 'Please enter a valid work email address' 
    };
  }

  const domain = getEmailDomain(trimmed);

  // Specific check for Google Gmail
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return {
      isValid: false,
      error: 'Personal Gmail accounts are not accepted. Please enter your corporate work email (e.g. name@hotel.com)'
    };
  }

  // General freemail check
  if (GENERIC_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: 'Please use your official company work email (e.g. name@hotel.com). Personal email accounts are not accepted'
    };
  }

  return { isValid: true, error: null };
};
