/**
 * Generates the site's local SVG artwork (public/art/**).
 *
 * Every image on the site is generated here so the project is fully
 * self-contained: no remote image URLs, no licensing questions, and every
 * placeholder can later be swapped for real photography by replacing the file.
 *
 * Run with: npm run art
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'art');

/* ------------------------------------------------------------------ */
/* Palettes                                                           */
/* ------------------------------------------------------------------ */

const P = {
  pine: { skyTop: '#0C211F', skyBottom: '#24544A', glow: '#F5C878', deep: '#0A1A18', mid: '#2F5D52', light: '#CFE4DA', accent: '#E4572E', extra: '#7FB8A5' },
  terracotta: { skyTop: '#2A0F08', skyBottom: '#6E2A16', glow: '#FFD9A3', deep: '#240D07', mid: '#8A3A1D', light: '#F6D3BC', accent: '#F2C879', extra: '#C66A3D' },
  plum: { skyTop: '#230E1E', skyBottom: '#5B2A48', glow: '#FFD0C0', deep: '#1E0C19', mid: '#6E3A5C', light: '#EBC4D5', accent: '#F2C879', extra: '#9C5A82' },
  ocean: { skyTop: '#07202E', skyBottom: '#1D5568', glow: '#C9ECF2', deep: '#08202B', mid: '#2A6E81', light: '#C6E9EF', accent: '#F2C879', extra: '#5AA2B4' },
  sage: { skyTop: '#0F1C10', skyBottom: '#3E5C35', glow: '#F4DCA2', deep: '#101B0C', mid: '#51693A', light: '#D9E5C0', accent: '#E4572E', extra: '#86A65F' },
  night: { skyTop: '#0D1126', skyBottom: '#2B3562', glow: '#FFD9A0', deep: '#0F132E', mid: '#454F97', light: '#C9CFF0', accent: '#F2C879', extra: '#6A76C2' },
};

/* ------------------------------------------------------------------ */
/* Shared SVG scaffolding                                             */
/* ------------------------------------------------------------------ */

function svg(W, H, body, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${body.skyTop}"/>
    <stop offset="1" stop-color="${body.skyBottom}"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.42" r="0.62">
    <stop offset="0" stop-color="${body.glow}" stop-opacity="0.5"/>
    <stop offset="1" stop-color="${body.glow}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
    <stop offset="0.6" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.32"/>
  </radialGradient>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
  </filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${body.inner}
<rect width="${W}" height="${H}" filter="url(#grain)"/>
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>
`;
}

const rnd = (a, b) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ */
/* Motifs — every one shares the same sky/glow/grain language          */
/* ------------------------------------------------------------------ */

function radiance(W, H, p) {
  // Vertical shafts of light + a warm horizon + quiet silhouettes.
  let s = '';
  const horizon = H * 0.58;
  const shafts = [
    [0.04, 0.14, 0.09], [0.2, 0.09, 0.07], [0.33, 0.2, 0.12], [0.55, 0.12, 0.08],
    [0.7, 0.22, 0.11], [0.94, 0.12, 0.09],
  ];
  for (const [x, w, o] of shafts) {
    s += `<polygon points="${W * x},0 ${W * (x + w)},0 ${W * (x + w + 0.05)},${horizon} ${W * (x - 0.04)},${horizon}" fill="${p.glow}" opacity="${o}"/>`;
  }
  s += `<ellipse cx="${W * 0.52}" cy="${horizon}" rx="${W * 0.5}" ry="${H * 0.16}" fill="${p.glow}" opacity="0.28"/>`;
  // distant band
  s += `<path d="M0 ${horizon} Q ${W * 0.25} ${horizon - H * 0.05} ${W * 0.5} ${horizon - H * 0.01} T ${W} ${horizon - H * 0.04} V ${H * 0.78} Q ${W * 0.5} ${H * 0.7} 0 ${H * 0.78} Z" fill="${p.mid}" opacity="0.55"/>`;
  // near silhouettes
  s += `<path d="M0 ${H * 0.82} Q ${W * 0.18} ${H * 0.74} ${W * 0.36} ${H * 0.82} T ${W * 0.78} ${H * 0.8} T ${W} ${H * 0.83} V ${H} H 0 Z" fill="${p.deep}"/>`;
  // warm city-light dots on the near band
  for (let i = 0; i < 9; i++) {
    s += `<circle cx="${W * rnd(0.05, 0.95)}" cy="${H * rnd(0.83, 0.9)}" r="${W * 0.004}" fill="${p.glow}" opacity="0.5"/>`;
  }
  // stars high up
  for (let i = 0; i < 14; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.05, 0.3)}" r="${rnd(1.2, 2.6)}" fill="#FFF" opacity="${rnd(0.2, 0.55)}"/>`;
  }
  return s;
}

