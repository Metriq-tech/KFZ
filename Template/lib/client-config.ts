/* ─────────────────────────────────────────────
 *  client-config.ts
 *  Zentrale Konfiguration für kundenspezifische Daten.
 *  Pro Kunde wird NUR diese Datei (+ Bilder) ausgetauscht.
 * ───────────────────────────────────────────── */

// ── 1. Typen ──────────────────────────────────

export interface ClientBranding {
    logoLetter: string;
    brandName: string;
    fullName: string;
    logoImage?: string;
}

export interface ClientContact {
    email: string;
    phone: string;
    phoneDisplay: string;
    address: string;
    mapsUrl?: string;
}

export interface ClientSocialLinks {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    google?: string;
}

export interface ClientSEO {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    locale: string;
}

export interface ClientColors {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryText: string;
    dark: string;
}

export interface ClientHeroContent {
    headlineLine1: string;
    headlineLine2: string;
    heroImage: string;
    heroImageAlt: string;
}

export interface ClientStat {
    value: string;
    label: string;
}

export interface ClientAbout {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    description: string;
    bulletPoints: string[];
    images: { src: string; alt: string }[];
}

export interface ClientServiceItem {
    title: string;
    description: string;
    image: string;
    iconName: string;
}

export interface ClientTestimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
    image: string;
}

export interface ClientHotspot {
    id: string;
    label: string;
    description: string;
    image: string;
    top: string;
    left: string;
    iconName: string;
}

export interface ClientConfig {
    branding: ClientBranding;
    contact: ClientContact;
    social: ClientSocialLinks;
    seo: ClientSEO;
    colors: ClientColors;
    hero: ClientHeroContent;
    stats: ClientStat[];
    about: ClientAbout;
    services: ClientServiceItem[];
    serviceLabels: string[];
    testimonials: ClientTestimonial[];
    hotspots: ClientHotspot[];
}

// ── 2. Standard-Config (Template: "Meister Hamburg") ──

export const clientConfig: ClientConfig = {

    branding: {
        logoLetter: 'M',
        brandName: 'MEISTER',
        fullName: 'MEISTER AUTOMOBILES',
    },

    contact: {
        email: 'kontakt@kfz-hamburg.de',
        phone: '+4940123456789',
        phoneDisplay: '+49 40 123 456 78',
        address: 'Hauptstraße 12, 20095 Hamburg',
    },

    social: {
        facebook: '#',
        instagram: '#',
        linkedin: '#',
        youtube: '#',
    },

    seo: {
        title: 'KFZ-Meisterbetrieb Hamburg | MEISTER – Ihre Werkstatt mit Festpreisen',
        description:
            'MEISTER KFZ-Meisterbetrieb Hamburg: Ölwechsel, Reifenwechsel, Klimaservice, HU/AU und mehr. Online Terminbuchung. Transparente Festpreise. Über 20 Jahre Erfahrung.',
        keywords: [
            'KFZ Werkstatt Hamburg',
            'Autowerkstatt Hamburg',
            'KFZ Meisterbetrieb',
            'Ölwechsel Hamburg',
            'Reifenwechsel Hamburg',
            'HU AU Hamburg',
            'Online Terminbuchung Werkstatt',
            'Festpreise Werkstatt',
        ],
        ogTitle: 'MEISTER KFZ-Meisterbetrieb Hamburg',
        ogDescription:
            'Ihre vertrauenswürdige KFZ-Werkstatt in Hamburg. Online buchbar, faire Festpreise, über 20 Jahre Erfahrung.',
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
        heroImageAlt: 'KFZ Meisterbetrieb Hamburg – Rotes Fahrzeug',
    },

    stats: [
        { value: '40+', label: 'Werkstätten' },
        { value: '20+', label: 'Jahre Erfahrung' },
        { value: '14+', label: 'Services' },
        { value: 'Gratis', label: 'WLAN & Kaffee' },
    ],

    about: {
        badge: 'Über Uns',
        headlinePart1: 'Seit über 20 Jahren Ihr',
        headlineHighlight: ' Vertrauenspartner',
        headlinePart2: ' in Hamburg',
        description:
            'Als familiär geführter KFZ-Meisterbetrieb reparieren und warten wir Fahrzeuge aller Hersteller – vom Kleinwagen bis zum Transporter. Unsere zertifizierten Meister arbeiten mit modernsten Diagnosegeräten und ausschließlich hochwertigen Originalteilen.',
        bulletPoints: [
            'TÜV & HU Vorbereitung',
            'Festpreisgarantie',
            'Kostenloser Kostenvoranschlag',
            'Modernste Diagnosetechnik',
            'Meisterbetrieb seit 2003',
            'Original & OEM-Ersatzteile',
        ],
        images: [
            { src: '/images/Werkstatt1.jpg', alt: 'Unsere Werkstatt' },
            { src: '/images/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/images/inspektion.avif', alt: 'Fahrzeuginspektion' },
            { src: '/images/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    services: [
        { title: 'Periodische Wartung', description: 'Halten Sie Ihr Fahrzeug in Top-Form mit unserer regelmäßigen Experten-Wartung.', image: '/images/inspektion.avif', iconName: 'wrench' },
        { title: 'Kühlsystem Reparatur', description: 'Wir beheben Lecks, Kühler und sorgen für optimale Motortemperatur.', image: '/images/karosseriebau.avif', iconName: 'thermometer' },
        { title: 'Klimaanlagen Service', description: 'Bleiben Sie cool mit unserer effizienten Klimaanlagen-Wartung und Reparatur.', image: '/images/klimaanlage1.avif', iconName: 'wind' },
        { title: 'Batterie & Elektronik', description: 'Diagnose und Austausch von Batterien und elektronischen Komponenten.', image: '/images/elektrik.avif', iconName: 'battery' },
        { title: 'Reifen & Räder', description: 'Professioneller Reifenwechsel, Wuchten und Achsvermessung.', image: '/images/reifenwechsel.avif', iconName: 'disc' },
        { title: 'Motor Diagnose', description: 'Tiefgehende Fehleranalyse mit modernsten Diagnosegeräten.', image: '/images/diagnose.avif', iconName: 'settings' },
    ],

    serviceLabels: [
        'Inspektion & Wartung',
        'Reifen & Räder',
        'Klimaanlage',
        'Motor Diagnose',
        'TÜV Vorbereitung',
        'Karosserie',
    ],

    testimonials: [
        {
            name: 'Helena Schmidt',
            role: 'Autobesitzerin',
            text: 'Schnell, freundlich und zuverlässig! Sie haben meine Klimaanlage perfekt repariert. Sehr empfehlenswert!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Markus Weber',
            role: 'Geschäftskunde',
            text: 'Professioneller Service mit ehrlichen Preisen. Ich bringe unsere gesamte Flotte hierher.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        },
        {
            name: 'Julia Meyer',
            role: 'Autobesitzerin',
            text: 'Der Abhol- und Bringservice hat mir so viel Zeit gespart. Alles war super bequem.',
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
