Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
# Check colors at various spots around Mohammed Nashid
Write-Output "Top-left of person (x=600, y=50): $($img.GetPixel(600, 50))"
Write-Output "Top-right of person (x=950, y=50): $($img.GetPixel(950, 50))"
Write-Output "Near hamburger (x=980, y=30): $($img.GetPixel(980, 30))"
Write-Output "Left of person where text was (x=500, y=200): $($img.GetPixel(500, 200))"
Write-Output "Left of person near shoulder (x=550, y=300): $($img.GetPixel(550, 300))"
Write-Output "Far top-right corner (x=1010, y=10): $($img.GetPixel(1010, 10))"

# Check person photo in assets:
# Do we have a clean cutout of Mohammed Nashid already in assets?
# Let's check assets/nashid-portrait.png, assets/nashid-hero-photo.png, assets/nashid-collage.png
$img.Dispose()
