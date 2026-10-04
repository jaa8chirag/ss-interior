"use client";

import { animate, AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Reveal } from "./ui";

export function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v).toString() + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

export function Accordion({ items }: { items: { title: string; text: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => (
        <div key={it.title}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 py-6 text-left"
          >
            <span className={`font-serif text-xl transition-colors md:text-2xl ${open === i ? "gold-text" : ""}`}>
              {it.title}
            </span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pb-6 text-muted">{it.text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: string[];
  value: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${
            value === t ? "border-transparent text-[#1b1c1e]" : "border-line text-muted hover:border-gold/50 hover:text-gold-light"
          }`}
        >
          {value === t && <motion.span layoutId={`tab-${tabs.join("")}`} className="gold-bg absolute inset-0 rounded-full" />}
          <span className="relative">{t}</span>
        </button>
      ))}
    </div>
  );
}

/** Full-bleed hero with parallax image. `image` omitted => grid/glow "dashboard" hero. */
export function PageHero({
  eyebrow,
  title,
  accent,
  text,
  image,
  cta = "Start a project",
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  image?: string;
  cta?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="grain relative flex min-h-[88vh] items-center overflow-hidden pt-28">
      {image ? (
        <>
          <motion.div
            className="absolute inset-0 -top-10 bottom-[-20%] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})`, y }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </>
      ) : (
        <>
          <div className="grid-lines absolute inset-0" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[130px]" />
        </>
      )}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 gold-bg" /> {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl leading-[1.04] md:text-7xl">
              {title} <span className="gold-text italic">{accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-4">
            <Button href="#contact">{cta}</Button>
            <Button href="#explore" variant="ghost">Explore</Button>
          </Reveal>
        </div>
        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </div>
    </section>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-bg/60 px-3 py-1 text-xs text-gold-light">{children}</span>;
}
