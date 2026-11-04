Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\portfolio\assets\nashid-hero-theme.png')
for ($y = 0; $y -lt $bmp.Height; $y += 10) {
    $xs = @()
    for ($x = 0; $x -lt 120; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60) {
            $xs += $x
        }
    }
    if ($xs.Count -gt 0) {
        Write-Output "y=${y} has $($xs.Count) black pixels: minX=$(($xs|Measure-Object -Min).Minimum), maxX=$(($xs|Measure-Object -Max).Maximum)"
    }
}
$bmp.Dispose()
