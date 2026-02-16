import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chronovoyage | Agence de Voyage Temporel de Luxe",
  description:
    "Vivez l'Histoire en personne. Expéditions temporelles de luxe vers les moments les plus extraordinaires de l'humanité.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#0d0f14",
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
