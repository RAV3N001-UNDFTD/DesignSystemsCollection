import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-canvas px-3 py-1 text-body-sm text-fg transition-colors duration-150",
        "placeholder:text-fg-subtle",
        "hover:border-border-strong",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent",
        "disabled:cursor-not-allowed disabled:bg-sunken disabled:opacity-50",
        "aria-[invalid=true]:border-danger-border aria-[invalid=true]:ring-danger",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
