(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // node_modules/wrangler/templates/middleware/common.ts
  var __facade_middleware__ = [];
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  __name(__facade_register__, "__facade_register__");
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  __name(__facade_registerInternal__, "__facade_registerInternal__");
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  __name(__facade_invokeChain__, "__facade_invokeChain__");
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }
  __name(__facade_invoke__, "__facade_invoke__");

  // node_modules/wrangler/templates/middleware/loader-sw.ts
  var __FACADE_EVENT_TARGET__;
  if (globalThis.MINIFLARE) {
    __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
  } else {
    __FACADE_EVENT_TARGET__ = new EventTarget();
  }
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  __name(__facade_isSpecialEvent__, "__facade_isSpecialEvent__");
  var __facade__originalAddEventListener__ = globalThis.addEventListener;
  var __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
  var __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
  globalThis.addEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.addEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalAddEventListener__(type, listener, options);
    }
  };
  globalThis.removeEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.removeEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalRemoveEventListener__(type, listener, options);
    }
  };
  globalThis.dispatchEvent = function(event) {
    if (__facade_isSpecialEvent__(event.type)) {
      return __FACADE_EVENT_TARGET__.dispatchEvent(event);
    } else {
      return __facade__originalDispatchEvent__(event);
    }
  };
  globalThis.addMiddleware = __facade_register__;
  globalThis.addMiddlewareInternal = __facade_registerInternal__;
  var __facade_waitUntil__ = Symbol("__facade_waitUntil__");
  var __facade_response__ = Symbol("__facade_response__");
  var __facade_dispatched__ = Symbol("__facade_dispatched__");
  var __Facade_ExtendableEvent__ = class ___Facade_ExtendableEvent__ extends Event {
    static {
      __name(this, "__Facade_ExtendableEvent__");
    }
    [__facade_waitUntil__] = [];
    waitUntil(promise) {
      if (!(this instanceof ___Facade_ExtendableEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this[__facade_waitUntil__].push(promise);
    }
  };
  var __Facade_FetchEvent__ = class ___Facade_FetchEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_FetchEvent__");
    }
    #request;
    #passThroughOnException;
    [__facade_response__];
    [__facade_dispatched__] = false;
    constructor(type, init) {
      super(type);
      this.#request = init.request;
      this.#passThroughOnException = init.passThroughOnException;
    }
    get request() {
      return this.#request;
    }
    respondWith(response) {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      if (this[__facade_response__] !== void 0) {
        throw new DOMException(
          "FetchEvent.respondWith() has already been called; it can only be called once.",
          "InvalidStateError"
        );
      }
      if (this[__facade_dispatched__]) {
        throw new DOMException(
          "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
          "InvalidStateError"
        );
      }
      this.stopImmediatePropagation();
      this[__facade_response__] = response;
    }
    passThroughOnException() {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#passThroughOnException();
    }
  };
  var __Facade_ScheduledEvent__ = class ___Facade_ScheduledEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_ScheduledEvent__");
    }
    #scheduledTime;
    #cron;
    #noRetry;
    constructor(type, init) {
      super(type);
      this.#scheduledTime = init.scheduledTime;
      this.#cron = init.cron;
      this.#noRetry = init.noRetry;
    }
    get scheduledTime() {
      return this.#scheduledTime;
    }
    get cron() {
      return this.#cron;
    }
    noRetry() {
      if (!(this instanceof ___Facade_ScheduledEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#noRetry();
    }
  };
  __facade__originalAddEventListener__("fetch", (event) => {
    const ctx = {
      waitUntil: event.waitUntil.bind(event),
      passThroughOnException: event.passThroughOnException.bind(event)
    };
    const __facade_sw_dispatch__ = /* @__PURE__ */ __name(function(type, init) {
      if (type === "scheduled") {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: Date.now(),
          cron: init.cron ?? "",
          noRetry() {
          }
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      }
    }, "__facade_sw_dispatch__");
    const __facade_sw_fetch__ = /* @__PURE__ */ __name(function(request, _env, ctx2) {
      const facadeEvent = new __Facade_FetchEvent__("fetch", {
        request,
        passThroughOnException: ctx2.passThroughOnException
      });
      __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
      facadeEvent[__facade_dispatched__] = true;
      event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      const response = facadeEvent[__facade_response__];
      if (response === void 0) {
        throw new Error("No response!");
      }
      return response;
    }, "__facade_sw_fetch__");
    event.respondWith(
      __facade_invoke__(
        event.request,
        globalThis,
        ctx,
        __facade_sw_dispatch__,
        __facade_sw_fetch__
      )
    );
  });
  __facade__originalAddEventListener__("scheduled", (event) => {
    const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
      scheduledTime: event.scheduledTime,
      cron: event.cron,
      noRetry: event.noRetry.bind(event)
    });
    __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
    event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
  });

  // node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } finally {
      try {
        if (request.body !== null && !request.bodyUsed) {
          const reader = request.body.getReader();
          while (!(await reader.read()).done) {
          }
        }
      } catch (e) {
        console.error("Failed to drain the unused request body.", e);
      }
    }
  }, "drainBody");
  var middleware_ensure_req_body_drained_default = drainBody;

  // .wrangler/tmp/bundle-1fM2Cn/middleware-insertion-facade.js
  __facade_registerInternal__([middleware_ensure_req_body_drained_default]);

  // functions/api/[[route]].ts
  function generateSlug() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  __name(generateSlug, "generateSlug");
  var route_default = {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const pathSegments = url.pathname.split("/").filter((segment) => segment !== "");
      if (pathSegments[0] === "api") {
        pathSegments.shift();
      }
      const params = { route: pathSegments };
      const context = { request, env, params };
      return handleRequest(context);
    }
  };
  async function handleRequest(context) {
    const { request, env, params } = context;
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    const route = params.route?.join("/") || "";
    try {
      if (request.method === "GET" && route.startsWith("page/")) {
        const slug = route.split("/")[1];
        if (!slug) {
          return new Response(JSON.stringify({ error: "Slug is required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        const userResult = await env.DB.prepare(`
        SELECT id, name, bio, image_url, theme_settings 
        FROM users 
        WHERE user_slug = ?
      `).bind(slug).first();
        if (!userResult) {
          return new Response(JSON.stringify({ error: "Page not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        const linksResult = await env.DB.prepare(`
        SELECT link_id, title, url, is_active
        FROM links 
        WHERE user_id = ? 
        ORDER BY order_index ASC
      `).bind(userResult.id).all();
        const userData = {
          profile: {
            name: userResult.name,
            bio: userResult.bio || "",
            imageUrl: userResult.image_url || ""
          },
          links: linksResult.results.map((link) => ({
            id: link.link_id,
            title: link.title,
            url: link.url,
            isActive: Boolean(link.is_active)
          })),
          themeSettings: JSON.parse(userResult.theme_settings)
        };
        return new Response(JSON.stringify(userData), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (request.method === "POST" && route === "upload-image") {
        try {
          const formData = await request.formData();
          const file = formData.get("image");
          if (!file) {
            return new Response(JSON.stringify({ error: "No image file provided" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
          if (!file.type.startsWith("image/")) {
            return new Response(JSON.stringify({ error: "File must be an image" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
          const maxSize = env.IMAGES ? 5 * 1024 * 1024 : 1024 * 1024;
          if (file.size > maxSize) {
            const maxSizeStr = env.IMAGES ? "5MB" : "1MB (local dev mode)";
            return new Response(JSON.stringify({ error: `File size must be less than ${maxSizeStr}` }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
          let imageUrl;
          if (env.IMAGES) {
            const fileExtension = file.name.split(".").pop() || "jpg";
            const filename = `profile-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
            const arrayBuffer = await file.arrayBuffer();
            await env.IMAGES.put(filename, arrayBuffer, {
              httpMetadata: {
                contentType: file.type
              }
            });
            const baseUrl = env.R2_PUBLIC_URL || "https://your-r2-bucket.r2.dev";
            imageUrl = `${baseUrl}/${filename}`;
          } else {
            console.log("R2 not available, using base64 fallback for local development");
            const arrayBuffer = await file.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            imageUrl = `data:${file.type};base64,${base64}`;
          }
          return new Response(JSON.stringify({
            success: true,
            imageUrl,
            isLocal: !env.IMAGES
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } catch (error) {
          console.error("Image upload error:", error);
          return new Response(JSON.stringify({
            error: "Failed to upload image",
            details: error instanceof Error ? error.message : "Unknown error"
          }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
      }
      if (request.method === "POST" && route === "save") {
        const userData = await request.json();
        let userSlug = userData.slug;
        if (!userSlug) {
          userSlug = generateSlug();
          const insertResult = await env.DB.prepare(`
          INSERT INTO users (user_slug, name, bio, image_url, theme_settings, updated_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(
            userSlug,
            userData.profile.name,
            userData.profile.bio,
            userData.profile.imageUrl,
            JSON.stringify(userData.themeSettings)
          ).run();
          const userId = insertResult.meta.last_row_id;
          for (let i = 0; i < userData.links.length; i++) {
            const link = userData.links[i];
            await env.DB.prepare(`
            INSERT INTO links (user_id, link_id, title, url, is_active, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
              userId,
              link.id,
              link.title,
              link.url,
              link.isActive ? 1 : 0,
              i
            ).run();
          }
        } else {
          const userResult = await env.DB.prepare(`
          SELECT id FROM users WHERE user_slug = ?
        `).bind(userSlug).first();
          if (!userResult) {
            return new Response(JSON.stringify({ error: "User not found" }), {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
          const userId = userResult.id;
          await env.DB.prepare(`
          UPDATE users 
          SET name = ?, bio = ?, image_url = ?, theme_settings = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(
            userData.profile.name,
            userData.profile.bio,
            userData.profile.imageUrl,
            JSON.stringify(userData.themeSettings),
            userId
          ).run();
          await env.DB.prepare(`DELETE FROM links WHERE user_id = ?`).bind(userId).run();
          for (let i = 0; i < userData.links.length; i++) {
            const link = userData.links[i];
            await env.DB.prepare(`
            INSERT INTO links (user_id, link_id, title, url, is_active, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
              userId,
              link.id,
              link.title,
              link.url,
              link.isActive ? 1 : 0,
              i
            ).run();
          }
        }
        return new Response(JSON.stringify({
          success: true,
          slug: userSlug,
          url: `${url.origin}/#/page/${userSlug}`
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("API Error:", error);
      return new Response(JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=%5B%5Broute%5D%5D.js.map
