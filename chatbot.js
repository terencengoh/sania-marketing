/*
 * SANIA Growth Partner — automated site assistant.
 * Rule-based keyword matching only. No AI, no API keys, no third-party services,
 * no cookies or tracking. Answers are drawn only from what this website says.
 * Lead details stay in the visitor's browser and are handed to the site's existing
 * contact form / email draft; nothing is sent automatically.
 */
(function () {
  "use strict";

  var CONTACT = {
    phone: "(202) 821-8165",
    tel: "+12028218165",
    email: "terencenjeck52@gmail.com"
  };
  var PREFILL_KEY = "sgp-chat-prefill";
  var onHome = !!document.getElementById("strategy-form");
  var homeUrl = "index.html";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var telLink = '<a href="tel:' + CONTACT.tel + '">' + CONTACT.phone + "</a>";
  var mailLink = '<a href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a>";
  var servicesLink = '<a href="services.html">services page</a>';

  /* ---------- Knowledge base: only facts stated on the site ---------- */
  var KB = [
    {
      id: "services",
      keys: ["services", "service", "offer", "what do you do", "what you do", "help with", "provide", "options", "menu"],
      answer:
        "SANIA Growth Partner is a marketing agency for HVAC companies. Services:\n" +
        "• HVAC websites\n• Local SEO (incl. Google Business Profile)\n• Google Ads & Local Services Ads\n• Meta (Facebook/Instagram) ads\n• Lead generation (forms, calls-to-action, intake)\n• Booked-call support\n\n" +
        "You can start with one or combine them. Scope and pricing are discussed before any paid work begins. Details are on the " + servicesLink + ".",
      replies: ["Websites", "Local SEO", "Google Ads & LSA", "Pricing / Get a quote"]
    },
    {
      id: "websites",
      keys: ["website", "websites", "web site", "web design", "site", "webpage", "landing page", "redesign", "mobile"],
      answer:
        "HVAC websites: fast, mobile-first sites that explain your services, service area, and how to request a visit.\n\n" +
        "Typical work includes a homepage, services pages, contact and call-to-action paths, basic on-page SEO, and a layout that works on mobile. SANIA does not invent reviews, certifications, or results you don't have."
    },
    {
      id: "seo",
      keys: ["seo", "local seo", "google business profile", "gbp", "google my business", "maps", "map pack", "rank", "ranking", "rankings", "organic", "search engine", "listing", "listings"],
      answer:
        "Local SEO: help presenting accurate business information on your Google Business Profile, relevant service categories, and location pages where they're useful — so nearby homeowners find you when they search for heating or cooling help.\n\n" +
        "It's steady work, not a switch that flips overnight. Rankings depend on your market, competition, and the quality of your listing and site."
    },
    {
      id: "ads",
      keys: ["google ads", "adwords", "ppc", "pay per click", "lsa", "local services ads", "local service ads", "search ads", "google guaranteed", "ads", "advertising", "campaign", "campaigns"],
      answer:
        "Google Ads & Local Services Ads: SANIA can set up and manage campaigns aimed at people already looking for repair, replacement, or maintenance — with tracking focused on calls and form requests, not vanity clicks.\n\n" +
        "Ad spend is paid to Google by you, and results vary by market, bid, and season. SANIA does not guarantee a cost per lead or a number of booked jobs."
    },
    {
      id: "meta",
      keys: ["meta ads", "facebook ads", "instagram ads", "meta", "facebook", "instagram", "social", "social media", "fb", "ig"],
      answer:
        "Meta ads: Facebook and Instagram ads that keep your company visible in the areas you serve, introduce a seasonal offer, or stay in front of homeowners who aren't searching yet. Creative and targeting are built around your actual services and service area.\n\n" +
        "Media spend is yours, and SANIA won't promise a fixed return."
    },
    {
      id: "leadgen",
      keys: ["lead generation", "lead gen", "forms", "form", "intake", "capture", "call to action", "cta", "conversion", "conversions"],
      answer:
        "Lead generation: forms, calls-to-action, and intake steps designed around service requests, so interest is captured clearly and can be reviewed later. SANIA works with the tools you already use when that's practical, instead of forcing a new platform."
    },
    {
      id: "booked",
      keys: ["booked call", "booked calls", "booking", "appointments", "appointment", "schedule", "scheduling", "calendar", "follow up", "followup", "missed calls", "reminders", "routing", "dispatch"],
      answer:
        "Booked-call support: help tightening the handoff from a new inquiry to a scheduled visit — reminders, routing, and a clearer follow-up path, using the tools you already have whenever that's practical.\n\n" +
        "SANIA supports the marketing and scheduling path. Your team still makes the visit and does the HVAC work."
    },
    {
      id: "process",
      keys: ["how it works", "how does it work", "process", "steps", "get started", "getting started", "start", "onboarding", "begin", "next steps", "what happens"],
      answer:
        "How it works:\n1. Talk — a free strategy call about your company, service area, current marketing, and goals.\n2. Plan — recommended website, search, and ad work, with a clear scope and cost before anything is billed.\n3. Build — SANIA implements the agreed work (site updates, listings, campaigns, or lead-capture changes).\n4. Adjust — review what's bringing calls and booked appointments, and refine from there.",
      replies: ["Book a call", "Pricing / Get a quote"]
    },
    {
      id: "pricing",
      keys: ["price", "prices", "pricing", "cost", "costs", "how much", "fee", "fees", "quote", "estimate", "budget", "charge", "rates", "rate", "expensive", "cheap", "afford", "package", "packages", "retainer", "monthly"],
      answer:
        "Pricing depends on the work — SANIA doesn't publish a one-size price because websites, ads, and SEO aren't the same project.\n\n" +
        "The strategy call is free. If there's a fit, scope and cost are discussed before any paid engagement. Ad spend (Google, Meta) is paid by you directly.\n\nWant me to collect your details for a quote?",
      replies: ["Yes, get a quote", "Book a call", "Talk to a human"]
    },
    {
      id: "guarantee",
      keys: ["guarantee", "guaranteed", "guarantees", "results", "roi", "promise", "how many leads", "how many calls", "case study", "case studies", "success", "proof", "performance", "return"],
      answer:
        "No guarantees. Search rankings, ad costs, and booked jobs depend on many things, including your market, reviews, pricing, and how quickly you respond. SANIA won't invent a guarantee or borrow someone else's results."
    },
    {
      id: "reviews",
      keys: ["reviews", "review", "testimonials", "testimonial", "portfolio", "examples", "past clients", "references", "clients", "awards"],
      answer:
        "This site doesn't include client testimonials, reviews, or performance claims, and SANIA won't invent them. The best way to judge fit is the free strategy call, where your current site, search presence, and ads are reviewed together.",
      replies: ["Book a call", "How it works"]
    },
    {
      id: "trade",
      keys: ["install", "installation", "repair my", "fix my", "broken", "not working", "no heat", "no ac", "ac broke", "furnace broke", "technician", "tune up my", "service my", "emergency", "licensed", "contractor", "hvac work", "maintenance visit"],
      answer:
        "Just to be clear: SANIA is a marketing agency. It does not install, repair, or service HVAC equipment and is not a licensed HVAC contractor.\n\nIf you're a homeowner who needs heating or cooling help, please contact a local licensed HVAC company. If you run an HVAC company, I'm happy to help with marketing questions."
    },
    {
      id: "who",
      keys: ["who do you work with", "who", "industries", "industry", "plumber", "plumbers", "roofer", "electrician", "small business", "fit", "where", "location", "located", "nationwide", "area", "areas", "states", "usa", "united states", "my city", "service area"],
      answer:
        "SANIA works with HVAC companies across the United States — from single-location shops to operators with several crews. If you're not an HVAC company, this site is probably not the right fit."
    },
    {
      id: "adspend",
      keys: ["ad spend", "who pays", "media spend", "media budget", "ad budget", "pay google", "pay facebook"],
      answer:
        "Ad spend is paid directly by you to Google or Meta. SANIA's own scope and cost are agreed with you before any paid work starts."
    },
    {
      id: "timeline",
      keys: ["how long", "how fast", "how soon", "overnight", "timeline", "quickly", "time frame", "timeframe", "when will"],
      answer:
        "It depends on the work. Local SEO is steady work, not a switch that flips overnight, and ad results vary by market, bid, and season. Timelines for a specific project are covered when scope is discussed on the free strategy call."
    },
    {
      id: "tools",
      keys: ["crm", "software", "tools", "tool", "servicetitan", "housecall", "jobber", "platform", "integrate", "integration"],
      answer:
        "SANIA works with the tools you already use when that's practical, instead of forcing a new platform."
    },
    {
      id: "why",
      keys: ["why sania", "why you", "different", "difference", "why choose", "specialize", "hvac only", "focus"],
      answer:
        "Why SANIA:\n• Focused on HVAC — work shaped around emergency calls, seasonal maintenance, and planned replacements, not a generic template.\n• Marketing only — no trade-work claims; your team stays in charge of the HVAC work.\n• Direct contact — call or email, no ticket maze, and no invented reviews, awards, or guarantees."
    },
    {
      id: "strategy",
      keys: ["strategy call", "free call", "consultation", "consult", "free", "audit", "obligation", "discovery"],
      answer:
        "The strategy call is free with no obligation to hire SANIA. It's used to review your current site, search presence, and ads, and talk through sensible next steps.",
      replies: ["Book a call", "Call now"]
    },
    {
      id: "contact",
      keys: ["contact", "phone", "phone number", "email", "e-mail", "call you", "reach", "talk", "speak", "human", "person", "someone", "agent", "representative", "owner"],
      handler: "human"
    },
    {
      id: "thanks",
      keys: ["thanks", "thank you", "thx", "appreciate", "great", "awesome", "cool"],
      answer: "You're welcome! Anything else I can help with?",
      replies: ["Services", "Book a call"]
    },
    {
      id: "bye",
      keys: ["bye", "goodbye", "see you", "that's all", "thats all", "no thanks", "nothing else"],
      answer: "Thanks for stopping by. You can reopen this chat anytime, or reach SANIA at " + telLink + " or " + mailLink + "."
    },
    {
      id: "hello",
      keys: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo", "howdy"],
      answer: "Hi! I'm SANIA's automated assistant. Ask about services, how it works, or pricing — or book a free strategy call.",
      replies: null
    },
    {
      id: "bot",
      keys: ["are you a bot", "are you human", "are you real", "ai", "robot", "chatgpt", "automated"],
      answer:
        "I'm an automated, rule-based assistant — not a person and not an AI model. I only know what's on this website. For anything else, talk to a human at " + telLink + " or " + mailLink + "."
    }
  ];

  var SERVICE_CHOICES = ["HVAC website", "Local SEO", "Google Ads / LSA", "Meta ads", "Lead generation", "Booked-call support", "Not sure yet"];
  var MAIN_REPLIES = ["Services", "How it works", "Pricing / Get a quote", "Book a call", "Talk to a human"];

  /* ---------- Matching ---------- */
  var SYN = { "u": "you", "ur": "your", "pls": "please", "plz": "please", "websit": "website", "wesbite": "website", "webiste": "website", "googel": "google", "facebok": "facebook", "pricng": "pricing", "prise": "price" };

  function norm(s) {
    return (" " + String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9@.+ ]+/g, " ").replace(/\s+/g, " ").trim() + " ")
      .split(" ").map(function (w) { return SYN[w] || w; }).join(" ");
  }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }
  function fuzzyWord(w, k) {
    if (w === k) return 2;
    if (k.length >= 5 && w.length >= 4) {
      var d = lev(w, k);
      if (d <= 1 || (k.length >= 8 && d <= 2)) return 1;
    }
    return 0;
  }
  function match(text) {
    var n = " " + norm(text) + " ";
    var words = n.trim().split(" ").filter(Boolean);
    var best = null, bestScore = 0;
    KB.forEach(function (entry, idx) {
      var score = 0;
      entry.keys.forEach(function (k) {
        var kn = norm(k).trim();
        if (kn.indexOf(" ") >= 0) {
          if (n.indexOf(" " + kn + " ") >= 0) score += 3 + kn.split(" ").length;
        } else {
          var bestW = 0;
          words.forEach(function (w) { bestW = Math.max(bestW, fuzzyWord(w, kn)); });
          score += bestW;
        }
      });
      // greeting/thanks should only win when nothing more specific matches
      if (entry.id === "hello" || entry.id === "thanks") score = Math.min(score, 1.5);
      score -= idx * 0.001; // stable tie-break: earlier = more specific
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return bestScore >= 1 ? best : null;
  }

  /* ---------- DOM ---------- */
  var root = document.createElement("div");
  root.className = "sgp-chat";
  root.innerHTML =
    '<button type="button" class="sgp-chat-launcher" aria-expanded="false" aria-controls="sgp-chat-panel" aria-haspopup="dialog">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="sgp-ico-open" d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/></svg>' +
      '<span class="sgp-chat-launcher-label">Questions? Chat</span>' +
      '<span class="sgp-sr sgp-launcher-sr">Open the SANIA automated assistant</span>' +
    "</button>" +
    '<section class="sgp-chat-panel" id="sgp-chat-panel" role="dialog" aria-modal="false" aria-labelledby="sgp-chat-title" aria-describedby="sgp-chat-notice" hidden>' +
      '<header class="sgp-chat-head">' +
        '<span class="sgp-chat-avatar" aria-hidden="true"><svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#17233A"/><path d="M20 20c7.5-7 17.5-7 25 0" fill="none" stroke="#C2612C" stroke-width="2.4" stroke-linecap="round"/><path d="M44.5 22.5c-2.6-4.2-7.2-6.7-12.6-6.7-8.2 0-13.8 5.1-13.8 11.4 0 6.3 4.9 9.3 13 11.4 5.4 1.4 8 3.1 8 6.4 0 3.5-3.3 5.8-8.5 5.8-5.4 0-9.3-2.3-11.8-6.5" fill="none" stroke="#F7F3EC" stroke-width="4.3" stroke-linecap="round"/></svg></span>' +
        '<div class="sgp-chat-title"><strong id="sgp-chat-title">SANIA Assistant</strong><span>Automated assistant · not a live person</span></div>' +
        '<button type="button" class="sgp-chat-iconbtn sgp-restart" aria-label="Restart conversation" title="Restart">&#8635;</button>' +
        '<button type="button" class="sgp-chat-iconbtn sgp-close" aria-label="Close chat" title="Close">&times;</button>' +
      "</header>" +
      '<p class="sgp-chat-notice" id="sgp-chat-notice">Automated, rule-based assistant. Answers come from this website only. Nothing you type is sent anywhere unless you choose to send an email yourself.</p>' +
      '<div class="sgp-chat-log" role="log" aria-live="polite" aria-relevant="additions" tabindex="0" aria-label="Conversation"></div>' +
      '<form class="sgp-chat-form" autocomplete="off">' +
        '<label class="sgp-sr" for="sgp-chat-input">Type your message</label>' +
        '<input id="sgp-chat-input" type="text" maxlength="400" placeholder="Ask about services, pricing…" enterkeyhint="send">' +
        '<button type="submit" class="sgp-chat-send">Send</button>' +
      "</form>" +
    "</section>";
  document.body.appendChild(root);

  var launcher = root.querySelector(".sgp-chat-launcher");
  var launcherSr = root.querySelector(".sgp-launcher-sr");
  var panel = root.querySelector(".sgp-chat-panel");
  var log = root.querySelector(".sgp-chat-log");
  var form = root.querySelector(".sgp-chat-form");
  var input = root.querySelector("#sgp-chat-input");
  var started = false;

  function scrollDown() { log.scrollTop = log.scrollHeight; }

  function botSay(html, cls) {
    var div = document.createElement("div");
    div.className = "sgp-msg sgp-msg-bot" + (cls ? " " + cls : "");
    div.innerHTML = html; // trusted, static site content only
    log.appendChild(div);
    scrollDown();
    return div;
  }
  function userSay(text) {
    var div = document.createElement("div");
    div.className = "sgp-msg sgp-msg-user";
    div.textContent = text;
    log.appendChild(div);
    scrollDown();
  }
  function clearReplies() {
    log.querySelectorAll(".sgp-replies").forEach(function (r) {
      r.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
      r.remove();
    });
  }
  /* items: string label (sent as user text) or {label, action, href, primary} */
  function replies(items) {
    clearReplies();
    if (!items || !items.length) return;
    var wrap = document.createElement("div");
    wrap.className = "sgp-replies";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Suggested replies");
    items.forEach(function (it) {
      if (typeof it === "string") it = { label: it };
      var el;
      if (it.href) {
        el = document.createElement("a");
        el.href = it.href;
        if (it.newTab) { el.target = "_blank"; el.rel = "noopener"; }
      } else {
        el = document.createElement("button");
        el.type = "button";
      }
      el.className = "sgp-reply" + (it.primary ? " sgp-primary" : "");
      el.textContent = it.label;
      el.addEventListener("click", function (e) {
        if (it.action) { e.preventDefault(); userSay(it.label); clearReplies(); it.action(); }
        else if (!it.href) { handle(it.label); }
      });
      wrap.appendChild(el);
    });
    log.appendChild(wrap);
    scrollDown();
  }

  /* ---------- Conversation ---------- */
  var lead = null; // { step, name, company, contact, city, need }

  function greet() {
    botSay("Hi! I'm SANIA Growth Partner's <strong>automated assistant</strong> (not a live person).\n\nSANIA does marketing for HVAC companies — websites, local SEO, Google Ads & LSA, Meta ads, lead capture, and booked-call support. How can I help?");
    replies(MAIN_REPLIES);
  }

  function human() {
    botSay("You can reach a person at SANIA directly:\n📞 " + telLink + "\n✉️ " + mailLink + "\n\nOr leave your details here and I'll prepare a message you can send yourself.");
    replies([
      { label: "Call " + CONTACT.phone, href: "tel:" + CONTACT.tel },
      { label: "Email SANIA", href: "mailto:" + CONTACT.email },
      { label: "Leave my details", action: startLead, primary: true }
    ]);
  }

  function bookCall() {
    botSay("The strategy call is <strong>free</strong> and there's no obligation. It covers your company, service area, current marketing, and what you want to improve.\n\nI can take a few details now (about 1 minute), or you can call " + telLink + ".");
    replies([
      { label: "Start booking request", action: startLead, primary: true },
      { label: "Call " + CONTACT.phone, href: "tel:" + CONTACT.tel },
      "How it works"
    ]);
  }

  var LEAD_STEPS = {
    name: "What's your name?",
    company: "Thanks, {name}. What's the name of your HVAC company?",
    contact: "What's the best phone number or email to reach you?",
    city: "Which city or area do you serve?",
    need: "What do you most want help with? Pick one or type your own."
  };

  function askLead() {
    var q = LEAD_STEPS[lead.step].replace("{name}", esc(lead.name || ""));
    botSay(q);
    if (lead.step === "need") replies(SERVICE_CHOICES.map(function (s) { return { label: s, action: function () { leadAnswer(s, true); } }; }));
    else if (lead.step === "company" || lead.step === "city") replies([{ label: "Skip", action: function () { leadAnswer("", true); } }, { label: "Cancel", action: cancelLead }]);
    else replies([{ label: "Cancel", action: cancelLead }]);
    input.placeholder = lead.step === "contact" ? "Phone or email" : "Type your answer…";
    input.focus();
  }

  function startLead() {
    lead = { step: "name", name: "", company: "", contact: "", city: "", need: "" };
    botSay("Great — a few quick questions. Your details stay in this browser; at the end you choose how to send them (nothing is sent automatically). Type <em>cancel</em> anytime to stop.");
    askLead();
  }
  function cancelLead() {
    lead = null;
    input.placeholder = "Ask about services, pricing…";
    botSay("No problem — cancelled. Anything else?");
    replies(MAIN_REPLIES);
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function isPhone(s) { var d = s.replace(/\D/g, ""); return d.length >= 10 && d.length <= 15 && /^[\d\s().+\-]+$/.test(s); }

  function leadAnswer(text, fromButton) {
    var v = String(text).trim();
    if (!fromButton && /^(cancel|stop|quit|exit)$/i.test(v)) { cancelLead(); return; }
    clearReplies();
    switch (lead.step) {
      case "name":
        if (v.length < 2) { botSay("Please enter your name (or type cancel)."); askLead(); return; }
        lead.name = v.slice(0, 80); lead.step = "company"; break;
      case "company":
        lead.company = v.slice(0, 120); lead.step = "contact"; break;
      case "contact":
        if (!EMAIL_RE.test(v) && !isPhone(v)) { botSay("That doesn't look like a phone number or email. Please try again — e.g. (555) 123-4567 or name@company.com."); askLead(); return; }
        lead.contact = v.slice(0, 120); lead.step = "city"; break;
      case "city":
        lead.city = v.slice(0, 120); lead.step = "need"; break;
      case "need":
        if (!v) { askLead(); return; }
        lead.need = v.slice(0, 400); lead.step = "done"; break;
    }
    if (lead.step === "done") summary(); else askLead();
  }

  function leadFields() {
    var email = EMAIL_RE.test(lead.contact) ? lead.contact : "";
    var phone = email ? "" : lead.contact;
    return { name: lead.name, company: lead.company, phone: phone, email: email, area: lead.city, help: lead.need + " (via website chat assistant)" };
  }

  function summary() {
    input.placeholder = "Ask about services, pricing…";
    var f = leadFields();
    var box = botSay("", "sgp-msg-summary");
    box.appendChild(document.createTextNode("Here's your request:\n"));
    [["Name", f.name], ["Company", f.company || "—"], ["Phone", f.phone || "—"], ["Email", f.email || "—"], ["City / area", f.area || "—"], ["Help with", lead.need]].forEach(function (row) {
      var line = document.createElement("div");
      var b = document.createElement("strong");
      b.textContent = row[0] + ": ";
      line.appendChild(b);
      line.appendChild(document.createTextNode(row[1]));
      box.appendChild(line);
    });
    botSay("Nothing has been sent. Choose how to send it:\n• <strong>Fill the contact form</strong> — I'll copy these details into the form on this site; you review and submit it (it opens an email draft in your own email app).\n• <strong>Open email draft</strong> — opens your email app with this message to SANIA; you press send.\n• Or just call " + telLink + ".");
    replies([
      { label: "Fill the contact form", action: toForm, primary: true },
      { label: "Open email draft", action: openMail },
      { label: "Call " + CONTACT.phone, href: "tel:" + CONTACT.tel },
      { label: "Start over", action: startLead }
    ]);
  }

  function mailtoHref(f) {
    var body = [
      "Name: " + f.name, "Company: " + f.company, "Phone: " + f.phone, "Email: " + f.email, "Service area: " + f.area,
      "", "What they want help with:", f.help
    ].join("\n");
    return "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("SANIA strategy call request — " + f.name) + "&body=" + encodeURIComponent(body);
  }

  function openMail() {
    var f = leadFields();
    botSay("Opening a draft in your email app addressed to " + mailLink + ". Nothing is sent until you press send there. If no draft appears, email that address directly or call " + telLink + ".");
    replies(["Services", "Talk to a human"]);
    window.location.href = mailtoHref(f);
  }

  function prefillForm(f) {
    var formEl = document.getElementById("strategy-form");
    if (!formEl) return false;
    ["name", "company", "phone", "email", "area", "help"].forEach(function (k) {
      var el = formEl.querySelector('[name="' + k + '"]');
      if (el && f[k]) { el.value = f[k]; el.dispatchEvent(new Event("input", { bubbles: true })); }
    });
    var status = document.getElementById("form-status");
    var missingEmail = !f.email;
    if (status) {
      status.textContent = missingEmail
        ? "Filled in from the chat. Please add your email, then press “Open email draft”."
        : "Filled in from the chat. Review it, then press “Open email draft” to send from your own inbox.";
    }
    var contact = document.getElementById("contact") || formEl;
    contact.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    var focusEl = missingEmail ? formEl.querySelector('[name="email"]') : formEl.querySelector('[type="submit"]');
    if (focusEl) setTimeout(function () { focusEl.focus({ preventScroll: true }); }, 400);
    return true;
  }

  function toForm() {
    var f = leadFields();
    if (onHome) {
      prefillForm(f);
      botSay("Done — the contact form below is filled in. Review it and press <strong>Open email draft</strong>" + (f.email ? "" : " (the form also needs your email)") + ". Nothing is sent until you send it from your email app.");
      replies(["Services", "Talk to a human"]);
      lead = null;
      if (window.matchMedia("(max-width: 520px)").matches) setOpen(false, true);
    } else {
      try { sessionStorage.setItem(PREFILL_KEY, JSON.stringify(f)); } catch (e) { /* storage blocked: fall back to email */ openMail(); return; }
      botSay("Taking you to the contact form on the home page with your details filled in…");
      window.location.href = homeUrl + "#contact";
    }
  }

  function handle(raw) {
    var text = String(raw || "").trim();
    if (!text) return;
    userSay(text);
    if (lead && lead.step !== "done") { leadAnswer(text, false); return; }
    clearReplies();
    var t = norm(text).trim();

    // quick-reply intents
    if (/^(yes get a quote|get a quote|leave my details|quote|yes)$/.test(t)) { startLead(); return; }
    if (/^(book a call|book a strategy call|book|schedule a call|start booking request)$/.test(t) || /\b(book|schedule)\b.*\bcall\b/.test(t)) { bookCall(); return; }
    if (/^(talk to a human|human|call now)$/.test(t)) { human(); return; }
    if (t === "pricing get a quote") { var p = KB.filter(function (k) { return k.id === "pricing"; })[0]; botSay(p.answer); replies(p.replies); return; }
    if (t === "google ads lsa") { text = "google ads"; }

    var m = match(text);
    if (m) {
      if (m.handler === "human") { human(); return; }
      botSay(m.answer);
      replies(m.replies === null ? MAIN_REPLIES : (m.replies || ["Book a call", "Services", "Talk to a human"]));
      return;
    }
    botSay("I'm a simple automated assistant and I don't have an answer for that — I only know what's on this website, and I won't guess.\n\nWould you like to leave your details so someone from SANIA can follow up, or contact SANIA directly?");
    replies([{ label: "Leave my details", action: startLead, primary: true }, "Talk to a human", "Services"]);
  }

  /* ---------- Open / close ---------- */
  function setOpen(open, keepFocus) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
    launcherSr.textContent = open ? "Close the SANIA automated assistant" : "Open the SANIA automated assistant";
    if (open) {
      if (!started) { started = true; greet(); }
      setTimeout(function () { input.focus(); }, 30);
    } else if (!keepFocus) {
      launcher.focus();
    }
  }

  launcher.addEventListener("click", function () { setOpen(panel.hidden); });
  root.querySelector(".sgp-close").addEventListener("click", function () { setOpen(false); });
  root.querySelector(".sgp-restart").addEventListener("click", function () {
    log.innerHTML = ""; lead = null; input.placeholder = "Ask about services, pricing…"; greet(); input.focus();
  });
  panel.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.stopPropagation(); setOpen(false); }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = "";
    handle(v);
  });

  /* ---------- Prefill handoff from other pages ---------- */
  if (onHome) {
    try {
      var saved = sessionStorage.getItem(PREFILL_KEY);
      if (saved) {
        sessionStorage.removeItem(PREFILL_KEY);
        var f = JSON.parse(saved);
        window.addEventListener("load", function () { prefillForm(f); });
      }
    } catch (e) { /* ignore */ }
  }

  // Small public hook for testing/debugging; does not send anything.
  window.SANIAChat = { open: function () { setOpen(true); }, close: function () { setOpen(false); } };
})();
