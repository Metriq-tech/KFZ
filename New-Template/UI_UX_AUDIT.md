# 🔍 UI/UX Audit – New-Template (KFZ-Meisterbetrieb)

> Geprüft am 20.02.2026 mit dem **UI/UX Pro Max Skill** gegen die Domains: `ux`, `landing`, `style`, `typography`  
> **Ziel:** Verbesserungen identifizieren, OHNE das Design grundsätzlich zu ändern.

---

## ✅ Checklist – Was ist GUT

| # | Kategorie | Status | Detail |
|---|-----------|--------|--------|
| 1 | **Dark Mode Ästhetik** | ✅ Gut | Konsistentes `#0a0a0a` Farbschema mit roten Akzenten |
| 2 | **Viewport Meta** | ✅ Gut | Next.js setzt automatisch `width=device-width, initial-scale=1` |
| 3 | **Responsive Grid** | ✅ Gut | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` durchgängig |
| 4 | **Font Loading** | ✅ Gut | Google Fonts (Inter + Outfit) via `next/font` – kein Layout-Shift |
| 5 | **Image Optimierung** | ✅ Gut | `next/image` mit `priority` auf Hero-Bild, automatisches WebP |
| 6 | **Semantic HTML** | ✅ Gut | `<section>`, `<nav>`, `<footer>`, `<main>` korrekt verwendet |
| 7 | **Form Labels** | ✅ Gut | Contact.tsx: `<label>` mit Text für Name, Email, Nachricht |
| 8 | **Mobile Menu** | ✅ Gut | `AnimatePresence` mit smooth open/close auf Mobile |
| 9 | **Fixed Navbar** | ✅ Gut | `fixed top-0` mit `backdrop-blur` – moderne Best Practice |
| 10 | **Hover Transitions** | ✅ Gut | `transition-colors`, `transition-shadow` durchgängig |
| 11 | **CTA Sichtbarkeit** | ✅ Gut | Roter "Contact" Button in Navbar prominent sichtbar |
| 12 | **Social Proof** | ✅ Gut | Testimonials-Sektion mit Sternen, Namen, Bildern |
| 13 | **Trust Signals (Stats)** | ✅ Gut | "40+ Werkstätten", "20+ Jahre Erfahrung" in der Hero-Sektion |
| 14 | **One H1 per Page** | ✅ Gut | Nur eine `<h1>` im Hero (SEO-konform) |

---

## 🔧 Verbesserungen – Was fehlt / zu verbessern

### 🔴 HIGH Severity (Muss behoben werden)

| # | Kategorie | Problem | Fix | Datei |
|---|-----------|---------|-----|-------|
| 15 | **Accessibility: ARIA Labels** | Icon-only Buttons (Prev/Next im Hero, Social Media im Footer) haben **kein `aria-label`** | `aria-label="Vorheriges Bild"`, `aria-label="LinkedIn"` etc. hinzufügen | `Hero.tsx` Z.91-96, `Footer.tsx` Z.18-21 |
| 16 | **Accessibility: Keyboard Nav** | Mobile Menü-Button hat **kein `aria-expanded`** und kein `aria-label` | `aria-label="Menü öffnen"` + `aria-expanded={isOpen}` | `Navbar.tsx` Z.53-58 |
| 17 | **Accessibility: Skip Link** | **Kein "Skip to content"** Link für Keyboard-User bei der fixen Navbar | `<a href="#content" class="sr-only focus:not-sr-only">Zum Inhalt</a>` vor Navbar | `layout.tsx` oder `Navbar.tsx` |
| 18 | **Performance: Image Sizes** | Hero-Bild lädt als `fill` ohne `sizes` – Browser weiß nicht welche Größe nötig | `sizes="(max-width: 768px) 100vw, 800px"` zu allen `<Image fill>` | `Hero.tsx`, `Features.tsx`, `Services.tsx`, `Testimonials.tsx` |
| 19 | **Form: Submit Feedback** | Contact-Form Button ist `type="button"` → **kein Submit**, kein Feedback, kein Loading State | `type="submit"` + `onSubmit` Handler mit Loading/Success State | `Contact.tsx` Z.96-101 |
| 20 | **Form: htmlFor** | Labels im Contact-Form haben **kein `htmlFor`/`id`** Pairing → nicht klickbar, Screen-Reader-Problem | `<label htmlFor="name">` + `<input id="name">` | `Contact.tsx` Z.70-75 |
| 21 | **Footer: Newsletter Input** | Newsletter-Input hat **kein Label** (nur Placeholder) | Visuell-verstecktes `<label>` hinzufügen oder `aria-label` | `Footer.tsx` Z.53-56 |
| 22 | **Reduced Motion** | Keine `@media (prefers-reduced-motion)` Checks – Animationen laufen immer | In `globals.css`: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }` | `globals.css` |
| 23 | **Hotspots: Kein Tooltip/Funktion** | Die 3 roten Hotspots auf dem Auto sind **rein dekorativ**, haben keinen Hover-Text oder Click-Aktion → verwirrt Users | Entweder Tooltips hinzufügen ODER `pointer-events-none` + `aria-hidden="true"` wenn dekorativ | `Hero.tsx` Z.72-83 |

