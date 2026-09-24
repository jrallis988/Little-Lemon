/**
 * Edge worker stub — routes / health checks.
 * FastAPI remains the system of record for profile verification gates.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/edge/health") {
      return Response.json({
        ok: true,
        disclaimer: env.PRODUCT_DISCLAIMER,
      });
    }

    // Example: refuse analysis path at the edge if a worker-side flag is set.
    // Real checks should query D1: SELECT profile_verified FROM profiles WHERE ...
    if (url.pathname.startsWith("/labels/") || url.pathname.startsWith("/compare/")) {
      // Proxy to FastAPI origin; FastAPI enforces profile_verified.
      if (!env.API_ORIGIN) {
        return new Response("API_ORIGIN not configured", { status: 500 });
      }
      const upstream = new URL(url.pathname + url.search, env.API_ORIGIN);
      return fetch(new Request(upstream, request));
    }

    return new Response("Supplement research edge worker", { status: 200 });
  },
};
