Add-Type -AssemblyName System.Drawing

$ref = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
$cropX = 500
$cropY = 0
$cropW = $ref.Width - $cropX
$cropH = $ref.Height

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $ref.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Table of Mohammed Nashid's leftmost X coordinate in $cropped (cropX = 500):
# For y < 365, person is at x >= 135
# For y >= 365:
# y=365 -> x=131
# y=370 -> x=126
# y=380 -> x=118
# y=390 -> x=111
# y=400 -> x=105
# y=410 -> x=97
# y=420 -> x=92
# y=430 -> x=88
# y=440 -> x=84
# y=450 -> x=80
# y=460 -> x=76
# y=470 -> x=73
# y=480 -> x=69

function Get-PersonMinX($y) {
    if ($y -lt 365) { return 130 }
    if ($y -ge 480) { return 65 }
    # Linear interpolation between y=365 (130) and y=480 (65)
    $t = ($y - 365) / (480 - 365)
    return [int](130 - $t * (130 - 65) - 3)
}

# 1. Erase ALL text, stray pixels, and hamburger from $cropped
for ($y = 0; $y -lt $cropH; $y++) {
    $personMinX = Get-PersonMinX $y
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $cropped.GetPixel($x, $y)

        # Region A: Left side outside the person
        if ($x -lt $personMinX) {
            # Check if this pixel is the blue orbit line
            $isOrbit = ($c.B -gt 210 -and $c.R -lt 210 -and ($c.B - $c.R) -gt 25)
            if (!$isOrbit) {
                # Any non-orbit pixel outside the person must be pure white
                $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            }
        }

        # Region B: Top-right hamburger menu area (x >= 430, y <= 75)
        if ($x -ge 430 -and $y -le 75) {
            # Erase any dark/grey pixels from hamburger icon
            if ($c.R -lt 220 -or $c.G -lt 220 -or $c.B -lt 220) {
                $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            }
        }

        # Region C: Top margin above person's head (y < 25, x < 230)
        if ($y -lt 25 -and $x -lt 230) {
            $isOrbit = ($c.B -gt 210 -and $c.R -lt 210 -and ($c.B - $c.R) -gt 25)
            if (!$isOrbit) {
                $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            }
        }
    }
}

# Save pure white background version
$outPathOpaque = 'c:\portfolio\assets\nashid-hero-theme.png'
$cropped.Save($outPathOpaque, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "nashid-hero-theme.png (clean white) saved."

# 2. Also create a transparent version where pure white background pixels are set to transparent (alpha=0)
# and near-white pixels softly blend to 0
$trans = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropped.Height; $y++) {
    for ($x = 0; $x -lt $cropped.Width; $x++) {
        $c = $cropped.GetPixel($x, $y)
        
        # Check if pixel is white / near white background
        # Background pixels have R, G, B > 248 and low saturation
        $minC = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
        $maxC = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        $diff = $maxC - $minC

        if ($minC -ge 250 -and $diff -le 6) {
            # Pure white background -> fully transparent
            $trans.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } elseif ($minC -ge 240 -and $diff -le 10) {
            # Soft feathered edge between 240 and 250
            $alpha = [int](((250 - $minC) / 10.0) * 255)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $trans.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            # Keep original pixel (person, blue glow, orbit ring)
            $trans.SetPixel($x, $y, $c)
        }
    }
}

$outPathTrans = 'c:\portfolio\assets\nashid-hero-theme-transparent.png'
$trans.Save($outPathTrans, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "nashid-hero-theme-transparent.png saved."

$trans.Dispose()
$cropped.Dispose()
$ref.Dispose()
