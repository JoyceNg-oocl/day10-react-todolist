import {useContext, useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider, useParams} from "react-router";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {DefaultLayout} from "./layouts/DefaultLayout";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

function TodoDonePage() {
  const {state} = useContext(TodoContext);
  const todoDone = state.filter((todo) => todo.done === true);

  return <div className={"todo-done-container"}>
    <h1>Done Todos</h1>
    {todoDone.length === 0
      ? <p>No done todos yet.</p>
      : todoDone.map((todo) => (
      <div key={todo.id} className={"todo-item"}>
        <span className={"todo-done"}>
          {todo.text}
        </span>
      </div>
    ))}
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
      }, {
        path: "/todos/done",
        element: <TodoDonePage/>,
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
