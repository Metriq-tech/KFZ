/* ─────────────────────────────────────────────
 *  client-config.ts – Smart Repair Center Autolack Doc
 *  Auto-generiert aus KFZ-Leads CSV
 * ───────────────────────────────────────────── */

import type { ClientConfig } from '../../Template/lib/client-config';

export const clientConfig: ClientConfig = {

    branding: {
        logoLetter: 'S',
        brandName: 'SMART',
        fullName: 'Smart Repair Center Autolack Doc',
        logoImage: '/images/logo.png',
    },

    contact: {
        email: 'a.biglari@auto-lack-doc.de',
        phone: '',
        phoneDisplay: '',
        address: 'Papenreye 7, 22453 Hamburg',
        mapsUrl: 'https://maps.google.com/?q=Papenreye%207%2C%2022453%20Hamburg',
    },

    social: {
        facebook: 'http://www.auto-lack-doc.de/',
        instagram: '#',
    },

    seo: {
        title: 'Smart Repair Center Autolack Doc | Autopflege Hamburg',
        description: 'Smart Repair Center Autolack Doc – Ihr Autopflege in Hamburg. Bewertet mit 4.9 von 5 Sternen (255 Bewertungen). Jetzt Termin vereinbaren.',
        keywords: ['Smart Repair Center Autolack Doc', 'Autopflege Hamburg', 'KFZ Werkstatt Hamburg', 'Autowerkstatt Hamburg'],
        ogTitle: 'Smart Repair Center Autolack Doc – Autopflege Hamburg',
        ogDescription: 'Ihr zuverlässiger Autopflege in Hamburg. 255 positive Bewertungen.',
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
        heroImageAlt: 'Smart Repair Center Autolack Doc – Hamburg',
    },

    stats: [
        { value: '255+', label: 'Bewertungen' },
        { value: '4.9 ★', label: 'Google Score' },
        { value: '10+', label: 'Jahre Erfahrung' },
        { value: 'Gratis', label: 'Kostenvoranschlag' },
    ],

    about: {
        badge: 'Über Uns',
        headlinePart1: 'Professionelle',
        headlineHighlight: ' Fahrzeugpflege',
        headlinePart2: ' in Hamburg',
        description: 'Smart Repair Center Autolack Doc bietet professionelle Fahrzeugaufbereitung auf höchstem Niveau. Mit premium Pflegeprodukten und erfahrenen Spezialisten bringen wir Ihr Fahrzeug zum Strahlen und erhalten seinen Wert langfristig.',
        bulletPoints: ['Vollständige Fahrzeugaufbereitung', 'Keramikversiegelung', 'Lackkorrekturen', 'Innenraumreinigung', 'Scheibenversiegelung', 'Vor- und Verkaufsaufbereitung'],
        images: [
            { src: '/images/Werkstatt1.jpg', alt: 'Unsere Werkstatt' },
            { src: '/images/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/images/inspektion.avif', alt: 'Fahrzeuginspektion' },
            { src: '/images/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    services: [
        { title: 'Fahrzeugaufbereitung', description: 'Umfassende Fahrzeugaufbereitung innen und außen – Ihr Auto wie neu.', image: '/images/Werkstatt1.jpg', iconName: 'sparkles' },
        { title: 'Politur & Versiegelung', description: 'Professionelle Lackpolitur und Keramikversiegelung für bleibenden Glanz.', image: '/images/Werkstatt2.jpg', iconName: 'zap' },
        { title: 'Innenreinigung', description: 'Tiefenreinigung des Fahrzeuginnenraums mit professionellen Mitteln.', image: '/images/inspektion.avif', iconName: 'wind' },
        { title: 'Scheibenversiegelung', description: 'Hydrophobe Beschichtung für klare Sicht auch bei starkem Regen.', image: '/images/Frontscheibe6.png', iconName: 'droplets' },
        { title: 'Felgenaufbereitung', description: 'Reinigung und Versiegelung Ihrer Felgen für dauerhaften Glanz.', image: '/images/reifenwechsel.avif', iconName: 'disc' },
        { title: 'Lackpflege', description: 'Kratzerentfernung und Lackschutz für langfristigen Werterhalt.', image: '/images/karosseriebau.avif', iconName: 'shield' }
    ],

    serviceLabels: ['Aufbereitung', 'Politur', 'Innenreinigung', 'Versiegelung', 'Felgen', 'Lackpflege'],

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
