import React, { useState } from 'react';
import Form from './Components/Form';
import TodoData from './Components/TodoData';
import AllTodos from './Components/AllTodos';
import { Task } from './types/types';

import './App.css';
import './index.css';
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, isUrgent: boolean) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isUrgent,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <Form onAddTask={addTask} />
      <TodoData tasks={tasks} />
      <AllTodos tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
    </div>
  );
};

export default App;
