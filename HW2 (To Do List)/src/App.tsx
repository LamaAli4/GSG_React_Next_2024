import React, { useState } from "react";
import Form from "./Components/Form/Form";
import TodoData from "./Components/TodoData/TodoData";
import AllTodos from "./Components/AllTodos/AllTodos";
import { Task } from "./types/types";

import "./App.css";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const saveToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (title: string, isUrgent: boolean) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isUrgent,
      isCompleted: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <Form onAddTask={addTask} />
      <TodoData tasks={tasks} />
      <AllTodos
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
