import HeroScene from "@/components/three/HeroScene";
import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import Image from 'next/image';
import { ImagePlaceholder } from "@/components/ui/MediaPlaceholders";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Home() {
  const projects = getAllProjects().slice(0, 6);

  return (

    <div className="relative">

      <div className="relative min-h-screen pt-36 pb-16 px-12 md:px-20 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mt-32 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
              <div className="absolute inset-0 rounded-2xl border border-primary/20 -rotate-6 scale-105" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border-subtle shadow-2xl">
                <Image
                  src="/assets/LandingPage/ZealShethDP.jpg"
                  alt="Zeal Sheth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-primary mb-6 block">The Designer Behind the Craft</span>
              <h1 className="text-5xl md:text-ds-h1 font-bold tracking-tight text-main mb-8 leading-[1.1]">
                Hi, I'm <span className="high-status-heading italic text-primary font-normal">Zeal.</span>
              </h1>
              <p className="text-ds-b1 text-main max-w-3xl text-left leading-relaxed font-medium">
                I am an <span className="font-bold">AI-First Product Designer and Strategist</span> with a systems-level mindset. I specialize in designing data-driven solutions that are
                strategically sound, beautiful, functional and technically robust. With a background in semiconductors, engineering, and multimedia, I approach problems with technical precision and aesthetic excellence to design outcomes that scale.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Companies Worked With */}
      <section className="pt-10 pb-16 px-12 md:px-16 max-w-7xl mx-auto bg-main/3 dark:bg-bg-inverse/4">
        <div className="flex flex-col items-center gap-8">
          <span className="text-ds-c2 uppercase tracking-[0.3em] font-bold text-muted/50 text-center">Trusted By</span>
          <div className="w-full max-w-5xl px-4">
            {/* Light Mode Image */}
            <img
              src="/assets/LandingPage/CompaniesWorked.svg"
              alt="Companies"
              className="block dark:hidden w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark Mode Image */}
            <img
              src="/assets/LandingPage/CompaniesWorked_DarkMode.svg"
              alt="Companies"
              className="hidden dark:block w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>



      {/* UX Section */}
      <section id="ux" className="py-ds-32 px-12 md:px-16 max-w-7xl mx-auto border-b border-main/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-ds-24 gap-ds-8">
          <div>
            <span className="text-ds-c2 uppercase tracking-[0.3em] font-bold text-muted mb-ds-4 block">Selected Archive</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Curation.</h2>
          </div>
          <p className="max-w-xs text-muted text-sm leading-relaxed font-medium">
            A meticulous selection of projects that showcase visual storytelling and technical excellence in the luxury space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ds-16 gap-y-ds-12">
          {projects.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/ux/${project.slug}`}
              className={`group block transition-all duration-500 ${idx % 2 !== 0 ? 'mt-8 md:mt-16' : 'mt-8 md:mt-16'}`}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-ds-2xl bg-main/5 dark:bg-main/10 pb-ds-8 mb-ds-8 px-ds-8">

                {/* THE IMAGE (Contained with Padding) */}
                <div className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-contain py-8" // Ensures the whole image is visible
                  />
                </div>


                <div className="absolute bottom-ds-4 left-ds-8 right-ds-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-ds-4 group-hover:translate-y-0">
                  <div className="bg-white text-black px-ds-6 py-ds-3 rounded-ds-full text-[10px] uppercase tracking-widest font-bold shadow-2xl">
                    View Case Study
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-ds-3 w-full">
                {/*<span className="text-[10px] font-mono text-muted opacity-40">0{idx + 1}</span>*/}
                <h3 className="text-3xl font-semibold text-main group-hover:text-main transition-colors duration-300 w-full min-w-0 break-words">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i}>{i === 0 ? word : <><span> </span><span /* className="high-status-heading italic font-light"*/>{word}</span></>}</span>
                  ))}
                </h3>
                <p className="text-ds-c1 text-main dark:text-muted font-medium w-full break-words">{project.description}</p>
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
