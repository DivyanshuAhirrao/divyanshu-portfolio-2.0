export type ProjectStat = { label: string; value: string };

export type Project = {
  id: string;
  title: string;
  /** One-line summary used in compact rows. */
  tagline: string;
  /** Optional bullet points for the detailed description. */
  bullets?: string[];
  meta: string;
  tags: string[];
  stats: ProjectStat[];
  /** Destination for the case-file link. Use "#contact" when there is no public URL yet. */
  href: string;
  /** Optional override for the link label (defaults to "View project"). */
  linkLabel?: string;
  /** Set false for in-page anchors so they don't open in a new tab. */
  external?: boolean;
};
