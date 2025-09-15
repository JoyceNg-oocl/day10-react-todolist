import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {useTodoService} from "../useTodoService.";

export function TodoAdd() {
  const {state, dispatch} = useContext(TodoContext);
  const {createTodo} = useTodoService();

  function handleSubmit() {
    return () => {
      const input = document.querySelector(".todo-input");
      if (input.value.trim()) {
        createTodo(input)
          .then((todo) =>
            dispatch({type: "ADD_TODO", payload: todo})
          )
        input.value = "";
      }
    };
  }

  return <div className="todo-add-container">
    <input className={"todo-input"} type={"text"}/>
    <button
      className={"todo-add"}
      onClick={handleSubmit()}
    >
      add
    </button>
  </div>;
}