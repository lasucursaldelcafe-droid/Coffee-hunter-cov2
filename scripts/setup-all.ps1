#Requires -Version 5.1
<#
.SYNOPSIS
  Full automation: Turso + Vercel + GitHub Secrets + deploy (Colombia Green Coffee)

.DESCRIPTION
  Reads credentials from .env.local in the project root.
  Requires: Node.js, npm, gh (GitHub CLI logged in).
  Optional: Turso CLI or TURSO_PLATFORM_TOKEN in .env.local

.EXAMPLE
  cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
  .\scripts\setup-all.ps1
#>

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $ProjectRoot

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Colombia Green Coffee — setup:all (PowerShell)" -ForegroundColor Cyan
Write-Host " Project: $ProjectRoot" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

function Test-Command($Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

# --- Prerequisites ---
Write-Host "`n[1/5] Checking prerequisites..." -ForegroundColor Yellow
foreach ($cmd in @("node", "npm")) {
    if (-not (Test-Command $cmd)) {
        throw "Required: $cmd — install Node.js from https://nodejs.org/"
    }
    Write-Host "  OK $cmd"
}

if (-not (Test-Command "gh")) {
    Write-Host "  WARN gh not found — install: winget install GitHub.cli" -ForegroundColor DarkYellow
    Write-Host "  Then run: gh auth login" -ForegroundColor DarkYellow
} else {
    Write-Host "  OK gh"
    gh auth status 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Run: gh auth login (account lasucursaldelcafe-droid)" -ForegroundColor DarkYellow
    }
}

# --- .env.local ---
Write-Host "`n[2/5] .env.local..." -ForegroundColor Yellow
$envLocal = Join-Path $ProjectRoot ".env.local"
if (-not (Test-Path $envLocal)) {
    Write-Host "  Creating .env.local from .env.example..."
    npm run setup
}

$requiredVars = @("VERCEL_TOKEN")
$envContent = Get-Content $envLocal -Raw
foreach ($var in $requiredVars) {
    if ($envContent -notmatch "(?m)^${var}=.+") {
        throw "Falta ${var} en .env.local — descomenta la linea y pega tu token (no dejes # al inicio)."
    }
}
Write-Host "  OK .env.local ($($requiredVars -join ', ') presentes)"

# --- npm install ---
Write-Host "`n[3/5] npm install..." -ForegroundColor Yellow
if (-not (Test-Path (Join-Path $ProjectRoot "node_modules"))) {
    npm ci
} else {
    Write-Host "  OK node_modules exists"
}

# --- Run Node orchestrator ---
Write-Host "`n[4/5] Running Node setup:all..." -ForegroundColor Yellow
node scripts/setup-all.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# --- Optional: open dashboards ---
Write-Host "`n[5/5] Done. Useful links:" -ForegroundColor Green
Write-Host "  GitHub Secrets: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/settings/secrets/actions"
Write-Host "  GitHub Actions: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions"
Write-Host "  GitHub Pages:   https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/"
Write-Host "  Cursor Secrets: https://cursor.com/dashboard (Cloud Agents tab)"
Write-Host ""
Write-Host "  Paste cursor-secrets.local.txt into Cursor Dashboard -> Cloud Agents -> Secrets" -ForegroundColor Cyan
Write-Host ""
