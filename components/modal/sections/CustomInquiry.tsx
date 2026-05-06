"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { PersistedFormData } from "@/lib/usePersistedForm";

interface CustomInquiryProps {
  formData: PersistedFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersistedFormData>>;
  forceExpanded?: boolean;
}

export default function CustomInquiry({ formData, setFormData, forceExpanded = false }: CustomInquiryProps) {
  const searchParams = useSearchParams();
  const isCustomMode = forceExpanded || searchParams.get("custom") === "true";

  useEffect(() => {
    if (isCustomMode) {
      setFormData((prev) => ({
        ...prev,
        customInquiry: { ...prev.customInquiry, enabled: true },
      }));
    }
  }, [isCustomMode, setFormData]);

  const toggle = (enabled: boolean) => {
    setFormData((prev) => ({
      ...prev,
      customInquiry: { ...prev.customInquiry, enabled },
    }));
  };

  const updateMessage = (message: string) => {
    setFormData((prev) => ({
      ...prev,
      customInquiry: { ...prev.customInquiry, message },
    }));
  };

  const enabled = formData.customInquiry.enabled;

  if (forceExpanded) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#A0A0A0]">
          Describe Your Vision *
        </label>
        <textarea
          value={formData.customInquiry.message}
          onChange={(e) => updateMessage(e.target.value)}
          required
          placeholder="Tell us about your brand — style references, colors, features, any sites you like, etc."
          rows={5}
          className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#4A4A4A] resize-none"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => toggle(!enabled)}
        className={`flex items-center gap-3 text-sm py-3 px-4 rounded-xl border transition-colors ${
          enabled
            ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
            : "border-[#2A2A2A] text-[#6A6A6A] hover:border-[#4A4A4A] hover:text-[#A0A0A0]"
        }`}
      >
        <span className="text-base">{enabled ? "✦" : "+"}</span>
        <span className="font-semibold">
          Prefer a custom design not shown? Inquire below
        </span>
      </button>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <textarea
              value={formData.customInquiry.message}
              onChange={(e) => updateMessage(e.target.value)}
              required={isCustomMode}
              placeholder="Describe your vision — brand colors, style references, specific features, etc."
              rows={4}
              className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#4A4A4A] resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
