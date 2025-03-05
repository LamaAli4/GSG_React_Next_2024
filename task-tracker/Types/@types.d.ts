interface ITask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  priority?: "High" | "Medium" | "Low";
}

export default ITask;
