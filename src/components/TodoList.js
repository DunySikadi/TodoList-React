import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";

function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) =>
        todo.edit === true ? (
          <EditTodo key={todo._id} updateTodo={updateTodo} todo={todo} />
        ) : (
          <TodoItem
            todo={todo}
            key={todo._id}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </div>
  );
}

export default TodoList;
