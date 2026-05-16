import { useState } from "react";
import { Lock, User, Loader2, ArrowRight } from "lucide-react";
import { login } from "../services/authService";

export default function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        onLogin();
      } else {
        setError("Credenciales incorrectas. Verificá los datos.");
      }
    } catch (err) {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-100 brightness-105"
        >
          <source
            src="https://res.cloudinary.com/dvbkp3ml7/video/upload/v1778863564/0515_duxkkk.mov"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-sport/30 shadow-glow overflow-hidden">
            <img src="/logo-fernando-olivera.jpeg" alt="Logo FO" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Panel de Gestión</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/40">Acceso exclusivo para Fernando Olivera</p>
        </div>

        {/* Login Form */}
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-2">Usuario</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fernandoolivera.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-sport/50 focus:ring-1 focus:ring-sport/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-sport/50 focus:ring-1 focus:ring-sport/20 transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-sport">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-sport py-4 text-xs font-black uppercase tracking-widest text-white shadow-glow transition hover:brightness-110 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Entrar al sistema
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
            ← Volver a la web pública
          </a>
        </div>
      </div>
    </div>
  );
}
