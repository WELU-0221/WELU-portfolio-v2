import Link from "next/link";
import { brand } from "@/data/portfolio";
export function SiteHeader() {
  return <header className="relative z-30 border-b border-line">
    <nav aria-label="主要導覽" className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-6 px-gutter py-4">
      <Link href="/" aria-label="WELU 首頁" className="py-2 text-2xl font-bold tracking-tight">{brand.name}<span className="text-accent">.</span></Link>
      <div className="flex items-center gap-5 text-sm md:gap-9">
        <Link className="py-3 hover:text-accent" href="/#projects">Projects <sup>05</sup></Link>
        <Link className="py-3 hover:text-accent" href="/#about">{brand.labels.about}</Link>
        <Link className="py-3 hover:text-accent" href="/#contact">{brand.labels.contact} ↗</Link>
      </div>
    </nav>
  </header>;
}
export function SiteFooter() {
  return <footer className="border-t border-line">
    <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-gutter py-8 text-sm">
      <p>© {new Date().getFullYear()} {brand.name}</p>
      <p className="text-muted">Engineering, with intention.</p>
      <Link href="/#projects" className="py-2 hover:text-accent">{brand.labels.back} ↑</Link>
    </div>
  </footer>;
}
