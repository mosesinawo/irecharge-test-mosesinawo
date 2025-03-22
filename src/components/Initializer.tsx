import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Initializer({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + 10;
      });
    }, 500); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Initializing Game...</h2>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <p className="mt-2 text-sm">{progress}%</p>
    </div>
  );
}
