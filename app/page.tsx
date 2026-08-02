"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Dumbbell, MousePointerClick, RotateCcw } from "lucide-react";
import { Soroban } from "@/components/soroban";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [value, setValue] = useState(0);
  const [frame, setFrame] = useState(0);

  const columns = 6;

  const reset = () => {
    setValue(0);
    setFrame((f) => f + 1);
  };

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[18rem_1fr] lg:gap-14">
      <section className="order-2 lg:order-1" aria-labelledby="page-title">
        <h1 id="page-title" className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
          Aprenda com as mãos.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
          Explore o ábaco japonês livremente. Cada movimento aparece no resultado em tempo real.
        </p>

        <ol className="mt-8 space-y-5 border-y py-6 text-sm">
          <li className="flex gap-3">
            <MousePointerClick className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span><strong className="font-semibold text-foreground">Contas inferiores</strong><br /><span className="leading-6 text-muted-foreground">Cada uma soma uma unidade.</span></span>
          </li>
          <li className="flex gap-3">
            <MousePointerClick className="mt-0.5 size-4 shrink-0 rotate-180 text-primary" aria-hidden="true" />
            <span><strong className="font-semibold text-foreground">Conta superior</strong><br /><span className="leading-6 text-muted-foreground">Aproximá-la da barra soma cinco.</span></span>
          </li>
        </ol>

        <Button asChild variant="outline" className="mt-6 h-10 px-4">
          <Link href="/treino">
            <Dumbbell aria-hidden="true" />
            Praticar operações
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>

      <section className="order-1 min-w-0 lg:order-2" aria-label="Ábaco interativo">
        <div className="workspace-panel">
          <div className="flex items-end justify-between gap-4 border-b px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Resultado</p>
              <output className="mt-1 block font-mono text-4xl font-medium leading-none tabular-nums sm:text-5xl" aria-live="polite">
                {value.toLocaleString("pt-BR")}
              </output>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw aria-hidden="true" />
              Zerar
            </Button>
          </div>
          <div className="bg-workspace px-3 py-5 sm:px-6 sm:py-7">
            <p className="mb-4 text-sm text-muted-foreground">
              Mova as contas em direção à barra central.
            </p>
          <Soroban
            key={frame}
            columns={columns}
            onChange={setValue}
              className="mx-auto max-w-3xl"
          />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">{columns} colunas · até 999.999</p>
      </section>
    </main>
  );
}
