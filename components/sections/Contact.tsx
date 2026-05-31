"use client";

import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-14 md:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/5"
    >
      <SectionHeading
        label="11 · contact"
        title={site.contact.hireHeadline}
        titleId="contact-heading"
        className="mb-6"
      />

      <p className="editorial-line text-3xl md:text-5xl text-text max-w-3xl mb-4 leading-snug">
        {site.contact.hireHeadline}
      </p>

      <p className="text-muted text-lg max-w-2xl mb-6 leading-relaxed">
        {site.contact.hireSubtext}
      </p>

      <p className="editorial-line text-2xl md:text-3xl text-text/80 max-w-3xl mb-8">
        {site.closeLine}
      </p>

      <p className="text-base md:text-lg mb-10 leading-relaxed flex flex-wrap gap-x-2 gap-y-2">
        <a
          href={`mailto:${site.contact.email}`}
          className="text-accent hover:underline"
        >
          {site.contact.email}
        </a>
        <span className="text-muted" aria-hidden>
          ·
        </span>
        <a
          href={site.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text hover:text-accent transition-colors"
        >
          linkedin.com/in/sikhaswaroop
        </a>
        <span className="text-muted" aria-hidden>
          ·
        </span>
        <a
          href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
          className="text-muted hover:text-text transition-colors"
        >
          {site.contact.phone}
        </a>
      </p>

      <a
        href={site.contact.cvPath}
        download
        className="inline-block mb-10 px-6 py-3 border border-accent text-accent text-sm hover:bg-accent hover:text-text transition-colors"
      >
        Download CV
      </a>

      <p className="section-label mb-4">languages</p>
      <ul className="flex flex-wrap gap-3 mb-12">
        {site.languages.map((lang) => (
          <li
            key={lang.name}
            className="px-4 py-2 bg-card border border-white/5 text-sm"
          >
            <span className="text-text">{lang.name}</span>
            <span className="text-muted"> · {lang.level}</span>
          </li>
        ))}
      </ul>

      <div className="bg-card border border-white/5 p-8 md:p-10 max-w-3xl">
        <p className="section-label mb-4">open door</p>
        <p className="text-muted leading-relaxed mb-6">{site.openDoor}</p>
        <a
          href={`mailto:${site.contact.email}?subject=Let's talk`}
          className="inline-block px-6 py-3 bg-accent text-text text-sm hover:opacity-90 transition-opacity"
        >
          Hire me — send a message
        </a>
      </div>

      <footer className="mt-14 pt-8 border-t border-white/5">
        <p className="section-label">
          © 2026 {site.name.toLowerCase()} · procurement & marketing strategist
        </p>
      </footer>
    </section>
  );
}
