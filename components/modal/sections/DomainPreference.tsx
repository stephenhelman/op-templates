"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PersistedFormData } from "@/lib/usePersistedForm";

const registrars = [
  "GoDaddy",
  "Namecheap",
  "Ionos",
  "Cloudflare",
  "Google Domains",
  "Squarespace",
  "Other",
];

interface DomainPreferenceProps {
  formData: PersistedFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersistedFormData>>;
}

export default function DomainPreference({ formData, setFormData }: DomainPreferenceProps) {
  const dp = formData.domainPreference;

  const update = (key: keyof PersistedFormData["domainPreference"], value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      domainPreference: { ...prev.domainPreference, [key]: value },
    }));
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#4A4A4A]";
  const labelClass = "block text-xs font-semibold text-[#A0A0A0] mb-1.5";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Domain
      </h3>

      {/* Radio Toggle */}
      <div>
        <label className={labelClass}>Do you have a domain already?</label>
        <div className="flex gap-3">
          {[
            { label: "No — I need one", value: false },
            { label: "Yes — I have one", value: true },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => update("hasOwnDomain", opt.value)}
              className={`flex-1 py-2 px-3 text-xs rounded-lg border font-semibold transition-colors ${
                dp.hasOwnDomain === opt.value
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-[#3A3A3A] text-[#A0A0A0] hover:border-[#5A5A5A]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!dp.hasOwnDomain ? (
          <motion.div
            key="no-domain"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[11px] text-[#6A6A6A]">
              Enter up to 3 domain name preferences (e.g. apexassetrecovery.com). We&apos;ll register the best available one.
            </p>
            {(["preferred1", "preferred2", "preferred3"] as const).map((field, i) => (
              <div key={field}>
                <label className={labelClass}>
                  Preference {i + 1}{i === 0 ? " *" : " (optional)"}
                </label>
                <input
                  type="text"
                  value={dp[field]}
                  onChange={(e) => update(field, e.target.value)}
                  placeholder={`myassetrecovery${i === 0 ? "" : i === 1 ? "-pro" : "-llc"}.com`}
                  className={inputClass}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="has-domain"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-3"
          >
            <div>
              <label className={labelClass}>Existing Domain *</label>
              <input
                type="text"
                value={dp.existingDomain}
                onChange={(e) => update("existingDomain", e.target.value)}
                placeholder="yourdomain.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Domain Registrar *</label>
              <select
                value={dp.registrar}
                onChange={(e) => update("registrar", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="">Select registrar...</option>
                {registrars.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <AnimatePresence>
              {dp.registrar === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <label className={labelClass}>Specify Registrar *</label>
                  <input
                    type="text"
                    value={dp.registrarOther}
                    onChange={(e) => update("registrarOther", e.target.value)}
                    placeholder="e.g. Porkbun"
                    className={inputClass}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
