import { VISUAL_CONTENT } from "@/data/visual";
import { VisualGrid } from "@/components/ui/VisualGrid";

export default function VisualPage() {
  return (
    <div className="relative min-h-screen pt-40 pb-20 px-12 md:px-16 max-w-7xl mx-auto">
      <header className="mb-24">
        <span className="text-xs uppercase tracking-widest font-bold text-primary mb-6 block">Art & Design</span>
        <h1 className="text-ds-h2 md:text-ds-h1 font-bold tracking-ds-tight text-main mb-ds-8">
          Visual <span className="high-status-heading italic text-primary font-normal">Portfolio.</span>
        </h1>
        <p className="text-ds-b1 text-muted max-w-3xl leading-relaxed font-medium">
          A curated display of graphic arts, digital paintings, and high-fidelity design experiments across various creative domains.
        </p>
      </header>

      <div className="space-y-32">
        {VISUAL_CONTENT.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-main mb-8 tracking-tight">
                {category.title}
              </h2>
              <p className="text-muted text-sm md:text-base max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <VisualGrid items={category.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
