Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
for ($y = 260; $y -lt 360; $y += 10) {
    for ($x = 550; $x -lt 680; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            Write-Output "y=${y}, x=${x}: R=$($c.R), G=$($c.G), B=$($c.B)"
        }
    }
}
$img.Dispose()
