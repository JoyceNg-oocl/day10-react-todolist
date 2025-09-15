import {TodoGroup} from "./TodoGroup";
import {TodoAdd} from "./TodoAdd";

export function TodoList(props) {
  return <>
    <h2>Todo List</h2>
    <TodoGroup/>
    <TodoAdd/>
  </>;
}