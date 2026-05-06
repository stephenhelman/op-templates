"use client";

import { TemplateConfig } from "@/types/template";
import { AddOnSelections } from "@/lib/sendOrder";
import { PersistedFormData } from "@/lib/usePersistedForm";

interface OrderSummaryProps {
  config: TemplateConfig;
  addOns: AddOnSelections;
  addOnSubtotal: number;
  formData: PersistedFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ghlLabels = { none: "None", basic: "GHL Basic", advanced: "GHL Advanced" };
const ghlPrices = { none: 0, basic: 97, advanced: 197 };

const checkAddOns = [
  { key: "multiPage" as const, label: "Multi-Page Site", price: 47 },
  { key: "bilingual" as const, label: "Bilingual", price: 97 },
  { key: "logoDesign" as const, label: "Logo Design", price: 75 },
  { key: "monthlyRetainer" as const, label: "Monthly Retainer", price: 50 },
];

function getDelivery(addOns: AddOnSelections): string {
  if (addOns.logoDesign) return "10–14 business days";
  if (addOns.bilingual || addOns.ghlIntegration === "advanced") return "7–10 business days";
  if (addOns.multiPage || addOns.ghlIntegration === "basic") return "5–7 business days";
  return "3–5 business days";
}

export default function OrderSummary({
  config,
  addOns,
  addOnSubtotal,
  formData,
  onSubmit,
  isSubmitting,
}: OrderSummaryProps) {
  const isMultiPage = addOns.multiPage;
  const basePrice =
    config.templateName === "authority" || config.templateName === "trust"
      ? isMultiPage
        ? 297
        : 250
      : 497;

  const ghlPrice = ghlPrices[addOns.ghlIntegration];
  const oneTimeAddOns = addOnSubtotal - (addOns.monthlyRetainer ? 50 : 0);
  const oneTimeTotal = basePrice + ghlPrice + oneTimeAddOns;
  const monthlyTotal = addOns.monthlyRetainer ? 50 : 0;

  const { companyName, email } = formData.businessInfo;
  const { preferred1, hasOwnDomain, existingDomain } = formData.domainPreference;
  const hasRequiredFields =
    companyName.trim() !== "" &&
    email.trim() !== "" &&
    (hasOwnDomain ? existingDomain.trim() !== "" : preferred1.trim() !== "");

  const lineClass = "flex justify-between text-sm";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Order Summary
      </h3>

      <div className="bg-[#1A1A1A] rounded-xl p-5 flex flex-col gap-3">
        {/* Base */}
        <div className={lineClass}>
          <span className="text-[#A0A0A0]">
            {config.templateName.charAt(0).toUpperCase() + config.templateName.slice(1)} Template
            {isMultiPage ? " (Multi-Page)" : " (Single Page)"}
          </span>
          <span className="text-[#F5F5F5] font-semibold">${basePrice}</span>
        </div>

        {/* GHL */}
        {addOns.ghlIntegration !== "none" && (
          <div className={lineClass}>
            <span className="text-[#A0A0A0]">{ghlLabels[addOns.ghlIntegration]}</span>
            <span className="text-[#F5F5F5]">+${ghlPrice}</span>
          </div>
        )}

        {/* Checkbox add-ons */}
        {checkAddOns
          .filter((a) => a.key !== "monthlyRetainer" && addOns[a.key])
          .map((a) => (
            <div key={a.key} className={lineClass}>
              <span className="text-[#A0A0A0]">{a.label}</span>
              <span className="text-[#F5F5F5]">+${a.price}</span>
            </div>
          ))}

        <div className="border-t border-[#2A2A2A] pt-3 mt-1">
          <div className={lineClass}>
            <span className="font-bold text-[#F5F5F5]">One-Time Total</span>
            <span className="font-bold text-[#D4AF37] text-base">${oneTimeTotal}</span>
          </div>
          {monthlyTotal > 0 && (
            <div className={lineClass + " mt-1"}>
              <span className="text-[#A0A0A0]">Monthly Retainer</span>
              <span className="text-[#F5F5F5]">+${monthlyTotal}/mo</span>
            </div>
          )}
        </div>

        <div className="border-t border-[#2A2A2A] pt-3">
          <div className={lineClass}>
            <span className="text-[#6A6A6A] text-xs">Estimated Delivery</span>
            <span className="text-[#A0A0A0] text-xs font-semibold">
              {getDelivery(addOns)}
            </span>
          </div>
        </div>
      </div>

      {!hasRequiredFields && (
        <p className="text-[11px] text-[#6A6A6A] text-center">
          Fill in company name, email, and at least one domain field to submit.
        </p>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!hasRequiredFields || isSubmitting}
        className="w-full py-4 font-bold text-base rounded-xl transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#D4AF37",
          color: "#0A0A0A",
        }}
      >
        {isSubmitting ? "Submitting…" : "Submit Order"}
      </button>

      <p className="text-[10px] text-[#4A4A4A] text-center">
        No payment collected now. We&apos;ll invoice you after reviewing your order.
      </p>
    </div>
  );
}
