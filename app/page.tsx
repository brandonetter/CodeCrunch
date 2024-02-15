import PageLayout from "@/components/hoc/PageLayout";
import ChallengeCard from "@/components/Home/ChallengeCard";
import AccordionWrapper from "@/components/shared/AccordionWrapper";
import ChallengeTable from "@/components/Home/Tables/ChallengeTable/";
import { getChallenges } from "@/lib/actions/challenges.actions";
import SearchBar from "@/components/Home/SearchBar";
import PaginationComponent from "@/components/Home/Tables/Pagination";
import { Suspense } from "react";
import { Framer } from "./Framer";
import TableHeader from "@/components/Home/Tables/ChallengeTable/TableHeader";
import AnimateHeight from "@/components/shared/AnimateHeight";
export default async function Home({ searchParams }: { searchParams: any }) {
  const challenges = getChallenges(searchParams);

  return (
    <PageLayout type={2}>
      <section className="flex flex-col w-full gap-8 relative">
        <SearchBar promise={challenges} />
        <section>
          <TableHeader promise={challenges} />
          <AnimateHeight>
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
