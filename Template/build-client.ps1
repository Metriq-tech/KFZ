# ============================================================
#  build-client.ps1  –  Einzelne Client-Website bauen & deployen
#
#  Ausfuehren aus dem Template/-Ordner:
#    .\build-client.ps1 -ClientSlug "freie-werkstatt-hamburg"
#
#  Ergebnis: https://demo.metriq.tech/freie-werkstatt-hamburg
# ============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientSlug
)

$TemplateDir  = $PSScriptRoot
$RepoRoot     = Split-Path $TemplateDir -Parent
$ClientDir    = Join-Path (Join-Path $RepoRoot "KFZ-Betriebe") $ClientSlug
$ClientConfig = Join-Path $ClientDir "client-config.ts"
$OrigConfig   = Join-Path (Join-Path $TemplateDir "lib") "client-config.ts"
$BackupConfig = Join-Path (Join-Path $TemplateDir "lib") "client-config.ts.bak"
$NextConfig   = Join-Path $TemplateDir "next.config.ts"
$NextBackup   = Join-Path $TemplateDir "next.config.ts.bak"
$OutDir       = Join-Path $TemplateDir "out"
$DocsDir      = Join-Path (Join-Path $RepoRoot "docs") $ClientSlug

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  Build: $ClientSlug"                        -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# -- Pruefungen --
if (-not (Test-Path $ClientConfig)) {
    Write-Host "FEHLER: $ClientConfig nicht gefunden!" -ForegroundColor Red
    exit 1
}

# -- 1. Backup original config --
Write-Host "[1/5] Backup originale Configs..." -ForegroundColor Yellow
Copy-Item $OrigConfig $BackupConfig -Force
Copy-Item $NextConfig $NextBackup -Force
Write-Host "      OK" -ForegroundColor Green

# -- 2. Client-Config einsetzen --
Write-Host "[2/5] Client-Config einsetzen ($ClientSlug)..." -ForegroundColor Yellow

# Read original file, extract types section (everything before line starting with "// -- 2." or "export const clientConfig")
$origLines = Get-Content $OrigConfig
$splitIndex = -1
for ($i = 0; $i -lt $origLines.Count; $i++) {
    if ($origLines[$i] -match "^// .+ 2\. ") {
        $splitIndex = $i
        break
    }
}
if ($splitIndex -eq -1) {
    # Fallback: find "export const clientConfig"
    for ($i = 0; $i -lt $origLines.Count; $i++) {
        if ($origLines[$i] -match "^export const clientConfig") {
            $splitIndex = $i
            break
        }
    }
}

$typesSection = $origLines[0..($splitIndex - 1)] -join "`n"

# Read client config, remove the import line
$clientLines = Get-Content $ClientConfig
$clientFiltered = $clientLines | Where-Object { $_ -notmatch "^import type.*from.*client-config" }
$clientSection = ($clientFiltered -join "`n").Trim()

# Merge: types + empty line + client config
$merged = $typesSection + "`n`n" + $clientSection
[System.IO.File]::WriteAllText($OrigConfig, $merged, [System.Text.Encoding]::UTF8)

Write-Host "      OK" -ForegroundColor Green

# -- 3. basePath setzen --
Write-Host "[3/5] basePath setzen -> /$ClientSlug..." -ForegroundColor Yellow
$nextContent = Get-Content $NextConfig -Raw
$nextContent = $nextContent -replace "(reactStrictMode: true,)", "`$1`n  basePath: '/$ClientSlug',`n  assetPrefix: '/$ClientSlug',"
[System.IO.File]::WriteAllText($NextConfig, $nextContent, [System.Text.Encoding]::UTF8)
Write-Host "      OK" -ForegroundColor Green

# -- 4. Build --
Write-Host "[4/5] Baue Next.js..." -ForegroundColor Yellow
Set-Location $TemplateDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen! Stelle Originale wieder her..." -ForegroundColor Red
    Copy-Item $BackupConfig $OrigConfig -Force
    Copy-Item $NextBackup $NextConfig -Force
    Remove-Item $BackupConfig -Force
    Remove-Item $NextBackup -Force
    exit 1
}
Write-Host "      Build OK" -ForegroundColor Green

# -- 5. Deploy: out/ -> docs/<slug>/ --
Write-Host "[5/5] Kopiere nach docs/$ClientSlug/..." -ForegroundColor Yellow
if (Test-Path $DocsDir) { Remove-Item $DocsDir -Recurse -Force }
New-Item $DocsDir -ItemType Directory -Force | Out-Null
robocopy $OutDir $DocsDir /E /NFL /NDL /NJH /NJS | Out-Null
New-Item (Join-Path $DocsDir ".nojekyll") -ItemType File -Force | Out-Null
Write-Host "      Kopiert OK" -ForegroundColor Green

# -- Restore originals --
Write-Host ""
Write-Host "Stelle Original-Configs wieder her..." -ForegroundColor Yellow
Copy-Item $BackupConfig $OrigConfig -Force
Copy-Item $NextBackup $NextConfig -Force
Remove-Item $BackupConfig -Force
Remove-Item $NextBackup -Force
Write-Host "      Wiederhergestellt OK" -ForegroundColor Green

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "  FERTIG! Asset in: docs/$ClientSlug/"       -ForegroundColor Green
Write-Host "  Zum Deployen:"                              -ForegroundColor Green
Write-Host "    cd $RepoRoot"                             -ForegroundColor Gray
Write-Host "    git add docs/$ClientSlug"                 -ForegroundColor Gray
Write-Host "    git commit -m 'deploy: $ClientSlug'"      -ForegroundColor Gray
Write-Host "    git push origin main"                     -ForegroundColor Gray
Write-Host ""
Write-Host "  URL: https://demo.metriq.tech/$ClientSlug"  -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""
