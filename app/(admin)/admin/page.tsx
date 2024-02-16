import AddChalenge from "@/components/Admin/AddChallenge";
import AccordionWrapper from "@/components/shared/AccordionWrapper";
export default function Admin() {
  return (
    <div>
      <AccordionWrapper>
        <AddChalenge />
        <AddChalenge />
        <AddChalenge />
      </AccordionWrapper>
    </div>
  );
}
