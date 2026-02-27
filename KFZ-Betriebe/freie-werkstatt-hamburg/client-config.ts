/* ─────────────────────────────────────────────
 *  client-config.ts – Freie Werkstatt Hamburg
 *  Individuell erstellt aus Website-Scraping
 * ───────────────────────────────────────────── */

import type { ClientConfig } from '../../Template/lib/client-config';

export const clientConfig: ClientConfig = {

    // ───── Branding ─────
    branding: {
        logoLetter: 'F',
        brandName: 'FREIE WERKSTATT',
        fullName: 'Freie Werkstatt Hamburg',
        // Logo-Datei hier ablegen: KFZ-Betriebe/freie-werkstatt-hamburg/logo.png
        // logoImage: '/images/logo.png',
    },

    // ───── Kontakt ─────
    contact: {
        email: 'info@freiewerkstatthamburg.de',
        phone: '+494028417526',
        phoneDisplay: '040 284 175 260',
        address: 'Ausschläger Weg 60, 20537 Hamburg',
        mapsUrl: 'https://maps.google.com/?q=Ausschl%C3%A4ger+Weg+60,+20537+Hamburg',
    },

    // ───── Social Media ─────
    social: {
        facebook: 'https://www.facebook.com/freiewerkstatthamburg',
        instagram: '#',
    },

    // ───── SEO / Meta ─────
    seo: {
        title: 'Freie Werkstatt Hamburg | KFZ-Meisterbetrieb – PKW & LKW Reparatur',
        description: 'Freie Werkstatt Hamburg – Ihr unabhängiger KFZ-Meisterbetrieb in Hamburg Mitte. PKW & LKW Reparaturen aller Fabrikate. 779+ Google-Bewertungen. Festpreise. Jetzt Termin vereinbaren.',
        keywords: ['Freie Werkstatt Hamburg', 'KFZ Werkstatt Hamburg', 'Autowerkstatt Hamburg Mitte', 'PKW Reparatur Hamburg', 'LKW Werkstatt Hamburg', 'KFZ Meisterbetrieb'],
        ogTitle: 'Freie Werkstatt Hamburg – KFZ-Meisterbetrieb für alle Fabrikate',
        ogDescription: 'Unabhängige KFZ-Werkstatt in Hamburg. PKW & LKW. Alle Fabrikate. 779+ Bewertungen. Festpreise ab 99€.',
        ogImage: '/images/Werkstatt3.jpg',
        locale: 'de_DE',
    },

    // ───── Farben ─────
    colors: {
        primary: '#1e40af',       // Blau – passend zum professionellen Werkstatt-Image
        primaryHover: '#1e3a8a',
        primaryLight: '#dbeafe',
        primaryText: '#1e40af',
        dark: '#0a0a0a',
    },

    // ───── Hero ─────
    hero: {
        headlineLine1: 'Ihre unabhängige Meisterwerkstatt',
        headlineLine2: 'für alle Fabrikate',
        heroImage: '/images/rotes_auto5_transparent.png',
        heroImageAlt: 'Freie Werkstatt Hamburg – KFZ-Meisterbetrieb',
    },

    // ───── Statistiken (Hero-Bottom-Bar) ─────
    stats: [
        { value: '779+', label: 'Bewertungen' },
        { value: '4.5 ★', label: 'Google Score' },
        { value: 'PKW & LKW', label: 'Alle Fabrikate' },
        { value: 'Festpreise', label: 'Transparent' },
    ],

    // ───── Über Uns (Features) ─────
    about: {
        badge: 'Über Uns',
        headlinePart1: 'Ihre unabhängige',
        headlineHighlight: ' Meisterwerkstatt',
        headlinePart2: ' in Hamburg Mitte',
        description: 'Die Freie Werkstatt Hamburg ist Ihr erfahrener KFZ-Meisterbetrieb am Ausschläger Weg. Als markenunabhängige Werkstatt reparieren und warten wir sämtliche Fahrzeugfabrikate – vom Kleinwagen bis zum LKW. Unsere Kfz-Mechatroniker lösen jedes Problem professionell, schnell und zu transparenten Festpreisen.',
        bulletPoints: [
            'Alle Fabrikate – PKW & LKW',
            'Transparente Festpreise',
            'Klimaservice R1234yf ab 199€',
            'HU/AU Festpreis 150€',
            'Computerdiagnose & KFZ-Elektrik',
            'Abschleppdienst verfügbar',
        ],
        images: [
            { src: '/images/Werkstatt1.jpg', alt: 'Werkstatt Ansicht' },
            { src: '/images/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/images/inspektion.avif', alt: 'Fahrzeuginspektion' },
            { src: '/images/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    // ───── Services (aus echtem Website-Scraping) ─────
    services: [
        {
            title: 'Motor & Getriebe',
            description: 'Komplette Motor- und Getriebeinstandsetzung – von der Steuerkette bis zum DSG-Steuergerät. Festpreise ab 399€.',
            image: '/images/diagnose.avif',
            iconName: 'settings',
        },
        {
            title: 'Bremsen & Fahrwerk',
            description: 'Bremsbeläge, Bremsscheiben, Stoßdämpfer und Achsvermessung – professionell und zum Festpreis.',
            image: '/images/inspektion.avif',
            iconName: 'shield',
        },
        {
            title: 'HU/AU & Inspektion',
            description: 'Hauptuntersuchung und Abgasuntersuchung für PKW (Benzin & Diesel) zum Festpreis von 150€.',
            image: '/images/Werkstatt1.jpg',
            iconName: 'clipboard-check',
        },
        {
            title: 'Klimaservice',
            description: 'Klimaanlagen-Service mit dem neuen Kältemittel R1234yf – Festpreis 199€ inkl. MwSt.',
            image: '/images/klimaanlage1.avif',
            iconName: 'wind',
        },
        {
            title: 'Karosserie & Lack',
            description: 'Karosserieschäden beheben und Lackierarbeiten in Fachbetriebsqualität – vom Kratzer bis zum Unfallschaden.',
            image: '/images/karosseriebau.avif',
            iconName: 'paintbrush',
        },
        {
            title: 'Elektrik & Diagnose',
            description: 'Computerdiagnose, KFZ-Elektrik, Batterie-Service und Einspritzsysteme – schnelle Fehlersuche.',
            image: '/images/elektrik.avif',
            iconName: 'zap',
        },
    ],

    /** Kurz-Labels für Navbar-Dropdown */
    serviceLabels: [
        'Motor & Getriebe',
        'Bremsen & Fahrwerk',
        'HU/AU & Inspektion',
        'Klimaservice',
        'Karosserie & Lack',
        'Elektrik & Diagnose',
    ],

    // ───── Bewertungen ─────
    testimonials: [
        {
            name: 'Helena Schmidt',
            role: 'Kundin',
            text: 'Schnelle Reparatur zu einem fairen Festpreis. Mein Auto wurde am gleichen Tag fertig. Klare Empfehlung!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Markus Weber',
            role: 'Stammkunde',
            text: 'Professioneller Service für meinen Firmenwagen. Transparente Preise und immer ehrliche Beratung.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Julia Meyer',
            role: 'Kundin',
            text: 'HU/AU bestanden beim ersten Anlauf! Sehr gutes Preis-Leistungs-Verhältnis und freundliches Team.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
        },
    ],

    // ───── Hero-Hotspots ─────
    hotspots: [
        { id: 'reifen', label: 'Reifen', description: 'Reifenwechsel und Reifenservice – sicher unterwegs zu jeder Jahreszeit.', image: '/images/Reifen.png', top: '60%', left: '28%', iconName: 'disc' },
        { id: 'motor', label: 'Motor', description: 'Motorinstandsetzung, Steuerkette und Zahnriemen – alles aus einer Hand.', image: '/images/motor.avif', top: '48%', left: '60%', iconName: 'settings' },
        { id: 'scheibe', label: 'Scheibe', description: 'Glasreparatur und Scheibentausch – schnell und unkompliziert.', image: '/images/Frontscheibe6.png', top: '40%', left: '46%', iconName: 'shield' },
    ],
};
