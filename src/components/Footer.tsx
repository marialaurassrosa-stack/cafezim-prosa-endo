import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-lg font-extrabold text-purple-dark">BIODENTAL</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink/65">
          <a href={siteConfig.links.biodentalSite} className="hover:text-purple-700">
            Site Biodental
          </a>
          <a href={siteConfig.links.instagram} className="hover:text-purple-700">
            Instagram
          </a>
          <a href={siteConfig.links.privacyPolicy} className="hover:text-purple-700">
            Política de Privacidade
          </a>
          <a href={siteConfig.links.contact} className="hover:text-purple-700">
            Contato
          </a>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-ink/40">{siteConfig.brand} © 2026</p>
    </footer>
  );
}
