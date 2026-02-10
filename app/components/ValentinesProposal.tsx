import { motion } from "framer-motion";

const ValentinesProposal = () => {
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

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-6"
      >
        <button className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white shadow-lg">
          Yes ❤️
        </button>

        <button className="rounded-xl border px-6 py-3 opacity-70">
          No 🙈
        </button>
      </motion.div>
    </div>
  )
}

export default ValentinesProposal