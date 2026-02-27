# ============================================================
#  build-client.ps1  –  Einzelne Client-Website bauen & deployen
#
#  Ausfuehren aus dem Repo-Root ODER Template/-Ordner:
#    powershell -ExecutionPolicy Bypass -File Template\build-client.ps1 -ClientSlug "freie-werkstatt-hamburg"
#
#  Ergebnis: https://demo.metriq.tech/[slug]
#
#  WICHTIG:
#  - Verwendet NUR assetPrefix (KEIN basePath!) – basePath wuerde
#    index.html in einen Unterordner out/[slug]/ verschieben.
#  - next.config.ts wird per Array geschrieben (kein Here-String).
#  - Mocks werden zusaetzlich nach docs/[slug]/mocks/ kopiert.
# ============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientSlug
)

# ── Paths ──────────────────────────────────────────
$TemplateDir = $PSScriptRoot
$RepoRoot    = Split-Path $TemplateDir -Parent
$OutDir      = Join-Path $TemplateDir "out"
$DocsDir     = Join-Path $RepoRoot "docs\$ClientSlug"
$LibConfig   = Join-Path $TemplateDir "lib\client-config.ts"
$NextCfg     = Join-Path $TemplateDir "next.config.ts"
$BackupLib   = "$LibConfig.bak"
$BackupNext  = "$NextCfg.bak"
$ClientCfg   = Join-Path $RepoRoot "KFZ-Betriebe\$ClientSlug\client-config.ts"
$MocksSrc    = Join-Path $RepoRoot "images\mocks"
$MocksDst    = Join-Path $TemplateDir "public\mocks"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  BUILD: $ClientSlug" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Backup ──────────────────────────────────────
Write-Host "[1/8] Backup originale Configs..." -ForegroundColor Yellow
Copy-Item $LibConfig  $BackupLib  -Force
Copy-Item $NextCfg    $BackupNext -Force
Write-Host "      OK" -ForegroundColor Green

# ── 2. Client-Config einsetzen ─────────────────────
Write-Host "[2/8] Client-Config einsetzen ($ClientSlug)..." -ForegroundColor Yellow
if (-not (Test-Path $ClientCfg)) {
    Write-Host "      FEHLER: $ClientCfg nicht gefunden!" -ForegroundColor Red
    exit 1
}
Copy-Item $ClientCfg $LibConfig -Force
Write-Host "      OK" -ForegroundColor Green

# ── 3. Mocks kopieren ─────────────────────────────
Write-Host "[3/8] Mocks -> public/mocks/..." -ForegroundColor Yellow
if (Test-Path $MocksSrc) {
    if (-not (Test-Path $MocksDst)) { New-Item $MocksDst -ItemType Directory -Force | Out-Null }
    Copy-Item "$MocksSrc\*" $MocksDst -Recurse -Force
    Write-Host "      OK ($((Get-ChildItem $MocksSrc -Force).Count) Dateien)" -ForegroundColor Green
} else {
    Write-Host "      WARNUNG: $MocksSrc nicht gefunden - Mocks uebersprungen" -ForegroundColor DarkYellow
}

# ── 4. next.config.ts ─────────────────────────────────
# WICHTIG: basePath + assetPrefix zusammen = korrekte GitHub Pages Subpath-Lösung
# - basePath: verschiebt alle Routen und <Image>-Pfade auf /slug/
# - assetPrefix: prefixed _next/-Assets für CDN/GitHub Pages
# - Mit basePath exportiert Next.js nach out/[slug]/ statt out/
Write-Host "[4/8] next.config.ts setzen (basePath + assetPrefix)..." -ForegroundColor Yellow
$lines = @(
    "import type { NextConfig } from 'next';",
    "",
    "const nextConfig: NextConfig = {",
    "  reactStrictMode: true,",
    "  basePath: '/$ClientSlug',",
    "  assetPrefix: '/$ClientSlug',",
    "  eslint: { ignoreDuringBuilds: true },",
    "  typescript: { ignoreBuildErrors: false },",
    "  images: {",
    "    unoptimized: true,",
    "    remotePatterns: [",
    "      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },",
    "      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },",
    "    ],",
    "  },",
    "  output: 'export',",
    "  transpilePackages: ['motion'],",
    "};",
    "",
    "export default nextConfig;"
)
[System.IO.File]::WriteAllLines($NextCfg, $lines, [System.Text.Encoding]::UTF8)
# Verify
$verify = (Get-Content $NextCfg -Raw)
if ($verify -match "basePath" -and $verify -match "assetPrefix" -and $verify -match "output: 'export'") {
    Write-Host "      OK (verifiziert: basePath + assetPrefix gesetzt)" -ForegroundColor Green
} else {
    Write-Host "      FEHLER: next.config.ts stimmt nicht!" -ForegroundColor Red
    Copy-Item $BackupLib $LibConfig -Force
    Copy-Item $BackupNext $NextCfg -Force
    exit 1
}

# ── 5. Build ──────────────────────────────────────
Write-Host "[5/8] npm run build..." -ForegroundColor Yellow
Set-Location $TemplateDir
if (Test-Path $OutDir) { Remove-Item $OutDir -Recurse -Force }
npm run build
$buildExit = $LASTEXITCODE

