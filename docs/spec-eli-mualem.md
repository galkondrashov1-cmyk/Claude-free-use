# Spec: עבודה עברית, אלי מועלם (`sites/eli-mualem`)

Read `docs/BUILD-RULES.md` first. It applies in full.

## The business
Renovation and building contractor. Brand name **עבודה עברית**, run by **אלי מועלם**. Homes and businesses, nationwide. Visitors come from Instagram and referrals. The one action: send Eli a WhatsApp message. The objection the page answers: "can I trust this contractor with my money, my schedule and my home?"

## Concept: the working drawing
The page looks like a contractor's working drawing: plaster-white paper, ink, and one blue (the Israeli flag blue, because the brand promise is "כחול לבן"). The recurring device is the **dimension line** from architectural drawings: a thin blue line with end ticks and a small label. Proof comes first: real before/after pairs straight under the hero.

## Tokens
```
--plaster:#F3F0E9  (page bg)      --plaster-2:#E9E5DB (alt band bg)
--ink:#0E1114      (text, dark bg) --ink-2:#4A4F57    (secondary text)
--line:#D6D1C6     (hairlines)     --blue:#0038B8     (the only accent)
--blue-light:#7FA2FF (accent on --ink backgrounds only)  --white:#FFFFFF (on --blue only)
```
Fonts (already in `fonts.css`): display **Karantina** 700 (also 400), text **IBM Plex Sans Hebrew** 400/500/600.
- Display (Karantina 700): letter-spacing 0, line-height 0.86. Never wrap a word; headings break only where the spec shows `/`.
- Body: 17px/1.6, weight 400, colour `--ink`. Lead: 20px/1.55. Small: 15px/1.5.
- Label: IBM Plex 500, 12px, letter-spacing .04em.
- Buttons: IBM Plex 600 16px, radius 0, padding-inline 28px. Primary: `--blue` bg, white text, hover bg `--ink`. Secondary: 1px `--ink` border, transparent, hover bg `--ink` text `--plaster`. Heights: 56px (hero, contact), 44px (header).
- Easing everywhere: `cubic-bezier(.16,1,.3,1)`.

### Component: dimension line `.dim`
A horizontal 1px `--blue` line, full width of its parent, with a 9px-tall 1px tick at each end (centred vertically on the line). Optional label: sits on the line, 24px in from the start, label style, colour `--blue`, background = the section background, padding-inline 8px. On `--ink` sections use `--blue-light`; on `--blue` sections use white.

### Signature motion: the wipe
Image wrappers with `.wipe` start at `clip-path: inset(0 0 0 100%)` (physical values: nothing visible, anchored at the right edge) and animate to `inset(0)` in 0.9s, so the picture is drawn from right to left like a trowel pass. `.dim` lines start at `transform: scaleX(0)` with `transform-origin: right` and draw in 0.7s. Second image of a pair is delayed 120ms. Nothing else animates. The hero image does not animate.

## Links
- WhatsApp (all CTA buttons): `https://wa.me/message/GBZJHR5WCKHVM1`
- WhatsApp for the form (prefilled text): number `972547749280`
- Phone: `tel:+972547749280`, shown as `054-774-9280`
- Email: `eli.mualem.business@gmail.com`
- Instagram: `https://www.instagram.com/eli_mualem_/`, shown as `@eli_mualem_`

## Head
- title: `עבודה עברית | שיפוצים ובנייה, אלי מועלם`
- description: `אלי מועלם והצוות: שיפוץ מהיסוד, עבודות גמר, טיפול ברטיבות ותחזוקת מבנים לעסקים. עבודה עברית, בכל הארץ. שלחו הודעה בוואטסאפ: 054-774-9280.`
- theme-color `#F3F0E9`. Favicon: `#0038B8` square, white bold letter `ע` centred.
- JSON-LD `GeneralContractor`: name `עבודה עברית, אלי מועלם`, telephone `+972-54-774-9280`, email, areaServed `IL`, sameAs the Instagram URL.

## Sections

