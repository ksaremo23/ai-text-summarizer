import { TextInput } from "../components/TextInput";
import { SummaryOutput } from "../components/SummaryOutput";
import { useAISummary } from "../hooks/useAISummary";

export default function Dashboard() {
  const { summary, loading, error, generateSummary } = useAISummary();

  return (
    <div className="dashboard">
      <TextInput onSubmit={generateSummary} loading={loading} />
      <SummaryOutput summary={summary} error={error} />
    </div>
  );
}

