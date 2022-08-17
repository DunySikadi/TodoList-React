import { useState } from "react";
import Button from "./Button";

function AddTodo({ addTodo }) {
  const [content, setcontent] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const text = e.target.value;
    setcontent(text);
  }

  async function createTodo() {
    try {
      setLoading(true);
      const response = await fetch("https://restapi.fr/api/stodo", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          content,
          edit: false,
          done: false,
        }),
      });

      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
    setcontent("");
  }

  function handleClick() {
    createTodo();
  }

  return (
    <div className="d-flex mb-10">
      <input
        type="text"
        placeholder="entrer un tache"
        onChange={handleChange}
        value={content}
        className="flex-fill p-5 m-5"
      />
      <Button
        text={loading ? "chargement..." : "Valider"}
        className={`p-5 mr-5`}
        onClick={handleClick}
      ></Button>
    </div>
  );
}

export default AddTodo;
