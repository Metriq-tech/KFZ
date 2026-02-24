'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
                <span className="text-red-600">Auto-Probleme</span>
              </h2>
              <p className="text-gray-600">
                Haben Sie Fragen oder müssen Sie einen Service buchen? Unser freundliches Team ist hier, um zu helfen.
                Erreichen Sie uns jederzeit für Anfragen, Termine oder Notfallunterstützung.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:kontakt@kfz-hamburg.de" className="font-medium text-gray-900 hover:text-red-600 transition-colors">kontakt@kfz-hamburg.de</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Telefon</div>
                  <a href="tel:+4940123456789" className="font-medium text-gray-900 hover:text-red-600 transition-colors">+49 40 123 456 78</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Werkstatt Adresse</div>
                  <div className="font-medium text-gray-900">Hauptstraße 12, 20095 Hamburg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-700 rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-2">Kontakt aufnehmen</h3>
            <p className="text-red-100 mb-6 text-sm">Wir sind für Sie da! Wie können wir helfen?</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-red-100 mb-1 uppercase tracking-wider">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full bg-red-800/50 border border-red-600 rounded-lg px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-red-100 mb-1 uppercase tracking-wider">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full bg-red-800/50 border border-red-600 rounded-lg px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-red-100 mb-1 uppercase tracking-wider">Nachricht</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full bg-red-800/50 border border-red-600 rounded-lg px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  placeholder="Wie können wir Ihnen helfen?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-red-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
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
