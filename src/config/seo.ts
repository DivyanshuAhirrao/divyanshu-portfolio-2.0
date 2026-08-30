import { contact, sections, site } from "./site";

/** Structured data for the person behind the portfolio. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${contact.email}`,
  url: "/",
  sameAs: [contact.githubUrl, contact.linkedinUrl],
  knowsAbout: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "React Native",
    "PostgreSQL",
    "Docker",
    "CI/CD",
    "AI engineering",
  ],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

/** Structured data for the site itself, including its in-page sections. */
const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: "/",
  description: site.description,
  hasPart: sections.map((s) => ({
    "@type": "WebPageElement",
    name: s.label,
    url: `/#${s.id}`,
  })),
};

/** Head config for the home route (meta, OpenGraph, Twitter, JSON-LD). */
export const homeHead = {
  meta: [
    { title: site.title },
    { name: "description", content: site.description },
    { name: "keywords", content: site.keywords },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: site.title },
    { property: "og:description", content: site.description },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: "/" },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: "en_US" },
    { property: "profile:first_name", content: "Divyanshu" },
    { property: "profile:last_name", content: "Ahirrao" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: site.title },
    { name: "twitter:description", content: site.description },
  ],
  links: [{ rel: "canonical", href: "/" }],
  scripts: [
    { type: "application/ld+json", children: JSON.stringify(personLd) },
    { type: "application/ld+json", children: JSON.stringify(siteLd) },
  ],
};
