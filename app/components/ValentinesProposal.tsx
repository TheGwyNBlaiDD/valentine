import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const ValentinesProposal = () => {
  const [accepted, setAccepted] = useState(false);
  const [noMovesLeft, setNoMovesLeft] = useState(3);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  const bounds = useMemo(() => {
    return { maxX: 300, maxY: 120 };
  }, []);

  const moveNoButton = () => {
    if (noMovesLeft <= 0) return;

    const x = Math.round((Math.random() * 2 - 1) * bounds.maxX);
    const y = Math.round((Math.random() * 2 - 1) * bounds.maxY);

    setNoOffset({ x, y });
    setNoMovesLeft((n) => n - 1);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-semibold"
      >
        Will you be my Valentine? 💘
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-md text-sm opacity-80"
      >
        I made this little game just for you.
      </motion.p>

      <div className="relative mt-2 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setAccepted(true)}
          className={[
            "rounded-xl bg-red-500 px-6 py-3 font-medium text-white shadow-lg transition",
            "active:scale-[0.98] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-red-300",
          ].join(" ")}
        >
          Yes
        </button>

        <motion.button
          type="button"
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          animate={{ x: noOffset.x, y: noOffset.y }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          disabled={accepted}
          className={[
            "rounded-xl border px-6 py-3 transition",
            "active:scale-[0.98] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30",
            accepted ? "opacity-40 cursor-not-allowed" : "opacity-80",
          ].join(" ")}
        >
          No
        </motion.button>
      </div>
    </div>
  )
}

export default ValentinesProposal