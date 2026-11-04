Add-Type -AssemblyName System.Drawing

$img1 = New-Object System.Drawing.Bitmap('C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\.user_uploaded\media_1793638683552_5688b20f.jpg')
Write-Output "Image 1: $($img1.Width) x $($img1.Height)"
$img1.Dispose()

$img2 = New-Object System.Drawing.Bitmap('C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\.user_uploaded\media_1793638686627_bdaaa2f7.jpg')
Write-Output "Image 2: $($img2.Width) x $($img2.Height)"
$img2.Dispose()
