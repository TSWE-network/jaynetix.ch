# Decisions

Newest entries on top.

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
