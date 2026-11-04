const fs = require('fs');
const path = require('path');

console.log('Checking files...');
const files = [
  'c:\\portfolio\\assets\\mn-logo.png',
  'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793806344094_0f52d2ac.mp4',
  'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793805502717_5d508029.png',
  'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793801979411_fdd0d24e.png',
  'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793801979418_09898dcd.png'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const stat = fs.statSync(f);
    console.log(path.basename(f), 'exists, size:', stat.size);
  } else {
    console.log(path.basename(f), 'DOES NOT EXIST');
  }
});
