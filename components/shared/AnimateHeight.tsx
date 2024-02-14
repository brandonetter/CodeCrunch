"use client";
import { animate } from "framer-motion";
import React, { useState, useRef, useEffect, CSSProperties } from "react";

export interface AnimateHeightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function AnimateHeight({ children, ...props }: AnimateHeightProps) {
  const contentElement = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.target.scrollHeight);
      }
    });

    const currentContentElement = contentElement.current;

    if (currentContentElement) {
      resizeObserver.observe(currentContentElement);
    }

    return () => {
      if (currentContentElement) {
        resizeObserver.unobserve(currentContentElement);
      }
    };
  }, []);

  const containerStyle: CSSProperties = {
    height: height,
    overflow: "hidden",

    transition: `height 0.15s ease-out`,
    position: "relative",
  };

  return (
    <div {...props} style={containerStyle} key="stay" className="rounded-b-sm">
      <div ref={contentElement} className="absolute inset-x-0 top-0">
        {children}
      </div>
    </div>
  );
}

export default AnimateHeight;
