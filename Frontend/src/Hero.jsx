import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Hero = () => {
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

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {
        setTaskArray(
          taskArray.map((task) => (task._id === id ? response.data : task))
        );
      });
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-10">
        {/* Add Task Section */}
        <div className="addTodo my-5 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Add a Task</h2>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task here..."
              className="flex-grow rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white font-bold rounded-lg px-6 py-2 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* Show Finished Tasks Toggle */}
        <div className="flex items-center mb-6">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="rounded-md border-gray-300 text-blue-600 focus:ring focus:ring-blue-200"
          />
          <label htmlFor="show" className="ml-2 text-gray-700">
            Show Finished
          </label>
        </div>

        {/* Task List */}
        <div className="taskArray bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
          {taskArray.length === 0 ||
          (!showFinished && taskArray.every((task) => task.isCompleted)) ? (
            <div className="text-center text-gray-500 mt-4">
              No Tasks to show
            </div>
          ) : (
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 py-2 px-4 text-center w-[min-content]">
                    Completed
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-left w-full">
                    Task
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center w-[min-content]">
                    Edit
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center w-[min-content]">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskArray.map((task) => {
                  if (!showFinished && task.isCompleted) return null; // Hide completed tasks
                  return (
                    <tr
                      key={task._id}
                      className={`hover:bg-gray-50 ${
                        task.isCompleted ? "opacity-50" : ""
                      }`}
                    >
                      <td className="border border-gray-300 text-center w-[min-content]">
                        <input
                          name={task._id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={task.isCompleted}
                          className="w-5 h-5 accent-blue-500 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-4 w-full">
                        {task.todo}
                      </td>
                      <td className="border border-gray-300 text-center w-[min-content]">
                        {/* Disable the Edit button if task is completed */}
                        {!task.isCompleted && (
                          <button onClick={(e) => handleEdit(e, task._id)}>
                            <img
                              src={"../src/assets/edit.png"}
                              alt="Edit"
                              className="w-6 h-auto"
                            />
                          </button>
                        )}
                      </td>
                      <td className="border border-gray-300 text-center w-[min-content]">
                        <button onClick={(e) => handleDelete(e, task._id)}>
                          <img
                            src={"../src/assets/trash.png"}
                            alt="Delete"
                            className="w-6 h-auto"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
