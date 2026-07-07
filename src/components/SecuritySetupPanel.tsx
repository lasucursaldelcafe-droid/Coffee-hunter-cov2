"use client";

import { useState } from "react";

interface SecuritySetupProps {
  slug: string;
  token: string;
  hasPassword: boolean;
  emailVerified: boolean;
  email: string;
  onComplete: () => void;
}

export function SecuritySetupPanel({
  slug,
  token,
  hasPassword,
  emailVerified,
  email,
  onComplete,
}: SecuritySetupProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (hasPassword && emailVerified) return null;

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Mínimo 8 caracteres");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/panel/${slug}/seguridad`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Store-Token": token },
        body: JSON.stringify({ password, confirmPassword: confirm }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMessage("Contraseña configurada");
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestVerification = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/panel/${slug}/seguridad`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Store-Token": token },
        body: JSON.stringify({ action: "request_email_verification" }),
      });
      const data = (await res.json()) as { verificationUrl?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Error");
      setVerificationUrl(data.verificationUrl ?? "");
      setMessage("Enlace de verificación generado. Ábrelo para confirmar tu correo.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="font-display text-lg font-bold text-coffee">Configura tu acceso</h2>
        <p className="text-sm text-foreground/70 mt-1">
          Primer ingreso sin contraseña. Después debes asignar clave y verificar <strong>{email}</strong>.
        </p>
      </div>

      {!hasPassword && (
        <form onSubmit={handleSetPassword} className="space-y-3 max-w-md">
          <h3 className="font-semibold text-coffee text-sm">Crear contraseña</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nueva contraseña (mín. 8)"
            className="w-full px-4 py-2.5 rounded-xl border border-cream bg-white"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-2.5 rounded-xl border border-cream bg-white"
          />
          <button type="submit" disabled={loading} className="px-5 py-2 bg-coffee text-white rounded-full text-sm font-semibold">
            Guardar contraseña
          </button>
        </form>
      )}

      {!emailVerified && (
        <div className="space-y-3 max-w-lg">
          <h3 className="font-semibold text-coffee text-sm">Verificar correo</h3>
          <button
            type="button"
            onClick={handleRequestVerification}
            disabled={loading}
            className="px-5 py-2 border border-coffee text-coffee rounded-full text-sm font-semibold"
          >
            Generar enlace de verificación
          </button>
          {verificationUrl && (
            <div className="text-xs bg-white p-3 rounded-xl border border-cream break-all">
              <p className="text-foreground/60 mb-1">Abre este enlace (simula el correo):</p>
              <a href={verificationUrl} className="text-green font-semibold hover:underline">{verificationUrl}</a>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green">{message}</p>}
    </div>
  );
}
