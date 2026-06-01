import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Life } from "@/components/sections/Life";
import { Resources } from "@/components/sections/Resources";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ImpactNumbers />
      <WhatIDo />
      <Work />
      <Projects />
      <Journey />
      <Resources />
      <Life />
      <Contact />
    </>
  );
}
