import React, { useReducer } from "react";
import TotalDisplay from "./components/TotalDisplay";
import CalcButton from "./components/CalcButton";
import { initialState } from "./reducers";
import { addOne, applyNumber, changeOperation, clearDisplay } from "./actions";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ONE":
      return {
        ...state,
        total: state.total + 1,
      };

    case "APPLY_NUMBER":
      return {
        ...state,
        total: calculateResult(state.total, action.payload, state.operation),
      };

    case "CHANGE_OPERATION":
      return {
        ...state,
        operation: action.payload,
      };

    case "CLEAR_DISPLAY":
      return {
        ...state,
        total: 0,
      };

    default:
      return state;
  }
}

function calculateResult(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    default:
      return num1;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddOne = () => {
    dispatch({ type: "ADD_ONE" });
  };

  const handleOperatorChange = (operator) => {
    dispatch(changeOperation(operator));
  };

  const handleClearDisplay = () => {
    dispatch(clearDisplay());
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand"> Reducer Challenge</span>
      </nav>

      <div className="container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">
            <TotalDisplay value={state.total} />
            <div className="row details">
              <span id="operation">
                <b>Operation:</b> {state.operation}
              </span>
              <span id="memory">
                <b>Memory:</b> {state.memory}
              </span>
            </div>

            <div className="row">
              <CalcButton value={"M+"} />
              <CalcButton value={"MR"} />
              <CalcButton value={"MC"} />
            </div>

            <div className="row">
              <CalcButton value={1} onClick={() => dispatch(applyNumber(1))} />
              <CalcButton value={2} onClick={() => dispatch(applyNumber(2))} />
              <CalcButton value={3} onClick={() => dispatch(applyNumber(3))} />
            </div>

            <div className="row">
              <CalcButton value={4} onClick={() => dispatch(applyNumber(4))} />
              <CalcButton value={5} onClick={() => dispatch(applyNumber(5))} />
              <CalcButton value={6} onClick={() => dispatch(applyNumber(6))} />
            </div>

            <div className="row">
              <CalcButton value={7} onClick={() => dispatch(applyNumber(7))} />
              <CalcButton value={8} onClick={() => dispatch(applyNumber(8))} />
              <CalcButton value={9} onClick={() => dispatch(applyNumber(9))} />
            </div>

            <div className="row">
              <CalcButton
                value={"+"}
                onClick={() => handleOperatorChange("+")}
              />
              <CalcButton
                value={"*"}
                onClick={() => handleOperatorChange("*")}
              />
              <CalcButton
                value={"-"}
                onClick={() => handleOperatorChange("-")}
              />
            </div>

            <div className="row ce_button">
              <CalcButton value={"CE"} onClick={handleClearDisplay} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;