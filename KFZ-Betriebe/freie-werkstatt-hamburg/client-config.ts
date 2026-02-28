/* ─────────────────────────────────────────────
 *  client-config.ts – Freie Werkstatt Hamburg
 *  Standalone – wird direkt als Template-Config eingesetzt
 * ───────────────────────────────────────────── */

export interface ClientBranding { logoLetter: string; brandName: string; fullName: string; logoImage?: string; }
export interface ClientContact { email: string; phone: string; phoneDisplay: string; address: string; mapsUrl?: string; }
export interface ClientSocialLinks { facebook?: string; instagram?: string; linkedin?: string; youtube?: string; google?: string; }
export interface ClientSEO { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string; ogImage: string; locale: string; }
export interface ClientColors { primary: string; primaryHover: string; primaryLight: string; primaryText: string; dark: string; }
export interface ClientHeroContent { headlineLine1: string; headlineLine2: string; heroImage: string; heroImageAlt: string; }
export interface ClientStat { value: string; label: string; iconName: string; }
export interface ClientAbout { badge: string; headlinePart1: string; headlineHighlight: string; headlinePart2: string; description: string; bulletPoints: string[]; images: { src: string; alt: string }[]; }
export interface ClientServiceItem { title: string; description: string; image: string; iconName: string; }
export interface ClientTestimonial { name: string; role: string; text: string; rating: number; image: string; }
export interface ClientHotspot { id: string; label: string; description: string; image: string; top: string; left: string; iconName: string; }
export interface ClientGoogleReviews { rating: number; count: number; }
export interface ClientConfig {
    branding: ClientBranding; contact: ClientContact; social: ClientSocialLinks; seo: ClientSEO;
    colors: ClientColors; hero: ClientHeroContent; stats: ClientStat[]; about: ClientAbout;
    services: ClientServiceItem[]; serviceLabels: string[]; testimonials: ClientTestimonial[];
    hotspots: ClientHotspot[]; googleReviews?: ClientGoogleReviews;
}

export const clientConfig: ClientConfig = {

    // ───── Branding ─────
    branding: {
        logoLetter: 'F',
        brandName: 'Freie Werkstatt Hamburg',
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
        primary: '#dc2626',
        primaryHover: '#b91c1c',
        primaryLight: '#fee2e2',
        primaryText: '#dc2626',
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
        { value: '779+', label: 'Bewertungen', iconName: 'star' },
        { value: '4.5 ★', label: 'Google Score', iconName: 'thumbsup' },
        { value: 'PKW & LKW', label: 'Alle Fabrikate', iconName: 'wrench' },
        { value: 'ab 99€', label: 'Festpreise', iconName: 'tag' },
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
            'Klimaservice ab 199€ inkl. MwSt.',
            'HU/AU Festpreis 150€',
            'Computerdiagnose & KFZ-Elektrik',
            'Abschleppdienst verfügbar',
        ],
        images: [
            { src: '/mocks/Werkstatt1.jpg', alt: 'Werkstatt Ansicht' },
            { src: '/mocks/Nahaufnahme1.avif', alt: 'Detailarbeit am Fahrzeug' },
            { src: '/mocks/Inspektion1.avif', alt: 'Fahrzeuginspektion' },
            { src: '/mocks/Werkstatt2.jpg', alt: 'Werkstatt Innenansicht' },
        ],
    },

    // ───── Services (aus echtem Website-Scraping) ─────
    services: [
        {
            title: 'Motor & Getriebe',
            description: 'Komplette Motor- und Getriebeinstandsetzung – von der Steuerkette bis zum DSG-Steuergerät. Festpreise ab 399€.',
            image: '/mocks/motor.avif',
            iconName: 'settings',
        },
        {
            title: 'Bremsen & Fahrwerk',
            description: 'Bremsbeläge, Bremsscheiben, Stoßdämpfer und Achsvermessung – professionell und zum Festpreis.',
            image: '/mocks/bremse.avif',
            iconName: 'shield',
        },
        {
            title: 'HU/AU & Inspektion',
            description: 'Hauptuntersuchung und Abgasuntersuchung für PKW (Benzin & Diesel) zum Festpreis von 150€.',
            image: '/mocks/Inspektion1.avif',
            iconName: 'wrench',
        },
        {
            title: 'Klimaservice',
            description: 'Klimaanlagen-Service mit modernem Kältemittel – Festpreis 199€ inkl. MwSt.',
            image: '/mocks/klimaanlage1.avif',
            iconName: 'wind',
        },
        {
            title: 'Karosserie & Lack',
            description: 'Karosserieschäden beheben und Lackierarbeiten in Fachbetriebsqualität – vom Kratzer bis zum Unfallschaden.',
            image: '/mocks/karosseriebau.avif',
            iconName: 'layers',
        },
        {
            title: 'Elektrik & Diagnose',
            description: 'Computerdiagnose, KFZ-Elektrik, Batterie-Service und Einspritzsysteme – schnelle Fehlersuche.',
            image: '/mocks/elektrik.avif',
            iconName: 'settings',
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

    googleReviews: { rating: 4.5, count: 779 },

    // ───── Hero-Hotspots ─────
    hotspots: [
        { id: 'reifen', label: 'Reifen', description: 'Reifenwechsel und Reifenservice – sicher unterwegs zu jeder Jahreszeit.', image: '/images/Reifen.png', top: '60%', left: '28%', iconName: 'disc' },
        { id: 'motor', label: 'Motor', description: 'Motorinstandsetzung, Steuerkette und Zahnriemen – alles aus einer Hand.', image: '/mocks/motor.avif', top: '48%', left: '60%', iconName: 'settings' },
        { id: 'scheibe', label: 'Scheibe', description: 'Glasreparatur und Scheibentausch – schnell und unkompliziert.', image: '/mocks/Frontscheibe6.png', top: '40%', left: '46%', iconName: 'shield' },
    ],
};
