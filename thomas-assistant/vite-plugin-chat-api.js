// @ts-nocheck
/**
 * POST /api/chat
 * Body: { messages: [{ role: "user"|"assistant", content: string }], context?: string }
 * Runs the same multi-turn completion as the browser (history + culinary tools).
 */
export function thomasChatApi() {
  return {
    name: "thomas-chat-api",
    /**
     * @param {import('vite').ViteDevServer} server
     */
    configureServer(server) {
      server.middlewares.use(chatMiddleware(server));
    },
  };
}

/**
 * @param {import('vite').ViteDevServer} server
 */
function chatMiddleware(server) {
  /**
   * @param {import('node:http').IncomingMessage} req
   * @param {import('node:http').ServerResponse} res
   * @param {() => void} next
   */
  return async (req, res, next) => {
    const url = req.url?.split("?")[0];
    if (url !== "/api/chat") return next();

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Allow", "POST");
      res.end("Method Not Allowed");
      return;
    }

    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      /** @type {{ role: string, content: string }[]} */
      const messages = Array.isArray(body.messages) ? [...body.messages] : [];
      const context = typeof body.context === "string" ? body.context : "";
      if (messages.length === 0 && typeof body.message === "string") {
        messages.push({ role: "user", content: body.message });
      }

      const mod = await server.ssrLoadModule("/src/lib/chat-engine.ts");
      const result = await mod.runChatCompletion({ messages, context });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          role: "assistant",
          content: "",
          error: err instanceof Error ? err.message : String(err),
        }),
      );
    }
  };
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @returns {Promise<string>}
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf8")),
    );
    req.on("error", reject);
  });
}
