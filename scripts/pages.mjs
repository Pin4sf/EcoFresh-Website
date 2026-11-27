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

// Founder profile pages: /ark-patil etc. The router shows only that founder's
// section of the Team page; Person structured data tells Google who they are.
const ORG = { '@type': 'Organization', name: 'EcoFresh GreenSync LLP', url: `${SITE}/` };
const IIITDM = { '@type': 'CollegeOrUniversity', name: 'IIITDM Jabalpur', sameAs: 'https://www.iiitdmj.ac.in/' };
const person = (o) => ({ '@context': 'https://schema.org', '@type': 'Person', alumniOf: IIITDM, ...o });

const founders = [
  {
    slug: 'ark-patil',
    title: 'Ark Patil | Founder & CEO, EcoFresh and VION',
    ogTitle: 'Ark Patil, Founder & CEO of EcoFresh and VION',
    description:
      "Ark Patil, Founder & CEO of EcoFresh and VION: ISSS National Innovation Award AIR 2 (IISc), Founder's Day Honouree at IIITDM Jabalpur, five patent applications.",
    image: 'og-ark-patil.png',
    imageAlt: 'Ark Patil, Founder & CEO of EcoFresh and VION',
    jsonLd: person({
      name: 'Ark Patil',
      jobTitle: 'Founder & CEO',
      worksFor: [ORG, { '@type': 'Organization', name: 'VION Health Technologies', url: 'https://www.vion-global.com/' }],
      image: `${SITE}/ark-cover.webp`,
      email: 'mailto:ark.patil@ecofreshgreensync.com',
      memberOf: { '@type': 'Organization', name: 'ISSS, IISc Bengaluru' },
      award: [
        'ISSS National Innovation Award, All India Rank 2, IISc Bengaluru',
        "Founder's Day Honour 2026, IIITDM Jabalpur",
        'Second Globally, Together 7.0, Schulich School of Business, York University (with EcoFresh)',
        'Top 14 of 1,300+ teams, LoopX Accelerator Programme, ISB Hyderabad (with EcoFresh)',
        '16th of 2,500+ participants, Hult Prize Global Entrepreneurship Bootcamp 2025, IIT Bombay (with EcoFresh)',
      ],
      knowsAbout: ['Bioplastics', 'PHA', 'Food waste', 'Wearable health technology', 'Smart manufacturing'],
      sameAs: ['https://www.linkedin.com/in/arkpatil/', 'https://www.vion-global.com/'],
    }),
  },
  {
    slug: 'ansh-bathija',
    title: 'Ansh Bathija | Co-founder & COO, EcoFresh',
    ogTitle: 'Ansh Bathija, Co-founder & COO of EcoFresh',
    description:
      'Ansh Bathija, Co-founder & COO of EcoFresh: industrial and automotive designer, Global Finalist at the Green Concept Award 2026, Berlin, and SAE life member.',
    image: 'og-ansh-bathija.png',
    imageAlt: 'Ansh Bathija, Co-founder & COO of EcoFresh',
    jsonLd: person({
      name: 'Ansh Bathija',
      jobTitle: 'Co-founder & COO',
      worksFor: ORG,
      image: `${SITE}/ansh-cover.webp`,
      email: 'mailto:ansh.bathija@ecofreshgreensync.com',
      memberOf: { '@type': 'Organization', name: 'SAE International' },
      award: ['Global Finalist, Green Concept Award 2026, Berlin'],
      knowsAbout: ['Industrial design', 'Automotive design', 'Operations', 'Defence systems'],
      sameAs: ['https://www.linkedin.com/in/anshbathija/', 'https://www.behance.net/anshbathija'],
    }),
  },
  {
    slug: 'shivansh-fulper',
    title: 'Shivansh Fulper | Co-founder & CTO, EcoFresh; Founder, Waldo',
    ogTitle: 'Shivansh Fulper, Co-founder & CTO of EcoFresh and founder of Waldo',
    description:
      'Shivansh Fulper, Co-founder & CTO of EcoFresh and founder of Waldo: built Eka Curator, the 20-trillion-token pipeline for Project EKA; MIRAI-Setu 2025.',
    image: 'og-shivansh-fulper.png',
    imageAlt: 'Shivansh Fulper, Co-founder & CTO of EcoFresh and founder of Waldo',
    jsonLd: person({
      name: 'Shivansh Fulper',
      jobTitle: 'Co-founder & CTO',
      worksFor: [ORG, { '@type': 'Organization', name: 'Waldo', url: 'https://www.heywaldo.in/' }],
      image: `${SITE}/shiv-cover3.webp`,
      email: 'mailto:shivansh.fulper@ecofreshgreensync.com',
      award: [
        'Major League Hacking Fellow, 2024',
        'MIRAI-Setu 2025, Ministry of Foreign Affairs, Japan',
        'Code for GovTech 2024',
      ],
      knowsAbout: ['AI systems', 'Large language model data pipelines', 'AI agents', 'Control systems'],
      sameAs: [
        'https://www.linkedin.com/in/shivanshfulper/',
        'https://github.com/Pin4sf',
        'https://shivansh-portfolio-one.vercel.app/',
      ],
    }),
  },
  {
    slug: 'mayur-kumar',
    title: 'Mayur Kumar | Co-founder & CPO, EcoFresh',
    ogTitle: 'Mayur Kumar, Co-founder & CPO of EcoFresh',
    description:
      'Mayur Kumar, Co-founder & CPO of EcoFresh: industrial designer and inventor with eight patent filings in India and the US; ISSS National Innovation Award AIR 2.',
    image: 'og-mayur-kumar.png',
    imageAlt: 'Mayur Kumar, Co-founder & CPO of EcoFresh',
    jsonLd: person({
      name: 'Mayur Kumar',
      jobTitle: 'Co-founder & CPO',
      worksFor: ORG,
      image: `${SITE}/mk-cover.webp`,
      email: 'mailto:mayur.kumar@ecofreshgreensync.com',
      award: [
        'Special Jury Mention, Invention Factory 2024, IIT Jammu',
        'Global Finalist, Green Concept Award 2026, Berlin',
        'ISSS National Innovation Award, All India Rank 2, IISc Bengaluru',
      ],
      knowsAbout: ['Industrial design', 'Healthcare devices', 'Patent drafting', 'Human factors'],
      sameAs: ['https://www.linkedin.com/in/mayurrkr/'],
    }),
  },
];
for (const f of founders) f.jsonLd.url = `${SITE}/${f.slug}`;
pages.push(...founders);

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
  if (p.jsonLd) {
    const ld = JSON.stringify(p.jsonLd).replace(/</g, '\\u003c');
    h = h.replace('</head>', `<script type="application/ld+json">${ld}</script>\n</head>`);
  }
  writeFileSync(`dist/${p.slug}.html`, h);
  console.log(`wrote dist/${p.slug}.html (${p.description.length}-char description)`);
}
