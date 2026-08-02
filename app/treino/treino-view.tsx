"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Brain, Calculator, CheckCircle2, XCircle } from "lucide-react";
import { Soroban } from "@/components/soroban";
import { TutorialDialog } from "@/components/treino/tutorial-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DIFFICULTIES,
  generateExercise,
  type Exercise,
} from "@/lib/exercises";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";
type Mode = "soroban" | "mental";

const MODES: { id: Mode; label: string; hint: string }[] = [
  {
    id: "soroban",
    label: "Com Soroban",
    hint: "Resolva a operação movendo as contas do ábaco, depois confira.",
  },
  {
    id: "mental",
    label: "Mental",
    hint: "Resolva visualizando o soroban na cabeça e digite o resultado.",
  },
];

export default function Treino() {
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(DIFFICULTIES[0]),
  );
  const [mode, setMode] = useState<Mode>("soroban");
  const [answer, setAnswer] = useState("");
  const [abacusValue, setAbacusValue] = useState(0);
  const [frame, setFrame] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const difficulty = DIFFICULTIES[difficultyIndex];
  const modeMeta = MODES.find((m) => m.id === mode)!;

  const newExercise = useCallback(
    (d: (typeof DIFFICULTIES)[number] = difficulty) => {
      setExercise(generateExercise(d));
      setAnswer("");
      setAbacusValue(0);
      setStatus("idle");
      setFrame((f) => f + 1);
    },
    [difficulty],
  );

  const changeDifficulty = (i: number) => {
    setDifficultyIndex(i);
    newExercise(DIFFICULTIES[i]);
  };

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setAnswer("");
    setAbacusValue(0);
    setStatus("idle");
    setFrame((f) => f + 1);
  };

  const check = () => {
    const numeric =
      mode === "mental" ? Number.parseInt(answer, 10) : abacusValue;
    if (Number.isNaN(numeric)) return;
    const correct = numeric === exercise.result;
    setStatus(correct ? "correct" : "wrong");
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const operation = useMemo(
    () => exercise.operands.join(" + ") + " = ?",
    [exercise],
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-7 flex items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Treino guiado</h1>
          <p className="mt-2 text-muted-foreground">Pratique no seu ritmo e acompanhe seus acertos.</p>
        </div>
        <div className="shrink-0 border-l pl-5 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Acertos</p>
          <p className="mt-1 font-mono text-2xl font-medium tabular-nums">
            {score.correct}<span className="text-muted-foreground">/{score.total}</span>
          </p>
        </div>
      </header>

      <section className="workspace-panel flex flex-1 flex-col" aria-label="Exercício atual">
        <div className="grid gap-5 border-b px-4 py-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Modo</p>
            <div className="inline-flex rounded-lg border bg-muted/50 p-1" role="group" aria-label="Modo de treino">
              {MODES.map((modeOption) => {
                const active = modeOption.id === mode;
                const Icon = modeOption.id === "soroban" ? Calculator : Brain;
                return (
                  <Button
                    key={modeOption.id}
                    variant={active ? "default" : "ghost"}
                    className="h-9 px-3"
                    aria-pressed={active}
                    onClick={() => changeMode(modeOption.id)}
                  >
                    <Icon aria-hidden="true" />
                    {modeOption.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground lg:text-right">Dificuldade</p>
            <div className="inline-flex rounded-lg border bg-muted/50 p-1" role="group" aria-label="Dificuldade">
              {DIFFICULTIES.map((difficultyOption, index) => (
                <Button
                  key={difficultyOption.label}
                  variant={index === difficultyIndex ? "default" : "ghost"}
                  className="h-9 px-3"
                  aria-pressed={index === difficultyIndex}
                  onClick={() => changeDifficulty(index)}
                >
                  {difficultyOption.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-workspace flex flex-1 flex-col px-4 py-6 sm:px-8 sm:py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{modeMeta.hint}</p>
            <p className="mt-3 font-mono text-4xl font-medium tracking-[-0.03em] tabular-nums sm:text-5xl">
              {operation}
            </p>
          </div>

          <div className="mx-auto mt-7 flex w-full max-w-3xl flex-1 flex-col justify-center">
          {mode === "mental" ? (
              <div className="mx-auto w-full max-w-md py-10">
              <Label htmlFor="answer">Resposta</Label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <Input
                  id="answer"
                  inputMode="numeric"
                  placeholder="Digite o resultado"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setStatus("idle");
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && status !== "correct" && check()
                  }
                    aria-invalid={status === "wrong"}
                    className={cn(
                    "h-11 font-mono text-lg sm:text-lg",
                    status === "correct" && "border-emerald-500",
                    status === "wrong" && "border-red-500",
                  )}
                  disabled={status === "correct"}
                />
                  <Button className="h-11 px-5" onClick={check} disabled={status === "correct" || answer.trim() === ""}>
                  Conferir
                </Button>
              </div>
            </div>
          ) : (
              <div className="flex flex-col items-center gap-5">
              <Soroban
                key={frame}
                columns={6}
                onChange={setAbacusValue}
                showValue
                  className="max-w-md"
              />
              <Button
                  className="h-10 w-full max-w-xs"
                onClick={check}
                disabled={status === "correct"}
              >
                Conferir
              </Button>
            </div>
          )}

          {status === "correct" && (
              <div role="status" className="mt-5 flex items-center justify-center gap-2 rounded-md bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Correto. A resposta é {exercise.result}.
            </div>
          )}
          {status === "wrong" && (
              <div role="alert" className="mt-5 flex items-center justify-center gap-2 rounded-md bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
                <XCircle className="size-4" aria-hidden="true" />
                Ainda não. A resposta correta é {exercise.result}.
            </div>
          )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 sm:px-6">
              <TutorialDialog />
          <Button className="h-9 px-4" onClick={() => newExercise()}>
                Próxima operação
            <ArrowRight aria-hidden="true" />
              </Button>
        </div>
      </section>
    </main>
  );
}
