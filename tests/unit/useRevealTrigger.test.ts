import { describe, expect, it } from "vitest";
import { isCrawler } from "@/components/motion/useRevealTrigger";

describe("isCrawler", () => {
  it.each([
    "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)",
    "facebookexternalhit/1.1",
  ])("detects %s", (ua) => {
    expect(isCrawler(ua)).toBe(true);
  });

  it.each([
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0",
  ])("leaves visitors alone: %s", (ua) => {
    expect(isCrawler(ua)).toBe(false);
  });
});
