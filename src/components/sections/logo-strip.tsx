import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";

const LOGOS = ["Acme", "Globex", "Initech", "Umbrella", "Stark Co.", "Hooli", "Vandelay"];

export function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <ScrollReveal className="overflow-hidden py-10">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">Trusted by teams at</p>
      <div className="relative mx-auto max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex w-max gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((name, i) => (
            <span key={i} className="shrink-0 text-lg font-semibold tracking-tight text-foreground opacity-60">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </ScrollReveal>
  );
}