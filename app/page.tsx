import Hero from "@/components/hero";
import PageTransition from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  );
}
