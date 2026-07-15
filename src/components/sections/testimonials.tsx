import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const TESTIMONIALS = [
  { quote: "We tried three other tools before Clarity. It is the first one our team actually wanted to keep using.", name: "Sarah Chen", role: "Product Lead, Northwind Studios" },
  { quote: "Setup took ten minutes and the whole team was already comfortable with it by the end of the day. No onboarding calls needed.", name: "Marcus Reid", role: "Engineering Manager, Fenwick Labs" },
  { quote: "Our standups got noticeably shorter once everyone could see task status at a glance instead of asking around.", name: "Priya Nair", role: "Founder, Loom & Co." },
];

export function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => [(prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length, dir]);
  };

  return (
    <section className="border-y border-border bg-muted/30">
      <ScrollReveal className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative h-[320px] [perspective:1200px] sm:h-[260px]">
          <AnimatePresence initial={false} custom={direction}>
            {TESTIMONIALS.map((t, i) => {
              // Show current + next 2 as a stacked deck peeking behind it
              const offset = (i - index + TESTIMONIALS.length) % TESTIMONIALS.length;
              if (offset > 2) return null;
              return (
                <motion.div
                  key={i}
                  custom={direction}
                  initial={{ opacity: 0, rotateY: direction > 0 ? 40 : -40, x: direction > 0 ? 60 : -60 }}
                  animate={{
                    opacity: offset === 0 ? 1 : 0.35,
                    scale: 1 - offset * 0.05,
                    y: offset * 14,
                    rotateY: 0,
                    x: 0,
                    zIndex: TESTIMONIALS.length - offset,
                  }}
                  exit={{ opacity: 0, rotateY: direction > 0 ? -40 : 40, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-xl"
                  style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
                >
                  <Quote className="h-7 w-7 text-primary" />
                  <blockquote className="mt-4 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => paginate(-1)} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"}`}
              />
            ))}
          </div>
          <button onClick={() => paginate(1)} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}