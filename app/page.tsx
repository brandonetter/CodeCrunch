import PageLayout from "@/components/PageLayout";
import ChallengeTable from "@/components/Home/Tables/ChallengeTable/";
import { getChallenges } from "@/lib/actions/challenges.actions";
import SearchBar from "@/components/Home/SearchBar";
import { Framer } from "../components/Animations/Framer";
import TableHeader from "@/components/Home/Tables/ChallengeTable/TableHeader";
import AnimateHeight from "@/components/Animations/AnimateHeight";
import LatestRuns from "@/components/Home/LatestRuns";
export default async function Home({ searchParams }: { searchParams: any }) {
  const challenges = getChallenges(searchParams);

  return (
    <PageLayout type={1}>
      <LatestRuns />
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
