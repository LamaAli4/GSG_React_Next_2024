import React from "react";
import { Task } from "../../types/types";
import { Trash } from "phosphor-react";
import "../TodoItem/TodoItem.css";

interface TodoItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className="todoItem">
      <div className="todoDetails">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id)}
          />
          <span className="circle"></span>
        </label>
        <span className={`todoTitle ${task.isCompleted ? "completed" : ""}`}>
          {task.title} {task.isUrgent && <span className="urgent">(U)</span>}
        </span>
      </div>
      <div className="buttonGroup">
        <button
          onClick={() => onDelete(task.id)}
          style={{ backgroundColor: "#f8faff" }}
        >
          <Trash size={32} color="#bc0101" weight="fill" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
