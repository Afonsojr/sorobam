"use client";

import { useState } from "react";
import { Keyboard, MousePointerClick, RotateCcw } from "lucide-react";
import { Soroban } from "@/components/soroban";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "mover" | "digitar";

const MODES: { id: Mode; label: string; icon: typeof MousePointerClick }[] = [
  { id: "mover", label: "Mover contas", icon: MousePointerClick },
  { id: "digitar", label: "Digitar", icon: Keyboard },
];

const MAX = 999999;

export function NumberBuilder() {
  const [mode, setMode] = useState<Mode>("mover");
  const [typed, setTyped] = useState("");
  const [free, setFree] = useState(0);
  const [frame, setFrame] = useState(0);

  const parsed = Number.parseInt(typed, 10);
  const typedValue = Number.isNaN(parsed)
    ? 0
    : Math.max(0, Math.min(parsed, MAX));
  const displayed = mode === "mover" ? free : typedValue;

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    if (next === "digitar") setTyped(String(free));
    setMode(next);
  };

  return (
    <div className="workspace-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <div className="inline-flex rounded-lg border bg-muted/50 p-1" role="group" aria-label="Como montar o número">
          {MODES.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            return (
              <Button
                key={id}
                variant={active ? "default" : "ghost"}
                className="h-9 px-3"
                aria-pressed={active}
                onClick={() => changeMode(id)}
              >
                <Icon aria-hidden="true" />
                {label}
              </Button>
            );
          })}
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Valor
          </p>
          <output
            className="block font-mono text-2xl font-medium tabular-nums"
            aria-live="polite"
          >
            {displayed.toLocaleString("pt-BR")}
          </output>
        </div>
      </div>

      <div className="bg-workspace px-4 py-6 sm:px-6">
        {mode === "mover" ? (
          <>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Clique nas contas para montar um número, uma coluna de cada vez.
            </p>
            <Soroban
              key={frame}
              columns={6}
              onChange={setFree}
              className="mx-auto max-w-md"
            />
            <div className="mt-5 text-center">
              <Button variant="outline" size="sm" onClick={() => setFrame((f) => f + 1)}>
                <RotateCcw aria-hidden="true" />
                Zerar
              </Button>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-md">
            <Label htmlFor="build-number">Digite um número de 0 a 999.999</Label>
            <Input
              id="build-number"
              inputMode="numeric"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Ex.: 47"
              className="mt-2 font-mono text-lg"
            />
            <div className="mt-5">
              <Soroban
                value={typedValue}
                columns={6}
                readOnly
                className="mx-auto max-w-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
