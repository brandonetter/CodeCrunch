"use client";
import { onlyText } from "react-children-utilities";
import { useEffect, useState, useTransition } from "react";
import { Copy } from "lucide-react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Tabs, TabsContent, TabsTrigger } from "../ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { PlayCircle } from "lucide-react";

import { runCodeRepl } from "@/lib/actions/code";
import result from "postcss/lib/result";

export const Repl = (props: any) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(">");
  const [selectedTab, setSelectedTab] = useState("code");
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setCode(onlyText(props.children));
  }, [props.children]);

  const runCode = async () => {
    startTransition(async () => {
      setSelectedTab("console");
      const result = await runCodeRepl(code);
      setOutput("> " + (result.stderr || result.stdout));
    });
  };
  return (
    <div className="my-4 mx-auto">
      <Tabs
        defaultValue="code"
        value={selectedTab}
        onChange={(e) => console.log(e)}
        className="bg-slate-800"
      >
        <TabsList className="pt-2 flex items-center">
          <PlayCircle
            onClick={!isPending ? runCode : undefined}
            size={30}
            className="shrink-0 mx-2 fill-slate-800 stroke-slate-700
            hover:cursor-pointer
            hover:stroke-green-500
            transition-all
            "
          />

          <TabsTrigger onClick={() => setSelectedTab("code")} value="code">
            Editor
          </TabsTrigger>
          <TabsTrigger
            disabled={isPending}
            onClick={() => setSelectedTab("console")}
            value="console"
          >
            Console
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="console"
          style={{
            backgroundColor: "#1e1e1e",
            height: props.height || "200px",
          }}
        >
          <pre
            className="text-white p-2 overflow-y-scroll"
            style={{
              height: props.height || "200px",
            }}
          >
            {output}
          </pre>
        </TabsContent>
        <TabsContent value="code">
          <CodeEditor
            value={code}
            language="js"
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              height: props.height || "200px",
              fontSize: 12,
              backgroundColor: "#1e1e1e",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const Code = async (props: any) => {
  const text = onlyText(props.children);
  return (
    <section className="relative">
      <pre>
        <code className="w-3/4" {...props}>
          {props.children}
        </code>
      </pre>
      <Copy
        className="absolute right-2 top-2 m-2 hover:cursor-pointer hover:stroke-green-500 transition-all"
        size={24}
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      />
    </section>
  );
};
