import Link from 'next/link';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-border-strong/30 bg-main mt-16">
            <div className="max-w-7xl mx-auto px-12 md:px-16 py-12 md:py-20 flex flex-col items-center">

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-xs uppercase tracking-widest font-bold text-inverse/70">
                    <Link href="/ux" className="hover:text-inverse transition-colors">UX</Link>
                    <Link href="/multimedia" className="hover:text-inverse transition-colors">Multimedia</Link>
                    <Link href="/visual" className="hover:text-inverse transition-colors">Visual</Link>
                    <Link href="/about" className="hover:text-inverse transition-colors">About</Link>
                    <a href="/assets/LandingPage/Resume/ZealShethResume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-inverse transition-colors flex items-center gap-1">
                        Resume
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-8 mb-8 text-inverse/70">
                    <a href="mailto:zealsheth13@gmail.com" className="hover:text-inverse transition-colors">
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                    <a href="https://www.linkedin.com/in/zeal-sheth-9ab1b0180/" target="_blank" rel="noopener noreferrer" className="hover:text-inverse transition-colors">
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/zeal.sheth.art/" target="_blank" rel="noopener noreferrer" className="hover:text-inverse transition-colors">
                        <Instagram size={20} />
                        <span className="sr-only">Instagram</span>
                    </a>
                </div>

                {/* Signature Text */}
                <div className="text-center">
                    <p className="text-ds-b1 font-medium text-muted">
                        Vibe-coding with ❤️ by Zeal Sheth. <span className="text-muted">Spreading Good Vibes Only</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}
