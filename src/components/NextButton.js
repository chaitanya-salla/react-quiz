const NextButton = ({ dispatch, answer, numQuestions, index }) => {
  if (answer === null) return;

  return index + 1 < numQuestions ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  ) : (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finished" })}
    >
      Finish
    </button>
  );
};

export default NextButton;
