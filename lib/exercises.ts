export type Exercise = {
  operands: number[];
  result: number;
};

export type ExerciseDifficulty = {
  label: string;
  minOperands: number;
  maxOperands: number;
  minOperand: number;
  maxOperand: number;
};

export const DIFFICULTIES: ExerciseDifficulty[] = [
  { label: "Fácil", minOperands: 2, maxOperands: 2, minOperand: 1, maxOperand: 50 },
  { label: "Médio", minOperands: 2, maxOperands: 3, minOperand: 10, maxOperand: 100 },
  { label: "Difícil", minOperands: 3, maxOperands: 4, minOperand: 10, maxOperand: 200 },
];

const MAX_RESULT = 9999;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateExercise(difficulty: ExerciseDifficulty): Exercise {
  const count = randomInt(difficulty.minOperands, difficulty.maxOperands);
  for (let attempt = 0; attempt < 50; attempt++) {
    const operands = Array.from(
      { length: count },
      () => randomInt(difficulty.minOperand, difficulty.maxOperand),
    );
    const result = operands.reduce((acc, n) => acc + n, 0);
    if (result <= MAX_RESULT) {
      return { operands, result };
    }
  }
  const operands = [randomInt(1, 99)];
  return { operands, result: operands[0] };
}
