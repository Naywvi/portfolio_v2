import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compétences | Nagib Lakhdari - Développeur Full Stack',
    description: 'Visualisation interactive de mes compétences en développement Full Stack et cybersécurité. Explorez mon expertise en TypeScript, Golang, Rust, React, Next.js, Node.js, et bien plus à travers une carte de compétences dynamique.',
    keywords: 'compétences développeur, skill tree, full stack, cybersécurité, TypeScript, Golang, Rust, React, Next.js, Node.js, DevOps, infrastructure, réseau, sécurité informatique, visualisation compétences, portfolio interactif',
    authors: [{ name: 'Nagib Lakhdari' }],
    creator: 'Nagib Lakhdari',
    openGraph: {
        title: 'Compétences | Nagib Lakhdari - Développeur et Ingénieur Cybersécurité',
        description: 'Explorez mes compétences techniques à travers une visualisation interactive. Développement Full Stack, cybersécurité, infrastructure cloud, et plus encore.',
        url: 'https://nlakhdari.fr/skills',
        siteName: 'Nagib Lakhdari Portfolio',
        images: [
            {
                url: 'https://nlakhdari.fr/images/tree.png',
                width: 1200,
                height: 630,
                alt: 'Carte interactive des compétences de Nagib Lakhdari',
            }
        ],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Compétences | Nagib Lakhdari - Développeur Full Stack',
        description: 'Visualisation interactive de mes compétences en développement, cybersécurité et infrastructure.',
        images: ['https://nlakhdari.fr/images/tree.png'],
        creator: '@NagibLakhdari',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://nlakhdari.fr/skills',
    },
};

export default function SkillsLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}