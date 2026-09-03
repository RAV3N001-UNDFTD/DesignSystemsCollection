import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Project {
  title: string
  description: string
  href: string
  /** 技术栈/类别标签，最多 3 个会被展示 */
  tags?: string[]
  /** 标记 AI 参与构建的项目，会显示 ai badge */
  aiAssisted?: boolean
}

interface ProjectGridProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[]
}

function ProjectGrid({ projects, className, ...props }: ProjectGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
      {projects.map((project) => (
        <a
          key={project.href}
          href={project.href}
          className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Card className="h-full transition-shadow duration-150 group-hover:shadow-elevation-2">
            <CardHeader>
              <CardTitle className="group-hover:text-accent-emphasis">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            {project.tags?.length || project.aiAssisted ? (
              <CardContent className="flex flex-wrap items-center gap-2">
                {project.aiAssisted ? <Badge variant="ai">AI assisted</Badge> : null}
                {project.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                {(project.tags?.length ?? 0) > 3 ? (
                  <Badge>+{(project.tags?.length ?? 0) - 3}</Badge>
                ) : null}
              </CardContent>
            ) : null}
          </Card>
        </a>
      ))}
    </div>
  )
}

export { ProjectGrid, type Project }
