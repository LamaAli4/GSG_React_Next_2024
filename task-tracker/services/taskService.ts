import ITask from "@/Types/@types";

export async function fetchTasks(): Promise<ITask[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.map((task: ITask) => ({
    ...task,
    priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
  }));
}
