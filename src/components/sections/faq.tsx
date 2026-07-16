import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { id: "trial", question: "Is there a free trial?", answer: "Yes. Every paid plan starts with a 14-day free trial. You can also use the Starter plan for free indefinitely." },
  { id: "change-plan", question: "Can I change plans later?", answer: "Absolutely. You can upgrade or downgrade at any time, and changes take effect on your next billing cycle." },
  { id: "cancel", question: "How do I cancel?", answer: "You can cancel your subscription from your workspace settings at any time. No cancellation fees or hidden charges." },
  { id: "data", question: "Where is my data stored?", answer: "Your data is stored in secure, SOC 2 compliant data centers with encryption at rest and in transit." },
  { id: "security", question: "How secure is my data?", answer: "All data is encrypted in transit and at rest. Workspaces are private by default and only visible to people you explicitly invite." },
  { id: "integrations", question: "Does Clarity integrate with other tools?", answer: "Clarity connects with Slack and GitHub out of the box, with more integrations on the way. You can also use our API for custom workflows." },
  { id: "export", question: "Can I export my data?", answer: "Yes. You can export all your projects, tasks, and comments as CSV or JSON at any time — no lock-in." },
];

export function FAQ() {
  const mid = Math.ceil(FAQS.length / 2);
  const left = FAQS.slice(0, mid);
  const right = FAQS.slice(mid);

  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-lg">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Questions, <span className="italic text-primary">answered.</span>
          </h2>
        </div>

        <div className="grid gap-x-10 lg:grid-cols-2">
          <Accordion type="single" collapsible className="w-full">
            {left.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="font-sans text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="font-sans">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {right.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="font-sans text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="font-sans">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}