import { PersistedFormData } from "./usePersistedForm";
import { TemplateConfig } from "@/types/template";
import { fontPairings } from "./templateDefaults";

interface AddOnSelections {
  ghlIntegration: "none" | "basic" | "advanced";
  multiPage: boolean;
  bilingual: boolean;
  logoDesign: boolean;
  monthlyRetainer: boolean;
}

interface OrderPayload {
  formData: PersistedFormData;
  config: TemplateConfig;
  addOns: AddOnSelections;
  oneTimeTotal: number;
  monthlyTotal: number;
}

export function formatOrderEmail(payload: OrderPayload): string {
  const { formData, config, addOns, oneTimeTotal, monthlyTotal } = payload;
  const pairing = fontPairings[config.fontPairing];

  const lines: string[] = [];

  lines.push("=== NEW WEBSITE ORDER ===");
  lines.push("");

  // Design Summary
  lines.push("--- DESIGN ---");
  lines.push(`Template: ${config.templateName.charAt(0).toUpperCase() + config.templateName.slice(1)}`);
  lines.push(`Colors:`);
  lines.push(`  Primary: ${config.colors.primary}`);
  lines.push(`  Accent:  ${config.colors.accent}`);
  lines.push(`  Background: ${config.colors.bg}`);
  lines.push(`  Text:    ${config.colors.text}`);
  lines.push(`Font Pairing: ${pairing.label} (${pairing.heading.split(",")[0].replace(/'/g, "")} / ${pairing.body.split(",")[0].replace(/'/g, "")})`);
  lines.push("");

  // Business Info
  lines.push("--- BUSINESS INFO ---");
  lines.push(`Company/DBA Name: ${formData.businessInfo.companyName}`);
  lines.push(`LLC Legal Name:   ${formData.businessInfo.llcName}`);
  lines.push(`City/State:       ${formData.businessInfo.cityState}`);
  lines.push(`Email:            ${formData.businessInfo.email}`);
  lines.push(`Phone:            ${formData.businessInfo.phone || "Not provided"}`);
  lines.push("");

  // Domain
  lines.push("--- DOMAIN ---");
  if (formData.domainPreference.hasOwnDomain) {
    lines.push(`Has Domain: Yes`);
    lines.push(`Domain: ${formData.domainPreference.existingDomain}`);
    const registrar =
      formData.domainPreference.registrar === "Other"
        ? `Other — ${formData.domainPreference.registrarOther}`
        : formData.domainPreference.registrar;
    lines.push(`Registrar: ${registrar}`);
  } else {
    lines.push(`Has Domain: No`);
    lines.push(`Preference 1: ${formData.domainPreference.preferred1 || "Not provided"}`);
    lines.push(`Preference 2: ${formData.domainPreference.preferred2 || "Not provided"}`);
    lines.push(`Preference 3: ${formData.domainPreference.preferred3 || "Not provided"}`);
  }
  lines.push("");

  // Content
  lines.push("--- CONTENT ---");
  lines.push(`Headline:    ${formData.content.headline || "Not provided"}`);
  lines.push(`Subheadline: ${formData.content.subheadline || "Not provided"}`);
  lines.push(`About Blurb: ${formData.content.about || "Not provided"}`);
  lines.push(`States Served: ${formData.content.states.length > 0 ? formData.content.states.join(", ") : "Not specified"}`);
  lines.push("");

  // Add-Ons
  lines.push("--- ADD-ONS ---");
  lines.push(`GHL Integration: ${addOns.ghlIntegration === "none" ? "None" : addOns.ghlIntegration === "basic" ? "Basic (+$97)" : "Advanced (+$197)"}`);
  lines.push(`Multi-Page: ${addOns.multiPage ? "Yes (+$47)" : "No"}`);
  lines.push(`Bilingual:  ${addOns.bilingual ? "Yes (+$97)" : "No"}`);
  lines.push(`Logo Design: ${addOns.logoDesign ? "Yes (+$75)" : "No"}`);
  lines.push(`Monthly Retainer: ${addOns.monthlyRetainer ? "Yes (+$50/mo)" : "No"}`);
  lines.push("");

  // Totals
  lines.push("--- ORDER TOTAL ---");
  lines.push(`One-Time Total: $${oneTimeTotal}`);
  if (addOns.monthlyRetainer) {
    lines.push(`Monthly Total:  $${monthlyTotal}/mo`);
  }
  lines.push("");

  // Custom Inquiry
  if (formData.customInquiry.enabled && formData.customInquiry.message) {
    lines.push("--- CUSTOM INQUIRY ---");
    lines.push(formData.customInquiry.message);
    lines.push("");
  }

  lines.push("=== END OF ORDER ===");

  return lines.join("\n");
}

export type { AddOnSelections, OrderPayload };
