import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";
import LanguageTransition from "@/components/language-transition";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Danzokka — Fullstack & DevOps Engineer",
  description:
    "Rafael Dantas — Fullstack Engineer with DevOps expertise. Building scalable systems end-to-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased dark flex flex-col max-w-screen-2xl items-center w-full mx-auto`}
      >
        <LanguageProvider>
          <LanguageTransition />
          <Header />
          <main className="flex items-center w-full justify-center flex-col gap-4">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
