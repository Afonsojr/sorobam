import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

export function Section({ id, index, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-medium tabular-nums text-primary">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      </div>
      {lead && (
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {lead}
        </p>
      )}
      <div className="mt-7 space-y-8">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold tracking-[-0.01em]">{children}</h3>;
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
      {children}
    </p>
  );
}

export function RuleChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-medium tabular-nums text-primary">
      {children}
    </span>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-6">
      <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0 [&>p]:text-foreground/80">{children}</div>
    </aside>
  );
}
