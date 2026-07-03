import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Programa Operativo — Logística",
  description: "Solicitudes logísticas empresariales — La Sucursal del Café",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
