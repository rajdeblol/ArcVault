/**
 * Index — Main marketplace landing page.
 *
 * Layout follows a standard SaaS pattern: hero → social proof → features → CTA.
 * Adapted for web3: the "features" section is the actual marketplace listings,
 * and the HowItWorks section doubles as technical education about MPC.
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DataListings from "@/components/DataListings";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DataListings />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
