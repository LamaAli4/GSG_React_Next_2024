"use client";

import TaskItem from "@/components/TaskItem";
import ITask from "@/Types/@types";
import { useState, useEffect } from "react";

async function fetchTasks(): Promise<ITask[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.map((task: ITask) => ({
    ...task,
    priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
  }));
}

export default function Home() {
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

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
        <p className="text-lg text-red-600">
          Failed to load tasks. Please try again later.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </main>
  );
}
