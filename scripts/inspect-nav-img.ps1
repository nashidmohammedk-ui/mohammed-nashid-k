Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\.user_uploaded\media_1793716836655_5184d392.png')
Write-Output "Image size: $($img.Width) x $($img.Height)"
$img.Dispose()
