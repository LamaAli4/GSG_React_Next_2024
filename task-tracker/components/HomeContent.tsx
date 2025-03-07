import TaskList from "@/components/TaskList";
import ITask from "@/Types/@types";

interface HomeContentProps {
  tasks: ITask[];
}

const HomeContent = ({ tasks }: HomeContentProps) => {
  return (
    <main>
      <TaskList tasks={tasks} />
    </main>
  );
};
export default HomeContent;