function arches(W, H, p) {
  // Receding doorways — an open door with light spilling out.
  const cx = W * 0.5;
  const base = H * 0.82;
  const aw = W * 0.11;
  let s = '';
  s += `<path d="M ${cx - aw} ${base} V ${H * 0.4} A ${aw} ${aw * 1.05} 0 0 1 ${cx + aw} ${H * 0.4} V ${base} Z" fill="${p.glow}" opacity="0.85"/>`;
  s += `<ellipse cx="${cx}" cy="${base}" rx="${aw * 0.55}" ry="${H * 0.02}" fill="${p.glow}" opacity="0.7"/>`;
  const layers = [
    [0.17, 0.26, 0.1, 0.55],
    [0.24, 0.3, 0.08, 0.4],
    [0.31, 0.34, 0.07, 0.3],
    [0.38, 0.37, 0.055, 0.22],
  ];
  for (const [off, sw, op] of layers) {
    const w = W * off;
    s += `<path d="M ${cx - w} ${base} V ${H * 0.34} A ${w} ${w * 1.02} 0 0 1 ${cx + w} ${H * 0.34} V ${base}" fill="none" stroke="${p.light}" stroke-width="${W * sw}" opacity="${op}" stroke-linecap="round"/>`;
  }
  s += `<path d="M0 ${H * 0.86} Q ${W * 0.3} ${H * 0.8} ${W * 0.6} ${H * 0.86} T ${W} ${H * 0.84} V ${H} H 0 Z" fill="${p.deep}"/>`;
  for (let i = 0; i < 10; i++) {
    s += `<circle cx="${W * rnd(0.04, 0.96)}" cy="${H * rnd(0.06, 0.3)}" r="${rnd(1.1, 2.4)}" fill="#FFF" opacity="${rnd(0.15, 0.5)}"/>`;
  }
  return s;
}

function gathering(W, H, p) {
  // Soft circles clustering around a shared light — people, together.
  let s = '';
  const blob = (x, y, r, c, o) => `
    <g transform="translate(${x},${y})" opacity="${o}">
      <circle r="${r}" fill="${c}"/>
      <circle cx="${-r * 0.55}" cy="${r * 0.28}" r="${r * 0.72}" fill="${c}"/>
      <circle cx="${r * 0.6}" cy="${r * 0.2}" r="${r * 0.66}" fill="${c}"/>
      <circle cx="${r * 0.1}" cy="${-r * 0.5}" r="${r * 0.6}" fill="${c}"/>
    </g>`;
  const spots = [
    [0.2, 0.7, 0.13, 'mid', 0.9], [0.38, 0.64, 0.1, 'light', 0.75],
    [0.55, 0.7, 0.14, 'mid', 0.85], [0.72, 0.63, 0.09, 'light', 0.7],
    [0.85, 0.72, 0.12, 'mid', 0.8], [0.5, 0.5, 0.06, 'glow', 0.55],
  ];
  for (const [x, y, r, c, o] of spots) {
    s += blob(W * x, H * y, W * r, p[c], o);
  }
  for (let i = 0; i < 8; i++) {
    s += `<circle cx="${W * rnd(0.06, 0.94)}" cy="${H * rnd(0.1, 0.42)}" r="${rnd(1, 2.2)}" fill="#FFF" opacity="${rnd(0.15, 0.45)}"/>`;
  }
  s += `<path d="M0 ${H * 0.88} Q ${W * 0.35} ${H * 0.82} ${W * 0.7} ${H * 0.88} T ${W} ${H * 0.86} V ${H} H 0 Z" fill="${p.deep}" opacity="0.9"/>`;
  return s;
}

