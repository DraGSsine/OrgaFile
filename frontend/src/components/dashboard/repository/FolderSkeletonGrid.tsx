"use client";

import { motion } from "framer-motion";

export function FolderSkeletonGrid() {
  return (

    <>
      {[...Array(4)].map((_, index) => (
        <motion.div
        key={index}
        className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          </div>

          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full h-10 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          </div>
        </motion.div>
      ))}
      </>

  );
}