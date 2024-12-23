import { useState } from "react";
import { evaluate } from "mathjs";
import ResultDisplay from "./components/ResultDisplay.component";
import ButtonGrid from "./components/ButtonGrid.component";
import "./App.css";

function App() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string | number>("");
  const [lastOperator, setLastOperator] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => {
      if (result !== "" && (value === "+" || value === "-")) {
        setResult("");
        return result.toString() + value;
      }

      if (
        lastOperator &&
        (value === "+" || value === "-") &&
        prevInput.endsWith(lastOperator)
      ) {
        return prevInput;
      }

      return prevInput + value;
    });

    if (value === "+" || value === "-") {
      setLastOperator(value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setLastOperator("");
  };

  const handleDelete = () => {
    if (result !== "") {
      setResult("");
    } else {
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  const calculateResult = () => {
    try {
      const iniInput = input.trim();
      if (/(\+\+|--|\+\-|\-\+|\*\*)/.test(iniInput)) {
        setResult("invalid");
        return;
      }

      const calcResult = evaluate(iniInput);
      setResult(calcResult);
      setInput(iniInput);
      setLastOperator(null);
    } catch (error) {
      setResult("invalid");
    }
  };

  return (
    <div className="container">
      <h1>Simple Calculator</h1>
      <ResultDisplay operation={input} result={result} />
      <ButtonGrid
        onButtonClick={handleButtonClick}
        onCalculate={calculateResult}
        onDelete={handleDelete}
        onClear={handleClear}
      />
    </div>
  );
}

export default App;
