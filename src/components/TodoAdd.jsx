import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

export function TodoAdd() {
  const {state, dispatch} = useContext(TodoContext);


  return <div className="todo-add-container">
    <input className={"todo-input"} type={"text"}/>
    <button
      className={"todo-add"}
      onClick={() => {
            const input = document.querySelector(".todo-input");
            dispatch({type: "ADD_TODO", payload: {text: input.value}});
            input.value = "";
          }}
    >
      add
    </button>
  </div>;
}