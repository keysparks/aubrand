import React from 'react';
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { VenuesFeature } from './components/sections/VenuesFeature';
import { DiscoverFeature } from './components/sections/DiscoverFeature';
import { UrgencyFeature } from './components/sections/UrgencyFeature';
import { MessagingFeature } from './components/sections/MessagingFeature';
import { SafetyFeature } from './components/sections/SafetyFeature';
import { OnboardingFeature } from './components/sections/OnboardingFeature';
import { PricingFeature } from './components/sections/PricingFeature';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#010000] text-white selection:bg-[#BF2C40] selection:text-white">
      <Nav />

      <main className="space-y-0">
        <Hero />
        <HowItWorks />
        <VenuesFeature />
        <DiscoverFeature />
        <UrgencyFeature />
        <MessagingFeature />
        <SafetyFeature />
        <OnboardingFeature />
        <PricingFeature />
      </main>

      <Footer />
    </div>
  );
}
