"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-16 h-8" />;

    const isDark = theme === "dark";

    return (
        <div
            className="relative flex items-center p-1 cursor-pointer w-16 h-9 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors duration-500 shadow-inner"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            suppressHydrationWarning
        >
            {/* Background Icons */}
            <div className="absolute inset-x-0 px-2 flex justify-between items-center pointer-events-none opacity-40">
                <Moon size={14} className="text-slate-400" />
                <Sun size={14} className="text-slate-400" />
            </div>

            {/* Sliding Toggle Handle */}
            <motion.div
                animate={{ x: isDark ? 0 : 28 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative z-10 w-7 h-7 rounded-full shadow-lg flex items-center justify-center bg-white dark:bg-slate-900"
            >
                {isDark ? (
                    <Moon size={14} className="text-primary fill-primary/20" />
                ) : (
                    <Sun size={14} className="text-amber-500 fill-amber-500/20" />
                )}
            </motion.div>
        </div>
    );
}