function growth(W, H, p) {
  // A rising stem with leaves reaching toward light.
  const cx = W * 0.5;
  let s = '';
  s += `<ellipse cx="${cx}" cy="${H * 0.26}" rx="${W * 0.16}" ry="${H * 0.12}" fill="${p.glow}" opacity="0.35"/>`;
  s += `<path d="M ${cx} ${H * 0.86} C ${cx - W * 0.06} ${H * 0.6}, ${cx + W * 0.05} ${H * 0.48}, ${cx} ${H * 0.22}" fill="none" stroke="${p.light}" stroke-width="${W * 0.012}" stroke-linecap="round" opacity="0.9"/>`;
  const leaf = (x, y, rot, sc, c, o) => `
    <g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})" opacity="${o}">
      <path d="M0 0 C ${-W * 0.055} ${-W * 0.02}, ${-W * 0.06} ${-W * 0.075}, 0 ${-W * 0.1} C ${W * 0.06} ${-W * 0.075}, ${W * 0.055} ${-W * 0.02}, 0 0 Z" fill="${c}"/>
    </g>`;
  s += leaf(cx, H * 0.74, -38, 1, p.mid, 0.95);
  s += leaf(cx, H * 0.66, 42, 0.85, p.extra, 0.85);
  s += leaf(cx, H * 0.55, -30, 0.8, p.light, 0.8);
  s += leaf(cx, H * 0.47, 48, 0.7, p.mid, 0.9);
  s += leaf(cx, H * 0.36, -34, 0.65, p.extra, 0.8);
  s += leaf(cx, H * 0.28, 40, 0.55, p.light, 0.75);
  s += `<circle cx="${cx}" cy="${H * 0.185}" r="${W * 0.012}" fill="${p.glow}"/>`;
  s += `<path d="M0 ${H * 0.86} Q ${W * 0.3} ${H * 0.81} ${W * 0.65} ${H * 0.86} T ${W} ${H * 0.84} V ${H} H 0 Z" fill="${p.deep}" opacity="0.92"/>`;
  return s;
}

function waters(W, H, p) {
  // Flowing streams catching the light.
  let s = '';
  s += `<ellipse cx="${W * 0.62}" cy="${H * 0.35}" rx="${W * 0.4}" ry="${H * 0.22}" fill="${p.glow}" opacity="0.3"/>`;
  const stream = (y, amp, sw, c, o) => `
    <path d="M0 ${y} C ${W * 0.25} ${y - amp}, ${W * 0.5} ${y + amp}, ${W * 0.75} ${y - amp * 0.6} S ${W} ${y + amp * 0.5}, ${W} ${y + amp * 0.2}" fill="none" stroke="${c}" stroke-width="${sw}" opacity="${o}" stroke-linecap="round"/>`;
  s += stream(H * 0.62, H * 0.07, W * 0.02, p.mid, 0.85);
  s += stream(H * 0.72, H * 0.09, W * 0.014, p.extra, 0.9);
  s += stream(H * 0.8, H * 0.06, W * 0.03, p.deep, 0.95);
  s += stream(H * 0.55, H * 0.04, W * 0.008, p.light, 0.6);
  // light sparks on the water
  for (let i = 0; i < 12; i++) {
    s += `<circle cx="${W * rnd(0.05, 0.95)}" cy="${H * rnd(0.56, 0.84)}" r="${rnd(1.2, 3)}" fill="${p.glow}" opacity="${rnd(0.3, 0.7)}"/>`;
  }
  for (let i = 0; i < 8; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.06, 0.3)}" r="${rnd(1, 2)}" fill="#FFF" opacity="${rnd(0.15, 0.4)}"/>`;
  }
  return s;
}

function city(W, H, p) {
  // A quiet skyline — the city as a place to belong.
  let s = '';
  s += `<circle cx="${W * 0.72}" cy="${H * 0.28}" r="${W * 0.1}" fill="${p.glow}" opacity="0.35"/>`;
  const buildings = [];
  let x = W * 0.02;
  while (x < W * 0.98) {
    const bw = W * rnd(0.04, 0.08);
    const bh = H * rnd(0.18, 0.42);
    buildings.push([x, H - bh, bw, bh]);
    x += bw + W * rnd(0.012, 0.03);
  }
  for (const [bx, by, bw, bh] of buildings) {
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${p.deep}" opacity="0.9"/>`;
  }
  // lit windows
  for (const [bx, by, bw, bh] of buildings) {
    const cols = Math.max(2, Math.floor(bw / (W * 0.012)));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < 5; j++) {
        if (Math.random() < 0.22) {
          s += `<rect x="${bx + bw * 0.15 + i * bw * 0.32}" y="${by + bh * 0.15 + j * bh * 0.16}" width="${bw * 0.14}" height="${bh * 0.045}" fill="${p.glow}" opacity="${rnd(0.4, 0.8)}"/>`;
        }
      }
    }
  }
  // a couple of trees
  s += `<circle cx="${W * 0.1}" cy="${H * 0.8}" r="${W * 0.03}" fill="${p.mid}" opacity="0.85"/>`;
  s += `<circle cx="${W * 0.9}" cy="${H * 0.82}" r="${W * 0.024}" fill="${p.mid}" opacity="0.8"/>`;
  s += `<path d="M0 ${H * 0.86} Q ${W * 0.4} ${H * 0.8} ${W} ${H * 0.84} V ${H} H 0 Z" fill="${p.deep}"/>`;
  for (let i = 0; i < 12; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.05, 0.25)}" r="${rnd(1, 2.2)}" fill="#FFF" opacity="${rnd(0.15, 0.45)}"/>`;
  }
  return s;
}

