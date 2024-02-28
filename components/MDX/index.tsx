import React from "react";
import { Repl } from "@/components/MDX/clientComponents";
import { Code, Blur } from "./clientComponents";
import { CircleDot } from "lucide-react";
const Test = (props: any) => {
  return (
    <h1 {...props} className="text-2xl text-red-300">
      {props.children}
    </h1>
  );
};

const YouTube = (props: any) => {
  return (
    <div className="my-4 w-full mx-auto">
      <iframe
        className="mx-auto"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export const components = (() => {
  return {
    h1: (props: any) => (
      <p {...props} className="text-2xl">
        {props.children}
      </p>
    ),
    li: (props: any) => (
      <li {...props} className="flex gap-2 items-center">
        <CircleDot size={14} />
        {props.children}
      </li>
    ),
    code: Code,
    Blur,
    Repl,
    Test,
    YouTube,
  };
})();
