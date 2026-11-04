Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')

# Let's inspect rows y=120 to 360 in x=450 to 570.
# Check what kind of pixels are there:
# Is there any skin? (Skin has R>130, G>80, B>60, R>G+15, R>B+25)
$skinFound = 0
for ($y = 100; $y -lt 360; $y++) {
    for ($x = 450; $x -lt 580; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -gt 130 -and $c.G -gt 80 -and $c.B -gt 60 -and $c.R -gt ($c.G + 15) -and $c.R -gt ($c.B + 25)) {
            $skinFound++
        }
    }
}
Write-Output "Skin pixels in x=450..580, y=100..360: $skinFound"

# Now let's check between x=570 and 680, y=100 to 360:
for ($y = 120; $y -lt 360; $y += 30) {
    # Check pixels in x=550 to 680
    $blackInBand = 0
    for ($x = 550; $x -lt 680; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            $blackInBand++
        }
    }
    Write-Output "y=${y} black pixels in x=550..680: $blackInBand"
}

$img.Dispose()
