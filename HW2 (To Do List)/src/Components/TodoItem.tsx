import React from "react";
import { Task } from "../types/types";
import "../styles/TodoItem.css";

interface TodoItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => 
{
  return (
    <div className="todoItem">
      <span className={`todoTitle ${task.isCompleted ? "completed" : ""}`}>
        {task.title} {task.isUrgent && <span className="urgent">(Urgent)</span>}
      </span>
      <div className="buttonGroup">
        <button onClick={() => onToggleComplete(task.id)}>
          Toggle Complete
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
