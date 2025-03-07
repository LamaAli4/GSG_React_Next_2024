
"use client";

import { useState, useEffect } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import type ITask from "@/Types/@types";
import Link from "next/link";
import styles from "../app/task/[id]/TaskDetails.module.css";
import ErrorPage from "@/app/error";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskDetailsCard from "@/app/task/TaskDetailsCard";

const TaskDetailsClient = () => {
  const { id } = useParams();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();
  const priorityFromURL = searchParams.get("priority");

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );

        if (res.status === 404) {
          return notFound();
        }

        if (!res.ok) {
          throw new Error("Server Error");
        }

        const data = await res.json();

        const validPriorities = ["High", "Medium", "Low"];
        const taskPriority =
          priorityFromURL && validPriorities.includes(priorityFromURL)
            ? priorityFromURL
            : "Medium";

        const taskWithPriority: ITask = {
          ...data,
          priority: taskPriority,
        };

        setTask(taskWithPriority);
      } catch (error) {
        if (error instanceof Error && error.message === "Server Error") {
          setServerError(true);
        } else {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id, priorityFromURL]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(task?.title || "");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (serverError) {
    return (
      <ErrorPage
        error={new Error("Server Error")}
        reset={() => setServerError(false)}
      />
    );
  }

  if (!task) {
    return notFound();
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Task Details</h1>
      <TaskDetailsCard
        task={task}
        copied={copied}
        copyToClipboard={copyToClipboard}
      />
      <div className="mt-4">
        <Link href="/" className={styles.link}>
          Back to Tasks
        </Link>
      </div>
    </main>
  );
};

export default TaskDetailsClient;
