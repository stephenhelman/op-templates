import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { formatOrderEmail, OrderPayload } from "@/lib/sendOrder";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const payload = (await req.json()) as OrderPayload;
    const { formData, config } = payload;

    const orderBody = formatOrderEmail(payload);
    const companyName = formData.businessInfo.companyName || "New Client";
    const templateName =
      config.templateName.charAt(0).toUpperCase() + config.templateName.slice(1);

    // Operator notification email
    await resend.emails.send({
      from: "orders@operationprofitllc.info",
      to: process.env.NEXT_PUBLIC_NOTIFY_EMAIL ?? "",
      subject: `New Website Order — ${companyName} — ${templateName}`,
      text: orderBody,
    });

    // Client confirmation email
    await resend.emails.send({
      from: "noreply@operationprofitllc.info",
      to: formData.businessInfo.email,
      subject: "Your Order Has Been Received — Operation Profit Asset Recovery",
      text: [
        `Hi ${formData.businessInfo.companyName},`,
        "",
        "Thank you for your order! We've received your website request and will follow up within 1 business day.",
        "",
        "Here's a copy of what we received:",
        "",
        orderBody,
        "",
        "Questions? Reply to this email or reach us at operationprofitllc.info",
        "",
        "— Operation Profit Asset Recovery",
        "A division of Operation Profit LLC | El Paso, TX",
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
