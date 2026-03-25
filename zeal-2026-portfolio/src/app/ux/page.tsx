import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";

export default function UXPage() {
  const projects = getAllProjects();

  return (
    <div className="pt-40 pb-20 px-12 md:px-16 max-w-7xl mx-auto">
      <header className="mb-ds-24 max-w-4xl">
        <span className="text-ds-c1 uppercase tracking-ds-normal font-bold text-primary mb-ds-6 block">
          Crafting Meaningful Experiences
        </span>
        <h1 className="text-ds-h2 md:text-ds-h1 font-bold tracking-ds-tight text-main mb-ds-8">
          UX <span className="high-status-heading italic text-primary">Case Studies.</span>
        </h1>
        <p className="text-ds-b1 text-muted max-w-3xl leading-relaxed font-medium">
          A deep dive into my process of solving complex problems through research, strategy, and user-centered design.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ds-12 gap-y-ds-32">
        {projects.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/ux/${project.slug}`}
            className="group block transition-all duration-500"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-ds-2xl bg-slate-100 dark:bg-slate-900 mb-ds-8 px-ds-8">
              <div className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
                {project.heroVideo ? (
                  <video
                    src={project.heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-contain py-8"
                  />
                )}
              </div>

              <div className="absolute bottom-ds-4 left-ds-8 right-ds-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-ds-4 group-hover:translate-y-0">
                <div className="bg-white text-black px-ds-6 py-ds-3 rounded-ds-full text-[10px] uppercase tracking-widest font-bold shadow-2xl">
                  View Case Study
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-ds-3 w-full px-2">
              <span className="text-[10px] font-mono text-muted opacity-40">0{idx + 1}</span>
              <h3 className="text-3xl font-semibold text-main group-hover:text-main transition-colors duration-300 w-full min-w-0 break-words">
                {project.title.split(' ').map((word, i) => (
                  <span key={i}>{i === 0 ? word : <><span> </span><span /* className="high-status-heading italic font-light"*/>{word}</span></>}</span>
                ))}
              </h3>
              <p className="text-ds-c1 text-muted font-medium w-full break-words leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-x-ds-4 gap-y-ds-2 mt-ds-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest font-semibold text-primary-text bg-primary/10 rounded-ds-full px-ds-3 py-ds-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
