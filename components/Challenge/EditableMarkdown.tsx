import remarkGfm from "remark-gfm";
import MarkDown from "react-markdown";
export default function EditableMarkdown({ text }: { text: string }) {
  return <MarkDown remarkPlugins={[remarkGfm]}>{text}</MarkDown>;
}
