import { Button } from "../ui/button";

export default function ChallengeCard({ title }: { title: string }) {
  return (
    <section
      title={title}
      className=" main-header w-full h-fit lg:w-1/3 p-2 rounded-lg flex flex-col gap-2 border-b shadow-lg shadow-blue-500/30 border-blue-500/20"
    >
      <article className="flex flex-col gap-2">
        <h2 className="max-sm:hidden font-bold">{title}</h2>
        <Button variant={"secondary"}>View All</Button>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="font-bold">Level 1</h2>
        <Button>Selecting Data</Button>
        <h2 className=" font-bold">Level 2</h2>
        <Button>Inserting Data</Button>
        <Button>Joining Tables</Button>
      </article>
    </section>
  );
}
