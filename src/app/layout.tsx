import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { personalInfo } from '@/data/portfolioData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfbf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1218' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://shreeranabhise.vercel.app'),
  title: {
    default: 'Shree Ranabhise | AI Web Developer & Cloud Architecture Engineer',
    template: '%s | Shree Ranabhise',
  },
  description: 'Official portfolio of Shree Ranabhise - AI Web Developer building scalable full-stack web applications, resilient cloud architectures, PostgreSQL databases, and intelligent AI user interfaces.',
  keywords: [
    'Shree Ranabhise',
    'AI Web Developer',
    'Full-Stack Developer',
    'Cloud Architecture Engineer',
    'Next.js Developer',
    'React Developer',
    'TypeScript Engineer',
    'Supabase',
    'PostgreSQL',
    'Prisma ORM',
    'Vercel Deployment',
    'Pune Developer',
  ],
  authors: [{ name: 'Shree Ranabhise', url: 'https://shreeranabhise.vercel.app' }],
  creator: 'Shree Ranabhise',
  publisher: 'Shree Ranabhise',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: 'https://shreeranabhise.vercel.app',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shreeranabhise.vercel.app',
    title: 'Shree Ranabhise | AI Web Developer & Cloud Architecture Engineer',
    description: 'Building scalable, AI-infused web applications and resilient cloud systems that solve real-world business challenges.',
    siteName: 'Shree Ranabhise Portfolio',
    images: [
      {
        url: '/images/shree-profile.jpg',
        width: 800,
        height: 1067,
        alt: 'Shree Ranabhise Profile Photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Ranabhise | AI Web Developer',
    description: 'Building scalable, AI-infused web applications and resilient cloud systems.',
    images: ['/images/shree-profile.jpg'],
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shree Ranabhise',
  jobTitle: 'AI Web Developer & Cloud Architecture Engineer',
  url: 'https://shreeranabhise.vercel.app',
  email: 'mailto:shreeranbhise99@gmail.com',
  telephone: '+918767310550',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'India',
  },
  sameAs: [
    'https://github.com/ShreeRanabhise',
    'https://www.linkedin.com/in/shreeranabhise',
  ],
  knowsAbout: [
    'Full-Stack Web Engineering',
    'SEO & Technical Optimization',
    'Cloud Architecture',
    'Generative AI Integration',
    'JSON-LD Structured Data',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Prisma ORM',
    'Supabase',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Shree Ranabhise Portfolio',
  url: 'https://shreeranabhise.vercel.app',
  author: {
    '@type': 'Person',
    name: 'Shree Ranabhise',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#faf9f5] text-[#18181b] dark:bg-[#0c0f16] dark:text-[#f8fafc] bg-grain transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
