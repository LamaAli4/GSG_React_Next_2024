import TaskView from "@/components/TaskView";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <h1 className="task-header">Task Tracker</h1>
      <div className="task-container">
        <TaskView />
      </div>
    </main>
  );
};

export default Home;
