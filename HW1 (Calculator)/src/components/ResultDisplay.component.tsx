import React from "react";
import "./ResultDisplay.css";
import "../App.css";

interface ResultDisplayProps {
  result: number | string;
  operation: string | number;
}
const ResultDisplay: React.FC<ResultDisplayProps> = ({ operation, result }) => {
  return (
    <div className="resultContainer">
      <span className="operation">{operation}</span>
      {result !== "" && <span className="result"> = {result}</span>}
    </div>
  );
};

export default ResultDisplay;
