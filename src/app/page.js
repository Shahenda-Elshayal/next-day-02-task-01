import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import * as z from "zod/v4";

const todoSchema = z.object({
  taskName: z.string().min(3).max(20),
  description: z.string().optional(),
});

async function getTodos() {
  const tasks = await Task.find({});
  return tasks;
}

export default async function Home() {
  await connectDB();
  const tasks = await getTodos();
  await disconnectDB();

  async function createTodo(formData) {
    "use server";

    const taskName = formData.get("task_name");
    const description = formData.get("description");

    const newTask = {
      taskName,
      description,
    };

    try {
      const taskValues = await todoSchema.parseAsync(newTask);
      await connectDB();

      const task = new Task(taskValues);
      await task.save();

      await disconnectDB();

      console.log(taskValues);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-indigo-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-10">
        My Task List
      </h1>

      <form action={createTodo} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col">
          <label htmlFor="task_name" className="mb-1 text-sm font-semibold text-gray-700">
            Task Name
          </label>
          <input
            required
            id="task_name"
            name="task_name"
            placeholder="e.g., Buy groceries"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm font-semibold text-gray-700">
            Description
          </label>
          <input
            id="description"
            name="description"
            placeholder="Optional description"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-md py-2 text-lg transition-all">
          Add Task
        </button>
      </form>

      <div className="flex flex-col gap-3 mt-10 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id?.toString()}
              className="bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm text-gray-800 text-base">
              ✅ {task.taskName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
