import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projets | Nagib Lakhdari - Développeur Full Stack',
    description: 'Découvrez mes projets de développement web et cybersécurité. Applications Full Stack en TypeScript, React, Next.js, Node.js, Golang et Rust. Solutions innovantes en infrastructure cloud et sécurité informatique.',
    keywords: 'projets développeur, portfolio projets, full stack projects, applications web, TypeScript, React, Next.js, Node.js, Golang, Rust, cybersécurité, DevOps, infrastructure cloud, APIs REST, microservices, Docker, Kubernetes',
    authors: [{ name: 'Nagib Lakhdari' }],
    creator: 'Nagib Lakhdari',
    openGraph: {
        title: 'Projets | Nagib Lakhdari - Portfolio Développeur Full Stack',
        description: 'Explorez mes réalisations : applications web modernes, solutions de cybersécurité, et projets d\'infrastructure cloud. Technologies : TypeScript, React, Next.js, Golang, Rust.',
        url: 'https://nlakhdari.fr/projects',
        siteName: 'Nagib Lakhdari Portfolio',
        images: [
            {
                url: 'https://nlakhdari.fr/images/projects-preview.png',
                width: 1200,
                height: 630,
                alt: 'Aperçu des projets de Nagib Lakhdari',
            }
        ],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projets | Nagib Lakhdari - Développeur Full Stack',
        description: 'Découvrez mes projets : applications web, cybersécurité et infrastructure cloud.',
        images: ['https://nlakhdari.fr/images/projects-preview.png'],
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
        canonical: 'https://nlakhdari.fr/projects',
    },
};

export default function ProjectsLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}