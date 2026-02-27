/* ─────────────────────────────────────────────
 *  client-config.ts – Hansa Autoreparatur
 *  Auto-generiert aus KFZ-Leads CSV
 * ───────────────────────────────────────────── */

import type { ClientConfig } from '../../Template/lib/client-config';

export const clientConfig: ClientConfig = {

    branding: {
        logoLetter: 'H',
        brandName: 'HANSA',
        fullName: 'Hansa Autoreparatur',
        logoImage: '/images/logo.png',
    },

    contact: {
        email: 'info@hansa-autoreparatur.de',
        phone: '+49 40 232428',
        phoneDisplay: '+49 40 232428',
        address: 'Heidenkampsweg 171, 20097 Hamburg',
        mapsUrl: 'https://maps.google.com/?q=Heidenkampsweg%20171%2C%2020097%20Hamburg',
    },

    social: {
        facebook: 'https://www.hansa-autoreparatur.de/',
        instagram: '#',
    },

    seo: {
        title: 'Hansa Autoreparatur | Autowerkstatt Hamburg',
        description: 'Hansa Autoreparatur – Ihr Autowerkstatt in Hamburg. Bewertet mit 4.9 von 5 Sternen (256 Bewertungen). Jetzt Termin vereinbaren.',
        keywords: ['Hansa Autoreparatur', 'Autowerkstatt Hamburg', 'KFZ Werkstatt Hamburg', 'Autowerkstatt Hamburg'],
        ogTitle: 'Hansa Autoreparatur – Autowerkstatt Hamburg',
        ogDescription: 'Ihr zuverlässiger Autowerkstatt in Hamburg. 256 positive Bewertungen.',
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
        heroImageAlt: 'Hansa Autoreparatur – Hamburg',
    },

    stats: [
        { value: '256+', label: 'Bewertungen' },
        { value: '4.9 ★', label: 'Google Score' },
        { value: '10+', label: 'Jahre Erfahrung' },
        { value: 'Gratis', label: 'Kostenvoranschlag' },
    ],

    about: {
        badge: 'Über Uns',
        headlinePart1: 'Ihr verlässlicher',
        headlineHighlight: ' Meisterbetrieb',
        headlinePart2: ' in Hamburg',
        description: 'Hansa Autoreparatur ist Ihre zuverlässige KFZ-Werkstatt in Hamburg. Als erfahrener Meisterbetrieb reparieren und warten wir Fahrzeuge aller Hersteller – schnell, transparent und zu fairen Preisen.',
        bulletPoints: ['HU/AU Vorbereitung', 'Festpreisgarantie', 'Kostenloser Kostenvoranschlag', 'Modernste Diagnosetechnik', 'Zertifizierter Meisterbetrieb', 'Original & OEM-Ersatzteile'],
        images: [
            { src: '/images/Werkstatt1.jpg', alt: 'Unsere Werkstatt' },
            { src: '/images/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/images/inspektion.avif', alt: 'Fahrzeuginspektion' },
            { src: '/images/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    services: [
        { title: 'Inspektion & Wartung', description: 'Halten Sie Ihr Fahrzeug in Top-Form mit unserer regelmäßigen Experten-Wartung.', image: '/images/inspektion.avif', iconName: 'wrench' },
        { title: 'HU/AU Vorbereitung', description: 'Wir bereiten Ihr Fahrzeug optimal auf den TÜV vor – zuverlässig bestehen.', image: '/images/Werkstatt1.jpg', iconName: 'shield' },
        { title: 'Klimaanlagen Service', description: 'Bleiben Sie cool mit unserer effizienten Klimaanlagen-Wartung und Reparatur.', image: '/images/klimaanlage1.avif', iconName: 'wind' },
        { title: 'Reifen & Räder', description: 'Professioneller Reifenwechsel, Wuchten und Achsvermessung.', image: '/images/reifenwechsel.avif', iconName: 'disc' },
        { title: 'Motor Diagnose', description: 'Tiefgehende Fehleranalyse mit modernsten Diagnosegeräten.', image: '/images/diagnose.avif', iconName: 'settings' },
        { title: 'Batterie & Elektronik', description: 'Diagnose und Austausch von Batterien und elektronischen Komponenten.', image: '/images/elektrik.avif', iconName: 'battery' }
    ],

    serviceLabels: ['Inspektion & Wartung', 'HU/AU Vorbereitung', 'Klimaanlage', 'Reifen & Räder', 'Motor Diagnose', 'Karosserie'],

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
