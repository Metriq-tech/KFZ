'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { clientConfig } from '@/lib/client-config';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">
                Diskutieren Sie Ihre <br />
                <span className="text-brand">Auto-Probleme</span>
              </h2>
              <p className="text-gray-600">
                Haben Sie Fragen oder müssen Sie einen Service buchen? Unser freundliches Team ist hier, um zu helfen.
                Erreichen Sie uns jederzeit für Anfragen, Termine oder Notfallunterstützung.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href={`mailto:${clientConfig.contact.email}`} className="font-medium text-gray-900 hover:text-brand transition-colors">{clientConfig.contact.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Telefon</div>
                  <a href={`tel:${clientConfig.contact.phone}`} className="font-medium text-gray-900 hover:text-brand transition-colors">{clientConfig.contact.phoneDisplay}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Werkstatt Adresse</div>
                  <div className="font-medium text-gray-900">{clientConfig.contact.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-dark rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-2">Kontakt aufnehmen</h3>
            <p className="text-white/70 mb-6 text-sm">Wir sind für Sie da! Wie können wir helfen?</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full bg-brand-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full bg-brand-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Nachricht</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full bg-brand-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  placeholder="Wie können wir Ihnen helfen?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-brand-dark font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Lösung Anfordern <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
