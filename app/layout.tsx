import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://escalealacotiniere.fr"),
  title: "Escale à La Cotinière — Location de villas de charme à Oléron",
  description:
    "Louez une villa de caractère avec piscine à La Cotinière, île d'Oléron. 4 maisons d'exception pour des séjours inoubliables. Réservation en ligne sécurisée.",
  keywords: [
    "location villa La Cotinière",
    "location Oléron",
    "maison vacances Oléron",
    "villa piscine Oléron",
    "séjour île d'Oléron",
  ],
  openGraph: {
    title: "Escale à La Cotinière — Villas de charme à Oléron",
    description:
      "4 villas d'exception avec piscine à La Cotinière, île d'Oléron. Réservez votre séjour en ligne.",
    url: "https://escalealacotiniere.fr",
    siteName: "Escale à La Cotinière",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
