"use client";
import { AnimatePresence } from "framer-motion";
import RunListDivs from "./RunListDivs";

export default function RunList({ challengeId }: { challengeId: number }) {
  return (
    <AnimatePresence mode="wait">
      <RunListDivs challengeId={challengeId} />
    </AnimatePresence>
  );
}
