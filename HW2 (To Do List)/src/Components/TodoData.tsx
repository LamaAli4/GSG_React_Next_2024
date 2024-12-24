import React from 'react';
import { Task } from '../types/types';
import '../styles/TodoData.css';

interface TodoDataProps {
  tasks: Task[];
}

const TodoData: React.FC<TodoDataProps> = ({ tasks }) => {
  const createdTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const urgentTasks = tasks.filter((task) => task.isUrgent).length;

  return (
    <div className="todoData">
      <div className="stat">
        <span className="statNumber">{createdTasks}</span>
        <span className="statLabel">Created tasks</span>
      </div>
      <div className="stat">
        <span className="statNumber">{completedTasks}</span>
        <span className="statLabel">Completed tasks</span>
      </div>
      <div className="stat">
        <span className="statNumber">{urgentTasks}</span>
        <span className="statLabel">Urgent tasks</span>
      </div>
    </div>
  );
};

export default TodoData;
