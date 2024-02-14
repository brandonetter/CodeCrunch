import { CheckCircle2, XCircleIcon } from "lucide-react";
import React from "react";
export default function TestResults({
  results,
}: {
  results: {
    test: any;
    success: boolean;
    expectedOutput: any;
    output: any;
  }[];
}) {
  if (results.length === 0) {
    return <p>Run your code to see results.</p>;
  }

  return (
    <div className="grid-cols-3 grid w-full">
      <p className="border-b-2">Test</p>
      <p className="border-b-2">Expected Output</p>
      <p className="border-b-2">Your Output</p>
      {results.map((result, i) => (
        <React.Fragment key={i}>
          <div className="flex gap-2">
            <p>
              {result.success ? (
                <CheckCircle2 fill="green" />
              ) : (
                <XCircleIcon fill="red" />
              )}
            </p>
            <p className="mb-2 text-xl font-mono">{result.test}</p>
          </div>
          <p>{result.expectedOutput}</p>
          <p>{result.output}</p>
        </React.Fragment>
      ))}
    </div>
  );
}
