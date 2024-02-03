import PageLayout from "@/components/hoc/PageLayout";
import ChallengeCard from "@/components/Home/ChallengeCard";
import AccordionWrapper from "@/components/shared/AccordionWrapper";
import ChallengeTable from "@/components/Home/Tables/ChallengeTable/";
import { getChallenges } from "@/lib/supabase/actions/challenges";
import SearchBar from "@/components/Home/SearchBar";
import PaginationComponent from "@/components/Home/Tables/Pagination";

export default async function Home({ searchParams }: { searchParams: any }) {
  // sacrifice ssr for nicer ux of loading
  const challenges = getChallenges(searchParams);

  return (
    <PageLayout type={2}>
      <section className="flex flex-col w-full gap-8">
        <section className="flex">
          {/* <AccordionWrapper>
            <ChallengeCard title="Database Challenges" />
            <ChallengeCard title="FrontEnd Challenges" />
            <ChallengeCard title="Backend Challenges" />
          </AccordionWrapper> */}
        </section>
        <SearchBar promise={challenges} />
        <ChallengeTable promise={challenges} />
        <PaginationComponent promise={challenges} />
      </section>
    </PageLayout>
  );
}
