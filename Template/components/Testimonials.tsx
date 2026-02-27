'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { clientConfig } from '@/lib/client-config';
import { withPrefix } from '@/lib/asset-prefix';

const testimonials = clientConfig.testimonials;
const gr = clientConfig.googleReviews;

/* ── Google Logo SVG (authentic colors) ── */
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 text-gray-900">
            Kundenstimmen
          </h2>
          <p className="text-gray-500 mb-6">Was unsere zufriedenen Kunden über uns sagen.</p>

          {/* Google Review Badge */}
          {gr && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 sm:px-6 sm:py-4"
            >
              <GoogleLogo size={22} />
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i <= Math.round(gr.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                  {gr.rating.toFixed(1)} / 5,0
                </div>
                <div className="text-gray-500 text-xs leading-tight">
                  {gr.count}+ Bewertungen auf Google
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Review Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Stars + Google logo */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <GoogleLogo size={16} />
              </div>

              <p className="text-gray-600 italic mb-6 flex-1 leading-relaxed">"{testimonial.text}"</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={withPrefix(testimonial.image)}
                    alt={testimonial.name}
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-brand uppercase font-bold tracking-wider">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
