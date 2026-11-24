---
title: "Website Accessibility for Small Businesses: WCAG 2.2 Checklist, UK Equality Act and US ADA"
seo_title: "Website Accessibility Checklist: WCAG 2.2, ADA, Equality Act"
description: "Website accessibility checklist for small businesses: WCAG 2.2 AA, ADA website compliance and the UK Equality Act, with simple fixes to start today."
date: 2026-11-24
image: images/website-accessibility-uk-us-checklist.webp
image_alt: "Website accessibility checklist for UK and US small businesses: contrast, alt text, keyboard, forms"
summary: "An accessible website is easier for everyone to use and reduces legal risk. This guide explains the UK and US legal picture in plain English, what WCAG 2.2 AA means, and a checklist you can work through."
draft: false
---
Imagine a customer who is blind, has low vision, cannot use a mouse, or has a tremor that makes tiny buttons hard to hit. If your website does not work for them, you lose a customer, and in some cases you also take on legal risk.

Accessibility is often treated as a technical afterthought. It does not have to be. Most of the common problems are simple to fix, and fixing them also helps people on small screens, in bright sunlight, or with a temporary injury.

This guide is for small business owners and the people who look after their sites. It covers the legal picture in the **UK** and **US**, what the **WCAG** standard actually asks for, and a checklist to start on. We are a web development team, not lawyers, so treat this as general information (last checked November 2026) and take legal advice for your own situation.

## Quick answer

- **UK:** the Equality Act 2010 expects reasonable adjustments, which is widely read to include your website.
- **US:** courts have applied ADA Title III to many business websites, usually using **WCAG 2.1 AA** as the benchmark.
- **Best target:** **WCAG 2.2 Level AA**. Start with contrast, alt text, keyboard access, form labels and clear links.
- **Do not rely on an overlay widget** to fix the problem for you.

## Key terms in 30 seconds

| Term | Meaning |
|---|---|
| **Web accessibility** | Making websites usable by people with disabilities |
| **WCAG** | The international web accessibility guidelines from the W3C |
| **Level AA** | The usual compliance target for websites |
| **ADA website compliance** | Meeting US disability law expectations online |
| **Equality Act 2010** | UK law requiring reasonable adjustments |
| **Screen reader** | Software that reads a page aloud |
| **Alt text** | A text description of an image |

## Why this matters

**It is a lot of people.** Disability affects a large share of any customer base, and many more have situational limits, such as a broken wrist or a glaring screen.

