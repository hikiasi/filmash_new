import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Филмаш - Каталог автомобилей",
  description: "Интерактивный каталог и конфигуратор автомобилей от компании Филмаш.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="!scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.variable} ${unbounded.variable}`}>
        <Providers>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
