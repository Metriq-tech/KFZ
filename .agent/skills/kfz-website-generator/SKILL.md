---
name: kfz-website-generator
description: >
  Automates the full pipeline for generating and deploying a personalized KFZ demo website
  for a new client. Given a client name (and optionally a website URL), the skill scrapes the
  site, extracts real data, generates a client-config.ts, builds the Next.js static site,
  deploys it to docs/[client-slug]/, and pushes to GitHub Pages at demo.metriq.tech/[slug].
---

# KFZ Website Generator

## Trigger

Use this skill whenever the user says something like:
- „Erstelle die Website für [Firmenname]"
- „Generate website for [company]"
- „Demo-Site für [client]"

---

## ⚠️ Critical Deployment Rules (MUST READ)

> [!CAUTION]
> These rules were learned from painful debugging sessions. Violating them **will** break the deployment.

1. **NEVER use `basePath` in `next.config.ts`** – it causes `index.html` to be written to `out/[slug]/index.html` instead of `out/index.html`. Use **only `assetPrefix`**.
2. **Write `next.config.ts` using a string array** (`WriteAllLines`), NOT a PowerShell Here-String (`@"..."@`). Here-Strings cause encoding issues on Windows.
3. **Use `Copy-Item -Recurse`** to copy `out/` → `docs/[slug]/`, NOT `robocopy` (unreliable for `index.html` on Windows) and NOT `Get-ChildItem | ForEach-Object { Copy-Item }` (misses files).
4. **Always copy mocks to `docs/[slug]/mocks/`** after the build – the build copies them from `public/mocks/` to `out/mocks/`, but if something goes wrong, the fallback copy from `images/mocks/` ensures they're present.
5. **Git push should be done SEPARATELY** after verifying `docs/[slug]/index.html` exists.
6. **Client-config MUST be standalone** – all TypeScript interfaces must be defined inline (no `import type` from Template paths).

---

## Step-by-Step Workflow

### Step 1 – Identify the Client

