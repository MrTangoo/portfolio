/**
 * Search engine and link-preview renderers take their snapshot without
 * scrolling and without letting animations play: Google's URL inspection
 * showed an empty page below the header, because every scroll-reveal block
 * was still at its `opacity: 0` starting point. For those renderers we show
 * the final state straight away (see `[data-crawler]` in globals.css).
 */
const CRAWLER_PATTERN =
  /bot|crawler|spider|crawling|slurp|lighthouse|google-inspectiontool|facebookexternalhit|embedly|preview/i;

export const isCrawler = (userAgent: string) => CRAWLER_PATTERN.test(userAgent);

/**
 * Inline, render-blocking script for `<head>`: it flags crawlers on `<html>`
 * before the first paint, so no animation frame is ever needed.
 */
export const CRAWLER_FLAG_SCRIPT = `if(${CRAWLER_PATTERN}.test(navigator.userAgent))document.documentElement.setAttribute("data-crawler","")`;