### 0. Header (sticky)
Height 72px desktop, 60px mobile. Background `--plaster`; a 1px `--line` bottom border appears once the page has scrolled 8px.
- Start: wordmark `עבודה עברית` (Karantina 700, 34px, `--ink`), and beside it on desktop only, separated by a 1px × 20px `--line` rule with 12px gaps: `שיפוצים ובנייה · אלי מועלם` (label style, `--ink-2`).
- Middle (desktop only): nav, 15px weight 500, 32px gaps: `פרויקטים` #projects, `שירותים` #services, `לעסקים` #business, `לקוחות` #customers, `צור קשר` #contact. Hover: colour `--blue`.
- End (desktop): phone as text link (weight 600, 16px) then primary button 44px `וואטסאפ לאלי`.
- Mobile: wordmark at start; at end a 44px text button `תפריט`. It opens a full-screen `--plaster` overlay: nav links stacked in Karantina 700 56px, then phone and the WhatsApp button (56px, full width) pinned to the bottom. Close button text `סגירה`.

### 1. Hero
Desktop: grid inside a full-bleed section. `min-height: clamp(640px, calc(100svh - 72px), 900px)`. Text block in columns 1–7, vertically centred, with 48px top/bottom padding. Image fills columns 8–12 **and bleeds to the end edge of the viewport**, full height of the hero, no top gap.
- `.dim` with label `קבלן שיפוצים ובנייה · כל הארץ`, width = text column.
- 24px below: **h1**, Karantina 700, two lines, each `display:block; white-space:nowrap`: line 1 `שיפוצים ובנייה.` in `--ink`, line 2 `עבודה עברית.` in `--blue`. Font-size `clamp(64px, 11vw, 168px)`. Measure in the browser: at 1440 the longer line must fit the text column with at least 24px to spare; lower the vw factor if it does not. On mobile set the size in `vw` so the longer line spans 92–100% of the container width.
- 24px below: lead paragraph, max-width 46ch: `אלי מועלם והצוות עושים את כל השיפוץ, מהיסוד ועד הגימור. לבתים ולעסקים, בכל הארץ, בלי כאב ראש ובלי הפתעות.`
- 32px below: primary button 56px `שלחו הודעה לאלי בוואטסאפ`, and 24px beside it a text link (weight 500, underline offset 4px): `או חייגו 054-774-9280`.
- 48px below: proof row. A 1px `--line` top border, 20px padding-top, three items in a row separated by 1px `--line` vertical rules with 24px padding. Each item: label in `--blue`, then 15px weight 500 text below it.
  1. `לקוח עסקי` / `רולדין, תחזוקת מבנה החנות`
  2. `פרויקט מסחרי` / `חלל ריק שהפך למשרדים בחודשיים`
  3. `אזור עבודה` / `כל הארץ`
- Image: `hero-beams`, `object-position: center 22%`. alt `סלון אחרי שיפוץ: תקרה לבנה עם קורות עץ כהות`. At its bottom-start corner, inset 16px, a tag: `--plaster` bg, label style `--ink`, padding 8px 12px: `אחרי שיפוץ: תקרת קורות עץ, בית פרטי`.
- Mobile order: dim, h1, lead, button (full width), phone link (centred under button, 16px gap), image (full-bleed, aspect 4/5, 40px above), proof row stacked as three rows with horizontal rules.

### 2. Before / after `#projects`
Background `--plaster`.
- `.dim` label `01 · פרויקטים`.
- h2 Karantina 700 `clamp(56px, 9vw, 136px)`: `לפני. אחרי.` (the word `אחרי.` in `--blue`).
- Lead, max 52ch, 16px below: `שלושה פרויקטים שצילמנו בעצמנו: לפני שנכנסנו, ואחרי שסיימנו.`
- Then three project rows, 96px apart (56px mobile). Desktop row: image pair spans 7 columns, details span 4 columns, 1 empty column between. Rows 1 and 3: pair at start, details at end. Row 2: mirrored. Details are vertically centred against the pair.
- Pair: two wrappers side by side, 8px gap, each `aspect-ratio: 3/4`, `.wipe`. Tag at top-start, inset 12px, IBM Plex 600 13px, padding 6px 10px: first image `לפני` (`--ink` bg, `--plaster` text), second `אחרי` (`--blue` bg, white text). In DOM and visually the "before" image is at the start.
- Under the pair, 16px gap: `.dim` with the caption label given below.
- Details: label `פרויקט 01` (`--blue`), h3 Karantina 700 `clamp(36px, 4vw, 56px)` `--ink`, then a `dl` with a 1px `--line` rule above each row, 14px vertical padding, `dt` label style `--ink-2` in a fixed 96px column, `dd` 16px/1.5.
- Mobile: pair stays two-up (full container width), then dim, then details.

