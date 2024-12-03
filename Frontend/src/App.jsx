import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTaskArray(response.data);
    });
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    const t = taskArray.find((task) => task._id === id);
    setTodo(t.todo);
    handleDelete(e, id); // Remove the task to update it after editing
  };

  const handleDelete = (e, id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTaskArray(taskArray.filter((task) => task._id !== id));
    });
  };

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty tasks
    const newTask = { todo, isCompleted: false };
    axios.post("http://localhost:5000/tasks", newTask).then((response) => {
      setTaskArray([...taskArray, response.data]);
      setTodo("");
    });
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const task = taskArray.find((task) => task._id === id);
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask).then((response) => {
      setTaskArray(
        taskArray.map((task) =>
          task._id === id ? response.data : task
        )
      );
    });
  };

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-center text-3xl">
        iTask - Manage your tasks in one place
      </h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Add a Todo</h2>
        <div className="flex ">
          <input
            
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1 border border-black"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
          >
            Save
          </button>
        </div>
      </div>
      <input
        className="my-4"
        id="show"
        onChange={toggleFinished}
        type="checkbox"
        checked={showFinished}
      />
      <label className="mx-2" htmlFor="show">
        Show Finished
      </label>
      <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
      <h2 className="text-2xl font-bold">Your Todos</h2>
      <div className="taskArray">
        {taskArray.length === 0 ||
        (!showFinished && taskArray.every((task) => task.isCompleted)) ? (
          <div className="text-center mt-4">No Tasks to show</div>
        ) : (
          <div className="flex justify-center px-4">
            <table className="table-auto border-collapse border border-gray-300 w-full lg:w-2/3 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    isComplete?
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-left w-1/2">
                    Task
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    Edit Task
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    Delete Task
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskArray.map((task) => {
                  if (!showFinished && task.isCompleted) {
                    return null; // Hide completed tasks when "Show Finished" is unchecked
                  }
                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 ${
                        task.isCompleted ? "opacity-50" : ""
                      }`}
                    >
                      <td className="border border-gray-300 text-center">
                        <label className="flex items-center justify-center">
                          <input
                            name={task.id}
                            onChange={handleCheckbox}
                            type="checkbox"
                            checked={task.isCompleted}
                            className="w-5 h-5 accent-blue-500 rounded-lg border-gray-400 shadow-sm focus:ring focus:ring-blue-300"
                          />
                        </label>
                      </td>
                      <td className="border border-gray-300 text-left py-2 px-4">
                        {task.todo}
                      </td>
                      <td className="border border-gray-300 text-center">
                        <button onClick={(e) => handleEdit(e, task.id)}>
                          <img
                            src={"../src/assets/edit.png"}
                            alt="Edit"
                            className="w-8 h-auto rounded"
                          />
                        </button>
                      </td>
                      <td className="border border-gray-300 text-center">
                        <button onClick={(e) => handleDelete(e, task.id)}>
                          <img
                            src={"../src/assets/trash.png"}
                            alt="Delete"
                            className="w-8 h-auto rounded"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
