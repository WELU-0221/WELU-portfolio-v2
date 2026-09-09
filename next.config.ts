import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export", trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  poweredByHeader: false,
  images: { unoptimized: true },
  compiler: { removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false },
};
export default nextConfig;
