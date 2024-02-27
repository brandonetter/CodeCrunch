import React from "react";
import { Repl } from "@/components/MDX/clientComponents";
import { Code } from "./clientComponents";
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
    code: Code,
    Repl,
    Test,
    YouTube,
  };
})();
