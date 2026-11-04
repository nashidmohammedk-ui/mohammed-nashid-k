const http = require('http');

http.get('http://localhost:3000/assets/project-porsche.mp4', {
  headers: { Range: 'bytes=0-1023' }
}, (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  let bytes = 0;
  res.on('data', chunk => { bytes += chunk.length; });
  res.on('end', () => { console.log('Read', bytes, 'bytes successfully'); });
}).on('error', err => {
  console.error('Error:', err);
});
