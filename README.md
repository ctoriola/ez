# EeZee Conceptz website (Sonne-style rebuild)

A static rebuild of the [new.eezeeconceptz.org](https://new.eezeeconceptz.org) homepage. It keeps EeZee's content and section order and uses the visual design of the [sonne.](https://sonne.framer.website) Framer template.

For the review of the current site, see [CRITIQUE.md](CRITIQUE.md).

## Stack

The site is plain HTML, CSS and JavaScript, with no build step or dependencies. Fonts are Manrope and DM Sans from Google Fonts.

```
index.html            all page content (static, so it is crawlable)
assets/css/styles.css design tokens and components
assets/js/main.js     interactions: menu, scroll reveal, pinned story, tabs, video player, multi-step form
assets/img/           optimised WebP images (31 files, 2.7 MB in total)
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

You can drop the folder onto Netlify, Vercel, Cloudflare Pages or any static host. No build command is needed, and the publish directory is the repository root.

## Section map (EeZee structure → Sonne pattern)

| EeZee section | Sonne pattern used |
|---|---|
| Nav + hero | Split hero: yellow panel and photo, plus a four-item feature strip (the four pillars) |
| About ("Kingdom business") | "Big change. Starts small.": two columns plus three numbered points |
| Stats (50+, 200+, 10+) | "Your day begins.": pinned full-screen story with glass tabs |
| Featured artistes | "For small spaces.": product cards with one highlighted |
| Latest releases + platforms | "Where should the sun work?": tabbed feature card |
| YouTube visuals | "All included.": dark section with a detail card and numbered list |
| Youth / vision statement | "More from today.": full-bleed photo statement |
| Services | "From would be nice to up and running": numbered columns with yellow icons |
| FAQ (new) | "Good questions. Clear answers." accordion |
| CTA | "Hello sun. Hello future." yellow band |
| Contact | "Your spot. Your plan.": multi-step form |
| Footer | Sonne footer |

## Customising

- **Colours:** edit the tokens in the `:root` block at the top of `styles.css`. Set `--accent: #e3262b` to switch to the EZ red.
- **Contact form:** by default it opens the visitor's email app with the message filled in. To post the form data as JSON to your own backend (a Supabase edge function, an n8n or Make webhook, or Formspree), set `data-endpoint="https://..."` on `<form id="contact-form">`.
- **Subpages:** artiste profiles, release pages, events, news, booking, privacy and terms still link to the existing pages on new.eezeeconceptz.org.
