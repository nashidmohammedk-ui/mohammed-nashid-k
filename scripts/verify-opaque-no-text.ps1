Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')

$textBlacks = 0
for ($y = 0; $y -lt 365; $y++) {
    for ($x = 0; $x -lt 120; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
            $textBlacks++
        }
    }
}
Write-Output "nashid-hero-theme.png text pixels in x<120, y<365: $textBlacks"

$hambBlacks = 0
for ($y = 0; $y -le 75; $y++) {
    for ($x = 420; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
            $hambBlacks++
        }
    }
}
Write-Output "nashid-hero-theme.png hamburger pixels: $hambBlacks"

$img.Dispose()
