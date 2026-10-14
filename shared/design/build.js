// Genera los tokens de cada app desde tokens.json y verifica contraste (WCAG AA = 4.5).
// Uso (raíz del repo):  node shared/design/build.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const t = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf8'));

// ---- contraste
const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const pairs = [
  ['texto sobre papel', t.color.ink, t.color.paper],
  ['texto atenuado sobre papel', t.color.muted, t.color.paper],
  ['texto sobre tarjeta', t.color.ink, t.color.card],
  ['texto atenuado sobre tarjeta', t.color.muted, t.color.card],
  ['modo oscuro: texto', t.dark.text, t.dark.bg],
  ['modo oscuro: atenuado', t.dark.muted, t.dark.bg],
  ['modo oscuro: atenuado sobre superficie', t.dark.muted, t.dark.surface],
  ...Object.keys(t.onAccent).map((k) => [`texto sobre ${k}`, t.onAccent[k], t.color[k]]),
];
let bad = 0;
for (const [n, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  if (r < 4.5) bad++;
  console.log(`${r >= 4.5 ? 'OK   ' : 'FALLA'} ${r.toFixed(2).padStart(5)}  ${n}`);
}
if (bad) { console.error(`\n${bad} combinaciones no pasan 4.5:1`); process.exit(1); }

// ---- móvil (ESM)
fs.writeFileSync(path.join(root, 'mobile-kids/src/styles/tokens.js'),
`// GENERADO por shared/design/build.js — no editar a mano
export const tokens = ${JSON.stringify(t, null, 2)};
`);

// ---- web (CSS variables)
const kebab = (s) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const vars = (p, o) => Object.entries(o).filter(([, v]) => typeof v !== 'object').map(([k, v]) => `  --${p}-${kebab(k)}: ${typeof v === 'number' ? v + 'px' : v};`).join('\n');
fs.writeFileSync(path.join(root, 'web-parents/src/styles/tokens.css'),
`/* GENERADO por shared/design/build.js — no editar a mano */
:root {
${vars('c', t.color)}
${Object.entries(t.onAccent).map(([k, v]) => `  --on-${kebab(k)}: ${v};`).join('\n')}
${vars('r', t.radius)}
  --border: ${t.border}px;
  --shadow: ${t.shadow}px;
  --touch-min: ${t.touchMin}px;
  --font-title: '${t.font.title}', system-ui, sans-serif;
  --font-body: '${t.font.body}', system-ui, sans-serif;
}
`);
console.log('\ntokens generados');
