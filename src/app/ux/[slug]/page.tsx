import React from 'react';
import { getProjectBySlug, getProjectSlugs, getAllProjects } from "@/lib/mdx";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, MoveRight } from "lucide-react";
import { TableOfContents } from "@/components/ui/TableOfContents";
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
                className="text-4xl font-bold mb-8 mt-16 scroll-mt-32"
                {...props}
            />
        );
    },
    h2: (props: any) => <h2 className="text-2xl font-bold mb-6 mt-12 scroll-mt-32" {...props} />,
    a: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />,
};

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { metadata, content, headings } = getProjectBySlug(slug);

    return (
        <div className="relative min-h-screen">
            <article className="pt-40 pb-20 px-12 md:px-16 max-w-7xl mx-auto">
                <Link
                    href="/#ux"
                    className="inline-flex items-center gap-2 text-muted hover:text-main transition-colors mb-16 text-xs uppercase tracking-widest font-bold"
                >
                    <ArrowLeft size={14} /> Back to Portfolio
                </Link>

                <header className="mb-24">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary mb-6 block">Case Study | CLIENT: {metadata.company}</span>
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-main mb-8 leading-[1.1] max-w-5xl">
                        {metadata.title.split(' ').map((word, i) => (
                            <span key={i}>
                                {i === 0 ? (
                                    <span>{word}</span>
                                ) : (
                                    <span>
                                        {word}
                                    </span>
                                )}
                                {i < metadata.title.split(' ').length - 1 && ' '}
                            </span>
                        ))}
                    </h1>
                    <p className="text-ds-b1 text-muted mb-12 max-w-4xl leading-relaxed font-medium">
                        {metadata.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {metadata.tags.map((tag) => (
                            <span key={tag} className="text-ds-c3 uppercase tracking-widest font-bold px-5 py-2 rounded-full bg-primary/10 text-secondary">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className={`rounded-3xl relative group ${metadata.duration ? "" : "mb-32"}`}>
                    {metadata.heroVideo && (
                        <div className="hidden md:flex rounded-3xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 aspect-video items-center justify-center">
                            <video
                                src={metadata.heroVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    {metadata.heroImage ? (
                        <CaseStudyImage
                            src={metadata.heroImage}
                            label={""}
                            className={`my-16 ${metadata.heroVideo ? 'md:hidden' : ''}`}
                        />
                    ) : !metadata.heroVideo && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted opacity-30">Featured Case Preview</span>
                            </div>
                        </>
                    )}
                </div>

                {metadata.role && metadata.duration && metadata.tools && metadata.team && (
                    <ProjectMeta
                        role={metadata.role}
                        duration={metadata.duration}
                        tools={metadata.tools}
                        team={metadata.team}
                    />
                )}

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    <aside className="w-full md:w-48 flex-shrink-0 hidden md:block sticky top-40 h-fit">
                        <TableOfContents items={headings} />
                    </aside>

                    <div className="flex-1 max-w-3xl">
                        <div className="prose prose-invert prose-lg max-w-none 
                            prose-headings:text-main
                            prose-p:text-muted prose-p:leading-relaxed 
                            prose-strong:text-main prose-strong:font-bold [&_hr]:border-t-border-strong/50 [&_hr]:border-t
                            prose-blockquote:border-border-strong/50 prose-blockquote:text-main prose-blockquote:italic
                            dark:prose-invert text-ds-b1">
                            <MDXRemote source={content} components={components} />
                        </div>
                    </div>
                </div>

                <footer className="mt-40 pt-16 border-t border-border-strong/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    {(() => {
                        const allProjects = getAllProjects();
                        const currentIndex = allProjects.findIndex((p: any) => p.slug === slug);
                        const nextIndex = (currentIndex + 1) % allProjects.length;
                        const nextProject = allProjects[nextIndex];
                        return (
                            <Link href={`/ux/${nextProject.slug}`} className="group flex flex-col md:items-end md:ml-auto gap-2">
                                <div className="flex items-center gap-4 text-xs sentence-case tracking-normal font-bold">
                                    <div className='flex flex-col gap-2'>
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
