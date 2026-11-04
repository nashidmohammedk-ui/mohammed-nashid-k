
Add-Type -AssemblyName System.Drawing
$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$topLeft = $img.GetPixel(0, 0)
$bottomRight = $img.GetPixel($img.Width - 1, $img.Height - 1)
Write-Host "Top-left: R=$($topLeft.R), G=$($topLeft.G), B=$($topLeft.B), A=$($topLeft.A)"
Write-Host "Bottom-right: R=$($bottomRight.R), G=$($bottomRight.G), B=$($bottomRight.B), A=$($bottomRight.A)"
