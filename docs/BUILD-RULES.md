# Build rules (shared by all three sites)

You are implementing a finished design. The spec for your site is the source of truth for layout, copy, colour, type and motion. Do not add sections, copy, icons, numbers or decorative effects that are not in the spec. Do not change the Hebrew copy. If something is unspecified, choose the quietest option consistent with the spec.

## Stack and files
- Plain static site. No framework, no build step, no CDN, no external requests of any kind.
- `sites/<slug>/index.html`, `assets/css/styles.css`, `assets/js/main.js`. `assets/css/fonts.css`, `assets/fonts/*` and `assets/img/*` already exist. Do not regenerate or rename them.
- Link order in `<head>`: `fonts.css`, then `styles.css`. Preload the two font files used above the fold (`<link rel="preload" as="font" type="font/woff2" crossorigin>`): the hebrew subset of the display face and of the text face at the weight the hero uses.
- `main.js` is loaded with `defer`. Vanilla JS, no dependencies, under 150 lines.

## Document
- `<html lang="he" dir="rtl">`. RTL is set in HTML, never flipped with CSS.
- Use CSS logical properties everywhere (`margin-inline`, `padding-inline`, `inset-inline-start`, `border-inline-end`, `text-align: start`). Never `left`/`right` unless the spec says "physical".
- In the spec, **start** means the inline start (the right side in RTL) and **end** the left side.
- Phone numbers, emails, Instagram handles and Latin wordmarks are wrapped in `<bdi dir="ltr">` (or `<span dir="ltr">`) so digits and punctuation do not reorder.
- One `<h1>`. Landmarks: `header`, `nav`, `main`, `footer`. A visually hidden skip link "דילוג לתוכן" as the first focusable element.

## Images
- Every image is `assets/img/<name>-<width>.webp`. `assets/img/images.json` lists, per name, the intrinsic `w`, `h` and the available `widths`. Build `srcset` from those widths with `w` descriptors, add a correct `sizes`, and set `width`/`height` attributes to the intrinsic values so layout never shifts.
- The hero image: `fetchpriority="high"`, no `loading="lazy"`, and never hidden by JS or by an animation's start state. Every other image: `loading="lazy" decoding="async"`.
- Crops are done with `object-fit: cover` inside a wrapper that has an explicit `aspect-ratio`. Use the `object-position` the spec gives; default `center`.
- Images whose intrinsic width is 720 or less must never render wider than 440 CSS px.
- Hebrew `alt` text that says what is in the photo. The spec gives the alt for each image.

## Layout
- Fluid layout with `clamp()`. Breakpoints: mobile below 640px, tablet 640 to 1023px, desktop 1024px and up. Design is specified for desktop 1440 wide and mobile 390 wide; tablet interpolates.
- Container: `max-width: 1320px`, side gutter `clamp(20px, 5vw, 72px)`. Sections marked "full-bleed" ignore the container.
- 12-column grid on desktop with a 24px gap. Column numbers in the spec count from the start side.
- No horizontal scroll at any width from 320px to 1920px. Test it.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Section vertical padding: `clamp(72px, 11vw, 160px)` unless the spec says otherwise.

## Style prohibitions
- No gradients except a photo scrim where the spec asks for one. No box-shadows. No blur or glass. No emoji. No icon fonts. No rounded cards: corner radius is 0 unless the spec says otherwise.
- No colour outside the palette in the spec. No second accent.
- No centred body text unless the spec says so.

## Motion
- Each site has exactly one signature reveal, defined in its spec. Implement it once as a CSS class toggled by a single `IntersectionObserver` (`threshold: 0.2`, unobserve after first reveal).
- Hidden start states apply only under `html.js` (set `document.documentElement.classList.add('js')` in an inline script in `<head>`), so the page is complete without JavaScript.
- `@media (prefers-reduced-motion: reduce)`: no transforms, no clip animations, everything visible and static.
- No parallax, no scroll-jacking, no looping animation, no cursor effects.

## Interaction and accessibility
- All interactive targets at least 44×44px. Visible `:focus-visible` ring: 2px solid in the accent colour with 3px offset.
- Text contrast at least 4.5:1, large text 3:1.
- Mobile menu: a real `<button aria-expanded aria-controls>`; Escape closes it; focus returns to the button; body scroll is locked while open.
- FAQ uses native `<details>/<summary>`.
- The mobile sticky action bar is hidden while the contact section is in view, and adds bottom padding to `body` equal to its height so it never covers content.
- The WhatsApp form (where the spec has one) builds a `https://wa.me/<number>?text=<encoded>` URL from the fields and opens it in a new tab on submit. Labels are above inputs and always visible. Required fields are validated on submit with a Hebrew message beside the field.

## Head and SEO
- `<title>` and `<meta name="description">` exactly as in the spec. `<meta name="viewport" content="width=device-width, initial-scale=1">`. `<meta name="theme-color">` = the site's background colour.
- Open Graph: `og:title`, `og:description`, `og:type=website`, `og:locale=he_IL`, `og:image` pointing at the hero image file (relative path is acceptable for now).
- Inline SVG favicon via `<link rel="icon" href="data:image/svg+xml,...">` as the spec describes.
- JSON-LD `LocalBusiness` with only the fields the spec lists. Never add ratings, reviews, prices, opening hours or an address that the spec does not give.

## Verify before you finish
Chromium and Playwright are preinstalled (`require('playwright')` works; `chromium.launch()` needs no options). Serve the site with `python3 -m http.server <port> --directory sites/<slug>` and:
1. Take full-page screenshots at 1440×900 and 390×844 (`deviceScaleFactor: 1`) into your scratch directory, and look at them. Scroll through the page in the script first so lazy images load and reveals fire.
2. Assert in the script: `document.documentElement.scrollWidth <= window.innerWidth` at 320, 390, 768, 1440; no image with `naturalWidth === 0`; no console errors; exactly one `h1`.
3. Fix what you see: overlapping text, clipped headlines, orphaned single words in large headings, wrong RTL alignment, images cropped off their subject, uneven gaps. Repeat until both screenshots look deliberate at every section.
4. Report: files written, anything in the spec you could not implement and why, and anything you are unsure about. Do not commit.
