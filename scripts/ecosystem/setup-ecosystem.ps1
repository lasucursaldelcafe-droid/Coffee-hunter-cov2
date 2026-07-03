#Requires -Version 5.1
<#
.SYNOPSIS
  Configura todo el ecosistema La Sucursal del Café en tu PC.

.DESCRIPTION
  Clona/actualiza repos, ejecuta setup por proyecto, sube secrets y verifica URLs.
  Requiere .env.ecosystem.local en PROJECTS_ROOT (ver .env.ecosystem.example).

.EXAMPLE
  .\scripts\ecosystem\setup-ecosystem.ps1
  .\scripts\ecosystem\setup-ecosystem.ps1 -Project empresario-virtual
#>
param(
  [string]$Project = "",
  [switch]$SkipClone,
  [switch]$SkipSecrets,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Set-Location $Root

$args = @("scripts/ecosystem/setup-ecosystem.mjs")
if ($Project) { $args += "--project=$Project" }
if ($SkipClone) { $args += "--skip-clone" }
if ($SkipSecrets) { $args += "--skip-secrets" }
if ($DryRun) { $args += "--dry-run" }

Write-Host "Ecosistema La Sucursal — setup-ecosystem.ps1" -ForegroundColor Cyan
node @args
