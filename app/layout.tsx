import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FS54 — создание сайтов под ключ",
  description: "Современные сайты за 24 часа. Адаптивный дизайн, индивидуальный проект под ключ.",
  openGraph: {
    title: "FS54 — создание сайтов под ключ",
    description: "Современные сайты за 24 часа. Адаптивный дизайн, индивидуальный проект под ключ.",
    url: "https://www.fs54.ru/",
    siteName: "FS54",
    images: [
      {
        url: "https://www.fs54.ru/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
