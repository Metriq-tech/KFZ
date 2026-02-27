# AI_STATUS – Stand 2026-02-27 (23:57)

## Aktueller Fokus: Migration von GitHub Pages → Vercel ⚡

GitHub Pages funktioniert nicht gut für dieses Setup (Next.js Static Export mit Subpfaden).
Wir migrieren zu Vercel, wo jeder Client eine eigene Subdomain bekommt.

---

## Was erledigt ist ✅

### Vercel MCP konfiguriert
- `~/.gemini/antigravity/mcp_config.json` wurde korrigiert
- **Alt (broken):** `@vercel/mcp-server` (existiert nicht auf npm!)
- **Neu (korrekt):** `npx -y mcp-remote https://mcp.vercel.com`
- `mcp-remote` wurde getestet und startet erfolgreich OAuth-Flow

### Template & Build-System (aus vorherigen Sessions)
- `Template/build-client.ps1` – robustes Build-Script (Array-basiert, kein Here-String)
- Nur `assetPrefix` (KEIN `basePath`!)
- `Template/lib/asset-prefix.ts` – Util-Funktion `withPrefix()` erstellt
- Mocks-Handling in Build-Script integriert

### Freie Werkstatt Hamburg
- `KFZ-Betriebe/freie-werkstatt-hamburg/client-config.ts` ✅
- `docs/freie-werkstatt-hamburg/` – static build vorhanden ✅

---

## Was nach dem Neustart zu tun ist ❗

### Schritt 1 – Vercel MCP OAuth abschliessen
Nach Antigravity-Neustart: Vercel MCP startet OAuth-Flow → Browser-Fenster öffnet sich automatisch → Mit Vercel-Account anmelden → Consent geben → MCP wird grün.

### Schritt 2 – Vercel-Projekt für FWH anlegen
Ein neues Vercel-Projekt für Freie Werkstatt Hamburg deployen.
Ziel-URL: `freie-werkstatt-hamburg.demo.metriq.tech`

Dabei:
- Kein `assetPrefix` / `basePath` mehr in `next.config.ts`!
- Site läuft an Root (`/`) → alles funktioniert out-of-the-box
- Wildcard-Domain `*.demo.metriq.tech` bei Vercel konfigurieren

### Schritt 3 – Build-Script und SKILL.md auf Vercel umstellen
- `build-client.ps1` anpassen: kein `docs/[slug]/` mehr, stattdessen Vercel CLI Deploy
- Neuer Workflow: Build → `vercel deploy --prod` oder ähnlich via Vercel CLI / API
- `SKILL.md` (`kfz-website-generator`) updaten: Deployment-Abschnitt auf Vercel umschreiben

---

## Deployment-Konzept: Vercel (NEU)

| Aspekt | GitHub Pages (alt) | Vercel (neu) |
|--------|-------------------|--------------|
| URL-Schema | `demo.metriq.tech/[slug]/` | `[slug].demo.metriq.tech` |
| `assetPrefix` | ✗ Pflicht, macht Probleme | ✅ Nicht nötig |
| `basePath` | ✗ Nie verwenden! | ✅ Nicht nötig |
| Bilder | 404s wegen falschem Prefix | ✅ Funktionieren out-of-the-box |
| Deploy | Git push → GitHub Actions | Vercel CLI / MCP direkt |

---

## Vercel MCP – Technische Details

- **Endpoint:** `https://mcp.vercel.com`
- **Auth:** OAuth (kein Token in Config nötig!)
- **Config-Eintrag in `mcp_config.json`:**
```json
"vercel": {
  "command": "npx",
  "args": ["-y", "mcp-remote", "https://mcp.vercel.com"]
}
```
- **Offizielle Vercel Doku:** https://vercel.com/docs/agent-resources/vercel-mcp

---

## Datei-Übersicht (relevant)

```
Metriq_Website_KFZ/
  Template/
    lib/
      asset-prefix.ts      ← withPrefix() Utility
      client-config.ts     ← Template-Default (wird nach Build restored)
    components/
      Hero.tsx             ← braucht withPrefix() (noch nicht erledigt)
      Services.tsx         ← braucht withPrefix() (noch nicht erledigt)
      Features.tsx         ← braucht withPrefix() (noch nicht erledigt)
      Testimonials.tsx     ← braucht withPrefix() (noch nicht erledigt)
    build-client.ps1       ← muss auf Vercel-Deployment umgestellt werden

  KFZ-Betriebe/
    freie-werkstatt-hamburg/
      client-config.ts     ← FWH-Config ✅

  docs/freie-werkstatt-hamburg/  ← alt (GitHub Pages), wird deprecated
    index.html ✅
    mocks/ ✅
    _next/ ✅

  .agent/skills/kfz-website-generator/SKILL.md  ← muss auf Vercel umgeschrieben werden
```

> [!NOTE]
> Die `withPrefix()`-Fixes in den Komponenten sind für Vercel NICHT mehr nötig,
> da die Site an Root (`/`) läuft. Das ist der Hauptvorteil von Vercel!
