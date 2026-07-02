import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const funnel = DM_Sans({
  variable: "--font-funnel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Colombia Green Coffee | Café de especialidad y logística internacional",
    template: "%s | Colombia Green Coffee",
  },
  description:
    "Plataforma integral de café colombiano: café verde, tostado, maquila de marcas premium y marketplace para montar tu propia coffee shop con envíos internacionales.",
  keywords: [
    "café verde colombiano",
    "café de especialidad",
    "logística internacional café",
    "maquila café",
    "coffee shop marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${funnel.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
