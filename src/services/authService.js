const ADMIN_USER = "admin@fernandoolivera.com";
const ADMIN_PASS = "admin2026";

export const authService = {
  login: (email, password) => {
    if (email === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("fo_admin_token", "fo_authorized_" + Date.now());
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("fo_admin_token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("fo_admin_token");
  }
};
