"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  label: string;
  /** Screen-reader heading when it differs from the visible label */
  title?: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
};

export function SectionShell({
  id,
  label,
  title,
  children,
  className = "",
  headingClassName,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 py-14 md:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto ${className}`}
    >
      <SectionHeading
        label={label}
        title={title}
        titleId={`${id}-heading`}
        className={headingClassName}
      />
      {children}
    </section>
  );
}
