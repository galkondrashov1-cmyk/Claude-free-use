# Spec: זררת חינה (`sites/zraret-henna`)

Read `docs/BUILD-RULES.md` first. It applies in full.

## The business
ZRARET (זררת) produces luxury Moroccan henna events: décor, outfits and cookies, from a ceremony corner up to a full production. Contact person: Roni. Visitors come from Instagram, usually a bride or her mother. The one action: WhatsApp Roni. The objections: "what is included, what does it cost, and will it really look like the photos?"

## Concept: walking through the gate
Their productions start with a lit Moroccan arch and a curtain corridor. The site borrows that: photos sit inside **Moroccan arch frames with a thin gold rim**, and the middle of the page walks through the evening in the order a guest experiences it: gate, souk, ceremony corner, outfits, the grand entrance. Colours come from the décor: ivory lace, deep henna maroon, gold.

## Tokens
```
--ivory:#FAF4E8   (light bg)          --ivory-2:#F1E8D6 (alt light band)
--henna:#3B0D0C   (dark bg; headings on ivory)   --ink:#2A1410 (body text on ivory)
--ink-2:#6F5648   (secondary text on ivory)
--gold:#B58A3C    (the only accent: rims, numerals, lines; text on --henna)
--gold-deep:#8C6723 (the accent for small text on ivory)
--rule:#E3D2B0    (hairlines on ivory)   on --henna hairlines are --gold at 30% opacity
```
Fonts (in `fonts.css`): **Bellefair** 400 (display, Hebrew and Latin), **Heebo** 300/400/500 (text).
- Display: Bellefair 400, line-height 1.04, letter-spacing 0.
- Body: Heebo 300, 18px/1.7. Small: Heebo 400 15px. Label: Heebo 500, 13px, letter-spacing .1em.
- Buttons: Heebo 500 16px, radius 0, height 56px, padding-inline 32px. On `--henna`: primary = `--gold` bg, `--henna` text, hover `--ivory` bg. On ivory: primary = `--henna` bg, `--ivory` text, hover `--gold-deep` bg. Outline (on henna): 1px `--gold` border, `--ivory` text, hover `--gold` bg + `--henna` text.
- Easing everywhere: `cubic-bezier(.22,1,.36,1)`.

### Component: arch frame `.arch`
Put this once at the top of `<body>`:
```html
<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>
 <clipPath id="arch" clipPathUnits="objectBoundingBox"><path d="M0,1 L0,0.46 L0.07,0.46 C0,0.37 0.02,0.15 0.5,0 C0.98,0.15 1,0.37 0.93,0.46 L1,0.46 L1,1 Z"/></clipPath>
 <clipPath id="arch-top" clipPathUnits="objectBoundingBox"><path d="M0,1 L0.07,1 C0,0.804 0.02,0.326 0.5,0 C0.98,0.326 1,0.804 0.93,1 L1,1 Z"/></clipPath>
</defs></svg>
```
`.arch` is a wrapper with `aspect-ratio: 3/4` and `position: relative`. Inside it: `.arch__img` (fills the wrapper, `clip-path: url(#arch)`, contains the `img` with `object-fit: cover`), and the **gold rim**: an absolutely positioned inline SVG, `inset: -10px`, `viewBox="0 0 300 400" preserveAspectRatio="none"`, one path `M0,400 L0,184 L21,184 C0,148 6,60 150,0 C294,60 300,148 279,184 L300,184 L300,400 Z` with `fill="none" stroke="#B58A3C" stroke-width="1" vector-effect="non-scaling-stroke"`, `pointer-events:none`. The rim is always visible; the photo is what animates. Verify in a screenshot that the arch reads as a pointed Moroccan horseshoe arch with small shoulders, and that the rim is an even 10px outside the photo all round.

### Component: khatam band `.khatam`
A 48px-high strip, full-bleed, `background-repeat: repeat-x; background-position: center`, the tile an inline SVG data URI 48×48: two 28×28 squares centred at (24,24), one of them rotated 45°, `fill="none" stroke="#B58A3C" stroke-width="1"`, at 55% opacity. Used only where the spec says.