function field(W, H, p) {
  // Rolling hills, a path home, light on the horizon.
  let s = '';
  s += `<circle cx="${W * 0.5}" cy="${H * 0.3}" r="${W * 0.12}" fill="${p.glow}" opacity="0.5"/>`;
  s += `<path d="M0 ${H * 0.55} Q ${W * 0.25} ${H * 0.4} ${W * 0.55} ${H * 0.52} T ${W} ${H * 0.46} V ${H * 0.62} Q ${W * 0.55} ${H * 0.68} ${W * 0.3} ${H * 0.6} T 0 ${H * 0.62} Z" fill="${p.mid}" opacity="0.8"/>`;
  s += `<path d="M0 ${H * 0.68} Q ${W * 0.3} ${H * 0.6} ${W * 0.62} ${H * 0.66} T ${W} ${H * 0.62} V ${H * 0.78} Q ${W * 0.6} ${H * 0.84} ${W * 0.25} ${H * 0.76} T 0 ${H * 0.78} Z" fill="${p.deep}" opacity="0.9"/>`;
  // the path
  s += `<path d="M ${W * 0.52} ${H * 0.92} C ${W * 0.5} ${H * 0.75}, ${W * 0.56} ${H * 0.62}, ${W * 0.52} ${H * 0.47}" fill="none" stroke="${p.glow}" stroke-width="${W * 0.008}" opacity="0.6" stroke-linecap="round" stroke-dasharray="${W * 0.012} ${W * 0.01}"/>`;
  // trees
  s += `<g opacity="0.85"><circle cx="${W * 0.16}" cy="${H * 0.55}" r="${W * 0.022}" fill="${p.extra}"/><rect x="${W * 0.157}" y="${H * 0.55}" width="${W * 0.006}" height="${H * 0.04}" fill="${p.deep}"/></g>`;
  s += `<g opacity="0.75"><circle cx="${W * 0.84}" cy="${H * 0.6}" r="${W * 0.018}" fill="${p.extra}"/><rect x="${W * 0.838}" y="${H * 0.6}" width="${W * 0.005}" height="${H * 0.035}" fill="${p.deep}"/></g>`;
  for (let i = 0; i < 8; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.08, 0.32)}" r="${rnd(1, 2)}" fill="#FFF" opacity="${rnd(0.15, 0.4)}"/>`;
  }
  return s;
}

function flame(W, H, p) {
  // A candle flame — hope held in the dark.
  let s = '';
  const cx = W * 0.5;
  s += `<circle cx="${cx}" cy="${H * 0.34}" r="${W * 0.18}" fill="${p.glow}" opacity="0.4"/>`;
  s += `<circle cx="${cx}" cy="${H * 0.34}" r="${W * 0.08}" fill="${p.glow}" opacity="0.6"/>`;
  // flame teardrop
  s += `<path d="M ${cx} ${H * 0.12} C ${cx + W * 0.055} ${H * 0.26}, ${cx + W * 0.045} ${H * 0.38}, ${cx} ${H * 0.42} C ${cx - W * 0.045} ${H * 0.38}, ${cx - W * 0.055} ${H * 0.26}, ${cx} ${H * 0.12} Z" fill="${p.accent}" opacity="0.95"/>`;
  s += `<path d="M ${cx} ${H * 0.24} C ${cx + W * 0.02} ${H * 0.32}, ${cx + W * 0.016} ${H * 0.38}, ${cx} ${H * 0.4} C ${cx - W * 0.016} ${H * 0.38}, ${cx - W * 0.02} ${H * 0.32}, ${cx} ${H * 0.24} Z" fill="${p.glow}" opacity="0.9"/>`;
  // candle
  s += `<rect x="${cx - W * 0.018}" y="${H * 0.44}" width="${W * 0.036}" height="${H * 0.3}" rx="${W * 0.008}" fill="${p.light}" opacity="0.85"/>`;
  s += `<rect x="${cx - W * 0.024}" y="${H * 0.72}" width="${W * 0.048}" height="${H * 0.02}" rx="${W * 0.006}" fill="${p.glow}" opacity="0.7"/>`;
  s += `<path d="M0 ${H * 0.86} Q ${W * 0.35} ${H * 0.81} ${W * 0.68} ${H * 0.86} T ${W} ${H * 0.84} V ${H} H 0 Z" fill="${p.deep}" opacity="0.92"/>`;
  for (let i = 0; i < 10; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.05, 0.3)}" r="${rnd(1, 2.2)}" fill="#FFF" opacity="${rnd(0.15, 0.45)}"/>`;
  }
  return s;
}

