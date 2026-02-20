'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export function Features() {
  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold uppercase tracking-wide">
              Über Uns
            </div>
            <h2 className="text-4xl font-display font-bold leading-tight">
              Die erfolgreichsten Werkstätten in Hamburg haben eines gemeinsam.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ihre Website arbeitet FÜR sie – mit Festpreisen, Online-Terminbuchung, Google-Bewertungen und echten Fotos.
              Die Werkstätten mit wenigen Reviews haben Websites von 2010 oder solche, die gar nicht laden.
              Wir bringen Ihre Präsenz auf das Niveau der Top-Player.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Online Terminbuchung",
                "Transparente Festpreise",
                "Echte Kundenbewertungen",
                "Modernste Diagnose",
                "Zertifizierte Experten",
                "Original Ersatzteile"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-red-600/20">
              Mehr Erfahren
            </button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/Werkstatt1.jpg"
                    alt="Unsere Werkstatt"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    loading="lazy"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/Nahaufnahme1.avif"
                    alt="Detailarbeit am Fahrzeug"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    loading="lazy"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/inspektion.avif"
                    alt="Fahrzeuginspektion"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    loading="lazy"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/Werkstatt2.jpg"
                    alt="Werkstatt Innenansicht"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    loading="lazy"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
