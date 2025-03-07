"use client";

import { useState, useEffect } from "react";
import { fetchTasks } from "@/services/taskService";
import ITask from "@/Types/@types";
import LoadingState from "./loading-state/LoadingState";
import ErrorState from "../app/error";
import TaskList from "./TaskList";

const TaskView = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null); 

   const reset = () => {
    setError(null);  
    setLoading(true);  
  };

  useEffect(() => {
    async function getTasks() {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error); 
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} reset={reset} />; 

  return <TaskList tasks={tasks} />;
};

export default TaskView;
