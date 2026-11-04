
Add-Type -AssemblyName System.Drawing
$file = 'C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\nashid_hero_cutout_1793809692618.jpg'
$b = New-Object System.Drawing.Bitmap($file)
Write-Host "Width: $($b.Width), Height: $($b.Height)"

# Sample corners and top edges
$tl = $b.GetPixel(5, 5)
$tr = $b.GetPixel($b.Width - 6, 5)
$bl = $b.GetPixel(5, $b.Height - 6)
$br = $b.GetPixel($b.Width - 6, $b.Height - 6)

Write-Host "Top-Left: R=$($tl.R), G=$($tl.G), B=$($tl.B)"
Write-Host "Top-Right: R=$($tr.R), G=$($tr.G), B=$($tr.B)"
Write-Host "Bottom-Left: R=$($bl.R), G=$($bl.G), B=$($bl.B)"
Write-Host "Bottom-Right: R=$($br.R), G=$($br.G), B=$($br.B)"
