"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What devices can I watch FIFA 2026 on?",
    answer:
      "You can watch FIFA 2026 on any device with a web browser, including smartphones, tablets, laptops, and desktop computers. We also offer dedicated apps for iOS, Android, and smart TVs.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access until the end of your current billing period. We don't offer refunds for partial billing periods.",
  },
  {
    question: "How many devices can I stream on simultaneously?",
    answer:
      "The number of devices you can stream on simultaneously depends on your subscription plan. Free: 1 device, Basic: 1 device, Premium: 3 devices, Ultimate: 5 devices.",
  },
  {
    question: "Which leagues and tournaments are available?",
    answer:
      "We offer coverage of all major leagues and tournaments, including the Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa League, World Cup, and many more.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 7-day free trial for new subscribers to our Premium plan. You can cancel anytime during the trial period and won't be charged.",
  },
  {
    question: "What is the streaming quality?",
    answer:
      "Our streaming quality depends on your subscription plan. Free and Basic plans offer up to HD quality (720p), while Premium and Ultimate plans offer up to 4K quality (2160p), depending on your internet connection.",
  },
];

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="my-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400">
          Have questions about FIFA 2026? Find answers to the most common
          questions below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="glass-card rounded-xl mb-4 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              className="w-full p-6 text-left flex items-center justify-between"
              onClick={() => toggleExpanded(index)}
            >
              <h3 className="font-medium text-lg">{faq.question}</h3>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-400">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
