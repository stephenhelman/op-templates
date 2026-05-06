"use client";

export default function Hero() {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="max-w-4xl mx-auto">
        <p
          className="text-sm uppercase tracking-[0.3em] mb-6 opacity-70"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }}
        >
          Asset Recovery Specialists
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
        >
          Recover What&apos;s <span style={{ color: "var(--color-accent)" }}>Rightfully Yours</span>
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto opacity-80"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}
        >
          We specialize in locating and recovering unclaimed assets on your behalf —
          no upfront costs, no risk. You only pay when we win.
        </p>
        <button
          onClick={handleScrollToContact}
          className="px-10 py-4 font-bold text-base tracking-wide rounded-lg transition-opacity duration-200 hover:opacity-90"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          Start Your Free Claim Review
        </button>
      </div>
    </section>
  );
}
