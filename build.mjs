// Build: inline CSS + minify HTML/JS dari folder src/ ke root (yang disajikan GitHub Pages)
// Jalankan: npm install && npm run build
import { readFileSync, writeFileSync } from 'node:fs';
import { minify } from 'html-minifier-terser';

const css = readFileSync('src/styles.css', 'utf8');
writeFileSync('styles.css', css);

const opts = {
  collapseWhitespace: true, conservativeCollapse: false, removeComments: true,
  minifyCSS: true, minifyJS: true, removeRedundantAttributes: true,
  removeScriptTypeAttributes: false, useShortDoctype: true, sortAttributes: true
};

for (const f of ['index.html', 'sukses.html', '404.html']) {
  let html = readFileSync('src/' + f, 'utf8');
  if (f !== '404.html') html = html.replace(/<link rel="stylesheet" href="styles\.css[^"]*">/, `<style>${css}</style>`);
  const out = await minify(html, opts);
  writeFileSync(f, out);
  console.log(f, html.length, '->', out.length);
}
