export interface VisualItem {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface VisualCategory {
  id: string;
  title: string;
  description: string;
  items: VisualItem[];
}

export const VISUAL_CONTENT: VisualCategory[] = [
  {
    id: "graphic-illustration",
    title: "Graphic Illustration",
    description: "Digital illustrations exploring character design, vector art, and conceptual storytelling.",
    items: [
      { id: "gi-1", src: "/assets/Visual/GraphicIllustration/Illustration1.webp", alt: "Illustration1" },
      { id: "gi-2", src: "/assets/Visual/GraphicIllustration/Illustration2.webp", alt: "Illustration2" },
      { id: "gi-3", src: "/assets/Visual/GraphicIllustration/Illustration3.webp", alt: "Illustration3" },
      { id: "gi-4", src: "/assets/Visual/GraphicIllustration/Illustration4.webp", alt: "Illustration4" },
      { id: "gi-5", src: "/assets/Visual/GraphicIllustration/Illustration5.webp", alt: "Illustration5" },
      { id: "gi-6", src: "/assets/Visual/GraphicIllustration/Illustration6.webp", alt: "Illustration6" },
      { id: "gi-7", src: "/assets/Visual/GraphicIllustration/Illustration7.webp", alt: "Illustration7" },
      { id: "gi-8", src: "/assets/Visual/GraphicIllustration/Illustration8.webp", alt: "Illustration8" },
    ]
  },
  {
    id: "ui-branding",
    title: "UI & Branding",
    description: "Visual identity systems including logos, color palettes, and brand guidelines.",
    items: [
      { id: "ui-1", src: "/assets/Visual/UI_Branding/UI5.webp", alt: "UI5" },
      { id: "ui-2", src: "/assets/Visual/UI_Branding/UI4.webp", alt: "UI4" },
      { id: "ui-3", src: "/assets/Visual/UI_Branding/UI3.webp", alt: "UI3" },
      { id: "ui-4", src: "/assets/Visual/UI_Branding/UI2.webp", alt: "UI2" },
      { id: "ui-5", src: "/assets/Visual/UI_Branding/UI1.webp", alt: "UI1" },
    ]
  },
  {
    id: "painting",
    title: "Painting",
    description: "Traditional and digital paintings focusing on texture, color theory, and emotional depth.",
    items: [
      { id: "p-1", src: "/assets/Visual/Painting/Painting14.webp", alt: "Painting 14" },
      { id: "p-2", src: "/assets/Visual/Painting/Painting13.webp", alt: "Painting 13" },
      { id: "p-3", src: "/assets/Visual/Painting/Painting12.webp", alt: "Painting 12" },
      { id: "p-4", src: "/assets/Visual/Painting/Painting11.webp", alt: "Painting 11" },
      { id: "p-5", src: "/assets/Visual/Painting/Painting10.webp", alt: "Painting 10" },
      { id: "p-6", src: "/assets/Visual/Painting/Painting9.webp", alt: "Painting 9" },
      { id: "p-7", src: "/assets/Visual/Painting/Painting8.webp", alt: "Painting 8" },
      { id: "p-8", src: "/assets/Visual/Painting/Painting7.webp", alt: "Painting 7" },
      { id: "p-9", src: "/assets/Visual/Painting/Painting6.webp", alt: "Painting 6" },
      { id: "p-10", src: "/assets/Visual/Painting/Painting5.webp", alt: "Painting 5" },
      { id: "p-11", src: "/assets/Visual/Painting/Painting4.webp", alt: "Painting 4" },
      { id: "p-12", src: "/assets/Visual/Painting/Painting3.webp", alt: "Painting 3" },
      { id: "p-13", src: "/assets/Visual/Painting/Painting2.webp", alt: "Painting 2" },
      { id: "p-14", src: "/assets/Visual/Painting/Painting1.webp", alt: "Painting 1" },
    ]
  }
];
