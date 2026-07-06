// Vercel serverless proxy for the Jaynetix WooCommerce Store API.
// The store sends no CORS header, so the browser can't fetch it cross-origin
// from the Vercel domain. This fetches it server-side and re-serves it with
// permissive CORS + edge caching, so the homepage's live catalogue works
// everywhere it's hosted.
const UPSTREAM = "https://jaynetix.ch/?rest_route=/wc/store/v1/products&per_page=12&orderby=date&order=desc";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const r = await fetch(UPSTREAM, { headers: { "Accept": "application/json" } });
    if (!r.ok) {
      res.status(502).json({ error: "upstream_error", status: r.status });
      return;
    }
    const data = await r.json();
    // Cache at the edge for 5 min, serve stale while revalidating for 10 more.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: "fetch_failed", message: String((e && e.message) || e) });
  }
}
