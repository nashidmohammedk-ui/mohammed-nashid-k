Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')

# Let's crop exact PORTFOLIO block:
# Look at image: PORT starts around x=140, y=140. FOLIO ends around x=580, y=365.
# Let's crop Rectangle(130, 130, 460, 240)
$rectLogo = New-Object System.Drawing.Rectangle(135, 135, 455, 235)
$croppedLogo = $img.Clone($rectLogo, $img.PixelFormat)
$croppedLogo.Save('c:\portfolio\assets\portfolio-logo.png', [System.Drawing.Imaging.ImageFormat]::Png)
$croppedLogo.Dispose()

# Also crop the left header tag:
# Rectangle(45, 30, 260, 120)
$rectTag = New-Object System.Drawing.Rectangle(45, 30, 260, 120)
$croppedTag = $img.Clone($rectTag, $img.PixelFormat)
$croppedTag.Save('c:\portfolio\assets\header-tag-ref.png', [System.Drawing.Imaging.ImageFormat]::Png)
$croppedTag.Dispose()

$img.Dispose()
Write-Host "PORTFOLIO logo cropped successfully"
