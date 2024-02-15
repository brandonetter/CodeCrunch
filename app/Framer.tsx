"use client";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";

import { uuid } from "uuidv4";
export const Framer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait" key="123">
      <motion.div
        className="rounded-sm"
        key={uuid()}
        initial={{ opacity: 0.1 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.2 },
        }}
        exit={{
          opacity: 0.1,
          transition: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
