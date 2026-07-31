import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { personalInfo } from '@/data/portfolioData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

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
      </head>
      <body className="font-sans antialiased bg-[#fcfbf9] text-[#27272a] dark:bg-[#0f1218] dark:text-[#f4f4f5] transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
