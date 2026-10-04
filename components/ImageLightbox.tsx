"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption?: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-[#22252a] transition-all"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-7 left-8 text-xs font-mono tracking-widest text-gold/80">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 z-40 p-3 rounded-full border border-line bg-black/50 text-fg hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Image Container */}
        <div className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded shadow-2xl border border-line/40 max-h-[75vh]"
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || "SS Interiors Showcase"}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </motion.div>

          {currentImage.caption && (
            <motion.p
              key={`cap-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center font-serif text-base text-gold-light max-w-xl"
            >
              {currentImage.caption}
            </motion.p>
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-4 md:right-8 z-40 p-3 rounded-full border border-line bg-black/50 text-fg hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
