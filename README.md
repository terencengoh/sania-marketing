# SANIA Growth Partner

Public website for **SANIA Growth Partner**, a marketing agency that helps HVAC companies with websites, local SEO, Google Ads and Local Services Ads, Meta ads, lead generation, and booked-call support.

Intended live site: https://terencengoh.github.io/sania-marketing/

SANIA does **not** perform HVAC installation, repair, or maintenance.

## Contact

- Phone: (202) 821-8165
- Email: terencenjeck52@gmail.com

The contact form opens a draft in the visitor’s own email app. There is no third-party form service.

## Chat assistant

`chatbot.js` + `chatbot.css` add a floating **automated assistant** (bottom-right) on the home and services pages.

- Rule-based keyword/fuzzy matching only — no AI model, no API keys, no third-party service, no cookies or tracking.
- Answers come only from what this website says (services, process, pricing approach, FAQ). It never quotes prices, results, or guarantees.
- Quick replies: Services, How it works, Pricing / Get a quote, Book a call, Talk to a human.
- Lead capture asks for name, company, phone or email, city/area, and main service need. Nothing is sent automatically: the visitor chooses to
  **fill the site's contact form** (which then opens an email draft in their own email app), **open an email draft** directly, or call.
  On the services page, details are passed to the home-page form via `sessionStorage` (same browser tab only) and cleared after use.
- Edit answers in the `KB` array at the top of `chatbot.js`. Keep them consistent with the page copy.
- Accessible: keyboard operable, `Esc` closes, `role="dialog"`, live-region log, labelled controls; full-screen on phones.

A real AI chat (an LLM API) could be added later, but it needs a paid API key and a small server or serverless proxy so the key is never exposed in this static site.

## Honesty

This site does not include testimonials, reviews, client logos, case studies, revenue or lead numbers, guarantees, or awards.

## Local preview

Open `index.html` in a browser, or from this folder run:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080/

## Deploy (GitHub Pages)

A deploy workflow lives at `.github/workflows/pages.yml`. GitHub does not turn Pages on automatically for a new repository, and the available tools cannot flip that setting.

To publish the site:

1. Open [Settings → Pages](https://github.com/terencengoh/sania-marketing/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Re-run the **Deploy GitHub Pages** workflow from the [Actions tab](https://github.com/terencengoh/sania-marketing/actions/workflows/pages.yml).

The site will then be available at https://terencengoh.github.io/sania-marketing/
