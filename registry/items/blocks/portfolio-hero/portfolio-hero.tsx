import * as React from "react"

import { cn } from "@/lib/utils"

interface PortfolioHeroProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  tagline: string
  intro?: string
  /** 社交/联系链接区：放 2–4 个链接或按钮 */
  links?: React.ReactNode
}

function PortfolioHero({ name, tagline, intro, links, className, ...props }: PortfolioHeroProps) {
  return (
    <section
      className={cn("flex flex-col items-start gap-6 py-16 sm:py-24", className)}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <p className="text-body-sm font-medium uppercase tracking-widest text-accent-emphasis">
          {tagline}
        </p>
        <h1 className="max-w-3xl text-h1 font-bold text-fg sm:text-balance">{name}</h1>
        {intro ? <p className="max-w-prose text-body text-fg-muted">{intro}</p> : null}
      </div>
      {links ? <div className="flex flex-wrap items-center gap-3">{links}</div> : null}
    </section>
  )
}

export { PortfolioHero }
