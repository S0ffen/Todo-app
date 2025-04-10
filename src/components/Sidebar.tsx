function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 h-full p-4">
      <h2 className="text-yellow-400 text-2xl font-bold mb-8">⚡ Fastodo</h2>
      <ul className="space-y-2">
        <li className="bg-yellow-400 text-black rounded px-3 py-2">School</li>
        <li className="hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
          Projects
        </li>
        <li className="hover:bg-gray-700 rounded px-3 py-2 cursor-pointer">
          Others
        </li>
        <li className="mt-4 text-sm text-yellow-300 cursor-pointer hover:underline">
          + Add Todo List
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
