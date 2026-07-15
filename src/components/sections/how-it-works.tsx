import { StaggerGroup, StaggerItem } from "@/components/scroll-reveal";

const STEPS = [
  {
    step: "01",
    title: "Create a workspace",
    description: "Sign up and create a workspace for your team in under a minute.",
  },
  {
    step: "02",
    title: "Add your projects",
    description: "Break work into projects and tasks that everyone can see and own.",
  },
  {
    step: "03",
    title: "Ship together",
    description: "Track progress, remove blockers, and celebrate wins as a team.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Get your team up and running in minutes
        </h2>
      </div>

      <StaggerGroup className="relative grid gap-8 md:grid-cols-3">
        {/* Connecting line — desktop only */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[38px] hidden h-px bg-border md:block"
        />

        {STEPS.map((item) => (
          <StaggerItem key={item.step}>
            <div className="relative rounded-xl border border-border bg-background p-6">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {item.step.slice(1)}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}