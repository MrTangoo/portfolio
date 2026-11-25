"use client";

import { useSyncExternalStore } from "react";

/**
 * Search engine and link-preview crawlers render the page without scrolling,
 * so anything revealed on scroll stays at `opacity: 0` in their snapshot and
 * the page looks almost empty. Google's renderer identifies as "Googlebot".
 */
const CRAWLER_PATTERN =
  /bot|crawler|spider|crawling|slurp|lighthouse|chrome-lighthouse|google-inspectiontool|facebookexternalhit|embedly|preview/i;

export const isCrawler = (userAgent: string) => CRAWLER_PATTERN.test(userAgent);

const subscribe = () => () => {};

/** `false` on the server and for visitors; `true` once hydrated in a crawler. */
export function useIsCrawler() {
  return useSyncExternalStore(
    subscribe,
    () => isCrawler(navigator.userAgent),
    () => false,
  );
}

/**
 * Motion props that reveal an element when it scrolls into view — or right
 * after hydration for crawlers, so they index the same, fully visible content.
 */
export function useRevealTrigger<T>(target: T, once = true) {
  const crawler = useIsCrawler();
  return crawler
    ? { animate: target }
    : { whileInView: target, viewport: { once, margin: "0px 0px -10% 0px" } };
}
