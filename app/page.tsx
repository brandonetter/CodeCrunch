import PageLayout from "@/components/PageLayout";
import ChallengeTable from "@/components/Home/Tables/ChallengeTable/";
import { getChallenges } from "@/lib/actions/challenges.actions";
import SearchBar from "@/components/Home/SearchBar";
import { Framer } from "../components/Animations/Framer";
import TableHeader from "@/components/Home/Tables/ChallengeTable/TableHeader";
import AnimateHeight from "@/components/Animations/AnimateHeight";
import LatestRuns from "@/components/Home/LatestRuns";
import LatestPoints from "@/components/Home/LatestPoints";
export default async function Home({ searchParams }: { searchParams: any }) {
  // unresolved promise so we can share the promise
  // with the child components and they
  // can know when the data is ready
  const challenges = getChallenges(searchParams);

  return (
    <PageLayout type={1}>
      <span className="bg-black-300">asd</span>
      <section className="flex flex-row w-full gap-8 relative">
        <div className="w-1/2">
          <LatestRuns />
        </div>
        <div className="w-1/2">
          <LatestPoints />
        </div>
      </section>
      <section className="flex flex-col w-full gap-8 relative">
        <SearchBar promise={challenges} />
        <section>
          <TableHeader promise={challenges} />
          <AnimateHeight className="bg-card">
            <Framer>
              <ChallengeTable
                promise={challenges}
                key={JSON.stringify(searchParams)}
              />
            </Framer>
          </AnimateHeight>
        </section>
      </section>
    </PageLayout>
  );
}
