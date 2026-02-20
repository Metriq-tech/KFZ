import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'KFZ-Meisterbetrieb Hamburg | MEISTER – Ihre Werkstatt mit Festpreisen',
  description:
    'MEISTER KFZ-Meisterbetrieb Hamburg: Ölwechsel, Reifenwechsel, Klimaservice, HU/AU und mehr. Online Terminbuchung. Transparente Festpreise. Über 20 Jahre Erfahrung.',
  keywords: [
    'KFZ Werkstatt Hamburg',
    'Autowerkstatt Hamburg',
    'KFZ Meisterbetrieb',
    'Ölwechsel Hamburg',
    'Reifenwechsel Hamburg',
    'HU AU Hamburg',
    'Online Terminbuchung Werkstatt',
    'Festpreise Werkstatt',
  ],
  openGraph: {
    title: 'MEISTER KFZ-Meisterbetrieb Hamburg',
    description:
      'Ihre vertrauenswürdige KFZ-Werkstatt in Hamburg. Online buchbar, faire Festpreise, über 20 Jahre Erfahrung.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
