"use client";

import { useState } from "react";
import { saveStoreAdminSession } from "@/lib/stores/session";

export function PanelLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password || undefined }),
      });
      const data = (await res.json()) as {
        error?: string;
        requiresPassword?: boolean;
        slug?: string;
        adminToken?: string;
        panelUrl?: string;
      };

      if (res.status === 401 && data.requiresPassword) {
        setNeedsPassword(true);
        throw new Error("Ingresa tu contraseña");
      }

      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo iniciar sesión");
      }

      if (data.slug && data.adminToken) {
        saveStoreAdminSession(data.slug, data.adminToken);
        window.location.href = data.panelUrl ?? `/panel/${data.slug}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="panel-email" className="block text-sm font-medium text-coffee mb-1.5">
          Correo de tu tienda
        </label>
        <input
          id="panel-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30"
        />
      </div>

      {(needsPassword || password) && (
        <div>
          <label htmlFor="panel-password" className="block text-sm font-medium text-coffee mb-1.5">
            Contraseña
          </label>
          <input
            id="panel-password"
            type="password"
            required={needsPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30"
          />
          <p className="text-xs text-foreground/50 mt-1">
            Primer ingreso: solo correo. Después de configurar clave, úsala aquí.
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar a mi panel"}
      </button>
    </form>
  );
}
