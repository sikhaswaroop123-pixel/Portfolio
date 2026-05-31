"use client";

import { twoHalves } from "@/content/twoHalves";
import { SectionShell } from "@/components/layout/SectionShell";
import { EASE_OUT, VIEWPORT_ONCE } from "@/components/ui/motionPresets";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

function BrainCard({
  title,
  items,
  description,
}: {
  title: string;
  items: readonly string[];
  description: string;
}) {
  return (
    <div className="bg-card border border-white/5 p-8 md:p-10 h-full flex flex-col">
      <h3 className="font-serif text-2xl text-accent mb-6">{title}</h3>
      <ul className="space-y-2 text-text mb-8 flex-grow">
        {items.map((item) => (
          <li key={item} className="text-sm md:text-base">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function TwoHalves() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <SectionShell id="thinking" label="04 · how i think">
      <div ref={ref}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={false}
            animate={
              show
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -40 }
            }
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
          >
            <BrainCard
              title={twoHalves.moneyBrain.title}
              items={twoHalves.moneyBrain.items}
              description={twoHalves.moneyBrain.description}
            />
          </motion.div>

          <motion.div
            initial={false}
            animate={
              show
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 40 }
            }
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.3,
              ease: EASE_OUT,
            }}
          >
            <BrainCard
              title={twoHalves.customerBrain.title}
              items={twoHalves.customerBrain.items}
              description={twoHalves.customerBrain.description}
            />
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
