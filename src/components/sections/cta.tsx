import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px] opacity-0 dark:opacity-100"
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-card-foreground sm:text-4xl">
              Ready to bring clarity to your work?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join hundreds of teams who have simplified the way they manage projects.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="shadow-[0_0_24px_-6px_var(--primary)]">
                Start your free trial
              </Button>
              <Button size="lg" variant="outline">
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}