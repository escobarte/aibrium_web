import { Hero } from "@/components/sections/Hero";
import { ProblemFix } from "@/components/sections/ProblemFix";
import { Work } from "@/components/sections/Work";
import { ExclusiveModels } from "@/components/sections/ExclusiveModels";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemFix />
      <Work />
      <ExclusiveModels />
      <Process />
      <Pricing />
      <Faq />
    </main>
  );
}
