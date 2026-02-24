import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    on: "var(--color-on-primary)",
                    container: "var(--color-primary-container)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    on: "var(--color-on-secondary)",
                    container: "var(--color-secondary-container)",
                },
                tertiary: {
                    DEFAULT: "var(--color-tertiary)",
                    on: "var(--color-on-tertiary)",
                },
                surface: {
                    DEFAULT: "var(--color-surface)",
                    variant: "var(--color-surface-variant)",
                    on: "var(--color-on-surface)",
                },
                outline: {
                    DEFAULT: "var(--color-outline)",
                    variant: "var(--color-outline-variant)",
                },
                error: {
                    DEFAULT: "var(--color-error)",
                    on: "var(--color-on-error)",
                },
            },
            spacing: {
                "1": "var(--spacing-1)",
                "2": "var(--spacing-2)",
                "3": "var(--spacing-3)",
                "4": "var(--spacing-4)",
                "5": "var(--spacing-5)",
                "6": "var(--spacing-6)",
                "8": "var(--spacing-8)",
                "10": "var(--spacing-10)",
                "12": "var(--spacing-12)",
                "16": "var(--spacing-16)",
            },
            fontSize: {
                xs: "var(--font-size-xs)",
                s: "var(--font-size-s)",
                m: "var(--font-size-m)",
                l: "var(--font-size-l)",
                xl: "var(--font-size-xl)",
                "2xl": "var(--font-size-2xl)",
                "3xl": "var(--font-size-3xl)",
                "4xl": "var(--font-size-4xl)",
            },
            borderRadius: {
                xs: "var(--radius-xs)",
                s: "var(--radius-s)",
                m: "var(--radius-m)",
                l: "var(--radius-l)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                "3xl": "var(--radius-3xl)",
                full: "var(--radius-full)",
            },
        },
    },
    plugins: [],
};
export default config;
