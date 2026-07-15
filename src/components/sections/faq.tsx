import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/scroll-reveal";

const FAQS = [
  {
    id: "trial",
    question: "Is there a free trial?",
    answer:
      "Yes. Every paid plan starts with a 14-day free trial. You can also use the Starter plan for free indefinitely.",
  },
  {
    id: "change-plan",
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time, and changes take effect on your next billing cycle.",
  },
  {
    id: "cancel",
    question: "How do I cancel?",
    answer:
      "You can cancel your subscription from your workspace settings at any time. No cancellation fees or hidden charges.",
  },
  {
    id: "data",
    question: "Where is my data stored?",
    answer:
      "Your data is stored in secure, SOC 2 compliant data centers with encryption at rest and in transit.",
  },
  {
    id: "security",
    question: "How secure is my data?",
    answer:
      "All data is encrypted in transit and at rest. Workspaces are private by default and only visible to people you explicitly invite.",
  },
  {
    id: "integrations",
    question: "Does Clarity integrate with other tools?",
    answer:
      "Clarity connects with Slack and GitHub out of the box, with more integrations on the way. You can also use our API for custom workflows.",
  },
  {
    id: "export",
    question: "Can I export my data?",
    answer:
      "Yes. You can export all your projects, tasks, and comments as CSV or JSON at any time from your workspace settings — no lock-in.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-muted/30">
      <ScrollReveal className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </section>
  );
}