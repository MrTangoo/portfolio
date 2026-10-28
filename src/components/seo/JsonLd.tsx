import { certifications, education, identity, languages, socials } from "@/content/profile";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/content/site";

const LANGUAGE_CODES: Record<string, string> = {
  Français: "fr-CH",
  Anglais: "en",
  Allemand: "de",
};

function personNode() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: identity.fullName,
    givenName: identity.firstName,
    familyName: identity.lastName,
    jobTitle: identity.jobTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${identity.portrait.src}`,
    email: `mailto:${identity.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: identity.location.city,
      addressRegion: identity.location.region,
      addressCountry: "CH",
    },
    worksFor: {
      "@type": "Organization",
      name: identity.employer,
    },
    alumniOf: education
      .filter((item) => item.status === "completed")
      .map((item) => ({
        "@type": "EducationalOrganization",
        name: item.institution,
      })),
    hasCredential: certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: certification.issuer },
    })),
    knowsLanguage: languages.map((language) => LANGUAGE_CODES[language.name] ?? language.name),
    sameAs: socials.filter((social) => social.id !== "email").map((social) => social.href),
  };
}

/** Schema.org `Person` structured data, built exclusively from real profile data. */
export function buildPersonJsonLd() {
  return { "@context": "https://schema.org", ...personNode() };
}

/**
 * Full structured-data graph for the site: a `ProfilePage` whose main entity
 * is the `Person`, published by the `WebSite`. Linked together via `@id`s.
 */
export function buildSiteJsonLd() {
  const person = personNode();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-CH",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        inLanguage: "fr-CH",
      },
      person,
    ],
  };
}

export function JsonLd() {
  const json = JSON.stringify(buildSiteJsonLd()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
