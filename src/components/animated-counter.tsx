import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  stroke = false,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  /** Renders as an outlined numeral that fills in as it counts — matches large stat-bar treatments. */
  stroke?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(v.toFixed(decimals));
        setProgress(v / value);
      },
    });
    return () => controls.stop();
  }, [isInView, value, decimals]);

  if (!stroke) {
    return (
      <motion.span ref={ref}>
        {display}
        {suffix}
      </motion.span>
    );
  }

  return (
    <span
      ref={ref}
      style={{
        WebkitTextStroke: "1.5px var(--primary)",
        color: `color-mix(in oklch, var(--primary) ${progress * 100}%, transparent)`,
      }}
    >
      {display}
      {suffix}
    </span>
  );
}