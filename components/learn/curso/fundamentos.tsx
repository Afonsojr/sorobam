import { Soroban } from "@/components/soroban";
import { DigitPhotos } from "@/components/learn/digit-photos";
import { NumberBuilder } from "@/components/learn/number-builder";
import { Section, SubHeading, Body, Callout } from "@/components/learn/section";

export function Fundamentos() {
  return (
    <>
      <Section
        id="conhecendo"
        index="01"
        title="Conhecendo o soroban"
        lead="Antes de calcular, o soroban precisa virar uma segunda natureza: cada coluna guarda um dígito, e só as contas que tocam a barra central contam."
      >
        <Body>
          Cada coluna tem <strong className="font-medium text-foreground">quatro contas embaixo</strong> (valem 1
          cada uma) e <strong className="font-medium text-foreground">uma conta em cima</strong> (vale 5). A coluna
          inteira representa um único dígito de 0 a 9: é só somar o que está encostado na barra.
        </Body>

        <SubHeading>O “retrato” de cada dígito</SubHeading>
        <Body>
          Decore essas imagens de 0 a 9. Com elas na cabeça, você lê um número no ábaco como quem lê um relógio —
          e é exatamente assim que o anzan (cálculo mental) nasce.
        </Body>
        <DigitPhotos />

        <Callout>
          <p>
            <strong className="font-medium text-foreground">Só o que toca a barra conta.</strong> Essa é a única
            regra para ler e montar qualquer número.
          </p>
        </Callout>

        <SubHeading>Como ler: um exemplo</SubHeading>
        <Body>
          Na coluna ao lado, a conta de cima está abaixada até a barra (5) e duas de baixo também (2). O dígito é
          5 + 2 = <strong className="font-medium text-foreground">7</strong>.
        </Body>
        <Soroban value={7} columns={1} readOnly showValue className="mx-auto w-16" />
      </Section>

      <Section
        id="montando"
        index="02"
        title="Montando um número"
        lead="No soroban, o lugar importa: cada coluna vale dez vezes a da direita. O ponto vermelho na moldura marca a coluna das unidades."
      >
        <Body>
          Da direita para a esquerda, as colunas são <strong className="font-medium text-foreground">unidades,
          dezenas, centenas…</strong> Por isso 37 não é “3 + 7”, e sim <strong className="font-medium text-foreground">
          3 dezenas + 7 unidades</strong>: um 3 na coluna das dezenas e um 7 na das unidades.
        </Body>
        <div className="mx-auto max-w-xs">
          <Soroban value={37} columns={4} readOnly showValue />
        </div>
        <Body>
          Repare como a conta de cima aparece só na coluna do 7: o 3 cabe inteiro só com contas de baixo, mas o 7
          precisa da conta de 5 mais duas de 1.
        </Body>

        <SubHeading>Pratique: monte seu número</SubHeading>
        <Body>
          Use o ábaco interativo abaixo. No modo <strong className="font-medium text-foreground">Mover contas</strong>,
          clique nas contas e veja o valor crescer; no modo <strong className="font-medium text-foreground">Digitar</strong>,
          digite um número e veja onde cada dígito deve ficar.
        </Body>
        <NumberBuilder />

        <Callout>
          <p>
            <strong className="font-medium text-foreground">Comece sempre pelas unidades.</strong> No soroban o número
            “cresce” a partir da coluna da direita, e toda regra de transporte depende dela.
          </p>
        </Callout>
      </Section>
    </>
  );
}
