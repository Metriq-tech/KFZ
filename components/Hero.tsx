'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Wrench, Star, Briefcase, Wifi, Disc, Settings, Shield } from 'lucide-react';

/* ── Hotspot-Daten ── */
const hotspots = [
  {
    id: 'reifen',
    label: 'Reifen',
    description: 'Kaufen Sie Reifen aus unserem Produktsortiment und fahren Sie sorgenfrei.',
    image: '/images/Reifen.png',
    icon: Disc,
    // Position relativ zum Auto-Container
    top: '60%',
    left: '28%',
  },
  {
    id: 'motor',
    label: 'Motorhaube',
    description: 'Professionelle Motordiagnose und Reparatur – schnell und zuverlässig.',
    image: '/images/motor.avif',
    icon: Settings,
    top: '48%',
    left: '60%',
  },
  {
    id: 'scheibe',
    label: 'Scheibe',
    description: 'Steinschlag-Reparatur und Scheibentausch – direkt über die Versicherung.',
    image: '/images/Frontscheibe6.png',
    icon: Shield,
    top: '40%',
    left: '46%',
  },
];

export function Hero() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const active = hotspots.find((h) => h.id === activeHotspot) ?? null;

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  useEffect(() => {
    if (!activeHotspot || !gridRef.current || !cardRef.current) {
      setLineCoords(null);
      return;
    }
    const updateLine = () => {
      const grid = gridRef.current!.getBoundingClientRect();
      const card = cardRef.current!.getBoundingClientRect();
      const hotspotEl = gridRef.current!.querySelector(`[data-hotspot="${activeHotspot}"]`);
      if (!hotspotEl) { setLineCoords(null); return; }
      const hs = hotspotEl.getBoundingClientRect();
      setLineCoords({
        x1: card.right - grid.left,
        y1: card.top + card.height / 2 - grid.top,
        x2: hs.left + hs.width / 2 - grid.left,
        y2: hs.top + hs.height / 2 - grid.top,
      });
    };
    // small delay for AnimatePresence to finish
    const t = setTimeout(updateLine, 350);
    window.addEventListener('resize', updateLine);
    return () => { clearTimeout(t); window.removeEventListener('resize', updateLine); };
  }, [activeHotspot]);

  return (
    <section id="hero" style={{ backgroundColor: 'var(--color-dark)' }} className="relative h-screen text-white overflow-hidden pt-20 flex flex-col justify-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-red-900/10 blur-[100px] rounded-full" />
      </div>


      {/* ── Hero Frame Card (wie Referenz-Bild) ── */}
      <div className="container mx-auto px-4 relative z-10 py-4">
        <div
          className="rounded-[2rem] border border-white/20"
          style={{
            background: 'linear-gradient(135deg, rgba(20,20,20,0.85) 0%, rgba(10,10,10,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >

          <div ref={gridRef} className="px-4 pt-4 pb-1 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center relative">

            {/* ── Left Info Card (wechselt je nach Hotspot) ── Desktop Only */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 relative">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl relative group cursor-pointer"
                    ref={cardRef}
                    onClick={() => setActiveHotspot(null)}
                  >
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 rounded-full" />
                    {active.image ? (
                      <div className="relative w-full h-50 mb-3 rounded-2xl overflow-hidden">
                        <Image src={active.image} alt={active.label} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex justify-center mb-3">
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-lg">
                          <active.icon className="w-10 h-10 text-gray-400" />
                        </div>
                      </div>
                    )}
                    <h3 className="text-red-500 font-bold text-lg mb-1">{active.label}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{active.description}</p>

                  </motion.div>
                ) : (
                  /* Default: dezenter Hinweis */
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 rounded-full bg-gray-800/60 flex items-center justify-center border border-gray-700/50">
                        <Disc className="w-8 h-8 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Klicken Sie auf einen roten Punkt am Fahrzeug</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center Content (Car & Title) */}
            <div className="col-span-1 lg:col-span-8 text-center relative">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-display font-bold mb-1 leading-tight"
              >
                Wir behandeln Sie &amp; Ihr Auto <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Wie Familie</span>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-[120%] -ml-[10%] h-[600px] my-0"
              >
                {/* Car Image – z-10 so hotspots (z-30) sit on top */}
                <Image
                  src="/images/rotes_auto5_transparent.png"
                  alt="KFZ Meisterbetrieb Hamburg – Rotes Fahrzeug"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                  className="object-contain drop-shadow-2xl"
                  style={{ zIndex: 10 }}
                  priority
                />

                {/* ── Interaktive Hotspots ── */}
                {hotspots.map((spot) => (
                  <motion.button
                    key={spot.id}
                    aria-label={spot.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: activeHotspot === spot.id ? 1.4 : 1 }}
                    transition={{ delay: 1.0, type: 'spring', stiffness: 300 }}
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    data-hotspot={spot.id}
                    style={{
                      position: 'absolute',
                      top: spot.top,
                      left: spot.left,
                      zIndex: 30,
                      boxShadow: activeHotspot === spot.id
                        ? '0 0 0 8px rgba(220,38,38,0.5), 0 0 20px rgba(220,38,38,0.3)'
                        : '0 0 0 6px rgba(220,38,38,0.35)',
                    }}
                    className="w-4 h-4 bg-red-600 rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform"
                  />
                ))}

                {/* Floor Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/60 blur-3xl" style={{ zIndex: 5 }} />
              </motion.div>


            </div>

            {/* SVG Connector Line – from card to active hotspot */}
            {lineCoords && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block" style={{ zIndex: 40, overflow: 'visible' }}>
                <line
                  x1={lineCoords.x1} y1={lineCoords.y1}
                  x2={lineCoords.x2} y2={lineCoords.y2}
                  stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="6 4"
                />
                <circle cx={lineCoords.x1} cy={lineCoords.y1} r="4" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <circle cx={lineCoords.x2} cy={lineCoords.y2} r="5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
              </svg>
            )}

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
          </div>{/* end grid */}

          {/* Bottom Stats Bar – inside frame */}
          <div className="px-6 pt-0 pb-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <div className="p-2 bg-white/10 rounded-full">
                    <stat.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <div className="text-red-500 font-bold text-base">{stat.value}</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>{/* end frame card */}
      </div>{/* end container */}

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

    </section>
  );
}
