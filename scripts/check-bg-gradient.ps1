Add-Type -AssemblyName System.Drawing

$img = New-Object System.Drawing.Bitmap('c:\portfolio\assets\new-theme-reference.png')

# In new-theme-reference.png, let's look at row y=100 (above PORTFOLIO logo):
# What are the colors across x=500 to x=680?
for ($x = 500; $x -le 680; $x += 20) {
    $c = $img.GetPixel($x, 100)
    Write-Output "y=100, x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

# What about at y=50?
for ($x = 500; $x -le 680; $x += 20) {
    $c = $img.GetPixel($x, 50)
    Write-Output "y=50, x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

# What about at y=380 (below text)?
for ($x = 500; $x -le 600; $x += 20) {
    $c = $img.GetPixel($x, 380)
    Write-Output "y=380, x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$img.Dispose()
