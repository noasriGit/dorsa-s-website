import About from './components/sections/About';
import Approach from './components/sections/Approach';
import CoachingApplication from './components/sections/CoachingApplication';
import CoachingFit from './components/sections/CoachingFit';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Reviews from './components/sections/Reviews';
import Services from './components/sections/Services';
import Transformations from './components/sections/Transformations';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Marquee />
        <Approach />
        <Services />
        <Transformations />
        <About />
        <Reviews />
        <CoachingFit />
        <CoachingApplication />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
