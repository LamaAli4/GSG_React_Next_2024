import React, { useState } from "react";
import "../styles/Form.css";

interface FormProps {
  onAddTask: (title: string, isUrgent: boolean) => void;
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
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Task title cannot be empty!");
      return;
    }
    onAddTask(title, isUrgent);
    setTitle("");
    setIsUrgent(false);
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
            onChange={e => setIsUrgent(e.target.checked)}
          />
          Mark as urgent
        </label>
        <button type="submit" className="addButton">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default Form;