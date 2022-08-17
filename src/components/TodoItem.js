import Button from "./Button";

function TodoItem({ todo, updateTodo, deleteTodo }) {
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

  async function handleDeleteTodo() {
    try {
      const response = await fetch(`https://restapi.fr/api/stodo/${todo._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteTodo(todo._id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <div
      className={`d-flex flex-row m-5 justify-content-center align-items-center ${
        todo.selected ? "select" : ""
      }`}
    >
      <p className="flex-fill">
        {todo.done === true ? `${todo.content} ✅` : todo.content}
      </p>
      <Button
        text="editer"
        className="mr-5"
        onClick={() => updateTodo({ ...todo, edit: true })}
      />
      <Button
        text="valider"
        className="mr-5"
        onClick={() => {
          fetchUpdateTodo({ ...todo, done: !todo.done });
        }}
      />
      <Button text="supprimer" onClick={() => handleDeleteTodo()} />
    </div>
  );
}

export default TodoItem;
