const fs = require('fs');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

console.log('mn-logo.png:', getPngDimensions('c:\\portfolio\\assets\\mn-logo.png'));
console.log('uploaded 5d508029.png:', getPngDimensions('C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793805502717_5d508029.png'));
console.log('uploaded star fdd0d24e.png:', getPngDimensions('C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793801979411_fdd0d24e.png'));
