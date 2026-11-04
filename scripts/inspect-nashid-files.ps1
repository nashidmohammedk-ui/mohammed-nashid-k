Add-Type -AssemblyName System.Drawing

function Inspect-File($name) {
    $path = "c:\portfolio\assets\$name"
    if (Test-Path $path) {
        $bmp = New-Object System.Drawing.Bitmap($path)
        Write-Output "$name : $($bmp.Width) x $($bmp.Height)"
        $bmp.Dispose()
    }
}

Inspect-File 'nashid-portrait.png'
Inspect-File 'nashid-hero-photo.png'
Inspect-File 'nashid-editorial-portrait.png'
Inspect-File 'nashid-about-visual.png'
Inspect-File 'layout-hero-person.png'
