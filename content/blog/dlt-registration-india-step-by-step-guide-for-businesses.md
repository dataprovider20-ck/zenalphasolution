---
title: "DLT Registration in India: A Step-by-Step Guide for Businesses That Send Bulk SMS"
seo_title: "DLT Registration India: Step-by-Step Guide for Bulk SMS"
description: "How DLT registration works in India: entity, sender ID, template and link approval, why messages get rejected, and what to prepare before you start."
date: 2026-11-28
image: images/dlt-registration-india-guide.webp
image_alt: "Four steps of DLT registration in India: entity, header, template and provider mapping"
summary: "A plain-English walk through DLT registration for bulk SMS in India. It covers the entity, sender ID, template and link steps, the mistakes that get templates rejected, and a checklist to prepare before you apply."
draft: false
---
If you have ever tried to send a bulk SMS in India, you have probably heard the word "DLT" in the first five minutes. Providers ask for it, operators block messages without it, and many first-time senders are not sure what it actually is. This guide explains it in everyday language, in the order you will meet each step.

One honest note before we start. Portals, forms and document lists are updated from time to time by the telecom operators. Treat this article as a map of the process, and check the exact fields on the operator portal you use.

## What DLT actually is

TRAI, the telecom regulator, made it compulsory for businesses to register before sending commercial SMS. The system that stores these registrations is called DLT, short for Distributed Ledger Technology. Each telecom operator runs a DLT portal, and the records are shared across the network.

In practice, DLT is a register of three things:

- **Who you are** (your business, called the Principal Entity)
- **What name your messages come from** (your sender ID, also called a header)
- **What your messages say** (your approved templates)

When you send an SMS, the network checks it against this register. If the sender, the header or the text does not match, the message is stopped. That is why a campaign can look fine on your screen and still show zero deliveries.

## Step 1: Register your business as a Principal Entity

This is the first and most important step. You apply on the DLT portal of an operator such as Jio, Airtel, Vi or BSNL. You do not need to register with all of them. Once your entity is approved, you receive an Entity ID that identifies your business across the network.

Typically you will be asked for:

- Business name and type (proprietorship, partnership, company, and so on)
- PAN of the business or proprietor
- Address and contact details
- A proof of the business, such as GST or incorporation papers, depending on your type
- Details of the person authorised to sign for the business, with a letter of authorisation

The most common reason for delay at this stage is a name mismatch. The business name on the form should match the name on your PAN and registration documents exactly. If your PAN says "Sharma Traders" and the form says "Sharma Trading Co.", expect a query.

## Step 2: Register your sender ID (header)

The header is the short name the customer sees as the sender. For many service and transactional messages it is a six-letter alphabetic ID, such as a shortened form of your brand. Promotional messages follow different rules, and your provider will tell you which format applies to you.

Two things help here:

- Choose a header that clearly relates to your business name. Operators are strict about headers that look like another brand, a bank or a government body.
- Keep a separate header for each purpose if you can, for example one for order updates and one for offers. It makes templates easier to manage later.

## Step 3: Register your message templates

A template is the fixed text of your message, with variable parts marked by placeholders. For example, an order update might be saved as a sentence with the customer name, order number and delivery date left as variables.

Each template is registered under a category. The common categories are:

| Category | Used for |
|---|---|
| Transactional | OTPs and messages the customer needs, such as banking alerts |
| Service | Updates about something the customer already has with you, such as an order or appointment |
| Promotional | Offers, discounts and marketing |

Your message must match the approved template. Only the variable parts can change. If you add an extra word or leave out a full stop that the template has, the network may treat it as a different message.

## Step 4: Get your links approved

If your SMS contains a link, that link generally needs to be registered or whitelisted first. Messages carrying unregistered links are among the most common reasons for blocking. If you use a short link or a tracking link, make sure the exact domain you will send has been approved.

## Step 5: Connect everything to your SMS provider

The last step is mapping your entity, headers and templates to the provider that will actually send the messages. Without this, the provider cannot use what you have registered. A good provider will guide you through this and tell you when something is still pending. If a provider says "just send, we will handle it" and cannot show you your Entity ID, treat that as a warning sign.

## Why templates get rejected

After helping businesses prepare for this, the same few mistakes appear again and again:

1. **Vague or generic text.** "Hello, click here for details" gives the reviewer nothing to approve. Say who you are and why you are messaging.
2. **Brand name missing or different.** The message should make it clear which business it is from, in a way that matches the header.
3. **Wrong category.** An offer registered as a service message will be rejected or, worse, approved and later flagged.
4. **Variables used for everything.** If almost the whole message is a placeholder, it is hard to approve. Keep the fixed text meaningful.
5. **Unregistered link.** The template is fine, but the domain has not been approved.
6. **Consent missing for promotions.** Promotional messages need a customer who agreed to receive them, and numbers on the Do Not Disturb list must not be messaged for promotions.

## Timing and Do Not Disturb

Promotional messages cannot be sent to numbers registered for Do Not Disturb, and they are allowed only during permitted hours, which are daytime hours rather than late evening. Service and transactional messages follow different rules, but they still need to match the content you registered. If you are unsure which category a message falls under, ask before you send. Sending it under the wrong category is how many accounts get flagged.

## A checklist before you apply

Keep these ready and the process will be much smoother:

- PAN and business registration documents with the exact same business name
- Authorisation letter and ID of the person signing for the business
- The sender name you want, and a note on how it relates to your business
- Your list of messages written out in full, with variable parts marked
- The domain names of any links you plan to use
- A simple record of how customers agreed to receive messages (a form, an order page tick box, or a WhatsApp opt-in)

## How long does it take?

It depends on how complete your documents are and how busy the operator is. Cases with clean documents move quickly. Cases with name mismatches or rejected templates take longer because each correction restarts the review. Preparing the templates carefully the first time is the best way to avoid delays.

## Do I have to do this myself?

You can register directly on a portal, but many small businesses prefer to work through their SMS provider, who handles the paperwork and knows what reviewers expect. Whichever way you go, the Entity ID belongs to your business, so keep a copy of it and the approved templates.

If you want to see how this fits into a full campaign setup, our [bulk SMS service page](bulk-sms-service-for-business-india.html) explains how we approach it. And if you are also planning WhatsApp messaging, read [what the WhatsApp Business API costs in India](whatsapp-business-api-cost-in-india.html) so you can compare the two channels properly.
