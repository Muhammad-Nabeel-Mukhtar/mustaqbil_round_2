import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Zap, Users, BarChart3, Shield, Check } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/scroll-reveal";

const FEATURES = [
  { icon: Layout, title: "Simple task boards", description: "Organize work with drag-and-drop boards that stay out of your way." },
  { icon: Zap, title: "Fast prioritization", description: "Focus on what matters today with clear priorities and due dates." },
  { icon: Users, title: "Team collaboration", description: "Comment, assign, and mention teammates to keep everyone aligned." },
  { icon: BarChart3, title: "Clear progress", description: "See project health at a glance with lightweight progress tracking." },
  { icon: Shield, title: "Private by default", description: "Your data is encrypted and only visible to people you invite." },
  { icon: Check, title: "Zero setup", description: "Create a project in seconds and invite your team with one link." },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need, nothing more
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for teams that want to move fast without getting lost in complex workflows.
          </p>
        </div>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <SpotlightCard {...feature} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function SpotlightCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, var(--primary) 0%, transparent 70%)`,
          opacity: 0.08,
        }}
      />
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.4 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground"
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <h3 className="relative mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="relative mt-2 text-muted-foreground">{description}</p>
    </motion.div>
  );
}