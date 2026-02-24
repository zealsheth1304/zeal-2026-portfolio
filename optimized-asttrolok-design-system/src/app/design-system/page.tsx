"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
    Palette,
    Type,
    Layout,
    Square,
    MousePointer2,
    ChevronRight,
    Info,
    Layers,
    Component,
    Star,
    ArrowRight,
    Download,
    Send,
    Code
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components for the Preview Page ---

const Section = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) => (
    <section id={id} className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-outline/20">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon size={24} />
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">{title}</h2>
        </div>
        {children}
    </section>
);

const ColorCard = ({ name, variable, value }: { name: string, variable: string, value: string }) => (
    <div className="flex flex-col group">
        <div
            className="h-32 w-full rounded-2xl shadow-sm border border-outline/10 mb-3 transition-transform group-hover:scale-[1.02]"
            style={{ backgroundColor: value }}
        />
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <code className="text-[10px] text-foreground/50 mt-1 uppercase">{value}</code>
        <code className="text-[10px] text-primary mt-0.5">{variable}</code>
    </div>
);

const TokenRow = ({ name, value, desc }: { name: string, value: string, desc: string }) => (
    <tr className="border-b border-outline/5 hover:bg-surface-variant/30 transition-colors">
        <td className="py-4 pl-4 font-mono text-xs text-primary">{name}</td>
        <td className="py-4 font-mono text-xs text-foreground/70">{value}</td>
        <td className="py-4 text-sm text-foreground/50">{desc}</td>
    </tr>
);

