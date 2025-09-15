import {useEffect, useReducer} from "react";
import "./App.css";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider} from "react-router";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {DefaultLayout} from "./layouts/DefaultLayout";
import {TodoDonePage} from "./pages/TodoDonePage";
import {AboutUsPage} from "./pages/AboutUsPage";
import axios from "axios";

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
      },
      {
        path: "/todos/done",
        element: <TodoDonePage/>,
      },
      {
        path: "/about",
        element: <AboutUsPage/>,
      }

    ],
  },
]);

const api = axios.create({
  baseURL: "https://68c7ac8e5d8d9f514732879a.mockapi.io/",
  headers: {"Content-Type": "application/json"},
  timeout: 10000,
})

function App() {
  const [state, dispatch] = useReducer(todoReducer,  []);
  useEffect(() => {
    api.get("/todos")
      .then(response => response.data)
      .then(todos => dispatch({type: "LOAD_TODOS", payload: todos}))
  }, [dispatch]);
  return (
    <div className="todo-container">
      <TodoContext.Provider value={{state, dispatch}}>
        <RouterProvider router={routes}/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
