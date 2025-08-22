import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("about", "routes/about.tsx"),  
  route("preview", "routes/preview.tsx"),
  route("api/data", "routes/api.data.tsx"),
  route("api/save", "routes/api.save.tsx"),
] satisfies RouteConfig;