"use client";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; //Example style, you can use another
import { useCodeStore } from "@/context";
import { RefreshCcw } from "lucide-react";

export default function CodeEditor({ defaultCode }: { defaultCode: string }) {
  const { code, setCode } = useCodeStore();

  useEffect(() => {
    setCode(defaultCode);
  }, [defaultCode, setCode]);

  const resetCode = () => {
    setCode(defaultCode);
  };

  return (
    <section className="h-full relative">
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js, "js")}
        padding={10}
        style={{
          color: "#d6deeb",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          backgroundColor: "#2d2d2d",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />

      <RefreshCcw
        className="cursor-pointer absolute right-0 top-0 m-4 "
        size={22}
        onClick={resetCode}
      />
    </section>
  );
}
