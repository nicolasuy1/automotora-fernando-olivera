const ADMIN_EMAIL = "admin@fernandoolivera.com";
const ADMIN_PASS = "admin2026";

export function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    localStorage.setItem("fo_auth_token", "authorized_" + Date.now());
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("fo_auth_token");
}

export function isAuthenticated() {
  const token = localStorage.getItem("fo_auth_token");
  if (!token) return false;
  
  // Basic check: token should start with "authorized_"
  return token.startsWith("authorized_");
}
