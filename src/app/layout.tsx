import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import TutorProvider from "@/components/tutor-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OeProfe - Tutor IA para el currículo chileno",
  description: "Plataforma de tutoría IA personalizada adaptada al currículo nacional y la PAES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TutorProvider />
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
