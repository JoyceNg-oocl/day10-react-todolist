import {TodoGroup} from "./TodoGroup";
import {TodoAdd} from "./TodoAdd";

export function TodoList(props) {
  return <>
    <TodoGroup/>
    <TodoAdd/>
  </>;
}