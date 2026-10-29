import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, matchLocale } from "@/i18n/locales";

/**
 * Every route lives under `/[lang]`. Requests without a locale prefix are
 * redirected to the visitor's preferred locale (Accept-Language), falling
 * back to French. Prefixed paths pass through untouched.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = matchLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip internals, the API, icon routes and anything that looks like a file.
  matcher: ["/((?!api|_next|icon|apple-icon|.*\\..*).*)"],
};
