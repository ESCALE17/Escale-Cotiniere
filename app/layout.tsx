import type { Metadata } from "next";
import Script from "next/script";
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
    "Villa de caractère avec piscine chauffée à La Cotinière, île d'Oléron. Réservation en direct avec le propriétaire.",
  keywords: [
    "location villa La Cotinière",
    "location Oléron",
    "maison vacances Oléron",
    "villa piscine chauffée Oléron",
    "location directe propriétaire Oléron",
    "séjour île d'Oléron",
  ],
  verification: {
    google: "DuuBQMGgpOgq2fQDu6kluLmtM8SGQ1fW9f-U3JqSdrQ",
  },
  openGraph: {
    title: "Escale à La Cotinière — Villas de charme à Oléron",
    description:
      "4 villas d'exception avec piscine chauffée à Oléron. Réservation en direct avec le propriétaire.",
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18315450126" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-18315450126');`}</Script>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
