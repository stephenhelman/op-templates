"use client";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center text-sm"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text)",
        fontFamily: "var(--font-body)",
      }}
    >
      <p className="opacity-50">
        Operation Profit Asset Recovery is a division of Operation Profit LLC
        &nbsp;|&nbsp; El Paso, TX &nbsp;|&nbsp; &copy; 2025
      </p>
    </footer>
  );
}
