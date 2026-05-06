"use client";

import { FontPairingKey } from "@/types/template";
import { fontPairings } from "@/lib/templateDefaults";

interface FontSelectorProps {
  value: FontPairingKey;
  onChange: (key: FontPairingKey) => void;
}

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-[#A0A0A0] font-medium">Font Style</label>
      <div className="grid grid-cols-2 gap-2">
        {(Object.values(fontPairings) as typeof fontPairings[FontPairingKey][]).map((pairing) => (
          <button
            key={pairing.key}
            type="button"
            onClick={() => onChange(pairing.key)}
            className={`px-3 py-2 rounded-lg border text-left transition-colors duration-150 ${
              value === pairing.key
                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                : "border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#5A5A5A]"
            }`}
          >
            <div
              className="text-sm font-semibold text-[#F5F5F5] leading-tight"
              style={{ fontFamily: pairing.heading }}
            >
              {pairing.label}
            </div>
            <div className="text-[10px] text-[#6A6A6A] mt-0.5 truncate">
              {pairing.heading.split(",")[0].replace(/'/g, "")}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
