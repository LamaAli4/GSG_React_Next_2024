"use client";

import type ITask from "@/Types/@types";
import Image from "next/image";
import styles from "./[id]/TaskDetails.module.css";

interface ITaskDetailsCardProps {
  task: ITask;
  copied: boolean;
  copyToClipboard: () => void;
}

const TaskDetailsCard = ({
  task,
  copied,
  copyToClipboard,
}: ITaskDetailsCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{task.title}</p>
      <p className={styles.statusLabel}>
        Status:
        <span className={task.completed ? styles.completed : styles.incomplete}>
          {task.completed ? "Completed" : "Incomplete"}
        </span>
      </p>
      <p className={styles.priorityLabel}>
        Priority:
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

      <button
        onClick={copyToClipboard}
        className={`${styles.button} ${copied ? styles.buttonCopied : ""}`}
      >
        {copied ? "Copied!" : "Copy Task Title"}
      </button>

      {copied && (
        <p className={styles.copiedText}>Task title copied to clipboard!</p>
      )}
    </div>
  );
};

export default TaskDetailsCard;
