import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We tried three other tools before Clarity. It is the first one our team actually wanted to keep using.",
    name: "Sarah Chen",
    role: "Product Lead",
    company: "Northwind Studios",
  },
  {
    quote: "Setup took ten minutes and the whole team was already comfortable with it by the end of the day. No onboarding calls needed.",
    name: "Marcus Reid",
    role: "Engineering Manager",
    company: "Fenwick Labs",
  },
  {
    quote: "Our standups got noticeably shorter once everyone could see task status at a glance instead of asking around.",
    name: "Priya Nair",
    role: "Founder",
    company: "Loom & Co.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        {/* Sidebar nav — vertical list of names, not dots */}
        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
          <p className="mb-2 hidden font-sans text-sm font-semibold uppercase tracking-widest text-primary lg:block">
            What teams say
          </p>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-3 text-left font-sans text-sm transition-colors lg:whitespace-normal ${
                active === i
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {t.name}
              <span className="hidden lg:block lg:text-xs lg:font-normal lg:opacity-70">{t.company}</span>
            </button>
          ))}
        </div>

        {/* Large pull-quote */}
        <div className="relative min-h-[280px]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-4 -top-8 select-none font-display text-[10rem] italic leading-none text-primary/10 sm:text-[14rem]"
          >
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-6"
            >
              <blockquote className="font-display text-3xl italic leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                {TESTIMONIALS[active].quote}
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-sans text-sm font-semibold text-secondary-foreground">
                  {TESTIMONIALS[active].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground">{TESTIMONIALS[active].name}</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {TESTIMONIALS[active].role}, {TESTIMONIALS[active].company}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}