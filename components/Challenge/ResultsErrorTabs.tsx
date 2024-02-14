"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { AlertCircleIcon } from "lucide-react";
import { useCodeStore } from "@/context";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsErrorTabs() {
  const { errors, results, setCurrentTab, newErrors, newResults } =
    useCodeStore();
  return (
    <Tabs
      defaultValue="Results"
      className="w-[400px]"
      onValueChange={(e) => setCurrentTab(e)}
    >
      <TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ scale: newResults ? 1.1 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 260 }}
            key={newResults.toString()}
          >
            <TabsTrigger value="Results" className="px-8 relative">
              Results
              {newResults && (
                <AlertCircleIcon
                  fill="green"
                  className="absolute right-0 translate-x-[-80%]"
                  size={16}
                />
              )}
            </TabsTrigger>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ rotate: newErrors ? 20 : 0 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 260 }}
            key={newErrors.toString()}
          >
            <TabsTrigger value="Errors" className="px-8 relative">
              Errors
              {newErrors && (
                <AlertCircleIcon
                  fill="red"
                  size={16}
                  className="absolute right-0 translate-x-[-80%]"
                />
              )}
            </TabsTrigger>
          </motion.div>
        </AnimatePresence>
      </TabsList>
      <TabsContent value="Results">
        {results ? results : "Run your code to see the results."}
      </TabsContent>
      <TabsContent value="Errors">
        {errors ? errors : "Run your code to see the errors."}
      </TabsContent>
    </Tabs>
  );
}
