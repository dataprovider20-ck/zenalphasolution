---
title: "SPF, DKIM and DMARC Explained: Why Your Bulk Emails Go to Spam"
seo_title: "SPF, DKIM and DMARC Explained for Bulk Email Senders"
description: "Why bulk emails land in spam, what SPF, DKIM and DMARC actually do, and a simple order to set them up so your campaigns reach the inbox."
date: 2026-11-11
image: images/bulk-email.webp
image_alt: "Email marketing dashboard showing a campaign being prepared for sending"
summary: "What SPF, DKIM and DMARC do in plain language, the mistakes that send campaigns to spam, and a simple order to fix them."
draft: false
---
You write a good offer, design a clean email and send it to a list of customers who know you. A day later, almost nobody has opened it. When you check from your own Gmail account, you find the email sitting in the spam folder.

This happens to a lot of businesses, and the cause is usually not the content. It is that the receiving mail server cannot confirm the email really came from you. Three DNS records decide that: SPF, DKIM and DMARC. They sound technical, and setting them up does involve a few careful steps, but the idea behind each one is simple.

## Why mailbox providers are strict now

Gmail, Yahoo and other providers see huge volumes of fake mail every day. Many of those messages pretend to come from real companies. To protect their users, providers now expect senders to prove who they are.

Google and Yahoo tightened their rules for bulk senders in 2024. In short, they expect your domain to be authenticated, marketing emails to have an easy one-click unsubscribe, and your spam complaint rate to stay low. Google's guidance is to keep complaints below 0.10% and never let them reach 0.30%. The strictest rules apply to large senders, but the same practices help every business that sends email in volume.

If your records are missing or wrong, it does not matter how good your email looks. It may never be seen.

## SPF: who is allowed to send for you

SPF (Sender Policy Framework) is a short text record in your domain's DNS. It lists the services that are allowed to send email using your domain name.

Say your business uses Google Workspace for normal mail and a separate platform for newsletters. Your SPF record should name both. When a mailbox provider receives an email claiming to be from your domain, it checks whether the sending server is on that list.

A simplified SPF record looks like this:

`v=spf1 include:_spf.google.com include:mail.your-email-provider.com ~all`

Your email platform will give you the exact text to add. Two rules cause most SPF problems:

- **Only one SPF record per domain.** If you add a second one for a new tool, both can fail. Merge them into a single record instead.
- **Keep it short.** SPF allows a limited number of lookups. A record that includes too many services can break without any obvious warning.

## DKIM: a signature that proves the email was not changed

DKIM (DomainKeys Identified Mail) adds a digital signature to every email you send. Your email platform holds a private key and signs each message with it. You publish the matching public key in your DNS. The receiving server uses that public key to check the signature.

If the signature checks out, the provider knows two things: the email came from a system you authorised, and nobody changed it on the way.

Each sending platform gives you its own DKIM record, usually a long string added under a name like `selector._domainkey.yourdomain.com`. If you use two platforms, you set up DKIM for both. Many businesses skip this step on their newsletter tool and then wonder why their regular mail lands fine while campaigns do not.

## DMARC: the rule that ties it together

SPF and DKIM give the receiving server information. DMARC tells it what to do with that information.

A DMARC record says, in effect: "Emails from my domain should pass SPF or DKIM, and the domain they pass for should match the one in the From address. If an email fails, here is what I want you to do with it, and here is where to send reports."

A starting DMARC record looks like this:

`v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com`

The `p` part is the policy:

- **p=none:** take no action, only send me reports. Start here.
- **p=quarantine:** send failing emails to spam.
- **p=reject:** refuse failing emails completely.

Do not jump straight to reject. Start with none, read the reports for a few weeks, fix any service that is sending without authentication, and only then tighten the policy. Moving too fast can block your own invoices or website form emails.

The "match" part, called alignment, is what catches many senders. If your email says it is from `offers@yourbusiness.com` but your platform signs it with its own domain, DKIM may pass and DMARC can still fail. Most good platforms let you sign with your own domain. Use that option.

## Common mistakes that send campaigns to spam

**Sending bulk mail from a Gmail or Yahoo address.** You cannot authenticate a domain you do not own. Bulk campaigns should go out from your own business domain.

**Using a brand new domain for a big send.** A fresh domain has no sending history. Start with small volumes to your most engaged contacts and increase gradually over a few weeks.

**Buying or scraping email lists.** Purchased lists are full of old addresses, spam traps and people who never agreed to hear from you. They drive up complaints and bounces quickly, and that damage follows your domain.

**Hiding the unsubscribe link.** If people cannot leave your list easily, they press "Report spam" instead. That hurts far more than a lost subscriber.

**Never cleaning the list.** Remove addresses that bounce, and stop mailing people who have not opened anything in many months.

**Changing tools without updating DNS.** When you move to a new email platform, update SPF and DKIM before your first campaign, not after.

## How to check if your setup is working

You do not need paid tools to start.

1. **Send a test email to a Gmail account.** Open it, click the three dots and choose "Show original". Gmail shows whether SPF, DKIM and DMARC passed.
2. **Check your DNS records.** Free lookup tools can show whether your SPF, DKIM and DMARC records exist and whether they contain errors.
3. **Use Google Postmaster Tools.** If you send regularly to Gmail users, this free tool shows your domain's reputation and spam rate over time.
4. **Read your DMARC reports.** They show which servers are sending email in your name. Any service you do not recognise is either a tool someone forgot to mention or someone pretending to be you.

## A simple order to follow

If you are starting from zero, this order keeps things safe:

1. List every service that sends email for your domain: office mail, newsletters, invoices, website forms, CRM.
2. Create one SPF record that includes all of them.
3. Turn on DKIM for each service, signing with your own domain.
4. Add a DMARC record with `p=none` and a reporting address.
5. Send test emails and confirm all three pass.
6. Watch the reports for a few weeks, fix anything unexpected, then move to `p=quarantine`.
7. Keep the list clean and the unsubscribe link visible, every time.

## Email is different from SMS

In India, bulk SMS has its own rules, including DLT registration of your sender ID and templates. Email does not use DLT. Its "registration" is your domain setup and your sending reputation. Both channels reward the same habit, though: send only to people who expect to hear from you. You can read more about how email and WhatsApp work together in our guide on [WhatsApp and email marketing for customer retention](whatsapp-and-email-marketing-customer-retention.html).

## When to ask for help

If DNS settings make you nervous, or your campaigns already have a spam problem, a careful review usually finds the cause in one sitting. Our [bulk email service](bulk-email.html) includes domain authentication with SPF, DKIM and DMARC, list hygiene and sending setup, so your first campaign starts from a clean position. [Contact us](contact.html) and tell us which platform you use. We will tell you what is missing.
