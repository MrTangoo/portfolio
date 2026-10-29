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

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Expertise />
        <Stack />
        <Journey />
        <Certifications />
        <Mindset />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
