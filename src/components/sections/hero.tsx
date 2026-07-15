import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { SquiggleArrow } from "@/components/squiggle-arrow";

const STATS = [
  { label: "Teams", value: 50, suffix: "k+" },
  { label: "Tasks", value: 10, suffix: "M+" },
  { label: "Rating", value: 4.9, suffix: "/5", decimals: 1 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <AmbientBlobs />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ship faster, together,
            <br />
            <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent [animation:shimmer_6s_linear_infinite]">
              without the overhead.
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Clarity gives small teams a clean, focused workspace to plan tasks, track progress,
            and ship work together. No bloat, no steep learning curve.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="flex w-full max-w-sm items-center gap-2 sm:w-auto">
              <Input type="email" placeholder="Enter your work email" className="h-11" aria-label="Work email" />
              <MagneticButton>Get started</MagneticButton>
              <SquiggleArrow className="hidden h-10 w-16 -translate-y-2 sm:block" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Free 14-day trial. No credit card required.</p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3} className="relative mx-auto mt-16 max-w-4xl">
        <TiltMockup />
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/60 px-6 py-5 backdrop-blur sm:flex-row sm:gap-0 sm:divide-x sm:divide-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 text-center first:pl-0 last:pr-0">
              <p className="text-3xl font-bold text-transparent">
  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} stroke />
</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

/** Slowly drifting gradient orbs behind the hero — pure CSS-driven motion, no JS cost per frame. */
function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 dark:opacity-100">
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1/4 top-20 h-[380px] w-[380px] rounded-full bg-purple-500/20 blur-[110px]"
      />
    </div>
  );
}

/** Button that subtly follows the cursor within its bounds, snapping back on leave. */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-shadow hover:shadow-[0_0_36px_-4px_var(--primary)]"
    >
      {children}
    </motion.button>
  );
}

/** Kanban mockup with a 3D tilt that follows the cursor. */
function TiltMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  };

  const columns = [
    { title: "To do", tasks: ["Simple task boards", "Communicate and mention"] },
    { title: "In progress", tasks: ["Prioritized projects", "Planned projects"] },
    { title: "Done", tasks: ["Tasks and dashboarding", "Screen conversation"] },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/10 dark:shadow-primary/25"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-sm font-medium text-muted-foreground">Task Board</span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title} className="rounded-lg bg-muted/30 p-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.title}</p>
            <div className="space-y-2">
              {col.tasks.map((task) => (
                <motion.div
                  key={task}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm"
                >
                  {task}
                  <div className="mt-2 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-2/3 rounded-full bg-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}