### Signature motion: the rise
`.rise` (on `.arch__img` and on plain image wrappers) starts at `clip-path: inset(100% 0 0 0)` and animates to `inset(0)` in 1.3s, so the picture rises from the floor inside its frame. For `.arch__img` the arch clip must stay: put the `url(#arch)` clip on `.arch__img` and the animated inset on an inner wrapper. A supporting image in the same block is delayed 150ms. Nothing else animates. The two hero arches do not animate.

## Links
- WhatsApp (all CTA buttons): `https://wa.me/972529282992?text=` + URL-encoded `היי רוני, הגעתי מהאתר ואשמח לפרטים על הפקת חינה.`
- Phone: `tel:+972529282992`, shown as `052-928-2992`
- Instagram: `https://www.instagram.com/zraret_henna/`, shown as `@zraret_henna`

## Head
- title: `זררת חינה | הפקת אירועי חינה מרוקאית יוקרתיים`
- description: `הפקת חינה מרוקאית מהשער ועד האפריון: תפאורה, תלבושות ועוגיות. חבילות בתקציב שמתאים לכם. דברו עם רוני: 052-928-2992.`
- theme-color `#3B0D0C`. Favicon: `#3B0D0C` square with the arch path filled `#B58A3C`, centred with padding.
- JSON-LD `LocalBusiness`: name `זררת חינה`, telephone `+972-52-928-2992`, areaServed `IL`, sameAs the Instagram URL.

## Sections

### 0. Header (sticky, dark)
Height 76px desktop, 60px mobile. Background `--henna`, text `--ivory`. A 1px gold-30% bottom border once scrolled 8px.
- Start: wordmark `זררת` (Bellefair 32px, `--ivory`) and beside it on desktop `ZRARET HENNA` (Latin, Heebo 500, 11px, letter-spacing .22em, `--gold`), 12px gap.
- Middle (desktop): nav Heebo 400 15px, 32px gaps, hover `--gold`: `הערב` #evening, `חבילות` #packages, `גלריה` #gallery, `שאלות` #faq.
- End (desktop): outline button 44px `וואטסאפ לרוני`.
- Mobile: wordmark at start, 44px text button `תפריט` at end. Overlay `--henna`: links in Bellefair 48px `--ivory`, 12px gaps; primary button `וואטסאפ לרוני` and the phone number at the bottom; close button `סגירה`.

### 1. Hero (dark)
Background `--henna`, `overflow: hidden`, `position: relative`. Desktop `min-height: clamp(680px, calc(100svh - 76px), 920px)`, padding-block 64px.
- Backdrop (behind everything, `aria-hidden`): the word `ZRARET`, Latin, Bellefair, `font-size: clamp(150px, 25vw, 400px)`, line-height .8, `color: transparent; -webkit-text-stroke: 1px rgba(181,138,60,.5)`, `white-space: nowrap`, absolutely positioned, horizontally centred, bottom edge `-0.06em` below the hero bottom.
- Text, columns 1–5, vertically centred, above the backdrop:
  - Label in `--gold`: `הפקת אירועי חינה יוקרתיים`
  - 20px below: **h1**, Bellefair, `clamp(44px, 6vw, 96px)`, `--ivory`: `הפקת חינה מרוקאית, / מהשער ועד האפריון.`
  - 24px below: lead (Heebo 300 20px/1.6, `--ivory` at 85%, max 38ch): `תפאורה, תלבושות ועוגיות תחת קורת גג אחת. זררת מפיקה את כל הערב, בתקציב שמתאים לכם.`
  - 36px below: primary button `דברו עם רוני בוואטסאפ`, and 24px beside it the phone as a text link (`--ivory`, Heebo 500 17px, 1px gold underline offset 6px).
  - 56px below: Bellefair 22px `--gold`: `כשהמסורת פוגשת מודרניות קלאסית`
- Arch A: `.arch` in columns 7–10, vertically centred. Image `arch-entrance`, alt `שער מרוקאי מואר ומאחוריו מסדרון וילונות ושטיחים`.
- Arch B: `.arch`, width 230px, in columns 11–12, its top 190px lower than the top of arch A. Image `stage-bowl`, object-position center 60%, alt `קערת חינה מוזהבת על שולחן מול במת הטקס`.
- Mobile: text block first (button full width, phone centred below it), then 48px gap, arch A at 74% of the container width at the start side, arch B at 40% width at the end side overlapping arch A's bottom by 96px. The backdrop sits behind the arches at `font-size: 26vw` so the whole word fits. Hero padding-bottom 72px.

