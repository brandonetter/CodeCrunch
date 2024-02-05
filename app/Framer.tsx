"use client";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useTransition } from "react";

import { uuid } from "uuidv4";
export const Framer = ({
  children,
  promise,
}: {
  children: React.ReactNode;
  promise: Promise<any>;
}) => {
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      await promise;
    });
  }, [promise]);
  //   console.log("pending", pending);
  //   if (!pending) return <>{children}</>;
  return (
    <>
      {pending && (
        <motion.div
          className="pointer-events-none backdrop-blur-[1px]  absolute top-[150px] inset-0 z-[1] h-[calc(100%-200px)]  w-full"
          key={"remember_me"}
          initial={{ opacity: 1 }}
        ></motion.div>
      )}
      <AnimatePresence mode="wait" key={"11"}>
        {pending && (
          <motion.div
            key={uuid()}
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: 1,

              transition: { duration: pending ? 0.2 : 0 },
            }}
            exit={{
              opacity: 0.7,

              transition: { duration: 0.1 },
            }}
          >
            {children}
          </motion.div>
        )}
        {!pending && <>{children}</>}
      </AnimatePresence>
    </>
  );
};
