# ============================================================
#  deploy-client.ps1
#  Metriq – KFZ Template Deployer
#
#  Usage:
#    .\deploy-client.ps1 -Name "auto-thies"
#
#  Result:
#    demo.metriq.tech/auto-thies/
# ============================================================

param(
    [Parameter(Mandatory = $true)]
    [string]$Name
)

$Root     = $PSScriptRoot
$Config   = Join-Path $Root "next.config.ts"
$OutDir   = Join-Path $Root "out"
$ClientDir = Join-Path $Root $Name

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Metriq Deploy → demo.metriq.tech/$Name" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# ── Schritt 1: next.config.ts patchen ────────────────────────
Write-Host "[1/5] Patche next.config.ts..." -ForegroundColor Yellow

$configContent = Get-Content $Config -Raw

# Ersetze basePath & assetPrefix mit dem neuen Namen
$configContent = $configContent -replace "basePath:\s*'[^']*'",   "basePath: '/$Name'"
$configContent = $configContent -replace "assetPrefix:\s*'[^']*'", "assetPrefix: '/$Name'"

Set-Content $Config $configContent -NoNewline
Write-Host "    basePath = /$Name ✓" -ForegroundColor Green

# ── Schritt 2: Build ─────────────────────────────────────────
Write-Host "[2/5] Baue Next.js..." -ForegroundColor Yellow
Set-Location $Root

& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen!" -ForegroundColor Red
    exit 1
}
Write-Host "    Build ✓" -ForegroundColor Green

# ── Schritt 3: out/ → [Name]-Ordner kopieren ─────────────────
Write-Host "[3/5] Kopiere Build-Output nach .\$Name..." -ForegroundColor Yellow

if (Test-Path $ClientDir) {
    Remove-Item $ClientDir -Recurse -Force
}
New-Item $ClientDir -ItemType Directory -Force | Out-Null
robocopy $OutDir $ClientDir /E /NFL /NDL /NJH /NJS | Out-Null
Write-Host "    Kopiert ✓" -ForegroundColor Green

# ── Schritt 4: Git commit ─────────────────────────────────────
Write-Host "[4/5] Git commit..." -ForegroundColor Yellow

git add "$Name/"
git add next.config.ts
git commit -m "deploy: $Name → demo.metriq.tech/$Name"
Write-Host "    Commit ✓" -ForegroundColor Green

# ── Schritt 5: Push ───────────────────────────────────────────
Write-Host "[5/5] Pushing zu GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host "    Push ✓" -ForegroundColor Green

# ── Fertig ────────────────────────────────────────────────────
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "  ✅ Fertig!" -ForegroundColor Green
Write-Host "  🌐 https://demo.metriq.tech/$Name" -ForegroundColor Green
Write-Host "  (GitHub Pages braucht ~2 Min zum Deployen)" -ForegroundColor Gray
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
