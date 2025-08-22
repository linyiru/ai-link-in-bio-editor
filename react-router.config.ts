import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  buildDirectory: "build",
  serverModuleFormat: "esm",
  serverPlatform: "cloudflare",
  // Cloudflare-specific configuration
  future: {
    v3_routeConfig: true,
  },
} satisfies Config;