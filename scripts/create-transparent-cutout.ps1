
Add-Type -AssemblyName System.Drawing
$srcFile = 'C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\nashid_hero_cutout_1793809692618.jpg'
$dstFile = 'c:\portfolio\assets\nashid-hero-cutout.png'

$src = New-Object System.Drawing.Bitmap($srcFile)
$w = $src.Width
$h = $src.Height

# We will crop tightly to the subject with a small margin
$minX = [Math]::Max(0, 240)
$maxX = [Math]::Min($w - 1, 604)
$minY = [Math]::Max(0, 180)
$maxY = [Math]::Min($h - 1, 1260)

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1

$out = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background map: perform BFS flood fill from outer border pixels
$isBg = New-Object 'bool[,]' $w, $h
$q = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Enqueue border pixels
for ($x = 0; $x -lt $w; $x++) {
    $q.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $q.Enqueue((New-Object System.Drawing.Point($x, $h - 1)))
    $isBg[$x, 0] = $true
    $isBg[$x, $h - 1] = $true
}
for ($y = 0; $y -lt $h; $y++) {
    $q.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $q.Enqueue((New-Object System.Drawing.Point($w - 1, $y)))
    $isBg[0, $y] = $true
    $isBg[$w - 1, $y] = $true
}

# Threshold: background pixels are light grey/white (R > 210, G > 210, B > 210)
# and color difference between channels is small (saturation < 25)
while ($q.Count -gt 0) {
    $pt = $q.Dequeue()
    $px = $pt.X
    $py = $pt.Y

    $neighbors = @(
        [System.Drawing.Point]::new($px + 1, $py),
        [System.Drawing.Point]::new($px - 1, $py),
        [System.Drawing.Point]::new($px, $py + 1),
        [System.Drawing.Point]::new($px, $py - 1)
    )

    foreach ($n in $neighbors) {
        $nx = $n.X
        $ny = $n.Y
        if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
            if (-not $isBg[$nx, $ny]) {
                $c = $src.GetPixel($nx, $ny)
                # Check if it is background
                $minC = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
                $maxC = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
                $diff = $maxC - $minC
                
                if ($minC -gt 212 -and $diff -lt 28) {
                    $isBg[$nx, $ny] = $true
                    $q.Enqueue($n)
                }
            }
        }
    }
}

# Now populate $out bitmap with alpha feathering
for ($y = $minY; $y -le $maxY; $y++) {
    for ($x = $minX; $x -le $maxX; $x++) {
        $outX = $x - $minX
        $outY = $y - $minY

        if ($isBg[$x, $y]) {
            # Completely transparent
            $out.SetPixel($outX, $outY, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            $c = $src.GetPixel($x, $y)
            $minC = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
            $maxC = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
            $diff = $maxC - $minC

            # If pixel is near the edge (between 210 and 240 with low saturation), compute soft alpha
            if ($minC -gt 210 -and $diff -lt 25) {
                $alpha = [int][Math]::Max(0, [Math]::Min(255, (240 - $minC) * 8.5))
                $out.SetPixel($outX, $outY, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
            } else {
                $out.SetPixel($outX, $outY, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
            }
        }
    }
}

$out.Save($dstFile, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved transparent cutout to: $dstFile"
Write-Host "Cutout dimensions: $($out.Width) x $($out.Height)"
