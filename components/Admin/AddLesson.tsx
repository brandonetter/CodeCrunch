import { Suspense } from "react";
import RenderMDX from "../shared/MDXRenderer";
import MDX from "./MDXEditor";

export default function AddLesson({ searchParams }: { searchParams: any }) {
  return (
    <section className="flex flex-row p-2" title="Add Lesson">
      <MDX />
      <Suspense fallback={<>Loading...</>} key={searchParams}>
        <RenderMDX input={searchParams.source} />
      </Suspense>
    </section>
  );
}
