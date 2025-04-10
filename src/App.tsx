import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [tasks, setTasks] = useState<{ name: string; difficulty: string }[]>(
    []
  );
  const [newTask, setNewTask] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { name: newTask, difficulty }];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask("");
    setDifficulty("easy"); // resetujemy do domyślnej wartości
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  });
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="bg-gray-800 w-full h-full flex justify-center items-center">
        <div className="border-2 rounded-xl bg-emerald-500 w-1/2 h-3/4">
          <div className="w-full mt-5 mb-2 flex justify-center">
            <div className="relative w-1/2">
              <input
                type="text"
                id="taskInput"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="peer  w-full px-2 pt-6 pb-2 placeholder-transparent focus:outline-none
                border-b-2 border-gray-300 focus:border-blue-500 transition-colors"
                placeholder="Add task"
              />
              <label
                htmlFor="taskInput"
                className={`absolute left-2 text-black text-sm transition-all duration-200 ease-in-out ${
                  newTask.trim() === ""
                    ? "top-6.5 text-base text-black"
                    : "top-1 text-sm text-black"
                } peer-focus:top-1 peer-focus:text-sm peer-focus:text-black`}
              >
                Add task
              </label>
            </div>
            {newTask.trim() !== "" && (
              <select
                className="border-2 mr-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            )}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <div className="bg-amber-100  w-full h-full">
            {tasks.map((task, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{task.name}</span> —
                <span className="italic text-sm ml-1">{task.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
