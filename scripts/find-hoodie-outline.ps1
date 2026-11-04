Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
for ($y = 350; $y -lt 484; $y += 5) {
    # Scan from right to left to find hoodie's left edge
    $leftmostPersonX = -1
    for ($x = 500; $x -lt 700; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check if hoodie pixel (dark pixel, and check if it's connected to person on the right)
        if ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) {
            # Check if x+30 is also dark (person continues)
            if ($x + 30 -lt $img.Width) {
                $c2 = $img.GetPixel($x + 30, $y)
                if ($c2.R -lt 70 -and $c2.G -lt 70 -and $c2.B -lt 70) {
                    $leftmostPersonX = $x
                    break
                }
            }
        }
    }
    Write-Output "y=${y}: Person starts at x=${leftmostPersonX}"
}
$img.Dispose()
