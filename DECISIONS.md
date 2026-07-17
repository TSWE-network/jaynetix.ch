# Decisions

Newest entries on top.

## 2026-07-17 — Taste pass + original collection assets + fal.ai promo clip & scroll-driven growth scene

**Type:** design / feature

**Before:** The skewed marquee band used negative top AND bottom margins, so
its tilted edge cut into the left trust box below the hero. The categories
grid was four equal tiles with remote 600px thumbnails as backgrounds; every
section carried an uppercase eyebrow label; product cards stacked pill-tag +
name + description; the pinned "Premium CBD Made in Basel" statement section
was empty text on black. No favicon. Logo loaded from the WordPress CDN.

**After:** (1) Marquee keeps its top bleed into the hero but no longer
overlaps downward; the trust strip reserves `calc(2.4vw + 1.1rem)` top
padding (the skew dips ~2.3vw below its layout box), so the band floats over
dark padding, never over content. (2) Categories rebuilt like the original
jaynetix.ch second section using the ORIGINAL collection images (scraped from
the Breakdance post-89 CSS: yummy-cbd-bluten, yummy-hash, joints.png) plus a
tall promo card for the Sensual Feeling massage oil with a 5s cinematic
Kling 2.5 clip (fal.ai, image-to-video from the original product banner
cropped 4:5; ~750KB 720p H.264, plays only while in view, poster fallback,
paused under reduced motion). (3) Statement section is now a 440vh pinned
scroll scene: 121 webp frames (two 5s Kling 2.5 clips chained via
tail_image_url between three Nano Banana 2 keyframes: seedling → vegetative →
flowering, consistent soil mound + spotlight + golden bokeh) scrubbed on a
canvas by scroll position, with three infographic stage cards (Keimung /
Wachstum / Blüte) and a progress hairline; static fallback (K3 still +
stacked cards) for no-JS/reduced-motion. (4) Taste pass: eyebrows trimmed to
hero + growth intro only, product cards simplified (small category text, no
desc pill), visible em/en-dashes removed, "In den Warenkorb" nowrap, favicon
added, logo/category images served locally from assets/.

**Why:** Jay asked to fix the cut banner box, apply the taste skill, mirror
the original site's collection section with a promo card, and build a
scroll-driven seed-to-plant scene with fal.ai assets ("mysterious mood,
strong focus light, big round bokeh").

**Why written this way:** Frame-sequence canvas scrub instead of
video.currentTime seeking because keyframe-seek jank makes scroll scrubbing
stutter; 12fps × 960px webp keeps the whole sequence at 4.3MB and loads
lazily via IntersectionObserver (rootMargin 150%) with the three stage
keyframes as instant placeholders. Kling clips were generated
keyframe-to-keyframe (tail_image_url) so the two clips join without a visual
jump. The surreal "hash castle" tile image was kept because it IS the
original live-site collection image (dimmed harder via .cat-hash). Raw Kling
mp4s intentionally not committed; only derived frames + compressed promo mp4.

**Revisit:** If the growth section feels too long on mobile, lower the 380vh/
340vh heights; if Woo product names change, FALLBACK_PRODUCTS needs re-sync.

## 2026-07-17 — Relocated to projects/; websites/ keeps only the live-site placeholder

**Type:** taxonomy / cleanup

**Before:** This repo lived at `~/ai-workspace/websites/jaynetix.ch` and
carried a `website.json`, so the in-progress redesign showed on Mission
Control's **Websites** page as if it were the production site.

**After:** Repo moved to `~/ai-workspace/projects/jaynetixch` with a
`project.json` (name, status, url, repo) so it appears on the **Projects**
page with its deploy URL. `website.json` removed from this repo.
`~/ai-workspace/websites/jaynetix.ch` was recreated as a plain placeholder
(website.json + placeholder index.html) describing only the live WordPress
site at www.jaynetix.ch — no reference to this project.

**Why:** Jay's folder taxonomy: `projects/` = active work, `websites/` =
live production domains. A project is promoted to `websites/` only when
finished, and must never be cross-linked into another entity's folder.
This repo in `websites/` violated that and put the card on the wrong page.

**Why written this way:** Physical move (not a link) keeps each folder
self-describing; `.vercel/` moved with the repo so deploys keep targeting
the same Vercel project (jaynetixch.vercel.app) from the new path.

## 2026-07-09 — Real-bud product images for flower bags + duplicate fix + snapshot sync

**Type:** content / catalogue

**Before:** The four Indoor CBD Blüten SKUs (Genetics 00/01/03/04) were sold
in printed mylar bags whose photos showed only the bag artwork — no actual
flower. Product 60 was mislabelled "Genetics 00 6g" (duplicate of 46; its
bag/image is Genetics 01) and product 61's name carried a leftover "(Copy)"
suffix. The static homepage `FALLBACK_PRODUCTS` snapshot mirrored the old
bag images and the wrong name.

**After:** Each flower bag now has a composite featured image = a different
photorealistic CBD bud (fal.ai Nano Banana Pro → rembg cutout → PIL composite
with contact shadow + floor reflection) placed in front of the pristine bag.
The original bag shot is retained as the 2nd gallery image. WooCommerce media
ids: 361 (G03), 362 (G00), 363 (G01), 364 (G04). Product 60 renamed to
"Genetics 01 6g"; product 61's "(Copy)" removed. `FALLBACK_PRODUCTS`
re-synced from the live Store API (new `2026/07/jaynetix-genetics-0X-buds`
thumbnails + corrected names).

**Why:** The bags conveyed no product; buyers couldn't see the flower they
were buying. The duplicate/(Copy) names were data errors from product cloning.

**Why written this way:** Buds were composited onto the ORIGINAL bags (never
regenerated) specifically to preserve the mandatory Swiss legal text —
THC/CBD %, "ohne Tabak", company address, quit-smoking hotlines — which an
AI full-image edit corrupted in testing. Joints/oil/pollen SKUs were left
untouched (they already show their product form).

## 2026-07-08 — Confirmed as canonical Jaynetix ecom site; duplicate archived

**Type:** cleanup

**Before:** Two disconnected folders held Jaynetix ecom work — this repo
(git-tracked, Vercel-linked, live WooCommerce sync) and
`~/ai-workspace/projects/jaynetix-ecom/` (static mockup, no git, no deploy,
built independently because Mission Control's Entity Chat had no memory
wiring between per-folder chat sessions — a later session in that folder had
no way to know this site already existed and was live).

**After:** This repo is confirmed canonical — live at
https://jaynetixch.vercel.app. The other folder is archived at
`~/ai-workspace/projects/.archive/jaynetix-ecom-superseded-2026-07-08/`
(kept, not deleted, in case an asset is worth salvaging).

**Why:** This repo has real git history, a live Vercel deployment, and an
`api/products.js` proxy wired to the actual WooCommerce store — the other
folder was static placeholder content that was never deployed from itself.

**Why written this way:** The root cause (Entity Chat's missing memory
wiring) was fixed separately in `agent-os/mission-control/src/web/routes/entity-chat.ts`,
so this shouldn't recur for other projects.
