import { GuidedExample } from "@/components/learn/guided-example";
import { RuleDemo } from "@/components/learn/rule-demo";
import { Section, SubHeading, Body, Callout } from "@/components/learn/section";

const SUM10 = [
  "+1 = +10 −9",
  "+2 = +10 −8",
  "+3 = +10 −7",
  "+4 = +10 −6",
  "+5 = +10 −5",
  "+6 = +10 −4",
  "+7 = +10 −3",
  "+8 = +10 −2",
  "+9 = +10 −1",
];

const SUB10 = [
  "−1 = −10 +9",
  "−2 = −10 +8",
  "−3 = −10 +7",
  "−4 = −10 +6",
  "−5 = −10 +5",
  "−6 = −10 +4",
  "−7 = −10 +3",
  "−8 = −10 +2",
  "−9 = −10 +1",
];

export function Amigos() {
  return (
    <>
      <Section
        id="amigos-de-5"
        index="03"
        title="Amigos de 5"
        lead="Quando faltam contas de baixo para somar ou subtrair, entra em cena a conta de cima. Os pares (1,4) e (2,3) somam 5 — por isso são chamados de amigos."
      >
        <Body>
          Cada coluna tem no máximo 4 contas de baixo. Se você está com 1 e precisa somar 4, não existe quinta
          conta de 1 para subir. A saída é <strong className="font-medium text-foreground">trocar o 4 pela conta de
          5</strong>: sobe a conta de cima e tira 1 de baixo. Soma 5, mesmo resultado, movimento possível.
        </Body>

        <SubHeading>Somar com amigo de 5</SubHeading>
        <Body>
          A regra geral: para somar um amigo, <strong className="font-medium text-foreground">desça a conta de 5 e
          remova o que faltou para completar</strong>.
        </Body>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <RuleDemo before={1} after={5} rule="+4 = +5 −1" />
          <RuleDemo before={2} after={5} rule="+3 = +5 −2" />
          <RuleDemo before={3} after={5} rule="+2 = +5 −3" />
          <RuleDemo before={4} after={5} rule="+1 = +5 −4" />
        </div>

        <SubHeading>Subtrair com amigo de 5</SubHeading>
        <Body>
          O caminho inverso. Quando a conta de 5 está abaixada e você precisa tirar mais do que há de contas de
          baixo, <strong className="font-medium text-foreground">troque o 5 de volta por contas de 1</strong>.
        </Body>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <RuleDemo before={5} after={4} rule="−1 = −5 +4" />
          <RuleDemo before={5} after={3} rule="−2 = −5 +3" />
          <RuleDemo before={5} after={2} rule="−3 = −5 +2" />
          <RuleDemo before={5} after={1} rule="−4 = −5 +1" />
        </div>

        <Callout>
          <p>
            <strong className="font-medium text-foreground">O porquê:</strong> 4 contas de baixo é o máximo de uma
            coluna. Para “passar de 4”, o 5 é o atalho — e os amigos de 5 são exatamente os pares que, juntos,
            formam esse 5.
          </p>
        </Callout>
      </Section>

      <Section
        id="amigos-de-10"
        index="04"
        title="Amigos de 10"
        lead="Quando a soma estoura o 9 de uma coluna, você precisa do transporte — o famoso “vai um”. Aí vale a regra dos complementos de 10."
      >
        <Body>
          Dois dígitos são amigos de 10 quando somam 10: <strong className="font-medium text-foreground">(1,9),
          (2,8), (3,7), (4,6)</strong> e <strong className="font-medium text-foreground">(5,5)</strong>. Num único
          dígito é impossível escrever 10, então o soroban resolve somando 1 na coluna da esquerda e removendo o
          complemento na coluna atual.
        </Body>

        <SubHeading>Somar: o “vai um”</SubHeading>
        <Body>
          Para somar <code className="font-mono text-sm">a</code>, suba 1 na coluna à esquerda e remova{" "}
          <code className="font-mono text-sm">10 − a</code> da coluna atual.
        </Body>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <RuleDemo before={9} after={10} rule="+1 = +10 −9" columns={2} />
          <RuleDemo before={8} after={10} rule="+2 = +10 −8" columns={2} />
          <RuleDemo before={7} after={10} rule="+3 = +10 −7" columns={2} />
          <RuleDemo before={6} after={10} rule="+4 = +10 −6" columns={2} />
          <RuleDemo before={5} after={10} rule="+5 = +10 −5" columns={2} />
        </div>
        <Body>Todas as combinações de soma — o número depois do +10 é sempre o complemento para chegar a 10:</Body>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {SUM10.map((rule) => (
            <p
              key={rule}
              className="rounded-md border bg-card px-3 py-2 text-center font-mono text-sm tabular-nums"
            >
              {rule}
            </p>
          ))}
        </div>

        <SubHeading>Subtrair: pegar emprestado</SubHeading>
        <Body>
          O espelho da soma. Quando o dígito não é suficiente para subtrair, <strong className="font-medium text-foreground">
          tire 1 da coluna da esquerda e devolva o complemento</strong> na coluna atual.
        </Body>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <RuleDemo before={10} after={9} rule="−1 = −10 +9" columns={2} />
          <RuleDemo before={10} after={8} rule="−2 = −10 +8" columns={2} />
          <RuleDemo before={10} after={6} rule="−4 = −10 +6" columns={2} />
          <RuleDemo before={10} after={4} rule="−6 = −10 +4" columns={2} />
          <RuleDemo before={10} after={2} rule="−8 = −10 +2" columns={2} />
          <RuleDemo before={10} after={1} rule="−9 = −10 +1" columns={2} />
        </div>
        <Body>Todas as combinações de subtração:</Body>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {SUB10.map((rule) => (
            <p
              key={rule}
              className="rounded-md border bg-card px-3 py-2 text-center font-mono text-sm tabular-nums"
            >
              {rule}
            </p>
          ))}
        </div>

        <Callout>
          <p>
            <strong className="font-medium text-foreground">Dica para decorar:</strong> memorize os cinco pares
            (1,9), (2,8), (3,7), (4,6) e (5,5). Todas as regras de transporte saem deles.
          </p>
        </Callout>
      </Section>

      <Section
        id="compostos"
        index="05"
        title="Complementos compostos"
        lead="O caso mais completo: quando o amigo de 10 manda subtrair um complemento que também não dá para remover direto, combinamos as duas regras numa mesma jogada."
      >
        <Body>
          Veja <strong className="font-medium text-foreground">8 + 6</strong>. A coluna estoura, então é amigo de
          10: <code className="font-mono text-sm">+6 = +10 −4</code>. Só que, no 8, tirar 4 também não é direto —
          de novo o amigo de 5 resolve: <code className="font-mono text-sm">−4 = −5 +1</code>. O soroban faz tudo
          numa sequência única de movimentos; o tour abaixo apenas os separa.
        </Body>
        <GuidedExample
          title="8 + 6"
          steps={[
            { title: "Registre 8 na coluna das unidades.", value: 8 },
            {
              title: "Amigo de 10: +6 = +10 −4. Primeiro, o “vai um”: suba 1 na coluna das dezenas.",
              value: 18,
            },
            {
              title: "Agora o −4. No 8 não dá para remover 4 contas de baixo, então amigo de 5: −4 = −5 +1. Remova a conta de cima.",
              value: 13,
              rule: "8 − 5 = 3.",
            },
            {
              title: "Para terminar, suba 1 conta de baixo: 3 + 1 = 4.",
              value: 14,
              rule: "Regra completa: +6 = +10 −4 = +10 −5 +1.",
            },
          ]}
        />

        <Body>
          O inverso também acontece: <strong className="font-medium text-foreground">13 − 6</strong>. Falta 6 na
          unidade, então pegamos emprestado e devolvemos o complemento — que, de novo, pede o amigo de 5.
        </Body>
        <GuidedExample
          title="13 − 6"
          steps={[
            { title: "Registre 13.", value: 13 },
            {
              title: "Amigo de 10: −6 = −10 +4. Pegue 1 emprestado da dezena (13 − 10 = 3).",
              value: 3,
            },
            {
              title: "Agora o +4 na unidade. Amigo de 5: +4 = +5 −1. Primeiro remova 1 conta de baixo.",
              value: 2,
              rule: "3 − 1 = 2.",
            },
            {
              title: "Desça a conta de cima: 2 + 5 = 7.",
              value: 7,
              rule: "Regra completa: −6 = −10 +4 = −10 +5 −1.",
            },
          ]}
        />

        <Callout>
          <p>
            <strong className="font-medium text-foreground">O porquê:</strong> um transporte raramente é só uma
            regra. Ao praticar, treine ler a operação inteira como uma sequência: amigo de 10, depois amigo de 5.
          </p>
        </Callout>
      </Section>
    </>
  );
}
