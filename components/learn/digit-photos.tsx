import { Soroban } from "@/components/soroban";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function DigitPhotos() {
  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:grid-cols-10">
      {DIGITS.map((digit) => (
        <figure key={digit} className="flex flex-col items-center gap-1">
          <Soroban value={digit} columns={1} readOnly className="w-16" />
          <figcaption className="font-mono text-sm font-medium tabular-nums">
            {digit}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
