import type ITask from "@/Types/@types";
import Image from "next/image";
import Link from "next/link";
import styles from "./task-item.module.css";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

type Props = {
  task: ITask;
};

const TaskItem = ({ task }: Props) => {
  const getPriorityClass = () => {
    switch (task.priority) {
      case "High":
        return styles.priorityHigh;
      case "Medium":
        return styles.priorityMedium;
      default:
        return styles.priorityLow;
    }
  };

  return (
    <li
      className={`${styles.taskItem} task-fade-in`}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div className={styles.taskContent}>
        <p className={styles.taskTitle}>{task.title}</p>

        <p className={styles.taskInfo}>
          <span className={styles.statusLabel}>Status:</span>
          <span
            className={
              task.completed ? styles.statusCompleted : styles.statusIncomplete
            }
          >
            {task.completed ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" /> Completed
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" /> Incomplete
              </>
            )}
          </span>
        </p>

        <p className={styles.taskInfo}>
          <span className={styles.statusLabel}>Priority:</span>
          <span className={`${styles.priorityText} ${getPriorityClass()}`}>
            {task.priority}
          </span>
        </p>

        <Link
          href={`/task/${task.id}?priority=${task.priority}`}
          className={styles.taskLink}
        >
          View Details <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <div className={styles.taskImage}>
        <Image
          src={task.completed ? "/checkmark.png" : "/clock.png"}
          alt="Task Status"
          width={30}
          height={30}
        />
      </div>
    </li>
  );
};

export default TaskItem;
