import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoContent } from "./CatalogoContent";

export const metadata: Metadata = {
  title: "Catálogo de café",
  description:
    "Explora nuestro catálogo de café verde, tostado y servicios de maquila. Microlotes colombianos con puntajes SCA de 85+.",
};

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-foreground/60">Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
