export interface TemplateColors {
  primary: string;
  accent: string;
  bg: string;
  text: string;
}

export type FontPairingKey = "authority" | "professional" | "modern" | "clean";

export interface FontPairing {
  key: FontPairingKey;
  label: string;
  heading: string;
  body: string;
}

export interface TemplateConfig {
  templateName: "authority" | "trust" | "custom";
  colors: TemplateColors;
  fontPairing: FontPairingKey;
}
