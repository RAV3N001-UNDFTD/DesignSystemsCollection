import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>An AI-native portfolio experiment.</CardDescription>
      </CardHeader>
      <CardContent>
        Built with the DesignSystemsCollection tokens and registry components.
      </CardContent>
      <CardFooter>
        <Button size="sm">View</Button>
        <Button size="sm" variant="ghost">
          Source
        </Button>
      </CardFooter>
    </Card>
  )
}
