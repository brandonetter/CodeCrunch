"use client";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; //Example style, you can use another
export default function CodeEditor() {
  const [code, setCode] = useState("const a = 1;");
  return (
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
  );
}
