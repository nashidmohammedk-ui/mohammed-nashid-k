Add-Type -AssemblyName System.Drawing

$ref = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
$cropX = 500
$cropY = 0
$cropW = $ref.Width - $cropX
$cropH = $ref.Height

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $ref.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Now in $cropped:
# Region 1: Left text zone (x from 0 to 110, y from 100 to 365)
# Any pixel that is black or grey (from the letters PORTFOLIO and 'azing') should be made pure white (#FFFFFF)
for ($y = 0; $y -lt 368; $y++) {
    for ($x = 0; $x -lt 115; $x++) {
        $c = $cropped.GetPixel($x, $y)
        # Check if text pixel (grey/black or anti-aliased edge)
        # Orbit line has distinct sky-blue color: B > 220, R < 200, G > 160, and B - R > 30
        $isOrbit = ($c.B -gt 210 -and $c.R -lt 210 -and ($c.B - $c.R) -gt 30)
        
        # If not orbit, and pixel is not background white (i.e. darker than 245)
        if (!$isOrbit -and ($c.R -lt 248 -or $c.G -lt 248 -or $c.B -lt 248)) {
            # Erase text pixel with pure white
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        }
    }
}

# Region 2: Top-right hamburger menu (x in reference: 940..1010 => in cropped: 440..515, y: 10..70)
# Clean any non-white pixels there
for ($y = 10; $y -le 70; $y++) {
    for ($x = 440; $x -lt $cropW; $x++) {
        $c = $cropped.GetPixel($x, $y)
        # If dark or grey
        if ($c.R -lt 200 -and $c.G -lt 200 -and $c.B -lt 200) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        }
    }
}

# Also let's check if there are any other stray dark pixels on the left margin (x < 30) across all y
for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt 40; $x++) {
        $c = $cropped.GetPixel($x, $y)
        $isOrbit = ($c.B -gt 210 -and $c.R -lt 210 -and ($c.B - $c.R) -gt 30)
        if (!$isOrbit -and ($c.R -lt 248 -or $c.G -lt 248 -or $c.B -lt 248)) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        }
    }
}

# Save cleaned image
$outPath = 'c:\portfolio\assets\nashid-hero-theme.png'
$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Cleaned nashid-hero-theme.png saved successfully!"

$cropped.Dispose()
$ref.Dispose()
