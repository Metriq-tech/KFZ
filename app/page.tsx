import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main id="content" className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
