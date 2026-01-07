import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "glass" | "solid" | "outline";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "solid", ...props }, ref) => {
        const variants = {
            solid: "bg-[var(--personality-card)] shadow-sm",
            glass: "bg-[var(--personality-card)]/70 backdrop-blur-md border border-[var(--personality-text)]/10 shadow-xl",
            outline: "border border-[var(--personality-text)]/10 bg-transparent",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-3xl",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
