"use client";

import { PauseIcon, PlayCircleIcon } from "hugeicons-react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Card } from "@nextui-org/react";
// import { SparklesIcon } from "hugeicons-react";

// export default function DemoPage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
//       <div className="container max-w-7xl mx-auto px-4 py-24 relative">
//         {/* Decorative background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-1/2 -right-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
//           <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
//         </div>

//         {/* Hero Section */}
//         <div className="relative flex flex-col items-center text-center space-y-8 mb-20">
//           <motion.span
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2}}
//           className={` bg-purple-200 text-purple-800 border border-purple-300 rounded-full text-xs font-semibold px-3 py-1 inline-block`}
//         >
//           <SparklesIcon className="h-4 w-4 inline-block mr-1" />
//           Smart File Categorization
//         </motion.span>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="relative"
//           >
//             <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
//               <span className=" capitalize relative inline-block py-2 boujee-text ">
//                 1 Minute <br/> to Clean Your Mess!
//               </span>
//             </h1>
//             <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
//           </motion.div>
//         </div>

//         {/* Demo Display */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="relative px-4 z-10"
//         >
//           <Card className="overflow-hidden hover:scale-110 border border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm w-full max-w-4xl mx-auto hover:shadow-primary/5 transition-all duration-1000 ">
//             <div className="aspect-video relative bg-background rounded-lg overflow-hidden">
//               <div className="relative w-full h-full group">
//                 <Image
//                   width={1920}
//                   height={1080}
//                   src="https://res.cloudinary.com/decb9vsza/image/upload/v1736871887/orgafile-demo_xt6yom.gif"
//                   alt="File Organization Demo"
//                   className="object-cover w-full h-full transform transition-transform duration-700"
//                 />
//               </div>
//             </div>
//           </Card>
//         </motion.div>
//       </div>
//     </main>
//   );
// }

import Image from "next/image";
import { useState } from "react";

const DemoPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="flex min-h-[93.5vh] flex-col items-center px-4 py-16 bg-gradient-to-b from-white to-blue-50">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-purple-100">
        <span className="text-sm font-medium text-purple-700">
          🎯 Smart File Categorization
        </span>
      </div>

      {/* Headline */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 boujee-text">
          <span >1 Minute</span>
          <br />
          <span>
            To Clean Your Mess!
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Watch how OrgaFile transforms your chaotic files into a perfectly
          organized system. Just drop your files and let our AI do the magic.
        </p>
      </div>

      {/* Demo GIF Container */}
      <div className="relative max-w-4xl w-full">
        {/* Demo GIF */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <Image
            src="https://res.cloudinary.com/decb9vsza/image/upload/v1736871887/orgafile-demo_xt6yom.gif"
            alt="OrgaFile organizing files automatically"
            width={1200}
            height={800}
            className="w-full"
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default DemoPage;
