"use client";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageTransition() {
  const { isTransitioning } = useLanguage();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, background: "#0d0020" }}
      animate={{ opacity: isTransitioning ? [0, 0.85, 0.85, 0] : 0 }}
      transition={{
        duration: 0.32,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut",
      }}
    />
  );
}
