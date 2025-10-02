import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import { temasCarta } from "@/features/carta/constantes/temasCarta";
import { fuentesRegistradas } from "@/ui/tipografia/nixxFuentes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nixx resto",
  description:
    "Carta Nixx resto.",
  keywords: [
    "nixx",
    "carta",
    "bar nocturno",
    "menu digital",
    "cocteles",
    "nextjs",
  ],
  applicationName: "Nixx",
  authors: [{ name: "Nixx" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const temaPorDefecto = temasCarta[0];

  const variablesTema = (temaPorDefecto?.variables ?? {}) satisfies Record<string, string>;

  const clasesFuentesLocales = fuentesRegistradas
    .map((fuente) => fuente.className)
    .join(" ");

  const clasesVariablesFuentes = fuentesRegistradas
    .map((fuente) => fuente.variable)
    .join(" ");

  const clasesInicialesTema = Object.entries(variablesTema)
    .filter(([clave]) => clave.endsWith("-clase"))
    .map(([, valor]) => valor)
    .join(" ");

  const clasesHtmlIniciales = [
    "h-full",
    clasesInicialesTema,
    clasesFuentesLocales,
    clasesVariablesFuentes,
  ]
    .filter((valor) => valor.length > 0)
    .join(" ");

  return (
    <html lang="es" className={clasesHtmlIniciales} style={variablesTema as CSSProperties}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen fondo-gradiente relative overflow-x-hidden carta-interactiva`}
      >
        {children}
      </body>
    </html>
  );
}
