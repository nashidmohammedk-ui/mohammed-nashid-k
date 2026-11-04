Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')

# The orbit line is a blue circular arc with color around R=100..180, G=180..220, B=240..255
for ($y = 0; $y -lt $img.Height; $y += 10) {
    for ($x = 450; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check if blue line pixel (not dark, not white, blue channel high, red channel lower)
        if ($c.B -gt 230 -and $c.R -lt 210 -and $c.G -gt 150) {
            Write-Output "Orbit pixel at x=$x, y=$y (R=$($c.R), G=$($c.G), B=$($c.B))"
            break
        }
    }
}

$img.Dispose()
