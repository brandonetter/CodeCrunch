import ResultsErrorTabs from "./ResultsErrorTabs";
import RunButton from "./RunButton";

export default function RunPanel() {
  return (
    <section className="relative">
      <div className="absolute right-0">
        <RunButton />
      </div>
      <ResultsErrorTabs />
    </section>
  );
}
