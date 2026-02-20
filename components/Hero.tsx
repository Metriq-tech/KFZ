'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Wrench, Star, Briefcase, Wifi, ChevronLeft, ChevronRight, Disc } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: 'var(--color-dark)' }} className="relative min-h-screen text-white overflow-hidden pt-20 flex flex-col justify-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-red-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-12">

        {/* Left Floating Card (Tyres) - Desktop Only */}
        <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative group hover:bg-white/10 transition-colors"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 rounded-full" />
            <div className="flex justify-center mb-4">
              {/* Tyre Icon/Image Placeholder */}
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-lg">
                <Disc className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-red-500 font-bold text-lg mb-1">Reifen</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Kaufen Sie Reifen aus unserem Produktsortiment und fahren Sie sorgenfrei.
            </p>

            {/* Connector Line → docks to rear-tyre hotspot on car */}
            <div className="absolute right-[-105%] top-[77%] w-[105%] h-[1px] bg-red-600/60 hidden xl:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg shadow-red-900/50" />
            </div>
          </motion.div>
        </div>

        {/* Center Content (Car & Title) */}
        <div className="col-span-1 lg:col-span-8 text-center relative">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight"
          >
            Wir behandeln Sie & Ihr Auto <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Wie Familie</span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full aspect-[16/9] max-h-[500px] mx-auto my-8"
          >
            {/* Car Image */}
            <Image
              src="/images/rotes_auto5_kopie.jpg"
              alt="KFZ Meisterbetrieb Hamburg – Rotes Fahrzeug"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
              className="object-contain drop-shadow-2xl z-10"
              priority
            />

            {/* Hotspots on Car – re-kalibriert nach Screenshot */}
            {/* Dach über Fahrersitz */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
              className="absolute top-[44%] left-[52%] w-4 h-4 bg-red-600 rounded-full border-2 border-white z-20 pointer-events-none"
              style={{ boxShadow: '0 0 0 5px rgba(220,38,38,0.3)' }}
            />
            {/* Fronthaube / Motorraum */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
              className="absolute top-[54%] left-[66%] w-4 h-4 bg-red-600 rounded-full border-2 border-white z-20 pointer-events-none"
              style={{ boxShadow: '0 0 0 5px rgba(220,38,38,0.3)' }}
            />
            {/* Hinterer Reifen – Connector-Ziel */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }}
              className="absolute top-[75%] left-[30%] w-4 h-4 bg-red-600 rounded-full border-2 border-white z-20 pointer-events-none"
              style={{ boxShadow: '0 0 0 5px rgba(220,38,38,0.3)' }}
            />

            {/* Floor Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/60 blur-3xl -z-10" />
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button aria-label="Vorheriges Bild" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button aria-label="Nächstes Bild" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Floating Cards - Desktop Only */}
        <div className="hidden lg:flex lg:col-span-2 flex-col gap-6 justify-center">
          {/* Services List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl"
          >
            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              Auto Services
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Ölwechsel</li>
              <li className="hover:text-white cursor-pointer transition-colors">Getriebe</li>
              <li className="hover:text-white cursor-pointer transition-colors">Reifenwechsel</li>
              <li className="hover:text-white cursor-pointer transition-colors">Klimaservice</li>
              <li className="hover:text-white cursor-pointer transition-colors">Diagnose</li>
            </ul>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[#1a1a1a] border border-white/10 p-5 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 blur-2xl rounded-full" />
            <h4 className="text-red-500 font-bold mb-2">Termin sichern</h4>
            <p className="text-gray-400 text-xs mb-4">
              Buchen Sie jetzt Ihren Service und vermeiden Sie Wartezeiten!
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 rounded-xl transition-colors shadow-lg shadow-red-900/20">
              Termin Buchen
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Cards Strip – nur auf Mobile/Tablet sichtbar */}
      <div className="lg:hidden container mx-auto px-4 pb-6">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
          {/* Services Mini-Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-shrink-0 snap-start bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[200px]"
          >
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
              Auto Services
            </div>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Ölwechsel</li>
              <li>Reifenwechsel</li>
              <li>Klimaservice</li>
              <li>Diagnose</li>
            </ul>
          </motion.div>

          {/* Termin-Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex-shrink-0 snap-start bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl min-w-[200px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/20 blur-2xl rounded-full" />
            <h4 className="text-red-500 font-bold mb-1 text-sm">Termin sichern</h4>
            <p className="text-gray-400 text-xs mb-3">Kein Warten – direkt online buchen!</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded-xl transition-colors">
              Termin Buchen
            </button>
          </motion.div>

          {/* Reifen-Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex-shrink-0 snap-start bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[160px]"
          >
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 mx-auto mb-3">
              <Disc className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-red-500 font-bold text-sm mb-1 text-center">Reifen</h3>
            <p className="text-gray-400 text-xs text-center">Große Auswahl & Montage</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Wrench, value: "40+", label: "Werkstätten" },
            { icon: Star, value: "20+", label: "Jahre Erfahrung" },
            { icon: Briefcase, value: "14+", label: "Services" },
            { icon: Wifi, value: "Gratis", label: "WLAN & Kaffee" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="p-3 bg-white/10 rounded-full">
                <stat.icon className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <div className="text-red-500 font-bold text-lg">{stat.value}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
