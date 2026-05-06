"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TemplateConfig } from "@/types/template";
import { usePersistedForm, PersistedFormData } from "@/lib/usePersistedForm";
import { AddOnSelections, OrderPayload, formatOrderEmail } from "@/lib/sendOrder";
import DesignSummary from "./sections/DesignSummary";
import BusinessInfo from "./sections/BusinessInfo";
import DomainPreference from "./sections/DomainPreference";
import ContentSection from "./sections/ContentSection";
import AddOns from "./sections/AddOns";
import CustomInquiry from "./sections/CustomInquiry";
import OrderSummary from "./sections/OrderSummary";

interface OrderModalProps {
  config: TemplateConfig;
  isOpen: boolean;
  onClose: () => void;
  onResetDesign: () => void;
  showDesignSummary?: boolean;
  forceCustomInquiry?: boolean;
}

const defaultAddOns: AddOnSelections = {
  ghlIntegration: "none",
  multiPage: false,
  bilingual: false,
  logoDesign: false,
  monthlyRetainer: false,
};

export default function OrderModal({
  config,
  isOpen,
  onClose,
  onResetDesign,
  showDesignSummary = true,
  forceCustomInquiry = false,
}: OrderModalProps) {
  const { formData, setFormData, clearDraft, hasDraft } = usePersistedForm();
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [addOns, setAddOns] = useState<AddOnSelections>(defaultAddOns);
  const [addOnSubtotal, setAddOnSubtotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && hasDraft) {
      setShowDraftBanner(true);
    }
  }, [isOpen, hasDraft]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleStartFresh = () => {
    clearDraft();
    setShowDraftBanner(false);
  };

  const handleContinue = () => {
    setShowDraftBanner(false);
  };

  const handleStartOver = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    onResetDesign();
    setShowResetConfirm(false);
    onClose();
  };

  const basePrice = config.templateName === "authority" || config.templateName === "trust"
    ? addOns.multiPage ? 297 : 250
    : 497;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");

    const oneTimeTotal = basePrice + addOnSubtotal - (addOns.monthlyRetainer ? 50 : 0);
    const monthlyTotal = addOns.monthlyRetainer ? 50 : 0;

    const payload: OrderPayload = {
      formData,
      config,
      addOns,
      oneTimeTotal,
      monthlyTotal,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        clearDraft();
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="bg-[#141414] rounded-2xl border border-[#2A2A2A] w-full max-w-2xl shadow-2xl relative"
            ref={scrollRef}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-bold text-[#F5F5F5]">
                Complete Your Order
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartOver}
                  className="text-xs text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors border border-[#3A3A3A] rounded px-2 py-1"
                >
                  Start Over
                </button>
                <button
                  onClick={onClose}
                  className="text-[#A0A0A0] hover:text-[#F5F5F5] text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Draft Banner */}
            <AnimatePresence>
              {showDraftBanner && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mx-6 mt-4 bg-[#1A2B1A] border border-[#2A4A2A] rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <p className="text-sm text-[#6ABF6A] flex-1">
                      We saved your progress from a previous visit.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleContinue}
                        className="text-xs font-bold text-[#6ABF6A] border border-[#6ABF6A] rounded px-3 py-1 hover:bg-[#6ABF6A] hover:text-[#0A0A0A] transition-colors"
                      >
                        Continue
                      </button>
                      <button
                        onClick={handleStartFresh}
                        className="text-xs text-[#A0A0A0] border border-[#3A3A3A] rounded px-3 py-1 hover:border-[#6A6A6A] hover:text-[#F5F5F5] transition-colors"
                      >
                        Start Fresh
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Confirm Dialog */}
            <AnimatePresence>
              {showResetConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#0A0A0A]/90 z-110 flex items-center justify-center p-6"
                >
                  <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-6 max-w-sm w-full text-center">
                    <h3 className="text-base font-bold text-[#F5F5F5] mb-3">
                      Reset Design?
                    </h3>
                    <p className="text-sm text-[#A0A0A0] mb-5">
                      This will reset your template, colors, fonts, and add-on
                      selections. Your business info and content will be saved.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 text-sm border border-[#3A3A3A] text-[#A0A0A0] rounded-lg hover:border-[#6A6A6A] hover:text-[#F5F5F5] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmReset}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      >
                        Reset Design
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success State */}
            {submitStatus === "success" ? (
              <div className="p-10 text-center flex flex-col items-center gap-4">
                <div className="text-5xl">✓</div>
                <h3 className="text-xl font-bold text-[#F5F5F5]">
                  Order Received!
                </h3>
                <p className="text-[#A0A0A0] text-sm max-w-sm">
                  Thank you! We&apos;ve sent a confirmation to{" "}
                  <span className="text-[#D4AF37]">
                    {formData.businessInfo.email}
                  </span>
                  . A specialist will follow up within 1 business day.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#C09B28] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form Content */
              <div className="p-6 flex flex-col gap-6">
                {showDesignSummary && <DesignSummary config={config} />}
                <BusinessInfo formData={formData} setFormData={setFormData} />
                <DomainPreference formData={formData} setFormData={setFormData} />
                <ContentSection formData={formData} setFormData={setFormData} />
                <AddOns
                  selections={addOns}
                  setSelections={setAddOns}
                  onSubtotalChange={setAddOnSubtotal}
                />
                <CustomInquiry formData={formData} setFormData={setFormData} forceExpanded={forceCustomInquiry} />

                {submitStatus === "error" && (
                  <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-sm text-red-300">
                    {submitError}
                  </div>
                )}

                <OrderSummary
                  config={config}
                  addOns={addOns}
                  addOnSubtotal={addOnSubtotal}
                  formData={formData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
