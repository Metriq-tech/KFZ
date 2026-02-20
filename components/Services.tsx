'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Thermometer, Wind, Battery, Wrench, Disc, Settings } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    title: "Periodische Wartung",
    description: "Halten Sie Ihr Fahrzeug in Top-Form mit unserer regelmäßigen Experten-Wartung.",
    icon: Wrench,
    image: "/images/inspektion.avif"
  },
  {
    title: "Kühlsystem Reparatur",
    description: "Wir beheben Lecks, Kühler und sorgen für optimale Motortemperatur.",
    icon: Thermometer,
    image: "/images/karosseriebau.avif"
  },
  {
    title: "Klimaanlagen Service",
    description: "Bleiben Sie cool mit unserer effizienten Klimaanlagen-Wartung und Reparatur.",
    icon: Wind,
    image: "/images/klimaanlage1.avif"
  },
  {
    title: "Batterie & Elektronik",
    description: "Diagnose und Austausch von Batterien und elektronischen Komponenten.",
    icon: Battery,
    image: "/images/elektrik.avif"
  },
  {
    title: "Reifen & Räder",
    description: "Professioneller Reifenwechsel, Wuchten und Achsvermessung.",
    icon: Disc,
    image: "/images/reifenwechsel.avif"
  },
  {
    title: "Motor Diagnose",
    description: "Tiefgehende Fehleranalyse mit modernsten Diagnosegeräten.",
    icon: Settings,
    image: "/images/diagnose.avif"
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">Unsere Services</h2>
          <p className="text-gray-600">
            Bei MEISTER bieten wir ein komplettes Spektrum an Autoservices,
            um Ihr Fahrzeug sicher und effizient auf der Straße zu halten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                  <service.icon className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-red-600 font-medium text-sm hover:gap-3 transition-all group-hover:text-red-700">
                  Mehr lesen <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
