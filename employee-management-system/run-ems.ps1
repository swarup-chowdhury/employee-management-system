param(
    [string]$TomcatHome = $env:CATALINA_HOME,
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
if (-not (Test-Path $TomcatHome)) { throw "TomcatHome was not found. Set CATALINA_HOME or pass -TomcatHome 'C:\apache-tomcat-10.1.xx'." }

$env:CATALINA_HOME = $TomcatHome
$env:CATALINA_BASE = $TomcatHome
$startup = Join-Path $TomcatHome "bin\startup.bat"
if (-not (Test-Path $startup)) { throw "Tomcat startup.bat was not found at $startup" }

Write-Host "Starting Apache Tomcat..." -ForegroundColor Cyan
Start-Process -FilePath $startup -WorkingDirectory (Join-Path $TomcatHome "bin")
Start-Sleep -Seconds 5
Write-Host "EMS is available at: http://localhost:$Port/employee-management-system/login" -ForegroundColor Green
Write-Host "Development login: admin / Admin@123" -ForegroundColor Yellow
Write-Host "Keep this PC awake and connected for the website to remain available." -ForegroundColor Yellow
