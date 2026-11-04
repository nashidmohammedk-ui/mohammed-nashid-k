Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\portfolio\assets\portfolio-logo.png')
$transparentBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check if color is near-white (background)
        if ($pixel.R -gt 242 -and $pixel.G -gt 242 -and $pixel.B -gt 242) {
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            $transparentBmp.SetPixel($x, $y, $pixel)
        }
    }
}

$transparentBmp.Save('c:\portfolio\assets\portfolio-logo-transparent.png', [System.Drawing.Imaging.ImageFormat]::Png)
$transparentBmp.Dispose()
$bmp.Dispose()

Write-Host "Transparent logo generated successfully"
