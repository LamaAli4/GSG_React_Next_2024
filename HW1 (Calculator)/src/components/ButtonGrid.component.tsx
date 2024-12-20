// components/ButtonGrid.component.tsx
import React from "react";
import Button from "./Button.component";

interface ButtonGridProps  {
  onButtonClick: (value: string) => void;
  onCalculate: () => void;
  onDelete: () => void;
  onClear: () => void;
};

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onButtonClick,
  onCalculate,
  onDelete,
  onClear,
}) => (
  <div className="buttonsGrid">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
      <Button
        key={num}
        label={num.toString()}
        onClick={() => onButtonClick(num.toString())}
      />
    ))}
    <Button label="+" onClick={() => onButtonClick("+")} className="oButton" />
    <Button label="-" onClick={() => onButtonClick("-")} className="oButton" />
    <Button label="=" onClick={onCalculate} className="equalButton" />
    <Button label="⌫" onClick={onDelete} className="deleteButton" />
    <Button label="C" onClick={onClear} className="clearButton" />
  </div>
);

export default ButtonGrid;
