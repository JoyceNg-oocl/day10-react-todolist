import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {TodoItem} from "./TodoItem";

export function TodoGroup() {
  const {state, dispatch} = useContext(TodoContext);

  return (
    <div className={"todo-group"}>
      {state.length === 0 ? (
        <div style={{fontStyle: "italic", color: "gray"}}>Add the things you need to do today...</div>
      ) : (
        state.map((item, index) => {
          return (
            <div style={{display: "flex", alignItems: "center"}} key={item.id}>
              <TodoItem todo={item} key={index} index={index}/>
              <button
                className={"todo-delete"}
                onClick={() =>
                  dispatch({type: "DELETE_TODO", payload: {id: item.id}})
                }
              >
                x
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}