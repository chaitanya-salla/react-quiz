import Timer from "./Timer";
import NextButton from "./NextButton";

const Footer = ({
  dispatch,
  answer,
  index,
  numQuestions,
  secondsRemaining,
}) => {
  return (
    <footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
    </footer>
  );
};

export default Footer;
