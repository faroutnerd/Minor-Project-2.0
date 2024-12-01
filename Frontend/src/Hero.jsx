import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Hero = () => {
  const [form, setForm] = useState({ task: "" });
  const [taskArray, setTaskArray] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTaskArray(JSON.parse(tasks));
    }
  }, []);

  // Save a new task
  const saveTask = () => {
    if (!form.task.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    const newTask = { ...form, id: uuidv4(), isComplete: false };
    setTaskArray((prevTaskArray) => {
      const updatedTasks = [...prevTaskArray, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setForm({ task: "" }); // Clear form input
  };

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="mx-auto text-center">TASKS</h1>

      <div className="flex flex-col p-4 text-black gap-8 items-center">
        <input
          value={form.task}
          onChange={handleChange}
          placeholder="Enter your task to complete.."
          className="rounded-full border w-full p-4 py-1"
          type="text"
          name="task"
          id="task"
        />
        <div className="flex flex-col md:flex-row w-full justify-between gap-8"></div>
        <button
          onClick={saveTask}
          className="flex justify-center items-center gap-2 rounded-full px-8 py-2 w-fit border"
        >
          Save
        </button>
      </div>

      {taskArray.length === 0 ? (
        <div className="text-center mt-4">No Tasks to show</div>
      ) : (
        taskArray.length !== 0 && (
          <div className="flex justify-center px-4">
            <table className="table-auto border-collapse border border-gray-300 w-full lg:w-2/3 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    isComplete
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
                {taskArray.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 text-center">
                      <label className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={task.isComplete}
                          className="w-5 h-5 accent-blue-500 rounded-lg border-gray-400 shadow-sm focus:ring focus:ring-blue-300"
                        />
                      </label>
                    </td>

                    <td className="border border-gray-300 text-left py-2 px-4">
                      {task.task}
                    </td>
                    <td className="border border-gray-300">
                      <button>
                        <img
                          src={"../src/assets/edit.png"}
                          alt="Edit"
                          className="w-8 h-auto rounded"
                        />
                      </button>
                    </td>
                    <td className="border border-gray-300">
                      <button>
                        <img
                          src={"../src/assets/trash.png"}
                          alt="Delete"
                          className="w-8 h-auto rounded"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default Hero;
