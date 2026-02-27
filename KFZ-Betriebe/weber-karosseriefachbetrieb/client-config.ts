/* ─────────────────────────────────────────────
 *  client-config.ts – Weber Karosseriefachbetrieb
 *  Auto-generiert aus KFZ-Leads CSV
 * ───────────────────────────────────────────── */

import type { ClientConfig } from '../../Template/lib/client-config';

export const clientConfig: ClientConfig = {

    branding: {
        logoLetter: 'W',
        brandName: 'WEBER',
        fullName: 'Weber Karosseriefachbetrieb',
        logoImage: '/images/logo.png',
    },

    contact: {
        email: 'info@weber-karosserie.de',
        phone: '+49 173 2021422',
        phoneDisplay: '+49 173 2021422',
        address: 'Kunaustraße 35, 22393 Hamburg',
        mapsUrl: 'https://maps.google.com/?q=Kunaustra%C3%9Fe%2035%2C%2022393%20Hamburg',
    },

    social: {
        facebook: 'http://www.weber-karosserie.de/',
        instagram: '#',
    },

    seo: {
        title: 'Weber Karosseriefachbetrieb | Karosseriewerkstatt Hamburg',
        description: 'Weber Karosseriefachbetrieb – Ihr Karosseriewerkstatt in Hamburg. Bewertet mit 4.7 von 5 Sternen (15 Bewertungen). Jetzt Termin vereinbaren.',
        keywords: ['Weber Karosseriefachbetrieb', 'Karosseriewerkstatt Hamburg', 'KFZ Werkstatt Hamburg', 'Autowerkstatt Hamburg'],
        ogTitle: 'Weber Karosseriefachbetrieb – Karosseriewerkstatt Hamburg',
        ogDescription: 'Ihr zuverlässiger Karosseriewerkstatt in Hamburg. 15 positive Bewertungen.',
        ogImage: '/images/Werkstatt3.jpg',
        locale: 'de_DE',
    },

    colors: {
        primary: '#dc2626',
        primaryHover: '#b91c1c',
        primaryLight: '#fee2e2',
        primaryText: '#dc2626',
        dark: '#0a0a0a',
    },

    hero: {
        headlineLine1: 'Wir behandeln Sie & Ihr Auto',
        headlineLine2: 'wie Familie',
        heroImage: '/images/rotes_auto5_transparent.png',
        heroImageAlt: 'Weber Karosseriefachbetrieb – Hamburg',
    },

    stats: [
        { value: '15+', label: 'Bewertungen' },
        { value: '4.7 ★', label: 'Google Score' },
        { value: '10+', label: 'Jahre Erfahrung' },
        { value: 'Gratis', label: 'Kostenvoranschlag' },
    ],

    about: {
        badge: 'Über Uns',
        headlinePart1: 'Ihr Experte für',
        headlineHighlight: ' Karosserie & Lack',
        headlinePart2: ' in Hamburg',
        description: 'Weber Karosseriefachbetrieb steht für professionelle Karosserie- und Lackierarbeiten in Hamburg. Mit modernsten Techniken und höchsten Qualitätsstandards restaurieren wir Ihr Fahrzeug perfekt – von der Smart Repair bis zur Unfallschadensbehebung.',
        bulletPoints: ['Unfallinstandsetzung', 'Lackierung in Erstausrüsterqualität', 'Smart Repair für kleine Schäden', 'Direktabrechnung mit Versicherungen', 'Kostenloser Kostenvoranschlag', 'Zertifizierter Fachbetrieb'],
        images: [
            { src: '/images/Werkstatt1.jpg', alt: 'Unsere Werkstatt' },
            { src: '/images/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/images/inspektion.avif', alt: 'Fahrzeuginspektion' },
            { src: '/images/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    services: [
        { title: 'Unfallinstandsetzung', description: 'Professionelle Reparatur nach Unfallschäden – schnell und zuverlässig.', image: '/images/karosseriebau.avif', iconName: 'shield' },
        { title: 'Lackierarbeiten', description: 'Makellose Lackierungen in Erstausrüsterqualität für alle Fahrzeugtypen.', image: '/images/Werkstatt1.jpg', iconName: 'paintbrush' },
        { title: 'Smart Repair', description: 'Kleine Dellen, Kratzer und Lackschäden schnell und günstig beseitigen.', image: '/images/Werkstatt2.jpg', iconName: 'sparkles' },
        { title: 'Dellenentfernung', description: 'Effiziente Ausbeularbeiten ohne Lackierung – preserve den Originalwert.', image: '/images/Werkstatt3.jpg', iconName: 'wrench' },
        { title: 'Glasreparatur', description: 'Steinschlagreparatur und Scheibentausch – direkt über die Versicherung.', image: '/images/Frontscheibe6.png', iconName: 'square' },
        { title: 'Achsvermessung', description: 'Präzise Spureinstellung für optimale Fahrstabilität und Reifenschonung.', image: '/images/diagnose.avif', iconName: 'settings' }
    ],

    serviceLabels: ['Karosserie', 'Lackierung', 'Smart Repair', 'Dellen', 'Glasreparatur', 'Achsvermessung'],

    testimonials: [
        {
            name: 'Helena Schmidt',
            role: 'Kundin',
            text: 'Schnell, freundlich und zuverlässig! Sehr empfehlenswert!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Markus Weber',
            role: 'Stammkunde',
            text: 'Professioneller Service mit ehrlichen Preisen. Ich komme immer wieder.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Julia Meyer',
            role: 'Kundin',
            text: 'Top Werkstatt, faire Preise und super freundliches Team!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
        },
    ],

    hotspots: [
        { id: 'reifen', label: 'Reifen', description: 'Kaufen Sie Reifen aus unserem Produktsortiment und fahren Sie sorgenfrei.', image: '/images/Reifen.png', top: '60%', left: '28%', iconName: 'disc' },
        { id: 'motor', label: 'Motor', description: 'Professionelle Motordiagnose und Reparatur – schnell und zuverlässig.', image: '/images/motor.avif', top: '48%', left: '60%', iconName: 'settings' },
        { id: 'scheibe', label: 'Scheibe', description: 'Steinschlag-Reparatur und Scheibentausch – direkt über die Versicherung.', image: '/images/Frontscheibe6.png', top: '40%', left: '46%', iconName: 'shield' },
    ],
};
