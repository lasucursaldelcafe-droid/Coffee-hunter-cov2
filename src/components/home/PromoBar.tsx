import Link from "next/link";

export function PromoBar() {
  return (
    <div className="bg-coffee text-white text-center text-sm py-2.5 px-4">
      <Link href="/crear-tienda" className="hover:underline underline-offset-2">
        <span className="font-semibold">Comisión 8% por venta</span>
        <span className="hidden sm:inline"> · sin suscripción mensual · crea tu coffee shop gratis</span>
        <span className="sm:hidden"> · crea tu tienda gratis</span>
      </Link>
    </div>
  );
}
