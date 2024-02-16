"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const title = child.props.title || `Section ${index + 1}`;
          return (
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{React.cloneElement(child)}</AccordionContent>
            </AccordionItem>
          );
        }
        return null;
      })}
    </Accordion>
  );
}
