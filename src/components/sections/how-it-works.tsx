import { motion } from "framer-motion";
import { Rocket, Layers, TrendingUp } from "lucide-react";

const STEPS = [
  { icon: Rocket, step: "01", title: "Create a workspace", description: "Sign up and create a workspace for your team in under a minute." },
  { icon: Layers, step: "02", title: "Add your projects", description: "Break work into projects and tasks that everyone can see and own." },
  { icon: TrendingUp, step: "03", title: "Ship together", description: "Track progress, remove blockers, and celebrate wins as a team." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="mb-16 max-w-lg">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">Process</p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Up and running <span className="italic text-primary">in minutes</span>, not weeks.
        </h2>
      </div>

      <div className="relative">
        <div aria-hidden className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-border sm:block" />

        <div className="space-y-14">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col gap-6 sm:flex-row sm:items-start"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div className={`flex-1 rounded-2xl border border-border bg-card p-6 sm:ml-4 ${i % 2 === 1 ? "sm:translate-x-6" : ""}`}>
                <span className="font-display text-sm italic text-muted-foreground">{item.step}</span>
                <h3 className="mt-1 font-display text-2xl text-foreground">{item.title}</h3>
                <p className="mt-2 font-sans text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}