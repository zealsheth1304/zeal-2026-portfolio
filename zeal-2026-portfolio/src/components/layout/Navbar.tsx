"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Detect if we're on a case study page
    const isCaseStudy = pathname.startsWith("/work/");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // On case study pages, hide the navbar once the user scrolls down
    const isHidden = isCaseStudy && scrolled;

    return (
        <AnimatePresence>
            {!isHidden && (
                <motion.header
                    key="navbar"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center"
                >
                    {/* Outer wrapper handles vertical padding transition */}
                    <motion.div
                        animate={{ paddingTop: scrolled ? 12 : 28, paddingBottom: scrolled ? 12 : 28 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full flex justify-center px-6"
                    >
                        {/* Inner pill — always has border, shrinks horizontally on scroll */}
                        <motion.nav
                            layout
                            animate={{
                                maxWidth: scrolled ? 680 : 1200,
                            }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full glass rounded-full border border-border-subtle shadow-xl shadow-black/5"
                        >
                            <motion.div
                                animate={{
                                    paddingLeft: scrolled ? 20 : 28,
                                    paddingRight: scrolled ? 20 : 28,
                                    paddingTop: scrolled ? 10 : 14,
                                    paddingBottom: scrolled ? 10 : 14,
                                }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="flex justify-between items-center"
                            >
                                {/* Logo */}
                                <Link href="/" className="flex items-center shrink-0">
                                    <motion.div
                                        animate={{ width: scrolled ? 32 : 56, height: scrolled ? 32 : 56 }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        className="relative"
                                    >
                                        <Image
                                            src="/assets/LandingPage/ZealFaviconWebsite.svg"
                                            alt="Zeal Portfolio"
                                            fill
                                            className="object-contain"
                                        />
                                    </motion.div>
                                </Link>

                                {/* Nav links — hide on scroll when on case study pages */}
                                <div className="hidden md:flex gap-8 items-center">
                                    <AnimatePresence>
                                        {!scrolled &&
                                            navLinks.map((link) => (
                                                <motion.div
                                                    key={link.name}
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className="text-xs uppercase tracking-widest font-semibold text-text-muted hover:text-text-main transition-colors whitespace-nowrap"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                    </AnimatePresence>

                                    <div className="flex items-center gap-4 pl-4 border-l border-border-subtle">
                                        <ThemeToggle />
                                        <Link
                                            href="/#contact"
                                            className="px-5 py-2 rounded-full bg-btn-primary-bg text-btn-primary-text text-xs uppercase tracking-wide font-bold hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                                        >
                                            Contact
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
