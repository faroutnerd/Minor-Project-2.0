import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const { user_id } = useParams();

  // Fetch tasks from the backend
  // useEffect(() => {
  //   const user_id = localStorage.getItem("user_id");
  //   axios.get(`http://localhost:5000/tasks/?user_id=${user_id}`).then((response) => {
  //     setTaskArray(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const user_id = localStorage.getItem("user_id");
  
  //     if (!user_id) {
  //       console.error("User ID not found in localStorage");
  //       return;
  //     }
  
  //     try {
  //       const response = await axios.get(`http://localhost:5000/tasks/?user_id=${user_id}`);
  //       setTaskArray(response.data); // Set the task array with data from the server
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error.response?.data || error.message);
  //     }
  //   };
  
  //   fetchTasks();
  // }, []);


  useEffect(() => {
    const fetchTasks = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        console.error("User ID not found");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/tasks?user_id=${user_id}`);
        setTaskArray(response.data); // Set the task array with data from the server
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    };
    fetchTasks();
  }, []);
  

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };


  // const handleEdit = (id) => {
  //   const updatedTask = { todo };
  //   axios
  //     .put(`http://localhost:5000/tasks/${user_id}`, updatedTask)
  //     .then(() => {
  //       setTaskArray(
  //         taskArray.map((task) =>
  //           task.task_id === id ? { ...task, ...updatedTask } : task
  //         )
  //       );
  //       setTodo("");
  //     });
  // };

  const handleEdit = (id) => {
    const updatedTask = { todo };
    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask).then((response) => {
      setTaskArray(
        taskArray.map((task) => (task.task_id === id ? response.data : task))
      );
      setTodo("");
    });
  };
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTaskArray(taskArray.filter((task) => task.task_id !== id));
    });
  };
  

  // const handleDelete = (e, id) => {
  //   axios.delete(`http://localhost:5000/tasks/${task_id}`).then(() => {
  //     setTaskArray(taskArray.filter((task) => task.task_id !== id));
  //   });
  // };

  // const handleAdd = () => {
  //   if (todo.trim() === "") return; // Prevent adding empty tasks
  //   const newTask = { todo, isCompleted: false };
  //   axios
  //     .post(`http://localhost:5000/tasks/${user_id}`, newTask)
  //     .then((response) => {
  //       setTaskArray([...taskArray, response.data]);
  //       setTodo("");
  //     });
  // };

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty tasks
    const user_id = localStorage.getItem("user_id");
    const newTask = { todo, user_id };
    axios.post("http://localhost:5000/tasks", newTask).then(() => {
      setTaskArray([...taskArray, { ...newTask, isCompleted: false }]);
      setTodo("");
    });
  };
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // const handleCheckbox = (e) => {
  //   const id = e.target.name;
  //   const task = taskArray.find((task) => task.task_id === id);
  //   const updatedTask = { ...task, isCompleted: !task.isCompleted };

  //   axios
  //     .put(`http://localhost:5000/tasks/${task_id}`, updatedTask)
  //     .then((response) => {
  //       setTaskArray(
  //         taskArray.map((task) => (task.task_id === id ? response.data : task))
  //       );
  //     });
  // };

  const handleCheckbox = (e) => {
    const id = e.target.name;
  
    // Find the task and toggle its 'isCompleted' property
    const task = taskArray.find((task) => task.task_id === id);
    if (!task) {
      console.error("Task not found");
      return;
    }
  
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
  
    // Send the updated task to the server
    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {
        // Update the local state with the response
        setTaskArray((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === id ? response.data : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error.response?.data || error.message);
      });
  };
  

  return (
    <>
      <Navbar />

      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Add a Task</h2>
        <div className="flex">
          <input
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            value={todo}
            type="text"
            placeholder="Enter your task"
            className="w-[85%] rounded-full px-5 py-1 border border-black"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-xl font-bold text-white w-52"
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
                    return null;
                  }
                  return (
                    <tr
                      key={task.task_id}
                      className={`hover:bg-gray-50 ${
                        task.isCompleted ? "opacity-50" : ""
                      }`}
                    >
                      <td className="border border-gray-300 text-center">
                        <label className="flex items-center justify-center">
                          <input
                            name={task.task_id}
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
                        <button
                          onClick={(e) => handleEdit(e, task.task_id)}
                          disabled={task.isCompleted}
                          className={`${
                            task.isCompleted
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                        >
                          <img
                            src={"../src/assets/edit.png"}
                            alt="Edit"
                            className="w-8 h-auto rounded"
                          />
                        </button>
                      </td>
                      <td className="border border-gray-300 text-center">
                        <button
                          onClick={(e) => handleDelete(e, task.task_id)}
                          className={`hover:opacity-100 ${
                            task.isCompleted ? "opacity-50" : "opacity-100"
                          }`}
                        >
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
};

export default TodoList;