"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is unclaimed property?",
    answer:
      "Unclaimed property includes forgotten bank accounts, uncashed checks, insurance payouts, security deposits, utility refunds, and more. States hold billions in unclaimed assets that rightfully belong to individuals and businesses.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "There is no upfront cost. We work on a contingency basis — meaning we only collect a fee after you receive your recovered funds. If we don't recover anything, you owe us nothing.",
  },
  {
    question: "How long does the recovery process take?",
    answer:
      "On average, the process takes 90–120 days from start to payout. Some claims are faster, and complex multi-state recoveries can take longer. We'll keep you updated every step of the way.",
  },
  {
    question: "Can I file a claim myself without using you?",
    answer:
      "Yes, you can. However, navigating state-specific requirements, documentation, and follow-ups is time-consuming and easy to get wrong. We handle all of it for you, increasing the likelihood of a full recovery.",
  },
  {
    question: "What types of assets can you recover?",
    answer:
      "We recover checking and savings account balances, uncashed payroll and dividend checks, insurance proceeds, escrow balances, security deposits, court settlements, and more.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. We only collect the information necessary to file your claim. Your data is never sold or shared with third parties. All communication is encrypted and secure.",
  },
  {
    question: "What states do you serve?",
    answer:
      "We currently serve claimants in 45 states. Contact us to confirm whether your state is covered or if there are additional options for your situation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: "rgba(128,128,128,0.2)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                <span
                  className="font-semibold text-sm md:text-base"
                  style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
                >
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-lg"
                  style={{ color: "var(--color-accent)" }}
                >
                  ›
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="px-5 pb-5 text-sm leading-relaxed opacity-75"
                      style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
