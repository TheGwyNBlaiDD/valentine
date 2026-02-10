"use client";

import { useMemo, useState } from "react";
import Card from "./Card";

type Cell = { id: number } | null;

const HEART_GRID: Cell[][] = [
  // 9 колонок. null = пусто, {id} = карточка
  [null, { id: 1 }, { id: 2 }, null, null, null, { id: 3 }, { id: 4 }, null],
  [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, null, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }],
  [{ id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }],
  [null, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, null],
  [null, null, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, null, null],
  [null, null, null, { id: 34 }, { id: 35 }, { id: 36 }, null, null, null],
];


const PhotoPairGame = () => {
    const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set());
    const flippedCount = useMemo(() => flippedIds.size, [flippedIds]);

    const toggle = (id: number) => {
        setFlippedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

  return (
    <section className="w-full max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Photo Pair Game</h2>
        <span className="text-sm opacity-70">Flipped: {flippedCount}</span>
      </div>

      <div className="mt-4 rounded-3xl border bg-white/10 p-4 shadow-sm backdrop-blur">
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(9, minmax(0, 1fr))" }}>
          {HEART_GRID.flatMap((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              if (!cell) return <div key={key} className="aspect-square" />;

              return (
                <Card
                  key={key}
                  id={cell.id}
                  flipped={flippedIds.has(cell.id)}
                  onToggle={toggle}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default PhotoPairGame