"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Logo reveal that plays once per session, then splits open to the site. */
export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ss-intro") === "1";
      sessionStorage.setItem("ss-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 2400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100]" exit={{ transition: { delay: 0.1 } }}>
          {/* two curtains that split apart on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#22252a]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#22252a]"
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ clipPath: "inset(40% 40% 40% 40%)", scale: 0.94, opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(70vw,24rem)] border border-gold/40 shadow-2xl bg-[#282c30] p-1"
            >
              <Image
                src="/logo.jpg"
                alt="SS Interiors — Since 2016"
                width={1000}
                height={1000}
                priority
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
