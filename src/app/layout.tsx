import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://cafezim-prosa-endo.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cafezim, Prosa & Endo | Biodental no COBE 2026",
  description:
    "Confira a programação de rodas de conversa e hands-on da Biodental durante o COBE 2026 e monte sua programação.",
  openGraph: {
    title: "Cafezim, Prosa & Endo | Biodental no COBE 2026",
    description:
      "Confira a programação de rodas de conversa e hands-on da Biodental durante o COBE 2026 e monte sua programação.",
    type: "website",
    locale: "pt_BR",
    siteName: "Biodental Produtos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafezim, Prosa & Endo | Biodental no COBE 2026",
    description:
      "Confira a programação de rodas de conversa e hands-on da Biodental durante o COBE 2026 e monte sua programação.",
  },
};

export const viewport: Viewport = {
  themeColor: "#731aba",
  width: "device-width",
  initialScale: 1,
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-white text-ink antialiased">
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
