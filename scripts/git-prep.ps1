$env:Path = "C:\Users\best\AppData\Local\Programs\git\cmd;$env:Path"
cd C:\portfolio

Write-Output "--- Git Version ---"
& git --version

Write-Output "--- Config Git Identity ---"
& git config --global user.name "Mohammed Nashid K"
& git config --global user.email "nashidmohammedk@gmail.com"
& git config --global init.defaultBranch main

Write-Output "--- Git Init ---"
& git init

Write-Output "--- Append to README.md ---"
Add-Content -Path "README.md" -Value "`n# mohammed-nashid-k"

Write-Output "--- Git Status ---"
& git status -s
