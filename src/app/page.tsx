import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Classes } from "@/components/Classes";
import { AboutUs } from "@/components/AboutUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Classes />
        <AboutUs />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
