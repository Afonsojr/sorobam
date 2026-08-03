import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Dumbbell, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fundamentos } from "@/components/learn/curso/fundamentos";
import { Amigos } from "@/components/learn/curso/amigos";
import { SomaSubtracao } from "@/components/learn/curso/soma-subtracao";
import { MultiplicacaoDivisao } from "@/components/learn/curso/multiplicacao-divisao";

export const metadata: Metadata = {
  title: "Aprender — Soroban",
  description:
    "Guia interativo para aprender a pensar no soroban: montar números, amigos de 5 e 10, e as operações de soma, subtração, multiplicação e divisão.",
};

const MODULES = [
  { id: "conhecendo", index: "01", title: "Conhecendo o soroban" },
  { id: "montando", index: "02", title: "Montando um número" },
  { id: "amigos-de-5", index: "03", title: "Amigos de 5" },
  { id: "amigos-de-10", index: "04", title: "Amigos de 10" },
  { id: "compostos", index: "05", title: "Complementos compostos" },
  { id: "soma", index: "06", title: "Soma" },
  { id: "subtracao", index: "07", title: "Subtração" },
  { id: "multiplicacao", index: "08", title: "Multiplicação" },
  { id: "divisao", index: "09", title: "Divisão" },
];

function TocItem({ id, index, title }: (typeof MODULES)[number]) {
  return (
    <a
      href={`#${id}`}
      className="group flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="font-mono text-xs tabular-nums text-primary">{index}</span>
      <span className="leading-tight">{title}</span>
    </a>
  );
}

export default function AprenderPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          <GraduationCap className="size-4" aria-hidden="true" />
          Guia de aprendizagem
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
          Aprenda a pensar no soroban
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Um tour guiado, módulo a módulo: primeiro os fundamentos e a teoria dos amigos de 5 e 10, depois cada
          operação matemática com exemplos passo a passo. Siga a ordem — cada módulo constrói a base do próximo.
        </p>
      </header>

      <div className="mt-12 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-14">
        <nav aria-label="Índice dos módulos" className="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Módulos
          </p>
          <ol className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:gap-0.5">
            {MODULES.map((module) => (
              <li key={module.id} className="shrink-0 lg:shrink">
                <TocItem {...module} />
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-16">
          <Fundamentos />
          <Amigos />
          <SomaSubtracao />
          <MultiplicacaoDivisao />

          <section className="workspace-panel flex flex-col items-center gap-4 px-6 py-10 text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              Pronto para praticar?
            </h2>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              No treino você resolve operações no ábaco interativo ou de cabeça, com dificuldade progressiva e
              acompanhamento dos acertos.
            </p>
            <Button asChild className="h-10 px-5">
              <Link href="/treino">
                <Dumbbell aria-hidden="true" />
                Ir para o treino
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
