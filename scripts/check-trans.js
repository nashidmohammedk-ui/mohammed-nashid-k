const fs = require('fs');

// Check transparency of mn-logo.png
const buf = fs.readFileSync('c:\\portfolio\\assets\\mn-logo.png');
console.log('mn-logo.png length:', buf.length);
// Check if uploaded 5d508029.png is beige or transparent
