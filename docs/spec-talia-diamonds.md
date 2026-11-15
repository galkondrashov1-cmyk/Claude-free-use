# Spec: Talia Diamonds (`sites/talia-diamonds`)

Read `docs/BUILD-RULES.md` first. It applies in full.

## The business
Talia Levi designs gold and diamond jewellery to order from the Ramat Gan Diamond Exchange: engagement rings, earrings, tennis bracelets, initial pendants and signet rings. Sales happen by private message and by appointment. Visitors come from Instagram. The one action: message Talia. The objection: "can I trust a small jeweller with a diamond purchase, and is ordering custom complicated?"

## Concept: the certificate
The site reads like a gem certificate and an atelier ledger: ivory paper, espresso ink, hairline rules, and each piece captioned with certificate-style data rows (cut, weight) using only facts Talia published. Layout is editorial and asymmetric with a lot of air. There is exactly one oversized type moment: the English line "She said yes." in section 6. Everything else is quiet.

## Tokens
```
--paper:#F7F3EC  (page bg)        --paper-2:#EEE7DB (alt band bg)
--ink:#2A1C14    (text, dark bg)  --ink-2:#6E5D50   (secondary text)
--rule:#D8CDBE   (hairlines)      --accent:#8A5A3B  (the only accent: Latin labels, numerals, link hover)
```
Fonts (in `fonts.css`): **Frank Ruhl Libre** 300/400/500 (Hebrew display), **Bodoni Moda** 400 regular and italic (Latin only), **Assistant** 300/400/600 (text).
- Hebrew display: Frank Ruhl Libre 300, line-height 1.05, letter-spacing -0.01em, colour `--ink`.
- Latin text always carries `lang="en" dir="ltr"` and `font-family: 'Bodoni Moda', serif`. "Latin label" = Bodoni Moda italic 400, 18px (20px desktop), colour `--accent`.
- Body: Assistant 300, 18px/1.65. Small: Assistant 400 15px. Hebrew label: Assistant 600, 13px, letter-spacing .06em, `--ink-2`.
- Buttons: Assistant 600 15px, letter-spacing .04em, radius 0, height 56px, padding-inline 32px. Primary: `--ink` bg, `--paper` text; hover bg `--accent`. Outline: 1px `--ink` border, transparent; hover `--ink` bg, `--paper` text. Text link: 1px underline, offset 6px; hover colour `--accent`.
- Easing everywhere: `cubic-bezier(.2,.7,.1,1)`.

### Component: certificate rows `.cert`
A `dl` placed under a piece. Each row is a flex line: `dt` (Hebrew label), then a leader (`flex:1`, 1px dotted `--rule` bottom border, margin-inline 10px, raised 5px from the baseline), then `dd` (Assistant 400 15px `--ink`). Row gap 6px.

### Component: piece
`figure`: image wrapper (`.unveil`, given aspect ratio), then 16px gap, piece name (Frank Ruhl Libre 400, 22px), then 10px gap, `.cert` if the spec lists rows, otherwise nothing.

### Signature motion: the unveil
Image wrappers with `.unveil` start at `clip-path: inset(100% 0 0 0)` and animate to `inset(0)` in 1.2s; the `img` inside goes from `scale(1.08)` to `scale(1)` in 1.6s. On hover (desktop, pieces only) the img scales to 1.03 over 1.2s. Nothing else animates. The hero main image does not animate.

## Links
- Message Talia (every CTA): `https://ig.me/m/talia_diamonds_` (new tab)
- Instagram profile: `https://www.instagram.com/talia_diamonds_/`, shown as `@talia_diamonds_`

## Head
- title: `Talia Diamonds | תכשיטי יהלומים בעיצוב אישי, רמת גן`
- description: `טבעות אירוסין, עגילים, צמידי טניס ותליונים בעיצוב אישי. טליה לוי, בורסת היהלומים ברמת גן. לתיאום פגישה שלחו הודעה.`
- theme-color `#F7F3EC`. Favicon: `#2A1C14` square with a `#F7F3EC` serif letter `T`.
- JSON-LD `JewelryStore`: name `Talia Diamonds`, `address.addressLocality` `רמת גן`, `address.addressCountry` `IL`, sameAs the Instagram URL.

## Sections

