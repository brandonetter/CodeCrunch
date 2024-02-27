import AddChalenge from "@/components/Admin/AddChallenge";
import AddLesson from "@/components/Admin/AddLesson";
import AccordionWrapper from "@/components/shared/AccordionWrapper";
export default function Admin({ searchParams }: { searchParams: any }) {
  return (
    <div>
      <AccordionWrapper>
        <AddChalenge />
        <AddChalenge />
        <AddChalenge />
        <AddLesson searchParams={searchParams} />
      </AccordionWrapper>
    </div>
  );
}
