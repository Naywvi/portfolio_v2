import "~/styles/globals.css";
import "~/styles/customScrollbar.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Nagib Lakhdari - Portfolio",
  description: "Passionné par le développement, je conçois des applications performantes et accessibles. Je m’intéresse à la sécurité et aux bonnes pratiques pour créer des solutions fiables. Curieux, j’explore sans cesse de nouvelles approches. Et j’aime les oiseaux.",
  icons: [{ url: "/swirl.svg", rel: "icon" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} dark`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
