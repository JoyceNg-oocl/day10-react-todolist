import {TodoGroup} from "./TodoGroup";
import {TodoAdd} from "./TodoAdd";

export function TodoList(props) {
  return <>
    <h2 style={{textAlign: "center"}}>Todo List</h2>
    <TodoAdd/>
    <TodoGroup/>
  </>;
}