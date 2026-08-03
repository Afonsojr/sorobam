import { GuidedExample } from "@/components/learn/guided-example";
import { Section, Body, Callout } from "@/components/learn/section";

export function SomaSubtracao() {
  return (
    <>
      <Section
        id="soma"
        index="06"
        title="Soma"
        lead="Some da esquerda para a direita, coluna a coluna — o total fica no ábaco o tempo todo."
      >
        <Body>
          Diferente da conta no papel, no soroban você começa pela coluna mais significativa (a dezena antes da
          unidade). A cada passo, o ábaco já mostra o total parcial.
        </Body>
        <GuidedExample
          title="37 + 25"
          steps={[
            { title: "Comece zerado e registre o primeiro número: 37.", value: 37 },
            {
              title: "Some as dezenas (a coluna mais significativa): 3 + 2 = 5.",
              value: 57,
              rule: "+2 na dezena: há contas livres, sem regra especial.",
            },
            {
              title: "Some as unidades: 7 + 5. A coluna estoura 9 — amigo de 10: +5 = +10 −5.",
              value: 62,
              rule: "Vai 1 para a dezena (5 + 1 = 6) e, na unidade, 7 − 5 = 2.",
            },
          ]}
        />
        <GuidedExample
          title="48 + 36"
          steps={[
            { title: "Registre 48.", value: 48 },
            { title: "Some as dezenas: 4 + 3 = 7.", value: 78 },
            {
              title: "Some as unidades: 8 + 6 = 14. Amigo de 10: +6 = +10 −4.",
              value: 84,
              rule: "Vai 1 na dezena (7 → 8). O −4 na unidade usa amigo de 5: −4 = −5 +1.",
            },
          ]}
        />
        <Callout>
          <p>
            <strong className="font-medium text-foreground">Segredo da velocidade:</strong> as regras de amigo de 5
            e de 10 aparecem em quase toda soma. Quanto mais automáticas, mais rápido você calcula.
          </p>
        </Callout>
      </Section>

      <Section
        id="subtracao"
        index="07"
        title="Subtração"
        lead="Também da esquerda para a direita. Quando um dígito não é suficiente, pegue emprestado da coluna da esquerda."
      >
        <Body>
          A subtração é a soma ao contrário. O cuidado é reconhecer na hora quando o dígito não dá e disparar o
          “pegar emprestado” com o amigo de 10.
        </Body>
        <GuidedExample
          title="63 − 28"
          steps={[
            { title: "Registre 63.", value: 63 },
            { title: "Subtraia as dezenas: 6 − 2 = 4.", value: 43 },
            {
              title: "Subtraia as unidades: 3 − 8 não dá. Amigo de 10: −8 = −10 +2.",
              value: 35,
              rule: "Tire 1 da dezena (4 − 1 = 3) e some o complemento 2 na unidade (3 + 2 = 5).",
            },
          ]}
        />
        <GuidedExample
          title="52 − 17"
          steps={[
            { title: "Registre 52.", value: 52 },
            { title: "Subtraia as dezenas: 5 − 1 = 4.", value: 42 },
            {
              title: "Subtraia as unidades: 2 − 7 não dá. Amigo de 10: −7 = −10 +3.",
              value: 35,
              rule: "Pegue emprestado: a dezena vai de 4 para 3 e a unidade recebe +3 (2 + 3 = 5).",
            },
          ]}
        />
        <Callout>
          <p>
            <strong className="font-medium text-foreground">O porquê:</strong> emprestar 1 dezena é “trocar” 10
            unidades. Devolver o complemento (10 − dígito subtraído) coloca exatamente o que sobrou na unidade.
          </p>
        </Callout>
      </Section>
    </>
  );
}
