Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')
$w = $bmp.Width
$h = $bmp.Height

# Scan rows at y = 100, 150, 200, 250, 300, 350, 400, 450
# Find where the hoodie / head starts (xMin) and ends (xMax)
for ($y = 50; $y -lt $h; $y += 30) {
    $minX = -1
    $maxX = -1
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Check if pixel belongs to person (not pure white, not light blue background, not white)
        # Background is white (R>245, G>245, B>245) or blue glow (B > 220, R < 200, G < 240)
        # Let's check when pixel is clearly part of the person or text:
        # Text is on the left (x < 120). Let's check x >= 120 for the person:
        if ($x -ge 120) {
            # Person has skin tones or black hoodie or hair
            # Black hoodie: R < 70, G < 70, B < 70
            # Skin: R > 120, G > 70, B > 50, R > B + 20
            # Hair / beard: R < 80, G < 80, B < 80
            $isPerson = ($c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) -or ($c.R -gt 130 -and $c.R -gt ($c.B + 20))
            if ($isPerson) {
                if ($minX -eq -1) { $minX = $x }
                $maxX = $x
            }
        }
    }
    Write-Output "y=$y : Person x ranges from $minX to $maxX"
}

$bmp.Dispose()
