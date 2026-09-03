import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-body-sm font-medium text-fg">
          Email
        </label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="bad" className="text-body-sm font-medium text-fg">
          With error
        </label>
        <Input id="bad" aria-invalid={true} aria-describedby="bad-error" defaultValue="oops" />
        <p id="bad-error" className="text-body-sm text-danger">
          This value is not valid.
        </p>
      </div>
    </div>
  )
}
