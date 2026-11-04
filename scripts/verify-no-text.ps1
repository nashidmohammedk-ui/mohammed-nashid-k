Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme-transparent.png')

# Check text zone: x < 120, y < 365
$textBlacks = 0
for ($y = 0; $y -lt 365; $y++) {
    for ($x = 0; $x -lt 120; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check if any black/grey text remains (alpha > 50 and R < 100 and G < 100 and B < 100)
        if ($c.A -gt 50 -and $c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
            $textBlacks++
            Write-Output "Leftover text at x=$x, y=$y (A=$($c.A), R=$($c.R), G=$($c.G), B=$($c.B))"
        }
    }
}
Write-Output "Total leftover text pixels in x<120, y<365: $textBlacks"

# Check hamburger zone: x >= 420, y <= 75
$hambBlacks = 0
for ($y = 0; $y -le 75; $y++) {
    for ($x = 420; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.A -gt 50 -and $c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
            $hambBlacks++
            Write-Output "Leftover hamburger at x=$x, y=$y (A=$($c.A), R=$($c.R), G=$($c.G), B=$($c.B))"
        }
    }
}
Write-Output "Total leftover hamburger pixels: $hambBlacks"

$img.Dispose()
