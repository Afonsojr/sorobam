"use client";

import { useCallback, useMemo, useState } from "react";
import { Soroban } from "@/components/soroban";
import { TutorialDialog } from "@/components/treino/tutorial-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Treino</h1>
        <p className="mt-1 text-muted-foreground">
          Escolha um modo e resolva a operação.
        </p>
      </header>

      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="font-mono text-4xl tabular-nums">
              {operation}
            </CardTitle>
            <CardDescription>{modeMeta.hint}</CardDescription>
          </div>
          <Badge
            variant={score.total > 0 && score.correct === score.total ? "default" : "secondary"}
            className="tabular-nums"
          >
            {score.correct}/{score.total}
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {MODES.map((m) => (
              <Button
                key={m.id}
                variant={m.id === mode ? "default" : "outline"}
                size="sm"
                onClick={() => changeMode(m.id)}
              >
                {m.label}
              </Button>
            ))}
          </div>

          {mode === "mental" ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="answer">Resposta</Label>
              <div className="flex gap-2">
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
                  className={cn(
                    "text-lg font-mono",
                    status === "correct" && "border-emerald-500",
                    status === "wrong" && "border-red-500",
                  )}
                  disabled={status === "correct"}
                />
                <Button onClick={check} disabled={status === "correct"}>
                  Conferir
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Soroban
                key={frame}
                columns={6}
                onChange={setAbacusValue}
                showValue
                className="max-w-2xl"
              />
              <Button
                className="w-full max-w-xs"
                onClick={check}
                disabled={status === "correct"}
              >
                Conferir
              </Button>
            </div>
          )}

          {status === "correct" && (
            <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Correto! A resposta era {exercise.result}.
            </div>
          )}
          {status === "wrong" && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
              Errou. A resposta correta é {exercise.result}.
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Dificuldade:</span>
              {DIFFICULTIES.map((d, i) => (
                <Button
                  key={d.label}
                  variant={i === difficultyIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeDifficulty(i)}
                >
                  {d.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <TutorialDialog />
              <Button size="sm" onClick={() => newExercise()}>
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
