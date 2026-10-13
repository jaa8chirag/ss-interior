"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

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
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when navigating slides or opening/closing
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      if (e.key === "+" || e.key === "=") setIsZoomed(true);
      if (e.key === "-") setIsZoomed(false);
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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % images.length);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-4 select-none"
      >
        {/* Top Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 inset-x-4 md:inset-x-8 z-50 flex items-center justify-between pointer-events-auto"
        >
          {/* Slide Counter & Brand Badge */}
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-[#c5a059]/40 rounded-full px-4 py-1.5 text-xs text-white shadow-lg">
            <span className="font-mono text-[#c5a059] font-semibold tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[11px] uppercase tracking-widest text-white/70 hidden sm:inline">
              SS Interiors High-Res Showcase
            </span>
          </div>

          {/* Action Buttons: Zoom & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleZoom}
              title={isZoomed ? "Zoom Out" : "Zoom In (1.6x)"}
              className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-lg backdrop-blur-md ${
                isZoomed
                  ? "bg-[#c5a059] text-[#0d0e12] border-[#c5a059]"
                  : "bg-black/60 text-white/90 border-white/20 hover:border-[#c5a059] hover:text-[#c5a059]"
              }`}
            >
              {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            </button>

            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all cursor-pointer shadow-lg backdrop-blur-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Previous Slide Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 md:left-8 z-40 p-3 sm:p-3.5 rounded-full border border-white/20 bg-black/60 text-white hover:border-[#c5a059] hover:text-[#c5a059] hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:prev-7" />
          </button>
        )}

        {/* GRAND FULL-BLEED IMAGE STAGE */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-[90vh] md:h-[93vh] max-w-[96vw] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.55 : 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={toggleZoom}
            className={`relative flex items-center justify-center max-h-[88vh] md:max-h-[92vh] max-w-[95vw] ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage.url}
              alt={currentImage.caption || "SS Interiors Showcase"}
              className="max-h-[88vh] md:max-h-[92vh] max-w-[95vw] w-auto h-auto object-contain rounded-sm shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>

        {/* FLOATING CAPTION BAR (AT BOTTOM - DOES NOT SQUEEZE THE IMAGE) */}
        {currentImage.caption && (
          <motion.div
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 sm:bottom-6 inset-x-4 mx-auto max-w-3xl z-40 pointer-events-none"
          >
            <div className="bg-black/80 backdrop-blur-md border border-[#c5a059]/35 rounded-full px-5 py-2.5 text-center shadow-2xl">
              <p className="font-serif text-xs sm:text-sm text-[#f6eee0] tracking-wide leading-relaxed drop-shadow-md">
                {currentImage.caption}
              </p>
            </div>
          </motion.div>
        )}

        {/* Next Slide Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 md:right-8 z-40 p-3 sm:p-3.5 rounded-full border border-white/20 bg-black/60 text-white hover:border-[#c5a059] hover:text-[#c5a059] hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
