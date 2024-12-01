import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

const Tasks = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await getTasks(auth.token);
      setTasks(data);
    };
    fetchTasks();
  }, [auth]);

  const handleAddTask = async () => {
    const { data } = await createTask(auth.token, { task: newTask });
    setTasks([...tasks, data]);
    setNewTask("");
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span>{task.task}</span>
            <button onClick={() => deleteTask(auth.token, task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
