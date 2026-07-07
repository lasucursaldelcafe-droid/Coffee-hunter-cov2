interface StoreWelcomeEmailParams {
  to: string;
  ownerName: string;
  storeName: string;
  panelUrl: string;
  storeUrl: string;
}

function getAppBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export function buildStoreUrls(slug: string): { panelUrl: string; storeUrl: string } {
  const base = getAppBaseUrl();
  return {
    panelUrl: `${base}/panel/${slug}`,
    storeUrl: `${base}/tiendas/${slug}`,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendStoreWelcomeEmail(
  params: StoreWelcomeEmailParams,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY no configurada — correo de bienvenida omitido");
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  const from =
    process.env.EMAIL_FROM ?? "Colombia Green Coffee <onboarding@resend.dev>";

  const ownerName = escapeHtml(params.ownerName);
  const storeName = escapeHtml(params.storeName);
  const panelUrl = escapeHtml(params.panelUrl);
  const storeUrl = escapeHtml(params.storeUrl);

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h1 style="color: #2d5016; font-size: 24px;">¡Tu coffee shop está lista!</h1>
      <p>Hola <strong>${ownerName}</strong>,</p>
      <p>
        <strong>${storeName}</strong> ya está activa en Colombia Green Coffee.
        Tus productos aparecerán en el catálogo principal cuando los publiques desde tu panel.
      </p>
      <div style="margin: 24px 0; padding: 20px; background: #f5f0e8; border-radius: 12px;">
        <p style="margin: 0 0 12px; font-weight: 600;">Enlaces importantes:</p>
        <p style="margin: 8px 0;">
          <a href="${panelUrl}" style="color: #2d5016;">Panel de administración</a>
        </p>
        <p style="margin: 8px 0;">
          <a href="${storeUrl}" style="color: #2d5016;">Tu tienda pública</a>
        </p>
      </div>
      <p style="font-size: 14px; color: #666;">
        Modelo: comisión del 8% solo cuando concretas una venta. Sin cuota mensual.
      </p>
      <p style="font-size: 14px; color: #666;">
        ¿Preguntas? Escríbenos a ${escapeHtml(process.env.MAIN_EMAIL ?? "lasucursaldelcafe@gmail.com")}
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: `¡${params.storeName} está lista en Colombia Green Coffee!`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[email] Resend error:", res.status, body);
      return { sent: false, error: `Resend ${res.status}` };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] Failed to send welcome email:", message);
    return { sent: false, error: message };
  }
}
