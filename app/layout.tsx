import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Soroban — Ábaco japonês",
  description: "Ábaco japonês interativo com exercícios de treino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex items-center justify-center gap-6 border-b px-4 py-3">
          <Link href="/" className="text-sm font-medium hover:underline">
            Ábaco
          </Link>
          <Link href="/treino" className="text-sm font-medium hover:underline">
            Treino
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
