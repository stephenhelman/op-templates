"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { TemplateConfig } from "@/types/template";
import { trustDefaults, fontPairings } from "@/lib/templateDefaults";
import CustomizerPanel from "@/components/customizer/CustomizerPanel";
import OrderModal from "@/components/modal/OrderModal";
import Hero from "@/components/sections/Hero";
import ImpactNumbers from "@/components/sections/ImpactNumbers";
import HowItWorks from "@/components/sections/HowItWorks";
import StatesWeServe from "@/components/sections/StatesWeServe";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export default function TrustTemplatePage() {
  const [config, setConfig] = useState<TemplateConfig>(trustDefaults);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pairing = fontPairings[config.fontPairing];

  const cssVars = {
    "--color-primary": config.colors.primary,
    "--color-accent": config.colors.accent,
    "--color-bg": config.colors.bg,
    "--color-text": config.colors.text,
    "--font-heading": pairing.heading,
    "--font-body": pairing.body,
  } as React.CSSProperties;

  const handleResetDesign = () => {
    setConfig(trustDefaults);
  };

  return (
    <div style={cssVars}>
      <Hero />
      <ImpactNumbers />
      <HowItWorks />
      <StatesWeServe />
      <FAQ />
      <About />
      <ContactForm />
      <Footer />

      <CustomizerPanel
        config={config}
        setConfig={setConfig}
        defaults={trustDefaults}
      />

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center gap-3 pb-4 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-full shadow-2xl transition-all hover:bg-[#2A2A2A] border border-[#3A3A3A]"
          style={{ backgroundColor: "#1A1A1A", color: "#A0A0A0" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All Templates
        </Link>
        <button
          className="pointer-events-auto px-10 py-3 font-bold text-sm rounded-full shadow-2xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
          onClick={() => setIsModalOpen(true)}
        >
          Choose This Template
        </button>
      </div>

      <Suspense>
        <OrderModal
          config={config}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onResetDesign={handleResetDesign}
        />
      </Suspense>
    </div>
  );
}
