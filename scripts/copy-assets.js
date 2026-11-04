const fs = require('fs');

// 1. Copy video
const videoSrc = 'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793806344094_0f52d2ac.mp4';
const videoDst = 'c:\\portfolio\\assets\\project-porsche.mp4';
fs.copyFileSync(videoSrc, videoDst);
console.log('Video copied to:', videoDst, 'size:', fs.statSync(videoDst).size);

// 2. Check nav star
const starSrc = 'C:\\Users\\best\\.gemini\\antigravity\\brain\\1565f804-52da-4370-8528-2aa6cc221c33\\.user_uploaded\\media_1793801979411_fdd0d24e.png';
const starDst = 'c:\\portfolio\\assets\\nav-star-raw.png';
fs.copyFileSync(starSrc, starDst);
console.log('Star copied to:', starDst);
