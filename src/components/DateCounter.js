import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 };

const reducer = (currState, action) => {
  console.log(currState, action);
  // if (action.type === "inc") return currState + action.payload;
  // if (action.type === "dec") return currState + action.payload;
  // if (action.type === "setCount") return action.payload;

  switch (action.type) {
    case "dec":
      return { ...currState, count: currState.count - currState.step };
    case "inc":
      return { ...currState, count: currState.count + currState.step };
    case "setCount":
      return { ...currState, count: action.payload };
    case "setStep":
      return { ...currState, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [step, setStep] = useState(1);

  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
