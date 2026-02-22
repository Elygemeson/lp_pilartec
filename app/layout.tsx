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
  title: "Pilar Tec | Criação de Software, Sistemas e Landing Pages",
  description:
    "Empresa de criação de software: nossos SaaS, sistemas sob medida e landing pages. Marcas que confiam no nosso trabalho.",
  openGraph: {
    title: "Pilar Tec | Criação de Software, Sistemas e Landing Pages",
    description:
      "Empresa de criação de software: nossos SaaS, sistemas sob medida e landing pages.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