### 2. Intro (ivory)
Background `--ivory`, padding-block `clamp(72px, 9vw, 128px)`. Centred column, max-width 900px, text centred (allowed here).
- One khatam star, 28px, stroke `--gold` (the same two-square figure as the band tile), centred.
- 28px below: Bellefair `clamp(26px, 3.1vw, 44px)`, line-height 1.3, `--henna`: `כניסה מפוארת, מבואה שמרגישה כמו רחובות מרוקו, אווירת שוק, פינת טקס ואפריון. כל מה שצריך כדי שהאורחים שלכם יזכרו את הערב הזה.`

### 3. The evening `#evening` (ivory)
Header: label in `--gold-deep`: `הערב, לפי הסדר`; h2 Bellefair `clamp(38px, 5vw, 72px)` `--henna`: `חמש תחנות, / ערב אחד.` 96px below, five stations.

Station layout (desktop, 12 columns): odd stations (01, 03, 05): arch in columns 1–4, text in columns 6–9 vertically centred against the arch, supporting image in columns 10–12 with margin-top 160px. Even stations (02, 04): mirrored: supporting image in columns 1–3 with margin-top 160px, text in columns 5–8, arch in columns 9–12. Between stations: a 1px × 72px `--gold` vertical line centred in the container, with 56px of space above and below.
- Text block: numeral (Bellefair 96px, `--gold`, line-height 1), 8px below h3 (Bellefair `clamp(36px, 4vw, 60px)`, `--henna`), 16px below body (max 34ch, `--ink`).
- Arch: `.arch` with `.rise`. Supporting image: plain wrapper, aspect 4/5, `.rise`, no rim.
- Mobile: numeral and h3, then arch at 78% width at the start, supporting image at 44% width at the end overlapping the arch's bottom by 64px, then body. Vertical line 48px between stations.

| # | title | arch image / position / alt | supporting image / alt | body |
|---|---|---|---|---|
| 01 | `השער` | `corridor` / center / `מסדרון וילונות ושטיחים שמוביל אל האירוע` | `arch-corridor` / `שער מרוקאי מואר בכניסה לאירוע` | `האורחים נכנסים דרך שער מרוקאי מואר ומסדרון של וילונות. עוד לפני שראו את החתן והכלה, הם כבר במרוקו.` |
| 02 | `המבואה והשוק` | `sweets-tent` / center 55% / `שולחן מתוקים עמוס מגשים מוזהבים מול אוהל וילונות לבן` | `fountain` / `מזרקה לבנה מוקפת מגדלי מתוקים` | `אווירת שוק: פיצוחים, עוגיות מרוקאיות, מגשים מוזהבים ומזרקה במרכז. מקום להסתובב בו, לטעום ולהצטלם.` |
| 03 | `פינת הטקס` | `couple-stage` / center 35% / `חתן וכלה יושבים על במת הטקס מול תפאורה לבנה מחוררת` | `henna-bowls` / `קערות חינה לבנות עם נרות על שולחן מעוטר` | `במה, ספה מלכותית וקערות החינה, מוכנות לרגע שבשבילו כולם באו.` |
| 04 | `התלבושות` | `bride` / center 30% / `כלה בשמלת תחרה לבנה מול במת הטקס` | `outfit-1` / `דוגמנית בשמלת תחרה לבנה מקולקציית זררת` | `תלבושות מרהיבות לכלה ולחתן, מתוך קולקציית 26–27 של זררת.` |
| 05 | `הכניסה באפריון` | `entrance-couple` / center 40% / `חתן וכלה נכנסים דרך הווילונות והאורחים מצלמים` | `night-walk` / `חתן וכלה צועדים יד ביד בכניסה לאירוע` | `הכניסה החגיגית של החתן והכלה. הרגע שבו כל הטלפונים מצלמים.` |

