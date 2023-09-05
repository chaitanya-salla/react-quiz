import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";
import Main from "./Main";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],
  // loading, error, ready,active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  maxPossiblePoints: 0,
  secondsRemaining: 10,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      console.log(action.payload);
      const total = action.payload.reduce(
        (prev, curr) => prev + curr.points,
        0
      );
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        maxPossiblePoints: total,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finished":
      return { ...state, status: "finished" };
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        maxPossiblePoints: 0,
        secondsRemaining: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown!");
  }
};

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      maxPossiblePoints,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatcher={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