export default function DesignSystemPage() {
    const [activeTab, setActiveTab] = useState("colors");

    const colors = [
        { name: "Primary", variable: "--color-primary", value: "#f8c400" },
        { name: "Secondary", variable: "--color-secondary", value: "#ffe68a" },
        { name: "Tertiary", variable: "--color-tertiary", value: "#92ffbe" },
        { name: "Surface", variable: "--color-surface", value: "#fffdf9" },
        { name: "Surface Variant", variable: "--color-surface-variant", value: "#fff9e5" },
        { name: "Background", variable: "--color-background", value: "#fffdf9" },
        { name: "Outline", variable: "--color-outline", value: "#a68400" },
        { name: "Foreground", variable: "--color-foreground", value: "#100f0e" },
    ];

    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
            {/* Sidebar Navigation */}
            <aside className="w-72 border-r border-outline/10 hidden lg:block sticky top-0 h-screen p-8 bg-surface/50 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-xl shadow-lg shadow-primary/20">
                        A
                    </div>
                    <span className="font-bold text-xl tracking-tighter uppercase">Asttrolok</span>
                </div>

                <nav className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-4 px-3">Foundations</p>
                    {[
                        { id: "colors", label: "Colors", icon: Palette },
                        { id: "typography", label: "Typography", icon: Type },
                        { id: "spacing", label: "Spacing & Layout", icon: Layout },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-surface-variant group",
                                activeTab === item.id ? "bg-primary text-on-primary shadow-lg shadow-primary/10" : "text-foreground/60"
                            )}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon size={18} />
                            {item.label}
                            <ChevronRight className={cn("ml-auto opacity-0 transition-opacity group-hover:opacity-100", activeTab === item.id && "opacity-100")} size={14} />
                        </a>
                    ))}

                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-12 mb-4 px-3">Components</p>
                    {[
                        { id: "buttons", label: "Buttons", icon: MousePointer2 },
                        { id: "forms", label: "Form Elements", icon: Square, disabled: true },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                item.disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-surface-variant text-foreground/60",
                                activeTab === item.id && !item.disabled && "bg-primary text-on-primary shadow-lg shadow-primary/10"
                            )}
                            onClick={() => !item.disabled && setActiveTab(item.id)}
                        >
                            <item.icon size={18} />
                            {item.label}
                            {item.disabled && <span className="ml-auto text-[8px] border border-outline/20 px-1 rounded uppercase">Soon</span>}
                        </a>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-surface-variant/50 border border-outline/5 text-[10px] text-foreground/40 leading-relaxed">
                    <div className="font-bold text-foreground/60 mb-1 flex items-center gap-1 uppercase tracking-wider">
                        <Info size={10} /> Design System v0.1
                    </div>
                    Built with Next.js 15, Tailwind v4 and Zeal Design Tokens.
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-20 max-w-7xl mx-auto">
                <header className="mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Layers size={12} /> Design Guidelines
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black text-foreground tracking-tightest mb-8">
                        Asttrolok <span className="text-primary italic">Visuals.</span>
                    </h1>
                    <p className="text-xl text-foreground/60 max-w-2xl leading-relaxed">
                        A premium, high-fidelity design system optimized for performant user interfaces.
                        Powered by atomic design tokens and functional components.
                    </p>
                </header>

                {/* Colors Section */}
                <Section title="Color Palette" icon={Palette} id="colors">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {colors.map((color) => (
                            <ColorCard key={color.variable} {...color} />
                        ))}
                    </div>
                </Section>

                {/* Typography Section */}
                <Section title="Typography" icon={Type} id="typography">
                    <div className="space-y-12">
                        {[
                            { label: "Display Large", class: "text-6xl font-black tracking-tighter" },
                            { label: "Heading 1", class: "text-4xl font-bold tracking-tight" },
                            { label: "Heading 2", class: "text-2xl font-semibold" },
                            { label: "Body Regular", class: "text-m font-normal leading-relaxed text-foreground/70" },
                            { label: "Label Small", class: "text-xs font-bold uppercase tracking-widest text-primary" },
                        ].map((text, i) => (
                            <div key={i} className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-20">
                                <span className="w-32 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{text.label}</span>
                                <p className={text.class}>The quick brown fox jumps over the lazy dog</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Spacing Section */}
                <Section title="Spacing Scale" icon={Layout} id="spacing">
                    <div className="overflow-x-auto rounded-3xl border border-outline/10 bg-surface">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-variant/50 border-b border-outline/10">
                                    <th className="py-4 pl-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Token</th>
                                    <th className="py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Value</th>
                                    <th className="py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TokenRow name="spacing-1" value="0.25rem (4px)" desc="Atomic spacing unit" />
                                <TokenRow name="spacing-4" value="1.00rem (16px)" desc="Standard base padding" />
                                <TokenRow name="spacing-8" value="2.00rem (32px)" desc="Section spacing" />
                                <TokenRow name="spacing-16" value="4.00rem (64px)" desc="Hero level margins" />
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* Button Component Section */}
                <Section title="Buttons" icon={MousePointer2} id="buttons">
                    <div className="bg-surface border border-outline/5 p-12 rounded-[40px] shadow-sm">
                        <div className="space-y-20">
                            {/* Variants */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 mb-8 px-4 border-l-4 border-primary">
                                    <Component size={14} /> Style Variants
                                </h4>
                                <div className="flex flex-wrap gap-8 items-center bg-white/40 p-10 rounded-3xl">
                                    <div className="flex flex-col items-center gap-4">
                                        <Button variant="filled">Filled Action</Button>
                                        <span className="text-[10px] font-medium text-foreground/40 italic">Filled / Primary</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <Button variant="elevated">Elevated State</Button>
                                        <span className="text-[10px] font-medium text-foreground/40 italic">Elevated / Surface</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <Button variant="text">Ghost Action</Button>
                                        <span className="text-[10px] font-medium text-foreground/40 italic">Text / Ghost</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shapes and Icons */}
                            <div className="grid lg:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 mb-8 px-4 border-l-4 border-primary">
                                        <Square size={14} /> Shapes & Icons
                                    </h4>
                                    <div className="flex flex-wrap gap-4 bg-white/40 p-10 rounded-3xl">
                                        <Button shape="pill" leftIcon={<Star size={16} />}>Pill Icon</Button>
                                        <Button shape="rounded" rightIcon={<ArrowRight size={16} />}>Rounded Icon</Button>
                                        <Button variant="elevated" shape="rounded" leftIcon={<Download size={16} />} />
                                        <Button variant="text" rightIcon={<Send size={16} />}>Text Link</Button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 mb-8 px-4 border-l-4 border-primary">
                                        <Code size={14} /> Usage Hint
                                    </h4>
                                    <div className="bg-grey-100 p-8 rounded-3xl text-xs font-mono text-primary leading-loose shadow-2xl">
                                        <p className="text-white/40 mb-2">// Copy-paste the standard usage</p>
                                        <p className="text-yellow-40">{"<Button variant=\"filled\" size=\"xl\" shape=\"pill\">"}</p>
                                        <p className="pl-4">{"Launch Experience"}</p>
                                        <p className="text-yellow-40">{"</Button>"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <footer className="mt-40 pt-10 border-t border-outline/10 text-center text-foreground/30 text-xs">
                    © 2026 Zeal Asttrolok. Designed with purpose.
                </footer>
            </main>
        </div>
    );
}
