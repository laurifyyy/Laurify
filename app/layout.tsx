import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://laurify.lv";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Laurify | RF Lifting & Luxury Beauty Riga",
    template: "%s | Laurify",
  },
  description:
    "Laurify — luksusa skaistumkopšanas salons Rīgā. RF lifting, sejas procedūras un ādas kopšana ar premium aprūpi. Luxury RF lifting & facial treatments in Riga, Latvia.",
  keywords: [
    "RF lifting Rīgā",
    "skaistumkopšanas salons Rīga",
    "sejas procedūras Rīgā",
    "luxury beauty Riga",
    "RF lifting Riga",
    "facial treatments Riga",
    "Laurify",
    "ādas kopšana Rīgā",
    "красота Рига",
    "RF лифтинг Рига",
  ],
  authors: [{ name: "Laurify", url: siteUrl }],
  creator: "Laurify",
  publisher: "Laurify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "lv_LV",
    alternateLocale: ["en_US", "ru_RU"],
    url: siteUrl,
    siteName: "Laurify",
    title: "Laurify | RF Lifting & Luxury Beauty Riga",
    description:
      "Luksusa skaistumkopšanas salons Rīgā. RF lifting, sejas procedūras un premium ādas kopšana.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laurify — Luxury Beauty Salon in Riga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laurify | RF Lifting & Luxury Beauty Riga",
    description:
      "Luksusa skaistumkopšanas salons Rīgā. RF lifting, sejas procedūras un premium ādas kopšana.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "lv-LV": siteUrl,
      "en-US": siteUrl,
      "ru-RU": siteUrl,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
