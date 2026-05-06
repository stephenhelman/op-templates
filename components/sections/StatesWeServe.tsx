"use client";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Virginia",
];

export default function StatesWeServe() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          Serving Claimants Across the Nation
        </h2>
        <p
          className="text-center opacity-70 mb-12 max-w-xl mx-auto"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
        >
          We are licensed and operating in 45 states. Find yours below.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {states.map((state) => (
            <span
              key={state}
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
                backgroundColor: "transparent",
              }}
            >
              {state}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
