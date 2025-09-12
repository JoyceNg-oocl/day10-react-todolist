import { useContext, useReducer} from "react";
import "./App.css"
import {TodoItem} from "./components/TodoItem";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";

export const initState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
  {id: 3, text: "I already done this item", done: true},
];
// export const TodoContext = createContext()

function TodoGroup() {
  const {state, dispatch} = useContext(TodoContext)

  return <div>
    {
      state.map((item, index) => {
        return <TodoItem todo={item} key={index} index={index}/>
      })
    }
  </div>
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initState);
  return (
    <div>
      <TodoContext.Provider value={{state, dispatch}}>
        <TodoGroup/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;