| # | title | before image / alt | after image / alt | dim caption | dl rows |
|---|---|---|---|---|---|
| 01 | `בית פרטי, שיפוץ מהיסוד` | `bath-before` / `חדר רחצה מפורק עד השלד לפני השיפוץ` | `vanity` / `אותו חדר רחצה אחרי: ארון עץ, כיור מונח וריצוף מצויר` | `אותו חדר. אותו חלון.` | `סוג העבודה` → `שיפוץ מהיסוד` · `מה עשינו` → `רצפות, אינסטלציה, חדרי רחצה ומקלחות חדשים` |
| 02 | `מחלל ריק למשרדים` | `office-before` / `אולם תעשייתי ריק עם שלד מחיצות גבס` | `office-after` / `מסדרון משרדים גמור עם פרקט ותאורה` | `אותו חלל. חודשיים עבודה.` | `סוג העבודה` → `בנייה פנימית לעסק` · `מה עשינו` → `מחיצות וקונסטרוקציה, חשמל, מיזוג, שפכטל וצבע, פרקט ודלתות` · `משך` → `כחודשיים` |
| 03 | `רטיבות בתקרת האמבטיה` | `damp-before` / `כתמי רטיבות בתקרת אמבטיה` | `damp-after` / `אותה תקרה אחרי הטיפול, נקייה וצבועה` | `אותה תקרה. ארבעה ימים.` | `סוג העבודה` → `טיפול ברטיבות` · `מה עשינו` → `קילוף עד היסוד, איטום וגימור חדש` · `משך` → `4 ימים` |

Object positions: `bath-before` center 40%; `vanity` center 55%; `office-before` center; `office-after` center 45%; `damp-before` center 35%; `damp-after` center 30%.

### 3. Services `#services`
Background `--plaster`. `.dim` label `02 · שירותים`. h2 (same size as section 2): `מה אנחנו עושים.`
A list styled as a bill of quantities. Each row: 1px `--line` rule on top (and under the last row), padding-block 32px (24px mobile). Desktop grid: number in column 1, title in columns 2–6, description in columns 7–12, baseline-aligned to the title's first line. Mobile: number and title on one line, description below.
- Number: IBM Plex 500, 14px, `--blue` (`01`…`05`).
- Title: Karantina 700, `clamp(40px, 5.2vw, 76px)`, line-height .9. On row hover the title turns `--blue` (0.25s).
- Description: 17px, `--ink-2`, max 48ch.

1. `שיפוץ מהיסוד` / `תכנון, ביצוע וגמר, עם ליווי אישי לאורך כל הדרך. לדירות, לבתים פרטיים ולנכסים שצריכים התחלה חדשה.`
2. `עבודות גמר` / `חשמל, אינסטלציה, גבס, שפכטל, צבע וריצוף. גם כעבודה נפרדת, בלי שיפוץ מלא.`
3. `נזילות ורטיבות` / `מאתרים את המקור, מקלפים עד היסוד, אוטמים וסוגרים בגימור נקי. לא מכסים בצבע.`
4. `בנייה ושיפוץ לעסקים` / `משרדים, חנויות וחללים מסחריים: מחיצות, קונסטרוקציה, חשמל, מיזוג, ריצוף ודלתות.`
5. `תחזוקת מבנים` / `גינון, ניקיון, חשמל ציבורי, הכנת הגג לחורף והתנהלות מול הרשויות. הכול אצל גורם אחד.`

### 4. For businesses `#business` (dark)
Full-bleed `--ink` background, text `--plaster`. Desktop: image in columns 1–4, text in columns 6–12.
- Image: `roladin`, wrapper aspect 15/16, `.wipe`, max-width 420px. alt `חזית חנות רולדין`. Below it a label in `--blue-light`: `רולדין · תחזוקת מבנה`.
- `.dim` (blue-light) label `03 · לעסקים`.
- h2 Karantina 700 `clamp(48px, 7vw, 112px)`: `גם רולדין בחרו / בעבודה עברית.`
- Lead, max 50ch, colour `--plaster` at 85% opacity: `אנחנו מתחזקים את מבנה החנות של רולדין: גופי תאורה, סתימות, ברזים, ריצוף ושקעי חשמל. כל בעיה או בקשה, בכל שעה.`
- 48px below: h3 IBM Plex 600 18px: `מה כולל חוזה תחזוקה לעסק`. Then a list in two columns on desktop (one on mobile), each item 16px with a 16px × 1px `--blue-light` line before it (12px gap), 12px row gap:
  `גינון שוטף` · `ניקיון יסודי` · `חשמל ציבורי ובדיקה חודשית של ארונות החשמל` · `טיפול בגג לפני החורף` · `התנהלות מול רשויות ובעלי נכסים`
