"use client"
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type ITask from "@/Types/@types"
import ErrorState from "@/app/ErrorPage"
import styles from "./TaskDetails.module.css"

const TaskDetails = () => {
  const { id } = useParams()
  const [task, setTask] = useState<ITask | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  const searchParams = useSearchParams()
  const priorityFromURL = searchParams.get("priority")

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        if (!res.ok) {
          throw new Error("Task not found")
        }
        const data = await res.json()

        const validPriorities = ["High", "Medium", "Low"]
        const taskPriority = priorityFromURL && validPriorities.includes(priorityFromURL) ? priorityFromURL : "Medium"

        const taskWithPriority: ITask = {
          ...data,
          priority: taskPriority,
        }

        setTask(taskWithPriority)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id, priorityFromURL])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  if (error || !task) {
    return <ErrorState />
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(task.title)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Task Details</h1>
      <div className={styles.card}>
        <p className={styles.title}>{task.title}</p>
        <p className={styles.statusLabel}>
          Status:{" "}
          <span className={task.completed ? styles.completed : styles.incomplete}>
            {task.completed ? "Completed" : "Incomplete"}
          </span>
        </p>
        <p className={styles.priorityLabel}>
          Priority:{" "}
          <span
            className={
              task.priority === "High"
                ? styles.priorityHigh
                : task.priority === "Medium"
                  ? styles.priorityMedium
                  : styles.priorityLow
            }
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

        <button onClick={copyToClipboard} className={`${styles.button} ${copied ? styles.buttonCopied : ""}`}>
          {copied ? "Copied!" : "Copy Task Title"}
        </button>

        {copied && <p className={styles.copiedText}>Task title copied to clipboard!</p>}

        <div className="mt-4">
          <Link href="/" className={styles.link}>
            Back to Tasks
          </Link>
        </div>
      </div>
    </main>
  )
}

export default TaskDetails

