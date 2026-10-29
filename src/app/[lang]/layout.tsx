import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { InteractiveProvider } from "@/components/interactive/InteractiveProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { DictionaryProvider } from "@/i18n/provider";
import { getDictionaryFor } from "@/i18n";
import { hasLocale, LOCALE_META, LOCALES } from "@/i18n/locales";
import { GOOGLE_SITE_VERIFICATION, SITE_NAME, SITE_URL } from "@/content/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  const meta = LOCALE_META[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s — ${SITE_NAME}`,
    },
    description: dict.meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: "/fr",
        en: "/en",
        de: "/de",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "profile",
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => LOCALE_META[l].ogLocale),
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
      firstName: "Maxime",
      lastName: "Derbigny",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    publisher: SITE_NAME,
    formatDetection: { email: false, address: false, telephone: false },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
    verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#F5F4F0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);

  return (
    <html
      lang={LOCALE_META[lang].htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="label fixed top-3 left-3 z-[100] -translate-y-24 bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0"
        >
          {dict.meta.skipLink}
        </a>
        <MotionProvider>
          <DictionaryProvider dict={dict}>
            <InteractiveProvider>{children}</InteractiveProvider>
          </DictionaryProvider>
        </MotionProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
