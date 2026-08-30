import type { Contact } from "@/data/types";

/** Owner identity + contact channels used across header, hero, contact and SEO. */
export const contact: Contact = {
  email: "divyanshu16.work@gmail.com",
  github: "DivyanshuAhirrao",
  githubUrl: "https://github.com/divyanshuahirrao",
  linkedin: "divyanshu-ahirrao-038537245",
  linkedinUrl: "https://www.linkedin.com/in/divyanshu-ahirrao-038537245",
  location: "India · IST · Remote friendly",
};

export const site = {
  name: "Divyanshu Ahirrao",
  role: "Full-Stack Software Engineer",
  title: "Divyanshu Ahirrao | Portfolio",
  description:
    "Divyanshu Ahirrao builds production web, mobile and AI systems end to end — interfaces, services and the pipelines that ship them. Selected work, expertise and experience.",
  keywords:
    "Divyanshu Ahirrao, full-stack software engineer, React developer, TypeScript, Node.js, React Native, AI engineering, portfolio",
} as const;

/** In-page sections, shared by the header nav, the sitemap and structured data. */
export const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
