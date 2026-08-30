import type { Project } from "./types";

/** Real shipped work — descriptions are plain bullets so they stay readable and accessible. */
export const projects: Project[] = [
  {
    id: "01",
    title: "Portfolio",
    tagline: "Personal brand site built with React + Vite, animations, and clean architecture.",
    bullets: [
      "Created using ReactJS + Vite.",
      "Includes Animation Library, simple representation of Career and Tech Stack.",
      "Easy and attractive UI with standard Website structure.",
    ],
    meta: "Personal site · 2026",
    tags: ["React", "Vite", "Animations"],
    stats: [
      { label: "Type", value: "Personal" },
      { label: "Stack", value: "React" },
      { label: "Status", value: "Live" },
    ],
    href: "/",
    linkLabel: "View site",
    external: false,
  },
  {
    id: "02",
    title: "Shopper-Sparrow",
    tagline: "Full-featured e-commerce experience with auth, cart, filters, and promotions.",
    bullets: [
      "Built with ReactJS + Vite.",
      "Authentication, Authorization, Landing Page, search, filter, add-to-cart, and dynamic cart updates.",
      "Attractive UI with Carousels, Animations, Modals, Coupons, Banners, and Cards.",
    ],
    meta: "E-commerce · 2025",
    tags: ["React", "Vite", "Auth", "Cart"],
    stats: [
      { label: "Cart", value: "Dynamic" },
      { label: "Auth", value: "JWT" },
      { label: "Live", value: "Yes" },
    ],
    href: "https://sparrow-shopper.netlify.app/",
    linkLabel: "Open store",
  },
  {
    id: "03",
    title: "RoaminGo",
    tagline: "Travel platform built on Next.js with React-Spring motion and Express backend.",
    bullets: [
      "Travel project built with NextJS.",
      "Technologies: NextJS, Tailwind CSS, React-Spring, ExpressJS.",
      "Planned additions: Payments, Bus Tracking, Review System, and Authentication.",
    ],
    meta: "Travel app · 2025",
    tags: ["Next.js", "Tailwind", "Express"],
    stats: [
      { label: "Stack", value: "Next.js" },
      { label: "Motion", value: "Spring" },
      { label: "Backend", value: "Express" },
    ],
    href: "https://roamingo-divyanshu.netlify.app",
    linkLabel: "Explore trips",
  },
  {
    id: "04",
    title: "Notification-Panel",
    tagline: "Role-based notification dashboard with admin/user layers and data visualization.",
    bullets: [
      "Built on React-TypeScript with json-server backend.",
      "Authentication, Authorization, Admin and User layers.",
      "Admin can like, save, and comment globally; User sees profile graphs and a notification center.",
    ],
    meta: "Dashboard · 2024",
    tags: ["React TS", "json-server", "Charts"],
    stats: [
      { label: "Roles", value: "2" },
      { label: "Backend", value: "json-server" },
      { label: "UI", value: "Charts" },
    ],
    href: "https://github.com/DivyanshuAhirrao/notification-panel",
    linkLabel: "View code",
  },
  {
    id: "05",
    title: "Deluxia",
    tagline: "Frontend-first luxury experience with React, Bootstrap, and Node.js.",
    bullets: [
      "Primary project developed on Frontend basis.",
      "Technologies: ReactJS, Bootstrap, HTML, CSS, JavaScript, NodeJS.",
      "Structured UI/UX with smooth functionality.",
    ],
    meta: "Luxury brand · 2024",
    tags: ["React", "Bootstrap", "Node.js"],
    stats: [
      { label: "Focus", value: "Frontend" },
      { label: "Style", value: "Luxury" },
      { label: "Live", value: "Yes" },
    ],
    href: "https://deluxiabydivyanshu.netlify.app/",
    linkLabel: "Visit Deluxia",
  },
  {
    id: "06",
    title: "Engagement Hub",
    tagline:
      "Insurance proposition management platform with real-time analytics and plan administration.",
    bullets: [
      "Built an Analytics Dashboard providing real-time insights into insurance propositions.",
      "Proposition Library supports searching, filtering by line of business and status, and managing propositions.",
      "Create new insurance propositions with configurable plans, descriptions, status, and line of business.",
      "Dashboard provides proposition metrics including active products, total plans, average premium, and premium breakdown by status.",
    ],
    meta: "Insurance platform · 2026",
    tags: ["React", "TypeScript", "Analytics", "Dashboard"],
    stats: [
      { label: "Domain", value: "Insurance" },
      { label: "Dashboard", value: "Analytics" },
      { label: "Management", value: "CRUD" },
    ],
    href: "https://engagement-hub-b8bsu4ge3-divyanshuahirraos-projects.vercel.app",
    linkLabel: "Explore project",
    external: false,
  },

  {
    id: "07",
    title: "Collaborative Whiteboard",
    tagline:
      "Interactive collaborative whiteboard with authentication, board management, and data portability.",
    bullets: [
      "Collaborative whiteboard application with Login and Quick Demo access without requiring authentication.",
      "Create and manage multiple whiteboards for project planning, design brainstorming, meeting notes, architecture diagrams, and user flows.",
      "Export and Import whiteboard data for easy backup, sharing, and restoration.",
      "Saved whiteboards can be deleted individually, with a dedicated board management interface.",
      "Includes logout functionality and a clean workspace for collaborative visual planning.",
    ],
    meta: "Collaboration tool · 2026",
    tags: ["React", "TypeScript", "Canvas", "Collaboration"],
    stats: [
      { label: "Access", value: "Auth + Demo" },
      { label: "Boards", value: "Multi-board" },
      { label: "Data", value: "Import/Export" },
    ],
    href: "https://divyanshu16-whiteboard.netlify.app",
    linkLabel: "Open whiteboard",
    external: false,
  },
];
