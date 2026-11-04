Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')

# Find the maximum X coordinate of black pixels for y between 100 and 365 that belong to the text
$maxTextX = 0
for ($y = 120; $y -le 365; $y++) {
    for ($x = 450; $x -le 630; $x++) {
        $c = $img.GetPixel($x, $y)
        # We know person is at x >= 635 for y <= 365
        if ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) {
            # If x < 630, it is text!
            if ($x -gt $maxTextX) {
                $maxTextX = $x
            }
        }
    }
}
Write-Output "Maximum X of text in reference: $maxTextX"

$img.Dispose()
