import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AnimatedCounter } from "@/components/animated-counter";
import { SquiggleArrow } from "@/components/squiggle-arrow";
import { GrainOverlay } from "@/components/grain-overlay";
import { TypedRotatingWord } from "@/components/typed-rotating-word";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <GrainOverlay />
      <AmbientBlobs />
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.4]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Left — copy */}
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built for <TypedRotatingWord />
          </motion.p>

          <h1 className="mt-6 font-display text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
            <SplitReveal text="Ship faster." />
            <br />
            <span className="italic text-primary">
              <SplitReveal text="Skip the noise." delayOffset={0.15} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground"
          >
            Clarity gives small teams a focused workspace to plan, track, and ship — without
            the bloat that slows everyone else down.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <div className="flex w-full max-w-sm items-center gap-2 sm:w-auto">
              <Input type="email" placeholder="Enter your work email" className="h-12 font-sans" aria-label="Work email" />
              <MagneticButton>Get started</MagneticButton>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <SquiggleArrow className="h-9 w-14 -rotate-12" />
              <span className="font-display text-sm italic text-muted-foreground">it's free</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["A", "B", "C", "D"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary font-sans text-xs font-semibold text-secondary-foreground"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Loved by <AnimatedCounter value={50} suffix="k+" /> teams worldwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — tilted mockup with floating stat card */}
        <div className="relative">
          <TiltMockup />
          <FloatingStatCard />
        </div>
      </div>
    </section>
  );
}

/** Splits text into words that slide up into place with a stagger, masked by overflow-hidden. */
function SplitReveal({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: delayOffset + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[110px]"
      />
    </div>
  );
}

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
      className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-primary px-6 font-sans text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-shadow hover:shadow-[0_0_36px_-4px_var(--primary)]"
    >
      {children}
    </motion.button>
  );
}

function TiltMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(-2), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(4), { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(4 + px * 8);
    rotateX.set(-2 - py * 8);
  };

  const columns = [
    { title: "To do", tasks: ["Simple task boards", "Communicate and mention"] },
    { title: "In progress", tasks: ["Prioritized projects"] },
    { title: "Done", tasks: ["Tasks and dashboarding"] },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { rotateX.set(-2); rotateY.set(4); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-3 font-sans text-sm font-medium text-muted-foreground">Task Board</span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title} className="rounded-lg bg-muted/30 p-3">
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {col.title}
            </p>
            <div className="space-y-2">
              {col.tasks.map((task) => (
                <motion.div
                  key={task}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="rounded-md border border-border bg-background px-3 py-2 font-sans text-sm text-foreground shadow-sm"
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

function FloatingStatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      whileHover={{ y: -4 }}
      className="absolute -bottom-8 -left-6 hidden rounded-xl border border-border bg-card px-5 py-4 shadow-xl sm:block"
    >
      <p className="font-display text-2xl font-semibold text-foreground">
        <AnimatedCounter value={10} suffix="M+" />
      </p>
      <p className="font-sans text-xs text-muted-foreground">tasks shipped</p>
    </motion.div>
  );
}