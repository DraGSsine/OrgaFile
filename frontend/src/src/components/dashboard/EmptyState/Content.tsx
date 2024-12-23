import { motion } from 'framer-motion';

export function Content() {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md mx-auto px-4"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.h2
        className="text-4xl font-bold pb-2 pt-5 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Looking Empty Here
      </motion.h2>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-slate-600 leading-relaxed">
          Your workspace is ready and waiting for your creative ideas.
        </p>
      </motion.div>
    </motion.div>
  );
}