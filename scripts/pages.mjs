// After `vite build`, write dist/<page>.html for each section page.
// Each copy is the same site with its own <title>, description, canonical URL
// and link-preview (Open Graph / Twitter) tags, so search engines and LinkedIn
// see a distinct page at /science, /technology, /team and /vision.
// Vercel serves them at clean URLs (see "cleanUrls" in vercel.json).
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://www.ecofreshgreensync.com';
const src = readFileSync('dist/index.html', 'utf8');

const pages = [
  {
    slug: 'science',
    title: 'The Science of PHA Bioplastic | EcoFresh',
    ogTitle: 'Bacteria already make these plastics. Food waste can feed them.',
    description:
      'Not every bioplastic goes back to nature. PHA is made by microbes and eaten by microbes. How food waste can feed them, and why India needs it now.',
    image: 'og-science.png',
    imageAlt: 'Made by microbes. Eaten by microbes. The science behind EcoFresh',
  },
  {
    slug: 'technology',
    title: 'Technology: Hotel Unit and Central Hub | EcoFresh',
    ogTitle: 'Five sites, one hub: how EcoFresh will turn food waste into bioplastic',
    description:
      'A sealed unit at each hotel will turn food scraps into two clean feeds. Tankers will carry them to one shared hub, where microbes make bioplastic.',
    image: 'og-technology.png',
    imageAlt: 'EcoFresh hotel unit beside a hotel entrance (concept render)',
  },
  {
    slug: 'team',
    title: 'Team and Mentors | EcoFresh',
    ogTitle: 'Built by IIITians. Backed by IIT, ISB and Anthropic.',
    description:
      'EcoFresh is founded by Ark Patil, Ansh Bathija, Shivansh Fulper and Mayur Kumar, and mentored by Prof. Puneet Tandon and Prof. Amarendra Kumar Das.',
    image: 'og-team.png',
    imageAlt: 'The four EcoFresh founders',
  },
  {
    slug: 'vision',
    title: 'Vision: Materials Made in India | EcoFresh',
    ogTitle: 'India made its own milk, then its own power. Next, its own materials.',
    description:
      'India made its own milk, then its own power. EcoFresh is built to make its own materials: a self-reliant, low-carbon materials economy for India.',
    image: 'og-vision.png',
    imageAlt: 'EcoFresh central hub at night (concept render)',
  },
];

const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function setTag(html, re, value, label) {
  if (!re.test(html)) throw new Error(`pages.mjs: could not find ${label} in dist/index.html`);
  return html.replace(re, (m, a, _old, b) => a + value + b);
}

for (const p of pages) {
  const url = `${SITE}/${p.slug}`;
  const img = `${SITE}/${p.image}`;
  let h = src;
  h = setTag(h, /(<title>)([^<]*)(<\/title>)/, esc(p.title), 'title');
  h = setTag(h, /(<meta name="description" content=")([^"]*)(")/, esc(p.description), 'description');
  h = setTag(h, /(<link rel="canonical" href=")([^"]*)(")/, url, 'canonical');
  h = setTag(h, /(<meta property="og:title" content=")([^"]*)(")/, esc(p.ogTitle), 'og:title');
  h = setTag(h, /(<meta property="og:description" content=")([^"]*)(")/, esc(p.description), 'og:description');
  h = setTag(h, /(<meta property="og:url" content=")([^"]*)(")/, url, 'og:url');
  h = setTag(h, /(<meta property="og:image" content=")([^"]*)(")/, img, 'og:image');
  h = setTag(h, /(<meta property="og:image:alt" content=")([^"]*)(")/, esc(p.imageAlt), 'og:image:alt');
  h = setTag(h, /(<meta name="twitter:title" content=")([^"]*)(")/, esc(p.ogTitle), 'twitter:title');
  h = setTag(h, /(<meta name="twitter:description" content=")([^"]*)(")/, esc(p.description), 'twitter:description');
  h = setTag(h, /(<meta name="twitter:image" content=")([^"]*)(")/, img, 'twitter:image');
  writeFileSync(`dist/${p.slug}.html`, h);
  console.log(`wrote dist/${p.slug}.html (${p.description.length}-char description)`);
}