### 🟡 MEDIUM Severity (Sollte behoben werden)

| # | Kategorie | Problem | Fix | Datei |
|---|-----------|---------|-----|-------|
| 24 | **Navigation: Active State** | Kein visuelles Feedback welche Sektion gerade aktiv ist (z.B. bei Scroll) | `IntersectionObserver` oder Scroll-Spy für aktiven Nav-Highlight | `Navbar.tsx` |
| 25 | **Scroll Behavior** | `scroll-behavior: smooth` fehlt in CSS → harte Sprünge bei Anchor-Links (#contact) | `html { scroll-behavior: smooth; }` in `globals.css` | `globals.css` |
| 26 | **Branding Inkonsistenz** | Navbar: "MEISTER" / Services-Text: "King Automobile Garage" / Footer: "MEISTER AUTOMOBILES" → 3 verschiedene Namen! | Einheitlicher Firmenname überall | `Services.tsx` Z.53, `Footer.tsx` Z.70 |
| 27 | **Contact Info: Nicht klickbar** | Telefonnummer und E-Mail im Contact sind **reiner Text**, nicht als `<a href="tel:">` / `<a href="mailto:">` verlinkt | Links hinzufügen für **Click-to-Call** und **Click-to-Mail** | `Contact.tsx` Z.32, Z.42; `Footer.tsx` Z.16 |
| 28 | **Touch Target Size** | Mobile Menü-Button ist `p-2` (32px) → **unter dem 44×44px Minimum** | `p-3` oder explicit `min-w-[44px] min-h-[44px]` | `Navbar.tsx` Z.55 |
| 29 | **Hero Cards: Mobile** | Reifen-Card und Service-Cards sind `hidden lg:flex` → **komplett unsichtbar auf Mobile/Tablet** → viel Content geht verloren | Cards auch auf Mobile anzeigen (z.B. als horizontal scrollbare Row) | `Hero.tsx` Z.19, Z.101 |
| 30 | **Dropdown: Nicht implementiert** | "Auto Services" und "Locations" haben ChevronDown Icon aber **kein Dropdown-Menü** → frustriert User | Entweder Dropdown implementieren oder ChevronDown entfernen | `Navbar.tsx` Z.31-36, Z.40-44 |
| 31 | **SEO: Meta Description** | Meta Description ist generisch: *"Ihre vertrauenswürdige KFZ-Werkstatt in Hamburg."* | Spezifischere Description mit Keywords (Services, Marken, Standort) | `layout.tsx` Z.17 |
| 32 | **Keine `<main id="content">`** | `<main>` hat keine ID für den Skip-Link | `<main id="content">` | `page.tsx` Z.11 |

### 🟢 LOW Severity (Nice to have)

| # | Kategorie | Problem | Fix | Datei |
|---|-----------|---------|-----|-------|
| 33 | **Footer: Copyright** | "© 2026 KFZ-Meisterbetrieb Hamburg" → sollte dynamisch sein | `{new Date().getFullYear()}` verwenden | `Footer.tsx` Z.73 |
| 34 | **Testimonial Heading** | Jede Testimonial-Card hat dieselbe Headline "Stimmen zufriedener Kunden" → redundant | Headline entfernen oder pro Card individualisieren | `Testimonials.tsx` Z.55 |
| 35 | **CSS Variables** | `:root` definiert `--background: #fff` aber Hero nutzt `bg-[#0a0a0a]` hardcoded → Dark/Light Sections nicht über Variablen gesteuert | Konsistentes Farb-System über CSS Custom Properties | `globals.css` |
| 36 | **Open Graph / Social** | Keine OG-Tags für Social Sharing (og:image, og:title, og:description) | Next.js Metadata API mit `openGraph` Property | `layout.tsx` |
| 37 | **Favicon** | Kein custom Favicon vorhanden | `app/favicon.ico` oder `app/icon.tsx` hinzufügen | Root |
| 38 | **Lighthouse Perf** | Externe Unsplash-Bilder ohne `loading="lazy"` (außer Hero mit `priority`) | `loading="lazy"` für Below-the-fold Bilder | `Features.tsx`, `Services.tsx` |

---

## 📊 Zusammenfassung

| Ergebnis | Anzahl |
|----------|--------|
| ✅ Bestanden | 14 |
| 🔴 HIGH (muss gefixt) | 9 |
| 🟡 MEDIUM (sollte gefixt) | 9 |
| 🟢 LOW (optional) | 6 |
| **Gesamt geprüft** | **38 Punkte** |

### 🎯 Top-3 Quick Wins (größter Impact mit geringstem Aufwand)

1. **`aria-label` auf alle Icon-Buttons** → 5 Minuten, löst 2 HIGH Issues (#15, #16)
2. **`scroll-behavior: smooth` + `prefers-reduced-motion`** → 2 Zeilen CSS, löst 2 Issues (#22, #25)
3. **Contact Form: `htmlFor`/`id` + `type="submit"`** → 10 Minuten, löst 2 HIGH Issues (#19, #20)

---

*Geprüft mit UI/UX Pro Max Skill Domains: ux (accessibility, forms, responsive, touch, navigation, performance), landing (hero patterns, CTA), style (dark mode)*
