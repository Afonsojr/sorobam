export type Column = {
  upper: 0 | 1;
  lower: 0 | 1 | 2 | 3 | 4;
};

export type SorobanDigits = Column[];

export const COLUMN_WEIGHTS = ["unidade", "dezena", "centena", "milhar", "dezena de milhar", "centena de milhar"] as const;

export const DEFAULT_COLUMNS = 4;

export function numberToDigits(value: number, columns = DEFAULT_COLUMNS): SorobanDigits {
  return Array.from({ length: columns }, (_, i) => {
    const digit = Math.floor(value / 10 ** i) % 10;
    return { upper: digit >= 5 ? 1 : 0, lower: (digit % 5) as Column["lower"] };
  });
}

export function digitsToNumber(digits: SorobanDigits): number {
  return digits.reduce(
    (acc, col, i) => acc + ((col.upper ? 5 : 0) + col.lower) * 10 ** i,
    0,
  );
}

export function clampDigits(digits: SorobanDigits, maxValue: number): SorobanDigits {
  const value = digitsToNumber(digits);
  return numberToDigits(Math.min(value, maxValue), digits.length);
}

export function columnValue(col: Column): number {
  return (col.upper ? 5 : 0) + col.lower;
}
