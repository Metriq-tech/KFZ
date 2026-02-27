'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clientConfig } from '@/lib/client-config';

const navLinks = [
  { label: 'Home', href: 'hero' },
  { label: 'Über Uns', href: 'features' },
  { label: 'Bewertungen', href: 'testimonials' },
  { label: 'Kontakt', href: 'contact' },
];

const serviceLinks = clientConfig.serviceLabels;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll-Spy via IntersectionObserver
  useEffect(() => {
    const ids = ['hero', 'features', 'services', 'testimonials', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Dropdown bei Klick auÃŸerhalb schlieÃŸen
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowServiceDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (id: string) => activeSection === id;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-bold text-xl italic font-display">
              {clientConfig.branding.logoLetter}
            </div>
            <span className="font-display font-bold text-xl tracking-wider">{clientConfig.branding.brandName}</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">

            {/* Normale Links */}
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-brand ${isActive(link.href) ? 'text-brand' : 'text-gray-300'
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full"
                  />
                )}
              </button>
            ))}

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowServiceDropdown((v) => !v)}
                className={`relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-brand ${isActive('services') ? 'text-brand' : 'text-gray-300'
                  }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showServiceDropdown ? 'rotate-180' : ''}`}
                />
                {isActive('services') && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {showServiceDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#111] border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                  >
                    {serviceLinks.map((label) => (
                      <button
                        key={label}
                        onClick={() => { scrollToSection('services'); setShowServiceDropdown(false); }}
                        className="w-full text-left block px-4 py-2.5 text-sm text-gray-300 hover:text-brand hover:bg-white/5 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="ml-2 bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Termin buchen
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {[...navLinks, { label: 'Services', href: 'services' }].map((link) => (
                <button
                  key={link.href}
                  onClick={() => { scrollToSection(link.href); setIsOpen(false); }}
                  className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium transition-colors hover:text-brand hover:bg-gray-900 ${isActive(link.href) ? 'text-brand' : 'text-gray-300'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                className="w-full mt-2 bg-brand hover:bg-brand-dark text-white px-4 py-3 rounded-xl text-base font-medium transition-colors"
              >
                Termin buchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
