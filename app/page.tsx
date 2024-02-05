import PageLayout from "@/components/hoc/PageLayout";
import ChallengeCard from "@/components/Home/ChallengeCard";
import AccordionWrapper from "@/components/shared/AccordionWrapper";
import ChallengeTable from "@/components/Home/Tables/ChallengeTable/";
import { getChallenges } from "@/lib/supabase/actions/challenges";
import SearchBar from "@/components/Home/SearchBar";
import PaginationComponent from "@/components/Home/Tables/Pagination";
import { Suspense } from "react";
import { Framer } from "./Framer";
export default async function Home({ searchParams }: { searchParams: any }) {
  const challenges = getChallenges(searchParams);

  return (
    <PageLayout type={2}>
      <section className="flex flex-col w-full gap-8 relative">
        <section className="flex"></section>
        <SearchBar promise={challenges} />
        <Framer promise={challenges}>
          <ChallengeTable
            promise={challenges}
            key={JSON.stringify(searchParams)}
          />
        </Framer>

        <PaginationComponent promise={challenges} />
      </section>
    </PageLayout>
  );
}