### 4. Packages `#packages` (dark)
`.khatam` band directly above. Background `--henna`, text `--ivory`. Desktop: main content in columns 1–8, two images in columns 10–12.
- Label `--gold`: `חבילות`; h2 Bellefair `clamp(38px, 5vw, 72px)`: `מהכול כלול / ועד תפאורה בלבד.`; 24px below, lead (20px, `--ivory` 85%, max 46ch): `יש חבילות שכוללות הכול מהכול, ויש חבילות של תפאורה וציוד משלים בלבד. בכל מקרה, בתקציב שמותאם אליכם.`
- 56px below: a three-row menu. Each row: 1px gold-30% rule above (and under the last), padding-block 28px, grid: name (Bellefair `clamp(30px, 3.4vw, 48px)`, `--ivory`) in a 4-of-8 column, description (18px, `--ivory` 85%) in the other 4. Mobile: name above description.
  1. `פינת טקס` / `במה, ספה ותפאורת טקס. לחינה, להפרשת חלה או לכיסא כלה.`
  2. `תפאורה וציוד` / `שער, מבואה, שולחנות מתוקים וריהוט. את השאר אתם מביאים.`
  3. `הפקה מלאה` / `תפאורה מפוארת, עמדת טקס, עוגיות ופיצוחים, תלבושות וכניסה חגיגית באפריון.`
- 32px below: label `--ivory` 70%: `המחיר נקבע לפי התאריך, המקום וגודל האירוע.` 24px below: primary button `קבלו הצעה בוואטסאפ`.
- Images (columns 10–12, top-aligned with the h2): `stage-wide` (aspect 1/1, `.rise`, alt `במת טקס מרוקאית עם ספה מוזהבת, כדים ושטיחים`), 8px below it a label `--gold`: `פינת טקס מרוקאית`; 40px below, `white-set` (aspect 4/3, `.rise`, alt `תפאורה לבנה קלאסית עם קשתות מוארות וספה`), label `תפאורה לבנה קלאסית, גם לכיסא כלה`.
- Mobile: text, menu, note, button, then the two images side by side (12px gap) with their labels.

### 5. Gallery `#gallery` (ivory)
Label `--gold-deep`: `מהאירועים שלנו`; h2 `--henna`: `הזוגות שלנו / הכי יפים בעולם.` 72px below, an asymmetric grid on desktop, all wrappers `.rise`, row gap 24px:
| image | aspect | columns | margin-top | alt |
|---|---|---|---|---|
| `couple-close` | 4/5 | 1–5 | 0 | `חתן וכלה צוחקים על במת הטקס` |
| `sweets-round` | 3/4 | 6–9 | 96px | `שולחן מתוקים עגול עם מגדל פירות ומזרקה` |
| `night-couple` | 3/4 | 10–12 | 0 | `זוג מצטלם מול תפאורה מרוקאית בערב` |
| `hall-round` | 3/4 | 1–4 | 0 | `אולם עם שולחן מתוקים עגול, שטיחים ווילונות` |
| `gold-dress` | 3/4 | 5–7 | 64px | `אורחת בשמלת זהב נכנסת אל המבואה` |
| `sweets-gold` | 4/5 | 8–12 | 0 | `מגשי עוגיות מרוקאיות וכלים מוזהבים` |
| `lounge` | 1/1 | 2–6 | 0 | `פינת ישיבה עם וילונות ושולחן מתוקים` |
| `cake` | 3/4 | 8–11 | 80px | `עוגות ומאפים מרוקאיים על מגשים מוזהבים` |
Mobile: CSS multi-column masonry, 2 columns, 12px gap, each image at its listed aspect, no offsets.

