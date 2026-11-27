// Builds blog pages from content/blog/*.md (written in Decap CMS at /admin).
// Runs on every Netlify deploy, and locally with:  npm install && node build-cms.js
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = __dirname;
const DOM = 'https://zenalphasolution.com';
const MARK = '<!--cms-generated-->';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const aid = k => String(process.env[k] || '').trim().replace(/[^A-Za-z0-9_-]/g, '');
fs.writeFileSync(path.join(__dirname, 'analytics-config.js'), 'window.ZEN_ANALYTICS=' + JSON.stringify({ ga4: aid('GA4_ID') || 'G-X6VDEFWQMZ', gtm: aid('GTM_ID'), clarity: aid('CLARITY_ID') || 'zc4fknq289' }) + ';\n');
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

// Related guides shown at the bottom of each blog page. Kept here (not in the CMS front matter) so editing a post in the CMS never removes them.
const RELATED = {
 "christmas-email-marketing-checklist": [
  {
   "u": "holiday-email-marketing-services.html",
   "t": "Christmas & Holiday Email Marketing Services",
   "d": "Holiday email campaigns for UK and US businesses: deliverability checks, list cleaning, segmentation, Christmas and Black Friday…"
  },
  {
   "u": "spf-dkim-dmarc-why-bulk-emails-go-to-spam.html",
   "t": "SPF, DKIM and DMARC Explained: Why Your Bulk Emails Go to Spam",
   "d": "Why bulk emails land in spam, what SPF, DKIM and DMARC actually do, and a simple order to set them up so your campaigns reach the…"
  },
  {
   "u": "bulk-email.html",
   "t": "Bulk Email Services",
   "d": "Execute high-converting email campaigns with robust domain authentication (SPF, DKIM and DMARC) for maximum inbox placement."
  }
 ],
 "christmas-holiday-customer-support-outsourcing": [
  {
   "u": "holiday-customer-support-outsourcing.html",
   "t": "Holiday Season Customer Support Outsourcing for UK & US Businesses",
   "d": "Seasonal customer support for the Christmas and Black Friday peak: email, live chat and overnight cover for UK and US businesses, set…"
  },
  {
   "u": "ai-chatbot-for-holiday-customer-service.html",
   "t": "AI Chatbot for Holiday Season Customer Service",
   "d": "An AI chatbot that answers order status, delivery and returns questions during the Christmas peak, connected to your store and handing…"
  },
  {
   "u": "black-friday-christmas-website-readiness-check.html",
   "t": "Black Friday & Christmas Website Readiness Check",
   "d": "Get your website ready for Black Friday and Christmas traffic: speed, mobile checkout, forms, hosting and tracking checked and fixed…"
  }
 ],
 "christmas-seo-checklist-small-business-uk-us-ireland": [
  {
   "u": "seo-ppc.html",
   "t": "SEO & Paid Campaigns",
   "d": "Dominate search results and drive targeted traffic through expert organic SEO and high-ROI Google and Meta paid ad campaigns."
  },
  {
   "u": "black-friday-christmas-website-readiness-check.html",
   "t": "Black Friday & Christmas Website Readiness Check",
   "d": "Get your website ready for Black Friday and Christmas traffic: speed, mobile checkout, forms, hosting and tracking checked and fixed…"
  },
  {
   "u": "google-business-profile-for-small-business-india.html",
   "t": "Google Business Profile for Small Businesses in India: A Practical Setup Guide",
   "d": "How to set up and grow a Google Business Profile for a small business in India: categories, service areas, verification, reviews and…"
  }
 ],
 "google-business-profile-for-small-business-india": [
  {
   "u": "seo-ppc.html",
   "t": "SEO & Paid Campaigns",
   "d": "Dominate search results and drive targeted traffic through expert organic SEO and high-ROI Google and Meta paid ad campaigns."
  },
  {
   "u": "digital-marketing-plan-for-small-business-90-day-framework.html",
   "t": "A Digital Marketing Plan for a Small Business: The 90-Day Framework",
   "d": "A practical 90-day digital marketing plan for small businesses: define a win, fix the basics, pick two channels, track key numbers and…"
  },
  {
   "u": "christmas-seo-checklist-small-business-uk-us-ireland.html",
   "t": "Christmas SEO for Small Businesses: A Practical Checklist for the UK, US and Ireland",
   "d": "Christmas SEO checklist for small businesses in the UK, US and Ireland: holiday hours, seasonal landing pages, local search, mobile…"
  }
 ],
 "spf-dkim-dmarc-why-bulk-emails-go-to-spam": [
  {
   "u": "bulk-email.html",
   "t": "Bulk Email Services",
   "d": "Execute high-converting email campaigns with robust domain authentication (SPF, DKIM and DMARC) for maximum inbox placement."
  },
  {
   "u": "whatsapp-and-email-marketing-customer-retention.html",
   "t": "Beyond SMS: WhatsApp Business API and Email Marketing for Customer Retention",
   "d": "Learn how to combine the WhatsApp Business API and email marketing for customer retention, with tips on SPF, DKIM, DMARC, segmentation…"
  },
  {
   "u": "christmas-email-marketing-checklist.html",
   "t": "Christmas Email Marketing Checklist: Getting Holiday Campaigns Into the Inbox",
   "d": "A practical Christmas email marketing checklist: list preparation, sending volume, timing across UK and US time zones, subject lines…"
  }
 ],
 "website-launch-checklist-15-things-to-check-before-going-live": [
  {
   "u": "what-is-a-virtual-cto-vcto.html",
   "t": "What Is a Virtual CTO (vCTO), and Does Your Business Need One?",
   "d": "What a virtual CTO does, signs you need one, and how a vCTO differs from a consultant, full-time CTO or agency."
  },
  {
   "u": "website-development.html",
   "t": "Website Development",
   "d": "Lightning-fast, mobile-responsive, SEO-optimized business websites and e-commerce platforms designed to convert visitors into loyal…"
  },
  {
   "u": "black-friday-christmas-website-readiness-check.html",
   "t": "Black Friday & Christmas Website Readiness Check",
   "d": "Get your website ready for Black Friday and Christmas traffic: speed, mobile checkout, forms, hosting and tracking checked and fixed…"
  },
  {
   "u": "digital-marketing-plan-for-small-business-90-day-framework.html",
   "t": "A Digital Marketing Plan for a Small Business: The 90-Day Framework",
   "d": "A practical 90-day digital marketing plan for small businesses: define a win, fix the basics, pick two channels, track key numbers and…"
  }
 ],
 "working-with-a-development-team-in-india-guide-for-uk-us-founders": [
  {
   "u": "what-is-a-virtual-cto-vcto.html",
   "t": "What Is a Virtual CTO (vCTO), and Does Your Business Need One?",
   "d": "What a virtual CTO does, signs you need one, and how a vCTO differs from a consultant, full-time CTO or agency."
  },
  {
   "u": "hiring.html",
   "t": "Staff Outsourcing & Hiring",
   "d": "Hire pre-vetted remote software engineers, developers and digital marketers tailored to your workflows, on a full-time or part-time…"
  },
  {
   "u": "virtual-cto-services.html",
   "t": "Virtual CTO Services for Startups and Growing Businesses",
   "d": "Fractional CTO for startups and small businesses in the UK and USA: roadmap, vendor review, hiring and delivery oversight. Remote…"
  },
  {
   "u": "software.html",
   "t": "Software & App Development",
   "d": "From idea to launch, we engineer fast and reliable web and mobile applications using modern stacks like React, Node.js, Python and…"
  }
 ],
 "digital-marketing-plan-for-small-business-90-day-framework": [
  {
   "u": "what-is-a-virtual-cto-vcto.html",
   "t": "What Is a Virtual CTO (vCTO), and Does Your Business Need One?",
   "d": "What a virtual CTO does, signs you need one, and how a vCTO differs from a consultant, full-time CTO or agency."
  },
  {
   "u": "seo-ppc.html",
   "t": "SEO & Paid Campaigns",
   "d": "Dominate search results and drive targeted traffic through expert organic SEO and high-ROI Google and Meta paid ad campaigns."
  },
  {
   "u": "website-development.html",
   "t": "Website Development",
   "d": "Lightning-fast, mobile-responsive, SEO-optimized business websites and e-commerce platforms designed to convert visitors into loyal…"
  },
  {
   "u": "google-business-profile-for-small-business-india.html",
   "t": "Google Business Profile for Small Businesses in India: A Practical Setup Guide",
   "d": "How to set up and grow a Google Business Profile for a small business in India: categories, service areas, verification, reviews and…"
  }
 ],
 "sms-marketing-rules-uk-us-consent-opt-out-10dlc": [
  {"u":"bulk-sms.html","t":"Bulk SMS Services","d":"Reliable bulk SMS for promotions, alerts and reminders, with delivery reports and opt-out handling."},
  {"u":"bulk-whatsapp.html","t":"Bulk WhatsApp Services","d":"Reach customers on WhatsApp with approved templates, broadcasts and automated replies."},
  {"u":"whatsapp-and-email-marketing-customer-retention.html","t":"WhatsApp and Email Marketing for Retention","d":"How WhatsApp and email work together to keep customers coming back."}
 ],
 "website-accessibility-uk-us-small-business-wcag-checklist": [
  {"u":"website-development.html","t":"Website Development","d":"Fast, mobile-responsive business websites built with sound structure and clean code."},
  {"u":"website-launch-checklist-15-things-to-check-before-going-live.html","t":"Website Launch Checklist","d":"15 things to check before your website goes live."},
  {"u":"contact.html","t":"Contact Us","d":"Tell us about your site and we will suggest the practical next steps."}
 ],
 "whatsapp-business-api-cost-in-india": [
  {
   "u": "bulk-whatsapp.html",
   "t": "WhatsApp Business API Service in India",
   "d": "Templates, opt-in, shared inbox and chatbot setup for Indian businesses."
  },
  {
   "u": "whatsapp-business-api-for-business.html",
   "t": "WhatsApp Business API: What It Is",
   "d": "How the API works and how to get started."
  },
  {
   "u": "bulk-sms.html",
   "t": "Bulk SMS Service in India",
   "d": "DLT help, promotional and transactional SMS, OTP API and delivery reports."
  }
 ],
 "whatsapp-business-api-for-schools-and-coaching-institutes": [
  {
   "u": "bulk-whatsapp.html",
   "t": "WhatsApp Business API Service in India",
   "d": "Templates, opt-in, shared inbox and chatbot setup for Indian businesses."
  },
  {
   "u": "whatsapp-business-api-cost-in-india.html",
   "t": "WhatsApp Business API Cost in India",
   "d": "What decides the cost, and the questions to ask any provider."
  },
  {
   "u": "whatsapp-business-api-for-business.html",
   "t": "WhatsApp Business API: What It Is",
   "d": "How the API works and how to get started."
  }
 ],
 "whatsapp-business-api-for-clinics-and-hospitals": [
  {
   "u": "bulk-whatsapp.html",
   "t": "WhatsApp Business API Service in India",
   "d": "Templates, opt-in, shared inbox and chatbot setup for Indian businesses."
  },
  {
   "u": "whatsapp-business-api-cost-in-india.html",
   "t": "WhatsApp Business API Cost in India",
   "d": "What decides the cost, and the questions to ask any provider."
  },
  {
   "u": "whatsapp-business-api-for-business.html",
   "t": "WhatsApp Business API: What It Is",
   "d": "How the API works and how to get started."
  }
 ],
 "whatsapp-business-api-for-real-estate-india": [
  {
   "u": "bulk-whatsapp.html",
   "t": "WhatsApp Business API Service in India",
   "d": "Templates, opt-in, shared inbox and chatbot setup for Indian businesses."
  },
  {
   "u": "whatsapp-business-api-cost-in-india.html",
   "t": "WhatsApp Business API Cost in India",
   "d": "What decides the cost, and the questions to ask any provider."
  },
  {
   "u": "whatsapp-business-api-for-business.html",
   "t": "WhatsApp Business API: What It Is",
   "d": "How the API works and how to get started."
  }
 ],
 "_default": [
  {
   "u": "what-is-a-virtual-cto-vcto.html",
   "t": "What Is a Virtual CTO (vCTO), and Does Your Business Need One?",
   "d": "What a virtual CTO does, signs you need one, and how a vCTO differs from a consultant, full-time CTO or agency."
  },
  {
   "u": "digital-marketing-plan-for-small-business-90-day-framework.html",
   "t": "A Digital Marketing Plan for a Small Business: The 90-Day Framework",
   "d": "A practical 90-day digital marketing plan for small businesses: define a win, fix the basics, pick two channels, track key numbers and…"
  },
  {
   "u": "website-launch-checklist-15-things-to-check-before-going-live.html",
   "t": "Website Launch Checklist: 15 Things to Check Before Going Live",
   "d": "Planning to launch a business website? Use this 15-point website launch checklist covering SEO, speed, mobile, forms and security…"
  },
  {
   "u": "working-with-a-development-team-in-india-guide-for-uk-us-founders.html",
   "t": "Working With a Development Team in India: A Practical Guide for UK and US Founders",
   "d": "How UK and US founders can work with a development team in India: choosing a model, vetting, time zones, contracts, security and the…"
  }
 ]
};
function related(slug) {
  const list = RELATED[slug] || RELATED._default;
  const cards = list.filter(x => x.u !== slug + '.html').map(x => `<div class="card"><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><a class="more" href="${x.u}">Read more &rarr;</a></div>`).join('');
  return `<section class="alt"><div class="wrap"><h2>Related guides</h2><div class="grid">${cards}</div></div></section>`;
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
  const image = meta.image || 'images/ai-2.webp';
  const alt = meta.image_alt || title;
  const seoTitle = meta.seo_title || title;
  const desc = meta.description || '';
  const url = `${DOM}/${slug}`;
  const updated = (meta.updated || '').slice(0, 10);
  const niceUp = updated ? new Date(updated + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
  const faqItems = [];
  const fm = body.match(/^##\s+Frequently asked questions\s*\n([\s\S]*?)(?=^##\s|$(?![\s\S]))/im);
  if (fm) fm[1].split(/^###\s+/m).slice(1).forEach(b => {
    const nl = b.indexOf('\n'); const q = b.slice(0, nl).trim(); const a = b.slice(nl + 1).trim();
    if (q && a) faqItems.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ') } });
  });
  const J = o => '<script type="application/ld+json">' + JSON.stringify(o) + '</script>';
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOM + '/' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: DOM + '/blogs' },
    { '@type': 'ListItem', position: 3, name: title, item: url }] };
  const post = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: seoTitle, description: desc, datePublished: date, dateModified: updated || date,
    image: `${DOM}/${image}`, author: { '@type': 'Organization', name: 'Zen Alpha Solution' }, publisher: { '@type': 'Organization', name: 'Zen Alpha Solution' }, mainEntityOfPage: url, wordCount: words };
  const page = `<!DOCTYPE html>\n${MARK}<html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">` +
    `<title>${esc(seoTitle)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}"><link rel="icon" href="${FAVICON}">\n` +
    `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet">\n` +
    `<link rel="stylesheet" href="style.css"><meta property="og:type" content="article"><meta property="og:site_name" content="Zen Alpha Solution"><meta property="og:title" content="${esc(seoTitle)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${DOM}/images/og-image.jpg"><meta name="twitter:card" content="summary_large_image">` +
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="author" content="Zen Alpha Solution"><meta name="theme-color" content="#0b3d91"><meta property="og:locale" content="en_IN">` +
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${J(bc)}</head><body>\n` + HEADER +
    `<main><section class="ph"><div class="wrap"><div><a class="back" href="blogs.html">&larr; All Blogs</a><h1>${esc(title)}</h1><p class="meta">Published ${nice}${niceUp ? ' &middot; Updated ' + niceUp : ''} &middot; ${mins} min read &middot; By Zen Alpha Solution</p><div class="cta"><a class="btn" href="contact.html">Get a Free Consultation</a></div></div>${pic(image, alt)}</div></section>` +
    `<article class="prose" style="padding-top:34px;padding-bottom:20px">${html}</article>` +
    related(slug) + `<section><div class="wrap"><div class="band"><h2>Need help with your project?</h2><p>Tell us about your requirement and our experts will call you within 6 working hours.</p><div class="cta" style="justify-content:center"><button class="btn gold" data-enquiry="General enquiry">Get a Free Quote</button><a class="btn ghost" style="color:#fff;border-color:#fff" href="https://wa.me/917753871491" target="_blank" rel="noopener">Chat on WhatsApp</a><a class="btn ghost" style="color:#fff;border-color:#fff" href="tel:+917753871491">Call Now</a></div></div></div></section>${J(post)}${faqItems.length ? J({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems }) : ''}</main>` + FOOTER;
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
