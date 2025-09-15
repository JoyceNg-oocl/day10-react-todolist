import {useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {TodoList} from "./components/TodoList";
import {createBrowserRouter, NavLink, Outlet, RouterProvider} from "react-router";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

function DefaultLayout() {
  return <div>
    <header>
      <nav>
        <ul>
          <li><NavLink to={"/"}>Home</NavLink></li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
  </div>;
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <TodoList/>,
      },
    ],
  },
]);

function App() {
  const [state, dispatch] = useReducer(todoReducer, initState);
  return (
    <div className="todo-container">
      <TodoContext.Provider value={{state, dispatch}}>
        <RouterProvider router={routes}/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
