"use client";

import { PersistedFormData } from "@/lib/usePersistedForm";
import { statesData } from "@/lib/statesData";

interface ContentSectionProps {
  formData: PersistedFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersistedFormData>>;
}

export default function ContentSection({ formData, setFormData }: ContentSectionProps) {
  const content = formData.content;

  const update = (key: keyof PersistedFormData["content"], value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, [key]: value },
    }));
  };

  const toggleState = (state: string) => {
    const current = content.states;
    const updated = current.includes(state)
      ? current.filter((s) => s !== state)
      : [...current, state];
    update("states", updated);
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#4A4A4A]";
  const labelClass = "block text-xs font-semibold text-[#A0A0A0] mb-1.5";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-widest">
        Website Content
      </h3>
      <p className="text-[11px] text-[#6A6A6A]">
        Optional — leave blank to use our default placeholder copy. You can update this later.
      </p>

      <div>
        <label className={labelClass}>Hero Headline</label>
        <input
          type="text"
          value={content.headline}
          onChange={(e) => update("headline", e.target.value)}
          placeholder="Recover What's Rightfully Yours"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Hero Subheadline</label>
        <textarea
          value={content.subheadline}
          onChange={(e) => update("subheadline", e.target.value)}
          placeholder="We locate and recover unclaimed assets on your behalf — no upfront cost, no risk."
          rows={2}
          className={inputClass + " resize-none"}
        />
      </div>

      <div>
        <label className={labelClass}>About Blurb</label>
        <textarea
          value={content.about}
          onChange={(e) => update("about", e.target.value)}
          placeholder="Tell visitors about your business and experience..."
          rows={3}
          className={inputClass + " resize-none"}
        />
      </div>

      <div>
        <label className={labelClass}>
          States You Serve{" "}
          <span className="font-normal opacity-50">
            ({content.states.length} selected)
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {statesData.map((state) => {
            const checked = content.states.includes(state);
            return (
              <button
                key={state}
                type="button"
                onClick={() => toggleState(state)}
                className={`text-[11px] px-2 py-1.5 rounded border text-left transition-colors ${
                  checked
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-[#2A2A2A] text-[#6A6A6A] hover:border-[#4A4A4A] hover:text-[#A0A0A0]"
                }`}
              >
                {state}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
