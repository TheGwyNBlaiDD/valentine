"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import ValentinesProposal from "./ValentinesProposal";

type GameState = {
  opened: number[];
  matched: Set<number>;
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HEART_MASK: boolean[][] = [
  [false, true,  true,  false, false, false, true,  true,  false],
  [true,  true,  true,  true,  false, true,  true,  true,  true ],
  [true,  true,  true,  true,  true,  true,  true,  true,  true ],
  [false, true,  true,  true,  true,  true,  true,  true,  false],
  [false, false, true,  true,  true,  true,  true,  false, false],
  [false, false, false, true,  true,  true,  false, false, false],
];


const PhotoPairGame = () => {
    const [state, setState] = useState<GameState>({
        opened: [],
        matched: new Set(),
    });
    const opened = state.opened;
    const matched = state.matched;
    const openedCount = opened.length;
    const isLocked = openedCount >= 2;
    const totalPairs = 18;
    const matchedPairs = Math.floor(state.matched.size / 2);
    const isWin = matchedPairs === totalPairs;

    const deck = useMemo(() => {
        const ids = Array.from({ length: 36 }, (_, i) => i + 1);
        const shuffled = shuffle(ids);

        const idToPair = new Map<number, number>();
        for (const id of ids) idToPair.set(id, Math.ceil(id / 2));

        let idx = 0;
        const grid = HEART_MASK.map((row) =>
            row.map((isSlot) => {
            if (!isSlot) return null;
            const id = shuffled[idx++];
            return { id, pairId: idToPair.get(id)! };
            })
        );

        return { grid, idToPair };
    }, []);

    const idToPair = deck.idToPair

    const toggle = (id: number) => {
        setState((prev) => {
            if (prev.matched.has(id)) return prev;

            if (prev.opened.includes(id)) {
                return { ...prev, opened: prev.opened.filter((x) => x !== id) };
            }

            if (prev.opened.length >= 2) return prev;

            return { ...prev, opened: [...prev.opened, id] };
        });
    };

    useEffect(() => {
        if (opened.length !== 2) return;

        const [a, b] = opened;
        const pairA = idToPair.get(a);
        const pairB = idToPair.get(b);

        if (!pairA || !pairB) {
            const t = setTimeout(() => {
                setState((prev) => ({ ...prev, opened: [] }));
            }, 600);
            return () => clearTimeout(t);
        }

        if (pairA === pairB) {
            setState((prev) => {
                const nextMatched = new Set(prev.matched);
                nextMatched.add(a);
                nextMatched.add(b);
                return { matched: nextMatched, opened: [] };
            });
            return;
        }

        const t = setTimeout(() => {
            setState((prev) => ({ ...prev, opened: [] }));
        }, 600);

        return () => clearTimeout(t);
    }, [opened, idToPair]);

    if (isWin) {
        return (
            <section className="w-full max-w-3xl">
                <ValentinesProposal />
            </section>
        );
    }

  return (
    <section className="w-full max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Photo Pair Game</h2>
        <span className="text-sm opacity-70">Pairs: {matchedPairs}/{totalPairs}</span>
      </div>

      <div className="mt-4 rounded-3xl border bg-white/10 p-4 shadow-sm backdrop-blur">
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(9, minmax(0, 1fr))" }}>
          {deck.grid.flatMap((row, r) =>
            row.map((cell, c) => {
            const key = `${r}-${c}`;
            if (!cell) return <div key={key} className="aspect-square" />;

            const isFlipped = matched.has(cell.id) || opened.includes(cell.id);
            const disabled = (isLocked && !opened.includes(cell.id)) || matched.has(cell.id);

            return (
                    <Card
                    key={key}
                    id={cell.id}
                    flipped={isFlipped}
                    onToggle={toggle}
                    disabled={disabled}
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