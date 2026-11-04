Add-Type -AssemblyName System.Drawing

function Check-Transparency($name) {
    $path = "c:\portfolio\assets\$name"
    if (Test-Path $path) {
        $bmp = New-Object System.Drawing.Bitmap($path)
        $hasAlpha = $false
        for ($y = 0; $y -lt [Math]::Min($bmp.Height, 50); $y += 5) {
            for ($x = 0; $x -lt [Math]::Min($bmp.Width, 50); $x += 5) {
                if ($bmp.GetPixel($x, $y).A -lt 250) {
                    $hasAlpha = $true
                    break
                }
            }
            if ($hasAlpha) { break }
        }
        Write-Output "${name}: $($bmp.Width)x$($bmp.Height), TransparentAlpha=$hasAlpha"
        $bmp.Dispose()
    }
}

Check-Transparency 'nashid-portrait.png'
Check-Transparency 'nashid-editorial-portrait.png'
Check-Transparency 'nashid-about-visual.png'
Check-Transparency 'nashid-hero-theme-transparent.png'
