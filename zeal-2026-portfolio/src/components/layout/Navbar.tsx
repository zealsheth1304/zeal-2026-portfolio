"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Mail, Linkedin, Instagram, Menu, X } from "lucide-react";

const navLinks = [
    { name: "ux", href: "/ux" },
    { name: "Multimedia", href: "/multimedia" },
    { name: "Visual", href: "/visual" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/assets/LandingPage/Resume/ZealShethResume.pdf", isExternal: true },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => setMounted(true), []);

    const logoSrc = mounted && theme === "dark"
        ? "/assets/WebsiteLogo_Favicon/ZealWebsiteLogo_DarkMode.svg"
        : "/assets/WebsiteLogo_Favicon/ZealWebsiteLogo_LightMode.svg";

    // Detect if we're on a case study page
    const isCaseStudy = pathname.startsWith("/ux/");

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
                                maxWidth: scrolled ? 480 : 1200,
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
                                            src={logoSrc}
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
                                                    {link.isExternal ? (
                                                        <a
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs uppercase tracking-widest font-semibold text-muted hover:text-main transition-colors whitespace-nowrap"
                                                        >
                                                            {link.name}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={link.href}
                                                            className="text-xs uppercase tracking-widest font-semibold text-muted hover:text-main transition-colors whitespace-nowrap"
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    )}
                                                </motion.div>
                                            ))}
                                    </AnimatePresence>

                                    <div className="flex items-center gap-4 pl-4 border-l border-border-subtle">
                                        <ThemeToggle />
                                        <AnimatePresence>
                                            {!scrolled && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex items-center gap-3 ml-2 border-l border-border-subtle pl-4"
                                                >
                                                    <a
                                                        href="mailto:zealsheth13@gmail.com"
                                                        className="text-muted hover:text-primary transition-colors p-1"
                                                        title="Email"
                                                    >
                                                        <Mail size={18} />
                                                    </a>
                                                    <a
                                                        href="https://www.linkedin.com/in/zeal-sheth-9ab1b0180/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted hover:text-primary transition-colors p-1"
                                                        title="LinkedIn"
                                                    >
                                                        <Linkedin size={18} />
                                                    </a>
                                                    <a
                                                        href="https://www.instagram.com/zeal.sheth.art/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted hover:text-primary transition-colors p-1"
                                                        title="Instagram"
                                                    >
                                                        <Instagram size={18} />
                                                    </a>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Mobile Menu Toggle */}
                                <div className="md:hidden flex items-center gap-4">
                                    <ThemeToggle />
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="p-2 text-muted bg-main/5 rounded-full hover:bg-main/10 transition-colors"
                                        aria-label="Toggle Menu"
                                    >
                                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.nav>
                    </motion.div>

                    {/* Mobile Menu Overlay */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="fixed inset-x-0 top-[120px] mx-6 md:hidden bg-main-10/50 backdrop-blur-2xl rounded-3xl border border-border-subtle shadow-2xl overflow-hidden z-[49]"
                            >
                                <nav className="flex flex-col p-6 gap-6">
                                    {navLinks.map((link) => (
                                        link.isExternal ? (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-ds-b2 uppercase font-bold text-main hover:text-primary transition-colors flex items-center justify-between"
                                            >
                                                {link.name}
                                                <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded-full">External</span>
                                            </a>
                                        ) : (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="text-ds-b2 uppercase font-bold text-main hover:text-primary transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        )
                                    ))}

                                    <div className="h-px bg-border-subtle my-2" />

                                    <div className="flex items-center gap-6 pt-2">
                                        <a href="mailto:zealsheth13@gmail.com" className="text-main md:text-muted hover:text-primary transition-colors">
                                            <Mail size={22} />
                                        </a>
                                        <a href="https://www.linkedin.com/in/zeal-sheth-9ab1b0180/" target="_blank" rel="noopener noreferrer" className="text-main md:text-muted hover:text-primary transition-colors">
                                            <Linkedin size={22} />
                                        </a>
                                        <a href="https://www.instagram.com/zeal.sheth.art/" target="_blank" rel="noopener noreferrer" className="text-main md:text-muted hover:text-primary transition-colors">
                                            <Instagram size={22} />
                                        </a>
                                    </div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
