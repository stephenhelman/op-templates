"use client";

import { useRef } from "react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/^#[0-9A-Fa-f]{0,6}$/.test(raw)) {
      onChange(raw);
    }
  };

  const handleHexBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[#A0A0A0] font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-8 h-8 rounded border border-[#3A3A3A] flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
          style={{ backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(value) ? value : "#000000" }}
          title={`Pick ${label} color`}
        />
        <input
          ref={inputRef}
          type="color"
          value={/^#[0-9A-Fa-f]{6}$/.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
          maxLength={7}
          className="flex-1 bg-[#1A1A1A] border border-[#3A3A3A] rounded px-2 py-1 text-xs text-[#F5F5F5] font-mono outline-none focus:border-[#D4AF37] w-24"
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
}
