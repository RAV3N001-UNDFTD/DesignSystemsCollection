import { Button } from "@/components/ui/button"
import { PortfolioHero } from "@/components/blocks/portfolio-hero"

export default function PortfolioHeroDemo() {
  return (
    <PortfolioHero
      tagline="Product designer · AI-native"
      name="I design systems that both people and models can build with."
      intro="Currently exploring how design systems become operational inputs for AI agents."
      links={
        <>
          <Button size="sm">Get in touch</Button>
          <Button size="sm" variant="secondary">
            GitHub
          </Button>
          <Button size="sm" variant="ghost">
            Resume
          </Button>
        </>
      }
    />
  )
}
