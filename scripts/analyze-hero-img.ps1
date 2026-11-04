Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')
Write-Output "nashid-hero-theme.png Width: $($bmp.Width), Height: $($bmp.Height)"

# Let's find where non-white or black pixels are in the left 100 pixels (which is where the leftover text 'T', 'O', 'azing' is)
# In nashid-hero-theme.png:
# Left edge: x = 0 to 120.
# The background is either white or light blue.
# The letters 'T', 'O', 'azing' are pure black (or near black, e.g. R<50, G<50, B<50).
# Top right hamburger: x around 450 to 510, y around 10 to 60.

$blackPixelsLeft = 0
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt 120; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            $blackPixelsLeft++
        }
    }
}
Write-Output "Black pixels in left 120px: $blackPixelsLeft"

$blackPixelsTopRight = 0
for ($y = 0; $y -lt 100; $y++) {
    for ($x = ($bmp.Width - 80); $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            $blackPixelsTopRight++
        }
    }
}
Write-Output "Black pixels in top right 80x100px: $blackPixelsTopRight"

$bmp.Dispose()
