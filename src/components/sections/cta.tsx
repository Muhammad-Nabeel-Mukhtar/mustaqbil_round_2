import { Button } from "@/components/ui/button";
import { SquiggleArrow } from "@/components/squiggle-arrow";
import { GrainOverlay } from "@/components/grain-overlay";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center sm:p-16 lg:p-20">
        <GrainOverlay />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/10 blur-[100px]"
        />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">
            Ready to bring <span className="italic">clarity</span> to your work?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-lg text-primary-foreground/80">
            Join hundreds of teams who have simplified the way they manage projects.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-primary-foreground font-sans text-primary hover:bg-primary-foreground/90">
              Start your free trial
            </Button>
            <div className="flex items-center gap-2">
              <SquiggleArrow className="h-9 w-14 rotate-90 opacity-70 sm:hidden" />
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent font-sans text-primary-foreground hover:bg-primary-foreground/10">
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}