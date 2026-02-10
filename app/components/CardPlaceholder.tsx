const CardPlaceholder = ({ id }: { id: number }) => {
  return (
    <button
      type="button"
      className="
        aspect-square w-full rounded-2xl border bg-white/70
        shadow-sm backdrop-blur
        flex items-center justify-center
        text-sm font-semibold
        hover:scale-[1.02] active:scale-[0.98]
        transition
      "
      aria-label={`Card ${id}`}
    >
      {id}
    </button>
  );
}

export default CardPlaceholder