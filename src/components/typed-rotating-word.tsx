import { useEffect, useState } from "react";

const WORDS = ["startups.", "agencies.", "remote teams.", "product studios."];

/** Typewriter effect that types, pauses, deletes, and cycles to the next word. */
export function TypedRotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    const speed = deleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < current.length) {
          setDisplay(current.slice(0, display.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1300);
        }
      } else if (display.length > 0) {
        setDisplay(current.slice(0, display.length - 1));
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIndex]);

  return (
    <span className="font-sans text-primary">
      {display}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] animate-pulse bg-primary" />
    </span>
  );
}