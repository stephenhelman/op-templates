"use client";

import { TemplateConfig } from "@/types/template";
import { fontPairings } from "@/lib/templateDefaults";

interface DesignSummaryProps {
  config: TemplateConfig;
}

const colorLabels: { key: keyof TemplateConfig["colors"]; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "accent", label: "Accent" },
  { key: "bg", label: "Background" },
  { key: "text", label: "Text" },
];

export default function DesignSummary({ config }: DesignSummaryProps) {
  const pairing = fontPairings[config.fontPairing];

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Your Design
      </h3>

      <div className="flex items-center gap-3">
        <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">
          Template:
        </span>
        <span className="text-[#F5F5F5] text-sm font-semibold capitalize">
          {config.templateName}
        </span>
      </div>

      {/* Color Swatches */}
      <div>
        <p className="text-[10px] text-[#6A6A6A] uppercase tracking-widest mb-2">
          Colors
        </p>
        <div className="flex gap-3 flex-wrap">
          {colorLabels.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full border border-[#3A3A3A]"
                style={{ backgroundColor: config.colors[key] }}
                title={`${label}: ${config.colors[key]}`}
              />
              <span className="text-[9px] text-[#6A6A6A]">{label}</span>
              <span className="text-[9px] text-[#A0A0A0] font-mono">
                {config.colors[key].toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Font Pairing */}
      <div>
        <p className="text-[10px] text-[#6A6A6A] uppercase tracking-widest mb-2">
          Typography
        </p>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#D4AF37]">
            {pairing.label}
          </span>
          <span className="text-[11px] text-[#A0A0A0]">
            Heading: {pairing.heading.split(",")[0].replace(/'/g, "")}
          </span>
          <span className="text-[11px] text-[#A0A0A0]">
            Body: {pairing.body.split(",")[0].replace(/'/g, "")}
          </span>
        </div>
      </div>
    </div>
  );
}
