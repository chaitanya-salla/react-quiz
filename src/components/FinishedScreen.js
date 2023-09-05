function FinishedScreen({ points, maxPossiblePoints, dispatcher }) {
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil((points / maxPossiblePoints) * 100)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatcher({ type: "reset" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
