import type { Metadata, Viewport } from "next";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";
import { SiteHeader, SiteFooter } from "@/components/portfolio/shell";
import { siteConfig } from "@/lib/site";
import "@/app/globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url + "/"),
  title: "WELU | Engineering Portfolio", description: siteConfig.description,
  alternates: { canonical: siteConfig.url + "/" },
  openGraph: { title: "WELU | Engineering Portfolio", description: siteConfig.description, url: siteConfig.url + "/", siteName: "WELU", locale: "zh_TW", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: siteConfig.themeColor };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">跳至主要內容</a>
    <ReducedMotion /><ScrollLayout><SiteHeader />{children}<SiteFooter /></ScrollLayout>
  </body></html>;
}
