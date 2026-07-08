# Decisions

Newest entries on top.

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
