import type { Metadata } from "next";
import { Archivo, Big_Shoulders, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { BootProvider } from "@/contexts/boot-context";
import { WipeProvider } from "@/contexts/wipe-context";
import { HudCursor } from "@/components/site/hud-cursor";

// dan_the_dev type roles: Plex for text, JetBrains Mono for HUD/meta, Archivo condensed for posters,
// Big Shoulders for big numbers.
const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin", "latin-ext"], weight: ["400", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "latin-ext"] });
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
});
const bigShoulders = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin", "latin-ext"], axes: ["opsz"], adjustFontFallback: false });

export const metadata: Metadata = {
  title: "Rafael Dantas — DevOps Engineer",
  description:
    "Engenheiro DevOps e um dos arquitetos de infraestrutura da Citiesoft: Kubernetes, GitOps, observabilidade, Rust e Go.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${plex.variable} ${jetbrains.variable} ${archivo.variable} ${bigShoulders.variable}`}>
      <body className="bg-ink">
        <LanguageProvider>
          <BootProvider>
            <WipeProvider>
              {children}
              <HudCursor />
            </WipeProvider>
          </BootProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
