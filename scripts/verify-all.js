const fs = require('fs');

console.log('Testing files existence & sizes...');
const indexHtml = fs.readFileSync('c:\\portfolio\\index.html', 'utf8');
const stylesCss = fs.readFileSync('c:\\portfolio\\styles.css', 'utf8');
const scriptJs = fs.readFileSync('c:\\portfolio\\script.js', 'utf8');

console.log('index.html length:', indexHtml.length);
console.log('styles.css length:', stylesCss.length);
console.log('script.js length:', scriptJs.length);

// Verify index.html tags
const requiredElements = [
  'mainNavbar',
  'nav-left-cluster',
  'nav-brand-logo-img',
  'nav-brand-divider',
  'nav-links-menu',
  'nav-ornament-divider',
  'nav-ornament-star',
  'nav-talk-btn',
  'project-porsche.mp4',
  'modalProjectVideo',
  'modalProjectImg'
];

requiredElements.forEach(item => {
  if (indexHtml.includes(item)) {
    console.log(`[PASS] index.html includes "${item}"`);
  } else {
    console.error(`[FAIL] index.html MISSING "${item}"`);
  }
});

// Verify script.js
const scriptChecks = [
  'modalProjectVideo',
  'project-porsche.mp4',
  'openProjectModal',
  'closeProjectModal',
  'updateActiveNavLink'
];

scriptChecks.forEach(item => {
  if (scriptJs.includes(item)) {
    console.log(`[PASS] script.js includes "${item}"`);
  } else {
    console.error(`[FAIL] script.js MISSING "${item}"`);
  }
});
