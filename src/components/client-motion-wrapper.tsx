"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ClientMotionWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function ClientMotionWrapper({ 
  children, 
  delay = 0 
}: ClientMotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
} 