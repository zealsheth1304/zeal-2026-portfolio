"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-outline ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                filled: "bg-primary text-on-primary hover:bg-primary/90 shadow-sm",
                elevated: "bg-surface text-foreground shadow-md hover:bg-surface-variant transition-all",
                text: "bg-transparent text-foreground hover:bg-surface-variant",
            },
            size: {
                xs: "h-8 px-3 text-xs gap-1.5",
                s: "h-9 px-4 text-sm gap-2",
                m: "h-11 px-5 text-base gap-2.5",
                l: "h-12 px-6 text-lg gap-3",
                xl: "h-14 px-8 text-xl gap-4",
            },
            shape: {
                pill: "rounded-full",
                rounded: "rounded-xl",
            },
        },
        defaultVariants: {
            variant: "filled",
            size: "m",
            shape: "pill",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, leftIcon, rightIcon, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, shape, className }))}
                ref={ref}
                {...props}
            >
                {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
