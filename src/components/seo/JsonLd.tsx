import { identity, socials } from "@/content/profile";
import type { Dictionary } from "@/i18n";
import { LOCALE_META } from "@/i18n/locales";
import { SITE_NAME, SITE_URL } from "@/content/site";

function personNode(dict: Dictionary) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: identity.fullName,
    givenName: identity.firstName,
    familyName: identity.lastName,
    jobTitle: dict.identity.jobTitle,
    description: dict.meta.description,
    url: SITE_URL,
    image: `${SITE_URL}${dict.identity.portrait.src}`,
    email: `mailto:${identity.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: dict.identity.location.city,
      addressRegion: dict.identity.location.region,
      addressCountry: "CH",
    },
    worksFor: {
      "@type": "Organization",
      name: identity.employer,
    },
    alumniOf: dict.education
      .filter((item) => item.status === "completed")
      .map((item) => ({
        "@type": "EducationalOrganization",
        name: item.institution,
      })),
    hasCredential: dict.certifications.items.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: certification.issuer },
    })),
    knowsLanguage: dict.languages.map((language) => language.code),
    sameAs: socials.filter((social) => social.id !== "email").map((social) => social.href),
  };
}

/** Schema.org `Person` structured data, built exclusively from real profile data. */
export function buildPersonJsonLd(dict: Dictionary) {
  return { "@context": "https://schema.org", ...personNode(dict) };
}

/**
 * Full structured-data graph for the site: a `ProfilePage` whose main entity
 * is the `Person`, published by the `WebSite`. Linked together via `@id`s.
 */
export function buildSiteJsonLd(dict: Dictionary) {
  const person = personNode(dict);
  const htmlLang = LOCALE_META[dict.locale].htmlLang;
  const url = `${SITE_URL}/${dict.locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: dict.meta.description,
        inLanguage: htmlLang,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: dict.meta.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        inLanguage: htmlLang,
      },
      person,
    ],
  };
}

export function JsonLd({ dict }: { dict: Dictionary }) {
  const json = JSON.stringify(buildSiteJsonLd(dict)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
