import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout, Zap, Users, BarChart3, Shield, Check } from "lucide-react";

const FEATURES = [
  { icon: Layout, title: "Simple task boards", description: "Drag-and-drop boards that stay out of your way." },
  { icon: Zap, title: "Fast prioritization", description: "Clear priorities and due dates, always in focus." },
  { icon: Users, title: "Team collaboration", description: "Comment, assign, and mention teammates instantly." },
  { icon: BarChart3, title: "Clear progress", description: "See project health at a glance, every time." },
  { icon: Shield, title: "Private by default", description: "Encrypted data, visible only to who you invite." },
  { icon: Check, title: "Zero setup", description: "Create a project in seconds with one shared link." },
];

export function FeaturesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track width scales with card count — cards slide left as the user scrolls down.
  const trackX = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 0.15, 0.15, 1]);

  return (
    <section id="features" ref={sectionRef} className="relative bg-primary" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-6xl font-bold text-primary-foreground/10 sm:text-8xl"
        >
          Everything you need
        </motion.h2>

        <div className="relative z-10 mb-10 px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            Features
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Nothing more than you need
          </h3>
        </div>

        <motion.div style={{ x: trackX }} className="relative z-10 flex gap-6 px-4 sm:px-6">
          {FEATURES.map((feature, i) => (
            <FeatureSlide key={feature.title} {...feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureSlide({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="flex h-72 w-[280px] shrink-0 flex-col justify-between rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur-sm sm:w-[320px]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-primary-foreground">{title}</h4>
        <p className="mt-2 text-sm text-primary-foreground/70">{description}</p>
      </div>
    </motion.div>
  );
}