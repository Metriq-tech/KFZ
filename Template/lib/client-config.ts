/* ─────────────────────────────────────────────
 *  client-config.ts
 *  Zentrale Konfiguration für kundenspezifische Daten.
 *  Pro Kunde wird NUR diese Datei (+ Bilder) ausgetauscht.
 * ───────────────────────────────────────────── */

// ── 1. Typen ──────────────────────────────────

export interface ClientBranding {
    /** Kürzel fürs Logo (1-2 Zeichen), z.B. "M" oder "SS" */
    logoLetter: string;
    /** Kurzname für Navbar, z.B. "MEISTER" */
    brandName: string;
    /** Vollständiger Firmenname für Footer / Impressum */
    fullName: string;
    /** Optionales Logo-Bild (wenn vorhanden, ersetzt es den Letter-Circle) */
    logoImage?: string;
}

export interface ClientContact {
    email: string;
    phone: string;
    /** Formatierte Telefonnummer für Anzeige */
    phoneDisplay: string;
    address: string;
    /** Google-Maps-Embed-URL oder Link */
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
    /** CSS-Variablen-Wert für Akzentfarbe, z.B. "#dc2626" (red-600) */
    primary: string;
    /** Dunklere Variante für Hover, z.B. "#b91c1c" (red-700) */
    primaryHover: string;
    /** Noch heller für Badges/Tags, z.B. "#fee2e2" (red-100) */
    primaryLight: string;
    /** Text auf hellem Primary-Hintergrund, z.B. "#dc2626" */
    primaryText: string;
    /** Dunkler Hintergrund (Hero, Footer), z.B. "#0a0a0a" */
    dark: string;
}

export interface ClientHeroContent {
    headlineLine1: string;
    headlineLine2: string;
    /** Pfad zum Hauptbild (Auto / Werkstatt) */
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
    /** Checkmark-Liste (USPs) */
    bulletPoints: string[];
    /** Bilder-Grid im About-Bereich */
    images: { src: string; alt: string }[];
}

export interface ClientServiceItem {
    title: string;
    description: string;
    image: string;
    /** Lucide-Icon-Name, z.B. 'wrench', 'thermometer', 'wind' */
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
    /** CSS-Position relativ zum Hero-Container */
    top: string;
    left: string;
    /** Lucide-Icon-Name */
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
    /** Service-Liste für Navbar-Dropdown (kurze Labels) */
    serviceLabels: string[];
    testimonials: ClientTestimonial[];
    hotspots: ClientHotspot[];
}

// ── 2. Standard-Config (aktueller "Meister Hamburg"-Kunde) ──

export const clientConfig: ClientConfig = {

    // ───── Branding ─────
    branding: {
        logoLetter: 'M',
        brandName: 'MEISTER',
        fullName: 'MEISTER AUTOMOBILES',
    },

    // ───── Kontakt ─────
    contact: {
        email: 'kontakt@kfz-hamburg.de',
        phone: '+4940123456789',
        phoneDisplay: '+49 40 123 456 78',
        address: 'Hauptstraße 12, 20095 Hamburg',
    },

    // ───── Social Media ─────
    social: {
        facebook: '#',
        instagram: '#',
        linkedin: '#',
        youtube: '#',
    },

    // ───── SEO / Meta ─────
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

    // ───── Farben ─────
    colors: {
        primary: '#dc2626',       // red-600
        primaryHover: '#b91c1c',  // red-700
        primaryLight: '#fee2e2',  // red-100
        primaryText: '#dc2626',   // red-600
        dark: '#0a0a0a',
    },

    // ───── Hero ─────
    hero: {
        headlineLine1: 'Wir behandeln Sie & Ihr Auto',
        headlineLine2: 'wie Familie',
        heroImage: '/images/rotes_auto5_transparent.png',
        heroImageAlt: 'KFZ Meisterbetrieb Hamburg – Rotes Fahrzeug',
    },

    // ───── Statistiken (Hero-Bottom-Bar) ─────
    stats: [
        { value: '40+', label: 'Werkstätten' },
        { value: '20+', label: 'Jahre Erfahrung' },
        { value: '14+', label: 'Services' },
        { value: 'Gratis', label: 'WLAN & Kaffee' },
    ],

    // ───── Über Uns (Features) ─────
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

    // ───── Services ─────
    services: [
        { title: 'Periodische Wartung', description: 'Halten Sie Ihr Fahrzeug in Top-Form mit unserer regelmäßigen Experten-Wartung.', image: '/images/inspektion.avif', iconName: 'wrench' },
        { title: 'Kühlsystem Reparatur', description: 'Wir beheben Lecks, Kühler und sorgen für optimale Motortemperatur.', image: '/images/karosseriebau.avif', iconName: 'thermometer' },
        { title: 'Klimaanlagen Service', description: 'Bleiben Sie cool mit unserer effizienten Klimaanlagen-Wartung und Reparatur.', image: '/images/klimaanlage1.avif', iconName: 'wind' },
        { title: 'Batterie & Elektronik', description: 'Diagnose und Austausch von Batterien und elektronischen Komponenten.', image: '/images/elektrik.avif', iconName: 'battery' },
        { title: 'Reifen & Räder', description: 'Professioneller Reifenwechsel, Wuchten und Achsvermessung.', image: '/images/reifenwechsel.avif', iconName: 'disc' },
        { title: 'Motor Diagnose', description: 'Tiefgehende Fehleranalyse mit modernsten Diagnosegeräten.', image: '/images/diagnose.avif', iconName: 'settings' },
    ],

    /** Kurz-Labels für Navbar-Dropdown */
    serviceLabels: [
        'Inspektion & Wartung',
        'Reifen & Räder',
        'Klimaanlage',
        'Motor Diagnose',
        'TÜV Vorbereitung',
        'Karosserie',
    ],

    // ───── Bewertungen ─────
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

    // ───── Hero-Hotspots ─────
    hotspots: [
        { id: 'reifen', label: 'Reifen', description: 'Kaufen Sie Reifen aus unserem Produktsortiment und fahren Sie sorgenfrei.', image: '/images/Reifen.png', top: '60%', left: '28%', iconName: 'disc' },
        { id: 'motor', label: 'Motor', description: 'Professionelle Motordiagnose und Reparatur – schnell und zuverlässig.', image: '/images/motor.avif', top: '48%', left: '60%', iconName: 'settings' },
        { id: 'scheibe', label: 'Scheibe', description: 'Steinschlag-Reparatur und Scheibentausch – direkt über die Versicherung.', image: '/images/Frontscheibe6.png', top: '40%', left: '46%', iconName: 'shield' },
    ],
};
