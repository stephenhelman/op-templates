"use client";

const steps = [
  {
    number: "01",
    title: "Identify",
    description:
      "We research public records and databases to locate unclaimed assets registered in your name across all 45 states we serve.",
  },
  {
    number: "02",
    title: "Handle",
    description:
      "Our team prepares all paperwork, navigates the legal requirements, and manages every step of the claims process for you.",
  },
  {
    number: "03",
    title: "Get Paid",
    description:
      "Once recovered, funds are sent directly to you. We collect our contingency fee only after you receive your money.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          How It Works
        </h2>
        <p
          className="text-center opacity-70 mb-16 max-w-xl mx-auto"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          Three steps. No upfront cost. No risk.
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[16.666%] right-[16.666%] h-px opacity-20"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex-1 flex flex-col items-center text-center px-6 relative"
            >
              {/* Connector arrow for mobile */}
              {index < steps.length - 1 && (
                <div
                  className="md:hidden w-px h-8 my-2 opacity-30"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              )}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4 border-2 z-10"
                style={{
                  borderColor: "var(--color-accent)",
                  color: "var(--color-accent)",
                  backgroundColor: "var(--color-bg)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {step.number}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-75"
                style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
