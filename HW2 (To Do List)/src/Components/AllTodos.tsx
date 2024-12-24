import React from 'react';
import { Task } from '../types/types';
import TodoItem from './TodoItem';
import '../styles/AllTodos.css'

interface AllTodosProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const AllTodos: React.FC<AllTodosProps> = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="allTodos">
    {
      tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))
    }
    </div>
  );
};

export default AllTodos;
