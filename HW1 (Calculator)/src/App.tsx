    import { useState } from "react";
    import { evaluate } from "mathjs";
    import ResultDisplay from "./components/ResultDisplay.component";
    import "./App.css";

    function App() {
      const [input, setInput] = useState<string>("");
      const [result, setResult] = useState<string | number>("");
      const [lastOperator, setLastOperator] = useState<string | null>(null);

      const handleButtonClick = (value: string) => {
        setInput((prevInput) => {
          if (result !== "" && (value === "+" || value === "-")) {
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
          <div className="buttonsGrid">
          { 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                className="button"
                onClick={() => handleButtonClick(num.toString())}
              >
                {num}
              </button>
            ))
          }
            <button className="oButton" onClick={() => handleButtonClick("+")}>
              +
            </button>

            <button className="oButton" onClick={() => handleButtonClick("-")}>
              -
            </button>

            <button className="equalButton" onClick={calculateResult}>
              =
            </button>

            <button className="deleteButton" onClick={handleDelete}>
              ⌫
            </button>

            <button className="clearButton" onClick={handleClear}>
              C
            </button>
          </div>
        </div>
      );
    }

    export default App;
