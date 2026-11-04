$job = Start-Process -FilePath "agy-node" -ArgumentList "c:\portfolio\server.js" -PassThru
Start-Sleep -Seconds 2
try {
  $res = Invoke-WebRequest -Uri "http://127.0.0.1:3000" -UseBasicParsing
  Write-Host "Server HTTP Status:" $res.StatusCode
  Write-Host "HTML Response Size:" $res.RawContentLength "bytes"
} finally {
  Stop-Process -Id $job.Id -Force
}
