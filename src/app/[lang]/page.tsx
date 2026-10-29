import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/hero/Hero";
import { Journey } from "@/components/sections/journey/Journey";
import { Mindset } from "@/components/sections/Mindset";
import { Stack } from "@/components/sections/stack/Stack";
import { getDictionarySafe } from "@/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionarySafe(lang);

  // Single root element: the router scroll-focuses every top-level child of
  // the page on navigation — a fragment would make it target the footer.
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <JsonLd dict={dict} />
      <Header />
      <main id="main" className="flex-1">
        <Hero dict={dict} />
        <About dict={dict} />
        <Expertise dict={dict} />
        <Stack dict={dict} />
        <Journey dict={dict} />
        <Certifications dict={dict} />
        <Mindset dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
