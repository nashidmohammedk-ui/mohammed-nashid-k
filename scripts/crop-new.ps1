Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-about-reference.jpg')

# Check person bounds in new-about-reference.jpg:
# In 1024x576, let's crop from x=420 to 820, y=100 to 576
$rectPortraitFull = New-Object System.Drawing.Rectangle(410, 100, 420, 476)
$pFull = $img.Clone($rectPortraitFull, $img.PixelFormat)
$pFull.Save('c:\portfolio\assets\nashid-about-visual.png', [System.Drawing.Imaging.ImageFormat]::Png)
$pFull.Dispose()

$img.Dispose()
Write-Host "nashid-about-visual.png cropped successfully"
