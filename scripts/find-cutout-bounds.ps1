
Add-Type -AssemblyName System.Drawing
$file = 'C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\nashid_hero_cutout_1793809692618.jpg'
$b = New-Object System.Drawing.Bitmap($file)
Write-Host "Width: $($b.Width), Height: $($b.Height)"

# Find bounds of the person (any pixel significantly different from background ~238)
$minX = $b.Width; $maxX = 0; $minY = $b.Height; $maxY = 0

for ($y = 0; $y -lt $b.Height; $y += 4) {
    for ($x = 0; $x -lt $b.Width; $x += 4) {
        $p = $b.GetPixel($x, $y)
        # Check if non-background (e.g. brightness < 210 or color difference)
        if ($p.R -lt 210 -or $p.G -lt 210 -or $p.B -lt 210) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Person Bounding Box: X=$minX..$maxX, Y=$minY..$maxY (W=$($maxX - $minX), H=$($maxY - $minY))"
