import { ArrowRight } from "lucide-react";
import { Soroban } from "@/components/soroban";
import { RuleChip } from "./section";

type RuleDemoProps = {
  before: number;
  after: number;
  rule: string;
  columns?: number;
};

export function RuleDemo({ before, after, rule, columns = 1 }: RuleDemoProps) {
  const width = columns === 1 ? "w-16" : "w-32";

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-sm font-medium tabular-nums text-foreground">
        {before} → {after}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        <Soroban value={before} columns={columns} readOnly className={width} />
        <span className="flex items-center gap-1.5">
          <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
          <RuleChip>{rule}</RuleChip>
          <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <Soroban value={after} columns={columns} readOnly className={width} />
      </div>
    </div>
  );
}
