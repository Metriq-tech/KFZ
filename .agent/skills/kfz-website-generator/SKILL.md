---
name: kfz-website-generator
description: >
  Automates the full pipeline for generating and deploying a personalized KFZ demo website
  for a new client. Given a client name (and optionally a website URL), the skill scrapes the
  site, extracts real data, generates a client-config.ts, builds the Next.js site,
  deploys it to Vercel at [slug].demo.metriq.tech, and logs the demo link in Notion.
---

# KFZ Website Generator

## Trigger

Use this skill whenever the user says something like:
- „Erstelle die Website für [Firmenname]"
- „Generate website for [company]"
- „Demo-Site für [client]"
- „Neue KFZ-Website für [Firma]"

---

## System Overview

```
Scraping → client-config.ts → build-vercel.ps1 -Prod → vercel alias set → Notion
```

| Component | Details |
|-----------|---------|
| Framework | Next.js (kein Static Export, kein basePath, kein assetPrefix) |
| Deployment | Vercel, Team: `metriq` (ID: `team_4XLInQGBbrRVEg6Wzv6nKwBt`) |
| Domain | `[slug].demo.metriq.tech` (Wildcard DNS *.demo bereits in IONOS gesetzt) |
| Build Script | `Template/build-vercel.ps1` |
| Notion | Demo-Link wird nach erfolgreichem Deploy eingetragen |

---

## ⚠️ Critical Rules (MUST READ BEFORE ANY STEP)

> [!CAUTION]
> These rules were learned from real debugging sessions. Violations WILL break the deployment.

1. **KEIN `basePath` und KEIN `assetPrefix`** in `next.config.ts` – Vercel braucht das nicht. Die Site läuft an Root (`/`).
2. **KEIN `output: 'export'`** in `next.config.ts` – Vercel baut selbst auf seinen Servern.
3. **Mocks werden VOR dem Deploy in `public/mocks/` kopiert und erst NACH dem Deploy gelöscht** – Vercel re-baut auf seinen Servern und braucht die Dateien beim Upload.
4. **Immer `-Prod` Flag benutzen** beim Deploy – sonst landet der Build als Preview und die Custom Domain zeigt auf eine alte Version.
5. **Client-config MUSS standalone sein** – alle TypeScript-Interfaces müssen inline definiert sein (kein `import type` aus Template-Pfaden).
6. **`brandName`** ist der Name, der im Navbar-Header erscheint → immer den vollständigen Firmennamen verwenden (z.B. `'Freie Werkstatt Hamburg'`).
7. **Bilder**: Immer existierende Dateinamen aus `images/mocks/` verwenden – die Dateiliste sorgfältig prüfen!
8. **Template-Config ist nur lokaler Platzhalter**: `Template/lib/client-config.ts` wird NUR für `npm run dev` genutzt.
   - Das Build-Script tauscht sie beim Deploy gegen die echte Client-Config und **stellt sie danach automatisch wieder her**.
   - Sie hat NICHTS mit `KFZ-Betriebe/[client]/client-config.ts` zu tun – Clients sind vollständig unabhängig.
   - ⚠️ **Client-Websites werden NUR geändert, wenn der User das explizit anweist.**

9. **Lokale Entwicklung (Mocks)**: `npm run dev` kopiert Mocks automatisch via `predev`-Hook.
   - `public/mocks/` wird dabei befüllt aus `../images/mocks/`.
   - Diese Dateien sollen NICHT committed werden (`.gitignore`: `Template/public/mocks/`).


---

## Step-by-Step Workflow

### Schritt 1 – Client identifizieren

