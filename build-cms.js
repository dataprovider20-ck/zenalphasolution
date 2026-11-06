// Builds blog pages from content/blog/*.md (written in Decap CMS at /admin).
// Runs on every Netlify deploy, and locally with:  npm install && node build-cms.js
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = __dirname;
const DOM = 'https://zenalphasolution.com';
const MARK = '<!--cms-generated-->';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// Shared header and footer are copied from an existing page, so the menu always matches the rest of the site.
const tpl = read('hiring.html');
const HEADER = tpl.slice(tpl.indexOf('<header>'), tpl.indexOf('</header>') + 9);
const FOOTER = tpl.slice(tpl.indexOf('</main><footer>') + 7);
const FAVICON = tpl.match(/<link rel="icon" href="([^"]+)"/)[1];

function parse(file) {
  const raw = read(file).replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(file + ': front matter missing');
  const meta = {};
  m[1].split('\n').forEach(line => {
    const i = line.indexOf(':'); if (i < 0) return;
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      try { v = JSON.parse(v.startsWith("'") ? '"' + v.slice(1, -1).replace(/"/g, '\\"') + '"' : v); } catch (e) { v = v.slice(1, -1); }
    }
    meta[line.slice(0, i).trim()] = v;
  });
  return { meta, body: m[2].trim() };
}

function pic(src, alt) {
  return `<div class="pic"><img src="${esc(src)}" alt="${esc(alt)}" width="1200" height="900" fetchpriority="high" onload="this.parentNode.classList.add('ok')" onerror="this.remove()"><svg viewBox="0 0 480 360" role="img" aria-label="${esc(alt)}" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="360" fill="#eef3fb"/><circle cx="150" cy="120" r="34" fill="#0b3d91"/><path d="M90 250 Q150 160 210 250Z" fill="#0b3d91"/><circle cx="240" cy="100" r="40" fill="#e8a317"/><path d="M170 250 Q240 140 310 250Z" fill="#e8a317"/><circle cx="335" cy="120" r="34" fill="#3f6fc0"/><path d="M275 250 Q335 160 395 250Z" fill="#3f6fc0"/><rect y="300" width="480" height="60" fill="#0b3d91"/><text x="240" y="338" text-anchor="middle" font-family="Georgia,serif" font-size="21" font-weight="bold" fill="#fff">Zen Alpha Blog</text></svg></div>`;
}

const posts = [];
const dir = path.join(ROOT, 'content', 'blog');
for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
  if (!f.endsWith('.md')) continue;
  const { meta, body } = parse('content/blog/' + f);
  if (String(meta.draft) === 'true') continue;
  const slug = f.replace(/\.md$/, '');
  const out = slug + '.html';
  const outPath = path.join(ROOT, out);
  if (fs.existsSync(outPath) && !read(out).includes(MARK)) {
    console.warn('SKIPPED (a hand-made page already uses this name): ' + out); continue;
  }
  const title = meta.title || slug;
  const html = marked.parse(body);
  const words = body.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 220));
  const date = (meta.date || new Date().toISOString().slice(0, 10)).slice(0, 10);
  const nice = new Date(date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const image = meta.image || 'images/ai-2.jpg';
  const alt = meta.image_alt || title;
  const seoTitle = meta.seo_title || title;
  const desc = meta.description || '';
  const url = `${DOM}/${slug}`;
  const J = o => '<script type="application/ld+json">' + JSON.stringify(o) + '</script>';
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOM + '/' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: DOM + '/blogs' },
    { '@type': 'ListItem', position: 3, name: title, item: url }] };
  const post = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: seoTitle, description: desc, datePublished: date, dateModified: date,
    image: `${DOM}/${image}`, author: { '@type': 'Organization', name: 'Zen Alpha Solution' }, publisher: { '@type': 'Organization', name: 'Zen Alpha Solution' }, mainEntityOfPage: url, wordCount: words };
  const page = `<!DOCTYPE html>\n${MARK}<html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">` +
    `<title>${esc(seoTitle)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}"><link rel="icon" href="${FAVICON}">\n` +
    `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet">\n` +
    `<link rel="stylesheet" href="style.css"><meta property="og:type" content="article"><meta property="og:site_name" content="Zen Alpha Solution"><meta property="og:title" content="${esc(seoTitle)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${DOM}/images/og-image.jpg"><meta name="twitter:card" content="summary_large_image">` +
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="author" content="Zen Alpha Solution"><meta name="theme-color" content="#0b3d91"><meta property="og:locale" content="en_IN">` +
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${J(bc)}</head><body>\n` + HEADER +
    `<main><section class="ph"><div class="wrap"><div><a class="back" href="blogs.html">&larr; All Blogs</a><h1>${esc(title)}</h1><p class="meta">Published ${nice} &middot; ${mins} min read &middot; By Zen Alpha Solution</p><div class="cta"><a class="btn" href="contact.html">Get a Free Consultation</a></div></div>${pic(image, alt)}</div></section>` +
    `<article class="prose" style="padding-top:34px;padding-bottom:20px">${html}</article>` +
    `<section><div class="wrap"><div class="band"><h2>Need help with your project?</h2><p>Tell us about your requirement and our experts will call you within 6 working hours.</p><div class="cta" style="justify-content:center"><button class="btn gold" data-enquiry="General enquiry">Get a Free Quote</button><a class="btn ghost" style="color:#fff;border-color:#fff" href="https://wa.me/918800927010" target="_blank" rel="noopener">Chat on WhatsApp</a><a class="btn ghost" style="color:#fff;border-color:#fff" href="tel:+918800927010">Call Now</a></div></div></div></section>${J(post)}</main>` + FOOTER;
  fs.writeFileSync(outPath, page);
  posts.push({ slug, title, date, image, alt, summary: meta.summary || desc });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

// Blog list: cards are inserted between two markers inside blogs.html
let blogs = read('blogs.html');
const S = '<!--CMS-POSTS-START-->', E = '<!--CMS-POSTS-END-->';
const cards = posts.map(p => `<div class="card"><div class="thumb">${pic(p.image, p.alt).replace(' fetchpriority="high"', ' loading="lazy"')}</div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><a class="more" href="${p.slug}.html">Read More &rarr;</a></div>`).join('');
if (blogs.includes(S)) {
  blogs = blogs.replace(new RegExp(S + '[\\s\\S]*?' + E), S + cards + E);
  fs.writeFileSync(path.join(ROOT, 'blogs.html'), blogs);
} else console.warn('blogs.html has no CMS markers; blog list was not updated');

// Sitemap: URLs between markers
let sm = read('sitemap.xml');
const SS = '<!--CMS-SITEMAP-START-->', SE = '<!--CMS-SITEMAP-END-->';
const urls = posts.map(p => `<url><loc>${DOM}/${p.slug}</loc><lastmod>${p.date}</lastmod><priority>0.7</priority></url>\n`).join('');
if (sm.includes(SS)) { sm = sm.replace(new RegExp(SS + '[\\s\\S]*?' + SE), SS + '\n' + urls + SE); fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm); }
else console.warn('sitemap.xml has no CMS markers');
console.log(`CMS build: ${posts.length} blog post(s) generated`);
