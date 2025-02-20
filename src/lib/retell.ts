
export const RETELL_API_URL = 'https://retellai.com/api';
export const RETELL_API_KEY = 'key_bc69ed16c81fa347d618b4763cb7';

// Initialize Retell config
export const RetellConfig = {
  headers: {
    'Authorization': `Bearer ${RETELL_API_KEY}`,
    'Content-Type': 'application/json',
  }
};
