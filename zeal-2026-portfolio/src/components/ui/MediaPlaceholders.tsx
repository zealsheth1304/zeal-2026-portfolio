"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
    src?: string;
    label: string;
    type: "image" | "video";
}

export function MediaPlaceholder({ src, label, type }: MediaPlaceholderProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Prevent scrolling on body when lightbox is open
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <div className="my-16 group">
                {/* Visual Container */}
                <div className={cn(
                    "rounded-2xl relative",
                    !src ? "aspect-video bg-slate-100 dark:bg-slate-950 border border-border-strong/50 shadow-sm overflow-hidden cursor-default" : "bg-transparent border-none shadow-none overflow-visible cursor-zoom-in"
                )}
                    onClick={() => src && setIsOpen(true)}
                >
                    {src ? (
                        <div className="relative w-full">
                            <motion.img
                                layoutId={`media-${src}`}
                                src={src}
                                alt={label}
                                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-500 flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-border-strong/50 flex items-center justify-center text-muted group-hover:scale-110 group-hover:border-primary group-hover:text-primary transition-all duration-500 shadow-xl bg-background/20">
                                {type === "video" ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                )}
                            </div>

                            <div className="text-center px-6">
                                <span className="text-ds-c1 uppercase tracking-[0.3em] font-bold text-main block mb-1">
                                    {type === "image" ? "Visual Asset" : "Interactive Reel"}
                                </span>
                                <span className="text-ds-c1 text-muted opacity-80 font-medium italic">
                                    {label}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Caption */}
                {label && src && (
                    <div className="mt-4 px-2">
                        <span className="text-ds-c1 text-muted opacity-60 font-medium italic block text-center">
                            {label}
                        </span>
                    </div>
                )}
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isOpen && src && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-background/90 backdrop-blur-md cursor-zoom-out"
                            onClick={() => setIsOpen(false)}
                        />
                        <div
                            className="relative z-10 max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4 cursor-zoom-out"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.img
                                layoutId={`media-${src}`}
                                src={src}
                                alt={label}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

export function ImagePlaceholder({ src, label }: { src?: string; label: string }) {
    return <MediaPlaceholder src={src} label={label} type="image" />;
}

export function VideoPlaceholder({ src, label }: { src?: string; label: string }) {
    return <MediaPlaceholder src={src} label={label} type="video" />;
}

export function CaseStudyImage({ src, label, fullWidth = true }: { src?: string; label: string; fullWidth?: boolean }) {
    return (
        <figure className={cn("my-16", fullWidth ? "w-full" : "max-w-3xl mx-auto")}>
            <MediaPlaceholder src={src} label={label} type="image" />
        </figure>
    );
}
