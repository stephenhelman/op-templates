"use client";

export default function About() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          About Us
        </h2>
        <p
          className="text-base md:text-lg leading-relaxed opacity-80 mb-6"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          Operation Profit Asset Recovery is dedicated to reuniting people with money that is rightfully theirs.
          Our team of recovery specialists brings decades of combined experience navigating state unclaimed
          property programs, legal documentation, and financial institution processes — so you don&apos;t have to.
        </p>
        <p
          className="text-base leading-relaxed opacity-80"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          We operate on a strict no-recovery, no-fee policy. Our mission is simple: put money back in your
          hands with as little friction as possible.
        </p>
        <div
          className="mt-10 pt-8 border-t text-sm opacity-50"
          style={{ borderColor: "rgba(128,128,128,0.2)", color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          Operation Profit Asset Recovery is a division of{" "}
          <span style={{ color: "var(--color-accent)" }}>Operation Profit LLC</span>
          {" "}— El Paso, TX
        </div>
      </div>
    </section>
  );
}
