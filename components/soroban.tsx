"use client";

import { useCallback, useId, useState } from "react";
import {
  type Column,
  type SorobanDigits,
  DEFAULT_COLUMNS,
  digitsToNumber,
  numberToDigits,
} from "@/lib/soroban";
import { cn } from "@/lib/utils";

type SorobanProps = {
  value?: number;
  columns?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  showValue?: boolean;
  className?: string;
};

const FRAME_BOTTOM = 276;
const BAR_Y = 116;
const BAR_H = 8;
const COL_W = 64;
const BEAD_W = 46;
const BEAD_H = 26;
const BEAD_R = 7;
const UPPER_REST_Y = 10;
const UPPER_ACTIVE_Y = BAR_Y - BEAD_H;
const LOWER_ACTIVE_Y = BAR_Y;
const LOWER_REST_TOP = 156;
const PANEL_BOTTOM = 260;
const LABEL_Y = 266;
const UNIT_DOT_Y = 273;
const LOWER_GLIDE = LOWER_ACTIVE_Y - LOWER_REST_TOP;
const COLUMN_LABELS = ["u", "d", "c", "m", "dm", "cm", "mi", "dmi", "cmi"];

const BEAD_X = (i: number) => i * COL_W + (COL_W - BEAD_W) / 2;
const COL_CX = (i: number) => i * COL_W + COL_W / 2;
const ROD_TOP = UPPER_REST_Y + 2;
const ROD_BOTTOM = PANEL_BOTTOM;

function beadShape(): string {
  return [
    `M ${BEAD_W / 2} ${BEAD_R}`,
    `Q ${BEAD_W - BEAD_R} ${BEAD_R}, ${BEAD_W - BEAD_R} ${BEAD_H / 2}`,
    `Q ${BEAD_W - BEAD_R} ${BEAD_H - BEAD_R}, ${BEAD_W / 2} ${BEAD_H - BEAD_R}`,
    `Q ${BEAD_R} ${BEAD_H - BEAD_R}, ${BEAD_R} ${BEAD_H / 2}`,
    `Q ${BEAD_R} ${BEAD_R}, ${BEAD_W / 2} ${BEAD_R}`,
    "Z",
  ].join(" ");
}

const GLIDE = { transition: "transform 0.2s ease" } as const;
const INACTIVE_OPACITY = 0.4;

