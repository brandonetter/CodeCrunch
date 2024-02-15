import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MarkDown from "react-markdown";
import CodeEditor from "@/components/Challenge/CodeEditor";
import { getChallenge } from "@/lib/actions/challenges.actions";
import remarkGfm from "remark-gfm";
import RunPanel from "@/components/Challenge/RunPanel";
export default async function ChallengePage({
  params,
}: {
  params: { challenge: string };
}) {
  const challenge = await getChallenge(params.challenge);

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
            {challenge?.description}
          </MarkDown>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={20} maxSize={85} defaultSize={75}>
              <CodeEditor defaultCode={challenge?.default_code!} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="p-2" defaultSize={25}>
              <RunPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
