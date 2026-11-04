Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')
for ($y = 370; $y -le 400; $y++) {
    for ($x = 30; $x -le 80; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 100 -and $c.G -lt 100 -and $c.B -lt 100) {
            Write-Output "Pixel at x=$x, y=$y (R=$($c.R), G=$($c.G), B=$($c.B))"
        }
    }
}
$bmp.Dispose()
