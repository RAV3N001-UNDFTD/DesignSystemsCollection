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
  /** 项目封面图（建议 16:10）。调研结论：作品集栅格以图片为第一信息层，尽量提供 */
  imageUrl?: string
  /** 封面图替代文本；提供 imageUrl 时必填有意义的描述 */
  imageAlt?: string
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
          <Card className="h-full overflow-hidden transition-shadow duration-150 group-hover:shadow-elevation-2">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.imageAlt ?? ""}
                loading="lazy"
                className="aspect-[16/10] w-full border-b border-border-muted bg-sunken object-cover"
              />
            ) : null}
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
