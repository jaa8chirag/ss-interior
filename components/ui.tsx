"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
      <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg text-muted">{text}</p>}
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
  const base = "inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300";
  const styles =
    variant === "gold"
      ? "gold-bg text-[#2a2a2c] hover:brightness-110"
      : "border border-gold/60 text-gold-light hover:bg-gold/10";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