### 6. FAQ `#faq` (ivory-2)
Background `--ivory-2`. Desktop: h2 (Bellefair `clamp(36px, 4.6vw, 72px)`, `--henna`) in columns 1–4: `שאלות / לפני שסוגרים.`; list in columns 6–12. `<details>`: 1px `--rule` above each (and under the last); `summary` Heebo 500 20px `--henna`, padding-block 24px, with a `+` at the end that rotates 45° when open; answer body `--ink`, max 60ch, padding-bottom 24px.
1. `מה כלול בהפקה מלאה?` / `תפאורה מפוארת, עמדת טקס, עוגיות ופיצוחים, תלבושות וכניסה חגיגית באפריון.`
2. `אפשר להזמין רק תפאורה?` / `כן. יש חבילות שכוללות רק תפאורה וציוד משלים, ויש גם פינת טקס בלבד.`
3. `איפה אתם מקימים את ההפקה?` / `באולמות, בגני אירועים וגם בטבע. שלחו לנו את המקום, ונגיד מה אפשר לעשות בו.`
4. `כמה זה עולה?` / `זה תלוי בתאריך, במקום ובמה שבוחרים. יש חבילות בכמה רמות תקציב. שלחו הודעה ותקבלו הצעה מסודרת.`
5. `עושים גם הפרשת חלה וכיסא כלה?` / `כן. יש לנו תפאורה קלאסית ואלגנטית להפרשת חלה, לחינה ולכיסא כלה.`

### 7. Contact `#contact` (dark)
Background `--henna`, text `--ivory`. Desktop: text in columns 1–6, vertically centred; the form "door" in columns 8–12.
- Label `--gold`: `יוצאים לדרך`; h2 Bellefair `clamp(48px, 7vw, 112px)`: `מתי החינה / שלכם?`; 24px below, lead (`--ivory` 85%, max 36ch): `שולחים לרוני תאריך ומקום, ומקבלים הצעה מסודרת.`
- 40px below: rows with a 1px gold-30% rule above each (and under the last), padding-block 16px, label (`--gold`) above value (Heebo 400 20px, links): `וואטסאפ וטלפון` / `052-928-2992` · `אינסטגרם` / `@zraret_henna`.
- The door: an ivory form panel shaped like the arch. Build it as two stacked blocks with no gap: a cap (`width:100%; aspect-ratio: 300/184; background: var(--ivory); clip-path: url(#arch-top)`) holding a centred 24px khatam star in `--gold` at mid-height and the form title at its bottom; then a body (`background: var(--ivory); padding: 8px 40px 40px`, 24px side padding on mobile) with the form. Text in the panel is `--ink`.
  - Form title (inside the cap), Bellefair 32px `--henna`, centred: `פרטי האירוע`
  - Fields, label (Heebo 500 14px `--ink-2`) above input; inputs 52px high, `--ivory` bg, 1px `--rule` border (focus: 2px `--gold-deep` outline, offset 2px), Heebo 400 17px. Two per row on desktop, one per row on mobile, 16px gaps:
    - `שם` (text, required, autocomplete name). Error: `נשמח לדעת איך קוראים לכם`.
    - `תאריך האירוע` (type date)
    - `מקום האירוע` (text; placeholder `אולם, גן אירועים, עיר`)
    - `מספר אורחים` (select): `עוד לא יודעים`, `עד 100`, `100 עד 200`, `200 עד 300`, `מעל 300`
  - Submit, full width, `--henna` bg, `--ivory` text: `שלחו לרוני בוואטסאפ`
  - Message template: `היי רוני, כאן {שם}. מתכננים חינה בתאריך {תאריך}, ב{מקום}, {אורחים} אורחים. נשמח להצעה.` Leave out any clause whose field is empty or `עוד לא יודעים`. Format the date as DD.MM.YYYY.
- Mobile: text, rows, then the door at full container width.

### 8. Footer (dark)
`.khatam` band on top. Background `--henna`, padding-block 56px 40px. Start: `ZRARET` (Latin, Bellefair 44px, `--gold`), under it `זררת חינה · הפקת אירועי חינה יוקרתיים` (15px, `--ivory` 75%). End: phone and Instagram as 15px links, 24px gap. Below a 1px gold-30% rule: `© 2026 זררת חינה` (13px, `--ivory` 60%).

### Mobile sticky bar
Fixed bottom, mobile only: `--henna` bg, 1px gold-30% top border, padding 8px 12px plus safe-area inset, two 48px buttons, 8px gap: primary (gold) `וואטסאפ לרוני` (flex 2) and outline `חיוג` (flex 1). Appears after the hero scrolls out; hidden while `#contact` is in view.