Ask the user for (or infer from context):
- **Firmenname** (e.g. „Freie Werkstatt Hamburg")
- **Website-URL** (e.g. `freiewerkstatthamburg.de`) — if not provided, search via Google
- **Logo**: does a `logo.png` exist in `KFZ-Betriebe/[slug]/`? If not, use `logoLetter`.

Derive the **slug** automatically:
- Lowercase, German umlauts replaced: ä→ae, ö→oe, ü→ue, ß→ss
- Spaces → hyphens, strip special chars
- Example: „Freie Werkstatt Hamburg" → `freie-werkstatt-hamburg`

---

### Step 2 – Scrape the Website

Use the `mcp_apify_apify-slash-rag-web-browser` tool to scrape the client's website.

```
query: "[website-url]"
maxResults: 1
```

Extract the following from the scraped content:
- **Business name** (confirm/refine)
- **Address** (full street + city + ZIP)
- **Phone number** (clean format for display, E.164 for `phone` field)
- **Email** (if found)
- **Services** offered (list of KFZ services)
- **Google reviews / rating** (if mentioned — for `googleReviews.rating` and `googleReviews.count`)
- **Color hints** (brand colors if recognizable)
- **Social media links** (Facebook, Instagram, etc.)

If data is missing, use sensible placeholders (see `references/config-schema.md`).

---

### Step 3 – Generate client-config.ts

Use your built-in knowledge to assemble the config:

1. **Map services** to 6 service slots. Use `iconName` values from:
   `wrench`, `shield`, `settings`, `wind`, `disc`, `clock`, `gift`, `thumbsup`, `tag`, `layers`

2. **Map stat icons** — assign `iconName` to each stat based on its meaning:
   - Reviews/Bewertungen → `star`
   - Google Score → `thumbsup`
   - Years of experience → `clock`
   - Free estimate / Kostenlos → `gift`
   - Fixed prices / Festpreise → `tag`
   - Coverage / branches → `wrench`
   - Vehicle types → `layers`

3. **Write hero headline** (2 lines, punchy, fits the brand).

4. **Write about description** (2–3 sentences, professional, based on scraped data).

5. **Choose primary color**:
   - If brand color found → use it
   - Default fallback: `#dc2626` (red)

6. **Write SEO title + description** (German, mentioning city + services).

7. **Select images from `/mocks/`** – choose semantically matching filenames:

   Available mock images (in `images/mocks/`):
   ```
   Werkstatt1.jpg, Werkstatt2.jpg      → General workshop, about section
   Nahaufnahme1.avif                   → Close-up detail work
   Inspektion1.avif                    → Inspection / HU/AU / maintenance
   motor.avif                          → Engine / motor repairs
   bremsen.avif                        → Brakes / Fahrwerk
   klimaanlage1.avif                   → Climate / Klimaservice
   elektrik.avif                       → Electrical / diagnosis
   reifenwechsel.avif                  → Tires / Reifen
   Reparatur_Frontscheibe1.avif        → Glass repair / Scheibe
   Frontscheibe6.png                   → Windshield (alternative)
   Reifen.png                          → Tire product image (for hotspot)
   ```

   Use `/mocks/[filename]` as the image path in the config. The build script copies mocks automatically.

Then generate the full `client-config.ts` using the schema in `references/config-schema.md`.

---

### Step 4 – Write the Config File

Write the generated config to:
```
KFZ-Betriebe/[client-slug]/client-config.ts
```

> [!IMPORTANT]
> The client config MUST include ALL TypeScript interfaces defined inline.
> Do NOT use `import type { ClientConfig } from '../../Template/lib/client-config'`.
> Copy the interface definitions from the Template's `client-config.ts` and paste them
> directly at the top of the client config. This prevents circular import errors during build.

Also save a copy of the scraped raw data as:
```
KFZ-Betriebe/[client-slug]/scraped-data.md
```

---

### Step 5 – Ask User for Logo (Optional)

Notify the user:
> „Ich habe die Config für [Firmenname] erstellt. Falls du ein Logo hast, lege es bitte als `KFZ-Betriebe/[slug]/logo.png` ab. Ich verwende sonst den Buchstaben '[X]' als Platzhalter. Soll ich jetzt bauen?"

Wait for user confirmation or auto-proceed if user says „Continue".

---

### Step 6 – Build and Deploy

Run the build script:

```powershell
powershell -ExecutionPolicy Bypass -File Template\build-client.ps1 -ClientSlug "[slug]"
```

The `build-client.ps1` script automatically:
1. Backs up `Template/lib/client-config.ts` and `next.config.ts`
2. Copies the client config directly into `Template/lib/client-config.ts`
3. **Copies `images/mocks/` → `Template/public/mocks/`** (so `/mocks/` paths resolve during build)
4. Writes `next.config.ts` with **only `assetPrefix`** (NO `basePath`!)
5. Runs `npm run build` (output goes to `Template/out/`)
6. **Removes `Template/public/mocks/`** (cleanup)
7. Copies `out/` → `docs/[slug]/` using `Copy-Item -Recurse`
8. **Copies mocks** from `images/mocks/` → `docs/[slug]/mocks/` (safety fallback)
9. Restores original configs from backups

> [!WARNING]
> If the build script fails or `index.html` is missing from `docs/[slug]/`:
> 1. Run `npm run build` directly from `Template/` directory
> 2. Copy `Template/out/` → `docs/[slug]/` manually
> 3. Copy `images/mocks/` → `docs/[slug]/mocks/` manually
> 4. Restore original configs

---

### Step 7 – Verify and Push

1. **Verify `index.html` exists**:
```powershell
# Use find_by_name tool (NOT Get-ChildItem, which sometimes hides files on Windows!)
find_by_name pattern="index.html" in docs/[slug]/
```

2. **Git commit and push**:
```bash
git add docs/[slug]
git commit -m "deploy: [Firmenname] demo site"
git push origin main
```

3. **Wait ~2 minutes** for GitHub Pages to deploy.

4. **Verify live**: Open `https://demo.metriq.tech/[slug]` in browser and check:
   - Page loads (no 404)
   - CSS/JS loads (not plain HTML)
   - Images visible (no broken /mocks/ paths)

---

### Step 8 – Restore Template

After successful push, ensure `Template/lib/client-config.ts` is back to the Meister Hamburg default, and `Template/next.config.ts` has **no basePath and no assetPrefix**. The build script handles this automatically.

---

## Key Paths

| Path | Purpose |
|------|---------|
| `Template/lib/client-config.ts` | Active config used by Next.js build |
| `KFZ-Betriebe/[slug]/client-config.ts` | Saved client-specific config (self-contained with all interfaces) |
| `KFZ-Betriebe/[slug]/logo.png` | Client logo (optional) |
| `images/mocks/` | Shared mock images used across all clients |
| `Template/public/mocks/` | Temporary copy of mocks during build (auto-created/deleted) |
| `docs/[slug]/` | Static build output (GitHub Pages) |
| `Template/build-client.ps1` | Build automation script |

---

## Config Fields Reference

### `stats[].iconName` (required)
Each stat needs an `iconName`. Assign semantically:
```ts
{ value: '20+', label: 'Jahre Erfahrung', iconName: 'clock' }
{ value: '4.9 ★', label: 'Google Score',  iconName: 'star' }
{ value: 'Gratis', label: 'Kostenvoranschlag', iconName: 'gift' }
{ value: 'ab 99€', label: 'Festpreise',    iconName: 'tag' }
```

Available iconNames: `wrench`, `star`, `disc`, `settings`, `shield`, `clock`, `gift`, `thumbsup`, `tag`, `layers`

### `googleReviews` (optional but recommended)
```ts
googleReviews: { rating: 4.9, count: 350 }
```
Displays the Google badge with stars and review count in the Testimonials section.

---

## Known Gotchas

| Problem | Cause | Fix |
|---------|-------|-----|
| 404 on GitHub Pages | `index.html` missing in `docs/[slug]/` | Check with `find_by_name` (not `Get-ChildItem`), rebuild if needed |
| HTML loads but no CSS/JS | `assetPrefix` not set | Verify `next.config.ts` has `assetPrefix: '/[slug]'` |
| `index.html` in wrong subfolder | `basePath` was set in `next.config.ts` | REMOVE basePath, use ONLY assetPrefix |
| Broken images | Mocks not copied to `docs/[slug]/mocks/` | Manually copy `images/mocks/` → `docs/[slug]/mocks/` |
| Build script parse error | Em-dash (–) or umlauts in PS strings | Use only ASCII in Write-Host messages |
| Circular import error | Client config imports from Template | Make client config standalone with inline interfaces |
| `robocopy` skips files | Windows robocopy unreliable for html | Use `Copy-Item -Recurse` instead |
| Images fail to load | `assetPrefix` doesn't apply to `<Image src>` | Wrap paths with `withPrefix(image.src)` from `asset-prefix.ts` |

---

## References

- Config schema: `references/config-schema.md`
- Pilot example: `KFZ-Betriebe/freie-werkstatt-hamburg/client-config.ts`