**Most websites fail.** The annual WebAIM Million study checks the home pages of the top million sites with automated tools. In its 2025 report, [94.8% of home pages had detectable WCAG 2 failures](https://webaim.org/projects/million/2025), and six common problems accounted for the vast majority of errors. A small business that fixes the basics is already ahead of most sites.

**Legal risk is real, especially in the US.** More on that next.

## The UK: Equality Act 2010

The Equality Act 2010 requires service providers, public and private, to make **reasonable adjustments** so that disabled people can use their services. The duty is **anticipatory**, meaning you are expected to think ahead rather than wait for a complaint. Commentators generally read this as covering websites, because a website is how many customers use your service.

Some points worth knowing:

- "Reasonable" depends on factors such as how practical a change is and the size of your organisation. A small business is not expected to do what a multinational does, but it is expected to do the sensible basics.
- The Act does not name a technical standard for private businesses. In practice, WCAG is the benchmark most advisers point to.
- UK public sector bodies have a stricter, specific regime (the Public Sector Bodies Accessibility Regulations 2018), which requires WCAG 2.2 AA-level accessibility and a published statement. If you build sites for councils, universities or the NHS, that applies to you.

## The US: ADA Title III

In the US, Title III of the Americans with Disabilities Act prohibits discrimination in "places of public accommodation". Many courts have applied this to the websites of private businesses, though the rules on online-only businesses vary between courts.

Key points:

- There is **no official technical standard** for private businesses. Courts and settlements usually reference **WCAG 2.1 AA**, and advisers recommend aiming for 2.2 AA.
- Litigation is common. A 2026 analysis by the law firm Seyfarth Shaw, reported by accessibility vendor Level Access, found [3,117 federal web accessibility lawsuits in 2025](https://www.levelaccess.com/blog/web-accessibility-lawsuits), a 27% rise on 2024, and counting state courts the total passed 5,000. Cases hit retailers, restaurants and small businesses alike.
- In federal court, plaintiffs under Title III can generally seek injunctions and legal fees but not damages. Some states, notably California, allow financial damages as well.
- US state and local government websites now have a firm deadline under a 2024 Department of Justice rule (WCAG 2.1 AA, by April 2026 or 2027 depending on size). That rule does not cover private businesses.

None of this means you will be sued. It does mean that "we are too small to matter" is not a plan.

## What WCAG 2.2 compliance means, in plain terms

WCAG stands for Web Content Accessibility Guidelines, published by the W3C. **WCAG 2.2** became a W3C Recommendation on 5 October 2023. It organises requirements under four ideas: content should be **perceivable, operable, understandable and robust**. Each requirement has a level: A (basic), AA (the usual target), and AAA (the highest, not expected for whole sites).

WCAG 2.2 is backwards compatible: if you meet 2.1 AA, you are close, and 2.2 adds nine new criteria (and drops one obsolete one). The two that affect everyday design most:

- **Target size (minimum):** clickable controls should be at least 24 by 24 CSS pixels, or have enough spacing around them.
- **Focus not obscured:** when someone tabs to a button or link, it should not be hidden behind a sticky header or cookie banner.

## Website accessibility checklist: start here

You do not need to be an expert. Work through these in order. They cover the problems that appear most often in real audits.

### 1. Text contrast
Body text needs a contrast ratio of at least **4.5:1** against its background, and large text (18pt or 14pt bold and up) needs **3:1**. Pale grey on white is the classic failure. WebAIM found low-contrast text on about 79% of home pages in 2025. Use a free contrast checker on your brand colours, including button labels and placeholder text.

### 2. Alternative text for images
Every meaningful image needs a short description in its `alt` attribute. Purely decorative images should have an empty `alt=""` so screen readers skip them. Write what the image **says**, not "image of". For a logo that links home, "Company name home" works. Missing alt text appeared on more than half of home pages in WebAIM's 2025 study.

### 3. Keyboard access
Put your mouse away and use only the Tab, Shift+Tab, Enter and Space keys. Can you reach every link, button, menu and form field? Can you see where you are (a visible focus outline)? Can you get out of pop-ups? If you cannot use your own site this way, neither can many of your customers.

### 4. Form labels and errors
Every form field needs a visible, properly connected label. Do not rely on placeholder text alone, which disappears as you type. Error messages should say which field has the problem and how to fix it, not just turn the border red.

### 5. Links and buttons that make sense
"Click here" and "Read more" mean nothing when read out of context by a screen reader. Use descriptive text, such as "Read our website cost guide". Make sure icon-only buttons have an accessible name, because empty links and empty buttons are among the most common errors.

### 6. Headings and structure
Use one main heading (H1), then H2 and H3 in a logical order. Do not choose headings for their size alone. Use proper lists and tables for list and table content. Set the page language in the `<html>` tag.

### 7. Don't rely on colour alone
If a field is marked as an error only with red, colour-blind users will miss it. Add an icon or text. Links within paragraphs should be distinguishable by more than colour (an underline is the simplest fix).

### 8. Touch targets and zoom
Make buttons and links easy to hit on a phone. Check that the page works when zoomed to 200% and that text resizes without breaking the layout. Do not disable pinch zoom.

### 9. Video, audio and motion
Provide captions for videos that carry speech, and a transcript where useful. Avoid autoplaying audio. Let people pause moving or flashing content.

### 10. Documents and PDFs
If your PDFs (menus, brochures, price lists) are important, make sure they are real text, not scanned pictures, and ideally also offer the same information as a web page.

### 11. Add an accessibility statement
A short page that says what standard you aim for, known gaps and a way to contact you (an email address or phone number) shows good faith. In the UK public sector, it is mandatory. For a private business, it is good practice, and it gives disabled visitors a route to ask for help.

## How to test without a big budget

1. **Run an automated scan** such as Lighthouse (built into Chrome), WAVE or axe. These catch the common, mechanical errors quickly, but automated tools can only check part of WCAG, so a clean report does not mean the site is accessible.
2. **Do the keyboard test** described above.
3. **Zoom to 200%** and check on a phone.
4. **Try a screen reader** for your most important journey, such as VoiceOver on Apple devices or NVDA, a free reader for Windows. Even ten minutes shows problems no scanner finds.
5. **Ask real users** with disabilities for feedback, or hire an accessibility specialist for a proper audit on a high-stakes site.

## A warning about "accessibility overlays"

You will see widgets that promise to make any website compliant in minutes with one line of code. Be careful. In January 2025 the US Federal Trade Commission announced a **$1 million settlement** with the overlay vendor accessiBe over claims that its tool could make any website WCAG-compliant, and finalised the order in April 2025. The FTC's complaint said those claims were false, misleading or unsubstantiated. Widgets can have a supporting role, but they do not replace fixing the underlying code. Be wary of any vendor that guarantees compliance or immunity from lawsuits.

## Mistakes we see often

| Mistake | Why it matters | Fix |
|---|---|---|
| Light grey text on white | Hard to read; the most common WCAG failure | Darken text to meet 4.5:1 |
| Image-only buttons with no label | Screen readers announce "button" and nothing else | Add an accessible name |
| Removing the focus outline for looks | Keyboard users get lost | Style a clear focus state instead |
| Placeholder text as a label | Disappears on typing | Add a visible label |
| Sticky banner covering focused links | Fails WCAG 2.2 focus visibility | Test tabbing with banners open |
| Pop-ups you cannot close by keyboard | Traps users | Support Escape and focus return |
| Relying on an overlay widget | Does not fix the code, and claims may mislead | Fix the source |
| Fixing once and never testing again | New content brings new errors | Add a check to your publishing routine |

## Make it part of how you build

Accessibility is cheapest when it is part of design and development from the start, and most expensive when bolted on after launch. If you are planning a new site or a redesign, ask your developer or agency how they handle accessibility: do they test with a keyboard and a screen reader, and which WCAG level do they aim for? Our [website launch checklist](website-launch-checklist-15-things-to-check-before-going-live.html) is a good companion for the rest of your pre-launch checks.

## Frequently asked questions

### Is my small business legally required to have an accessible website?
In the UK, the Equality Act 2010 requires reasonable adjustments by service providers, and it is generally understood to cover websites. In the US, courts have applied the ADA to many business websites, although the rules vary by court and by state. Neither country gives private businesses a single official technical checklist, which is why WCAG is used as the benchmark. Ask a lawyer how it applies to you.

### Which WCAG version and level should I aim for?
WCAG 2.2 Level AA is the sensible target. US courts commonly reference 2.1 AA, and 2.2 AA includes everything in 2.1 AA, plus a few extra criteria.

### Will an automated scanner tell me if I pass?
No. Automated tools find only a portion of issues. They are a good first step, but you also need manual checks, such as keyboard and screen reader testing.

### What is ADA website compliance?
There is no official checklist for private business sites, but courts and settlements commonly point to WCAG 2.1 AA, so most advisers recommend meeting WCAG 2.2 AA.

### Does the UK Equality Act apply to my website?
It requires service providers to make reasonable adjustments, and this is generally understood to cover websites. WCAG is the usual benchmark, though the Act does not name one.

### Does accessibility hurt design?
No. Good contrast, clear structure and visible focus states make most sites better for everyone. Accessible sites are often easier for search engines to understand too.

### How long does it take to fix an existing site?
It depends on the size of the site and how the code was written. A small brochure site may need a few days of fixes, while a large store or a custom app can take much longer. An audit gives you a realistic list first.

### Do I need an accessibility statement?
For UK public sector sites, yes. For private businesses it is not usually a legal requirement, but it is good practice.

### Is this legal advice?
No. It is general information. Speak to a qualified lawyer about your obligations.

## Where we can help

If you want a second pair of eyes on your site, we can review it against the checklist above and fix the common issues in your templates, forms and navigation. See our [website development](website-development.html) service or [contact us](contact.html) with your site address and what worries you most. For legal compliance questions, you will want your own lawyer as well.
