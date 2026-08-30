import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/home-page";
import { homeHead } from "@/config/seo";

export const Route = createFileRoute("/")({
  head: () => homeHead,
  component: HomePage,
});
