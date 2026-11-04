Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\.user_uploaded\media_1793637566272_1409b395.jpg')
Write-Output "Image size: $($img.Width) x $($img.Height)"

# Crop the bottom section containing the 4 cards and the resume bar
# In 1024x576 or 1920x1080 (standard screen):
# Let's crop from y=0.35 to 0.85
$y1 = [int]($img.Height * 0.35)
$h1 = [int]($img.Height * 0.50)
$rect = New-Object System.Drawing.Rectangle(0, $y1, $img.Width, $h1)
$cropped = $img.Clone($rect, $img.PixelFormat)
$cropped.Save('c:\portfolio\assets\ref-about-bottom.png', [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$img.Dispose()
Write-Output "Cropped to assets/ref-about-bottom.png"
