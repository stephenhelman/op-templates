"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  numericEnd: number;
  prefix: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "$2.3B+", numericEnd: 2.3, prefix: "$", suffix: "B+", label: "Assets Recovered" },
  { value: "45+", numericEnd: 45, prefix: "", suffix: "+", label: "States Served" },
  { value: "120", numericEnd: 120, prefix: "", suffix: "", label: "Days Average Recovery" },
  { value: "0", numericEnd: 0, prefix: "$", suffix: "", label: "Upfront Cost to You" },
];

function AnimatedCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (stat.numericEnd === 0) {
      setCount(0);
      return;
    }
    const duration = 1500;
    const steps = 60;
    const increment = stat.numericEnd / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.numericEnd) {
        setCount(stat.numericEnd);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, stat.numericEnd]);

  const formatted =
    stat.numericEnd === 0
      ? "0"
      : stat.numericEnd < 10
      ? count.toFixed(1)
      : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <div
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
      >
        {stat.prefix}{formatted}{stat.suffix}
      </div>
      <div
        className="text-sm uppercase tracking-wider opacity-70"
        style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function ImpactNumbers() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-12"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          Our Track Record
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
