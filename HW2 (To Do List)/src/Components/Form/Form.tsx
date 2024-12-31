import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../Form/Form.css";

interface FormProps {
  onAddTask: (title: string, isUrgent: boolean, date: string) => void;
}

const getCurrentDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  return today.toLocaleDateString("en-US", options);
};

const Form: React.FC<FormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }
    if (!date) {
      setError("Please select date!");
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");
    onAddTask(title, isUrgent, formattedDate);
    setTitle("");
    setIsUrgent(false);
    setDate(null);
  };

  return (
    <div>
      <div className="dateHeader">
        <h2>{getCurrentDate()}</h2>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Type Todo here..."
          value={title}
          onChange={handleInputChange}
          className={error ? "inputError" : "todoInput"}
        />
        {error && <span className="errorMessage">{error}</span>}
        <label>
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          />
          Mark as urgent
        </label>
        <label>
          <span>Select a due date:</span>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            dateFormat="yyyy-MM-dd"
            className="datePicker"
            placeholderText="Click to select a date"
          />
        </label>
        <button type="submit" className="addButton">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default Form;
