import { supabase } from "../lib/supabase";

/**
 * Inicia sesión usando Supabase Auth
 * @param {string} email 
 * @param {string} password 
 */
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Supabase maneja el token automáticamente en localStorage
    return true;
  } catch (error) {
    console.error("Auth error:", error.message);
    return false;
  }
}

/**
 * Cierra la sesión
 */
export async function logout() {
  await supabase.auth.signOut();
}

/**
 * Verifica si hay una sesión activa
 * Nota: Esta función es asíncrona ahora para ser más precisa
 */
export async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

/**
 * Versión síncrona básica para estados iniciales rápidos
 */
export function isAuthenticated() {
  // Verificamos si existe el item de sesión en el storage de supabase
  const session = localStorage.getItem('sb-mynxdchrmrdhbheqwdpi-auth-token');
  return !!session;
}
