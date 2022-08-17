import { useState } from "react";
import Button from "./Button";

function EditTodo({ todo, updateTodo }) {
  const [value, setvalue] = useState(todo.content);

  async function fetchUpdateTodo(todo) {
    const { _id, ...todoContent } = todo;
    try {
      const response = await fetch(`https://restapi.fr/api/stodo/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(todoContent),
      });

      if (response.ok) {
        const todos = await response.json();
        updateTodo(todos);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  }

  function handleChange(e) {
    setvalue(e.target.value);
  }

  return (
    <div className="d-flex">
      <input
        type="text"
        placeholder="entrer un tache"
        className="flex-fill p-5 m-5"
        value={value}
        onChange={handleChange}
      />
      <Button
        text="sauvergarder"
        className={`mr-5`}
        onClick={() => {
          fetchUpdateTodo({ ...todo, content: value, edit: false });
        }}
      />
      <Button
        className={`mr-5`}
        onClick={() => {
          fetchUpdateTodo({ ...todo, edit: false });
        }}
        text=" annuller"
      />
    </div>
  );
}

export default EditTodo;
