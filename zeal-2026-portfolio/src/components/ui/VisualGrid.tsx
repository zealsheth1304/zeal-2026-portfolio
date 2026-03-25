"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface VisualItem {
  id: string;
  src: string;
  alt: string;
}

interface VisualGridProps {
  items: VisualItem[];
}

export function VisualGrid({ items }: VisualGridProps) {
  const [selectedImage, setSelectedImage] = useState<VisualItem | null>(null);

  // Fallback if images don't exist yet
  const displayItems = items.length > 0 ? items : [];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {displayItems.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`image-${item.id}`}
            className="relative break-inside-avoid rounded-2xl overflow-hidden bg-main/5 cursor-zoom-in group border border-border-subtle"
            onClick={() => setSelectedImage(item)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </div>

            {/* Using a regular img here to avoid next/image issues during development if files are missing, 
                but keeping Next Image commented out for final use. */}
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-auto block"
              loading="lazy"
              onError={(e) => {
                // Show a nice placeholder if image fails
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1a1a1a/ffffff?text=Visual+Asset";
              }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              layoutId={`image-${selectedImage.id}`}
              className="relative max-w-7xl max-h-full overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1a1a1a/ffffff?text=Visual+Preview";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-medium">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
