"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface TocItem {
    id: string;
    title: string;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observers = new Map();

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: "-20% 0% -35% 0%",
            threshold: 0.5,
        });

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
                observers.set(item.id, element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    return (
        <nav className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            setActiveId(item.id);
                        }}
                        className={cn(
                            "text-left text-xs uppercase tracking-ds-tight font-semibold transition-all duration-300 relative pl-6 py-2",
                            activeId === item.id
                                ? "text-primary opacity-100"
                                : "text-muted opacity-70 hover:opacity-80 hover:text-main"
                        )}
                    >
                        {activeId === item.id && (
                            <motion.span
                                layoutId="toc-indicator"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        {item.title}
                    </button>
                ))}
            </div>
        </nav>
    );
}
