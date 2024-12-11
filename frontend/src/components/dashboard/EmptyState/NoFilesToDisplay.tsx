import { motion } from 'framer-motion';
import { BackgroundGradient } from './BackgroundGradient';
import { FloatingIcon } from './FloatingIcon';
import { Content } from './Content';

export function NoFilesToDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex-grow w-full flex flex-col justify-center items-center p-8"
    >
      <BackgroundGradient />
      <FloatingIcon />
      <Content />
    </motion.div>
  );
}