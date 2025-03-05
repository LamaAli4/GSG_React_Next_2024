"use client";

import { useState, useEffect } from "react";
import { fetchTasks } from "@/services/taskService";
import ITask from "@/Types/@types";

export default function useTasks() {
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

  return { tasks, loading, error };
}