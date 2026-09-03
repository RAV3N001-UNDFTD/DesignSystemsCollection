import { ProjectGrid } from "@/components/blocks/project-grid"

export default function ProjectGridDemo() {
  return (
    <ProjectGrid
      projects={[
        {
          title: "DesignSystemsCollection",
          description: "An AI-native design system methodology and registry.",
          href: "https://github.com/RAV3N001-UNDFTD/DesignSystemsCollection",
          imageUrl: "https://placehold.co/800x500",
          imageAlt: "Screens built from the design system registry",
          tags: ["Design tokens", "shadcn", "Tailwind"],
          aiAssisted: true,
        },
        {
          title: "Portfolio v3",
          description: "Personal site built entirely from registry blocks.",
          href: "#portfolio",
          tags: ["Next.js"],
        },
        {
          title: "Agent Console",
          description: "Operations UI for a multi-agent workflow.",
          href: "#console",
          tags: ["AI Elements", "Streaming", "Tool calls", "Reasoning"],
          aiAssisted: true,
        },
      ]}
    />
  )
}
