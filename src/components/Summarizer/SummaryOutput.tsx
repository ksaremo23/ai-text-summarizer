import { Loader } from "../UI/Loader";
import { ErrorMessage } from "../UI/ErrorMessage";

type SummaryOutputProps = {
  summary: string;
  error?: string | null;
  loading: boolean;
};

export function SummaryOutput({ summary, error, loading }: SummaryOutputProps) {
  if (loading) {
    return (
      <div className="summary-output">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-output">
        <h3>Error</h3>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="summary-output">
      <h3>AI Summary</h3>
      <div className="summary-content">
        <p>{summary}</p>
      </div>
    </div>
  );
}

