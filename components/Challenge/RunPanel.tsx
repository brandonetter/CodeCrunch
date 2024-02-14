import ResultsErrorTabs from "./ResultsErrorTabs";
import RunButton from "./RunButton";

export default function RunPanel() {
  return (
    <section className="relative">
      <RunButton className="absolute right-0" />
      <ResultsErrorTabs />
    </section>
  );
}
