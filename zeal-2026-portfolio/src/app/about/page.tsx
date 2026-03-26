import Image from "next/image";
import { MoveRight, Mail, Linkedin, Instagram, Globe, Download } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-40 pb-20 px-12 mt-12 md:px-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
            <div className="absolute inset-0 rounded-2xl border border-primary/20 -rotate-6 scale-105" />
            <div className="relative w-full h-full rounded-2xl -rotate-6 overflow-hidden border border-border-subtle shadow-2xl">
              <Image
                src="/assets/LandingPage/ZealAbout2.webp"
                alt="Zeal Sheth"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-primary mb-6 mt-6 md:mt-0 block">The Impact-Driven Value Creator</span>
            <h1 className="text-5xl md:text-ds-h1 font-bold tracking-tight text-main mb-8 leading-[1.1]">
              Hi, <span className="high-status-heading italic text-primary font-normal">Again!</span>
            </h1>
            <p className="text-ds-b1 text-left text-main max-w-2xl leading-relaxed font-medium">
              Thank you for exploring my work. I blend strategy, tech, and design to solve complex problems. For me, it’s all about creating tangible value and outcomes that stick. If you have an interesting project on the horizon, let’s connect.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Left Column: Work & Education */}
        <div className="lg:col-span-8 space-y-24">

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-bold text-main mb-12 flex items-center gap-4">
              Work Experience
              <span className="h-px flex-1 bg-border-subtle" />
            </h2>
            <div className="space-y-12">
              <ExperienceItem
                role="AI Conversation Design Lead"
                company="XiPhi.ai"
                duration="Jun 2025 - Oct 2025"
                description="Leading design for multi-modal conversational AI and building scalable design systems from the ground up."
              />
              <ExperienceItem
                role="UX Researcher & Product Designer"
                company="Habits for a Better World"
                duration="May 2024 - Present"
                description="Synthesizing research outcomes into actionable design deliverables and leading website design for high-stakes societal impact projects."
              />
              <ExperienceItem
                role="Product Designer"
                company="Userhub"
                duration="Mar 2025 - May 2025"
                description="Crafting intuitive flows for complex software ecosystems with a focus on aesthetic sensibility and technical feasibility."
              />
              <ExperienceItem
                role="Product Designer"
                company="Flux.ai"
                duration="Sep 2023 - Jan 2024"
                description="Collaborating on the 'Stackup Editor' project, delivering technically sound and user-centered designs."
              />

            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-main mb-12 flex items-center gap-4">
              Education
              <span className="h-px flex-1 bg-border-subtle" />
            </h2>
            <div className="space-y-8">
              <ExperienceItem
                role="Master's in Multimedia Design (Interactive Telecommunition Program)"
                company="New York University"
                duration="2021 — 2023"
              />
              <ExperienceItem
                role="Masters in VLSI, Semiconductor, Electronic Systems"
                company="IIT Bombay"
                duration="2013 — 2016"

              />
            </div>
          </section>

          {/* Design Values */}
          <section>
            <h2 className="text-2xl font-bold text-main mb-12 flex items-center gap-4">
              Design Values
              <span className="h-px flex-1 bg-border-subtle" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ValueCard
                title="Systems-Level Thinking"
                description="I don't just design screens; I design scalable systems that bridge the gap between technical complexity and user needs."
              />
              <ValueCard
                title="Aesthetic Precision"
                description="Bringing exceptional taste and creativity to ensure every pixel serves a purpose and every interaction feels premium."
              />
              <ValueCard
                title="Technical Grounding"
                description="My background in semiconductors and engineering ensures designs are not only beautiful but also technically robust and feasible."
              />
              <ValueCard
                title="Outcome-Driven"
                description="Focusing on tangible business and user outcomes over mere outputs, ensuring design directly contributes to success."
              />
            </div>
          </section>

        </div>

        {/* Right Column: Passions, Interests & Connect */}
        <div className="lg:col-span-4 space-y-24">

          {/* Passions & Interests */}
          <section className="sticky top-[100px] bg-main/2 dark:bg-main/4 rounded-3xl p-8 border border-border-subtle">

            <h3 className="text-xl font-bold text-main mb-6 mt-4 md:mt-12">Special Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['AI Agents', 'Sustainable AI', 'AI-Native Product Design', 'Behavioral Design', 'AI Ethics', 'Gamification'].map(interest => (
                <span key={interest} className="px-4 py-2 rounded-full bg-white dark:bg-black border border-border-subtle dark:border-border-strong text-xs font-medium">
                  {interest}
                </span>
              ))}
            </div>


            <div className="my-4 md:my-12">
              {/* Resume & Connect */}
              <Link
                href="/assets/LandingPage/Resume/ZealShethResume.pdf"
                target="_blank"
                className="group flex items-center justify-between p-6 rounded-2xl bg-btn-primary-bg hover:bg-primary hover:text-white text-btn-primary-text hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
              >
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest font-bold opacity-70">Download Full</span>
                  <span className="text-lg font-bold">Resume / CV</span>
                </div>
                <Download size={24} />
              </Link>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ role, company, duration, description }: { role: string, company: string, duration: string, description?: string }) {
  return (
    <div className="group relative pl-8 border-l border-border-subtle">
      <div className="absolute top-0 left-[-5px] h-2.5 w-2.5 rounded-full bg-primary border-4 border-white dark:border-black" />
      <span className="text-xs uppercase tracking-widest font-bold text-primary mb-2 block">{duration}</span>
      <p className="text-ds-b1 font-sans font-bold text-main mb-2">{role}</p>
      <h4 className="text-md font-semibold text-muted mb-2">{company}</h4>
      {description && <p className="text-muted text-sm leading-relaxed max-w-2xl">{description}</p>}
    </div>
  );
}

function ValueCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-border-subtle hover:border-primary/30 transition-colors">
      <p className="text-ds-b1 font-bold text-main mb-3">{title}</p>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ConnectLink({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-full bg-main/5 flex items-center justify-center text-muted group-hover:text-primary group-hover:bg-primary/10 transition-all">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted">{label}</span>
        <span className="text-sm font-semibold text-main group-hover:text-primary transition-colors">{value}</span>
      </div>
    </a>
  );
}
