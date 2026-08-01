"use client";

import { useState } from "react";
import { Soroban } from "@/components/soroban";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [value, setValue] = useState(0);
  const [frame, setFrame] = useState(0);

  const columns = 6;

  const reset = () => {
    setValue(0);
    setFrame((f) => f + 1);
  };

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Soroban</h1>
        <p className="mt-1 text-muted-foreground">
          Ábaco japonês interativo — clique nas contas para calcular.
        </p>
      </header>

      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-mono text-3xl tabular-nums">
              {value.toLocaleString("pt-BR")}
            </CardTitle>
            <CardDescription>
              Conta de cima vale 5, cada conta de baixo vale 1.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{columns} colunas</Badge>
            <Button variant="outline" size="sm" onClick={reset}>
              Zerar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Soroban
            key={frame}
            columns={columns}
            onChange={setValue}
            className="max-w-2xl"
          />
        </CardContent>
      </Card>

      <p className="max-w-xl text-center text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Como usar:</span> clique
        numa conta de baixo para levantá-la (junto com as anteriores); clique na
        faixa vazia logo abaixo da barra para zerar a coluna; a conta de cima
        alterna o valor 5. Passe o mouse para ver onde clicar.
      </p>
    </main>
  );
}
