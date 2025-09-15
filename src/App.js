import {useReducer} from "react";
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

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];

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
      }, {
        path: "/about",
        element: <AboutUsPage/>,
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
