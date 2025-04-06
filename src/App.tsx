import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    //... to tzw. operator spread (operator rozproszenia).
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  return (
    <div className="bg-amber-200 w-full h-full flex justify-center items-center">
      <div className="border-2 rounded-xl bg-emerald-500 w-1/2 h-3/4">
        <div className="w-full mt-5 flex justify-center">
          <input
            placeholder="Add task"
            className="border-4 w-1/2"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
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
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
