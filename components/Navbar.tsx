'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-xl italic font-display">
                M
              </div>
              <span className="font-display font-bold text-xl tracking-wider">MEISTER</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Auto Services <ChevronDown className="w-4 h-4" />
                </button>
                {/* Dropdown would go here */}
              </div>
              <Link href="#collision" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Collision Center
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Locations <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <Link href="#contact" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
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
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-900">Home</Link>
              <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-900">Auto Services</Link>
              <Link href="#collision" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-900">Collision Center</Link>
              <Link href="#locations" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-900">Locations</Link>
              <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-900">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
