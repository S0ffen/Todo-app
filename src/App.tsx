import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  type Task = {
    id: string;
    name: string;
    difficulty: string;
    date: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("easy");
  const [editDate, setEditDate] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const updatedTasks = [
      ...tasks,
      {
        id: uuidv4(),
        name: newTask,
        difficulty: "",
        date: "",
      },
    ];
    setTasks(updatedTasks);
    setNewTask("");
  };

  const deleteTask = (idToRemove: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(updatedTasks);
  };

  const openEditModal = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setEditId(id);
    setEditName(task.name);
    setEditDifficulty(task.difficulty);
    setEditDate(task.date);
  };

  const saveEditedTask = () => {
    if (!editId || editName.trim() === "" || editDate.trim() === "") return;

    const updatedTasks = tasks.map((task) =>
      task.id === editId
        ? {
            ...task,
            name: editName,
            difficulty: editDifficulty,
            date: editDate,
          }
        : task
    );

    setTasks(updatedTasks);
    setEditId(null);
  };

  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load tasks.json");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.error("Error loading tasks.json:", err);
      });
  }, []);

  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="bg-gray-800 w-full h-full flex justify-center items-center">
        <div className="relative border-2 rounded-xl bg-slate-400 w-1/2 max-h-[50vh] min-h-[50vh] flex flex-col">
          <div className="w-full mt-5 mb-2 flex justify-center">
            <div className="relative w-1/2">
              <input
                type="text"
                id="taskInput"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="h-10 peer w-full px-2 pt-6 pb-2 placeholder-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors"
                placeholder="Add task"
              />
              <label
                htmlFor="taskInput"
                className={`absolute left-2 text-black text-sm transition-all duration-200 ease-in-out ${
                  newTask.trim() === "" ? "top-4.5 text-base" : "top-1 text-sm"
                } peer-focus:top-1 peer-focus:text-sm peer-focus:text-black`}
              >
                Add task
              </label>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <div className="bg-slate-200 w-full flex-1 overflow-y-auto px-2 pb-4">
            <AnimatePresence>
              {[...tasks]
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-2 flex items-center justify-between px-4 py-2 bg-white shadow-sm rounded"
                  >
                    <div>
                      <span className="font-bold">{task.name}</span> —
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          task.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : task.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : task.difficulty === "hard"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {task.difficulty || "not set"}
                      </span>
                      {task.date && (
                        <span className="text-sm ml-2 text-gray-600">
                          ({new Date(task.date).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(task.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-green-600 hover:text-green-800 text-sm font-semibold"
                        title="Mark as done"
                      >
                        ✅
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {editId !== null && (
              <motion.div
                className="absolute inset-0 bg-black/50 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-6 rounded shadow-lg w-80"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                  <input
                    type="text"
                    className="w-full mb-2 border border-gray-300 px-2 py-1 rounded"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <select
                    className="w-full mb-2 border border-gray-300 px-2 py-1 rounded"
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(e.target.value)}
                  >
                    <option value="">Not set</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <input
                    type="date"
                    className="w-full mb-4 border border-gray-300 px-2 py-1 rounded"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditedTask}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
