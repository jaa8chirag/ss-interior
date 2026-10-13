"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 gold-bg" />
        {eyebrow}
        {center && <span className="h-px w-8 gold-bg" />}
      </p>
      <h2 className="font-serif text-4xl font-light leading-tight text-fg md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base text-muted font-light leading-relaxed">{text}</p>}
    </Reveal>
  );
}

export function Button({
  href,
  children,
  variant = "gold",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost";
}) {
  const base = "inline-flex items-center gap-2 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-xs";
  const styles =
    variant === "gold"
      ? "gold-bg text-white hover:brightness-105 shadow-md shadow-gold/25"
      : "border border-gold text-gold hover:bg-gold/10";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
