import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-fg-on-accent shadow-elevation-1 hover:bg-accent-hover active:bg-accent-active",
        secondary:
          "border border-border bg-surface text-fg hover:border-border-strong hover:bg-sunken",
        destructive:
          "bg-danger text-fg-on-accent shadow-elevation-1 hover:opacity-90 active:opacity-80",
        ghost: "text-fg-muted hover:bg-sunken hover:text-fg",
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-9 px-4 text-body-sm",
        lg: "h-11 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
