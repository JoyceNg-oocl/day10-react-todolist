import {useContext, useReducer} from "react";
import "./App.css";
import {TodoItem} from "./components/TodoItem";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

function TodoGroup() {
  const {state, dispatch} = useContext(TodoContext);

  return (
    <div className={"todo-group"}>
      {state.map((item, index) => {
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
      })}
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initState);
  return (
    <div className="app-container">
      <h2>Todo List</h2>
      <div className="todo-container">
        <TodoContext.Provider value={{state, dispatch}}>
          <TodoGroup/>
        </TodoContext.Provider>
        <div className="todo-add-container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
