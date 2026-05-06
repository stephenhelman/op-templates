"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateConfig } from "@/types/template";
import { FontPairingKey } from "@/types/template";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";

interface CustomizerPanelProps {
  config: TemplateConfig;
  setConfig: React.Dispatch<React.SetStateAction<TemplateConfig>>;
  defaults: TemplateConfig;
}

export default function CustomizerPanel({
  config,
  setConfig,
  defaults,
}: CustomizerPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateColor = (key: keyof TemplateConfig["colors"], value: string) => {
    setConfig((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const updateFont = (key: FontPairingKey) => {
    setConfig((prev) => ({ ...prev, fontPairing: key }));
  };

  const resetDefaults = () => {
    setConfig(defaults);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="bg-[#1A1A1A] border border-[#3A3A3A] border-r-0 rounded-l-xl px-2 py-4 flex flex-col items-center gap-1 hover:bg-[#252525] transition-colors duration-150 shadow-xl"
        title={isOpen ? "Close customizer" : "Open customizer"}
        aria-label="Toggle customizer panel"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
        <span
          className="text-[10px] text-[#D4AF37] font-bold tracking-wider"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          CUSTOMIZE
        </span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[#141414] border border-[#3A3A3A] rounded-l-2xl shadow-2xl w-64 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#F5F5F5] tracking-wide">
                  Customize
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#6A6A6A] hover:text-[#F5F5F5] text-lg leading-none"
                  aria-label="Close customizer"
                >
                  ×
                </button>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] text-[#6A6A6A] uppercase tracking-widest font-semibold">
                  Colors
                </p>
                <ColorPicker
                  label="Primary"
                  value={config.colors.primary}
                  onChange={(v) => updateColor("primary", v)}
                />
                <ColorPicker
                  label="Accent"
                  value={config.colors.accent}
                  onChange={(v) => updateColor("accent", v)}
                />
                <ColorPicker
                  label="Background"
                  value={config.colors.bg}
                  onChange={(v) => updateColor("bg", v)}
                />
                <ColorPicker
                  label="Text"
                  value={config.colors.text}
                  onChange={(v) => updateColor("text", v)}
                />
              </div>

              {/* Fonts */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] text-[#6A6A6A] uppercase tracking-widest font-semibold">
                  Typography
                </p>
                <FontSelector value={config.fontPairing} onChange={updateFont} />
              </div>

              {/* Reset */}
              <button
                onClick={resetDefaults}
                className="w-full py-2 text-xs border border-[#3A3A3A] text-[#A0A0A0] rounded-lg hover:border-[#6A6A6A] hover:text-[#F5F5F5] transition-colors duration-150"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
