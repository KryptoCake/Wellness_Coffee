import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "panic" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-[var(--personality-accent)] text-white hover:opacity-90 shadow-md",
            ghost: "hover:bg-black/5 dark:hover:bg-white/5 text-[var(--personality-text)]",
            outline: "border border-[var(--personality-accent)] text-[var(--personality-accent)] hover:bg-[var(--personality-accent)] hover:text-white",
            panic: "bg-red-600 text-white animate-pulse hover:bg-red-700 shadow-lg shadow-red-200",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-6 py-2",
            lg: "h-12 px-8 text-lg",
            icon: "h-10 w-10 flex items-center justify-center p-0",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
