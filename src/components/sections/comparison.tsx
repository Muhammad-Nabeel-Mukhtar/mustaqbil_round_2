import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type CellValue = "yes" | "no" | "partial";

const ROWS: { feature: string; clarity: CellValue; typical: CellValue }[] = [
  { feature: "Setup time under 5 minutes", clarity: "yes", typical: "no" },
  { feature: "Unlimited team members on paid plans", clarity: "yes", typical: "partial" },
  { feature: "Clean UI with no feature bloat", clarity: "yes", typical: "no" },
  { feature: "Transparent per-seat pricing", clarity: "yes", typical: "partial" },
];

function CellIcon({ value, accent }: { value: CellValue; accent: boolean }) {
  const cls = accent ? "text-primary" : "text-muted-foreground/40";
  if (value === "yes") return <Check className={`h-5 w-5 ${cls}`} />;
  if (value === "no") return <X className={`h-5 w-5 ${cls}`} />;
  return <Minus className={`h-5 w-5 ${cls}`} />;
}

export function Comparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        {/* Left — sticky-feeling intro, breaks the centered pattern */}
        <div className="lg:sticky lg:top-28">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">Comparison</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            The difference is <span className="italic text-primary">what we left out.</span>
          </h2>
          <p className="mt-4 font-sans text-muted-foreground">
            Most PM tools grow features until they need a manual. Clarity stayed small on purpose.
          </p>
        </div>

        {/* Right — table */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border bg-muted/40 font-sans text-sm font-semibold text-foreground">
            <div className="px-5 py-4">Feature</div>
            <div className="w-24 border-l border-border px-4 py-4 text-center text-primary sm:w-28">Clarity</div>
            <div className="w-24 border-l border-border px-4 py-4 text-center text-muted-foreground sm:w-28">Others</div>
          </div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              animate={{ backgroundColor: hoveredRow === i ? "var(--accent)" : "transparent" }}
              transition={{ duration: 0.15 }}
              className={`grid grid-cols-[1fr_auto_auto] items-center font-sans text-sm ${
                i !== ROWS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="px-5 py-4 text-foreground">{row.feature}</div>
              <div className="flex w-24 items-center justify-center border-l border-border py-4 sm:w-28">
                <CellIcon value={row.clarity} accent />
              </div>
              <div className="flex w-24 items-center justify-center border-l border-border py-4 sm:w-28">
                <CellIcon value={row.typical} accent={false} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}