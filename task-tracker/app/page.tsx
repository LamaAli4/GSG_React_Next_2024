import TaskView from "@/components/TaskView";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <TaskView />
    </main>
  );
};
export default Home;
