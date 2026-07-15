import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { StaggerGroup, StaggerItem } from "@/components/scroll-reveal";

type Plan = {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  variant: "outline" | "highlight";
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    description: "For individuals and small side projects.",
    features: ["Up to 3 projects", "2 team members", "Basic task boards"],
    cta: "Get started free",
    variant: "outline",
  },
  {
    name: "Team",
    monthlyPrice: 12,
    description: "For growing teams that need to move faster.",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Advanced progress tracking",
      "Priority support",
    ],
    cta: "Start free trial",
    variant: "highlight",
  },
  {
    name: "Business",
    monthlyPrice: 29,
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Team",
      "SSO and audit logs",
      "Custom workflows",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    variant: "outline",
  },
];

// Annual billing discount — roughly 17% off, i.e. 2 months free per year.
const ANNUAL_DISCOUNT = 0.17;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Straightforward pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free, then scale as your team grows.
        </p>
      </div>

      <div className="mb-12 flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
          Monthly
        </span>
        <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
        <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
          Annually
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          Save ~17%
        </span>
      </div>

      <StaggerGroup className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <StaggerItem key={plan.name}>
            <PricingCard plan={plan} annual={annual} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function PricingCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const isHighlight = plan.variant === "highlight";
  const isFree = plan.monthlyPrice === 0;

  const displayPrice = isFree
    ? 0
    : annual
      ? Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT))
      : plan.monthlyPrice;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card
        className={`flex h-full flex-col border-border transition-shadow duration-300 ${
          isHighlight
            ? "border-2 border-primary bg-background shadow-lg shadow-primary/10 dark:shadow-primary/25"
            : "bg-background hover:shadow-md"
        }`}
      >
        <CardContent className="flex flex-1 flex-col p-6">
          {isHighlight && (
            <span className="mb-3 inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Most popular
            </span>
          )}

          <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>

          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              ${displayPrice}
            </span>
            {!isFree && <span className="ml-1 text-sm text-muted-foreground">/user/month</span>}
          </div>
          {!isFree && annual && (
            <p className="mt-1 text-xs text-muted-foreground">Billed annually</p>
          )}

          <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className={`mt-8 w-full ${isHighlight ? "shadow-[0_0_20px_-6px_var(--primary)]" : ""}`}
            variant={isHighlight ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}