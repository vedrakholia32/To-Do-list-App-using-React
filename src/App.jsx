import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [textColor, setTextColor] = useState("text-gray-900"); 
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
   
    const averageColor = [220, 220, 220]; 
    setTextColor(averageColor[0] > 180 ? "text-gray-800" : "text-white"); 
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    if (t) {
      setTodo(t.todo);
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }]);
      setTodo("");
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    let index = todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`container bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg ${darkMode ? 'dark:bg-gray-800' : 'dark:bg-white'}`} style={{ boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)" }}>
        <h1 className={`text-3xl font-bold mb-6 text-center font-sans ${darkMode ? 'dark:text-white' : 'dark:text-gray-800'}`}>To-Do List App</h1>
        <div className="mb-6 relative">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Add a Todo"
            className={`w-full rounded-lg px-4 py-2 ${darkMode ? 'dark:bg-gray-700 dark:text-white' : 'dark:bg-gray-200 dark:text-gray-900'} bg-opacity-40 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:bg-opacity-50 border-none font-sans`}
          />
          <button
            onClick={handleAdd}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white font-bold rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
          >
            +
          </button>
        </div>
        <div className="mt-6">
          {todos.map((item) => (
            <div key={item.id} className={`flex justify-between items-center mb-4 ${darkMode ? 'dark:bg-gray-800' : 'dark:bg-gray-200'} bg-opacity-40 rounded-lg px-4 py-2 shadow-md`}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(item.id)}
                  className="mr-2 h-6 w-6 cursor-pointer"
                />
                <span className={`${item.isCompleted ? "line-through" : ""} ${darkMode ? 'dark:text-white' : ''}`}>
                  {item.todo}
                </span>
              </label>
              <div>
                <button
                  onClick={() => handleEdit(item.id)}
                  className={`text-blue-500 hover:text-blue-600 focus:outline-none ${darkMode ? 'dark:text-white' : 'dark:text-gray-800'}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={`ml-2 text-red-500 hover:text-red-600 focus:outline-none ${darkMode ? 'dark:text-white' : 'dark:text-gray-800'}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className={`mt-3 p-4 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none ${darkMode ? 'dark:bg-gray-700 dark:text-white' : 'dark:bg-white dark:text-gray-800'}`}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default App;
