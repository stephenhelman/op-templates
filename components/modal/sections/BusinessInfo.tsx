"use client";

import { PersistedFormData } from "@/lib/usePersistedForm";

interface BusinessInfoProps {
  formData: PersistedFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersistedFormData>>;
}

export default function BusinessInfo({ formData, setFormData }: BusinessInfoProps) {
  const update = (key: keyof PersistedFormData["businessInfo"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      businessInfo: { ...prev.businessInfo, [key]: value },
    }));
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#4A4A4A]";
  const labelClass = "block text-xs font-semibold text-[#A0A0A0] mb-1.5";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Business Info
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company / DBA Name *</label>
          <input
            type="text"
            required
            value={formData.businessInfo.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="Apex Asset Recovery"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>LLC Legal Name *</label>
          <input
            type="text"
            required
            value={formData.businessInfo.llcName}
            onChange={(e) => update("llcName", e.target.value)}
            placeholder="Apex Holdings LLC"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>City / State *</label>
          <input
            type="text"
            required
            value={formData.businessInfo.cityState}
            onChange={(e) => update("cityState", e.target.value)}
            placeholder="Dallas, TX"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Contact Email *</label>
          <input
            type="email"
            required
            value={formData.businessInfo.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@yourbusiness.com"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Contact Phone{" "}
            <span className="font-normal opacity-50">(optional)</span>
          </label>
          <input
            type="tel"
            value={formData.businessInfo.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
