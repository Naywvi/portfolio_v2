import "~/styles/globals.css";
import "~/styles/customScrollbar.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";

export const metadata = {
  title: 'Nagib Lakhdari - Développeur Full Stack | Portfolio',
  description: 'Développeur Full Stack et ingénieur cybersécurité, Typescript, Golang, Rust, Next.js, Node.js. Découvrez mes projets et compétences en développement web moderne. Ainsi que mes services en cybersécurité.',
  keywords: 'développeur Full Stack et ingénieur cybersécurité, Typescript, full stack, react, nextjs, nodejs, portfolio, nagib lakhdari, projets, développement web, applications web, javascript, css, html, mongodb, sql, express, tailwindcss, prisma, docker, kubernetes, aws, azure, gcp, ci/cd, microservices, graphql, rest api',
  authors: [{ name: 'Nagib Lakhdari' }],
  creator: 'Nagib Lakhdari',
  openGraph: {
    title: 'Nagib Lakhdari - Développeur et ingénieur cybersécurité',
    description: 'Portfolio développeur et ingénieur cybersécurité - Projets en React, Next.js, Node.js, typescript, golang, rust et plus.',
    url: 'https://nlakhdari.fr',
    siteName: 'Nagib Lakhdari Portfolio',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/v2/D4E03AQH5OvR7SptLMQ/profile-displayphoto-scale_200_200/B4EZmADSaTIQAY-/0/1758789970574?e=1761782400&v=beta&t=Na_2mL9qEVYeBbMuDJ2oCTeTkO7jNMoG_i8LM4Idbso',
        width: 1200,
        height: 630,
        alt: 'Nagib Lakhdari Portfolio',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nagib Lakhdari - Développeur et ingénieur cybersécurité',
    description: 'Portfolio développeur et ingénieur cybersécurité - Projets en React, Next.js, Node.js, typescript, golang, rust et plus.',
    images: ['https://media.licdn.com/dms/image/v2/D4E03AQH5OvR7SptLMQ/profile-displayphoto-scale_200_200/B4EZmADSaTIQAY-/0/1758789970574?e=1761782400&v=beta&t=Na_2mL9qEVYeBbMuDJ2oCTeTkO7jNMoG_i8LM4Idbso'],
  },
}

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
