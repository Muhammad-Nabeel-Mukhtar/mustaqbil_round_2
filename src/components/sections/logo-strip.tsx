import { useState } from "react";
import { motion } from "framer-motion";

const LOGOS = ["Acme", "Globex", "Initech", "Umbrella", "Stark Co.", "Hooli", "Vandelay"];

export function LogoStrip() {
  const [paused, setPaused] = useState(false);
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="overflow-hidden py-12">
      <p className="mb-6 text-center font-sans text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by teams at
      </p>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mx-auto max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <motion.div
          className="flex w-max gap-14"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((name, i) => (
            <span key={i} className="shrink-0 font-display text-xl italic tracking-tight text-foreground opacity-60 transition-opacity hover:opacity-100">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}