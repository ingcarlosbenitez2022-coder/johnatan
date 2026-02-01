const fs = require('fs');
const path = require('path');

const rules = [
  { ext: ['.css'], dest: 'public/css' },
  { ext: ['.ejs', '.html'], dest: 'views' },
  { ext: ['.png', '.jpg', '.jpeg', '.gif', '.webp'], dest: 'public/images' },
  { ext: ['.js'], dest: 'public/js' }
];

// Carpetas que NO se tocan
const ignore = ['api', 'lib', 'public', 'views', 'node_modules', '.git'];

const root = process.cwd();

fs.readdirSync(root).forEach(file => {
  const filePath = path.join(root, file);

  if (ignore.includes(file)) return;
  if (!fs.statSync(filePath).isFile()) return;

  const ext = path.extname(file).toLowerCase();

  const rule = rules.find(r => r.ext.includes(ext));
  if (!rule) return;

  const destPath = path.join(root, rule.dest, file);

  if (!fs.existsSync(rule.dest)) {
    fs.mkdirSync(rule.dest, { recursive: true });
  }

  fs.renameSync(filePath, destPath);
  console.log(`📦 ${file} → ${rule.dest}/`);
});

console.log('✅ Organización completada');
