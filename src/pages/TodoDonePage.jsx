import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

export function TodoDonePage() {
  const {state} = useContext(TodoContext);
  const todoDone = state.filter((todo) => todo.done === true);

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Done Todos</h2>
      {todoDone.length === 0 ? (
        <p>No done todos yet.</p>
      ) : (
        todoDone.map((todo) => (
          <div key={todo.id} className={"todo-item"}>
            <span className={"todo-done"}>{todo.text}</span>
          </div>
        ))
      )}
    </div>
  );
}
