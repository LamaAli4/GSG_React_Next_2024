
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Task Not Found</h1>
      <p className="text-lg mb-4">
        The task you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-500 hover:underline text-xl">
        Back to Tasks
      </Link>
    </main>
  );
};

export default NotFound;
