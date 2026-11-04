Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
Write-Output "Pixel at (1020, 20): $($img.GetPixel(1020, 20))"
Write-Output "Pixel at (1020, 100): $($img.GetPixel(1020, 100))"
Write-Output "Pixel at (1020, 250): $($img.GetPixel(1020, 250))"
Write-Output "Pixel at (1020, 450): $($img.GetPixel(1020, 450))"
Write-Output "Pixel at (800, 10): $($img.GetPixel(800, 10))"
Write-Output "Pixel at (600, 10): $($img.GetPixel(600, 10))"
Write-Output "Pixel at (510, 10): $($img.GetPixel(510, 10))"
$img.Dispose()
