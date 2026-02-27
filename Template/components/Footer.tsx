'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { clientConfig } from '@/lib/client-config';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-dark)' }} className="text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1 */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Kontakt</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href={`mailto:${clientConfig.contact.email}`} className="hover:text-brand transition-colors">{clientConfig.contact.email}</a></li>
              <li className="flex gap-4">
                <Link href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
                <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Unsere Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-brand transition-colors">Periodische Wartung</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Kühlsystem Reparatur</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Klimaanlagen Service</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Lackierung & Politur</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Unternehmen</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-brand transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Über Uns</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Services</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Newsletter abonnieren</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                aria-label="E-Mail für Newsletter"
                placeholder="Ihre Email Adresse"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand w-full"
              />
              <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Abo
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-bold text-sm italic font-display">
              {clientConfig.branding.logoLetter}
            </div>
            <span className="font-display font-bold text-lg tracking-wider">{clientConfig.branding.fullName}</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {clientConfig.branding.fullName}. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
}
