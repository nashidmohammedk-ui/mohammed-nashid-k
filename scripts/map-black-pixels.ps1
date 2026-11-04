Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
# Full image is 1024 x 484.
# Let's inspect where Mohammed Nashid's hoodie begins on the left side:
# At y from 0 to 484, where is the person?
for ($y = 0; $y -lt $img.Height; $y += 20) {
    # Scan from x = 500 to 1024
    # Find any black pixel
    $blackXs = @()
    for ($x = 450; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check dark pixels (R<60, G<60, B<60)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            $blackXs += $x
        }
    }
    if ($blackXs.Count -gt 0) {
        $min = ($blackXs | Measure-Object -Minimum).Minimum
        $max = ($blackXs | Measure-Object -Maximum).Maximum
        Write-Output "y=${y} : black pixels count=$($blackXs.Count), minX=$min, maxX=$max"
    } else {
        Write-Output "y=${y} : no black pixels in x=450..1024"
    }
}
$img.Dispose()
