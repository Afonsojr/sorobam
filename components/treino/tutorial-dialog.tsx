"use client";

import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const STEPS = [
  {
    title: "Domine o soroban físico primeiro",
    body: "A imagem mental nasce do manuseio real. Pratique no ábaco interativo até automatizar a regra: só as contas que tocam a barra contam — a de cima vale 5, cada uma de baixo vale 1.",
  },
  {
    title: "Decore a 'foto' de cada dígito",
    body: "Cada número de 0 a 9 tem um padrão fixo no soroban. Treine converter número em imagem e imagem em número até reconhecer de imediato: 7 = conta de cima + 2 contas de baixo.",
  },
  {
    title: "Visualize o soroban na mente",
    body: "Comece com 1 coluna: imagine o número, depois 'some' nele movendo as contas na sua cabeça. Quando ficar fácil, use 2 colunas (dezenas), depois 3 (centenas).",
  },
  {
    title: "Some da esquerda para a direita",
    body: "Diferente da conta escrita, no cálculo mental as colunas são processadas da mais significativa para a unidade. 23 + 45: primeiro 2+4 = 6 nas dezenas, depois 3+5 = 8 nas unidades → 68.",
  },
  {
    title: "Use a regra do complemento (10)",
    body: "Quando a soma estoura a coluna, compensa na próxima: 7 + 6 → 7 + 3 = 10, sobra 3 → 13. Esse é o mesmo 'vai um' do soroban.",
  },
  {
    title: "Treine em sessões curtas e regulares",
    body: "5 a 10 minutos por dia valem mais que 1 hora esporádica. Comece com somas de 1 dígito e aumente a quantidade de parcelas quando automatizar.",
  },
];

export function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BookOpen aria-hidden="true" />
          Guia de cálculo mental
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Iniciando no cálculo mental do soroban</DialogTitle>
          <DialogDescription>
            O cálculo mental (anzan) é o soroban visualizado na cabeça. Siga os
            passos na ordem — cada um constrói a base do próximo.
          </DialogDescription>
        </DialogHeader>
        <ol className="flex flex-col gap-5 border-t pt-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
}
