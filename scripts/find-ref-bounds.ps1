Add-Type -AssemblyName System.Drawing

$ref = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')
Write-Output "new-theme-reference.png: $($ref.Width) x $($ref.Height)"

for ($y = 50; $y -lt $ref.Height; $y += 40) {
    $minX = -1
    $maxX = -1
    for ($x = 450; $x -lt $ref.Width; $x++) {
        $c = $ref.GetPixel($x, $y)
        $isPerson = ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) -or ($c.R -gt 130 -and $c.R -gt ($c.B + 20))
        if ($isPerson) {
            if (!($y -lt 70 -and $x -gt 940)) {
                if ($minX -eq -1) { $minX = $x }
                $maxX = $x
            }
        }
    }
    Write-Output "y=${y} x ranges from $minX to $maxX"
}

$ref.Dispose()
