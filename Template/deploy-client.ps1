# ============================================================
#  deploy-client.ps1  –  Metriq Template Deployer
#
#  Ausfuehren aus dem Template/-Ordner:
#    .\deploy-client.ps1
#
#  Ergebnis: https://demo.metriq.tech
# ============================================================

$TemplateDir = $PSScriptRoot
$RepoRoot    = Split-Path $TemplateDir -Parent
$OutDir      = Join-Path $TemplateDir "out"
$DocsDir     = Join-Path $RepoRoot "docs"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Metriq Deploy -> demo.metriq.tech"       -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Schritt 1: Build
Write-Host "[1/3] Baue Next.js..." -ForegroundColor Yellow
Set-Location $TemplateDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen!" -ForegroundColor Red
    exit 1
}
Write-Host "    Build OK" -ForegroundColor Green

# Schritt 2: out/ -> docs/ kopieren
Write-Host "[2/3] Kopiere nach docs/..." -ForegroundColor Yellow
if (Test-Path $DocsDir) { Remove-Item $DocsDir -Recurse -Force }
New-Item $DocsDir -ItemType Directory -Force | Out-Null
robocopy $OutDir $DocsDir /E /NFL /NDL /NJH /NJS | Out-Null
New-Item (Join-Path $DocsDir ".nojekyll") -ItemType File -Force | Out-Null
Write-Host "    Kopiert OK" -ForegroundColor Green

# Schritt 3: Git commit & push
Write-Host "[3/3] Git commit & push..." -ForegroundColor Yellow
Set-Location $RepoRoot
git add "docs/"
git commit -m "deploy: template -> demo.metriq.tech"
git push origin main
Write-Host "    Push OK" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  FERTIG! https://demo.metriq.tech"        -ForegroundColor Green
Write-Host "  (GitHub Pages braucht ~2 Min)"           -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
