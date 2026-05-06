import { FontPairing, FontPairingKey, TemplateConfig } from "@/types/template";

export const fontPairings: Record<FontPairingKey, FontPairing> = {
  authority: {
    key: "authority",
    label: "Authority",
    heading: "'Black Ops One', cursive",
    body: "'Barlow Condensed', sans-serif",
  },
  professional: {
    key: "professional",
    label: "Professional",
    heading: "'Playfair Display', serif",
    body: "'DM Sans', sans-serif",
  },
  modern: {
    key: "modern",
    label: "Modern",
    heading: "'Syne', sans-serif",
    body: "'Inter', sans-serif",
  },
  clean: {
    key: "clean",
    label: "Clean",
    heading: "'DM Serif Display', serif",
    body: "'Nunito', sans-serif",
  },
};

export const authorityDefaults: TemplateConfig = {
  templateName: "authority",
  colors: {
    primary: "#0A0A0A",
    accent: "#D4AF37",
    bg: "#0A0A0A",
    text: "#F5F5F5",
  },
  fontPairing: "authority",
};

export const trustDefaults: TemplateConfig = {
  templateName: "trust",
  colors: {
    primary: "#1A2B4A",
    accent: "#2563EB",
    bg: "#FFFFFF",
    text: "#1A2B4A",
  },
  fontPairing: "professional",
};
