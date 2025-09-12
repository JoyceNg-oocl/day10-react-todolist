import {createContext, useContext, useReducer} from "react";
import "./App.css"

export const initState = [
  {id: 1, text: "the first todo", done: false},
  {id: 2, text: "the second todo", done: true},
];
export const TodoContext = createContext()

function TodoItem(props) {
  return <div className={"todo-item"}>
    <span className={
      props.todo.done ? "todo-done" : ""
    }>
      {props.todo.text}
    </span>
  </div>
}

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

export function todoReducer(state, action) {
  return state
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