Frage den User nach (oder leite ab):
- **Firmenname** (z.B. „Freie Werkstatt Hamburg")
- **Website-URL** (z.B. `freiewerkstatthamburg.de`) – falls nicht angegeben, via Google suchen
- **Notion-Seite**: Wo soll der Demo-Link eingetragen werden?

**Slug ableiten** (automatisch):
- Lowercase
- Deutsche Umlaute: ä→ae, ö→oe, ü→ue, ß→ss
- Leerzeichen → Bindestriche
- Sonderzeichen entfernen
- Beispiel: „Freie Werkstatt Hamburg" → `freie-werkstatt-hamburg`
- Beispiel: „KFZ Müller & Söhne" → `kfz-mueller-soehne`

---

### Schritt 2 – Website scrapen

Nutze `mcp_apify_apify-slash-rag-web-browser`:

```
query: "[website-url]"
maxResults: 1
```

Extrahiere:
- **Firmenname** (exakt wie auf der Website)
- **Adresse** (Straße, PLZ, Stadt)
- **Telefonnummer** (Anzeige-Format + E.164 für `phone`)
- **E-Mail**
- **Leistungen** (Liste der KFZ-Services)
- **Google-Bewertungen** (Rating + Anzahl, für `googleReviews`)
- **Markenfarben** (falls erkennbar)
- **Social-Media-Links** (Facebook, Instagram, etc.)
- **Besonderheiten** (Festpreise, Fabrikate, Spezialgebiete)

Falls Daten fehlen → sinnvolle Platzhalter verwenden.

Scraped-Daten speichern als:
```
KFZ-Betriebe/[slug]/scraped-data.md
```

---

### Schritt 3 – client-config.ts generieren

**Vollständiger Datei-Inhalt:** Die Config muss alle TypeScript-Interfaces inline enthalten (keine Imports aus Template-Pfaden!).

Kopiere die Interface-Definitionen aus `Template/lib/client-config.ts` und paste sie an den Anfang der Client-Config.

Beachte bei der Konfiguration:

#### `branding`
- `brandName`: **Vollständiger Firmenname** (erscheint im Header-Navbar!)
- `fullName`: Vollständiger Name (identisch oder leicht länger)
- `logoLetter`: Erster Buchstabe des Firmennamens

#### `colors`
- Brand-Farbe aus Scraping verwenden
- Fallback: `#dc2626` (Rot)

#### `hero`
- 2-zeilige, prägnante Überschrift
- `heroImage`: `/images/rotes_auto5_transparent.png` (Standard-Auto-Bild)

#### `stats` (4 Einträge)
Wähle passende iconNames:
```
star      → Bewertungen / Google Score
thumbsup  → Zufriedenheit
clock     → Jahre Erfahrung
gift      → Kostenloser Kostenvoranschlag
tag       → Festpreise
wrench    → Fahrzeugtypen / Fabrikate
layers    → Vielfalt
disc      → Reifen
```

#### `services` (6 Einträge)
Mappe die Leistungen auf 6 Slots. Wähle passende Bilder aus der Mocks-Liste.

#### `hotspots` (3 Einträge, für Hero-Interaktion)
Standard-Hotspots (anpassen nach Fokus der Werkstatt):
```ts
{ id: 'reifen',  label: 'Reifen',  image: '/images/Reifen.png',           top: '60%', left: '28%', iconName: 'disc'     }
{ id: 'motor',   label: 'Motor',   image: '/mocks/motor.avif',             top: '48%', left: '60%', iconName: 'settings' }
{ id: 'scheibe', label: 'Scheibe', image: '/mocks/Frontscheibe6.png',      top: '40%', left: '46%', iconName: 'shield'   }
```

#### Verfügbare Mock-Bilder – DYNAMISCHE KI-AUSWAHL

> [!IMPORTANT]
> **PFLICHTSCHRITT vor dem Schreiben der Config:**
> Führe `list_dir` auf `images/mocks/` aus und lese ALLE verfügbaren Dateinamen.
> Wähle dann semantisch passende Bilder basierend auf dem Leistungsprofil des Clients.
> Niemals Dateinamen aus dem Gedächtnis tippen – immer aus der aktuellen Liste auswählen!

**So wählst du Bilder dynamisch:**
1. `list_dir` auf `c:\Users\MoBol\.gemini\antigravity\scratch\Metriq_Website_KFZ\images\mocks` ausführen
2. Für jeden Service: Welcher Dateiname beschreibt diese Leistung am besten?
3. Für About-Bilder: Abwechslungsreiche Kombination (Werkstatt, Nahaufnahme, Inspektion, Detail)
4. Für Hotspots: Immer konkrete Produkt-/Teilbilder (kein allgemeines Werkstattbild)

**Semantische Zuordnungs-Hinweise** (Stand aktueller Dateibestand, aber immer live prüfen!):
```
Motor / Getriebe:     motor.avif, steuerkette1.avif
Bremsen / Fahrwerk:   bremse.avif (NICHT bremsen.avif!), achsvermessung.avif, achsen.avif
HU / AU / TÜV:        Inspektion1.avif, inspektion.avif, tuev.png
Klimaservice:         klimaanlage1.avif, klimaanlage2.jpg
Karosserie / Lack:    karosseriebau.avif, lackierung.avif, pink_lackierung.avif
Elektrik / Diagnose:  elektrik.avif, diagnose.avif, fehlerspeicher.avif, live-daten.avif
Scheibe / Glas:       Frontscheibe6.png, Reparatur_Frontscheibe1.avif, Frontscheibe1.avif
Reifen:               reifenwechsel.avif, reifenservice.avif, auswuchten.avif
Werkstatt allgemein:  Werkstatt1.jpg, Werkstatt2.jpg, Werkstatt4.jpg, werkstatt.avif
Nahaufnahme:          Nahaufnahme1.avif, Nahaufnahme2.avif
LKW / Nutzfahrzeuge:  LKW-Reparatur1.jpg, LKW-Reparatur2.jpg
Auspuff / Abgas:      auspuff2.jpg, auspuff3.jpg
Anhänger:             anhaenger2.avif, anhaengerservice.avif
```

**Icon-Auswahl ist ebenfalls dynamisch:**
Wähle für jeden Service und jede Stat den semantisch besten `iconName`:
```
wrench    → Reparatur, Werkstatt, Allgemein
shield    → Bremsen, Sicherheit, Garantie, TÜV, Scheibe
settings  → Motor, Getriebe, Diagnose, Technik
wind      → Klimaanlage, Klimaservice
disc      → Reifen, Räder
clock     → Jahre Erfahrung, Schnellservice, Wartezeit
gift      → Kostenloser KV, Gratis-Service
thumbsup  → Zufriedenheit, Bewertungen, Qualität
tag       → Festpreise, Preise, Rabatt
layers    → Vielfalt, Alle Fabrikate, Breites Angebot
star      → Google Score, Bewertungen, Top-Qualität
```

---

### Schritt 3b – Bildpfade verifizieren (PFLICHT)

> [!CAUTION]
> Dieser Schritt MUSS vor dem Deployment ausgeführt werden!
> Ein falscher Bildpfad führt zu 404-Fehlern auf der Live-Site.

Nach dem Schreiben der `client-config.ts` – prüfe **jeden einzelnen** `/mocks/`-Pfad:

```
Für jedes image-Feld in client-config.ts:
  → Extrahiere den Dateinamen (z.B. "bremse.avif" aus "/mocks/bremse.avif")
  → Prüfe ob die Datei in images/mocks/ existiert via find_by_name
  → Falls NICHT gefunden: sofort korrigieren bevor weiter!
```

Prüfe diese Felder:
- `hero.heroImage`
- `about.images[].src`
- `services[].image` (alle 6)
- `hotspots[].image` (alle 3)

Nur Pfade mit Präfix `/images/` zeigen auf `Template/public/images/` und müssen NICHT in `/mocks/` sein:
```
/images/rotes_auto5_transparent.png  → public/images/ ✅
/images/Reifen.png                   → public/images/ ✅
/mocks/*.avif oder /mocks/*.jpg      → images/mocks/ muss geprüft werden!
```

---

### Schritt 4 – Config-Datei schreiben

```
KFZ-Betriebe/[slug]/client-config.ts
```

> [!IMPORTANT]
> Interfaces MÜSSEN inline in der Datei stehen – keine externen Imports!

---

### Schritt 5 – Optional: Logo anfragen

Benachrichtige den User:
> „Ich habe die Config für [Firmenname] erstellt. Falls du ein Logo hast, lege es bitte als `KFZ-Betriebe/[slug]/logo.png` ab. Ich verwende sonst '[X]' als Platzhalter. Bereit zum Bauen?"

Warte auf Bestätigung ODER fahre fort wenn der User „weiter" / „ja" / „los" sagt.

---

### Schritt 6 – Build & Production Deploy

Führe das Build-Script mit dem **`-Prod`** Flag aus:

```powershell
powershell -ExecutionPolicy Bypass -File Template\build-vercel.ps1 -ClientSlug "[slug]" -Prod
```

Das Script macht automatisch:
1. Backup von `Template/lib/client-config.ts`
2. Client-Config einkopieren → `Template/lib/client-config.ts`
3. `images/mocks/` → `Template/public/mocks/` kopieren
4. `npm run build`
5. `Template/public/mocks/` aufräumen (NACH dem Upload!)
6. `vercel deploy --prod --scope=metriq` ausführen
7. Original-Config wiederherstellen

> [!WARNING]
> **Immer `-Prod` Flag verwenden!**
> Ohne `-Prod` wird ein Preview-Deploy erstellt. Die Custom Domain (`[slug].demo.metriq.tech`)
> zeigt auf die Production-URL – Preview-Deploys sind dort NICHT sichtbar.

**Voraussetzungen prüfen vor dem Build:**
- Vercel CLI installiert: `vercel --version` → muss `50.x` oder höher zeigen
- Eingeloggt: `vercel whoami` → muss `mbolsinger-3427` zeigen
- Falls nicht eingeloggt: `vercel login` → OAuth-Flow im Browser abschließen

---

### Schritt 6b – Vercel-Version verifizieren (PFLICHT vor Domain-Alias)

> [!IMPORTANT]
> Bevor die Custom Domain gesetzt wird, MUSS die frisch deployete Production-URL geprüft werden!
> Die Custom Domain soll IMMER auf eine vollständig funktionierende Version zeigen.

Lese die Production-URL aus dem Script-Output (Format: `https://[slug].vercel.app`).
Prüfe diese URL mit dem Vercel MCP-Tool:

```
mcp_vercel_web_fetch_vercel_url url="https://[slug].vercel.app"
```

**Checkpunkte:**
- [ ] Seite lädt ohne Fehler (kein 404, kein 500)
- [ ] Firmenname korrekt im Header / `<title>`
- [ ] Alle Service-Bilder vorhanden (kein broken-image Symbol)
- [ ] Hotspot-Bilder vorhanden (Reifen, Motor, Scheibe oder Äquivalente)
- [ ] Logo / LogoLetter korrekt

**Bei Problemen:**
- Config anpassen → erneut **mit `-Prod`** deployen
- Bilder-404: Dateinamen in `client-config.ts` korrigieren, Schritt 3b wiederholen
- Falscher Name im Header: `brandName` in config prüfen (muss vollständiger Firmenname sein)

Nur wenn alle Checkpunkte bestanden → weiter mit Schritt 7.

---

### Schritt 7 – Custom Domain zuweisen

Nach erfolgreichem Production-Deploy:

```powershell
vercel alias set [slug].vercel.app [slug].demo.metriq.tech --scope=metriq
```

> [!NOTE]
> Der Wildcard-DNS-Eintrag `*.demo → 76.76.21.21` ist in IONOS bereits gesetzt.
> Es sind **keine DNS-Änderungen** mehr nötig – die Domain ist sofort aktiv.

Verifiziere dass die Domain korrekt konfiguriert ist:
```powershell
vercel domains inspect [slug].demo.metriq.tech --scope=metriq
```

---

### Schritt 8 – Notion-Eintrag

Nach erfolgreichem Deploy den Demo-Link in Notion eintragen.

1. **Notion-Datenbank suchen** (Leads / Kunden / Demos – je nachdem was der User angibt):
   ```
   mcp_notion-mcp-server_API-post-search query="[Firmenname]"
   ```

2. **Seite gefunden?**
   - Ja → `mcp_notion-mcp-server_API-patch-page` nutzen um Demo-URL als Property einzutragen
   - Nein → `mcp_notion-mcp-server_API-post-page` um neue Seite/Eintrag anzulegen

3. **Demo-URL eintragen:**
   ```
   https://[slug].demo.metriq.tech
   ```

4. **Optional: Kommentar hinzufügen:**
   ```
   mcp_notion-mcp-server_API-create-a-comment
   body: "Demo-Website automatisch generiert und deployed: https://[slug].demo.metriq.tech"
   ```

> [!NOTE]
> Falls der User keine Notion-Seite angibt, frage kurz nach oder überspringe diesen Schritt
> und teile die URL direkt im Chat mit.

---

### Schritt 9 – Abschlussmeldung

Gib dem User eine klare Zusammenfassung:

```
✅ Demo-Website fertig!

Firma:       [Firmenname]
Demo-URL:    https://[slug].demo.metriq.tech
Vercel:      https://vercel.com/metriq/[slug]
Notion:      [Link zur Notion-Seite falls vorhanden]

Nächste Schritte (falls gewünscht):
- Logo hinzufügen: KFZ-Betriebe/[slug]/logo.png ablegen → rebuild
- Texte anpassen: KFZ-Betriebe/[slug]/client-config.ts editieren → rebuild
- Weiterer Client: "Erstelle Website für [neue Firma]"
```

---

## Schlüssel-Pfade

| Pfad | Zweck |
|------|-------|
| `Template/lib/client-config.ts` | Aktive Config (wird temporär durch Client-Config ersetzt) |
| `KFZ-Betriebe/[slug]/client-config.ts` | Client-spezifische Config (standalone mit Interfaces) |
| `KFZ-Betriebe/[slug]/scraped-data.md` | Rohdata vom Scraping |
| `KFZ-Betriebe/[slug]/logo.png` | Client-Logo (optional) |
| `images/mocks/` | Geteilte Mock-Bilder für alle Clients |
| `Template/public/mocks/` | Temporäre Kopie während Build (auto created/deleted) |
| `Template/build-vercel.ps1` | Build & Deploy Script |
| `Template/next.config.ts` | Next.js Config (KEIN basePath/assetPrefix/output:export!) |

---

## Troubleshooting

| Problem | Ursache | Fix |
|---------|---------|-----|
| Bilder laden nicht | Mocks nicht beim Deploy vorhanden | Sicherstellen dass Mocks NACH dem Deploy gelöscht werden (im Script bereits korrekt) |
| Custom Domain ohne Bilder | Preview statt Production deployed | Erneut mit `-Prod` deployen |
| Vercel CLI: no-credentials-found | Nicht eingeloggt | `vercel login` → Browser-OAuth |
| Build schlägt fehl | TypeScript-Fehler | `npm run build` direkt in `Template/` ausführen für Details |
| Bild 404 | Falscher Dateiname in config | Exakte Namen aus `images/mocks/` prüfen via `list_dir` |
| `bremsen.avif` → 404 | Datei existiert nicht | Richtig: `bremse.avif` (ohne n!) |
| Header zeigt nicht den vollen Namen | `brandName` zu kurz | `brandName` = vollständiger Firmenname (z.B. `'Freie Werkstatt Hamburg'`) |
| Notion-Seite nicht gefunden | Falscher Suchbegriff | Breiteren Suchbegriff nutzen oder DB-ID direkt angeben |

---

## Referenzen

- Build Script: `Template/build-vercel.ps1`
- Config-Schema: `references/config-schema.md`
- Pilot-Beispiel: `KFZ-Betriebe/freie-werkstatt-hamburg/client-config.ts`
- Vercel Team: `metriq` (ID: `team_4XLInQGBbrRVEg6Wzv6nKwBt`)
- DNS: Wildcard `*.demo.metriq.tech → 76.76.21.21` (IONOS, bereits aktiv)
