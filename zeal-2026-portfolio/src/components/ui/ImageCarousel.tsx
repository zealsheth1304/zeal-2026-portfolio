"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselImage {
    src?: string;
    label: string;
}

interface ImageCarouselProps {
    images: CarouselImage[] | string;
    className?: string;
    rounded?: string;
    aspectRatio?: string;
    maxWidth?: string;
}

export function ImageCarousel({ 
    images: rawImages, 
    className, 
    rounded = "rounded-2xl",
    aspectRatio,
    maxWidth = "max-w-5xl"
}: ImageCarouselProps) {
    let images: CarouselImage[] = [];
    if (typeof rawImages === "string") {
        try {
            images = JSON.parse(rawImages);
        } catch (e) {
            console.error("Failed to parse images prop:", e);
        }
    } else if (Array.isArray(rawImages)) {
        images = rawImages;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
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

    if (!images || images.length === 0) return null;

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    return (
        <div className={cn("relative w-full mx-auto my-16 group", maxWidth, className)}>
            <div className={cn("relative dark:bg-slate-950", aspectRatio || "aspect-[16/9] md:aspect-[21/9]")}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute inset-0 flex items-center justify-center px-8 md:px-16 py-4"
                    >
                        {images.length > 0 && images[currentIndex].src ? (
                            <div className="relative w-full h-full flex items-center justify-center cursor-zoom-in" onClick={() => setIsOpen(true)}>
                                <motion.img
                                    layoutId={`carousel-${images[currentIndex].src}`}
                                    src={images[currentIndex].src}
                                    alt={images[currentIndex].label}
                                    className={cn("max-w-full max-h-full object-contain", rounded)}
                                    draggable={false}
                                />
                            </div>
                        ) : (
                            <div className="text-center text-muted flex flex-col items-center gap-4">
                                <span className="uppercase tracking-[0.3em] font-bold block mb-2 text-ds-c1 text-main">Visual Asset</span>
                                <span className="italic opacity-80">{images[currentIndex].label}</span>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border-strong/50 flex items-center justify-center text-text-main hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
                            onClick={() => paginate(-1)}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border-strong/50 flex items-center justify-center text-text-main hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
                            onClick={() => paginate(1)}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* Pagination Dots */}
            {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                index === currentIndex
                                    ? "w-6 h-2 bg-primary opacity-100 scale-115"
                                    : "w-2 h-2 bg-primary opacity-25 hover:opacity-60"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Caption */}
            <div className="mt-6 px-2">
                <span className="text-ds-c1 text-muted opacity-60 font-medium italic block text-center transition-all">
                    {images[currentIndex].label}
                </span>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isOpen && images[currentIndex].src && (
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
                                layoutId={`carousel-${images[currentIndex].src}`}
                                src={images[currentIndex].src}
                                alt={images[currentIndex].label}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
