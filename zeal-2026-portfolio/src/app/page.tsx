import HeroScene from "@/components/three/HeroScene";
import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import Image from 'next/image';
import { ImagePlaceholder } from "@/components/ui/MediaPlaceholders";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-12 md:px-16 pt-ds-20">
        <HeroScene />

        <div className="max-w-7xl mx-auto w-full z-10 pb-24">
          <div className="max-w-4xl">
            <header className="mb-ds-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 pt-24">
              <ImagePlaceholder width="12rem" height="12rem" radius="rounded-full" src="/assets/LandingPage/ZealShethDP.jpg" alt="Zeal" />
              <div className="flex flex-col items-center md:items-start gap-2 mt-4">
                <h1 className="text-ds-h2 md:text-ds-h2 leading-ds-flat font-bold tracking-ds-tight text-main mb-4">
                  Hi, I am Zeal!
                </h1>
                <p className="text-ds-b3 md:text-ds-b3 text-primary max-w-2xl font-bold uppercase tracking-ds-normal">
                  AI-First Product Designer and Strategist
                </p>
              </div>
            </header>
            <hr className="border-border-strong/20 my-10 max-w-3xl border-t" />
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-ds-b2 md:text-ds-b1 text-main max-w-3xl leading-relaxed font-medium">
                I am a Product Designer with a systems-level mindset. My 4+ years of experience in product design backed by 5+ years experience across engineering and multimedia allows me to translate
                complex concepts into tangible outcomes. I specialize in designing data-driven solutions that are that are
                strategically sound, beautiful, functional and technically robust.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-10 md:right-30 hidden md:block rotate-90 origin-right">
          <span className="text-ds-c2 uppercase tracking-ds-widest font-bold text-muted opacity-50">
            Scroll to discover →
          </span>
        </div>
      </section>

      {/* Companies Worked With */}
      <section className="pt-10 pb-16 px-12 md:px-16 max-w-7xl mx-auto bg-main/2">
        <div className="flex flex-col items-center gap-8">
          <span className="text-ds-c2 uppercase tracking-[0.3em] font-bold text-muted/50 text-center">Trusted By</span>
          <div className="w-full max-w-5xl px-4">
            <Image
              src="/assets/LandingPage/CompaniesWorked.svg"
              alt="Companies I have worked with"
              width={1200}
              height={80}
              className="w-full h-auto opacity-100 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* UX Section */}
      <section id="ux" className="py-ds-32 px-12 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-ds-24 gap-ds-8">
          <div>
            <span className="text-ds-c2 uppercase tracking-[0.3em] font-bold text-muted mb-ds-4 block">Selected Archive</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Curation.</h2>
          </div>
          <p className="max-w-xs text-muted text-sm leading-relaxed font-medium">
            A meticulous selection of projects that showcase visual storytelling and technical excellence in the luxury space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ds-12 gap-y-ds-32">
          {projects.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/ux/${project.slug}`}
              className={`group block transition-all duration-500 ${idx % 2 !== 0 ? 'md:mt-40' : ''}`}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-ds-2xl bg-slate-100 dark:bg-slate-900 pb-ds-8 mb-ds-8 px-ds-8">

                {/* THE IMAGE (Contained with Padding) */}
                <div className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-contain py-4" // Ensures the whole image is visible
                  />
                </div>


                <div className="absolute bottom-ds-4 left-ds-8 right-ds-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-ds-4 group-hover:translate-y-0">
                  <div className="bg-white text-black px-ds-6 py-ds-3 rounded-ds-full text-[10px] uppercase tracking-widest font-bold shadow-2xl">
                    View Case Study
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-ds-3 w-full">
                <span className="text-[10px] font-mono text-muted opacity-40">0{idx + 1}</span>
                <h3 className="text-3xl font-semibold text-main group-hover:text-main transition-colors duration-300 w-full min-w-0 break-words">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i}>{i === 0 ? word : <><span> </span><span /* className="high-status-heading italic font-light"*/>{word}</span></>}</span>
                  ))}
                </h3>
                <p className="text-ds-c1 text-main font-medium w-full break-words">{project.description}</p>
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
      </section>

      {/* Testimonials Section */}
      <section className="py-ds-32 px-12 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-ds-20 gap-ds-8">
          <div>
            <span className="text-ds-c2 uppercase tracking-[0.3em] font-bold text-muted mb-ds-4 block">Kind Words</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Voices.</h2>
          </div>
          <p className="max-w-xs text-muted text-sm leading-relaxed font-medium">
            What collaborators and stakeholders say about working together.
          </p>
        </div>

        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </section>
    </div>
  );
}
