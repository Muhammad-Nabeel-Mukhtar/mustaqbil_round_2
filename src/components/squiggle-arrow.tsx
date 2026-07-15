import { motion } from "framer-motion";

/** A hand-drawn-style squiggly arrow that draws itself in once scrolled into view. */
export function SquiggleArrow({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 80 60"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.path
        d="M4 4 C 20 2, 30 20, 18 26 C 6 32, 10 14, 24 12 C 45 9, 55 35, 40 44 C 30 50, 60 52, 72 40"
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <motion.path
        d="M64 32 L 72 40 L 62 44"
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, delay: 1.0 }}
      />
    </motion.svg>
  );
}