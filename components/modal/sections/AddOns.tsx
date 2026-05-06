"use client";

import { useEffect } from "react";
import { AddOnSelections } from "@/lib/sendOrder";

interface AddOnsProps {
  selections: AddOnSelections;
  setSelections: React.Dispatch<React.SetStateAction<AddOnSelections>>;
  onSubtotalChange: (subtotal: number) => void;
}

const ghlOptions = [
  { value: "none" as const, label: "None", price: 0 },
  { value: "basic" as const, label: "Basic", price: 97 },
  { value: "advanced" as const, label: "Advanced", price: 197 },
];

const checkboxAddOns = [
  { key: "multiPage" as const, label: "Multi-Page Site", price: 47 },
  { key: "bilingual" as const, label: "Bilingual (EN + ES)", price: 97 },
  { key: "logoDesign" as const, label: "Logo Design", price: 75 },
  { key: "monthlyRetainer" as const, label: "Monthly Retainer", price: 50, suffix: "/mo" },
];

const includedValue = [
  { feature: "Mobile-responsive design", value: "$500" },
  { feature: "Contact form with email routing", value: "$200" },
  { feature: "SEO meta tags", value: "$150" },
  { feature: "Hosting setup guidance", value: "$100" },
  { feature: "Google Fonts & custom branding", value: "$75" },
];

export default function AddOns({ selections, setSelections, onSubtotalChange }: AddOnsProps) {
  const updateGHL = (value: AddOnSelections["ghlIntegration"]) => {
    setSelections((prev) => ({ ...prev, ghlIntegration: value }));
  };

  const toggleCheck = (key: keyof Omit<AddOnSelections, "ghlIntegration">) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const ghlPrice = ghlOptions.find((o) => o.value === selections.ghlIntegration)?.price ?? 0;
    const checkPrice = checkboxAddOns.reduce((sum, addon) => {
      return sum + (selections[addon.key] ? addon.price : 0);
    }, 0);
    onSubtotalChange(ghlPrice + checkPrice);
  }, [selections, onSubtotalChange]);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Add-Ons
      </h3>

      {/* GHL Integration */}
      <div>
        <label className="block text-xs font-semibold text-[#A0A0A0] mb-2">
          GoHighLevel (GHL) Integration
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ghlOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateGHL(opt.value)}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${
                selections.ghlIntegration === opt.value
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-[#3A3A3A] text-[#A0A0A0] hover:border-[#5A5A5A]"
              }`}
            >
              {opt.label}
              {opt.price > 0 && (
                <span className="block text-[10px] opacity-70">+${opt.price}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-2">
        {checkboxAddOns.map((addon) => (
          <button
            key={addon.key}
            type="button"
            onClick={() => toggleCheck(addon.key)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors text-sm ${
              selections[addon.key]
                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                : "border-[#2A2A2A] hover:border-[#4A4A4A]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  selections[addon.key]
                    ? "bg-[#D4AF37] border-[#D4AF37]"
                    : "border-[#4A4A4A]"
                }`}
              >
                {selections[addon.key] && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#0A0A0A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className={
                  selections[addon.key] ? "text-[#D4AF37]" : "text-[#A0A0A0]"
                }
              >
                {addon.label}
              </span>
            </div>
            <span
              className={`text-xs font-semibold ${
                selections[addon.key] ? "text-[#D4AF37]" : "text-[#6A6A6A]"
              }`}
            >
              +${addon.price}
              {addon.suffix ?? ""}
            </span>
          </button>
        ))}
      </div>

      {/* Included Value Breakdown */}
      <div className="bg-[#1A1A1A] rounded-xl p-4">
        <p className="text-[10px] text-[#6A6A6A] uppercase tracking-widest mb-3">
          Every site includes
        </p>
        <div className="flex flex-col gap-1.5">
          {includedValue.map((item) => (
            <div key={item.feature} className="flex justify-between text-xs">
              <span className="text-[#A0A0A0]">{item.feature}</span>
              <span className="text-[#6A6A6A]">{item.value} value</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
