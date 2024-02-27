import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/components/MDX";
import rehypeHighlight from "rehype-highlight";

export default async function RenderMDX({ input }: { input: string }) {
  try {
    const fromBase64 = Buffer.from(input, "base64").toString("utf-8");

    const result = await MDXRemote({
      source: fromBase64,
      components,
      options: {
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [rehypeHighlight] as any[],
        },
      },
    });
    return (
      <section id="tutorial" className="w-full p-2 text-lg mx-7">
        {result}
      </section>
    );
  } catch (error) {
    console.error(error);
    // handle the error here
    return <section className="w-1/2">Parsing Error</section>;
  }
}
