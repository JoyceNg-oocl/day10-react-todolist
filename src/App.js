import {useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {TodoList} from "./components/TodoList";
import {createBrowserRouter, RouterProvider} from "react-router";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: <TodoList/>,
  },
]);

function App() {
  const [state, dispatch] = useReducer(todoReducer, initState);
  return (
    <div className="app-container">
      <h2>Todo List</h2>
      <div className="todo-container">
        <TodoContext.Provider value={{state, dispatch}}>
          <RouterProvider router={routes}/>
        </TodoContext.Provider>
      </div>
    </div>
  );
}

export default App;
