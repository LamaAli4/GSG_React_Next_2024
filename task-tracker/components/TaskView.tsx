"use client";

import { fetchTasks } from "@/services/taskService";
import ITask from "@/Types/@types";
import { useState, useEffect } from "react";
import LoadingState from "./loading-state/LoadingState";
import ErrorState from "../app/ErrorState";
import TaskList from "./TaskList";

const TaskView = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getTasks() {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return <TaskList tasks={tasks} />;
};

export default TaskView;
