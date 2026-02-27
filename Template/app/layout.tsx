import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { clientConfig } from '@/lib/client-config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const { seo, colors } = clientConfig;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    type: 'website',
    locale: seo.locale,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${seo.ogTitle} – Unsere Werkstatt`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* CSS Custom Properties für Farben – ermöglicht Farbwechsel rein über Config */
const colorVars = {
  '--color-primary': colors.primary,
  '--color-primary-hover': colors.primaryHover,
  '--color-primary-light': colors.primaryLight,
  '--color-primary-text': colors.primaryText,
  '--color-dark': colors.dark,
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${outfit.variable}`} style={colorVars}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
