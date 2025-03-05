

import ITask from "@/Types/@types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  task: ITask;
};

const TaskItem = ({ task }: Props) => {
  return (
    <li className="p-4 border rounded-lg bg-gray-100 shadow-md flex items-center justify-between">
      <div>
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
        <Link
          href={`/task/${task.id}?priority=${task.priority}`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>

      <Image
        src={task.completed ? "/checkmark.png" : "/clock.png"}
        alt="Task Status"
        width={30}
        height={30}
        className="ml-4"
      />
    </li>
  );
};

export default TaskItem;
