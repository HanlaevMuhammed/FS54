import * as React from "react"
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, asChild = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "px-4 py-2 rounded-md font-medium transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                    className
                )}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"
