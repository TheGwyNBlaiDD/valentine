import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const ValentinesProposal = () => {
  const [accepted, setAccepted] = useState(false);
  const [noMovesLeft, setNoMovesLeft] = useState(3);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);

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

  if (accepted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl border bg-white/10 p-6 shadow-lg backdrop-blur"
        >
          <div className="text-5xl">💌</div>
          <h2 className="mt-3 text-2xl font-semibold">My Valentine</h2>
          <p className="mt-2 text-sm opacity-80">
            You just made my day. Thank you for saying yes ❤️
          </p>

          <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm opacity-90">
            “I choose you. Today and always.”
          </div>
        </motion.div>
      </div>
    );
  }

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
          onClick={() => {
            setAccepted(true);
            setChoice("yes");
          }}
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
          onClick={() => {
            moveNoButton();
            setChoice("no");
          }}
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