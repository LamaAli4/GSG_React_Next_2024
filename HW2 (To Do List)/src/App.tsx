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

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      const isExpiredA = new Date(a.date) < new Date() && a.date !== "";
      const isExpiredB = new Date(b.date) < new Date() && b.date !== "";

      if (isExpiredA && !isExpiredB) return 1;
      if (!isExpiredA && isExpiredB) return -1;
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;

      return 0;
    });
  };

  const addTask = (title: string, isUrgent: boolean, date: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isUrgent,
      isCompleted: false,
      date,
    };

    const updatedTasks = sortTasks([newTask, ...tasks]);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const checkExpiredTasks = (tasks: Task[]) => {
    return tasks.map((task) => {
      if (new Date(task.date) < new Date() && task.date !== "") {
        return { ...task, isCompleted: false };
      }
      return task;
    });
  };

  const toggleComplete = (id: string) => {
    let updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );

    updatedTasks = checkExpiredTasks(updatedTasks);
    updatedTasks = sortTasks(updatedTasks);
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
