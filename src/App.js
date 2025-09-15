import {useContext, useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, NavLink, Outlet, RouterProvider, useParams} from "react-router";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {TodoItem} from "./components/TodoItem";

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

function TodoDetailPage() {
  const {id} = useParams();
  const {state} = useContext(TodoContext);
  const todo = state.filter((todo) => todo.id === parseInt(id));

  if (todo.length === 0) {
    return <div>Todo item with id {id} not found.</div>;
  }

  return <div>
    <TodoItem todo={todo[0]} index={id}/>
  </div>;
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/todos/:id",
        element: <TodoDetailPage/>,
      }
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
