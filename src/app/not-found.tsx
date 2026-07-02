import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-coffee mb-4">404</h1>
      <p className="text-foreground/70 mb-8">La página que buscas no existe.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
