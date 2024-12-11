import { motion } from 'framer-motion';
import { FileSearchIcon } from 'hugeicons-react';

export function FloatingIcon() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [-10, 10],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4,
        ease: "easeInOut",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative"
      >
        <FileSearchIcon
          size={120}
          className="text-slate-800/10"
          strokeWidth={1.5}
        />
        <motion.div
          className="absolute inset-0 blur-xl  rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}