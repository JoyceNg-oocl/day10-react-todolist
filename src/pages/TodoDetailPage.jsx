import {useParams} from "react-router";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {TodoItem} from "../components/TodoItem";

export function TodoDetailPage() {
  const {id} = useParams();
  const {state} = useContext(TodoContext);
  const todo = state.filter((todo) => todo.id === id);

  if (todo.length === 0) {
    return <div>Todo item with id {id} not found.</div>;
  }

  return <div>
    <h2 style={{textAlign: "center"}}>Todo Detail</h2>
    <TodoItem todo={todo[0]} index={id}/>
  </div>;
}