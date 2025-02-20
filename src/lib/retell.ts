
export const RETELL_API_URL = 'https://api.retellai.com/v2';  // Added back v2 prefix
export const RETELL_API_KEY = 'key_bc69ed16c81fa347d618b4763cb7';

export const RetellConfig = {
  headers: {
    'Authorization': `Bearer ${RETELL_API_KEY}`,
    'Content-Type': 'application/json',
  }
};
