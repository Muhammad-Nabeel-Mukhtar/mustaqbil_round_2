import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type Plan = {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  { name: "Starter", monthlyPrice: 0, description: "For individuals and small side projects.", features: ["Up to 3 projects", "2 team members", "Basic task boards"], cta: "Get started free" },
  { name: "Team", monthlyPrice: 12, description: "For growing teams that need to move faster.", features: ["Unlimited projects", "Unlimited team members", "Advanced progress tracking", "Priority support"], cta: "Start free trial" },
  { name: "Business", monthlyPrice: 29, description: "For organizations with advanced needs.", features: ["Everything in Team", "SSO and audit logs", "Custom workflows", "Dedicated account manager"], cta: "Contact sales" },
];

const ANNUAL_DISCOUNT = 0.17;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Pay for what <span className="italic text-primary">you'll actually use.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className={`font-sans text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
          <span className={`font-sans text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>Annual</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-primary">Save ~17%</span>
        </div>
      </div>

      {/* Asymmetric: Starter + Business stacked narrow on the left, Team large and tall on the right */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <PlanCard plan={PLANS[0]} annual={annual} compact />
          <PlanCard plan={PLANS[2]} annual={annual} compact />
        </div>
        <PlanCard plan={PLANS[1]} annual={annual} featured />
      </div>
    </section>
  );
}

function PlanCard({ plan, annual, featured = false, compact = false }: { plan: Plan; annual: boolean; featured?: boolean; compact?: boolean }) {
  const isFree = plan.monthlyPrice === 0;
  const displayPrice = isFree ? 0 : annual ? Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT)) : plan.monthlyPrice;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 ${
        featured
          ? "min-h-[420px] bg-primary text-primary-foreground shadow-xl shadow-primary/20"
          : "border border-border bg-card"
      } ${compact ? "" : ""}`}
    >
      {featured && (
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className={`font-display text-2xl ${featured ? "text-primary-foreground" : "text-foreground"}`}>{plan.name}</h3>
          {featured && (
            <span className="rounded-full bg-primary-foreground/15 px-3 py-1 font-sans text-xs font-semibold text-primary-foreground">
              Most popular
            </span>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className={`font-display text-5xl ${featured ? "text-primary-foreground" : "text-foreground"}`}>${displayPrice}</span>
          {!isFree && (
            <span className={`font-sans text-sm ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              /user/mo
            </span>
          )}
        </div>

        <p className={`mt-3 font-sans text-sm ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {plan.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className={`flex items-start gap-2.5 font-sans text-sm ${featured ? "text-primary-foreground/90" : "text-foreground"}`}>
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-primary-foreground" : "text-primary"}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={`relative mt-7 w-full gap-2 font-sans ${
          featured ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""
        }`}
        variant={featured ? undefined : "outline"}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}