function hands(W, H, p) {
  // Cupped hands holding light — generosity, receiving and giving.
  let s = '';
  const cx = W * 0.5;
  s += `<circle cx="${cx}" cy="${H * 0.32}" r="${W * 0.11}" fill="${p.glow}" opacity="0.65"/>`;
  s += `<circle cx="${cx}" cy="${H * 0.32}" r="${W * 0.055}" fill="${p.glow}" opacity="0.5"/>`;
  // light orb
  s += `<circle cx="${cx}" cy="${H * 0.34}" r="${W * 0.026}" fill="#FFF" opacity="0.9"/>`;
  // rays
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const r1 = W * 0.05, r2 = W * 0.085;
    s += `<line x1="${cx + Math.cos(a) * r1}" y1="${H * 0.34 + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${H * 0.34 + Math.sin(a) * r2}" stroke="${p.glow}" stroke-width="${W * 0.003}" opacity="0.5"/>`;
  }
  // cupped hands (bowl)
  s += `<path d="M ${cx - W * 0.17} ${H * 0.68} C ${cx - W * 0.15} ${H * 0.86}, ${cx + W * 0.15} ${H * 0.86}, ${cx + W * 0.17} ${H * 0.68}" fill="none" stroke="${p.deep}" stroke-width="${W * 0.03}" stroke-linecap="round"/>`;
  s += `<path d="M ${cx - W * 0.17} ${H * 0.68} C ${cx - W * 0.1} ${H * 0.75}, ${cx - W * 0.02} ${H * 0.77}, ${cx} ${H * 0.76} C ${cx + W * 0.02} ${H * 0.77}, ${cx + W * 0.1} ${H * 0.75}, ${cx + W * 0.17} ${H * 0.68}" fill="none" stroke="${p.light}" stroke-width="${W * 0.012}" opacity="0.7" stroke-linecap="round"/>`;
  s += `<path d="M0 ${H * 0.86} Q ${W * 0.35} ${H * 0.81} ${W * 0.7} ${H * 0.86} T ${W} ${H * 0.84} V ${H} H 0 Z" fill="${p.deep}" opacity="0.92"/>`;
  for (let i = 0; i < 8; i++) {
    s += `<circle cx="${W * rnd(0.03, 0.97)}" cy="${H * rnd(0.05, 0.3)}" r="${rnd(1, 2)}" fill="#FFF" opacity="${rnd(0.15, 0.4)}"/>`;
  }
  return s;
}

function stars(W, H, p) {
  // A field of stars with a guiding light.
  let s = '';
  s += `<circle cx="${W * 0.74}" cy="${H * 0.3}" r="${W * 0.07}" fill="${p.glow}" opacity="0.4"/>`;
  s += `<circle cx="${W * 0.74}" cy="${H * 0.3}" r="${W * 0.03}" fill="#FFF" opacity="0.8"/>`;
  for (let i = 0; i < 46; i++) {
    const r = rnd(0.8, 2.8);
    s += `<circle cx="${W * rnd(0.02, 0.98)}" cy="${H * rnd(0.05, 0.75)}" r="${r}" fill="#FFF" opacity="${rnd(0.12, 0.6)}"/>`;
  }
  for (let i = 0; i < 3; i++) {
    const x = W * rnd(0.1, 0.9), y = H * rnd(0.08, 0.35), len = W * rnd(0.03, 0.06);
    s += `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y + len * 0.25}" stroke="#FFF" stroke-width="1" opacity="0.5" stroke-linecap="round"/>`;
  }
  s += `<path d="M0 ${H * 0.8} Q ${W * 0.3} ${H * 0.72} ${W * 0.62} ${H * 0.79} T ${W} ${H * 0.76} V ${H} H 0 Z" fill="${p.deep}" opacity="0.95"/>`;
  for (let i = 0; i < 8; i++) {
    s += `<circle cx="${W * rnd(0.05, 0.95)}" cy="${H * rnd(0.82, 0.9)}" r="${rnd(1, 2.4)}" fill="${p.glow}" opacity="${rnd(0.2, 0.5)}"/>`;
  }
  return s;
}

