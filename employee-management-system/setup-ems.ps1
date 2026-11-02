param(
    [string]$ProjectDir = $PSScriptRoot,
    [string]$TomcatHome = $env:CATALINA_HOME,
    [string]$MySqlBin = "C:\Program Files\MySQL\MySQL Server 8.0\bin"
)

$ErrorActionPreference = "Stop"

Write-Host "Employee Management System - Windows setup" -ForegroundColor Cyan

if (-not (Get-Command java -ErrorAction SilentlyContinue)) { throw "Java is not on PATH. Install JDK 21 and restart PowerShell." }
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) { throw "Maven is not on PATH. Install Maven and restart PowerShell." }
if (-not (Test-Path $TomcatHome)) { throw "TomcatHome was not found. Set CATALINA_HOME or pass -TomcatHome 'C:\apache-tomcat-10.1.xx'." }
if (-not (Test-Path (Join-Path $MySqlBin 'mysql.exe'))) { throw "mysql.exe was not found. Pass -MySqlBin 'C:\path\to\mysql\bin'." }

$mysql = Join-Path $MySqlBin 'mysql.exe'
$war = Join-Path $ProjectDir 'target\employee-management-system.war'
$webapps = Join-Path $TomcatHome 'webapps'

Write-Host "Importing database schema. Enter your MySQL root password if prompted." -ForegroundColor Yellow
Get-Content (Join-Path $ProjectDir 'database\employee_management.sql') | & $mysql -u root -p

Write-Host "Building WAR with Maven..." -ForegroundColor Yellow
Push-Location $ProjectDir
try { & mvn clean package -DskipTests } finally { Pop-Location }

Copy-Item $war (Join-Path $webapps 'employee-management-system.war') -Force
Write-Host "WAR copied to $webapps" -ForegroundColor Green
Write-Host "Setup complete. Run .\run-ems.ps1 to start Tomcat." -ForegroundColor Green
