import { publicEnv } from "@/env";
export const siteConfig = {
  name: "WELU", description: "Engineering Project × Mechanical Design × Automation。探索 WELU 的工程設計、自動化與機器人作品。",
  url: (publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  ogImage: "", twitterHandle: "", author: "WELU", themeColor: "#f4f3ee",
} as const;
