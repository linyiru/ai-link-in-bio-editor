import { onRequest as __api___route___ts_onRequest } from "/Users/linyiru/Downloads/ai-link-in-bio-editor(linktree)/functions/api/[[route]].ts"

export const routes = [
    {
      routePath: "/api/:route*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___route___ts_onRequest],
    },
  ]