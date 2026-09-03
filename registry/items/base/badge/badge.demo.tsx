import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Neutral</Badge>
      <Badge variant="accent">Featured</Badge>
      <Badge variant="success">Deployed</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="danger">Failed</Badge>
      <Badge variant="info">Docs</Badge>
      <Badge variant="ai">AI generated</Badge>
    </div>
  )
}
