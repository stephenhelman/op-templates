"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Phase 2 — wire to /api/order
    console.log("Contact form submitted", form);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-bg)",
    color: "var(--color-text)",
    borderColor: "rgba(128,128,128,0.3)",
    fontFamily: "var(--font-body)",
  };

  const labelStyle: React.CSSProperties = {
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
  };

  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          Start Your Free Claim Review
        </h2>
        <p
          className="text-center opacity-70 mb-12"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          Fill out the form below and a recovery specialist will contact you
          within one business day.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" style={labelStyle}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className="px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ ...inputStyle, outlineColor: "var(--color-accent)" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" style={labelStyle}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ ...inputStyle, outlineColor: "var(--color-accent)" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" style={labelStyle}>
              Phone Number{" "}
              <span className="opacity-50 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ ...inputStyle, outlineColor: "var(--color-accent)" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" style={labelStyle}>
              Message *
            </label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your situation..."
              rows={4}
              className="px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 resize-none"
              style={{ ...inputStyle, outlineColor: "var(--color-accent)" }}
            />
          </div>
          <button
            type="submit"
            className="py-4 px-8 font-bold text-base rounded-lg transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
