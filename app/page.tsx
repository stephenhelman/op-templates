"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import OrderModal from "@/components/modal/OrderModal";
import { TemplateConfig } from "@/types/template";

const customConfig: TemplateConfig = {
  templateName: "custom",
  colors: { primary: "#0A0A0A", accent: "#D4AF37", bg: "#0A0A0A", text: "#F5F5F5" },
  fontPairing: "authority",
};

export default function PickerPage() {
  const [customModalOpen, setCustomModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="px-6 py-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-[#D4AF37] mb-3">
          Operation Profit Asset Recovery
        </h1>
        <p className="text-[#A0A0A0] text-base leading-relaxed">
          Professional websites for asset recovery professionals. Choose a
          template below, customize colors and fonts in real time, then place
          your order — we handle the rest.
        </p>
      </header>

      {/* Template Cards */}
      <section className="flex-1 px-6 pb-16 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Authority Template */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col hover:border-[#D4AF37] transition-colors duration-200">
            <div className="bg-[#0A0A0A] h-48 flex items-center justify-center border-b border-[#2A2A2A]">
              <div className="text-center px-4">
                <div
                  className="text-[#D4AF37] text-2xl font-black tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-black-ops-one)" }}
                >
                  AUTHORITY
                </div>
                <div className="text-[#A0A0A0] text-xs uppercase tracking-widest">
                  Bold · Dark · Command
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#F5F5F5] mb-1">
                  Authority Template
                </h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  Dark, bold, high-contrast design that commands trust. Gold
                  accents, military-inspired typography.
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <div className="w-5 h-5 rounded-full bg-[#0A0A0A] border border-[#2A2A2A]" title="Background" />
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]" title="Accent" />
                <div className="w-5 h-5 rounded-full bg-[#F5F5F5] border border-[#2A2A2A]" title="Text" />
              </div>
              <Link
                href="/templates/authority"
                className="block text-center py-3 px-4 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#C09B28] transition-colors duration-200 text-sm"
              >
                Preview &amp; Customize
              </Link>
            </div>
          </div>

          {/* Trust Template */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col hover:border-[#2563EB] transition-colors duration-200">
            <div className="bg-[#1A2B4A] h-48 flex items-center justify-center border-b border-[#2A2A2A]">
              <div className="text-center px-4">
                <div
                  className="text-white text-2xl font-bold tracking-wide mb-1"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Trust
                </div>
                <div className="text-[#93B4E0] text-xs uppercase tracking-widest">
                  Clean · Professional · Credible
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#F5F5F5] mb-1">
                  Trust Template
                </h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  Light, professional layout that communicates credibility.
                  Navy and blue palette with refined serif typography.
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <div className="w-5 h-5 rounded-full bg-[#1A2B4A]" title="Primary" />
                <div className="w-5 h-5 rounded-full bg-[#2563EB]" title="Accent" />
                <div className="w-5 h-5 rounded-full bg-white border border-[#2A2A2A]" title="Background" />
              </div>
              <Link
                href="/templates/trust"
                className="block text-center py-3 px-4 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors duration-200 text-sm"
              >
                Preview &amp; Customize
              </Link>
            </div>
          </div>

          {/* Custom Design Card */}
          <div className="border-2 border-dashed border-[#3A3A3A] rounded-2xl overflow-hidden flex flex-col hover:border-[#D4AF37] transition-colors duration-200">
            <div className="h-48 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-[#A0A0A0] text-4xl mb-2">✦</div>
                <div className="text-[#A0A0A0] text-xs uppercase tracking-widest">
                  Fully Custom
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#F5F5F5] mb-1">
                  Custom Design
                </h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  Not a fan of the templates? Tell us your vision and we&apos;ll
                  build something unique to your brand.
                </p>
              </div>
              <button
                onClick={() => setCustomModalOpen(true)}
                className="mt-auto block w-full text-center py-3 px-4 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-200 text-sm"
              >
                Start Custom Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-center text-[#4A4A4A] text-xs pb-8">
        Operation Profit Asset Recovery is a division of Operation Profit LLC
        &mdash; El Paso, TX
      </footer>

      <Suspense>
        <OrderModal
          config={customConfig}
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          onResetDesign={() => setCustomModalOpen(false)}
          showDesignSummary={false}
          forceCustomInquiry={true}
        />
      </Suspense>
    </main>
  );
}
