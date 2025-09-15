import {useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {TodoList} from "./components/TodoList";

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
          <TodoList/>
        </TodoContext.Provider>
      </div>
    </div>
  );
}

export default App;
