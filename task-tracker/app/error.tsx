
"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        Something Went Wrong!
      </h1>
      <p className="text-lg mb-4">
        We encountered an error while fetching the data. Please try again later.
      </p>
      <Link href="/" className="text-blue-500 hover:underline text-xl">
        Back to Tasks
      </Link>
    </main>
  );
};

export default ErrorPage;
