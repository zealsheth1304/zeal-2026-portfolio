import Link from 'next/link';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-border-strong/30 bg-main dark:bg-main/10 mt-16">
            <div className="max-w-7xl mx-auto px-12 md:px-16 py-12 md:py-20 flex flex-col items-center">

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-xs uppercase tracking-widest font-semibold text-inverse/70 dark:text-main/70">
                    <Link href="/ux" className="hover:text-inverse dark:hover:text-main transition-colors">UX</Link>
                    <Link href="/multimedia" className="hover:text-inverse dark:hover:text-main transition-colors">Multimedia</Link>
                    <Link href="/visual" className="hover:text-inverse dark:hover:text-main transition-colors">Visual</Link>
                    <Link href="/about" className="hover:text-inverse dark:hover:text-main transition-colors">About</Link>
                    <a href="/assets/LandingPage/Resume/ZealShethResume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-inverse dark:hover:text-main transition-colors flex items-center gap-1">
                        Resume
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-8 mb-8 text-inverse/70 dark:text-main/70">
                    <a href="mailto:zealsheth13@gmail.com" className="hover:text-inverse dark:hover:text-main transition-colors">
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                    <a href="https://www.linkedin.com/in/zeal-sheth-9ab1b0180/" target="_blank" rel="noopener noreferrer" className="hover:text-inverse dark:hover:text-main transition-colors">
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/zeal.sheth.art/" target="_blank" rel="noopener noreferrer" className="hover:text-inverse dark:hover:text-main transition-colors">
                        <Instagram size={20} />
                        <span className="sr-only">Instagram</span>
                    </a>
                </div>

                {/* Signature Text */}
                <div className="text-center">
                    <p className="text-ds-b1 font-medium text-primary-inverse dark:text-primary">
                        Vibe-coding with ❤️ by Zeal Sheth. Spreading Good Vibes Only 😊.
                    </p>
                </div>

            </div>
        </footer>
    );
}