- 40px below: primary button 56px `דברו עם אלי על תחזוקה לעסק`. Hover on dark: bg `--plaster`, text `--ink`.
- Mobile: dim, h2, lead, image (max-width 100%, aspect 15/16), list, button.

### 5. Process
Background `--plaster`. `.dim` label `04 · איך זה עובד`. h2: `ארבעה שלבים. / בלי הפתעות.`
Desktop: one 1px `--ink` horizontal line across the container; four steps, each 3 columns; at the start edge of every step a 12px tick rises from the line. Below the line, per step: number (Karantina 700, 72px, `--blue`), h3 (IBM Plex 600 20px), text (16px `--ink-2`, max 26ch). Mobile: the line runs vertically at the start edge, ticks point toward the end, steps are stacked with 32px gaps and 24px padding-inline-start.
1. `שיחה וביקור` / `מספרים לאלי מה צריך בוואטסאפ או בטלפון, ומתאמים ביקור במקום.`
2. `הצעת מחיר` / `הצעה מפורטת וברורה לפני שמתחילים. שקיפות מלאה, מחירים הוגנים.`
3. `ביצוע` / `הצוות שלנו בשטח, ואלי מלווה אתכם אישית לאורך כל העבודה.`
4. `מסירה` / `עוברים יחד על כל פרט, עד גימור מושלם.`

### 6. Craft band (full-bleed, breaks the grid)
Background `--plaster-2`. Desktop: statement in columns 1–5, `position: sticky; top: 120px` while the collage scrolls beside it. Collage in columns 6–12 as two columns of images (24px gap); the second column starts 96px lower than the first.
- Statement: h2 Karantina 700 `clamp(56px, 8.5vw, 136px)`: `עבודה / שעושים / באהבה. / ובאחריות.` Last line in `--blue`.
- Column A: `team-shirt` (aspect 3/4, object-position center 30%, alt `איש צוות בחולצת עבודה עברית מתקין תשתית בתקרה`), caption `הצוות בשטח`; then `hallway` (aspect 4/5, alt `מסדרון בבית פרטי אחרי שיפוץ`), caption `אחרי: מסדרון בבית פרטי`.
- Column B: `craft-plaster` (aspect 3/4, alt `יד מורחת שפכטל על קיר`), caption `שפכטל, שכבה אחרי שכבה`; then `trowel` (aspect 1/1, object-position center 60%, alt `ידיים מחזיקות מלג׳ ומגש טיח`), caption `כלים של בעלי מקצוע`.
- Captions: label style, `--ink-2`, 8px under the image; 32px between an image block and the next. All four wrappers `.wipe`.
- Mobile: statement first (not sticky), then the two columns side by side (12px gap, second column offset 40px).

### 7. Customers `#customers`
Background `--plaster`. `.dim` label `05 · לקוחות`. Desktop: quote in columns 1–6, two video cards side by side in columns 8–12.
- Quote: Karantina 700 `clamp(44px, 6vw, 96px)`: `בעבודה עברית רואים גם את מה שלא בעין.` Below, 15px `--ink-2`, max 40ch: `כך כתבנו אחרי ההמלצה שצילמה לנו מיטי, לקוחה לקוית ראייה. בשבילה זה היה שיפוץ. בשבילנו זו שליחות.`
- Video card = one `<a target="_blank" rel="noopener">`: poster wrapper aspect 4/5 `.wipe`, with a 56px `--blue` circle (radius 50% allowed here) centred, containing a white CSS triangle pointing left-to-right; under the poster 12px gap: 15px weight 500 text, then label `צפו בהמלצה באינסטגרם` in `--blue` with underline on hover.
  1. poster `testimonial-miti` (alt `מיטי, לקוחה, מצולמת במרפסת ביתה`), href `https://www.instagram.com/reel/DKreQvEMrpu/`, text `מיטי מספרת על השירות, הסבלנות וההתחשבות בכל פרט.`
  2. poster `testimonial-kitchen` (alt `לקוחה במטבח המשופץ שלה`), href `https://www.instagram.com/reel/DdRNa7LMDyl/`, text `לקוחה מספרת מהמטבח החדש. בסוף הסרטון רואים את כל המהפך.`
