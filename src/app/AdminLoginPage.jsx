import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, ShieldCheck, AlertCircle } from "lucide-react";
import { authService } from "../services/authService";

export default function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authService.login(email, password)) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="relative min-h-screen grid place-items-center bg-black px-5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sport/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="speed-lines absolute inset-0 opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-sport/30 bg-sport/10 text-sport mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Panel de Gestión</h1>
          <p className="text-white/40 text-sm mt-2 uppercase tracking-widest">Fernando Olivera Vehículos</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-surface p-8 rounded-3xl border-white/10 space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 px-1">Usuario</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sport transition-colors"
              placeholder="admin@fernandoolivera.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 px-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sport transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sport bg-sport/10 p-3 rounded-xl border border-sport/20"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-tight">Credenciales incorrectas</span>
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full premium-button bg-sport border-sport text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <LogIn className="h-5 w-5" />
            Acceder al sistema
          </button>
        </form>

        <p className="text-center mt-8 text-white/20 text-[10px] uppercase tracking-widest">
          Acceso restringido · 2026
        </p>
      </motion.div>
    </div>
  );
}
