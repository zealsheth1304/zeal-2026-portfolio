"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    photo?: string;
    initials?: string;
    feedback: string;
}

interface Props {
    testimonials: Testimonial[];
    autoPlayMs?: number;
}

const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function TestimonialCarousel({ testimonials, autoPlayMs = 6000 }: Props) {
    const [[index, dir], setPage] = useState([0, 0]);
    const current = testimonials[index];

    const paginate = useCallback(
        (newDir: number) => {
            setPage(([prev]) => [
                (prev + newDir + testimonials.length) % testimonials.length,
                newDir,
            ]);
        },
        [testimonials.length]
    );

    useEffect(() => {
        if (!autoPlayMs) return;
        const id = setInterval(() => paginate(1), autoPlayMs);
        return () => clearInterval(id);
    }, [autoPlayMs, paginate]);

    return (
        <div className="relative w-full">
            {/* Card */}
            <div className="relative overflow-hidden min-h-[280px] flex items-center">
                <AnimatePresence custom={dir} mode="wait">
                    <motion.div
                        key={index}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full"
                    >
                        <div className="glass rounded-ds-2xl border border-border-subtle px-10 py-10 md:px-16 md:py-14 flex flex-col gap-8">
                            {/* Quote icon */}
                            <Quote
                                size={32}
                                className="text-primary opacity-30 fill-primary/10"
                                strokeWidth={1.5}
                            />

                            {/* Feedback */}
                            <p className="text-ds-b1 font-serif italic font-light text-text-main leading-relaxed max-w-3xl">
                                "{current.feedback}"
                            </p>

                            {/* Person */}
                            <div className="flex items-center gap-5 mt-2">
                                {/* Avatar */}
                                {current.photo ? (
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                                        <Image
                                            src={current.photo}
                                            alt={current.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-14 h-14 rounded-full shrink-0 bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                                        <span className="text-primary font-bold text-lg">
                                            {current.initials ?? current.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-text-main tracking-tight">
                                        {current.name}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-widest font-semibold text-text-muted">
                                        {current.role}
                                    </span>
                                    <span className="text-[11px] text-primary font-semibold">
                                        {current.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
                {/* Dot indicators */}
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                i === index
                                    ? "w-6 h-2 bg-primary"
                                    : "w-2 h-2 bg-border-strong opacity-40 hover:opacity-70"
                            )}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-10 h-10 rounded-full border border-border-strong flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="w-10 h-10 rounded-full border border-border-strong flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
