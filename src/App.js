import {useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {TodoGroup} from "./components/TodoGroup";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

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
