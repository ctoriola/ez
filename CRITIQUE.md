# new.eezeeconceptz.org: site critique

Reviewed 16 Nov 2026 on desktop (1440px) and mobile (390px). I checked the homepage plus /about, /artists, /releases, /events, /announcements, /services and /booking.

## What works

1. **The content is real.** There are real artiste portraits, real release artwork and six recent YouTube videos. A lot of label sites are mostly stock photos. This one isn't.
2. **The positioning is clear.** "Gospel music label & artiste development" sits above the fold. The meta description is accurate too.
3. **The homepage covers what each visitor needs.** It has About, Artistes, Releases, Videos, Services, a CTA and Contact, so artistes, churches and fans each find their part.
4. **The services are well structured.** There are six services, each with four concrete bullets. Visitors can see what they would be paying for.
5. **It shows trust signals.** CAC registration, a phone number, an email, an office address and business hours are all visible.
6. **The booking page is well thought out.** Categories, service lines, duration and preferred date make it a qualified-lead form, not just a contact box.
7. **Each page has its own title**, for example "About | EeZee Conceptz".
8. **Content is managed through a CMS.** Releases and events come from Supabase, so the team can publish without a developer.

## What doesn't work

### Performance (the biggest problem)
- **The homepage downloads about 17 MB.** Several images are full camera originals: the founder photo is 10 MB, the "A New Thing" EP artwork PNG is 9 MB and event gallery shots are 3–5 MB each. Release covers are 3 MB PNGs. An 8 MB MP3 also loads on some pages.
- Many users in Nigeria browse on mobile data, and pages this heavy are slow and costly for them. The rebuild serves the same homepage at about 1.7 MB, because the images were converted to WebP at sensible sizes (all 31 images total 2.7 MB).

### Design
- **It looks like a generic AI template.** It uses a black background, purple-to-pink gradients and a gradient on one word in every heading ("Featured **Artistes**", "Latest **Releases**", "Our **Services**", "Get in **Touch**"). Nothing about it says EeZee, and the red EZ logo clashes with the purple and pink.
- **The hero image is a stock Unsplash turntable** with a Technics tonearm and a vinyl record. It has nothing to do with live gospel worship, even though the label has far better photos of its own.
- **There are too many competing accent colours:** purple/pink gradients, bright red YouTube buttons and a red logo.
- **Featured Artistes shows four cards in a three-column grid**, which leaves one card alone on its own row.
- **Every section is laid out the same way:** a centred title, a subtitle, then a grid of cards. Nothing changes the pace, so the page feels long.
- **The hero headline wraps badly on mobile.** "Using Music as a / a / Dynamic Tool" leaves the word "a" alone on its own line.

### Content and consistency
- **The numbers contradict each other.**
  - The homepage says 50+ artistes, 200+ releases and 10+ years.
  - /about says 30+ artistes and 120+ releases.
  - /artists lists 6 current artistes and 3 alumni.
  - The founder bio says the label was founded in 2013, but the Milestones timeline says 2018.
- **Strong credibility is hidden.** Mercy Chinwo, Judikay and Grace Jocktane are label alumni, which is a big selling point, but they only appear deep on /artists. The founder, EeZee Tee, never appears on the homepage.
- **Some pages are empty.** Events says "No events have been published yet". News has a single post. Both are still in the main nav.
- **The location is unclear.** The company is registered in Nigeria and the phone number is Nigerian, but the only office listed is in Arlington, Texas. Business hours don't give a time zone.
- **There are typos and inconsistent naming.** "top-notched" should be "top-notch", "Confrence" should be "Conference", and "Eezee Conceptz" and "EeZee Conceptz" are both used. The copy says "Artiste" but the URLs use "/artists".

### Links and functionality
- **The streaming platform links don't go to EeZee.** Apple Music, Amazon Music, Audiomack, Deezer, Boomplay, Tidal and SoundCloud open each service's homepage, not the label's profile.
- **The artiste cards' Instagram and Spotify icons all point to the label's accounts**, not to each artiste's own.
- **Footer links are mislabelled.** "Press Kit" opens /releases, "FAQ" opens /services, "Licensing" opens /contact, "Cookie Policy" opens /privacy and "Artiste Portal" opens /portfolio.
- **There is a music player** ("Music off") built into the site. Audio that can autoplay usually annoys visitors, especially on mobile data.
- **The newsletter form doesn't say** what subscribers will receive or how often.

### SEO and technical
- **The site renders only in the browser** (a Vite single-page app). The HTML that search engines and link previews receive is an empty `<div id="root">`, so all the content depends on JavaScript.
- **`og:image` uses a relative path** (`/assets/...`). Facebook, WhatsApp and LinkedIn need an absolute URL, so link previews may show no image.
- **There is no structured data** (Organization or MusicGroup schema), and the homepage `<title>` is just "EeZee Conceptz".

## What the rebuild changes

| Issue | Rebuild |
|---|---|
| 17 MB homepage | About 1.7 MB: WebP images resized to display size, lazy-loaded |
| Generic purple-gradient template | Sonne design system: warm cream, navy and sun-yellow, Manrope and DM Sans, generous whitespace |
| Stock turntable hero | Real live-worship photo from the EeZee studio |
| Every section looks the same | Varied pacing: split hero, pinned scroll story, tabbed release feature, dark video section, full-bleed statement, yellow CTA band |
| Stats buried in a card | Stats get their own pinned section (Studio, Stage, Streams) |
| Alumni hidden on /artists | Shown under the artiste cards |
| Four cards in a three-column grid | Four-column grid, with two columns on tablet and one on mobile |
| Six "Watch Now" red buttons | One YouTube player with a playlist; it loads YouTube only when someone clicks play |
| Long single contact form | Four-step form with validation and a review step |
| Content only after JavaScript runs | All content is in the static HTML, with absolute `og:image`, canonical URL and Organization JSON-LD |
| No FAQ (the footer FAQ link went to /services) | FAQ section, written only from facts already on the site |
| Fake platform links | Only verified links (Spotify, YouTube); the other platforms are listed as text until real profile URLs are supplied |

## The client needs to decide or supply

1. **One set of numbers** for artistes, releases and years, and **one founding year** (2013 or 2018).
2. **Artiste-level links**: each artiste's Instagram and Spotify, and the label's real profiles on Apple Music, Audiomack, Boomplay and the other platforms.
3. **Where the contact form should send messages.** Today it opens the visitor's email app. Setting `data-endpoint` connects it to a Supabase edge function or an n8n or Make webhook.
4. **Whether to keep Events and News in the main nav** while those pages are empty.
5. **Accent colour.** The rebuild uses Sonne's yellow, which suits the idea of light and glory. Changing `--accent` in `assets/css/styles.css` to the EZ red recolours the whole site.
6. **Sign-off on the new copy:** the FAQ answers, the headline "Music as a dynamic tool." and the section headlines.
