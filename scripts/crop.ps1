Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('c:\portfolio\assets\about-reference.png')

# Crop clean portrait for hero polaroid
$rectHero = New-Object System.Drawing.Rectangle(600, 60, 280, 350)
$heroPhoto = $img.Clone($rectHero, $img.PixelFormat)
$heroPhoto.Save('c:\portfolio\assets\nashid-hero-photo.png', [System.Drawing.Imaging.ImageFormat]::Png)
$heroPhoto.Dispose()

$img.Dispose()
Write-Host "nashid-hero-photo.png created successfully"
