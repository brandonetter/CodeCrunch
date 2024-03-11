"use client";
import { onlyText } from "react-children-utilities";
import { isValidElement, useEffect, useState, useTransition } from "react";
import { Copy } from "lucide-react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Tabs, TabsContent, TabsTrigger } from "../ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { PlayCircle, EyeIcon, Loader2Icon } from "lucide-react";

import { runCodeRepl } from "@/lib/actions/code";
import result from "postcss/lib/result";
import React from "react";
import { motion } from "framer-motion";

const DataTable = (datum: any) => {
  try {
    const data = JSON.parse(datum);
    return (
      <div>
        {Object.keys(data).map((key) => (
          <div key={key}>
            <h2 className="opacity-70">{key}</h2>
            <table>
              <thead>
                <tr>
                  {data[key].length > 0 &&
                    Object.keys(data[key][0]).map((header) => (
                      <th
                        className="border-2 px-4 bg-white/40 text-black"
                        key={header}
                      >
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data[key]?.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white/60 text-black border-b-black border "
                  >
                    {Object.values(item).map((value, index) => (
                      <td
                        key={index}
                        className="text-center border-x-black border"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  } catch (e) {
    return "Invalid JSON";
  }
};

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
      const result = await runCodeRepl(
        code,
        props.type || "js",
        props.data || {}
      );
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
          {isPending ? (
            <Loader2Icon
              size={30}
              className="shrink-0 mx-2 fill-slate-800 stroke-slate-700 animate-spin"
            />
          ) : (
            <PlayCircle
              onClick={!isPending ? runCode : undefined}
              size={30}
              className={`shrink-0 mx-2 fill-slate-800 stroke-slate-700
            hover:cursor-pointer
            transition-all
            hover:stroke-green-500

            `}
            />
          )}

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
          {props.type === "sql" && (
            <>
              <TabsTrigger
                disabled={isPending}
                onClick={() => setSelectedTab("table")}
                value="table"
              >
                Table
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent
          value="console"
          style={{
            backgroundColor: "#1e1e1e",
            height: props.height || "200px",
          }}
        >
          <pre
            className="text-white p-2 overflow-y-auto"
            style={{
              height: props.height || "200px",
            }}
          >
            {output}
          </pre>
        </TabsContent>
        {props.type === "sql" && (
          <TabsContent value="table">
            <pre
              className="text-white p-2 overflow-y-auto"
              style={{
                height: props.height || "200px",
              }}
            >
              {DataTable(props.data)}
            </pre>
          </TabsContent>
        )}
        <TabsContent value="code">
          <div
            className="overflow-y-auto"
            style={{
              overflow: "auto",
              height: props.height || "200px",
              backgroundColor: "#1e1e1e",
            }}
          >
            <CodeEditor
              value={code}
              language="js"
              onChange={(evn) => setCode(evn.target.value)}
              padding={4}
              style={{
                minHeight: props.height || "200px",
                fontSize: 20,
                backgroundColor: "#1e1e1e",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const Code = async (props: any) => {
  const text = onlyText(props.children);
  const comment = text.match(/\/\/.*\n/);
  const code = text.replace(comment ? comment[0] : "", "");

  const cleanChildren: any = [];
  React.Children.map(props.children, (child) => {
    if (isValidElement(child)) {
      const element: any = (child.props as any).children;
      if (element !== comment?.[0]?.replace("\n", "")) {
        cleanChildren.push(child);
      }
    } else {
      cleanChildren.push(child);
    }
  });

  return (
    <section className="relative">
      {comment && (
        <div className="absolute top-0 rounded-br-[7px] left-0 py-2 px-4 bg-slate-800 text-xs text-gray-400">
          {comment[0].replace("//", "")}
        </div>
      )}
      <pre>
        <code className="w-3/4" {...props}>
          {cleanChildren.length > 0 ? cleanChildren : code}
        </code>
      </pre>
      <Copy
        className="absolute right-2 top-2 m-2 hover:cursor-pointer hover:stroke-green-500 transition-all"
        size={24}
        onClick={() => {
          navigator.clipboard.writeText(code);
        }}
      />
    </section>
  );
};

export const Blur = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <div className="rounded-lg p-1 my-4 relative">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsRevealed(true)}
        className={`${
          isRevealed && "pointer-events-none"
        } cursor-pointer absolute z-10 top-0 left-0 backdrop-blur-[5px] transition-all hover:backdrop-blur-sm w-full h-full flex justify-center items-center`}
      >
        <EyeIcon size={"40%"} className="stroke-white/20" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white/20 text-2xl absolute">Click to reveal</p>
        </motion.div>
      </motion.div>

      {props.children}
    </div>
  );
};
