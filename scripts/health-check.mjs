const base = process.env.HEALTH_CHECK_URL ?? "http://localhost:3000";

async function check(path) {
  const url = `${base}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${path} → ${res.status}`);
  }
  return res.status;
}

async function main() {
  const routes = ["/", "/catalogo", "/tiendas", "/crear-tienda", "/logistica", "/api/health"];
  for (const route of routes) {
    const status = await check(route);
    console.log(`✓ ${route} (${status})`);
  }
}

main().catch((err) => {
  console.error("Health check falló:", err.message);
  process.exit(1);
});
