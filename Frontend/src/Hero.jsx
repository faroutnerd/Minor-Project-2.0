import React from "react";

const Manager = () => {
  const ref = useRef();
  const taskRef = useRef();
  const [form, setform] = useState({ task: "" });
  const [taskArray, setTaskArray] = useState([]);

  useEffect(() => {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTaskArray(JSON.parse(tasks));
    }
  }, []);
};

const saveTask = async () => {
  if (form.task.length > 3 ) {

      // If any such id exists in the db, delete it 
      // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      // Otherwise clear the form and show toast
      setform({ task: "" })
  }
  else {
      alert("Unable to save")
  }

}


const Hero = () => {
  return (
    <div>
      <h1 className="mx-auto">TASKS</h1>

      <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.task} onChange={handleChange} placeholder='Enter your task to complete..' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="task" id="task" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8"></div>
                    <button onClick={saveTask} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>

      {taskArray.length === 0 && <div> No Tasks to show</div>}

      {taskArray.length != 0 && (
        <table class="table-auto">
          <thead>
            <tr>
              <th>isComplete</th>
              <th>Task</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Checkbox</p>
              </td>
              <td>
                <p>London jana hai</p>
              </td>
              <td>Update</td>
              <td>Delete</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Hero;
