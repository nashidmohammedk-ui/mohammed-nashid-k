Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
for ($y = 120; $y -le 365; $y++) {
    for ($x = 560; $x -le 610; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) {
            Write-Output "Text pixel at x=$x, y=$y"
        }
    }
}
$img.Dispose()
