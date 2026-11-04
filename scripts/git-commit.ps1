$env:Path = "C:\Users\best\AppData\Local\Programs\git\cmd;$env:Path"
cd C:\portfolio

Write-Output "--- Configure Local User ---"
& git config user.name "Mohammed Nashid K"
& git config user.email "nashidmohammedk@gmail.com"

Write-Output "--- Add Files ---"
& git add .

Write-Output "--- Commit ---"
& git commit -m "first commit"

Write-Output "--- Set Branch to Main ---"
& git branch -M main

Write-Output "--- Configure Remote ---"
& git remote remove origin 2>$null
& git remote add origin https://github.com/nashidmohammedk-ui/mohammed-nashid-k.git
& git remote -v
