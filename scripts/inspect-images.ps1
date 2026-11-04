Add-Type -AssemblyName System.Drawing

function Check-Img($path) {
    if (Test-Path $path) {
        $img = New-Object System.Drawing.Bitmap($path)
        Write-Output "$path -> Width: $($img.Width), Height: $($img.Height)"
        $img.Dispose()
    } else {
        Write-Output "$path not found"
    }
}

Check-Img 'c:\portfolio\assets\nashid-hero-theme.png'
Check-Img 'c:\portfolio\assets\new-theme-reference.png'
Check-Img 'C:\Users\best\.gemini\antigravity\brain\1565f804-52da-4370-8528-2aa6cc221c33\.user_uploaded\media_1793635885087_9c32ae10.png'
