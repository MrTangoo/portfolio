import { certifications, education, identity, socials } from "@/content/profile";
import { SITE_DESCRIPTION, SITE_URL } from "@/content/site";

/** Schema.org `Person` structured data, built exclusively from real profile data. */
export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
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
    sameAs: socials.filter((social) => social.id !== "email").map((social) => social.href),
  };
}

export function JsonLd() {
  const json = JSON.stringify(buildPersonJsonLd()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