export function Soroban({
  value,
  columns = DEFAULT_COLUMNS,
  onChange,
  readOnly = false,
  showValue = false,
  className,
}: SorobanProps) {
  const gradId = useId();
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<SorobanDigits>(() =>
    numberToDigits(value ?? 0, columns),
  );
  const digits = controlled ? numberToDigits(value, columns) : internal;

  const update = useCallback(
    (next: SorobanDigits) => {
      setInternal(next);
      onChange?.(digitsToNumber(next));
    },
    [onChange],
  );

  const clickLower = (col: number, slot: number) => {
    if (readOnly) return;
    const next: Column["lower"] =
      slot < digits[col].lower
        ? (slot as Column["lower"])
        : (Math.min(slot + 1, 4) as Column["lower"]);
    update(digits.map((c, i) => (i === col ? { ...c, lower: next } : c)));
  };

  const dropLower = (col: number) => {
    if (readOnly) return;
    update(digits.map((c, i) => (i === col ? { ...c, lower: 0 } : c)));
  };

  const clickUpper = (col: number) => {
    if (readOnly) return;
    update(
      digits.map((c, i) =>
        i === col ? { ...c, upper: c.upper === 1 ? 0 : 1 } : c,
      ),
    );
  };

  const currentValue = digitsToNumber(digits);
  const width = columns * COL_W;
  const lowerSlotH = BEAD_H;
  const dropZoneH = LOWER_REST_TOP - BAR_Y;
  const shape = beadShape();

  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)}>
      <svg
        viewBox={`0 0 ${width} ${FRAME_BOTTOM}`}
        className="w-full select-none"
        aria-label={`Soroban mostrando ${currentValue}`}
      >
        <defs>
          <linearGradient id={`${gradId}-upper`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97b72" />
            <stop offset="100%" stopColor="#d9433b" />
          </linearGradient>
          <linearGradient id={`${gradId}-lower`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7484fd" />
            <stop offset="100%" stopColor="#3d50d6" />
          </linearGradient>
        </defs>

        <rect
          x={2}
          y={2}
          width={width - 4}
          height={FRAME_BOTTOM - 4}
          rx={12}
          className="fill-[#f3e7d0] stroke-slate-700 dark:fill-slate-800 dark:stroke-slate-950"
          strokeWidth={2}
        />
        <rect
          x={8}
          y={8}
          width={width - 16}
          height={PANEL_BOTTOM - 16}
          rx={6}
          className="fill-[#faf6ee] dark:fill-slate-900"
        />
        <rect
          x={8}
          y={BAR_Y - BAR_H / 2}
          width={width - 16}
          height={BAR_H}
          rx={2}
          className="fill-[#eab308]"
        />

        {Array.from({ length: columns }, (_, i) => (
          <line
            key={i}
            x1={COL_CX(i)}
            y1={ROD_TOP}
            x2={COL_CX(i)}
            y2={ROD_BOTTOM}
            className="stroke-slate-900/25 dark:stroke-white/20"
            strokeWidth={1.5}
          />
        ))}

        {Array.from({ length: columns }, (_, i) => {
          const col = digits[columns - 1 - i];
          const x = BEAD_X(i);
          return (
            <g key={i}>
              <path
                d={shape}
                fill={`url(#${gradId}-upper)`}
                stroke="#1f2937"
                strokeWidth={1.5}
                strokeOpacity={0.35}
                style={{
                  opacity: col.upper ? 1 : INACTIVE_OPACITY,
                  transform: `translate(${x}px, ${
                    UPPER_REST_Y +
                    (col.upper ? UPPER_ACTIVE_Y - UPPER_REST_Y : 0)
                  }px)`,
                  ...GLIDE,
                }}
              />
              {[0, 1, 2, 3].map((slot) => {
                const active = slot < col.lower;
                const restY = LOWER_REST_TOP + slot * BEAD_H;
                return (
                  <path
                    key={slot}
                    d={shape}
                    fill={`url(#${gradId}-lower)`}
                    stroke="#1f2937"
                    strokeWidth={1.5}
                    strokeOpacity={0.35}
                    style={{
                      opacity: active ? 1 : INACTIVE_OPACITY,
                      transform: `translate(${x}px, ${
                        restY + (active ? LOWER_GLIDE : 0)
                      }px)`,
                      ...GLIDE,
                    }}
                  />
                );
              })}
            </g>
          );
        })}

        {Array.from({ length: columns }, (_, i) => {
          const col = columns - 1 - i;
          const cx = COL_CX(i);
          return (
            <g key={i}>
              <text
                x={cx}
                y={LABEL_Y}
                textAnchor="middle"
                className="fill-slate-700 dark:fill-slate-300"
                fontSize={11}
                fontWeight={500}
              >
                {COLUMN_LABELS[col] ?? `${col}`}
              </text>
              {col === 0 && (
                <circle cx={cx} cy={UNIT_DOT_Y} r={2.5} className="fill-slate-900 dark:fill-white" />
              )}
            </g>
          );
        })}

        {!readOnly &&
          Array.from({ length: columns }, (_, i) => {
            const col = columns - 1 - i;
            const x = i * COL_W;
            return (
              <g key={i} className="cursor-pointer">
                <rect
                  x={x + 4}
                  y={UPPER_REST_Y}
                  width={COL_W - 8}
                  height={BAR_Y - UPPER_REST_Y}
                  fill="transparent"
                  className="hover:fill-black/5 dark:hover:fill-white/5"
                  onClick={() => clickUpper(col)}
                />
                <rect
                  x={x + 4}
                  y={BAR_Y}
                  width={COL_W - 8}
                  height={dropZoneH}
                  fill="transparent"
                  className="hover:fill-black/5 dark:hover:fill-white/5"
                  onClick={() => dropLower(col)}
                />
                {[0, 1, 2, 3].map((slot) => (
                  <rect
                    key={slot}
                    x={x + 4}
                    y={LOWER_REST_TOP + slot * lowerSlotH}
                    width={COL_W - 8}
                    height={lowerSlotH}
                    fill="transparent"
                    className="hover:fill-black/5 dark:hover:fill-white/5"
                    onClick={() => clickLower(col, slot)}
                  />
                ))}
              </g>
            );
          })}
      </svg>

      {showValue && (
        <div className="font-mono text-2xl font-semibold tabular-nums">
          {currentValue}
        </div>
      )}
    </div>
  );
}
