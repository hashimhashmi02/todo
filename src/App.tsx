import { useEffect, useState } from "react";
import api from "./api";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const loadTodos = async () => {
    const res = await api.get<Todo[]>("/todos");
    setTodos(res.data);
  };

 
  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post("/todos", { title });
    setTitle("");
    loadTodos();
  };


  const toggleTodo = async (todo: Todo) => {
    await api.patch(`/todos/${todo.id}`, { completed: !todo.completed });
    loadTodos();
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/todos/${id}`);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>📝 Greatest TODO OF ALL TIME (GTAT)</h1>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={title}
          placeholder="Enter new todo..."
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              borderBottom: "2px solid #ddd",
            }}
          >
            <span
              onClick={() => toggleTodo(t)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ color: "red" }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