### 0. Header (sticky)
Height 80px desktop, 64px mobile, `--paper` background, 1px `--rule` bottom border once scrolled 8px. Three zones on desktop:
- Start: nav, Assistant 400 15px, 32px gaps: `קולקציה` #collection, `עיצוב אישי` #custom, `הסיפור` #story.
- Centre (true centre of the viewport): wordmark `TALIA DIAMONDS`, Bodoni Moda 400, 20px, letter-spacing .24em.
- End: text link (Assistant 600 15px) `תיאום פגישה`.
- Mobile: wordmark centred (16px, letter-spacing .2em); at the start a 44px text button `תפריט`. Overlay: `--paper`, links in Frank Ruhl Libre 300 44px stacked with 16px gaps, primary button `הודעה לטליה` full width at the bottom, close button `סגירה`.

### 1. Hero
Desktop: padding-top 56px, padding-bottom 120px. Text in columns 1–6, vertically centred against the main image. Main image in columns 8–12, aspect 4/5. A second, small image (280px square, with a 10px solid `--paper` border) overlaps the main image's bottom-start corner: its end edge sits 72px inside the main image, its bottom edge 56px below the main image's bottom.
- Latin label: `Fine jewelry · Ramat Gan`
- 24px below: **h1**, `clamp(44px, 6.2vw, 96px)`: `תכשיטי יהלומים / בעיצוב אישי, / מלב הבורסה.`
- 28px below: lead (Assistant 300 20px/1.6, max 40ch): `טליה לוי מעצבת טבעות אירוסין, עגילים, צמידים ותליונים בהזמנה אישית, מתוך בורסת היהלומים ברמת גן.`
- 40px below: primary button `לתיאום פגישה עם טליה`, and 28px beside it a text link `לקולקציה ↓` (#collection).
- Main image `bracelet`, object-position center 60%, alt `צמיד טניס יהלומים על פרק יד`. Under it, 14px gap, a `.cert` with one row: `צמיד טניס יהלומים` → `עיצוב קלאסי`.
- Small image `ear-studs`, alt `ארבעה עגילי יהלומים באוזן אחת`. Under it, 12px gap, Bodoni Moda italic 18px `--ink`: `The beauty is in the details.`
- Mobile: label, h1, lead, button full width, text link centred 20px below. Then 48px gap, main image full container width, aspect 4/5; small image 46% of container width overlapping the bottom-start corner by 40px; the cert row and the English line stack under them at the end side.

### 2. Ledger strip
Inside the container: 1px `--rule` top and bottom, padding-block 20px, four Hebrew labels spread with `justify-content: space-between`: `בורסת היהלומים, רמת גן` · `זהב ויהלומים` · `עיצוב אישי` · `פגישות בתיאום מראש`. Mobile: 2×2 grid, 12px row gap.

### 3. Collection `#collection`
Header row (desktop: heading at start, note at end, bottom-aligned): Latin label `The Collection`; h2 `clamp(40px, 5.4vw, 84px)`: `הקולקציה`; note (Assistant 300 17px, max 36ch, `--ink-2`): `כל התכשיטים כאן נעשו בהזמנה. אפשר להזמין דומה, או להתחיל מאפס.`

Three chapters, 120px apart (72px mobile). Chapter head: 1px `--rule` above, 24px padding-top; numeral (Bodoni Moda 400, 20px, `--accent`), Hebrew title (Frank Ruhl Libre 400, `clamp(28px, 3vw, 40px)`), and at the end side a Latin label. 48px below, the pieces on the 12-column grid with the offsets given. Row gap 64px.

**Chapter 01 · `טבעות אירוסין` · Latin `Engagement`**
| image | aspect | columns | margin-top | name | cert rows | alt |
|---|---|---|---|---|---|---|
| `ring-oval` | 5/4 | 1–7 | 0 | `טבעת יהלום אובלית` | `חיתוך` → `אובלי` | `טבעת אירוסין עם יהלום אובלי על מעמד לבן` |
| `ring-marquise` | 4/5 | 9–12 | 96px | `טבעת מרקיזה` | `חיתוך` → `מרקיזה` · `משקל` → `2 קראט` | `טבעת יהלום בחיתוך מרקיזה על יד` |
| `seven-stone` | 1/1 | 2–5 | 0 | `טבעת שבע אבנים` | none | `טבעת שבע אבנים מוחזקת בין אצבעות` |
| `ring-heart` | 1/1 | 7–10 | 80px | `טבעת יהלום בחיתוך לב` | `חיתוך` → `לב` | `טבעת עם יהלום בצורת לב על נייר לבן` |

**Chapter 02 · `עגילים וצמידים` · Latin `Earrings & Bracelets`**
| image | aspect | columns | margin-top | name | cert rows | alt |
|---|---|---|---|---|---|---|
| `bursa-earrings` | 3/4, position center 35% | 1–4 | 0 | `עגילי יהלומים` | none | `זוג עגילי יהלומים מול חלון עם נוף עירוני` |
| `hands` | 1/1 | 6–9 | 96px | `צמידים וטבעת, על היד` | none | `שתי ידיים עם צמידים וטבעת יהלום` |
| `earrings-box` | 4/5 | 10–12 | 0 | `עגילי חישוק עם יהלום` | none | `עגילי זהב עם יהלום תלוי בקופסה לבנה` |

**Chapter 03 · `אותיות וחותם` · Latin `Personal`**
| image | aspect | columns | margin-top | name | cert rows | alt |
|---|---|---|---|---|---|---|
| `signet-portrait` | 3/4, position center 55% | 1–4 | 0 | `טבעת חותם עם האות שלכם` | `אבן` → `חיתוך פורטרט` | `טבעת חותם עם אבן שקופה בקופסה` |
| `signet-yk` | 1/1 | 5–8 | 80px | `טבעת ראשי תיבות` | none | `טבעת עם ראשי תיבות משובצים` |
| `pendant-y` | 1/1 | 9–12 | 0 | `תליון אות משובץ יהלומים` | none | `תליון בצורת האות Y משובץ יהלומים` |
| `necklace-box` | 6/7 | 3–7 | 0 | `תליון בעיצוב אישי` | none | `שרשרת עם תליון בקופסת תכשיטים מוארת` |

After the last chapter, 96px gap, centred: outline button `לשאול על תכשיט מהקולקציה`.

Mobile: each chapter is a 2-column grid, 12px column gap, 40px row gap, no margin-top offsets. The first piece of each chapter spans both columns; the rest take one column each. Piece name 18px on mobile.

### 4. Story `#story` (full-bleed band)
Background `--paper-2`. Desktop: image in columns 1–4, text in columns 6–10, a small inset image in columns 11–12 aligned to the bottom of the text block.
- Image `bursa-stones`, aspect 3/4, max-width 440px, `.unveil`, alt `יהלומים מוחזקים מול חלון עם נוף מתחם הבורסה ברמת גן`.
- Latin label `Ramat Gan Diamond Exchange`; h2 `clamp(36px, 4.6vw, 72px)`: `האבנים נבחרות בבורסה, / אחת אחת.`; 28px below, body (Assistant 300 19px, max 44ch): `טליה עובדת מתוך בורסת היהלומים ברמת גן. כל אבן נבחרת שם ביד, מול האור, לפני שהיא הופכת לתכשיט.`
- Inset `tweezers`, aspect 3/4, width 200px max, `.unveil`, alt `יהלום מרקיזה מוחזק בפינצטה`.
- Mobile: label, h2, body, then the two images side by side (main 62%, inset 34%, bottom-aligned).

### 5. Custom process `#custom`
Background `--paper`. Desktop: steps in columns 1–7; a figure in columns 9–12, `position: sticky; top: 120px`.
- Latin label `Made to order`; h2 `clamp(40px, 5.4vw, 84px)`: `עיצוב אישי, / שלב אחרי שלב.`
- 56px below, four steps. Each: 1px `--rule` above, padding-block 32px, a two-column grid: numeral (Bodoni Moda 400, 56px, `--accent`, fixed 104px column), then title (Frank Ruhl Libre 400 28px) and 10px below it text (body, max 46ch, `--ink-2`). A rule also under the last step.
  1. `01` `שיחה` / `מספרים לטליה מה מדמיינים: האירוע, הסגנון, התקציב. בהודעה, או בפגישה בבורסה.`
  2. `02` `אבן` / `בוחרים יחד את היהלום: חיתוך, גודל וצבע. רואים את האבן בעיניים לפני שמחליטים.`
  3. `03` `עיצוב` / `טליה מתאימה את השיבוץ, הזהב והפרטים. אפשר לשלב אות, תאריך או אבן מיוחדת.`
  4. `04` `התכשיט` / `התכשיט מיוצר בהזמנה ונמסר לכם ארוז, מוכן לרגע שלו.`
- Figure: `certificate`, aspect 4/5, `.unveil`, alt `טבעת יהלום בקופסה לצד תעודה גמולוגית`. Under it `.cert` with one row: `תעודה` → `גמולוגית, מצורפת לאבן`.
- Mobile: label, h2, steps (numeral column 64px, numeral 40px), then the figure at 72% width aligned to the end.

### 6. Moments (full-bleed dark; the one oversized moment)
Background `--ink`, text `--paper`. Padding-block `clamp(96px, 13vw, 200px)`.
- Centred across the container: `She said yes.` Bodoni Moda italic 400, `clamp(60px, 12.5vw, 208px)`, line-height .95, `--paper`, `white-space: nowrap`. It must fit the container at every width; lower the vw factor if needed.
- 72px below, desktop grid: `said-yes` in columns 2–6 (aspect 3/4, `.unveil`, alt `ידיים משולבות עם טבעת אירוסין, ברקע ים המלח`). `forever` in columns 8–11 with margin-top 120px (aspect 1/1, `.unveil`, alt `יד עם טבעת אירוסין מול הכותל המערבי`). Above `forever`, 16px gap, a Latin label in `--paper`: `Forever`.
- Under `forever`, 40px gap, aligned to its start edge: Frank Ruhl Libre 300 `clamp(24px, 2.6vw, 36px)`, `--paper`, max 18ch: `שמחנו לקחת חלק קטן ברגע כל כך גדול.` Then 32px below a button with `--paper` bg and `--ink` text (hover `--accent` bg, `--paper` text): `מתכננים הצעה? דברו עם טליה`.
- Mobile: the English line, `said-yes` at 78% width at the start, `forever` at 60% width at the end pulled up 48px to overlap, then the Hebrew line and the button (full width).

### 7. About
Background `--paper`. Desktop: text in columns 1–6, vertically centred; image in columns 8–11.
- Latin label `Talia Levi`; h2 `clamp(36px, 4.6vw, 72px)`: `יוקרה שמתחילה / בפרטים הקטנים.`; 28px below, body max 44ch: `טליה לוי מעצבת תכשיטי זהב ויהלומים בהתאמה אישית. כל תכשיט מתחיל בשיחה אחת, ונגמר בפרט הכי קטן.`
- Image `pendant-hand`, aspect 3/4, object-position center 45%, `.unveil`, alt `יד מחזיקה תליון אות משובץ יהלומים`.
- Mobile: text first, image at 72% width at the end.

### 8. Contact `#contact` (full-bleed band)
Background `--paper-2`. Content centred in a 760px column, text centred (allowed here).
- Latin label `By appointment`; h2 `clamp(40px, 6vw, 88px)`: `נעים להכיר. / נתחיל בהודעה.`; 40px below, primary button `הודעה לטליה באינסטגרם`.
- 72px below: three columns separated by 1px `--rule` vertical lines, with a 1px rule above and below the group, padding-block 24px. Each: Hebrew label, 8px gap, value (Assistant 400 17px): `אינסטגרם` / `@talia_diamonds_` (link) · `סטודיו` / `בורסת היהלומים, רמת גן` · `פגישות` / `בתיאום מראש`. Mobile: stacked rows with horizontal rules.

### 9. Footer
Background `--ink`, text `--paper`, padding-block 72px 40px. Centred wordmark `TALIA DIAMONDS`, Bodoni Moda 400, `clamp(28px, 6.4vw, 104px)`, letter-spacing .12em, `white-space: nowrap`, must fit the container. 40px below, a 1px rule (paper at 20%), then a row (stacked on mobile) of Assistant 400 14px at 70% opacity: `© 2026 Talia Diamonds` at the start, `fine jewelry` (Latin, italic Bodoni) in the centre, Instagram link `@talia_diamonds_` at the end.

### Mobile sticky bar
Fixed bottom, mobile only: `--paper` bg, 1px `--rule` top border, padding 8px 12px plus safe-area inset, one primary button 48px full width: `הודעה לטליה`. Appears after the hero scrolls out; hidden while `#contact` is in view.
