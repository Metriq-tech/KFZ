# ============================================================
#  build-vercel.ps1  -  Client-Website bauen & auf Vercel deployen
#
#  Ausfuehren aus dem Template/-Ordner:
#    powershell -ExecutionPolicy Bypass -File build-vercel.ps1 -ClientSlug "freie-werkstatt-hamburg"
#
#  Ergebnis: https://[slug].demo.metriq.tech
#
#  Voraussetzungen:
#  - Vercel CLI installiert (npm install -g vercel)
#  - Mit Vercel eingeloggt (vercel login oder vercel whoami)
#  - next.config.ts OHNE basePath/assetPrefix/output:export
# ============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientSlug,

    [Parameter(Mandatory=$false)]
    [string]$TeamId = "team_4XLInQGBbrRVEg6Wzv6nKwBt",

    [Parameter(Mandatory=$false)]
    [switch]$Prod = $false
)

# -- Paths --
$TemplateDir = $PSScriptRoot
$RepoRoot    = Split-Path $TemplateDir -Parent
$LibConfig   = Join-Path $TemplateDir "lib\client-config.ts"
$BackupLib   = "$LibConfig.bak"
$ClientCfg   = Join-Path $RepoRoot "KFZ-Betriebe\$ClientSlug\client-config.ts"
$MocksSrc    = Join-Path $RepoRoot "images\mocks"
$MocksDst    = Join-Path $TemplateDir "public\mocks"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  BUILD & DEPLOY (Vercel): $ClientSlug"    -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# -- 1. Backup --
Write-Host "[1/5] Backup client-config.ts..." -ForegroundColor Yellow
Copy-Item $LibConfig $BackupLib -Force
Write-Host "      OK" -ForegroundColor Green

# -- 2. Client-Config einsetzen --
Write-Host "[2/5] Client-Config einsetzen ($ClientSlug)..." -ForegroundColor Yellow
if (-not (Test-Path $ClientCfg)) {
    Write-Host "      FEHLER: $ClientCfg nicht gefunden!" -ForegroundColor Red
    Copy-Item $BackupLib $LibConfig -Force
    Remove-Item $BackupLib -Force -ErrorAction SilentlyContinue
    exit 1
}
Copy-Item $ClientCfg $LibConfig -Force
Write-Host "      OK" -ForegroundColor Green

# -- 3. Mocks kopieren --
Write-Host "[3/5] Mocks -> public/mocks/..." -ForegroundColor Yellow
if (Test-Path $MocksSrc) {
    if (-not (Test-Path $MocksDst)) { New-Item $MocksDst -ItemType Directory -Force | Out-Null }
    Copy-Item "$MocksSrc\*" $MocksDst -Recurse -Force
    $mockCount = (Get-ChildItem $MocksSrc -Force).Count
    Write-Host "      OK ($mockCount Dateien)" -ForegroundColor Green
} else {
    Write-Host "      WARNUNG: $MocksSrc nicht gefunden - Mocks uebersprungen" -ForegroundColor DarkYellow
}

# -- 4. Build --
Write-Host "[4/5] npm run build..." -ForegroundColor Yellow
Set-Location $TemplateDir

npm run build
$buildExit = $LASTEXITCODE

if ($buildExit -ne 0) {
    Write-Host "      FEHLER: Build fehlgeschlagen (Exit $buildExit)" -ForegroundColor Red
    Copy-Item $BackupLib $LibConfig -Force
    Remove-Item $BackupLib -Force -ErrorAction SilentlyContinue
    exit 1
}
Write-Host "      Build OK" -ForegroundColor Green

# -- 5. Vercel Deploy --
Write-Host "[5/5] Vercel Deploy..." -ForegroundColor Yellow

if ($Prod) {
    Write-Host "      Modus: PRODUCTION" -ForegroundColor Green
    $deployOutput = vercel deploy --yes --prod --team=$TeamId 2>&1
} else {
    Write-Host "      Modus: PREVIEW (fuer Prod: -Prod schalten)" -ForegroundColor DarkYellow
    $deployOutput = vercel deploy --yes --team=$TeamId 2>&1
}

$deployExit = $LASTEXITCODE
Write-Host $deployOutput

# -- Mocks aus public/ saeubern (NACH dem Deploy) --
if (Test-Path $MocksDst) { Remove-Item $MocksDst -Recurse -Force }

# -- Restore --
Write-Host "[OK] Originale client-config.ts wiederherstellen..." -ForegroundColor Yellow
Copy-Item $BackupLib $LibConfig -Force
Remove-Item $BackupLib -Force -ErrorAction SilentlyContinue
Write-Host "     OK" -ForegroundColor Green

# -- Ergebnis --
Write-Host ""
if ($deployExit -ne 0) {
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "  FEHLER: Vercel Deploy fehlgeschlagen!"   -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    exit 1
} else {
    $url = ($deployOutput -split "`n" | Select-String -Pattern "https://\S+" | Select-Object -Last 1).Matches.Value
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  FERTIG!"                                  -ForegroundColor Green
    Write-Host "  Deploy URL: $url"                         -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Naechster Schritt: Custom Domain setzen" -ForegroundColor Green
    Write-Host "  $ClientSlug.demo.metriq.tech"            -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Green
}
Write-Host ""
