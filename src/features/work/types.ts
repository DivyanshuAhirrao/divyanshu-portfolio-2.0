export type ProjectStat = { label: string; value: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  meta: string;
  tags: string[];
  stats: ProjectStat[];
};
