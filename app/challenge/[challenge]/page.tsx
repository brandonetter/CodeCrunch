import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MarkDown from "react-markdown";
import CodeEditor from "@/components/Challenge/CodeEditor";
import { _getChallenge } from "@/lib/supabase/actions/challenges";
import remarkGfm from "remark-gfm";
import RunPanel from "@/components/Challenge/RunPanel";
export default async function ChallengePage({
  params,
}: {
  params: { challenge: string };
}) {
  const challenge = await _getChallenge(params.challenge);
  console.log(challenge);
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="h-[calc(100vh-58px)] overflow-scroll p-2"
          defaultSize={20}
          minSize={20}
          maxSize={50}
        >
          <MarkDown remarkPlugins={[remarkGfm]}>
            {challenge.description.repeat(10)}
          </MarkDown>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={20} maxSize={85} defaultSize={75}>
              <CodeEditor defaultCode={challenge.default_code} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="p-2">
              <RunPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