function mapArt(W, H) {
  // Stylized street map — light, friendly, with a destination pin.
  const bg = '#F3ECDE', block = '#E9DFCC', line = '#D4C7AC', water = '#A9C2BE', park = '#C7D5B2';
  let s = '';
  s += `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  // river
  s += `<path d="M ${W * 0.82} 0 C ${W * 0.72} ${H * 0.3}, ${W * 0.9} ${H * 0.55}, ${W * 0.78} ${H} L ${W} ${H} L ${W} 0 Z" fill="${water}" opacity="0.7"/>`;
  // city blocks
  for (let i = 0; i < 16; i++) {
    const bw = W * rnd(0.06, 0.14), bh = H * rnd(0.05, 0.11);
    const bx = W * rnd(0.02, 0.76), by = H * rnd(0.04, 0.86);
    if (Math.random() < 0.7) {
      s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${W * 0.004}" fill="${block}"/>`;
    }
  }
  // a park
  s += `<ellipse cx="${W * 0.3}" cy="${H * 0.2}" rx="${W * 0.09}" ry="${H * 0.06}" fill="${park}" opacity="0.8"/>`;
  // streets (grid)
  for (let i = 0; i < 7; i++) {
    s += `<line x1="0" y1="${H * (0.12 + i * 0.13)}" x2="${W * 0.9}" y2="${H * (0.12 + i * 0.13)}" stroke="${line}" stroke-width="${H * 0.008}"/>`;
  }
  for (let i = 0; i < 6; i++) {
    s += `<line x1="${W * (0.14 + i * 0.15)}" y1="0" x2="${W * (0.14 + i * 0.15)}" y2="${H}" stroke="${line}" stroke-width="${W * 0.006}"/>`;
  }
  // main road to the pin
  s += `<path d="M0 ${H * 0.6} Q ${W * 0.5} ${H * 0.55} ${W * 0.6} ${H * 0.62}" fill="none" stroke="#E8B25C" stroke-width="${H * 0.02}" opacity="0.85"/>`;
  // pin
  const px = W * 0.58, py = H * 0.56;
  s += `<circle cx="${px}" cy="${py}" r="${W * 0.05}" fill="#E4572E" opacity="0.15"/>`;
  s += `<circle cx="${px}" cy="${py}" r="${W * 0.032}" fill="#E4572E"/>`;
  s += `<circle cx="${px}" cy="${py}" r="${W * 0.012}" fill="#FFF"/>`;
  s += `<circle cx="${px}" cy="${py}" r="${W * 0.036}" fill="none" stroke="#E4572E" stroke-width="${W * 0.004}"/>`;
  return s;
}

/* ------------------------------------------------------------------ */
/* Composition helpers                                                */
/* ------------------------------------------------------------------ */

function compose(W, H, motifs, palette, label) {
  const body = { ...palette, inner: motifs.map((m) => m(W, H, palette)).join('\n') };
  return svg(W, H, body, label);
}

const HERO = { w: 1920, h: 1080 };
const CARD = { w: 1200, h: 800 };

/* ------------------------------------------------------------------ */
/* Manifest: [filename, motif, palette, size, label]                   */
/* ------------------------------------------------------------------ */

