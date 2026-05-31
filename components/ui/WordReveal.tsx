"use client";

import { motion, useReducedMotion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  id?: string;
};

export function WordReveal({
  text,
  className = "",
  as: Tag = "h1",
  id,
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.28em] last:mr-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15 + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
