"use client";

import TaskItem from "@/components/task-item/TaskItem";
import ITask from "@/Types/@types";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul >
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
export default TaskList;
