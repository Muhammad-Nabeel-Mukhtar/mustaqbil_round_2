import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout, Zap, Users, BarChart3, Shield, Check, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    icon: Layout,
    title: "Simple task boards",
    description: "Drag-and-drop boards that stay out of your way.",
    metric: "3 min",
    metricLabel: "avg. setup",
  },
  {
    icon: Zap,
    title: "Fast prioritization",
    description: "Clear priorities and due dates, always in focus.",
    metric: "40%",
    metricLabel: "faster triage",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description: "Comment, assign, and mention teammates instantly.",
    metric: "Live",
    metricLabel: "sync across team",
  },
  {
    icon: BarChart3,
    title: "Clear progress",
    description: "See project health at a glance, every time.",
    metric: "1 view",
    metricLabel: "full project health",
  },
  {
    icon: Shield,
    title: "Private by default",
    description: "Encrypted data, visible only to who you invite.",
    metric: "AES-256",
    metricLabel: "encryption",
  },
  {
    icon: Check,
    title: "Zero setup",
    description: "Create a project in seconds with one shared link.",
    metric: "1 link",
    metricLabel: "to invite your team",
  },
];

// Fixed dark warm palette, independent of the light/dark toggle — a deliberate
// signature band, like an agency site's brand-color section.
const BAND_BG = "oklch(0.2 0.02 45)";
const BAND_FG = "oklch(0.97 0.008 80)";
const BAND_ACCENT = "oklch(0.73 0.18 45)";

export function FeaturesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const trackX = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh", backgroundColor: BAND_BG }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `radial-gradient(${BAND_FG} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />

        <div className="relative z-10 mb-12 px-4 text-center sm:px-6">
          <p
            className="font-sans text-sm font-semibold uppercase tracking-widest"
            style={{ color: `color-mix(in oklch, ${BAND_FG} 60%, transparent)` }}
          >
            Features
          </p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: BAND_FG }}>
            Nothing more than you need
          </h3>
        </div>

        <motion.div style={{ x: trackX }} className="relative z-10 flex gap-6 px-4 sm:px-6">
          {FEATURES.map((feature, i) => (
            <FeatureSlide key={feature.title} {...feature} index={i} fg={BAND_FG} accent={BAND_ACCENT} />
          ))}
        </motion.div>

        <div className="relative z-10 mt-10 flex items-center justify-center gap-3">
          <div
            className="h-1 w-48 overflow-hidden rounded-full"
            style={{ backgroundColor: `color-mix(in oklch, ${BAND_FG} 15%, transparent)` }}
          >
            <motion.div className="h-full rounded-full" style={{ width: progressWidth, backgroundColor: BAND_ACCENT }} />
          </div>
          <span className="font-sans text-xs" style={{ color: `color-mix(in oklch, ${BAND_FG} 50%, transparent)` }}>
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}

function FeatureSlide({
  icon: Icon,
  title,
  description,
  metric,
  metricLabel,
  index,
  fg,
  accent,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  index: number;
  fg: string;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="relative flex h-[360px] w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-6 backdrop-blur-sm sm:w-[340px]"
      style={{
        backgroundColor: `color-mix(in oklch, ${fg} 6%, transparent)`,
        border: `1px solid color-mix(in oklch, ${fg} 14%, transparent)`,
      }}
    >
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `color-mix(in oklch, ${accent} 22%, transparent)`, color: accent }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-display text-3xl italic opacity-25" style={{ color: fg }}>
          0{index + 1}
        </span>
      </div>

      <div className="relative">
        <h4 className="font-display text-xl" style={{ color: fg }}>
          {title}
        </h4>
        <p className="mt-2 font-sans text-sm leading-relaxed" style={{ color: `color-mix(in oklch, ${fg} 65%, transparent)` }}>
          {description}
        </p>
      </div>

      {/* metric strip — gives each card real content instead of empty space */}
      <div
        className="relative flex items-center justify-between rounded-xl px-4 py-3"
        style={{
          backgroundColor: `color-mix(in oklch, ${fg} 5%, transparent)`,
          border: `1px solid color-mix(in oklch, ${fg} 10%, transparent)`,
        }}
      >
        <div>
          <p className="font-display text-lg" style={{ color: accent }}>
            {metric}
          </p>
          <p className="font-sans text-[11px] uppercase tracking-wide" style={{ color: `color-mix(in oklch, ${fg} 50%, transparent)` }}>
            {metricLabel}
          </p>
        </div>
        <ArrowUpRight className="h-4 w-4" style={{ color: `color-mix(in oklch, ${fg} 40%, transparent)` }} />
      </div>
    </motion.div>
  );
}