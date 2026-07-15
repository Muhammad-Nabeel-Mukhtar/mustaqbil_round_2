import { useState } from "react";
import { Layout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // No backend wired up for this assessment — this simply confirms the
    // interaction locally. Swap for a real API call when one exists.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layout className="h-4 w-4" />
              </div>
              Clarity
            </a>
            <nav className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Security</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </nav>
          </div>

          <div className="w-full max-w-sm">
            <p className="text-sm font-semibold text-foreground">Product updates</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Occasional emails about new features. No spam.
            </p>
            {submitted ? (
              <p className="mt-3 text-sm font-medium text-primary">You're subscribed — thanks!</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email for product updates"
                />
                <Button type="submit" variant="outline" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Clarity, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}