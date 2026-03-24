"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
    src?: string;
    label?: string;
    alt?: string;
    type: "image" | "video";
    rounded?: string;
    className?: string;
    aspectRatio?: string;
    objectFit?: "cover" | "contain";
    width?: string;
    height?: string;
}

export function MediaPlaceholder({
    src,
    label,
    alt,
    type,
    rounded = "rounded-none",
    className,
    aspectRatio,
    objectFit = "cover",
    width,
    height
}: MediaPlaceholderProps) {
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
            <div className={cn("group relative", className)} style={{ width, height }}>
                {/* Visual Container */}
                <div className={cn(
                    "relative overflow-hidden",
                    rounded,
                    !src ? "aspect-video bg-slate-100 dark:bg-slate-950 border border-border-strong/50 shadow-sm cursor-default" : cn("bg-transparent border-none shadow-none cursor-zoom-in", aspectRatio ? "" : "")
                )}
                    style={{
                        aspectRatio: src && aspectRatio ? aspectRatio : undefined,
                        width: "100%",
                        height: "100%"
                    }}
                    onClick={() => src && setIsOpen(true)}
                >
                    {src ? (
                        <div className={cn("relative w-full h-full", aspectRatio ? "" : "")}>
                            {type === "image" ? (
                                <motion.img
                                    layoutId={`media-${src}`}
                                    src={src}
                                    alt={alt || label || ""}
                                    className={cn(
                                        "w-full h-full block transition-transform duration-700 group-hover:scale-[1.01]",
                                        objectFit === "cover" ? "object-cover" : "object-contain"
                                    )}
                                />
                            ) : (
                                <div className={cn("relative w-full h-full")}>
                                    <video
                                        src={src}
                                        className={cn("w-full h-full block object-cover")}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            )}
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

                            {label && (
                                <div className="text-center px-6">
                                    <span className="text-ds-c1 uppercase tracking-[0.3em] font-bold text-main block mb-1">
                                        {type === "image" ? "Visual Asset" : "Interactive Reel"}
                                    </span>
                                    <span className="text-ds-c1 text-muted opacity-80 font-medium italic">
                                        {label}
                                    </span>
                                </div>
                            )}
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
                            {type === "image" ? (
                                <motion.img
                                    layoutId={`media-${src}`}
                                    src={src}
                                    alt={alt || label || ""}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                />
                            ) : (
                                <motion.div
                                    layoutId={`media-${src}`}
                                    className="max-w-full max-h-full aspect-video rounded-lg shadow-2xl overflow-hidden bg-black"
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                >
                                    <video
                                        src={src}
                                        className="w-full h-full object-contain"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

export function ImagePlaceholder({ src, label, alt, width, height, radius, className }: { src?: string; label?: string; alt?: string; width?: string; height?: string; radius?: string; className?: string }) {
    return <MediaPlaceholder src={src} label={label} alt={alt} type="image" width={width} height={height} rounded={radius} className={className} />;
}

export function VideoPlaceholder({ src, label, aspectRatio }: { src?: string; label: string; aspectRatio?: string }) {
    return <MediaPlaceholder src={src} label={label} type="video" aspectRatio={aspectRatio} />;
}

export function CaseStudyImage({ src, label, fullWidth = true, rounded, className, aspectRatio, objectFit }: { src?: string; label: string; fullWidth?: boolean; rounded?: string; className?: string; aspectRatio?: string; objectFit?: "cover" | "contain" }) {
    return (
        <figure className={cn(fullWidth ? "w-full" : "max-w-3xl mx-auto", className)}>
            <MediaPlaceholder src={src} label={label} type="image" rounded={rounded} aspectRatio={aspectRatio} objectFit={objectFit} />
        </figure>
    );
}

export function Video({ src, label, fullWidth = true, rounded, className, aspectRatio }: { src?: string; label: string; fullWidth?: boolean; rounded?: string; className?: string; aspectRatio?: string }) {
    return (
        <figure className={cn(fullWidth ? "w-full" : "max-w-3xl mx-auto", className)}>
            <MediaPlaceholder src={src} label={label} type="video" rounded={rounded} aspectRatio={aspectRatio} />
        </figure>
    );
}

export function VideoEmbed({ url, label, fullWidth = true, rounded = "rounded-2xl", className }: { url: string; label?: string; fullWidth?: boolean; rounded?: string; className?: string }) {
    // Helper to get embed URL
    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const id = url.split('v=')[1] || url.split('/').pop();
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('vimeo.com')) {
            const id = url.split('/').pop();
            return `https://player.vimeo.com/video/${id}`;
        }
        return url;
    };

    return (
        <figure className={cn(fullWidth ? "w-full" : "max-w-3xl mx-auto", className)}>
            <div className={cn("relative w-full aspect-video overflow-hidden shadow-sm border border-border-strong/50", rounded)}>
                <iframe
                    src={getEmbedUrl(url)}
                    title={label || "Video content"}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {label && (
                <figcaption className="mt-4 px-2 text-ds-c1 text-muted opacity-60 font-medium italic text-center">
                    {label}
                </figcaption>
            )}
        </figure>
    );
}

export function FigmaEmbed({ url, label, fullWidth = true, rounded = "rounded-2xl", className, height = "450px" }: { url: string; label?: string; fullWidth?: boolean; rounded?: string; className?: string; height?: string }) {
    const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

    return (
        <figure className={cn(fullWidth ? "w-full" : "max-w-3xl mx-auto", className)}>
            <div className={cn("relative w-full overflow-hidden shadow-sm border border-border-strong/50 bg-slate-50 dark:bg-slate-900/50", rounded)} style={{ height }}>
                <iframe
                    src={embedUrl}
                    title={label || "Figma content"}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                />
            </div>
            {label && (
                <figcaption className="mt-4 px-2 text-ds-c1 text-muted opacity-60 font-medium italic text-center">
                    {label}
                </figcaption>
            )}
        </figure>
    );
}

export function Embed({ url, label, fullWidth = true, rounded = "rounded-2xl", className, height = "450px", aspectRatio }: { url: string; label?: string; fullWidth?: boolean; rounded?: string; className?: string; height?: string; aspectRatio?: string }) {
    return (
        <figure className={cn(fullWidth ? "w-full" : "max-w-3xl mx-auto", className)}>
            <div
                className={cn("relative w-full overflow-hidden shadow-sm border border-border-strong/50 bg-slate-50 dark:bg-slate-900/50", rounded)}
                style={{
                    height: aspectRatio ? 'auto' : height,
                    aspectRatio: aspectRatio
                }}
            >
                <iframe
                    src={url}
                    title={label || "Embedded content"}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                />
            </div>
            {label && (
                <figcaption className="mt-4 px-2 text-ds-c1 text-muted opacity-60 font-medium italic text-center">
                    {label}
                </figcaption>
            )}
        </figure>
    );
}

export function PDFLink({ url, label, description, className }: { url: string; label: string; description?: string; className?: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group flex items-center gap-6 p-6 rounded-2xl border border-border-strong/50 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 my-8",
                className
            )}
        >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <FileText size={28} />
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-bold text-main mb-1 group-hover:text-primary transition-colors">{label}</h4>
                {description && <p className="text-sm text-muted">{description}</p>}
            </div>
            <div className="text-muted group-hover:text-primary transition-colors">
                <ExternalLink size={20} />
            </div>
        </a>
    );
}

export function PDFEmbed({ url, label, aspectRatio = "16/9", totalPages = 10 }: { url: string; label?: string; aspectRatio?: string; totalPages?: number | string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const total = typeof totalPages === "string" ? parseInt(totalPages, 10) : totalPages;

    return (
        <div className="w-full my-12 tracking-normal group/pdf">
            <div className={cn("relative w-full overflow-hidden rounded-none border border-border-strong/50 shadow-sm bg-slate-50 dark:bg-slate-900/50")} style={{ aspectRatio }}>
                <iframe
                    key={currentPage}
                    src={`${url}#page=${currentPage}&view=FitH&toolbar=0&navpanes=0`}
                    title={label || "PDF Document"}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                />

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-md border border-border-strong/50 px-4 py-2 rounded-full shadow-xl opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-1 hover:text-primary disabled:text-muted/30 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-sm font-bold min-w-[3rem] text-center select-none">
                        {currentPage} / {total}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, total))}
                        disabled={currentPage === total}
                        className="p-1 hover:text-primary disabled:text-muted/30 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            {label && (
                <p className="mt-4 text-ds-c1 text-muted opacity-60 font-medium italic text-center">
                    {label}
                </p>
            )}
        </div>
    );
}
