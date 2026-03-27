import React from 'react';
import { getMultimediaBySlug, getMultimediaSlugs, getAllMultimedia } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, MoveRight } from "lucide-react";
import { ImagePlaceholder, VideoPlaceholder, CaseStudyImage, Video, VideoEmbed, FigmaEmbed, Embed, PDFLink, PDFEmbed } from "@/components/ui/MediaPlaceholders";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ProjectMeta } from "@/components/ui/ProjectMeta";

const extractText = (children: any): string => {
    return React.Children.toArray(children)
        .map(child => {
            if (typeof child === 'string') return child;
            if (typeof child === 'object' && child && 'props' in (child as any)) {
                return extractText((child as any).props.children);
            }
            return '';
        })
        .join('');
};

const components = {
    ImagePlaceholder,
    VideoPlaceholder,
    CaseStudyImage,
    Video,
    VideoEmbed,
    FigmaEmbed,
    Embed,
    PDFLink,
    PDFEmbed,
    ImageCarousel,
    ProjectMeta,
    h1: (props: any) => {
        const text = extractText(props.children);
        const id = text.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');

        return (
            <h1
                id={id}
                className="text-3xl font-bold mb-6 mt-12 scroll-mt-32 border-b border-border-strong/30 pb-4"
                {...props}
            />
        );
    },
    h2: (props: any) => <h2 className="text-xl font-bold mb-4 mt-8 scroll-mt-32" {...props} />,
    a: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />,
};

export async function generateStaticParams() {
    const slugs = getMultimediaSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

export default async function MultimediaProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { metadata, content } = getMultimediaBySlug(slug);

    return (
        <div className="relative min-h-screen">
            <article className="pt-40 pb-20 px-12 md:px-16 max-w-5xl mx-auto">
                <Link
                    href="/multimedia"
                    className="inline-flex items-center gap-2 text-muted hover:text-main transition-colors mb-16 text-xs uppercase tracking-widest font-bold"
                >
                    <ArrowLeft size={14} /> Back to Multimedia
                </Link>

                <header className="mb-20">
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-main mb-8 leading-[1.1]">
                        {metadata.title}
                    </h1>
                    <p className="text-ds-b1 text-muted mb-12 max-w-4xl leading-relaxed font-medium">
                        {metadata.description}
                    </p>

                    <div className="flex flex-col md:flex-col-1 gap-8 py-8 border-y border-border-strong/30 my-12">
                        {metadata.team && (
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Team</span>
                                <span className="text-sm font-medium">{metadata.team}</span>
                            </div>
                        )}
                        {metadata.tools && (
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Tools</span>
                                <span className="text-sm font-medium">{metadata.tools}</span>
                            </div>
                        )}
                    </div>
                </header>

                <div className="mb-20">
                    {metadata.heroVideo ? (
                        <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
                            <video
                                src={metadata.heroVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : metadata.heroImage && (
                        <CaseStudyImage
                            src={metadata.heroImage}
                            label={metadata.title}
                            className="rounded-3xl overflow-hidden shadow-2xl"
                        />
                    )}
                </div>

                <div className="max-w-5xl">
                    <div className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-main
                        prose-p:text-muted prose-p:leading-relaxed 
                        prose-strong:text-main prose-strong:font-bold [&_hr]:border-t-border-strong/50 [&_hr]:border-t
                        prose-blockquote:border-border-strong/50 prose-blockquote:text-main prose-blockquote:italic
                        dark:prose-invert text-ds-b1">
                        <MDXRemote source={content} components={components} />
                    </div>
                </div>

                <footer className="mt-40 pt-16 border-t border-border-strong/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    {(() => {
                        const allProjects = getAllMultimedia();
                        const currentIndex = allProjects.findIndex((p: any) => p.slug === slug);
                        const nextIndex = (currentIndex + 1) % allProjects.length;
                        const nextProject = allProjects[nextIndex];
                        return (
                            <Link href={`/multimedia/${nextProject.slug}`} className="group flex flex-col md:items-end md:ml-auto gap-2">
                                <div className="flex items-end gap-4 text-xs sentence-case tracking-normal font-bold">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-muted text-left md:text-right">Next Project</span>
                                        <span className="text-sm md:text-base text-main text-left md:text-right">{nextProject.title}</span>
                                    </div>
                                    <span className="w-10 h-10 shrink-0 rounded-full border border-border-strong/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                        <MoveRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })()}
                </footer>
            </article>
        </div>
    );
}
