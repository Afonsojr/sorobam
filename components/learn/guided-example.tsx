"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Soroban } from "@/components/soroban";
import { Button } from "@/components/ui/button";

export type GuidedStep = {
  title: string;
  value: number;
  rule?: string;
  note?: string;
};

type GuidedExampleProps = {
  title: string;
  steps: GuidedStep[];
  columns?: number;
  result?: number;
};

export function GuidedExample({
  title,
  steps,
  columns = 6,
  result,
}: GuidedExampleProps) {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const progress = ((index + 1) / steps.length) * 100;
  const finalResult = result ?? steps[steps.length - 1].value;

  return (
    <div className="workspace-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <p className="font-mono text-lg font-semibold tabular-nums">{title}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Passo {index + 1} de {steps.length}
        </p>
      </div>
      <div className="h-1 w-full bg-muted" aria-hidden="true">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="bg-workspace px-4 py-6 sm:px-6">
        {step.note && (
          <p className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-md bg-accent/70 px-3 py-1.5 text-sm font-medium text-accent-foreground">
            <Lightbulb className="size-4" aria-hidden="true" />
            {step.note}
          </p>
        )}
        <p className="mb-4 text-center text-sm text-muted-foreground">
          {step.title}
        </p>
        <Soroban
          value={step.value}
          columns={columns}
          readOnly
          showValue
          className="mx-auto max-w-md"
        />
        {step.rule && (
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-6 text-muted-foreground">
            {step.rule}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
        >
          <ArrowLeft aria-hidden="true" />
          Anterior
        </Button>
        {isLast ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Resultado: {finalResult}
          </p>
        ) : (
          <Button
            size="sm"
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          >
            Próximo
            <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
