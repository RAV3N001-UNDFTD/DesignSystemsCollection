import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"

export default function PageHeaderDemo() {
  return (
    <PageHeader
      title="Projects"
      description="Everything shipped from this design system."
      actions={
        <>
          <Button variant="secondary" size="sm">
            Import
          </Button>
          <Button size="sm">New project</Button>
        </>
      }
    />
  )
}
