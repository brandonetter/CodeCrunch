import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import CodeEditor from "@/components/CodeEditor";
import { _getChallenge } from "@/lib/supabase/actions/challenges";

export default async function ChallengePage({
  params,
}: {
  params: { challenge: string };
}) {
  const challenge = await _getChallenge(params.challenge);
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="h-[calc(100vh-58px)]"
          defaultSize={30}
          minSize={30}
          maxSize={50}
        >
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={20} maxSize={65} defaultSize={25}>
              {challenge.name}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>Twos</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
