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

// Fixed dark warm palette, independent of the light/dark toggle — this section
// is a deliberate "signature band" like an agency site's brand-color section,
// not a themed surface. This also permanently resolves the contrast flip bug.
const BAND_BG = "oklch(0.2 0.02 45)";
const BAND_FG = "oklch(0.97 0.008 80)";
const BAND_ACCENT = "oklch(0.73 0.18 45)";

export function FeaturesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const trackX = useTransform(scrollYProgress, [0, 1], ["2%", "-70%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 0.12, 0.12, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh", backgroundColor: BAND_BG }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* decorative dot grid, fixed-color to match the band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `radial-gradient(${BAND_FG} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />

        <motion.h2
          style={{ opacity: headingOpacity, color: BAND_FG }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-6xl italic sm:text-8xl"
        >
          Everything you need
        </motion.h2>

        <div className="relative z-10 mb-10 px-4 text-center sm:px-6">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest" style={{ color: `color-mix(in oklch, ${BAND_FG} 60%, transparent)` }}>
            Features
          </p>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl" style={{ color: BAND_FG }}>
            Nothing more than you need
          </h3>
        </div>

        <motion.div style={{ x: trackX }} className="relative z-10 flex gap-6 px-4 sm:px-6">
          {FEATURES.map((feature, i) => (
            <FeatureSlide key={feature.title} {...feature} index={i} fg={BAND_FG} accent={BAND_ACCENT} />
          ))}
        </motion.div>

        {/* scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 h-1 w-48 -translate-x-1/2 overflow-hidden rounded-full" style={{ backgroundColor: `color-mix(in oklch, ${BAND_FG} 15%, transparent)` }}>
          <motion.div className="h-full rounded-full" style={{ width: progressWidth, backgroundColor: BAND_ACCENT }} />
        </div>
      </div>
    </section>
  );
}

function FeatureSlide({
  icon: Icon,
  title,
  description,
  index,
  fg,
  accent,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
  index: number;
  fg: string;
  accent: string;
}) {
  const rotation = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
      className="relative flex h-80 w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-6 backdrop-blur-sm sm:w-[320px]"
      style={{
        backgroundColor: `color-mix(in oklch, ${fg} 8%, transparent)`,
        border: `1px solid color-mix(in oklch, ${fg} 15%, transparent)`,
      }}
    >
      {/* giant ghost icon in the background for depth/decoration */}
      <Icon className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-[0.06]" style={{ color: fg }} />

      <div className="relative flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `color-mix(in oklch, ${accent} 25%, transparent)`, color: accent }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-display text-3xl italic opacity-30" style={{ color: fg }}>
          0{index + 1}
        </span>
      </div>

      <div className="relative">
        <h4 className="font-display text-xl" style={{ color: fg }}>
          {title}
        </h4>
        <p className="mt-2 font-sans text-sm" style={{ color: `color-mix(in oklch, ${fg} 65%, transparent)` }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}