import { GuidedExample } from "@/components/learn/guided-example";
import { Section, Body, Callout } from "@/components/learn/section";

export function MultiplicacaoDivisao() {
  return (
    <>
      <Section
        id="multiplicacao"
        index="08"
        title="Multiplicação"
        lead="Na multiplicação os fatores ficam na cabeça (técnica Ryootoshi). Multiplique dígito a dígito, da direita para a esquerda, e cada parcial entra uma coluna mais à esquerda que o anterior."
      >
        <Body>
          Ao contrário da soma, a multiplicação é processada da direita para a esquerda: primeiro o dígito das
          unidades, depois o das dezenas. Cada produto parcial é somado ao ábaco deslocado <strong className="font-medium text-foreground">
          uma coluna para a esquerda</strong> em relação ao parcial anterior — é esse deslocamento que faz o valor
          “ganhar zeros” na direção certa.
        </Body>
        <GuidedExample
          title="23 × 4"
          result={92}
          steps={[
            {
              title: "Não registre os fatores no ábaco. Comece pelas unidades: 3 × 4 = 12.",
              value: 12,
              rule: "O primeiro parcial entra a partir da coluna das unidades do resultado.",
            },
            {
              title: "Agora as dezenas: 2 × 4 = 8 — mas são 8 dezenas (80). Some uma coluna à esquerda do parcial anterior.",
              value: 92,
              rule: "12 + 80 = 92.",
            },
          ]}
        />
        <GuidedExample
          title="32 × 3"
          result={96}
          steps={[
            { title: "Unidades primeiro: 2 × 3 = 6.", value: 6 },
            {
              title: "Dezenas: 3 × 3 = 9 dezenas (90). Some uma coluna à esquerda.",
              value: 96,
              rule: "6 + 90 = 96.",
            },
          ]}
        />
        <Callout>
          <p>
            <strong className="font-medium text-foreground">O porquê do deslocamento:</strong> multiplicar o dígito
            das dezenas por 4 é multiplicar por 40. Somar uma coluna à esquerda equivale a multiplicar o parcial
            por 10 — o mesmo “vai um” da soma, usado na horizontal.
          </p>
        </Callout>
      </Section>

      <Section
        id="divisao"
        index="09"
        title="Divisão"
        lead="Divida da esquerda para a direita: estime cada algarismo do quociente, anote-o e subtraia do dividendo. No soroban real o quociente fica à esquerda; aqui mostramos o passo a passo com o que resta."
      >
        <Body>
          A divisão pergunta quantas vezes o divisor cabe no dividendo. Vamos sempre trabalhar com o divisor de um
          dígito: compare o primeiro dígito do dividendo com o divisor, anote o quociente e subtraia o produto
          (quociente × divisor) do dividendo.
        </Body>
        <GuidedExample
          title="84 ÷ 4"
          result={21}
          steps={[
            { title: "Registre o dividendo 84.", value: 84, note: "Dividendo: 84" },
            {
              title: "8 ÷ 4 = 2. Anote 2 no quociente e subtraia 2 × 4 = 8 das dezenas.",
              value: 4,
              note: "Quociente parcial: 2",
              rule: "84 − 80 = 4.",
            },
            {
              title: "4 ÷ 4 = 1. Some 1 ao quociente e subtraia 1 × 4 = 4.",
              value: 0,
              note: "Quociente: 21",
              rule: "4 − 4 = 0, resto zero.",
            },
          ]}
        />
        <GuidedExample
          title="69 ÷ 3"
          result={23}
          steps={[
            { title: "Registre o dividendo 69.", value: 69, note: "Dividendo: 69" },
            {
              title: "6 ÷ 3 = 2. Subtraia 2 × 3 = 6 das dezenas.",
              value: 9,
              note: "Quociente parcial: 2",
              rule: "69 − 60 = 9.",
            },
            {
              title: "9 ÷ 3 = 3. Subtraia 3 × 3 = 9.",
              value: 0,
              note: "Quociente: 23",
              rule: "9 − 9 = 0, resto zero.",
            },
          ]}
        />
        <Callout>
          <p>
            <strong className="font-medium text-foreground">Atenção:</strong> quando o primeiro dígito do dividendo
            for menor que o divisor (ex.: 4 ÷ 8 em 45 ÷ 8), use os dois primeiros dígitos. Esse é o próximo passo
            da sua jornada.
          </p>
        </Callout>
      </Section>
    </>
  );
}