const manifest = [
  // Page heroes
  ['hero-main', radiance, 'pine', HERO, 'Warm light over a gathered city at dusk'],
  ['hero-about', arches, 'plum', HERO, 'A doorway opening onto light'],
  ['hero-visit', city, 'sage', HERO, 'A city skyline under a warm sky'],
  ['hero-messages', radiance, 'ocean', HERO, 'Beams of light over a dark city'],
  ['hero-events', gathering, 'terracotta', HERO, 'A crowd gathered in warm light'],
  ['hero-ministries', growth, 'sage', HERO, 'A plant growing toward the light'],
  ['hero-prayer', flame, 'plum', HERO, 'A candle flame in the dark'],
  ['hero-give', hands, 'night', HERO, 'Cupped hands holding light'],
  ['hero-contact', stars, 'night', HERO, 'A field of stars with a guiding light'],

  // Section artwork (cards)
  ['welcome-community', gathering, 'sage', CARD, 'People gathered together'],
  ['story-founded', arches, 'pine', CARD, 'An open doorway'],
  ['story-today', city, 'pine', CARD, 'A city skyline'],
  ['community-cards', gathering, 'pine', CARD, 'A community gathered'],
  ['visit-worship', radiance, 'pine', CARD, 'Light over a congregation'],
  ['cta-join', radiance, 'terracotta', CARD, 'Warm light over the horizon'],

  // Sermons — grouped by series for visual cohesion
  ['sermons/rooted-01', growth, 'pine', CARD, 'A plant growing toward light'],
  ['sermons/rooted-02', growth, 'sage', CARD, 'A plant growing toward light'],
  ['sermons/rooted-03', growth, 'ocean', CARD, 'A plant growing toward light'],
  ['sermons/love-01', waters, 'terracotta', CARD, 'Streams of water catching light'],
  ['sermons/love-02', waters, 'plum', CARD, 'Streams of water catching light'],
  ['sermons/love-03', waters, 'night', CARD, 'Streams of water catching light'],
  ['sermons/sacred-01', field, 'sage', CARD, 'A path across fields at dusk'],
  ['sermons/sacred-02', radiance, 'night', CARD, 'Light breaking through the dark'],
  ['sermons/sacred-03', field, 'terracotta', CARD, 'A path across fields at dusk'],

  // Events
  ['events/baptism-sunday', waters, 'ocean', CARD, 'Water catching the light'],
  ['events/growth-track', growth, 'pine', CARD, 'A plant growing toward light'],
  ['events/serve-day', city, 'terracotta', CARD, 'A city skyline at dawn'],
  ['events/night-of-worship', radiance, 'plum', CARD, 'Light over a gathered crowd'],
  ['events/youth-conference', flame, 'terracotta', CARD, 'A candle flame in the dark'],
  ['events/movie-in-the-park', stars, 'night', CARD, 'Stars over a park'],
  ['events/christmas-at-tlc', radiance, 'pine', CARD, 'Warm light on a winter night'],
  ['events/prayer-night', flame, 'pine', CARD, 'A candle flame in the dark'],
  ['events/groups-kickoff', gathering, 'sage', CARD, 'People gathered around a table'],

  // Ministries
  ['ministries/kids', growth, 'sage', CARD, 'A bright seedling'],
  ['ministries/youth', flame, 'terracotta', CARD, 'A flame burning bright'],
  ['ministries/young-adults', gathering, 'night', CARD, 'Friends gathered under stars'],
  ['ministries/life-groups', gathering, 'pine', CARD, 'A circle of people together'],
  ['ministries/worship', radiance, 'plum', CARD, 'Light and sound in the dark'],
  ['ministries/missions', city, 'ocean', CARD, 'A city on the horizon'],
  ['ministries/prayer', flame, 'plum', CARD, 'A candle flame in the dark'],
];

for (const [name, motif, paletteKey, size, label] of manifest) {
  const file = join(outDir, `${name}.svg`);
  mkdirSync(join(outDir, dirname(name)), { recursive: true });
  writeFileSync(file, compose(size.w, size.h, [motif], P[paletteKey], label));
}

// Stylized maps (light background — used inside cards, not heroes)
const mapFile = join(outDir, 'map-campus.svg');
mkdirSync(join(outDir, 'map-campus'), { recursive: true });
writeFileSync(mapFile, svg(CARD.w, CARD.h, { skyTop: '#F3ECDE', skyBottom: '#F3ECDE', glow: '#FFFFFF', inner: mapArt(CARD.w, CARD.h) }, 'A stylized map with a location pin'));

console.log(`Generated ${manifest.length + 1} SVG artworks into public/art/`);

// Rasterize PNG favicons + social image (best-effort; skipped if sharp is unavailable)
try {
  await import('./rasterize.mjs');
} catch {
  console.warn('Rasterization skipped.');
}
