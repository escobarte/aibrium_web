import { Hero } from "@/components/sections/Hero";
import { ProblemFix } from "@/components/sections/ProblemFix";
import { Work } from "@/components/sections/Work";
import { ExclusiveModels } from "@/components/sections/ExclusiveModels";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemFix />
      <Work />
      <ExclusiveModels />
    </main>
  );
}
