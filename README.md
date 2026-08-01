# Soroban

Ábaco japonês interativo, com página de treino de exercícios. Projeto construído com [Next.js](https://nextjs.org) (App Router) e [shadcn/ui](https://ui.shadcn.com/).

## Funcionalidades

- **Ábaco interativo** (`/`): manipule as contas clicando para somar e subtrair; a conta de cima vale 5 e as de baixo valem 1.
- **Treino** (`/treino`): gera exercícios de contas com o ábaco e acompanha o progresso.
- UI em pt-BR, componentes com Tailwind CSS v4 e Radix UI.

## Scripts

```bash
bun dev       # servidor de desenvolvimento
bun build     # build de produção
bun start     # serve o build
bun lint      # executa o eslint
```

## Como usar o ábaco

- Clique numa conta de baixo para levantá-la junto com as anteriores.
- Clique na faixa vazia abaixo da barra para zerar a coluna.
- A conta de cima alterna o valor 5.

## Estrutura

```
app/              # páginas (início e treino)
components/       # componentes do ábaco e UI
lib/              # lógica de exercícios e do soroban
```
