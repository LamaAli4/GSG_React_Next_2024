import TaskList from "@/components/TaskList";
import ITask from "@/Types/@types";

interface HomeContentProps {
  tasks: ITask[];
}

const HomeContent = ({ tasks }: HomeContentProps) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <TaskList tasks={tasks} />
    </main>
  );
};
export default HomeContent;
