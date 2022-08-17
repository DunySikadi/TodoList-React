import { useEffect } from "react";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import theme from "./context/ThemeContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeux, setThemeux] = useState("primary");

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function updateTodo(updateTodo) {
    setTodos(
      todos.map((todo) => (todo._id === updateTodo._id ? updateTodo : todo))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo._id !== id));
  }

  useEffect(() => {
    async function fecthTodoList() {
      try {
        const response = await fetch("https://restapi.fr/api/stodo");
        if (response.ok) {
          const fetchTodos = await response.json();
          if (Array.isArray(fetchTodos)) {
            setTodos(fetchTodos);
          } else {
            setTodos([fetchTodos]);
          }
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    }
    fecthTodoList();
  }, []);

  return (
    <theme.Provider value={themeux}>
      <div className="d-flex flex-column align-items-center justify-content-center ">
        <div className="card container p-30">
          <div className="d-flex justify-content-between mb-10">
            <span>
              <h1>Todo List</h1>
            </span>
            <select
              onChange={(e) => {
                setThemeux(e.target.value);
              }}
            >
              <option value="primary">Rouge</option>
              <option value="secondary">Bleu</option>
            </select>
          </div>
          <AddTodo addTodo={addTodo} />
          {loading ? (
            <p>Chargement....</p>
          ) : (
            <TodoList
              todos={todos}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </div>
      </div>
    </theme.Provider>
  );
}

export default App;
