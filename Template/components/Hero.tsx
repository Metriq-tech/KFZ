'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Wrench, Star, Disc, Settings, Shield, Clock, Gift, ThumbsUp, Tag, Layers } from 'lucide-react';
import { clientConfig } from '@/lib/client-config';
import { withPrefix } from '@/lib/asset-prefix';
import type { ComponentType } from 'react';

/* ── Icon-Mapping (Stats + Hotspots) ── */
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  wrench: Wrench, star: Star, disc: Disc, settings: Settings, shield: Shield,
  clock: Clock, gift: Gift, thumbsup: ThumbsUp, tag: Tag, layers: Layers,
};

/* ── Hotspot-Daten aus Config ── */
const hotspots = clientConfig.hotspots.map((h) => ({
  ...h,
  icon: iconMap[h.iconName] ?? Wrench,
}));

export function Hero() {
  const [activeHotspot, setActiveHotspot] = useState<string>(clientConfig.hotspots[0]?.id || '');
  const active = hotspots.find((h) => h.id === activeHotspot)!;

  // Responsive car zoom: 1.3 on desktop, 1.0 on mobile (no overflow)
  const [carScale, setCarScale] = useState(1);
  useEffect(() => {
    const update = () => setCarScale(window.innerWidth >= 1024 ? 1.3 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!gridRef.current || !cardRef.current) {
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
    const delay = isFirstMount.current ? 1300 : 350;
    isFirstMount.current = false;
    const t = setTimeout(updateLine, delay);
    window.addEventListener('resize', updateLine);
    return () => { clearTimeout(t); window.removeEventListener('resize', updateLine); };
  }, [activeHotspot]);

  return (
    <section id="hero" style={{ backgroundColor: 'var(--color-dark)' }} className="relative min-h-screen text-white pt-20 flex flex-col justify-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-dark/20 blur-[60px] lg:blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-brand-dark/10 blur-[50px] lg:blur-[100px] rounded-full" />
      </div>

      {/* ── Hero Frame Card ── */}
      <div className="container mx-auto px-4 relative z-10 py-4">
        <div
          className="rounded-xl sm:rounded-[2rem] border border-white/20"
          style={{
            background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
            backdropFilter: carScale === 1 ? 'none' : 'blur(20px)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >
          <div ref={gridRef} className="px-2 sm:px-4 pt-4 pb-1 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center relative">

            {/* ── Left Info Card (Hotspot) ── Desktop Only */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl relative"
                  ref={cardRef}
                >
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand rounded-full" />
                  {active.image ? (
                    <div className="relative w-full h-50 mb-3 rounded-2xl overflow-hidden">
                      <Image src={withPrefix(active.image)} alt={active.label} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex justify-center mb-3">
                      <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-lg">
                        <active.icon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                  )}
                  <h3 className="text-brand font-bold text-lg mb-1">{active.label}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{active.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Content (Car & Title) */}
            <div className="col-span-1 lg:col-span-8 text-center relative">
              <motion.h1
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ willChange: 'transform, opacity' }}
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1 leading-tight"
              >
                {clientConfig.hero.headlineLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{clientConfig.hero.headlineLine2}</span>
              </motion.h1>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{ willChange: 'transform, opacity' }}
                className="lg:hidden mb-3 flex gap-3"
              >
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 min-h-[44px] bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-lg cursor-pointer"
                >
                  Termin buchen
                </button>
                <a
                  href={`tel:${clientConfig.contact.phone}`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors text-sm cursor-pointer px-4 font-medium"
                >
                  Anrufen
                </a>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: carScale, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ willChange: 'transform, opacity' }}
                className="relative w-full h-[280px] sm:h-[380px] lg:h-[600px] my-0 lg:w-[120%] lg:-ml-[10%]"
              >
                <Image
                  src={withPrefix(clientConfig.hero.heroImage)}
                  alt={clientConfig.hero.heroImageAlt}
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
                    onClick={() => setActiveHotspot(spot.id)}
                    data-hotspot={spot.id}
                    style={{
                      position: 'absolute',
                      top: spot.top,
                      left: spot.left,
                      zIndex: 30,
                      boxShadow: activeHotspot === spot.id
                        ? `0 0 0 8px color-mix(in srgb, var(--color-primary) 50%, transparent), 0 0 20px color-mix(in srgb, var(--color-primary) 30%, transparent)`
                        : `0 0 0 6px color-mix(in srgb, var(--color-primary) 35%, transparent)`,
                    }}
                    className="hidden sm:block w-4 h-4 bg-brand rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform"
                  />
                ))}

                {/* Floor Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/60 blur-3xl" style={{ zIndex: 5 }} />
              </motion.div>
            </div>

            {/* SVG Connector Line */}
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
              {/* Services List – dynamisch aus Config */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl"
              >
                <div className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  Auto Services
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  {clientConfig.serviceLabels.slice(0, 5).map((label) => (
                    <li key={label} className="hover:text-white cursor-pointer transition-colors">{label}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Booking Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-[#1a1a1a] border border-white/10 p-5 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand/20 blur-2xl rounded-full" />
                <h4 className="text-brand font-bold mb-2">Termin sichern</h4>
                <p className="text-gray-400 text-xs mb-4">
                  Buchen Sie jetzt Ihren Service und vermeiden Sie Wartezeiten!
                </p>
                <button className="w-full bg-brand hover:bg-brand-dark text-white text-sm font-bold py-2 rounded-xl transition-colors shadow-lg shadow-brand-dark/20 cursor-pointer">
                  Termin Buchen
                </button>
              </motion.div>
            </div>
          </div>{/* end grid */}

          {/* Bottom Stats Bar */}
          <div className="px-2 sm:px-6 pt-0 pb-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {clientConfig.stats.map((stat, index) => {
                const StatIcon = iconMap[stat.iconName] ?? Wrench;
                return (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                    className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-2 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="p-2 bg-white/10 rounded-full">
                      <StatIcon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <div className="text-brand font-bold text-base">{stat.value}</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>{/* end frame card */}
      </div>{/* end container */}

      {/* Mobile Cards Strip */}
      <div className="lg:hidden container mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* Services Mini-Card – dynamisch */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/80 border border-white/10 p-4 rounded-2xl"
          >
            <div className="bg-brand text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
              Services
            </div>
            <ul className="space-y-1 text-sm text-gray-400">
              {clientConfig.serviceLabels.slice(0, 4).map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </motion.div>

          {/* Termin-Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand/20 blur-2xl rounded-full" />
            <div>
              <h4 className="text-brand font-bold mb-1 text-sm">Termin sichern</h4>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">Kein Warten &mdash; direkt buchen!</p>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full min-h-[44px] bg-brand hover:bg-brand-dark text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
            >
              Termin buchen
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
