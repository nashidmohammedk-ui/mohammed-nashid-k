$gitDir = "C:\Users\best\AppData\Local\Programs\git\cmd"
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::User)
if ($currentPath -notlike "*$gitDir*") {
    $newPath = "$gitDir;$currentPath"
    [System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::User)
    Write-Output "Added $gitDir to User PATH."
} else {
    Write-Output "Path already contains git."
}
