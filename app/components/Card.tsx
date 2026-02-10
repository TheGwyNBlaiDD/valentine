import Image from "next/image";

const Card = ({
  id,
  pairId,
  flipped = false,
  onToggle,
  disabled,
}: {
  id: number;
  pairId: number;
  flipped?: boolean;
  onToggle: (id: number) => void;
  disabled: boolean;
}) => {
  const src = `/game-photos/${pairId}.avif`;

  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      disabled={disabled}
      className={[
        "relative aspect-square w-full [perspective:1000px] transition",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]",
      ].join(" ")}
      aria-label={`Card ${id}`}
    >
      <div
        className={[
          "absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        {/* FRONT */}
        <div
          className="
            absolute inset-0 rounded-2xl border bg-white/10 backdrop-blur
            flex items-center justify-center
            shadow-sm
            [backface-visibility:hidden]
          "
        >
          <span className="text-2xl">❤️ {pairId}</span>
        </div>

        {/* BACK */}
        <div
          className="
            absolute inset-0 rounded-2xl border bg-white/70 overflow-hidden
            shadow-sm
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          <Image
            src={src}
            alt={`Photo ${id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 10vw, 80px"
            priority={id <= 12}
          />
        </div>
      </div>
    </button>
  );
}

export default Card