if ($buildExit -ne 0) {
    Write-Host "      FEHLER: Build fehlgeschlagen (Exit $buildExit)" -ForegroundColor Red
    Copy-Item $BackupLib  $LibConfig -Force
    Copy-Item $BackupNext $NextCfg   -Force
    Remove-Item $BackupLib  -Force -ErrorAction SilentlyContinue
    Remove-Item $BackupNext -Force -ErrorAction SilentlyContinue
    if (Test-Path $MocksDst) { Remove-Item $MocksDst -Recurse -Force }
    exit 1
}
Write-Host "      Build OK (Exit $buildExit)" -ForegroundColor Green

# Mocks aus public/ aufraeumen
if (Test-Path $MocksDst) { Remove-Item $MocksDst -Recurse -Force }

# ── 6. Verify out/ ────────────────────────────────
# Mit basePath exportiert Next.js nach out/[slug]/ statt out/
# index.html liegt also in out/[slug]/index.html
Write-Host "[6/8] out/ verifizieren..." -ForegroundColor Yellow
$OutSlugDir  = Join-Path $OutDir $ClientSlug
$indexInSlug = Join-Path $OutSlugDir "index.html"
$indexInRoot = Join-Path $OutDir "index.html"

if (Test-Path $indexInSlug) {
    $sz = (Get-Item $indexInSlug).Length
    Write-Host "      OK: out/$ClientSlug/index.html ($sz bytes)" -ForegroundColor Green
    # Merge: out/[slug]/ nach out/ hochziehen, damit Deploy einfach bleibt
    Write-Host "      Merge: out/$ClientSlug/* -> out/..." -ForegroundColor Yellow
    Get-ChildItem $OutSlugDir -Force | ForEach-Object {
        Copy-Item $_.FullName (Join-Path $OutDir $_.Name) -Recurse -Force
    }
    Remove-Item $OutSlugDir -Recurse -Force
    Write-Host "      Merge OK" -ForegroundColor Green
} elseif (Test-Path $indexInRoot) {
    $sz = (Get-Item $indexInRoot).Length
    Write-Host "      OK: out/index.html ($sz bytes) [direkt in root]" -ForegroundColor Green
} else {
    Write-Host "      FEHLER: index.html weder in out/ noch out/$ClientSlug/!" -ForegroundColor Red
    Write-Host "      Inhalt von out/:" -ForegroundColor Red
    Get-ChildItem $OutDir -Recurse -Force | Select-Object -First 20 | ForEach-Object { Write-Host "        $($_.FullName)" }
    Copy-Item $BackupLib  $LibConfig -Force
    Copy-Item $BackupNext $NextCfg   -Force
    exit 1
}

# ── 7. Deploy: out/ -> docs/[slug]/ ──────────────
Write-Host "[7/8] Deploy -> docs/$ClientSlug/..." -ForegroundColor Yellow
if (Test-Path $DocsDir) { Remove-Item $DocsDir -Recurse -Force }
# Direkte Kopie des ganzen Ordners (zuverlaessiger als ForEach-Object)
Copy-Item $OutDir $DocsDir -Recurse -Force
# .nojekyll sicherstellen
New-Item (Join-Path $DocsDir ".nojekyll") -ItemType File -Force | Out-Null

# Mocks zusaetzlich nach docs/ kopieren (falls der Build sie entfernt hat)
$DocsMocks = Join-Path $DocsDir "mocks"
if (-not (Test-Path $DocsMocks) -or (Get-ChildItem $DocsMocks -Force -ErrorAction SilentlyContinue).Count -eq 0) {
    if (Test-Path $MocksSrc) {
        Write-Host "      Mocks -> docs/$ClientSlug/mocks/..." -ForegroundColor Yellow
        if (-not (Test-Path $DocsMocks)) { New-Item $DocsMocks -ItemType Directory -Force | Out-Null }
        Copy-Item "$MocksSrc\*" $DocsMocks -Recurse -Force
    }
}

# Verify deploy
$docsIndex = Join-Path $DocsDir "index.html"
if (Test-Path $docsIndex) {
    $sz = (Get-Item $docsIndex).Length
    Write-Host "      OK: docs/$ClientSlug/index.html ($sz bytes)" -ForegroundColor Green
} else {
    Write-Host "      FEHLER: index.html fehlt in docs/$ClientSlug/!" -ForegroundColor Red
}

# ── 8. Restore ────────────────────────────────────
Write-Host "[8/8] Originale wiederherstellen..." -ForegroundColor Yellow
Copy-Item $BackupLib  $LibConfig -Force
Copy-Item $BackupNext $NextCfg   -Force
Remove-Item $BackupLib  -Force -ErrorAction SilentlyContinue
Remove-Item $BackupNext -Force -ErrorAction SilentlyContinue
Write-Host "      OK" -ForegroundColor Green

# ── Fertig ────────────────────────────────────────
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  FERTIG! Assets in: docs/$ClientSlug/"     -ForegroundColor Green
Write-Host "  Jetzt deployen:"                          -ForegroundColor Green
Write-Host "    cd $RepoRoot"                            -ForegroundColor Gray
Write-Host "    git add docs/$ClientSlug"                -ForegroundColor Gray
Write-Host "    git commit -m 'deploy: $ClientSlug'"     -ForegroundColor Gray
Write-Host "    git push origin main"                    -ForegroundColor Gray
Write-Host ""
Write-Host "  URL: https://demo.metriq.tech/$ClientSlug" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
