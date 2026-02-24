"use client";

import { Button } from "@/components/ui/Button";
import { Star, ArrowRight, Download, Send } from "lucide-react";

export default function TestPage() {
    return (
        <div className="p-10 flex flex-col gap-10 bg-background min-h-screen">
            <section>
                <h1 className="text-3xl font-bold mb-6 text-foreground">Button Variants</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="filled">Filled (Primary)</Button>
                    <Button variant="elevated">Elevated</Button>
                    <Button variant="text">Text (Ghost)</Button>
                    <Button variant="filled" disabled>Disabled</Button>
                </div>
            </section>

            <section>
                <h1 className="text-3xl font-bold mb-6 text-foreground">Button Shapes</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button shape="pill">Pill Shape</Button>
                    <Button shape="rounded">Rounded Shape</Button>
                </div>
            </section>

            <section>
                <h1 className="text-3xl font-bold mb-6 text-foreground">Button Sizes</h1>
                <div className="flex flex-wrap gap-4 items-end">
                    <Button size="xs">Extra Small (XS)</Button>
                    <Button size="s">Small (S)</Button>
                    <Button size="m">Medium (M)</Button>
                    <Button size="l">Large (L)</Button>
                    <Button size="xl">Extra Large (XL)</Button>
                </div>
            </section>

            <section>
                <h1 className="text-3xl font-bold mb-6 text-foreground">Buttons with Icons</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button leftIcon={<Star size={18} />}>Left Icon</Button>
                    <Button rightIcon={<ArrowRight size={18} />}>Right Icon</Button>
                    <Button variant="elevated" leftIcon={<Download size={18} />} rightIcon={<Download size={18} />}>Both Icons</Button>
                    <Button variant="text" rightIcon={<Send size={18} />}>Send Message</Button>
                </div>
            </section>

            <section>
                <h1 className="text-3xl font-bold mb-6 text-foreground">Interactive States</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <p className="text-sm text-foreground/60 w-full mb-2">Try hovering and clicking these:</p>
                    <Button variant="filled" className="px-10">Primary Hover/Active</Button>
                    <Button variant="elevated" className="px-10">Elevated Hover/Active</Button>
                </div>
            </section>
        </div>
    );
}
