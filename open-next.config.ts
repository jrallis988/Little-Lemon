import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Cloudflare Workers adapter config.
 * Incremental cache defaults to in-memory for this prototype deploy.
 * Add an R2 binding (NEXT_INC_CACHE_R2_BUCKET) later for durable ISR cache.
 */
export default defineCloudflareConfig({});
