---
title: "Why Your Small Business Website Loads Slowly: Images, Fonts and Scripts Explained"
seo_title: "Why Is My Website Slow? Images, Fonts & Scripts Guide"
description: "Why small business websites feel slow, how to find the cause with free tools, and the image, font and script fixes that make the biggest difference."
date: 2026-11-28
image: images/why-website-loads-slowly-guide.webp
image_alt: "Checklist for speeding up a small business website: images, fonts, scripts and hosting"
summary: "A practical guide to finding and fixing a slow website. It explains the three numbers Google watches, the common causes, and the order in which to fix them, with an example from our own site."
draft: false
---
You open your own website on your phone and watch it. A grey box sits where the picture should be, then the text jumps, then the image finally appears. Nothing is broken, but it feels slow, and visitors notice that more than owners do.

This guide explains why it happens and how to fix it, without needing to be a developer. The advice applies whether you run a simple HTML site, a WordPress site or a site built on a page builder.

## First, measure instead of guessing

Slowness feels different on every device, so start with numbers. Two free tools are enough:

- **PageSpeed Insights** (from Google). Paste your page address and it shows results for mobile and desktop, plus a list of what to fix.
- **The Core Web Vitals report in Google Search Console.** It shows how real visitors experience your site over time, not a single lab test.

Test your homepage and one inner page. Always look at the mobile result first, because that is how most visitors reach you and phones are slower than your office laptop.

## The three numbers Google watches

Google groups the experience into three measurements called Core Web Vitals:

| Measure | What it means | A good result |
|---|---|---|
| LCP (Largest Contentful Paint) | How long until the biggest thing on screen, usually a hero image or heading, is visible | 2.5 seconds or less |
| INP (Interaction to Next Paint) | How quickly the page reacts when someone taps or clicks | 200 milliseconds or less |
| CLS (Cumulative Layout Shift) | How much the page jumps around while loading | 0.1 or less |

If you remember one thing, remember LCP. On most small business sites, it is slow because of one large image.

## Cause 1: Images that are far bigger than they need to be

This is the most common problem and the easiest to fix. A photo taken on a phone can be several megabytes. Even after compression, a 1200 pixel wide image is wasted if the space on the page only shows it at 350 pixels. The visitor still downloads every extra pixel.

We found exactly this on our own website. The images were already in the modern WebP format and were not huge by file size, but each was 1200 pixels wide while most cards showed them at under 450 pixels. Measuring a real visit showed the first few images taking around half a second or more each, and visitors saw placeholders for that time. The fix was to create smaller copies of each image and let the browser choose the right size. For the main banner image, the small version was about a quarter of the original file size.

What you can do:

1. Resize images to the largest size they are actually shown at, not the size they came in.
2. Use WebP or AVIF instead of old JPEG or PNG for photos.
3. Offer more than one size using the `srcset` attribute, so phones get a smaller file than desktops. Most good website builders and WordPress do this automatically if images are uploaded properly.
4. Keep each normal page image well under 150 KB where possible.

## Cause 2: Lazy loading the wrong image

Lazy loading means the browser waits to download an image until the visitor scrolls near it. It is a great idea for images lower on the page. It is a bad idea for the first big image at the top, because you are telling the browser to delay the most important picture.

The rule is simple: lazy-load images below the first screen, and load the top image immediately. In HTML, the top image can carry the `fetchpriority="high"` hint, and everything further down can use `loading="lazy"`.

Also set the `width` and `height` of every image. This lets the browser reserve the space in advance, so the text does not jump when the image arrives. That is how you protect your CLS score.

## Cause 3: Too many fonts

Fonts are small files, but each extra font family or weight is another request. Using three font families with four weights each can add several downloads before any text looks right.

- Use one or two font families at most.
- Load only the weights you actually use, usually regular and bold.
- Use `font-display: swap` so text shows immediately in a fallback font instead of staying invisible.
- If you can, host fonts on your own domain, which removes one connection to another server.

## Cause 4: Scripts you forgot you added

Over time, sites collect scripts: chat widgets, analytics, heatmaps, social buttons, pop-ups and review badges. Each one downloads code and runs it on the visitor's phone. Together they are the most common cause of poor INP scores.

Make a list of everything that loads. For each item, ask whether anyone has looked at its results in the last three months. If not, remove it. If you do need it, load it after the page is usable, not before. A chat widget that appears two seconds late costs you nothing. A chat widget that delays the whole page costs you visitors.

## Cause 5: Slow hosting and no caching

If the very first response from your server is slow, nothing else can be fast. PageSpeed Insights reports this as server response time. Cheap shared hosting and sites that build every page from a database on each visit are the usual causes.

Two fixes help most:

- **Caching.** The server remembers a finished page and serves it instantly, instead of building it each time. Images and style files can also be told to stay in the visitor's browser for days, so repeat visits are quick.
- **A content delivery network (CDN).** It keeps copies of your files in many locations, so visitors download them from somewhere nearby. Many modern hosts include this.

If your audience is in the UK or US while your server is in India, or the other way around, a CDN matters even more.

## The order to fix things in

Do not try everything at once. This order gives the biggest improvement for the least effort:

1. Resize and compress the top image and any other large images.
2. Make sure the top image is not lazy-loaded, and every image has a width and height.
3. Remove scripts and plugins you do not use.
4. Cut fonts down to what you need.
5. Turn on caching and, if possible, a CDN.
6. Test again, and compare with your first result.

## How much does speed really matter?

Speed is one of many signals Google uses, and good content still matters more. But the effect on visitors is real: people leave slow pages, and a person who leaves in two seconds will not read your offer, call you or fill in your form. For a small business that depends on a handful of enquiries each week, losing even a few to a slow page is expensive.

## Want a second pair of eyes?

If you would like someone to look at your site, we do this kind of check as part of our [website development and improvement work](website-development.html). Send us your address and we will tell you plainly what is slowing it down and whether it is worth fixing. Before you go live with any new site, our [website launch checklist](website-launch-checklist-15-things-to-check-before-going-live.html) covers speed and the other basics in one place.
