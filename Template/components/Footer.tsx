'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { clientConfig } from '@/lib/client-config';

export function Footer() {
  const { branding, contact, social, serviceLabels } = clientConfig;

  return (
    <footer style={{ backgroundColor: 'var(--color-dark)' }} className="text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1 – Kontakt */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Kontakt</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href={`mailto:${contact.email}`} className="hover:text-brand transition-colors">{contact.email}</a></li>
              <li><a href={`tel:${contact.phone}`} className="hover:text-brand transition-colors">{contact.phoneDisplay}</a></li>
              <li className="flex gap-4 pt-2">
                {social.linkedin && <Link href={social.linkedin} aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>}
                {social.facebook && <Link href={social.facebook} aria-label="Facebook" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>}
                {social.instagram && <Link href={social.instagram} aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>}
                {social.youtube && <Link href={social.youtube} aria-label="YouTube" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></Link>}
              </li>
            </ul>
          </div>

          {/* Column 2 – Services dynamisch aus Config */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Unsere Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {serviceLabels.map((label) => (
                <li key={label}>
                  <a href="#services" className="hover:text-brand transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Navigation */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Unternehmen</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#hero" className="hover:text-brand transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-brand transition-colors">Über Uns</a></li>
              <li><a href="#services" className="hover:text-brand transition-colors">Services</a></li>
              <li><a href="#testimonials" className="hover:text-brand transition-colors">Bewertungen</a></li>
              <li><a href="#contact" className="hover:text-brand transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Column 4 – Newsletter */}
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
              {branding.logoLetter}
            </div>
            <span className="font-display font-bold text-lg tracking-wider">{branding.fullName}</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {branding.fullName}. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
}
