type Props = {
  summary: string;
  error?: string | null;
};

export function SummaryOutput({ summary, error }: Props) {
  if (!summary && !error) return null;

  return (
    <div className="summary-output">
      {error ? (
        <>
          <h3>Error</h3>
          <div className="summary-content error">
            <p>{error}</p>
          </div>
        </>
      ) : (
        <>
          <h3>AI Summary</h3>
          <div className="summary-content">
            <p>{summary}</p>
          </div>
        </>
      )}
    </div>
  );
}

