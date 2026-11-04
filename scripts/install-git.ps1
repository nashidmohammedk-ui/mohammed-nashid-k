[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$targetDir = "C:\Users\best\AppData\Local\Programs\git"
if (Test-Path "$targetDir\cmd\git.exe") {
    Write-Output "Git already installed at $targetDir"
    exit 0
}

Write-Output "Finding latest MinGit..."
try {
    $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/git-for-windows/git/releases/latest" -UserAgent "PowerShell"
    $asset = $releases.assets | Where-Object { $_.name -match '^MinGit-.*-64-bit\.zip$' } | Select-Object -First 1
    $url = $asset.browser_download_url
    Write-Output "Found URL: $url"
} catch {
    $url = "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip"
    Write-Output "Using fallback URL: $url"
}

$zipPath = "$env:TEMP\mingit.zip"
Write-Output "Downloading MinGit to $zipPath..."
Invoke-WebRequest -Uri $url -OutFile $zipPath -UserAgent "PowerShell"
Write-Output "Download complete. Extracting to $targetDir..."

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

Expand-Archive -Path $zipPath -DestinationPath $targetDir -Force
Write-Output "Extracted successfully."

if (Test-Path "$targetDir\cmd\git.exe") {
    Write-Output "SUCCESS: git.exe ready at $targetDir\cmd\git.exe"
    & "$targetDir\cmd\git.exe" --version
} else {
    Write-Output "FAILED: git.exe not found in $targetDir\cmd"
}
