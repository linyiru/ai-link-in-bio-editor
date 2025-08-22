import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  buildDirectory: "build",
  serverModuleFormat: "esm",
} satisfies Config;