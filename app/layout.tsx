import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="ru">
      <body className={`${inter.variable} ${unbounded.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
