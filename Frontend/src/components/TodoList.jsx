import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // Track editing state
  const [taskArray, setTaskArray] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        alert("You must be logged in to perform this action.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/tasks?user_id=${user_id}`
        );
        setTaskArray(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        alert("Failed to fetch tasks. Please try again.");
      }
    };
    fetchTasks();
  });

  const handleAddOrEdit = () => {
    if (todo.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }

    const user_id = localStorage.getItem("user_id");

    if (editingTaskId) {
      // Editing task
      const updatedTask = { todo };
      axios
        .put(`http://localhost:5000/tasks/${editingTaskId}`, updatedTask)
        .then((response) => {
          setTaskArray((prev) =>
            prev.map((task) =>
              task.task_id === editingTaskId ? response.data : task
            )
          );
          setTodo("");
          setEditingTaskId(null);
          alert("Task updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating task:", error.message);
          alert("Failed to update task. Please try again.");
        });
    } else {
      // Adding new task
      const newTask = { todo, user_id };
      axios
        .post("http://localhost:5000/tasks", newTask)
        .then((response) => {
          setTaskArray([...taskArray, response.data]);
          setTodo("");
          alert("Task added successfully.");
        })
        .catch((error) => {
          console.error("Error adding task:", error.message);
          alert("Failed to add task. Please try again.");
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`http://localhost:5000/tasks/${id}`)
        .then(() => {
          setTaskArray((prev) => prev.filter((task) => task.task_id !== id));
          alert("Task deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting task:", error.message);
          alert("Failed to delete task. Please try again.");
        });
    }
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const task = taskArray.find((task) => task.task_id === id);
    if (!task) return;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {
        setTaskArray((prev) =>
          prev.map((task) => (task.task_id === id ? response.data : task))
        );
        alert("Task status updated.");
      })
      .catch((error) => {
        console.error("Error updating task:", error.message);
        alert("Failed to update task. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

        <div className="flex items-center gap-4 mb-6">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your task"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddOrEdit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
        </div>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished((prev) => !prev)}
            className="mr-2"
          />
          Show Finished Tasks
        </label>

        {taskArray.length === 0 ||
        (!showFinished && taskArray.every((task) => task.isCompleted)) ? (
          <p className="text-gray-500">No tasks to display.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 py-2">
            <thead className="border border-gray-300">
              <tr className="bg-gray-100">
                <th className="border border-gray-300 border-t-1 px-4">Complete</th>
                <th className="border border-gray-300 border-t-1 px-4">Task</th>
                <th className="border border-gray-300 border-t-1 px-4">Action</th>
              </tr>
            </thead>
            <tbody  className="border border-gray-300">
              {taskArray.map((task) =>
                !showFinished && task.isCompleted ? null : (
                  <tr
                    key={task.task_id}
                    className={
                      task.isCompleted ? "opacity-60" : ""
                    }
                  >
                    <td className="border border-gray-300 border-t-1 px-4 text-center">
                      <input
                        type="checkbox"
                        name={task.task_id}
                        checked={task.isCompleted}
                        onChange={handleCheckbox}

                      />
                    </td>
                    <td className="border border-gray-300 border-t-1 px-4 w-2/3">{task.todo}</td>

                    <td className="border border-gray-300 border-t-1 px-4 text-center">
                      <button
                        onClick={() => {
                          setTodo(task.todo);
                          setEditingTaskId(task.task_id);
                        }}
                        className={
                          task.isCompleted ? "cursor-not-allowed" : ""
                        }
                      >
                        <img
                          src={"../src/assets/edit.png"}
                          alt="Edit"
                          className="w-8 h-auto rounded"
                        />
                      </button>

                      <button
                        onClick={() => handleDelete(task.task_id)}
                      >
                        <img
                          src={"../src/assets/trash.png"}
                          alt="Delete"
                          className="w-8 h-auto rounded"
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TodoList;