- Mobile: quote, then cards two-up.

### 8. FAQ
Background `--plaster`. Desktop: h2 in columns 1–4 (Karantina 700 `clamp(48px, 6vw, 96px)`: `שאלות / שחוזרות.`), list in columns 6–12. Each `<details>`: 1px `--line` rule on top (and under the last), `summary` 20px weight 600 with padding-block 24px and a `+` at the end side that rotates 45° when open (0.25s); answer 17px `--ink-2`, max 60ch, padding-bottom 24px.
1. `באילו אזורים אתם עובדים?` / `בכל הארץ. שלחו הודעה עם המיקום וסוג העבודה, ואלי יחזור אליכם.`
2. `אתם לוקחים גם עבודות קטנות?` / `כן. מתיקון נזילה או צביעה ועד שיפוץ מהיסוד.`
3. `איך יודעים כמה זה יעלה?` / `מקבלים הצעת מחיר מפורטת וברורה לפני שמתחילים. שקיפות מלאה ומחירים הוגנים, בלי הפתעות באמצע.`
4. `מי מבצע את העבודה בפועל?` / `הצוות של עבודה עברית, בהנהלת אלי מועלם. אלי מלווה כל פרויקט אישית.`
5. `אתם עובדים גם עם עסקים?` / `כן. בנייה ושיפוץ של משרדים וחנויות, וגם חוזי תחזוקה שוטפת למבנים מסחריים.`

### 9. Contact `#contact` (full-bleed blue)
Background `--blue`, all text white. `.dim` (white) label `06 · צור קשר`.
- h2 Karantina 700 `clamp(72px, 12vw, 200px)`: `יש שיפוץ? / דברו עם אלי.`
- Desktop: two columns under the heading, 64px gap. Start (columns 1–5): button 56px white bg / `--blue` text `שלחו הודעה בוואטסאפ` (hover: `--ink` bg, white text); then rows with a 1px white-at-30% rule above each, padding-block 16px, label (white at 70%) above value (20px weight 500): `טלפון` / `054-774-9280` · `מייל` / `eli.mualem.business@gmail.com` · `אינסטגרם` / `@eli_mualem_`. All values are links.
- End (columns 7–12): form titled (h3 IBM Plex 600 20px) `בקשה מהירה`, sub-line 15px white at 80%: `ממלאים שלושה פרטים, והוואטסאפ נפתח עם ההודעה מוכנה.` Fields (label 14px above; inputs 52px high, transparent bg, 1px white border, white text 17px, padding-inline 16px; focus: 2px white outline offset 3px):
  - `שם` (text, required, autocomplete name). Error: `נשמח לדעת איך קוראים לכם`.
  - `מה צריך לעשות?` (select): `שיפוץ מהיסוד`, `עבודות גמר`, `נזילה או רטיבות`, `בנייה או שיפוץ לעסק`, `תחזוקה שוטפת לעסק`, `משהו אחר`. Select options must be readable (dark text on white in the dropdown).
  - `עיר` (text, autocomplete address-level2).
  - Submit: 56px, white bg, `--blue` text, full width: `פתחו וואטסאפ עם ההודעה`.
  - Message template: `היי אלי, כאן {שם}. צריך: {סוג}. עיר: {עיר}. הגעתי מהאתר.` (omit the city sentence when empty).
- Mobile: heading, button, rows, form.

### 10. Footer
Background `--ink`, text `--plaster`. One row on desktop: wordmark `עבודה עברית` (Karantina 700 40px) with `שיפוצים ובנייה בהנהלת אלי מועלם` under it (15px, 70% opacity); at the end the phone, email and Instagram as 15px links in a row with 24px gaps. Below, a 1px rule (plaster at 15%) and a 13px line at 60% opacity: `© 2026 עבודה עברית. כל הזכויות שמורות.` Padding-block 48px.

### Mobile sticky bar
Fixed to the bottom, mobile only: `--plaster` bg, 1px `--line` top border, padding 8px 12px (plus `env(safe-area-inset-bottom)`), two 48px buttons with an 8px gap: primary `וואטסאפ לאלי` (flex 2) and secondary `חיוג` (flex 1). Appears after the hero has scrolled out; hidden while `#contact` is in view.
