import { useState } from "react";
import "./App.css";
function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      task: "build todo list",
      completed: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTodo((todo) => [
        ...todo,
        {
          id: Date.now(),
          task: inputValue.trim(),
          completed: false,
        },
      ]);
    }

    setInputValue("");
  };

  const handleToggle = (id) => {
    setTodo((todo) =>
      todo.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodo((todo) => {
      return todo.filter((item) => item.id != id);
    });
  };

  return (
    <>
      <h1>Todo List</h1>

      <div className="container">
        <form className="toolbar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            id="input-task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        <ul className="todo-list">
          {todo.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item.id)}
                />

                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </span>

                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
