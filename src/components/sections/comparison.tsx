import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

type CellValue = "yes" | "no" | "partial";

const ROWS: { feature: string; clarity: CellValue; typical: CellValue }[] = [
  { feature: "Setup time under 5 minutes", clarity: "yes", typical: "no" },
  { feature: "Unlimited team members on paid plans", clarity: "yes", typical: "partial" },
  { feature: "Clean UI with no feature bloat", clarity: "yes", typical: "no" },
  { feature: "Transparent per-seat pricing", clarity: "yes", typical: "partial" },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") return <Check className="h-5 w-5 text-primary" />;
  if (value === "no") return <X className="h-5 w-5 text-muted-foreground/50" />;
  return <Minus className="h-5 w-5 text-muted-foreground/50" />;
}

export function Comparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Clarity vs. typical PM tools
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          The difference is what we left out.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-muted/40 text-sm font-semibold text-foreground">
            <div className="px-4 py-3 sm:px-6">Feature</div>
            <div className="border-l border-border px-4 py-3 text-center text-primary sm:px-6">
              Clarity
            </div>
            <div className="border-l border-border px-4 py-3 text-center text-muted-foreground sm:px-6">
              Typical tools
            </div>
          </div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              animate={{
                backgroundColor:
                  hoveredRow === i ? "var(--accent)" : "transparent",
              }}
              transition={{ duration: 0.15 }}
              className={`grid grid-cols-3 text-sm ${i !== ROWS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="px-4 py-4 text-foreground sm:px-6">{row.feature}</div>
              <div className="flex items-center justify-center border-l border-border px-4 py-4 sm:px-6">
                <CellIcon value={row.clarity} />
              </div>
              <div className="flex items-center justify-center border-l border-border px-4 py-4 sm:px-6">
                <CellIcon value={row.typical} />
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}