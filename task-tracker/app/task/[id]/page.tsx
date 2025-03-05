
"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ITask from "@/Types/@types";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();
  const priorityFromURL = searchParams.get("priority");

  
  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        if (!res.ok) {
          throw new Error("Task not found");
        }
        const data = await res.json();

        const validPriorities = ["High", "Medium", "Low"];
        const taskPriority = priorityFromURL && validPriorities.includes(priorityFromURL)
          ? priorityFromURL
          : "Medium"; 

        const taskWithPriority: ITask = {
          ...data,
          priority: taskPriority,
        };

        setTask(taskWithPriority);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id, priorityFromURL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 text-lg">Task Not Found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(task.title);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="p-6 border rounded-lg bg-gray-100 shadow-md w-full max-w-md">
        <p className="text-lg font-semibold">{task.title}</p>
        <p className="text-sm">
          Status:{" "}
          <span className={task.completed ? "text-green-600" : "text-red-600"}>
            {task.completed ? "Completed" : "Incomplete"}
          </span>
        </p>
        <p className="text-sm">
          Priority:{" "}
          <span
            className={`font-bold ${
              task.priority === "High"
                ? "text-red-600"
                : task.priority === "Medium"
                ? "text-yellow-600"
                : "text-blue-600"
            }`}
          >
            {task.priority}
          </span>
        </p>

        <Image
          src={task.completed ? "/checkmark.png" : "/clock.png"}
          alt="Task Status"
          width={50}
          height={50}
          className="mt-4"
        />

        <button
          onClick={copyToClipboard}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${
            copied ? "bg-green-600" : "bg-blue-500"
          } hover:bg-blue-700 transition-all duration-300`}
        >
          {copied ? "Copied!" : "Copy Task Title"}
        </button>

        {copied && (
          <p className="text-green-600 text-sm mt-2">
            Task title copied to clipboard!
          </p>
        )}

        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Tasks
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TaskDetails;
