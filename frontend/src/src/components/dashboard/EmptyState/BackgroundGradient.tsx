import { motion } from 'framer-motion';

export function BackgroundGradient() {
  return (
    <>
      <div className="absolute inset-0  opacity-50" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6 }}
      >
        {/* Animated particles */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/80 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/80 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-400/80 rounded-full blur-[2px]"
        />
      </motion.div>
    </>
  );
}